$(document).ready(function() {
  
  // Initialize single-item slick slider
  function initializeSingleItemSlider() {
    $('.single-item').slick({
      speed: 2000,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      prevArrow: $('.slick-prev'),
      nextArrow: $('.slick-next'),
    });
  }

  // Initialize multiple-items slick slider
  function initializeMultipleItemsSlider() {
    $('.multiple-items').slick({
      speed: 2000,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      prevArrow: $('.slick-prev'),
      nextArrow: $('.slick-next'),
    });
  }

  // Call initialization functions
  initializeSingleItemSlider();
  initializeMultipleItemsSlider();

});

