<?php

namespace App\Http\Controllers\Zaions;

use App\Http\Controllers\Controller;
use App\Utils\AppHelper;
use Carbon\Carbon;
use GuzzleHttp\Client;
use GuzzleHttp\Promise\Utils;
use Illuminate\Http\Request;

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
        $category = isset($queryParams['category']) ? $queryParams['category'] : null;
        $source = isset($queryParams['source']) ? $queryParams['source'] : null;
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
            $articlesFromNewsApiAi = $this->fetchArticlesFromNewsApiAi($keyword, $category, $source, $page, $pageSize, $startDate, $endDate);
        } catch (\Throwable $th) {
        }

        $articlesFromNewsApiOrg = null;
        try {
            $articlesFromNewsApiOrg = $this->fetchArticlesFromNewsApiOrg($keyword, $source, $page, $pageSize, $startDate, $endDate);
        } catch (\Throwable $th) {
        }

        $articlesFromTheGuardianApi = null;
        try {
            $articlesFromTheGuardianApi = $this->fetchArticlesFromTheGuardianApi($keyword, $category, $page, $pageSize, $startDate, $endDate);
        } catch (\Throwable $th) {
        }

        $articlesFromNYTimesApi = null;
        try {
            $articlesFromNYTimesApi = $this->fetchArticlesFromNYTimesApi($keyword, $page, $pageSize, $startDate, $endDate);
        } catch (\Throwable $th) {
        }

        return AppHelper::sendSuccessResponse([
            'articlesFromNewsApiAi' => $articlesFromNewsApiAi,
            'articlesFromNewsApiOrg' => $articlesFromNewsApiOrg,
            'articlesFromNYTimesApi' => $articlesFromNYTimesApi,
            'articlesFromTheGuardianApi' => $articlesFromTheGuardianApi
        ]);
    }

    function getNewsFeed()
    {
        return AppHelper::sendSuccessResponse();
    }

    function fetchArticlesFromNewsApiAi($keyword = '', $category = '', $source = '', $page = 1, $pageSize = 10, $startDate = null, $endDate = null)
    {
        $query = [
            'apiKey' => env('NEWS_API_AI_APP_KEY'),
            'resultType' => 'articles',
            'forceMaxDataTimeWindow' => 31,
            'lang' => 'eng',
            'articlesPage' => $page,
            'articlesCount' => $pageSize
        ];

        if (strlen($keyword) > 0) {
            $query['keyword'] = $keyword;
        }
        if ($startDate) {
            $query['dateStart'] = $startDate;
        }
        if ($endDate) {
            $query['dateEnd'] = $endDate;
        }
        if (strlen($category) > 0) {
            $query['categoryUri'] = $category;
        }
        if (strlen($source) > 0) {
            $query['sourceUri'] = $source;
        }

        $res = $this->client->get('https://eventregistry.org/api/v1/article/getArticles', [
            'headers' => AppHelper::getApiRequestHeaders(),
            'query' => $query
        ]);

        return json_decode($res->getBody()->getContents());
    }

    function fetchArticlesFromNewsApiOrg($keyword = '', $source = '', $page = 1, $pageSize = 10, $startDate = null, $endDate = null)
    {
        $query = [
            'apiKey' => env('NEWS_API_ORG_APP_KEY'),
            'language' => 'en',
            'page' => $page,
            'pageSize' => $pageSize
        ];

        if (strlen($keyword) > 0) {
            $query['q'] = $keyword;
        }
        if ($startDate) {
            $query['from'] = $startDate;
        }
        if ($endDate) {
            $query['to'] = $endDate;
        }
        if (strlen($source) > 0) {
            $query['sources'] = $source;
        }

        $res = $this->client->get('https://newsapi.org/v2/everything', [
            'headers' => AppHelper::getApiRequestHeaders(),
            'query' => $query
        ]);

        return json_decode($res->getBody()->getContents());
    }

    function fetchArticlesFromTheGuardianApi($keyword = '', $category = '', $page = 1, $pageSize = 10, $startDate = null, $endDate = null)
    {
        $query = [
            'api-key' => env('THE_GUARDIAN_APP_KEY'),
            'format' => 'json',
            'lang' => 'en',
            'use-date' => 'published',
            'page' => $page,
            'page-size' => $pageSize,
            'show-fields' => 'headline,body,shortUrl,thumbnail,publication,bodyText',
            'show-tags' => 'keyword,publication,type',
            'show-section' => 'true',
            'show-references' => 'author'
        ];

        if (strlen($keyword) > 0) {
            $query['q'] = $keyword;
        }
        if ($startDate) {
            $query['from-date'] = $startDate;
        }
        if ($endDate) {
            $query['to-date'] = $endDate;
        }
        if (strlen($category) > 0) {
            $query['section'] = $category;
        }

        $res = $this->client->get('https://content.guardianapis.com/search', [
            'headers' => AppHelper::getApiRequestHeaders(),
            'query' => $query
        ]);

        return json_decode($res->getBody()->getContents());
    }

    function fetchArticlesFromNYTimesApi($keyword = '', $page = 1, $pageSize = 10, $startDate = null, $endDate = null)
    {
        $query = [
            'api-key' => env('NY_TIMES_APP_KEY'),
            'format' => 'json',
            'lang' => 'en',
            'sort' => 'relevance',
            'page' => $page,
            'page-size' => $pageSize,
            'fl' => 'abstract,web_url,lead_paragraph,source,multimedia,headline,section_name,byline'
        ];

        if (strlen($keyword) > 0) {
            $query['q'] = $keyword;
        }
        if ($startDate) {
            $query['begin_date'] = Carbon::make($startDate)->format('Ymd'); // format required by API "20240606
        }
        if ($endDate) {
            $query['end_date'] = Carbon::make($endDate)->format('Ymd');
        }

        $res = $this->client->get('https://api.nytimes.com/svc/search/v2/articlesearch.json', [
            'headers' => AppHelper::getApiRequestHeaders(),
            'query' => $query
        ]);

        return json_decode($res->getBody()->getContents());
    }
}
