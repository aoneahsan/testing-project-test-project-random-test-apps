import { INewsItem } from '@/types/newsArticlesFrontend';
import { atom } from 'recoil';

export const searchedNewsArticlesRStateAtom = atom<INewsItem[]>({
	key: 'searchedNewsArticlesRStateAtom_key',
	default: [],
});

export const newsFeedArticlesRStateAtom = atom<INewsItem[]>({
	key: 'newsFeedArticlesRStateAtom_key',
	default: [],
});
