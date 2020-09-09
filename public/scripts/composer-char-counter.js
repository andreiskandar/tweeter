$(document).ready(() => {
	const maxChar = 140;

	//character count listener
	$('#focus').on('keyup', function () {
		let length = $(this).val().length;

		if (length > 140) {
			$('#chars').css('color', 'red');
		} else {
			$('#chars').css('color', 'inherit');
		}
		length = maxChar - length;
		let value = $('#chars').text(length);
	});
});
