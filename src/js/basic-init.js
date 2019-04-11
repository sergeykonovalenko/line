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


    ////////////////////////////////////////////////////////////////////////////
    // FORM PROCESSING

    // masked input
    $('input[type="tel"]').mask('+7 (999) 999-99-99', {
        autoclear: false,
        completed: function () {
            this.addClass('mask-filled');
        }
    });

    // input event tracking
    let requiredInputAll = document.querySelectorAll('.required');

    requiredInputAll.forEach(function (requiredInput) {
        requiredInput.addEventListener('keyup', function () {

            let form = requiredInput.closest('form');
            let requiredInputTargeted = form.querySelectorAll('.required');
            let buttonSubmit = form.querySelector('button[data-submit]');
            let validationState = true;
            let inputPhone = form.querySelector('input[type="tel"]');
            let phoneMaskState = inputPhone.classList.contains('mask-filled');

            setTimeout(function () {
                requiredInputTargeted.forEach(function (requiredInputTargetedItem) {
                    if (requiredInputTargetedItem.classList.contains('error')) {
                        validationState = false;
                    }
                });

                if (validationState && phoneMaskState) {
                    buttonSubmit.removeAttribute('disabled');
                }

                if ( requiredInput.classList.contains('valid') ) {
                    requiredInput.closest('.form-extra__item').classList.remove('form-extra__item--invalid');
                }

                if ( requiredInput.classList.contains('error') ) {
                    requiredInput.closest('.form-extra__item').classList.add('form-extra__item--invalid');
                }
            }, 50);
        });
    });

    // tracking and removing focus
    let formFields = document.querySelectorAll('.form-extra__field');

    formFields.forEach(function (formField) {

        formField.addEventListener('focus', function () {
            let formItem = this.closest('.form-extra__item');
            formItem.classList.add('form-extra__item--focused', 'form-extra__item--should-float');
        });

        formField.addEventListener('blur', function () {
            let formItem = this.closest('.form-extra__item');
            formItem.classList.remove('form-extra__item--focused');

            if ( !formField.classList.contains('error') && formField.value === '') {
                formItem.classList.remove('form-extra__item--should-float');
            }

            if ( formField.classList.contains('error') ) {
                formItem.classList.add('form-extra__item--invalid');
            }
        });
    });

    // focus and disabling validation when closing a modal
    let modalOrder = $('#js-modal-order');

    modalOrder.on('shown.bs.modal', function () {
        $('#modal-form-phone').trigger('focus');
    });

    modalOrder.on('hidden.bs.modal', function () {
        modalOrder.find('button[data-submit]').attr('disabled', 'disabled');
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
            var re = new RegExp(regexp);
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
                }
            },
            messages:{
                phone:{
                    required:'Поле обязательно для заполнения',
                    regex:'Неправильный формат телефона'
                },
                name:{
                    required:'Поле обязательно для заполнения'
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
