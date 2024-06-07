export interface ISearchNewsArticlesApiResponse {
	articlesFromNewsApiAi: ArticlesFromNewsAPIAI | null;
	articlesFromNewsApiOrg: ArticlesFromNewsAPIOrg | null;
	articlesFromNYTimesApi: ArticlesFromNYTimesAPI | null;
	articlesFromTheGuardianApi: ArticlesFromTheGuardianAPI | null;
}

export interface ArticlesFromNYTimesAPI {
	status?:    string;
	copyright?: string;
	response?:  ArticlesFromNYTimesAPIResponse;
}

// The types mentioned below were created with the help of "https://app.quicktype.io"
export interface ArticlesFromNYTimesAPIResponse {
	docs?: Doc[];
	meta?: Meta;
}

export interface Doc {
	_id?: string;
	abstract?:       string;
	web_url?:        string;
	lead_paragraph?: string;
	source?:         string;
	headline?:       Headline;
	section_name?:   string;
}

export interface Headline {
	main?:           string;
	kicker?:         null;
	content_kicker?: null;
	print_headline?: null;
	name?:           null;
	seo?:            null;
	sub?:            null;
}

export interface Meta {
	hits?:   number;
	offset?: number;
	time?:   number;
}

export interface ArticlesFromNewsAPIAI {
	articles?: Articles;
}

export interface Articles {
	results?:      ArticlesResult[];
	totalResults?: number;
	page?:         number;
	count?:        number;
	pages?:        number;
}

export interface ArticlesResult {
	uri?:         string;
	lang?:        string;
	isDuplicate?: boolean;
	date?:        string;
	time?:        string;
	dateTime?:    string;
	dateTimePub?: string;
	dataType?:    string;
	sim?:         number;
	url?:         string;
	title?:       string;
	body?:        string;
	source?:      ResultSource;
	authors?:     Author[];
	image?:       string;
	eventUri?:    null;
	sentiment?:   number;
	wgt?:         number;
	relevance?:   number;
}

export interface Author {
	uri?:      string;
	name?:     string;
	type?:     string;
	isAgency?: boolean;
}

export interface ResultSource {
	uri?:      string;
	dataType?: string;
	title?:    string;
}

export interface ArticlesFromNewsAPIOrg {
	status?:       string;
	totalResults?: number;
	articles?:     Article[];
}

export interface Article {
	source?:      ArticleSource;
	author?:      string;
	title?:       string;
	description?: string;
	url?:         string;
	urlToImage?:  string;
	publishedAt?: string;
	content?:     string;
}

export interface ArticleSource {
	id?:   string;
	name?: string;
}

export interface ArticlesFromTheGuardianAPI {
	response?: ArticlesFromTheGuardianAPIResponse;
}

export interface ArticlesFromTheGuardianAPIResponse {
	status?:      string;
	userTier?:    string;
	total?:       number;
	startIndex?:  number;
	pageSize?:    number;
	currentPage?: number;
	pages?:       number;
	orderBy?:     string;
	results?:     ResponseResult[];
}

export interface ResponseResult {
	id?:                 string;
	type?:               string;
	sectionId?:          string;
	sectionName?:        string;
	webPublicationDate?: string;
	webTitle?:           string;
	webUrl?:             string;
	apiUrl?:             string;
	fields?:             Fields;
	tags?:               Tag[];
	references?:         any[];
	section?:            Tion;
	isHosted?:           boolean;
	pillarId?:           string;
	pillarName?:         string;
}

export interface Fields {
	headline?:    string;
	body?:        string;
	publication?: string;
	shortUrl?:    string;
	thumbnail?:   string;
	bodyText?:    string;
}

export interface Tion {
	id?:       string;
	webTitle?: string;
	webUrl?:   string;
	apiUrl?:   string;
	editions?: Tion[];
	code?:     string;
}

export interface Tag {
	id?:          string;
	type?:        string;
	sectionId?:   string;
	sectionName?: string;
	webTitle?:    string;
	webUrl?:      string;
	apiUrl?:      string;
	references?:  any[];
}
