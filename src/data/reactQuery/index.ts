import { ResponseCodeEnum } from '@/enums/backendApi';
import { IApiResponse } from '@/types/backendApi';
import { ISearchNewsArticlesApiResponse } from '@/types/backendApi/newsArticlesBackend';

export const searchNewsArticlesApiResponseDummyData: IApiResponse<ISearchNewsArticlesApiResponse> =
	{
		message: 'Request Completed Successfully!',
		result: {
			data: {
				articlesFromNewsApiAi: {
					articles: {
						results: [
							{
								uri: '2024-06-380998818',
								lang: 'eng',
								isDuplicate: true,
								date: '2024-06-06',
								time: '14:31:27',
								dateTime: '2024-06-06T14:31:27Z',
								dateTimePub: '2024-06-06T14:11:01Z',
								dataType: 'news',
								sim: 0,
								url: 'https://www.charlotteobserver.com/living/article289059534.html',
								title:
									'How To Protect Hair and the Scalp From the Sun, Plus the Products That Make It Easy',
								body: "By now, we know how important it is to protect our skin from those harmful UV rays emitted from the sun. Hopefully, you're lathering on your sunscreen everyday, from rubbing in your favorite SPF moisturizer to spraying on a body sunscreen before heading out of the house. But you",
								source: {
									uri: 'charlotteobserver.com',
									dataType: 'news',
									title: 'The Charlotte Observer',
								},
								authors: [
									{
										uri: 'anna_traver@charlotteobserver.com',
										name: 'Anna Traver',
										type: 'author',
										isAgency: false,
									},
								],
								image:
									'https://www.mcclatchy-wires.com/incoming/s8f70c/picture289059369/alternates/LANDSCAPE_1140/2cea451f-62aa-4037-bec7-5277b6da0abc',
								eventUri: null,
								sentiment: 0.3254901960784313,
								wgt: 455380287,
								relevance: 2,
							},
						],
						totalResults: 4890877,
						page: 1,
						count: 10,
						pages: 489088,
					},
				},
				articlesFromNewsApiOrg: {
					status: 'ok',
					totalResults: 217249,
					articles: [
						{
							source: {
								id: 'wired',
								name: 'Wired',
							},
							author: 'Julian Chokkattu',
							title:
								'Google Pixel 8A: News, Specs, Features, Price, Release Date',
							description:
								'The company’s refined midrange Android phone packs its flagship Tensor G3 chipset. The handset was announced ahead of next week’s Google I/O conference.',
							url: 'https://www.wired.com/story/google-pixel-8a/',
							urlToImage:
								'https://media.wired.com/photos/663958228b8594a6657b18b6/191:100/w_1280,c_limit/Google-Pixel-8A-collage-052024-SOURCE-Julian-Chokkattu.jpg',
							publishedAt: '2024-05-07T16:00:00Z',
							content:
								"Googles Pixel A-series Android smartphones have long proven that there's no need to spend anywhere close to $1,000 for a great, feature-packed smartphone. While the price of these handsets has slight… [+1768 chars]",
						},
					],
				},
				articlesFromNYTimesApi: {
					status: 'OK',
					copyright:
						'Copyright (c) 2024 The New York Times Company. All Rights Reserved.',
					response: {
						docs: [
							{
								abstract:
									'Hallie Biden, Mr. Biden’s ex-girlfriend and the widow of his brother, Beau, described his self-destructive behavior around the time he applied for a gun in 2018.',
								web_url:
									'https://www.nytimes.com/2024/06/06/us/politics/hallie-biden-hunter-gun-trial-testimony.html',
								lead_paragraph:
									'Hallie Biden, a former girlfriend of Hunter Biden and widow of his brother, Beau, took the stand on Thursday, telling jurors that she saw him buy, stash and smoke vast amounts of crack cocaine in the fall of 2018 when he claimed to be drug-free on a firearms application.',
								source: 'The New York Times',
								headline: {
									main: 'Crucial Witness in Hunter Biden Trial Offers Detailed Portrait of His Drug Use',
									kicker: null,
									content_kicker: null,
									print_headline: null,
									name: null,
									seo: null,
									sub: null,
								},
								section_name: 'U.S.',
							},
						],
						meta: {
							hits: 4669,
							offset: 10,
							time: 11,
						},
					},
				},
				articlesFromTheGuardianApi: {
					response: {
						status: 'ok',
						userTier: 'developer',
						total: 6762,
						startIndex: 1,
						pageSize: 10,
						currentPage: 1,
						pages: 677,
						orderBy: 'newest',
						results: [
							{
								id: 'sport/live/2024/jun/06/french-open-womens-semi-finals-iga-swiatek-coco-gauff-jasmine-paolini-mirra-andreeva-live',
								type: 'liveblog',
								sectionId: 'sport',
								sectionName: 'Sport',
								webPublicationDate: '2024-06-06T15:26:37Z',
								webTitle:
									'Paolini v Andreeva, Swiatek beats Gauff: French Open women’s semi-finals – live',
								webUrl:
									'https://www.theguardian.com/sport/live/2024/jun/06/french-open-womens-semi-finals-iga-swiatek-coco-gauff-jasmine-paolini-mirra-andreeva-live',
								apiUrl:
									'https://content.guardianapis.com/sport/live/2024/jun/06/french-open-womens-semi-finals-iga-swiatek-coco-gauff-jasmine-paolini-mirra-andreeva-live',
								fields: {
									headline:
										'Paolini v Andreeva, Swiatek beats Gauff: French Open women’s semi-finals – live',
									body: '<div id="block-6661d4618f08a6bac2fa9b68" class="block" data-block-contributor=""> <p class="block-time published-time"> <time datetime="2024-06-06T15:26:37.517Z">4.26pm <span class="timezone">BST</span></time> </p>    <div class="block-elements">  <p><strong>Paolini breaks: *Paolini 3-1 Andreeva</strong></p> <p>Paolini stunned the 2022 Wimbledon champion Elena Rybakina in the quarter-finals yesterday, while Andreeva accounted for the reigning Australian Open champion and No 2 seed Aryna Sabalenka. Both, perhaps, are relieved to be playing again today',
									publication: 'theguardian.com',
									shortUrl: 'https://www.theguardian.com/p/qmthn',
									thumbnail:
										'https://media.guim.co.uk/eca3e0938a463cc41dab158964ca96424a2f4b7d/0_338_6369_3821/500.jpg',
									bodyText:
										'Paolini breaks: *Paolini 3-1 Andreeva Paolini stunned the 2022 Wimbledon champion Elena Rybakina in the quarter-finals yesterday, while Andreeva accounted for the reigning Australian Open champion and No 2 seed Aryna Sabalenka. Both, perhaps, are relieved to be playing again tod the st',
								},
								tags: [
									{
										id: 'sport/french-open-2024',
										type: 'keyword',
										sectionId: 'sport',
										sectionName: 'Sport',
										webTitle: 'French Open 2024',
										webUrl:
											'https://www.theguardian.com/sport/french-open-2024',
										apiUrl:
											'https://content.guardianapis.com/sport/french-open-2024',
										references: [],
									},
								],
								references: [],
								section: {
									id: 'sport',
									webTitle: 'Sport',
									webUrl: 'https://www.theguardian.com/sport',
									apiUrl: 'https://content.guardianapis.com/sport',
									editions: [
										{
											id: 'sport',
											webTitle: 'Sport',
											webUrl: 'https://www.theguardian.com/sport',
											apiUrl: 'https://content.guardianapis.com/sport',
											code: 'default',
										},
									],
								},
								isHosted: false,
								pillarId: 'pillar/sport',
								pillarName: 'Sport',
							},
						],
					},
				},
			},
		},
		errors: null,
		status: 200,
		code: ResponseCodeEnum.success,
		success: true,
	};
