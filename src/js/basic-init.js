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
    let tickets = document.querySelectorAll('.ticket--primary');
    let tariffsList = document.querySelector('.tariffs__list');

    tickets.forEach(function (ticket) {
        let ticketHeight = ticket.offsetHeight;

        var waypoint = new Waypoint({
            element: ticket,
            handler: function() {
                if ( ticket.classList.contains('ticket--first-line') ) {
                    tariffsList.classList.add('first-line-active-tickets');
                }

                if ( ticket.classList.contains('ticket--second-line') ) {
                    tariffsList.classList.add('second-line-active-tickets');
                }
            },
            offset: window.innerHeight - 350
        });
    });

    function isMobile() {
        return $.browser.device = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
    }

}); // end ready
