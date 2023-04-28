const axios = require('axios');
const cheerio = require('cheerio');

const url =
	'https://www.amazon.com/Dragons-Digital-Age-Unilateral-Cryptocurrency/dp/195265100X';

axios
	.get(url)
	.then((response) => {
		const $ = cheerio.load(response.data);

		// Extract book title
		const title = $('#productTitle').text().trim();

		// Extract author name
		const author = $('.contributorNameID').first().text().trim();

		// Extract book description
		const description = $('#bookDescription_feature_div noscript')
			.text()
			.trim();

		// Extract book cover image URL
		const coverImageUrl = $('#imgBlkFront').attr('src');

		// Extract book details (publication date, publisher, language, etc.)
		const detailsTable = $('#productDetailsTable').first();
		const details = {};
		$('tr', detailsTable).each((i, el) => {
			const key = $(el).find('td').first().text().trim();
			const value = $(el).find('td').last().text().trim();
			details[key] = value;
		});

		// Log the extracted information
		console.log('Title:', title);
		console.log('Author:', author);
		console.log('Description:', description);
		console.log('Cover Image URL:', coverImageUrl);
		console.log('Details:', details);
	})
	.catch((error) => {
		console.log(error);
	});
