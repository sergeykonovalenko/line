$(document).ready(function () {
    'use strict';

    const is_mobile = isMobile();

    // parallax when moving the mouse
    let scene = document.getElementById('js-scene');
    let parallax = scene ? new Parallax(scene) : '';

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

    // show/hide mobile menu
    $('.top-nav__hamburger').on('click', function () {
        $('html').toggleClass('show-main-nav');
    });

    $('.drawer-backdrop, .top-nav__call-order').on('click', function () {
        $('html').removeClass('show-main-nav');
    });

    // animation of tariff cards
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

    // cancel event when clicking on active menu items
    $('.current-menu-item a, .services__item--current a, .sidenav__item--current a').on('click', function (e) {
        e.preventDefault();
    });

    ////////////////////////////////////////////////////////////////////////////
    // FORM PROCESSING

    // masked input
    $('input[type="tel"]').mask('+7 (999) 999-99-99', {
        autoclear: false,
        completed: function () {
            this.addClass('mask-filled');
        }
    });

    let formExtraFields = $('.form-extra__field');

    // input event tracking
    formExtraFields.on('input, keyup', function () {

        let form = $(this).closest('form');
        let inputTargeted = form.find('input');
        let buttonSubmit = $(this).closest('form').find('.modal-form__button');

        if ( form.valid() ) {
            buttonSubmit.removeAttr('disabled');
        } else {
            buttonSubmit.attr('disabled', 'disabled');
        }

        inputTargeted.each(function () {
            let formExtraItem = $(this).closest('.form-extra__item');

            if ( $(this).valid() ) {
                formExtraItem.removeClass('form-extra__item--invalid');
            } else {
                formExtraItem.addClass('form-extra__item--invalid');
            }
        });
    });

    // tracking and removing focus
    formExtraFields.on('focus', function () {
        let formExtraItem = $(this).closest('.form-extra__item');

        formExtraItem.addClass('form-extra__item--focused form-extra__item--should-float');
    });

    $('.request__field').on('focus', function () {
        if ( !$(this).valid() ) {
            $(this).closest('.form-extra__item').addClass('form-extra__item--invalid');
        }
    });

    formExtraFields.on('blur', function () {
        let formExtraItem = $(this).closest('.form-extra__item');

        formExtraItem.removeClass('form-extra__item--focused');

        if ( $(this).valid() && $(this).val() === '' ) {
            formExtraItem.removeClass('form-extra__item--should-float');
        }

        if ( !$(this).valid() ) {
            formExtraItem.addClass('form-extra__item--invalid');
        }

    });

    // focus and disabling validation when closing a modal
    let modalOrder = $('#js-modal-order');

    modalOrder.on('shown.bs.modal', function () {
        $('#modal-form-phone').trigger('focus');
    });

    modalOrder.on('hidden.bs.modal', function () {
        modalOrder.find('.modal-form__button').attr('disabled', 'disabled');
        modalOrder.find('input').val('');
    });

    // form submission
    $('[data-submit]').on('click', function(e) {
        e.preventDefault();
        $(this).parent('form').submit();
    });

    $.validator.addMethod(
        "regex",
        function(value, element, regexp) {
            let re = new RegExp(regexp);
            return this.optional(element) || re.test(value);
        },
        "Пожалуйста, проверьте свои данные"
    );

    function valEl(el) {
         let validator = el.validate({
            rules:{
                phone:{
                    required:true,
                    regex: '^([\+]+)*[0-9\x20\x28\x29\-]{5,20}$'
                },
                name:{
                    required:false
                },
                email:{
                    required:false
                }
            },
            messages:{
                phone:{
                    required:'Поле обязательно для заполнения',
                    regex:'Неправильный формат телефона'
                },
                name:{
                    required:'Поле обязательно для заполнения'
                },
                email:{
                    required:'Поле обязательно для заполнения',
                    email:'Неправильный формат email'
                }
            },
            submitHandler: function (form) {
                $('.modal-order').modal('hide');
                $('.loader').fadeIn();
                var $form = $(form);
                var $formId = $(form).attr('data-id');

                $.ajax({
                    type: 'POST',
                    url: $form.attr('action'),
                    data: $form.serialize(),
                })
                    .always(function (response) {
                        setTimeout(function () {
                            $('.loader').fadeOut();
                        },800);
                        setTimeout(function () {
                            $('.modal-thanks').modal('show');
                            $form.trigger('reset');
                            $('.form-extra__item').removeClass('form-extra__item--should-float');
                        },1100);
                    });

                return false;
            }
        });
    }

    $('.js-form').each(function() {
        valEl( $(this) );
    });

    ////////////////////////////////////////////////////////////////////////////


    function isMobile() {
        return $.browser.device = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
    }

    function numberWithSpaces(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }

}); // end ready
