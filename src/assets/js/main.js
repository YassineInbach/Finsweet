$(document).ready(function(){
  $('.single-item').slick({
      speed:2000,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      prevArrow: $('.slick-prev'),
      nextArrow: $('.slick-next'),
  });
});
