$(document).ready(function () {
    lazyload();

     if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js');
    }

    if (window.location.hash && window.location.hash.indexOf('#') > -1) {
        $('.collapse').collapse('hide');
        $('#' + window.location.hash.substring(1) + "-table").collapse("show");
        $('#' + window.location.hash.substring(1) + "-mobile-table").collapse("show");
    }

    $('.exception').popup({
            position: 'right center',
            title: 'Exceptions & Restrictions'
        });
});

$('.cat').click(function () {
    // Collapse all other tables.
    $('.collapse').collapse('hide');

    // Check if category tables are displayed
    if (!$('#' + window.location.hash.substring(1) + "-table").hasClass('collapsing') && !$('#' + window.location.hash.substring(1) + "-mobile-table").hasClass('collapsing')) {
        window.location.hash = this.id;
        $('#' + window.location.hash.substring(1) + "-table").collapse("show");
        $('#' + window.location.hash.substring(1) + "-mobile-table").collapse("show");
    } else {
        // Remove #category in URL
        history.pushState("", document.title, window.location.pathname + window.location.search);
    }
});
