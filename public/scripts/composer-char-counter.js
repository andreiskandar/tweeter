$(document).ready(() => {
	//character count
	$('#tweet-text').on('keyup', function () {
		const maxChar = 140;
		let length = $(this).val().length;
		length = maxChar - length;
		$('#chars').text(length);
	});

	$('#chars').each(function () {
		console.log(this.html());
		const value = parseInt(this.html());
		console.log(value);
		if (value < 0) {
			$(this).css('color', 'red');
		}
	});
});
