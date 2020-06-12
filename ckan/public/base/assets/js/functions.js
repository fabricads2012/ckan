(function($){
    "use strict";
    $(document).ready(function() {
        // lightcase 
        $('a[data-rel^=lightcase]').lightcase();

        // header menu
        $("ul li ul").parent("li").addClass("menu-item-has-children");

        // dropdown menu
        $('ul').parent().on('hover', function() {
            var menu = $(this).find("ul");
            var menupos = $(menu).offset();
            if (menupos.left + menu.width() > $(window).width()) {
                var newpos = -$(menu).width();
                menu.css({ left: newpos });
            }
        });

        // mobile menu responsive
        $(document).on('click','.header-bar',function(){
            $(".header-bar").toggleClass("close");
            $(".mobile-menu").toggleClass("open");
        });

        //mobile dropdown menu display
        $('.menu-item-has-children>a').on('click', function(e){
            event.preventDefault();
        });
        $('.mobile-menu-area ul li a, .shop-menu li a').on('click', function(e) {
            var element = $(this).parent('li');
            if (element.hasClass('open')) {
                element.removeClass('open');
                element.find('li').removeClass('open');
                element.find('ul').slideUp(1000,"swing");
            }
            else {
                element.addClass('open');
                element.children('ul').slideDown(1000,"swing");
                element.siblings('li').children('ul').slideUp(1000,"swing");
                element.siblings('li').removeClass('open');
                element.siblings('li').find('li').removeClass('open');
                element.siblings('li').find('ul').slideUp(1000,"swing");
            }
        });
        $(".search i, .search-close").on("click", function(){
            $(".search-area").toggleClass("open");
        });
        $(".header-right .bar-area span").on("click", function(){
            $(".sidemenubar, .bar-area").toggleClass("open");
        });
        $(".sidemenubar").on("click", function(){
            $(".sidemenubar, .bar-area").toggleClass("open");
        });

        //menu fixo
        var fixed_top = $(".header-area");
        $(window).on('scroll', function(){
            if( $(this).scrollTop() > 100 ){  
                fixed_top.addClass("animated fadeInDown menu-fixed");
            }
            else{
                fixed_top.removeClass("animated fadeInDown menu-fixed");
            }
        });

        // scroll seta rolagem
        $(function(){
            $(window).scroll(function(){
                if ($(this).scrollTop() > 300) {
                    $('.scrollToTop').css({'bottom':'2%', 'opacity':'1','transition':'all .5s ease'});
                } else {
                    $('.scrollToTop').css({'bottom':'-30%', 'opacity':'0','transition':'all .5s ease'})
                }
            });
            //Click event to scroll to top
            $('.scrollToTop').on('click', function(){
                $('html, body').animate({scrollTop : 0},500);
                return false;
            });
        });

        // banner slider section
        var swiper = new Swiper('.banner-slider', {
            slidesPerView: 1,
            spaceBetween: 10,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.banner-pagination',
                clickable: true,
            },
            loop: true,
        });

        //Testimonial Slider
        var swiper = new Swiper('.testimonial-slider', {
            slidesPerView: 3,
            spaceBetween: 0,
            autoplay: {
                delay: 2000,
                disableOnInteraction: false,
            },
            breakpoints: {
                1024: {
                    slidesPerView: 2,
                },
                767: {
                    slidesPerView: 1,
                },
            },
            loop: true,
        });

        // post-thumb-slider section
        var swiper = new Swiper('.post-thumb-slider', {
            slidesPerView: 1,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: '.post-thumb-slider-next',
                prevEl: '.post-thumb-slider-prev',
            },
            loop: true,
        });
        
        // countdown or date & time
        $('#countdown').countdown({
            date: '10/22/2020 17:00:00',
            offset: +2,
            day: 'Day',
            days: 'Days'
        });

        // counter up 
        $('.counter').counterUp({
            delay: 10,
            time: 2000
        });

        // accordion start here
        $('.accordion-item .active').slideDown();
        $('.accordion-list').click(function (e){
            if($(this).next('.accordion-answer').css('display') != 'block'){
                $('.accordion-item .active').slideUp(500).removeClass('active');
                $('.accordion-list').removeClass('in');
                $(this).next('.accordion-answer').addClass('active').slideDown(500);
                $(this).addClass('in');
            }else{
                $('.accordion-item .active').slideUp(500).removeClass('active');
                $(this).removeClass('in');
            }
        });

        // shop cart + - start here
        var CartPlusMinus = $('.cart-plus-minus');
        CartPlusMinus.prepend('<div class="dec qtybutton">-</div>');
        CartPlusMinus.append('<div class="inc qtybutton">+</div>');
        $(".qtybutton").on("click", function() {
            var $button = $(this);
            var oldValue = $button.parent().find("input").val();
            if ($button.text() === "+") {
                var newVal = parseFloat(oldValue) + 1;
            } else {
                if (oldValue > 0) {
                    var newVal = parseFloat(oldValue) - 1;
                } else {
                    newVal = 1;
                }
            }
            $button.parent().find("input").val(newVal);
        });
        
        //Isotope
        $(window).on('load',function() { 
            var $grid = $('.grid').isotope({
                itemSelector: '.port-item',
                masonry: {
                    columnWidth: 0
                }
            });
            var filterFns = {
                numberGreaterThan50: function() {
                    var number = $(this).find('.number').text();
                    return parseInt( number, 10 ) > 50;
                },
                ium: function() {
                    var name = $(this).find('.name').text();
                    return name.match( /ium$/ );
                }
            };
            $('.port-filter').on( 'click', 'li', function() {
                var filterValue = $( this ).attr('data-filter');
                filterValue = filterFns[ filterValue ] || filterValue;
                $grid.isotope({ filter: filterValue });
            });
            $('.port-filter').each( function( i, buttonGroup ) {
                var $buttonGroup = $( buttonGroup );
                    $buttonGroup.on( 'click', 'li', function() {
                    $buttonGroup.find('.active').removeClass('active');
                    $( this ).addClass('active');
                });
            });

            // skill bar or progress bar
            var skillLevel1 = jQuery('.first').data('percent');
            $('.first.circle').circleProgress({
                value:  '0.' + skillLevel1,
                fill: {gradient: ['#2dca73']}
            }).on('circle-animation-progress', function(event, progress) {
                $(this).find('strong').html(Math.round(skillLevel1 * progress) + '<i>%</i>');
            });
            //Circle ProgressBarTwo
            var skillLevel2 = jQuery('.second').data('percent');
            $('.second.circle').circleProgress({
                value:  '0.' + skillLevel2,
                fill: {gradient: ['#ff7d51']}
            }).on('circle-animation-progress', function(event, progress) {
                $(this).find('strong').html(Math.round(skillLevel2 * progress) + '<i>%</i>');
            });
            //Circle ProgressBarThree
            var skillLevel3 = jQuery('.third').data('percent');
            $('.third.circle').circleProgress({
                value:  '0.' + skillLevel3,
                fill: {gradient: ['#ffc212']}
            }).on('circle-animation-progress', function(event, progress) {
                $(this).find('strong').html(Math.round(skillLevel3 * progress) + '<i>%</i>');
            });
        });

        // service single section start here
        $(function(){
            var tabWrapper = $('.service-single .section-wrapper'),
            tabMnu = tabWrapper.find('.tab-menu  li'),
            tabContent = tabWrapper.find('.tab-cont > .tab-pane');
            tabContent.not(':first-child').hide();
            tabMnu.each(function(i){
                $(this).attr('data-tab','tab'+i);
            });
            tabContent.each(function(i){
                $(this).attr('data-tab','tab'+i);
            });

            tabMnu.on('click', function(){
                var tabData = $(this).data('tab');
                tabWrapper.find(tabContent).hide();
                tabWrapper.find(tabContent).filter('[data-tab='+tabData+']').show(); 
            });
        
            $('.tab-menu > li').on('click', function(){
                var before = $('.tab-menu li.active');
                before.removeClass('active');
                $(this).addClass('active');
            });
        });

        // product view mode change js
        $(function() {
            $('.product-view-mode').on('click', 'a', function (e) {
                e.preventDefault();
                var shopProductWrap = $('.shop-product-wrap');
                var viewMode = $(this).data('target');
                $('.product-view-mode a').removeClass('active');
                $(this).addClass('active');
                shopProductWrap.removeClass('grid list').addClass(viewMode);
            });
        });
        

        // model option start here
        $(function() {
            $('.view-modal').on('click', function () {
                $('.modal').addClass('show');
            });
            $('.close').on('click', function () {
                $('.modal').removeClass('show');
            });
        });

        $(function() {
            var galleryThumbs = new Swiper('.pro-single-thumbs', {
                spaceBetween: 10,
                slidesPerView: 3,
                loop: true,
                freeMode: true,
                loopedSlides: 5,
                watchSlidesVisibility: true,
                watchSlidesProgress: true,
                navigation: {
                nextEl: '.pro-single-next',
                prevEl: '.pro-single-prev',
                },
            });
            var galleryTop = new Swiper('.pro-single-top', {
                spaceBetween: 10,
                loop:true,
                loopedSlides: 5,
                thumbs: {
                    swiper: galleryThumbs,
                },
            });
        });
        
        //Review Tabs
        $('ul.review-nav').on('click', 'li', function (e) {
            e.preventDefault();
            var reviewContent = $('.review-content');
            var viewRev = $(this).data('target');
            $('ul.review-nav li').removeClass('active');
            $(this).addClass('active');
            reviewContent.removeClass('review-content-show description-show').addClass(viewRev);
        });

        // wow animation
        new WOW().init();
        if ($(window).width() <= 991){ 
            $(".wow").removeClass("wow");
        }

                   //contraste acessbilidade
                   var Contrast = {
                    storage: 'contrastState',
                    cssClass: 'contrast',
                    currentState: null,
                    check: checkContrast,
                    getState: getContrastState,
                    setState: setContrastState,
                    toogle: toogleContrast,
                    updateView: updateViewContrast
              };
  
              window.toggleContrast = function () { Contrast.toogle(); };
  
              Contrast.check();
  
              function checkContrast() {
                    this.updateView();
              }
  
              function getContrastState() {
                    return localStorage.getItem(this.storage) === 'true';
              }
  
              function setContrastState(state) {
                    localStorage.setItem(this.storage, '' + state);
                    this.currentState = state;
                    this.updateView();
              }
  
              function updateViewContrast() {
                    var body = document.body;
  
                    if (this.currentState === null)
                    this.currentState = this.getState();
  
                    if (this.currentState)
                    body.classList.add(this.cssClass);
                    else
                    body.classList.remove(this.cssClass);
              }
  
              function toogleContrast() {
                    this.setState(!this.currentState);
              }
              //constraste
    });
}(jQuery));