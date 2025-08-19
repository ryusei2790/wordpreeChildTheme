jQuery(function($) {
    let lastScroll = 0;

    $(window).on("scroll", function() {
        let currentScroll = $(this).scrollTop();

        if (currentScroll > lastScroll) {

            $(".header__foot").fadeOut(300);
            $(".close-btn img").attr("src", "/assets/img/open.png");
        } else {

            $(".header__foot").fadeIn(300);
            $(".close-btn img").attr("src", "/assets/img/close.png");
        }
        lastScroll = currentScroll;
    });
});