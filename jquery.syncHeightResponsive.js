/**
    2sic sync-height jQuery plugin
    https://github.com/raphael-m/syncHeightResponsive/
    Syncs the height of elements that are displayed beneath each other (by comparing their offset top)
    Include also the waitForImages plugin to ensure correct behaviour when elements contain images
**/

(function ($) {
    
    $.fn.syncHeightResponsive = function (config) {
        
        // Self will contain the elements to sync
        var self = $(this);

        // The main function - run height sync
        var triggerHeightSync = function () {

            // Group elements by getting the offset top value
            var previousTop = 0,
            elementGroups = [],
            currentGroup = [];

            $(self).each(function (i, e) {

                var top = Math.round($(e).offset().top);

                if (top != previousTop && currentGroup.length > 0) {
                    elementGroups.push(currentGroup);
                    currentGroup = [];
                }

                currentGroup.push(e);
                previousTop = top;

            });

            if (currentGroup.length > 0) {
                elementGroups.push(currentGroup);
            }

            // All groups are created, sync height for each group separately
            $.each(elementGroups, function (i, elements) {

                // Get maximal height value 
                var maxHeight = 0;
                $(elements).css('height', '');

                $.each(elements, function (i, element) {
                    maxHeight = Math.max(maxHeight, $(element).height());
                });

                $(elements).height(maxHeight);

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
        	$(self).waitForImages(triggerHeightSync);
        }

	    var ticking = false;
	    var update = function() {
	    	ticking = false;
		    triggerHeightSync();
	    };

        $(window).resize(function () {
        	if (!ticking)
        		requestAnimationFrame(update);
        	ticking = true;
        });

    };

})(jQuery);
