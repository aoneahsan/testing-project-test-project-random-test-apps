import { createContext } from 'react';

export const NewsFeedContext = createContext<{
	refetchOnUpdate?: () => Promise<void>;
}>({
	refetchOnUpdate: undefined,
});
