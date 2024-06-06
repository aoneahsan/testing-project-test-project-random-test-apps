import { ResponseCodeEnum } from '@/enums/backendApi';
import { IApiResponse } from '@/types/backendApi';
import { ISearchNewsArticlesApiResponse } from '@/types/backendApi/newsArticles';

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
								body: 'By now, we know how important it is to protect our skin from those harmful UV rays emitted from the sun. Hopefully, you\'re lathering on your sunscreen everyday, from rubbing in your favorite SPF moisturizer to spraying on a body sunscreen before heading out of the house. But you\'re probably not thinking about your hair when it comes to UV protection -- and you definitely should be. From color fading to dryness to dullness, the sun can wreak havoc on our strands. Here, trichologists break down exactly why our hair needs protection from the sun, along with the best UV hair products and hair and scalp sunscreens. PS: The answer isn\'t the sport spray you have sitting in your beach bag!\n\nWhy does our hair need UV protection?\n\nYou may be thinking, does my hair really need sun protection? To put it simply, "the answer is YES YES YES," says Kerry E. Yates, trichologist and founder of Colour Creative. In fact, your strands are probably begging for it for that extra layer of protection. "The hair is highly susceptible to damage caused by the sun\'s rays."\n\nAnd while summer may bring along pretty, natural highlights after laying out in the sun (and perhaps spritzing in a hair lightener), it can also completely dry out hair that may already be parched in the first place. "UV rays from the sun can damage the hair\'s cuticle, resulting in dry and brittle hair, color fading and loss of shine," affirms trichologist and hair growth expert Shab Caspara. "The sheer fact that the sun has the ability to fade your hair color is an indication of how it can break-down color molecules on the hair\'s surface, as well as weaken the protective cuticle layer of hair and expose the melanin contained beneath it."\n\nWhat sun exposure can do to hair\n\nAs mentioned above, UV rays can wreak havoc on strands in many ways. Here, experts share more info on all of the wear and tear time in the sun can cause to our tresses.\n\n1. Sun exposure fades hair color\n\nWhether you have color-treated hair or are rocking your hair\'s natural hue, the sun doesn\'t discriminate when it comes to hair color and altering its hue. "The sun can break down the hair\'s natural melanin, causing an overall appearance of a lighter color," explains Yates. "This is super obvious on the ends of the hair vs. the roots."\n\n2. Sun exposure dries out hair\n\nWe all know that feeling after you\'ve swam in chlorine or spent a long day at the beach and your hair looks and feels like straw -- it\'s unpleasant, to say the least. This is what your hair can feel like after being exposed to the sun for long periods of time with no UV protection of hair sunscreen.\n\nWhy does this happen, you may be wondering? "Exposure can strip the hair of natural oils, leaving it dry and brittle. The lack of a natural oil barrier can cause the cuticles to lift, making the hair feel rough and leading to further damage with the added friction from styling tools like brushes and combs," says Yates. In other words, the sun essentially zaps that natural moisture straight out of your hair.\n\nRelated:Why Your Hair Is So Dry: Pro Stylists Reveal the Sneaky Culprits + How to Fix It Fast\n\n3. Sun exposure makes hair brittle and prone to breakage\n\nSuffer from split ends and breakage from perhaps too much heat styling, using the wrong products or wearing tight ponytails or buns? You will especially want to apply UV protection to locks. The sun can further damage those split ends and lead to more breakage, due to a loss of elasticity in the strands. "Sun exposure can negatively impact the hair\'s natural bonds, which in turn can impact overall hair strength/elasticity, leading to breakage and frayed ends," says Yates.\n\nRelated:How to Prevent Split Ends According to Celebrity Hairstylists -- 9 Ways to Guarantee Hair Looks Healthy, Thick and Shiny\n\n4. Sun exposure causes scalp inflammation\n\nYou can\'t have healthy hair without a healthy scalp, as many hair pros say. That\'s why it\'s best to think of your scalp as the base or foundation of your makeup; without proper prep or some TLC, your makeup won\'t turn out right. And the same goes for our hair. If we don\'t take care of our scalp, our hair can be impacted.\n\nPlus, our scalp can burn just like the rest of our body, which can be itchy and painful, and lead to flaking. "Like your skin, the scalp can burn when exposed to the sun\'s rays. Scalp burns can lead to inflammation, which can negatively impact follicle health," affirms Yates. "This is important as optimal follicle health ensures your hair stays full and gorgeous. Poor follicle health leads to baldness!"\n\nRelated:Treating Scalp Inflammation Can Reverse Hair Loss -- Experts Share the Easy + Soothing Remedies\n\nThe different types of UV hair products and hair sunscreens\n\nNow that you know why your hair needs protection from the sun, it\'s time to find the right product to keep it protected. Thankfully, there are some great options to choose from. "There are various sprays and creams designed for the hair that are formulated with proper sunscreen ingredients," says Yates.\n\nAs far as hair sunscreen, chemical formulas will likely be your best bet: "Unfortunately, mineral-based sunscreens honestly do not feel great (in the hair); Therefore, most formulas are designed with chemical sunscreens like Avobenze, Octisalate, Homosalate and Octocrylene," explains Yates.\n\nWhen it comes to creams or leave-in conditioners, many are formulated with "ingredients known to help ward off the damaging effects of the sun\'s rays, but they do not contain a specific protection factor," warns Yates. "Most hair brands contain a blend of antioxidants, moisturizers and heat protectants. Some antioxidants to look for include vitamin A, C and E and polyphenols. Aloe vera is a great overall product for optimal hair health."\n\nCaspara prefers a more natural approach saying, "I prefer natural UV filters for hair products because they are safer, especially since you spray them close to your face and breathe them in throughout the day. Natural ingredients like sunflower seed extract, aloe vera and jojoba oil can protect hair from UV rays."\n\nRelated:6 Best Hair Oils That Treat Thinning Hair, Restore Shine, Fight Frizz + More\n\nHair Dusting Keeps Strands Looking Youthful and Healthy! Plus You Can Do the Haircut Technique at Home\n\nHyaluronic Acid Makes Hair Healthy, Shiny and Youthful -- Here\'s How to Use It',
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
										'Paolini breaks: *Paolini 3-1 Andreeva Paolini stunned the 2022 Wimbledon champion Elena Rybakina in the quarter-finals yesterday, while Andreeva accounted for the reigning Australian Open champion and No 2 seed Aryna Sabalenka. Both, perhaps, are relieved to be playing again today, without a day off. Less time for them to think and for the nerves to set in. But neither are quite settled yet, it’s been stop-start so far. Paolini gains the first break point of the match at 30-40 on Andreeva’s serve, and Andreeva’s forehand fails. Paolini, the 12th seed, has the first break! Paolini 2-1 Andreeva* Apparently this is the biggest age gap in a Roland Garros women’s semi-final since a 30-year-old Chris Evert beat a 15-year-old Gabriela Sabatini in 1985. Andreeva wraps up a hold with a winning volley, and is doing her best to put the older player in her place, as she starts swinging to get to 0-30 on Paolini’s serve. Paolini pegs her back to 30-all, and then the Italian edges ahead of her Russian opponent for 40-30. And game. Paolini 1-0 Andreeva* Most of the crowd have left for a quick break, but no time for one on this live blog, because after the semi-final that everyone predicted from the st',
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
