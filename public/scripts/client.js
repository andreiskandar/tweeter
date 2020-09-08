/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//user taps the arrow, the cursor will be focused on textarea
$('#arrow-down').on('click', () => {
	$('#tweet-text').focus();
});
