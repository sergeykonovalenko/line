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

    // masked input
    $('input[type="tel"]').mask('+7 (999) 999-99-99', {
        completed: function() {
            this.addClass('phone-valid');

            let formItemAll = document.querySelectorAll('.form__item') || false;
            if (formItemAll) {
                formItemAll.forEach(function (formItem) {
                    formItem.classList.add('ng-valid');
                    formItem.classList.remove('ng-invalid');
                });
            }
        }
    });

    let fieldPhoneAll = document.querySelectorAll('input[type="tel"');

    fieldPhoneAll.forEach(function (fieldPhone) {
        fieldPhone.oninput = function () {
            console.log(555);
        }
    });

    // form
    let formFields = document.querySelectorAll('.form__field');

    formFields.forEach(function (formField) {
        formField.addEventListener('focus', function () {
            let formItem = this.closest('.form__item');
            formItem.classList.add('form__item--focused');
        });

        formField.addEventListener('blur', function () {
            let formItem = this.closest('.form__item');
            
            if ( formField.classList )
            formItem.classList.remove('form__item--focused');
        });
    });

    $('#js-modal-order').on('shown.bs.modal', function () {
        $('#modal-form-phone').trigger('focus');
    });


    // Send callback / Send request / Buy product
    let btnOrder = document.querySelector('.btn-order');

    btnOrder.addEventListener('click', function (e) {
        e.preventDefault();

        let request_frm = this.closest('form');
        let errorMsgAll = request_frm.querySelectorAll('.error-msg');
        errorMsgAll.forEach(function (errorMsg) {
            errorMsg.classList.add('error-msg--hide')
        });

        let errorFlag = 0;
        let rqfAll = request_frm.querySelectorAll('.rqf');
        rqfAll.forEach(function (rqf) {
            rqf.classList.remove('error-fld');
            if ( rqf.value === '' || rqf.classList.contains('fld-email') && !isEmail(rqf.value) ) {
                errorFlag++;
                rqf.classList.add('error-fld')
            }
        });

        if ( !errorFlag ) {
            function f() {

            }
        } else {
            errorMsgAll.forEach(function (errorMsg) {
                errorMsg.classList.add('error-msg--show')
            });
        }
    });


    function isMobile() {
        return $.browser.device = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
    }

    function isEmail(email) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    }

    function numberWithSpaces(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }

}); // end ready
