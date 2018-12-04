/*
 * window-confirmation.js
 *
 * Simple confirmation window appears, confirming whether the user wants to 
 * play "Deep Space Manatee"
 * 
 */
document.getElementById('logo').addEventListener('click', function () {
    if (window.confirm("Are you ready to play Deep Space Manatee?")) {
        window.open('https://www.mikepblack.com/manatee/'); 
        } 
            event.preventDefault();    
});