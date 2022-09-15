const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const fs = require("fs");

async function getAllNews(client) {
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

	await browser.close();

	return news;
}

async function getNews(client) {
	let previousNews = fs.readFileSync(
		"./src/database/json/news.json",
		"utf8",
		(err, data) => {
			if (err) console.log(err);

			return data;
		}
	);

	previousNews = JSON.parse(previousNews);

	if (!previousNews.count) previousNews.count = 0;
	if (!previousNews.title) previousNews.title = null;

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

	if (
		previousNews.count !== news.length &&
		news[0].title !== previousNews.title
	) {
		fs.writeFile(
			"./src/database/json/news.json",
			JSON.stringify({ count: news.length, title: news[0].title }),
			(err) => {
				if (err) console.log(err);
			}
		);

		client.emit("animeNews", news[0]);
	}

	await browser.close();
}

module.exports = { getAllNews, getNews };
