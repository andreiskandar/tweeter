$(document).ready(() => {
  const maxChar = 140;

  //character count listener
  $('#tweet-text').on('keyup', function () {
    let length = $(this).val().length;
    let output = this.nextElementSibling.children.counter.children;
    if (length > 140) {
      $('#chars').css('color', 'red');
    } else {
      $('#chars').css('color', 'inherit');
    }
    length = maxChar - length;
    output[0].innerHTML = length;
  });
});
