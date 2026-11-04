const cardWrapper = document.querySelector('.card-wrapper');

if (cardWrapper) {
    new Swiper('.card-wrapper', {
        loop: true,
        spaceBetween: 30,

        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true
        },

        breakpoints: {
            0: {
                slidesPerView: 1
            },
            576: {
                slidesPerView: 2
            },
            768: {
                slidesPerView: 3
            },
            1200: {
                slidesPerView: 4
            }
        }
    });
}