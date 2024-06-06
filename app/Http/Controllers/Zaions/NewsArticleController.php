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
            'articlesFromTheGuardianApi' => $this->fetchArticlesFromTheGuardianApi($keyword, $category, $page, $pageSize, $startDate, $endDate),
        ];
        $responses = Utils::unwrap($promises);

        $articlesFromNewsApiAi = json_decode($responses['articlesFromNewsApiAi']->getBody()->getContents());
        $articlesFromNewsApiOrg = json_decode($responses['articlesFromNewsApiOrg']->getBody()->getContents());
        $articlesFromTheGuardianApi = json_decode($responses['articlesFromTheGuardianApi']->getBody()->getContents());

        return AppHelper::sendSuccessResponse([
            'articlesFromNewsApiAi' => $articlesFromNewsApiAi,
            'articlesFromNewsApiOrg' => $articlesFromNewsApiOrg,
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

        return $this->client->getAsync('https://eventregistry.org/api/v1/article/getArticles', [
            'headers' => AppHelper::getApiRequestHeaders(),
            'query' => $query
        ]);
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

        return $this->client->getAsync('https://newsapi.org/v2/everything', [
            'headers' => AppHelper::getApiRequestHeaders(),
            'query' => $query
        ]);
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

        return $this->client->getAsync('https://content.guardianapis.com/search', [
            'headers' => AppHelper::getApiRequestHeaders(),
            'query' => $query
        ]);
    }
}

// NEWS_API_AI_APP_KEY, NEWS_API_ORG_APP_KEY, THE_GUARDIAN_APP_KEY, NY_TIMES_APP_KEY