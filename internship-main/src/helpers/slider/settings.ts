const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 100,
  slidesToShow: 3,
  slidesToScroll: 3,
  autoplay: false,
  autoplaySpeed: 3000,
  pauseOnHover: true,
  adaptiveHeight: true,
  responsive: [
    {
      breakpoint: 500,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: false,
      },
    },
  ],
};

export { sliderSettings };
