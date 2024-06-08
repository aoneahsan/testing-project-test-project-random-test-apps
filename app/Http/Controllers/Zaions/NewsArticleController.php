<?php

namespace App\Http\Controllers\Zaions;

use App\Http\Controllers\Controller;
use App\Utils\AppHelper;
use Carbon\Carbon;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NewsArticleController extends Controller
{
    private $client;

    public function __construct(Client $client)
    {
        $this->client = $client;
    }

    function searchNewsArticles(Request $request)
    {
        $queryParams = $request->query();
        $keyword = isset($queryParams['keyword']) ? $queryParams['keyword'] : null;
        $category = isset($queryParams['category']) ? strtolower($queryParams['category']) : null;
        $source = isset($queryParams['source']) ? strtolower($queryParams['source']) : null;
        $author = isset($queryParams['author']) ? $queryParams['author'] : null;
        $page = isset($queryParams['page']) ? $queryParams['page'] : 1;
        $pageSize = isset($queryParams['pageSize']) ? $queryParams['pageSize'] : 10;

        $startDate = Carbon::now()->subDays(31)->format(AppHelper::getDateFormat());
        if (isset($queryParams['startDate'])) {
            try {
                $startDate = Carbon::make($queryParams['startDate'])->format(AppHelper::getDateFormat());
            } catch (\Throwable $th) {
            }
        }

        $endDate = Carbon::now()->format(AppHelper::getDateFormat());
        if (isset($queryParams['endDate'])) {
            try {
                $endDate = Carbon::make($queryParams['endDate'])->format(AppHelper::getDateFormat());
            } catch (\Throwable $th) {
            }
        }

        // implementing it like this, so if one of these api fails then we will have data from at least some other API
        // this will increase the API execution time, but at least we will have some data to display in frontend
        // i did implemented the "GuzzleHttp\Promise" way here before, and it was fast, as i was calling all apis at the same time "async way, parallel api calls" but that way if one fails the whole API request fails even if all other API requests succeed.
        $articlesFromNewsApiAi = null;
        try {
            $articlesFromNewsApiAiRes = $this->fetchArticlesFromNewsApiAi($keyword, $category, $source, $author, $page, $pageSize, $startDate, $endDate);
            $articlesFromNewsApiAi = $articlesFromNewsApiAiRes['data'];
        } catch (\Throwable $th) {
        }

        $articlesFromNewsApiOrg = null;
        try {
            $articlesFromNewsApiOrgRes = $this->fetchArticlesFromNewsApiOrg($keyword, $source, $page, $pageSize, $startDate, $endDate);
            $articlesFromNewsApiOrg = $articlesFromNewsApiOrgRes['data'];
        } catch (\Throwable $th) {
        }

        $articlesFromTheGuardianApi = null;
        try {
            $articlesFromTheGuardianApiRes = $this->fetchArticlesFromTheGuardianApi($keyword, $category, $page, $pageSize, $startDate, $endDate);
            $articlesFromTheGuardianApi = $articlesFromTheGuardianApiRes['data'];
        } catch (\Throwable $th) {
        }

        $articlesFromNYTimesApi = null;
        try {
            $articlesFromNYTimesApiRes = $this->fetchArticlesFromNYTimesApi($keyword, $page, $pageSize, $startDate, $endDate);
            $articlesFromNYTimesApi = $articlesFromNYTimesApiRes['data'];
        } catch (\Throwable $th) {
        }

        return AppHelper::sendSuccessResponse([
            'data' => [
                'articlesFromNewsApiAi' => $articlesFromNewsApiAi,
                'articlesFromNewsApiOrg' => $articlesFromNewsApiOrg,
                'articlesFromNYTimesApi' => $articlesFromNYTimesApi,
                'articlesFromTheGuardianApi' => $articlesFromTheGuardianApi
            ]
        ]);
    }

    function getNewsFeed(Request $request)
    {
        $user = $request->user();

        $newsSources = $user->newsSources;
        $newsCategories = $user->newsCategories;
        $newsAuthors = $user->newsAuthors;

        $articlesFromNewsApiAiData = null;
        try {
            $articlesFromNewsApiAiRes = $this->fetchArticlesFromNewsApiAi(null, $newsCategories, $newsSources, $newsAuthors);
            $articlesFromNewsApiAiData = $articlesFromNewsApiAiRes['data'];
        } catch (\Throwable $th) {
        }

        $articlesFromNewsApiOrg = null;
        try {
            $articlesFromNewsApiOrgRes = $this->fetchArticlesFromNewsApiOrg(null, null);
            $articlesFromNewsApiOrg = $articlesFromNewsApiOrgRes['data'];
        } catch (\Throwable $th) {
        }

        $articlesFromTheGuardianApi = null;
        try {
            $articlesFromTheGuardianApiRes = $this->fetchArticlesFromTheGuardianApi(null, $newsCategories);
            $articlesFromTheGuardianApi = $articlesFromTheGuardianApiRes['data'];
        } catch (\Throwable $th) {
        }

        $articlesFromNYTimesApi = null;
        try {
            $articlesFromNYTimesApiRes = $this->fetchArticlesFromNYTimesApi(null);
            $articlesFromNYTimesApi = $articlesFromNYTimesApiRes['data'];
        } catch (\Throwable $th) {
        }

        return AppHelper::sendSuccessResponse([
            'data' => [
                'articlesFromNewsApiAi' => $articlesFromNewsApiAiData,
                'articlesFromNewsApiOrg' => $articlesFromNewsApiOrg,
                'articlesFromNYTimesApi' => $articlesFromNYTimesApi,
                'articlesFromTheGuardianApi' => $articlesFromTheGuardianApi
            ]
        ]);
    }

    function fetchArticlesFromNewsApiAi($keyword = '', $category = '', $source = '', $authorUri = '', $page = 1, $pageSize = 10, $startDate = null, $endDate = null)
    {
        $url = 'https://eventregistry.org/api/v1/article/getArticles';
        $query = '?apiKey=' . env('NEWS_API_AI_APP_KEY') . '&resultType=articles&forceMaxDataTimeWindow=31&lang=eng&articlesPage=' . $page . '&articlesCount=' . $pageSize;

        if (strlen($keyword) > 0) {
            $query = $query . '&keyword=' . $keyword;
        }
        if ($startDate) {
            $query = $query . '&dateStart=' . $startDate;
        }
        if ($endDate) {
            $query = $query . '&dateEnd=' . $endDate;
        }
        if (strlen($category) > 0) {
            if ($category === 'entertainment') {
                $query = $query . '&categoryUri=' . 'news/Arts_and_Entertainment';
            } else if ($category === 'sports') {
                $query = $query . '&categoryUri=' . 'news/Sports';
            } else if ($category === 'entertainment') {
                $query = $query . '&categoryUri=' . 'dmoz/Business';
            } else {
                $categories = explode(',', $category);
                if (count($categories) > 1) {
                    foreach ($categories as $cat) {
                        if ($cat === 'entertainment') {
                            $query = $query . '&categoryUri=' . 'news/Arts_and_Entertainment';
                        } else if ($cat === 'sports') {
                            $query = $query . '&categoryUri=' . 'news/Sports';
                        } else if ($cat === 'entertainment') {
                            $query = $query . '&categoryUri=' . 'dmoz/Business';
                        } else {
                            $query = $query . '&categoryUri=' . $cat;
                        }
                    }
                } else {
                    $query = $query . '&categoryUri=' . $category;
                }
            }
        }
        if (strlen($source) > 0) {
            // adding few general sources, so we will get some data in frontend, once we improve the logic (which will take some time), we can remove this general source
            $query = $query . '&sourceUri=' . 'dailymail.co.uk';
            $query = $query . '&sourceUri=' . 'haberler.com';
            $query = $query . '&sourceUri=' . 'marketscreener.com';
            $query = $query . '&sourceUri=' . 'haberturk.com';
            $query = $query . '&sourceUri=' . 'jagran.com';

            $sources = explode(',', $source);
            if (count($sources) > 1) {
                foreach ($sources as $item) {
                    $query = $query . '&sourceUri=' . $item;
                }
            } else {
                $query = $query . '&sourceUri=' . $source;
            }
        }
        if (strlen($authorUri) > 0) {
            $authors = explode(',', $authorUri);
            if (count($authors) > 1) {
                foreach ($authors as $author) {
                    $query = $query . '&authorUri=' . $author;
                }
            } else {
                $query = $query . '&authorUri=' . $authorUri;
            }
        }

        $url = $url . $query;

        $res = $this->client->get($url, [
            'headers' => AppHelper::getApiRequestHeaders()
        ]);

        $data = json_decode($res->getBody()->getContents());

        return ['data' => $data];
    }

    function fetchArticlesFromNewsApiOrg($keyword = '', $source = '', $page = 1, $pageSize = 10, $startDate = null, $endDate = null)
    {
        $url = 'https://newsapi.org/v2/everything';
        $query = '?apiKey=' . env('NEWS_API_ORG_APP_KEY') . '&language=en&page=' . $page . '&pageSize=' . $pageSize . '&searchIn=title,content';

        if ($keyword && strlen($keyword) > 0) {
            $query = $query . '&q=' . $keyword;
        } else {
            // we need to pass something for parameter "q" for this API.
            $user = Auth::user();
            $query = $query . '&q=' . $user->newsSource . ' OR ' . $user->newsCategory . ' OR ' . $user->newsAuthor . ' OR ' . 'news';
        }
        if ($startDate) {
            $query = $query . '&from=' . $startDate;
        }
        if ($endDate) {
            $query = $query . '&to=' . $endDate;
        }
        if ($source && strlen($source) > 0) {
            $query = $query . '&sources=' . $source;
        }

        $url = $url . $query;

        $res = $this->client->get($url, [
            'headers' => AppHelper::getApiRequestHeaders()
        ]);

        return ['data' => json_decode($res->getBody()->getContents())];
    }

    function fetchArticlesFromTheGuardianApi($keyword = '', $category = '', $page = 1, $pageSize = 10, $startDate = null, $endDate = null)
    {
        $url = 'https://content.guardianapis.com/search';
        $query = '?api-key=' . env('THE_GUARDIAN_APP_KEY') . '&format=json&lang=en&use-date=published&show-fields=headline,shortUrl,thumbnail,publication,bodyText&show-tags=keyword,publication,type&show-section=true&show-references=author&page=' . $page . '&page-size=' . $pageSize;

        if (strlen($keyword) > 0) {
            $query = $query . '&q=' . $keyword;
        }
        if ($startDate) {
            $query = $query . '&from-date=' . $startDate;
        }
        if ($endDate) {
            $query = $query . '&to-date=' . $endDate;
        }
        if (strlen($category) > 0) {
            $query = $query . '&section=' . $category;
        }

        $url = $url . $query;

        $res = $this->client->get($url, [
            'headers' => AppHelper::getApiRequestHeaders()
        ]);

        return ['data' => json_decode($res->getBody()->getContents())];
    }

    function fetchArticlesFromNYTimesApi($keyword = '', $page = 1, $pageSize = 10, $startDate = null, $endDate = null)
    {
        $url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
        $query = '?api-key=' . env('NY_TIMES_APP_KEY') . '&format=json&lang=en&sort=relevance&fl=abstract,web_url,lead_paragraph,source,headline,section_name,_id&page=' . $page . '&page-size=' . $pageSize;

        if (strlen($keyword) > 0) {
            $query = $query . '&q=' . $keyword;
        }
        if ($startDate) {
            $query = $query . '&begin_date=' . Carbon::make($startDate)->format('Ymd');// format required by API "20240606
        }
        if ($endDate) {
            $query = $query . '&end_date=' . Carbon::make($endDate)->format('Ymd');
        }

        $url = $url . $query;

        $res = $this->client->get($url, [
            'headers' => AppHelper::getApiRequestHeaders()
        ]);

        return ['data' => json_decode($res->getBody()->getContents())];
    }
}
