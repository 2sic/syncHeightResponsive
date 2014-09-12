/**
    2sic sync-height jQuery plugin
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

                var top = $(e).offset().top;

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
                $(elements).css('height', 'auto');

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

        $(window).resize(function () {
            triggerHeightSync();
        });

        if ($.fn.waitForImages) {
            $(self).waitForImages(triggerHeightSync);
        }

    };

})(jQuery);
