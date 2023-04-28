const express = require('express');
const request = require('request');
const app = express();

// Function to create social media share links
function createShareLinks(title, author, description) {
	const encodedTitle = encodeURIComponent(title);
	const encodedAuthor = encodeURIComponent(author);
	const encodedDescription = encodeURIComponent(description);

	return {
		twitter: `https://twitter.com/intent/tweet?text=${encodedTitle} by ${encodedAuthor}: ${encodedDescription}`,
		facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
			'https://example.com/book'
		)}&quote=${encodedTitle} by ${encodedAuthor}: ${encodedDescription}`,
		linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
			'https://example.com/book'
		)}&title=${encodedTitle}&summary=${encodedDescription}`,
	};
}

app.get('/dragon', (req, res) => {
	const query = 'dragon of the digital age';
	const url = `https://www.googleapis.com/books/v1/volumes?q=${query}`;

	request(url, (error, response, body) => {
		if (!error && response.statusCode === 200) {
			const bookData = JSON.parse(body);
			const bookTitle = bookData.items[0].volumeInfo.title;
			const bookAuthor = bookData.items[0].volumeInfo.authors[0];
			const bookDescription = bookData.items[0].volumeInfo.description;

			const shareLinks = createShareLinks(
				bookTitle,
				bookAuthor,
				bookDescription
			);

			res.send(`
        <h1>${bookTitle}</h1>
        <h2>by ${bookAuthor}</h2>
        <p>${bookDescription}</p>
        <ul>
          <li><a href="${shareLinks.twitter}">Share on Twitter</a></li>
          <li><a href="${shareLinks.facebook}">Share on Facebook</a></li>
          <li><a href="${shareLinks.linkedin}">Share on LinkedIn</a></li>
        </ul>
      `);
		} else {
			res.send('Error retrieving book data');
		}
	});
});
app.get('/digital', (req, res) => {
	const query = 'digital exchequer';
	const url = `https://www.googleapis.com/books/v1/volumes?q=${query}`;

	request(url, (error, response, body) => {
		if (!error && response.statusCode === 200) {
			const bookData = JSON.parse(body);
			const bookTitle = bookData.items[0].volumeInfo.title;
			const bookAuthor = bookData.items[0].volumeInfo.authors[0];
			const bookDescription = bookData.items[0].volumeInfo.description;

			// Create social media share links
			const shareLinks = createShareLinks(
				bookTitle,
				bookAuthor,
				bookDescription
			);

			res.send(`
          <h1>${bookTitle}</h1>
          <h2>by ${bookAuthor}</h2>
          <p>${bookDescription}</p>
          <ul>
            <li><a href="${shareLinks.twitter}">Share on Twitter</a></li>
            <li><a href="${shareLinks.facebook}">Share on Facebook</a></li>
            <li><a href="${shareLinks.linkedin}">Share on LinkedIn</a></li>
          </ul>
        `);
		} else {
			res.send('Error retrieving book data');
		}
	});
});
const port = 8000;

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
