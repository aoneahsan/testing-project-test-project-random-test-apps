import IMAGES from '@/assets/images';
import {
	ArticlesFromNYTimesAPI,
	ArticlesFromNewsAPIAI,
	ArticlesFromNewsAPIOrg,
	ArticlesFromTheGuardianAPI,
	INewsArticlesApiResponse,
} from '@/types/backendApi/newsArticlesBackend';
import { INewsItem } from '@/types/newsArticlesFrontend';
import { getRandomId, truncateText } from '@/utils/helpers';

export const formatNewsArticlesData = (
	data: INewsArticlesApiResponse
): INewsItem[] => {
	const newsArticles: INewsItem[] = [];

	try {
		const newsArticlesFromNewsApiAi = formatNewsArticlesFromNewsApiAi(
			data?.articlesFromNewsApiAi
		);
		newsArticles.push(...newsArticlesFromNewsApiAi);
	} catch (error) {}
	try {
		const articlesFromNewsApiOrg = formatNewsArticlesFromNewsApiOrg(
			data?.articlesFromNewsApiOrg
		);
		newsArticles.push(...articlesFromNewsApiOrg);
	} catch (error) {}
	try {
		const articlesFromNYTimesApi = formatNewsArticlesFromNYTimesApi(
			data?.articlesFromNYTimesApi
		);
		newsArticles.push(...articlesFromNYTimesApi);
	} catch (error) {}
	try {
		const articlesFromTheGuardianApi = formatNewsArticlesFromTheGuardianApi(
			data?.articlesFromTheGuardianApi
		);
		newsArticles.push(...articlesFromTheGuardianApi);
	} catch (error) {}

	return newsArticles;
};

const formatNewsArticlesFromNewsApiAi = (
	data: ArticlesFromNewsAPIAI | null
): INewsItem[] => {
	const newsArticles: INewsItem[] = [];

	if (
		data &&
		data?.articles &&
		data?.articles?.results &&
		data?.articles?.results?.length > 0
	) {
		const _items = data?.articles?.results;
		_items.forEach((el) => {
			const _item: INewsItem = {
				id: getRandomId(),
				title: el.title,
				longDescription: el.body,
				shortDescription: truncateText(el.body),
				imageUrl: el.image,
				newsUrl: el.url,
			};

			newsArticles.push(_item);
		});
		return newsArticles;
	} else {
		return newsArticles;
	}
};

const formatNewsArticlesFromNewsApiOrg = (
	data: ArticlesFromNewsAPIOrg | null
): INewsItem[] => {
	const newsArticles: INewsItem[] = [];

	if (data && data?.articles && data?.articles?.length > 0) {
		const _items = data?.articles;
		_items.forEach((el) => {
			const _item: INewsItem = {
				id: getRandomId(),
				title: el.title,
				shortDescription: el.description,
				longDescription: el.content,
				imageUrl: el.urlToImage,
				newsUrl: el.url,
			};

			newsArticles.push(_item);
		});
		return newsArticles;
	} else {
		return newsArticles;
	}
};

const formatNewsArticlesFromNYTimesApi = (
	data: ArticlesFromNYTimesAPI | null
): INewsItem[] => {
	const newsArticles: INewsItem[] = [];

	if (
		data &&
		data?.response &&
		data?.response?.docs &&
		data?.response?.docs?.length > 0
	) {
		const _items = data?.response?.docs;
		_items.forEach((el) => {
			const _item: INewsItem = {
				id: getRandomId(),
				title: el?.headline?.main,
				shortDescription: el.abstract,
				longDescription: `${el.abstract} \n ${el.lead_paragraph}`,
				imageUrl: IMAGES.NewYorkTimesLogo,
				newsUrl: el.web_url,
			};

			newsArticles.push(_item);
		});
		return newsArticles;
	} else {
		return newsArticles;
	}
};

const formatNewsArticlesFromTheGuardianApi = (
	data: ArticlesFromTheGuardianAPI | null
): INewsItem[] => {
	const newsArticles: INewsItem[] = [];

	if (
		data &&
		data?.response &&
		data?.response?.results &&
		data?.response?.results?.length > 0
	) {
		const _items = data?.response?.results;
		_items.forEach((el) => {
			const _item: INewsItem = {
				id: getRandomId(),
				title: el?.fields?.headline,
				shortDescription: truncateText(el.fields?.bodyText),
				longDescription: el.fields?.bodyText,
				imageUrl: el.fields?.thumbnail,
				newsUrl: el.fields?.shortUrl,
			};

			newsArticles.push(_item);
		});
		return newsArticles;
	} else {
		return newsArticles;
	}
};
