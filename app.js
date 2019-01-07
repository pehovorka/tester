$(document).ready(function () {
    hashChange();
    window.onhashchange = hashChange;
    function hashChange() {
        var page = location.hash.slice(1);
        console.log(page);
        $("nav li a").removeClass('active');
        $("a[href$='#" + page + "']").addClass('active');

        $.ajax({
            url: page + '.html',
            success: function (html) {
                $("#content").empty().append(html);
            }
        });
    }

});