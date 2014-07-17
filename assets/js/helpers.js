helpers = {


    // PRELOAD IMAGE
    preload: function(imageUrl) {
        if(!app.UI.preloader.length) {
            app.UI.body.append('<section id="UI_preloader"></section>');
            app.UI.preloader = $('#UI_preloader');
        }

        var img = new Image();
        img.src = imageUrl;
        app.UI.preloader.append($(img));
    },



    // IF ELEMENT VISIBLE : RETURN TRUE OR FALSE
    isVisible : function(elem, margin) {
        var $win = $(window),
            docViewTop = $win.scrollTop(),
            docViewBottom = docViewTop + $win.height();

        var $elem = $(elem),
            elemTop = $elem.offset().top + margin,
            elemBottom = elemTop + $elem.height() + margin;

        return ( (elemBottom  <= docViewBottom) && (elemTop >= docViewTop) );
    },



    // TEST EMAIL PATTERN : RETURN TRUE OR FALSE
    isMail : function(email) {
        var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(email);
    },



    // SEARCH STRING IN ARRAY
    inArray : function(array, search) {
        for (var i = 0; i < array.length; i++) {
            if (array[i] === search) {
                return true;
            }
        }
        return false;
    }

};