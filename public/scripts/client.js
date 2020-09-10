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

	// button to view tweet text box
	$('.home').click(() => {
		window.scrollTo(0, -window.scrollY);
		$('#tweet-text').focus();
	});

	// console.log('window.scrollbars.visible:', window.scrollbars.visible);
	$(window).scroll(function () {
		const scroll = window.scrollY;
		if (scroll > 200) {
			$('.home-button').css('visibility', 'visible');
		} else {
			$('.home-button').css('visibility', 'hidden');
		}
	});

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
		} else if (!textInput || textInput.length === 1) {
			// textInput.length to send error if enter is pressed with no message
			return {
				status: false,
				message: ERROR_MESSAGE.empty,
			};
		}
		return { status: true };
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
						<img src="${avatars}" alt="" id="avatars"/>
						<span id="sender-name">${name}</span>
					</div>
					<div id="tweeter-account">${handle}</div>
				</div>
				<p class="tweet-text">${escape(message)}</p>
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
		$('#tweets-container').empty();
		const render = tweets.map((tweet) => {
			const newTweet = createTweetElement(tweet);
			$('#tweets-container').prepend(newTweet);
		});
	};

	const renderErrorMessage = (message) => {
		const errorDiv = $(
			`<div class="error-message"><i class="fal fa-exclamation-triangle"></i>${message}<i class="fal fa-exclamation-triangle"></i></div>`
		).hide();
		$('section').append(errorDiv);
		errorDiv.slideDown(900);
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
		const formValidation = validatingForm();

		// validate form and set error message
		if (!formValidation.status) {
			renderErrorMessage(formValidation.message);
			return;
		}
		const serializedData = $(this).serialize();
		$.post('http://localhost:8080/tweets', serializedData).then(() => {
			loadTweets();

			// empty tweeter input area
			$('#tweet-text').val('');

			// reset character count
			$('#chars').text(140);
		});
	});

	// Allow user to submit tweet pressing 'enter' button
	$('.form').keyup(function (e) {
		e.preventDefault();
		// 13 for enter
		if (e.which === 13) {
			$('.form').submit();
			return;
		}
	});
});
