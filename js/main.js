$(document).ready(function () {
    lazyload();

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js');
    }
});

jQuery('.cat').click(function (e) {
    jQuery('.collapse').collapse('hide');
});