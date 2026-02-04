/** 
 * ===================================================================
 * main js
 *
 * ------------------------------------------------------------------- 
 */ 

(function($) {

	"use strict";

	/*---------------------------------------------------- */
	/* Preloader
	------------------------------------------------------ */ 
   $(window).load(function() {

      // will first fade out the loading animation 
    	$("#loader").fadeOut("slow", function(){

        // will fade out the whole DIV that covers the website.
        $("#preloader").delay(300).fadeOut("slow");

      });       

  	})


  	/*---------------------------------------------------- */
  	/* FitText Settings
  	------------------------------------------------------ */
  	setTimeout(function() {

   	$('#intro h1').fitText(1, { minFontSize: '42px', maxFontSize: '84px' });

  	}, 100);


	/*---------------------------------------------------- */
	/* FitVids
	------------------------------------------------------ */ 
  	$(".fluid-video-wrapper").fitVids();


	/*---------------------------------------------------- */
	/* Owl Carousel
	------------------------------------------------------ */ 
	$("#owl-slider").owlCarousel({
        navigation: false,
        pagination: true,
        itemsCustom : [
	        [0, 1],
	        [700, 2],
	        [960, 3]
	     ],
        navigationText: false
    });


	/*----------------------------------------------------- */
	/* Alert Boxes
  	------------------------------------------------------- */
	$('.alert-box').on('click', '.close', function() {
	  $(this).parent().fadeOut(500);
	});	


	/*----------------------------------------------------- */
	/* Stat Counter
  	------------------------------------------------------- */
   var statSection = $("#stats"),
       stats = $(".stat-count");

   statSection.waypoint({

   	handler: function(direction) {

      	if (direction === "down") {       		

			   stats.each(function () {
				   var $this = $(this);

				   $({ Counter: 0 }).animate({ Counter: $this.text() }, {
				   	duration: 4000,
				   	easing: 'swing',
				   	step: function (curValue) {
				      	$this.text(Math.ceil(curValue));
				    	}
				  	});
				});

       	} 

       	// trigger once only
       	this.destroy();      	

		},
			
		offset: "90%"
	
	});	


	/*---------------------------------------------------- */
	/*	Masonry
	------------------------------------------------------ */
	var containerProjects = $('#folio-wrapper');

	containerProjects.imagesLoaded( function() {

		containerProjects.masonry( {		  
		  	itemSelector: '.folio-item',
		  	resize: true 
		});

	});


	/*----------------------------------------------------*/
	/*	Modal Popup
	------------------------------------------------------*/
   $('.item-wrap a').magnificPopup({

      type:'inline',
      fixedContentPos: false,
      removalDelay: 300,
      showCloseBtn: false,
      mainClass: 'mfp-fade'

   });

   $(document).on('click', '.popup-modal-dismiss', function (e) {
   	e.preventDefault();
   	$.magnificPopup.close();
   });

	
	/*-----------------------------------------------------*/
  	/* Navigation Menu
   ------------------------------------------------------ */  
   var toggleButton = $('.menu-toggle'),
       nav = $('.main-navigation');

   // toggle button
   toggleButton.on('click', function(e) {

		e.preventDefault();
		toggleButton.toggleClass('is-clicked');
		nav.slideToggle();

	});

   // nav items	
  	nav.find('li a').on("click", function() {   

   	// update the toggle button 		
   	toggleButton.toggleClass('is-clicked'); 
   	// fadeout the navigation panel
   	nav.fadeOut();   		
   	     
  	});


   /*---------------------------------------------------- */
  	/* Highlight the current section in the navigation bar
  	------------------------------------------------------ */
	var sections = $("section"),
	navigation_links = $("#main-nav-wrap li a");	

	sections.waypoint( {

       handler: function(direction) {

		   var active_section;

			active_section = $('section#' + this.element.id);

			if (direction === "up") active_section = active_section.prev();

			var active_link = $('#main-nav-wrap a[href="#' + active_section.attr("id") + '"]');			

         navigation_links.parent().removeClass("current");
			active_link.parent().addClass("current");

		}, 

		offset: '25%'
	});


	/*---------------------------------------------------- */
  	/* Smooth Scrolling
  	------------------------------------------------------ */
  	$('.smoothscroll').on('click', function (e) {
	 	
	 	e.preventDefault();

   	var target = this.hash,
    	$target = $(target);

    	$('html, body').stop().animate({
       	'scrollTop': $target.offset().top
      }, 800, 'swing', function () {
      	window.location.hash = target;
      });

  	});  
  

   /*---------------------------------------------------- */
	/*  Placeholder Plugin Settings
	------------------------------------------------------ */ 
	$('input, textarea, select').placeholder()  


  	/*---------------------------------------------------- */
	/*	contact form
	------------------------------------------------------ */

	/* local validation */
	$('#contactForm').validate({

		/* submit via ajax */
		submitHandler: function(form) {

			var sLoader = $('#submit-loader');

			$.ajax({      	

		      type: "POST",
		      url: "inc/sendEmail.php",
		      data: $(form).serialize(),
		      beforeSend: function() { 

		      	sLoader.fadeIn(); 

		      },
		      success: function(msg) {

	            // Message was sent
	            if (msg == 'OK') {
	            	sLoader.fadeOut(); 
	               $('#message-warning').hide();
	               $('#contactForm').fadeOut();
	               $('#message-success').fadeIn();   
	            }
	            // There was an error
	            else {
	            	sLoader.fadeOut(); 
	               $('#message-warning').html(msg);
		            $('#message-warning').fadeIn();
	            }

		      },
		      error: function() {

		      	sLoader.fadeOut(); 
		      	$('#message-warning').html("Something went wrong. Please try again.");
		         $('#message-warning').fadeIn();

		      }

	      });     		
  		}

	});


	/*----------------------------------------------------- */
   	/* Back to top
   ------------------------------------------------------- */ 
	var pxShow = 300; // height on which the button will show
	var fadeInTime = 400; // how slow/fast you want the button to show
	var fadeOutTime = 400; // how slow/fast you want the button to hide
	var scrollSpeed = 300; // how slow/fast you want the button to scroll to top. can be a value, 'slow', 'normal' or 'fast'

   // Show or hide the sticky footer button
	jQuery(window).scroll(function() {

		if (!( $("#header-search").hasClass('is-visible'))) {

			if (jQuery(window).scrollTop() >= pxShow) {
				jQuery("#go-top").fadeIn(fadeInTime);
			} else {
				jQuery("#go-top").fadeOut(fadeOutTime);
			}

		}		

	});		


  /*----------------------------------------------------- */
  /* Luxury interactions: cursor, magnet, reveals, parallax
  ------------------------------------------------------- */
  (function() {
    var cursorEl = document.getElementById('lux-cursor');
    if (!cursorEl) return;

    var pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    var target = { x: pos.x, y: pos.y };
    var ease = 0.18;
    var rafId = null;

    function animate() {
      pos.x += (target.x - pos.x) * ease;
      pos.y += (target.y - pos.y) * ease;
      cursorEl.style.transform = 'translate3d(' + pos.x + 'px,' + pos.y + 'px,0)';
      rafId = requestAnimationFrame(animate);
    }
    animate();

    window.addEventListener('mousemove', function(e) {
      target.x = e.clientX;
      target.y = e.clientY;
      cursorEl.style.opacity = '1';
    });
    window.addEventListener('mouseleave', function() {
      cursorEl.style.opacity = '0';
    });

    function magnetize(el) {
      var strength = 12;
      var rect, centerX, centerY;

      function onMove(e) {
        rect = el.getBoundingClientRect();
        centerX = rect.left + rect.width / 2;
        centerY = rect.top + rect.height / 2;
        var dx = (e.clientX - centerX) / rect.width;
        var dy = (e.clientY - centerY) / rect.height;
        el.style.transform = 'translate(' + (dx * strength) + 'px,' + (dy * strength) + 'px)';
      }
      function onEnter() {
        cursorEl.style.width = '32px';
        cursorEl.style.height = '32px';
        cursorEl.style.marginLeft = '-16px';
        cursorEl.style.marginTop = '-16px';
        cursorEl.style.boxShadow = '0 0 40px rgba(212,175,55,0.35)';
      }
      function onLeave() {
        el.style.transform = 'translate(0,0)';
        cursorEl.style.width = '24px';
        cursorEl.style.height = '24px';
        cursorEl.style.marginLeft = '-12px';
        cursorEl.style.marginTop = '-12px';
        cursorEl.style.boxShadow = '0 0 30px rgba(212,175,55,0.25)';
      }
      el.addEventListener('mousemove', onMove);
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    }

    var magnetTargets = document.querySelectorAll('.main-navigation a, .button, .logo a');
    magnetTargets.forEach(function(el) { magnetize(el); });

    // Reveal on scroll
    var revealTargets = document.querySelectorAll('.section-intro, .service, .folio-item, .timeline-block');
    revealTargets.forEach(function(el){ el.classList.add('reveal'); });
    var io = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealTargets.forEach(function(el){ io.observe(el); });

    // Subtle parallax in hero
    var intro = document.getElementById('intro');
    var introContent = intro ? intro.querySelector('.intro-content') : null;
    if (intro && introContent) {
      intro.addEventListener('mousemove', function(e) {
        var rect = intro.getBoundingClientRect();
        var dx = (e.clientX - (rect.left + rect.width/2)) / rect.width;
        var dy = (e.clientY - (rect.top + rect.height/2)) / rect.height;
        introContent.style.transform = 'translate3d(' + (dx * 14) + 'px,' + (dy * 14) + 'px,0)';
      });
      intro.addEventListener('mouseleave', function(){
        introContent.style.transform = 'translate3d(0,0,0)';
      });
    }

  })();

})(jQuery);