import { INewsItem } from '@/types/newsArticlesFrontend';
import { atom, selectorFamily } from 'recoil';

export const searchedNewsArticlesRStateAtom = atom<INewsItem[]>({
	key: 'searchedNewsArticlesRStateAtom_key',
	default: [],
});

export const newsFeedArticlesRStateAtom = atom<INewsItem[]>({
	key: 'newsFeedArticlesRStateAtom_key',
	default: [],
});

export const newsDetailRStateSelectorFamily = selectorFamily<
	INewsItem | null,
	string | undefined
>({
	key: 'newsDetailRStateSelectorFamily_key',
	get:
		(newsId) =>
		({ get }) => {
			if (newsId && newsId?.trim()?.length > 0) {
				const searchedNewsArticlesRState = get(searchedNewsArticlesRStateAtom);
				const newsFeedArticlesRState = get(newsFeedArticlesRStateAtom);

				let _item = searchedNewsArticlesRState?.find((el) => el.id === newsId);

				if (_item) {
					return _item;
				} else {
					_item = newsFeedArticlesRState?.find((el) => el.id === newsId);

					if (_item) {
						return _item;
					} else {
						return null;
					}
				}
			} else {
				return null;
			}
		},
});
