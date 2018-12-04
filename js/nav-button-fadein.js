/*
 * nav-button-fadein.js
 *
 * Causes the three manatee nav buttons to pop in, one after another, rather than
 * just appearing all at once.
 */

$(function () {
    'use strict';
    $('#image-about').delay(300).fadeTo(700,1); 
    $('#image-conservation').delay(1000).fadeTo(700,1); 
    $('#image-manatees-in-art').delay(1700).fadeTo(700,1); 
});