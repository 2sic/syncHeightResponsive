syncHeightResponsive
====================

syncHeightResponsive is a jQuery plugin which can sync the height of elements that are displayed beneath each other (by comparing the offset top value). Helps in responsive designs when elements are floated.

## Usage
Simply include `jquery.syncHeightResponsive.min.js`, then add the class `sync-height-with-neighbors` to elements to be synced.  

## Wait for images
If the elements contain images, include also `jquery.waitforimages.min.js` from https://github.com/alexanderdickson/waitForImages to ensure the height is synced correctly. syncHeightResponsive will automatically use waitForImages and calculate the height again after all images have loaded.

## Example
https://rawgit.com/2sic/syncHeightResponsive/master/example.html