alignFix = function () {
    console.log('align');
    setTimeout(function () {
        var heights = [];
        $('.clientAlign').each(function () {
            if (typeof $(this).attr('id') != 'undefined' && $(this).is(":visible")) {
                var id = $(this).attr('id').split('-');

                heights.push($(this).css('height').replace('px', ''));
                if (id[1] % 3 == 0) {
                    var maxHeight = Math.max.apply(null, heights);
                    for (i = 3; i >= 1; i--) {
                        $('#' + id[0] + '-' + String(id[1])).css('height', maxHeight + 'px');
                        id[1] = id[1] - 1;
                    }
                    heights = [];
                }
            }
        });
    }, 1500);
};