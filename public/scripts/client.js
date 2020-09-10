/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
	const ERROR_MESSAGE = {
		too_long: 'Please try a shorter tweet',
		empty: 'Please type a tweet',
	};

	//escape function to prevent malicious attacks
	const escape = (str) => {
		let div = document.createElement('div');
		div.appendChild(document.createTextNode(str));
		return div.innerHTML;
	};

	const validatingForm = () => {
		const textInput = $('#tweet-text').val();

		if (textInput.length > 140) {
			return { status: false, message: ERROR_MESSAGE.too_long };
		} else if (textInput.length === 0 || textInput === null) {
			return {
				status: false,
				message: ERROR_MESSAGE.empty,
			};
		} else {
			return {
				status: true,
			};
		}
	};

	const createTweetElement = (newTweet) => {
		const { name, avatars, handle } = newTweet.user;
		const message = newTweet.content.text;
		const createdAt = newTweet.created_at;
		const diff = moment(createdAt).fromNow();

		const tweetHTML = `
			<article>
				<div class="tweet-header">
					<div class="profile">
						<img src="${escape(avatars)}" alt="" id="avatars"/>
						<span id="sender-name">${escape(name)}</span>
					</div>
					<div id="tweeter-account">${escape(handle)}</div>
				</div>
				<p class="tweet-text">${escape(message)}</p>
				<div class="more-info">
					<div id="created-at">${escape(diff)}</div>
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
		$('#tweets-container').empty();
		const render = tweets.map((tweet) => {
			const newTweet = createTweetElement(tweet);
			$('#tweets-container').prepend(newTweet);
		});
	};

	const renderErrorMessage = (message) => {
		$('section').append(`<div class="error-message">${message}</div>`);
	};

	const loadTweets = () => {
		$.get('http://localhost:8080/tweets').then((fetchedData) => renderTweets(fetchedData));
	};

	// Load old tweets when webpage loaded first time
	loadTweets();

	$('.form').submit(function (e) {
		e.preventDefault();

		// remove error-message element if exists
		$('.error-message').remove();

		// validate form and set error message
		if (!validatingForm().status) {
			renderErrorMessage(validatingForm().message);
			return;
		} else {
			const serializedData = $(this).serialize();
			$.post('http://localhost:8080/tweets', serializedData).then(() => {
				loadTweets();
				$('#tweet-text').val('');
			});
		}
	});

	// Allow user to submit tweet pressing 'enter' button
	$('.form').keyup(function (e) {
		e.preventDefault();
		if (e.which === 13) {
			$('.form').submit();
			return;
		}
	});
});
