$(document).ready(function () {
    lazyload();

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js');
    }

    if (window.location.hash && window.location.hash.indexOf('#') > - 1) {
        $('.collapse').collapse('hide');
        $('#'+window.location.hash.substring(1)+"-table").collapse("show");
        $('#'+window.location.hash.substring(1)+"-mobile-table").collapse("show");
    }
});

$('.cat').click(function (e) {
});

$('.cat').click(function () {
    // Collapse all other tables.
    $('.collapse').collapse('hide');


    $('html, body').animate({
        scrollTop: $(this).offset().top - 25
    }, 1000);
});
