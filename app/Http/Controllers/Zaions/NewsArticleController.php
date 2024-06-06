<?php

namespace App\Http\Controllers\Zaions;

use App\Http\Controllers\Controller;
use App\Utils\AppHelper;
use Carbon\Carbon;
use GuzzleHttp\Client;
use Illuminate\Http\Request;


class NewsArticleController extends Controller
{
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
                //throw $th;
            }
        }

        $endDate = Carbon::now()->format(AppHelper::getDateFormat());
        if (isset($queryParams['endDate'])) {
            try {
                $endDate = Carbon::make($queryParams['endDate'])->format(AppHelper::getDateFormat());
            } catch (\Throwable $th) {
                //throw $th;
            }
        }

        $articlesFromNewsApiAi = $this->fetchArticlesFromNewsApiAi($keyword, $category, $source, $page, $pageSize, $startDate, $endDate);

        return AppHelper::sendSuccessResponse([
            'keyword' => $keyword,
            'category' => $category,
            'source' => $source,
            'page' => $page,
            'pageSize' => $pageSize,
            'startDate' => $startDate,
            'endDate' => $endDate,
            'articlesFromNewsApiAi' => $articlesFromNewsApiAi
        ]);
    }

    function getNewsFeed()
    {
        return AppHelper::sendSuccessResponse();
    }

    // local functions
    function fetchArticlesFromNewsApiAi($keyword, $category, $source, $page, $pageSize, $startDate, $endDate)
    {
        $client = new Client();
        $res = $client->get('https://eventregistry.org/api/v1/article/getArticles', [
            'headers' => [
                'Accept' => 'application/json',
                'Content-Type' => 'application/json',
            ],
            'query' => [
                'apiKey' => env('NEWS_API_AI_APP_KEY'),
                'resultType' => 'articles',
                'articlesPage' => 1,
                'articlesCount' => 100,
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

        return json_decode($res->getBody()->getContents());
    }
}

// NEWS_API_AI_APP_KEY, NEWS_API_ORG_APP_KEY, THE_GUARDIAN_APP_KEY, NY_TIMES_APP_KEY