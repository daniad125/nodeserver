
$( document ).ready(function() {
  $('.nav').on('click', '.nav__item', function () {
    $('.nav__item').removeClass('nav__item_active')
    $(this).addClass('nav__item_active')
    var $index = $(this).index()
    $('.article').removeClass('article_active')
    $('.article').eq($index).addClass('article_active')
  })

  $('.js-link-program').click(function (e) {
    e.preventDefault()
    var $index = $('.article_program').index()
    $('.nav__item').removeClass('nav__item_active')
    $('.nav__item').eq($index).addClass('nav__item_active')
    $('.article').removeClass('article_active')
    $('.article').eq($index).addClass('article_active')
  })

  $('.js-popup').click(function () {
    $('.popup').css('display', 'flex').animate({
      opacity: 1
    })
  })

  $('.js-popup__close').click(function () {
    $('.popup').animate({
      opacity: 0
    }, function() {
      $(this).css('display', 'none')
    })
  })

  $('.popup').mouseup(function (e){
		var div = $(".popup__content");
		if (!div.is(e.target) && div.has(e.target).length === 0) {
			$('.popup').animate({
        opacity: 0
      }, function() {
        $('.popup').css('display', 'none')
      })
		}
  });

  $('.burger').click(function () {
    $(this).toggleClass('burger_active')
    $('.nav').toggleClass('nav_active')
  })

  $(document).mouseup(function (e) {
		var div = $(".burger");
		if (!div.is(e.target) && div.has(e.target).length === 0) {
			$('.burger').removeClass('burger_active')
      $('.nav').removeClass('nav_active')
		}
  });
});