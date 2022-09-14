const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const fs = require("fs");

module.exports = async function getNews(client) {
	let newsCount = fs.readFileSync(
		"./src/database/json/news.json",
		"utf8",
		(err, data) => {
			if (err) console.log(err);

			return data;
		}
	);

	newsCount = JSON.parse(newsCount);

	if (!newsCount.count) newsCount.count = 0;

	const browser = await puppeteer.launch({
		headless: true,
		args: ["--no-sandbox"],
	});
	const page = await browser.newPage();
	await page.goto("https://www.animenewsnetwork.com/");
	await page.click("span.topics:nth-child(6) > span:nth-child(1)");
	const html = await page.content();
	const $ = cheerio.load(html);
	const news = [];

	$("div.mainfeed-day:nth-child(3) > div > div.news:not(.is-filtered)").each(
		(i, el) => {
			const title = `${$(el).find("div.wrap > div > h3 > a").text()}`;
			const link = `https://www.animenewsnetwork.com/${$(el)
				.find("a")
				.attr("href")}`;
			const img = `https://www.animenewsnetwork.com/${$(el)
				.find("div.thumbnail")
				.attr("data-src")}`;
			const desc = `${$(el)
				.find("div.wrap > div > div.preview")
				.text()}`.trim();
			const date = $(el)
				.find("div.wrap > div > div.byline > time")
				.attr("datetime");

			news.push({
				title,
				link,
				img,
				desc,
				date,
			});
		}
	);

	if (newsCount.count !== news.length) {
		client.emit("animeNews", news[0]);

		fs.writeFileSync(
			"./src/database/json/news.json",
			JSON.stringify({ count: news.length })
		);
	}

	await browser.close();
};
