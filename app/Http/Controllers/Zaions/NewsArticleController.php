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

        $promises = [
            'articlesFromNewsApiAi' => $this->fetchArticlesFromNewsApiAi($keyword, $category, $source, $page, $pageSize, $startDate, $endDate),
            'articlesFromNewsApiOrg' => $this->fetchArticlesFromNewsApiOrg($keyword, $source, $page, $pageSize, $startDate, $endDate),
        ];
        $responses = Utils::unwrap($promises);

        $articlesFromNewsApiAi = json_decode($responses['articlesFromNewsApiAi']->getBody()->getContents());
        $articlesFromNewsApiOrg = json_decode($responses['articlesFromNewsApiOrg']->getBody()->getContents());

        return AppHelper::sendSuccessResponse([
            'articlesFromNewsApiAi' => $articlesFromNewsApiAi,
            'articlesFromNewsApiOrg' => $articlesFromNewsApiOrg
        ]);
    }

    function getNewsFeed()
    {
        return AppHelper::sendSuccessResponse();
    }

    function fetchArticlesFromNewsApiAi($keyword, $category, $source, $page, $pageSize, $startDate, $endDate)
    {
        return $this->client->getAsync('https://eventregistry.org/api/v1/article/getArticles', [
            'headers' => AppHelper::getApiRequestHeaders(),
            'query' => [
                'apiKey' => env('NEWS_API_AI_APP_KEY'),
                'resultType' => 'articles',
                'forceMaxDataTimeWindow' => 31,
                'lang' => 'eng',
                'keyword' => $keyword,
                'dateStart' => $startDate,
                'dateEnd' => $endDate,
                'categoryUri' => $category,
                'sourceUri' => $source,
                'articlesPage' => $page,
                'articlesCount' => $pageSize
            ]
        ]);
    }

    function fetchArticlesFromNewsApiOrg($keyword = '', $source = '', $page = 1, $pageSize = 10, $startDate = null, $endDate = null)
    {
        return $this->client->getAsync('https://newsapi.org/v2/everything', [
            'headers' => AppHelper::getApiRequestHeaders(),
            'query' => [
                'q' => strlen($keyword) > 0 ? $keyword : 'news', // required by the API
                'apiKey' => env('NEWS_API_ORG_APP_KEY'),
                'sources' => $source,
                'language' => 'en',
                'from' => $startDate ?? Carbon::now()->subDays(31)->format(AppHelper::getDateFormat()),
                'to' => $endDate ?? Carbon::now()->format(AppHelper::getDateFormat()),
                'page' => $page,
                'pageSize' => $pageSize
            ]
        ]);
    }
}

// NEWS_API_AI_APP_KEY, NEWS_API_ORG_APP_KEY, THE_GUARDIAN_APP_KEY, NY_TIMES_APP_KEY