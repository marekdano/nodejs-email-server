'use strict';

var nodemailer = require('nodemailer'),
	cheerio = require('cheerio'),
	request = require('request'),
	$,
	transporter,
	url = 'http://store.apple.com/ie/browse/home/specialdeals/mac/macbook_pro/15';

function scrapAndSendEmail() {
	// The first parameter is our URL
	// The callback function takes 3 parameters, 
	// an error, response status code and the html
	request(url, function(err, response, html) {

		// check for any error
		if(err) {
			console.error(err);
		} else {
			// we will assign the return html to jQuery function
			$ = cheerio.load(html);

			// scrap all products under box-content div
			var product = $('.box-content').find('.product');
			if (product) {
				console.log('Product exits, please check ' + url);
				sendEmail();
			}
		}
	});

	function sendEmail() {
	
		transporter = nodemailer.createTransport({
			service: 'gmail', // e.g. yahoo...
			auth: {
				user: 'your.email@example.com',
				pass: 'xyz'
			}
		});

		transporter.sendMail({
			from: 'your.email@example.com',
			to: 'another.email@example.com',
			subject: 'Apple sells 15" macbook_pro',
			text: 'Product exits, please check ' + url
		});
	}
}

setInterval(scrapAndSendEmail, 21600000);

