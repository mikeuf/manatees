/*
 * header-slide.js
 * 
 * Allows the main header for each page "slide in" over the text
 */

$(function () {
    'use strict';
    $('h1').animate({
        left: '5%',
        opacity: 1
    }, 2000)
});