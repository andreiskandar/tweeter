/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
	const newTweet = [
		{
			user: {
				name: 'Newton',
				avatars: 'https://i.imgur.com/73hZDYK.png',
				handle: '@SirIsaac',
			},
			content: {
				text: 'If I have seen further it is by standing on the shoulders of giants',
			},
			// created_at: 1461116232227,
			created_at: 1599616494199,
		},
	];

	const secondTweet = [
		{
			user: {
				name: 'Descartes',
				avatars: 'https://i.imgur.com/nlhLi3I.png',
				handle: '@rd',
			},
			content: {
				text: 'Je pense , donc je suis',
			},
			created_at: 1599614494199,
		},
	];

	const createTweetElement = (newTweet) => {
		const { name, avatars, handle } = newTweet[0].user;
		const message = newTweet[0].content.text;
		const createdAt = newTweet[0].created_at;
		console.log(Date.now());
		const diff = moment(createdAt).fromNow();

		// console.log('diff:', diff.getSeconds());

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

	const $tweet = createTweetElement(newTweet);
	const $secTweet = createTweetElement(secondTweet);
	$('main').append($tweet);
	$('main').append($secTweet);
	// console.log($tweet);
});
