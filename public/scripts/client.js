/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
	const createTweetElement = (newTweet) => {
		const { name, avatars, handle } = newTweet.user;
		const message = newTweet.content.text;
		const createdAt = newTweet.created_at;
		const diff = moment(createdAt).fromNow();

		const tweetHTML = `
			<article>
				<div class="tweet-header">
					<div class="profile">
						<img src="${avatars}" alt="" id="avatars"/>
						<span id="sender-name">${name}</span>
					</div>
					<div id="tweeter-account">${handle}</div>
				</div>
				<p class="tweet-text">${message}</p>
				<div class="more-info">
					<div id="created-at">${diff}</div>
					<div class="icons">
						<i class="fas fa-flag fa-xs"></i>
						<i class="far fa-retweet fa-xs"></i>
						<i class="far fa-heart fa-xs"></i>
					</div>
				</div>
			</article>
		`;

		return tweetHTML;
	};

	const renderTweets = (tweets) => {
		const render = tweets.map((tweet) => {
			const newTweet = createTweetElement(tweet);
			$('.container').append(newTweet);
		});
	};

	// $('#tweet-button').on('click', function (e) {
	// 	$.ajax($('#tweet-text'),{ method: 'POST'}).then((sentTweet) => {

	// 	})
	// 	e.preventDefault();
	// });

	const loadTweets = () => {
		$.ajax('http://localhost:8080/tweets', { method: 'GET' }).then((fetchedTweet) => {
			renderTweets(fetchedTweet);
		});
	};

	loadTweets();
});
