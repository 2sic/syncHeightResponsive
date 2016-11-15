'use strict';
/**
    2sic sync-height
    https://github.com/raphael-m/syncHeightResponsive/
    Syncs the height of elements that are displayed beneath each other (by comparing their offset top)
    Include also the waitForImages plugin to ensure correct behaviour when elements contain images
**/

(function ($) {
	// Prevent duplicate initialization
    if($.syncHeightResponsive)
		return;
    
    // Elements array will contain all elements which have been added to be synced
    var selector = '.sync-height-with-neighbors';
    var elementsToSync = [];

    // The main function to be called from outside - triggers the height sync
	$.syncHeightResponsive = function() {
        elementsToSync = $(selector);
    }

    // The main function - run height sync
    var triggerHeightSync = function () {
        
        // Group elements by getting the offset top value
        var previousTop = 0,
            elementGroups = {};

        $(elementsToSync).each(function (i, e) {

            var top = Math.round($(e).offset().top);

            if (!elementGroups[top])
                elementGroups[top] = [];
            elementGroups[top].push(e);

        });

        // All groups are created, sync height for each group separately
        $.each(elementGroups, function (k, elements) {

            // Get maximal height value 
            var maxHeight = 0;
            var $elements = $(elements);
            $elements.css('height', '');

            $.each(elements, function (i, element) {
                maxHeight = Math.max(maxHeight, $(element).height());
            });

            $elements.height(maxHeight);

        });

    }

    // Call sync wrapped in a timeout to make sure other scripts that could modify the height have already run
    window.setTimeout(function () {
        triggerHeightSync();
    }, 0);

    $(window).load(function () {
        triggerHeightSync();
    });

    if ($.fn.waitForImages) {
        $(elementsToSync).waitForImages(triggerHeightSync);
    }

    var ticking = false;
    var update = function() {
        ticking = false;
        triggerHeightSync();
    };

    $(window).resize(function () {
        if (!ticking)
            window.requestAnimationFrame(update);
        ticking = true;
    });

})(jQuery);

/* Polyfill for requestAnimationFrame
	Source: http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
*/
(function() {
    if(window.requestAnimationFrame)
        return;
			
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame =
          window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
		
		window.requestAnimationFrame = function(callback, element) {
				var currTime = new Date().getTime();
				var timeToCall = Math.max(0, 16 - (currTime - lastTime));
				var id = window.setTimeout(function() { callback(currTime + timeToCall); },
					timeToCall);
				lastTime = currTime + timeToCall;
				return id;
		};
		
}());