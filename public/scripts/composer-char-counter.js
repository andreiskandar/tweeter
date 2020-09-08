$(document).ready(() => {
	const maxChar = 140;

	//character count
	$('#tweet-text').on('keyup', function () {
		let length = $(this).val().length;
		console.log('RD', length);

		if (length > 140) {
			console.log('We are greater than 140');
			$('#chars').css('color', 'red');
		}
		length = maxChar - length;
		let value = $('#chars').text(length);
	});
});
