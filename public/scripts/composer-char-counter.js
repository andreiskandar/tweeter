$(document).ready(() => {
	const maxChar = 140;

	//character count
	$('#tweet-text').on('keyup', function () {
		let length = $(this).val().length;
		console.log('length:', length);

		if (length > 140) {
			$('#chars').css('color', 'red');
		} else {
			$('#chars').css('color', 'inherit');
		}
		length = maxChar - length;
		let value = $('#chars').text(length);
	});
});
