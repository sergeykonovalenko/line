$(document).ready(function () {
    'use strict';

    const is_mobile = isMobile();

    // parallax when moving the mouse
    let scene = document.getElementById('js-scene');
    let parallax = new Parallax(scene);

    // parallax background
    if (!is_mobile) {
        let $window = $(window);

        $('[data-type="background"]').each(function() {
            let $bgobj = $(this);

            $(window).scroll(function() {
                let yPos = -($window.scrollTop() / $bgobj.data('speed'));
                let coords = '50% '+ yPos + 'px';

                $bgobj.css({ backgroundPosition: coords });
            });
        });
    }

    // tickets animation
    let tickets = document.querySelectorAll('.tariffs__item');

    tickets.forEach(function (ticket) {
        let ticketHeight = ticket.offsetHeight;

        var waypoint = new Waypoint({
            element: ticket,
            handler: function() {
                ticket.classList.add('tariffs__item--animation');
            },
            offset: window.innerHeight - 350
        });
    });

    function isMobile() {
        return $.browser.device = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
    }

}); // end ready
