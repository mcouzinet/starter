helpers = {

    cache : [],


    // LIST OBJECT METHOD : DEFAULT = HELPERS
    list : function(obj) {
        if(typeof obj != 'object') { obj = helpers; }
        var list = Object.getOwnPropertyNames(obj);

        for(var i = 0; i < list.length; i++) {
            var subList = typeof obj[list[i]] == 'object' ? Object.getOwnPropertyNames( obj[list[i]] ) : '';
            console.log(list[i], subList);
        }
    },


    // IS MOBILE
    isMobile : function(){
        if(jQuery.browser.mobile) {
            app.mobile = true;
            app.UI.body.addClass('mobile');
        } else { app.UI.body.removeClass('mobile'); }
    },


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


    // TODO : REVIEW PATH PRELOAD
    // ANIM SPRITE : CSS BACKGROUND
    sprite: function($el, path, length, loop, callback){
        var id = [],
            interval = [],
            countLoop = 0,
            speed = 33;

        id.push(path);
        id[path] = 0;

        interval.push(path);
        interval[path] = setInterval(function(){

            if(id[path] > length) {
                id[path] = 0;
                countLoop++;
            }

            if(loop != null && countLoop > loop) {
                clearInterval(interval[path]);
                if(typeof callback == 'function') { callback(); }
                return false;
            }

            $el.css({ 'background-image' : 'url("assets/img/' + path + '_000' + (id[path] < 10 ? '0' + id[path] : id[path]) + '.png")'});
            id[path]++;

        }, speed);
    },


    // PRELOAD SPRITE IMAGE
    preloadSprite : function(path, length, callback){
        var id = [];
        id.push(path);

        for(var i = 0; i < length; i++) {
            id[path] = i < 10 ? '0' + i : i;
            helpers.preload( 'assets/img/' + path + '_000' + id[path] + '.png' );

            if(i = length && typeof callback == 'function') { callback(); }
        }
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


    // ADD HTML VIEW ON DOM : NAME'S VIEW = CLASS !
    addView : function(path, $parent, callback){
        if(typeof path != 'undefined') {
            var $elem = $parent != null ? $parent : app.UI.body;
            $.ajax({
                url: '/views/' + path,
                success: function (data) {
                    $elem.append(data);
                    helpers.cache[path] = $('.' + path);

                    if(typeof callback == 'function') { callback(); }
                },
                dataType: 'html'
            });
        } else { console.log('view undefined'); }
    },


    // REMOVE HTML VIEW
    removeView : function(path, callback){
        if(typeof helpers.cache[path] == "undefined") {
            console.log('elem not found');
        } else {
            helpers.cache[path].remove();
            delete helpers.cache[path];
            if(typeof callback == 'function') { callback(); }
        }
    },


    // TEST EMAIL PATTERN : RETURN TRUE OR FALSE
    isMail : function(email) {
        var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(email);
    },


    // TODO !
    // INIT CUSTOM SOCIAL
    social : function(){

        console.log(sharrre);
        return false;

        $('#twitter').sharrre({
            share: {
                twitter: true
            },
            template: '<a class="UI_social" href="#"><div class="share"><span></span>Tweet</div><div class="count" href="#">{total}</div></a>',
            enableHover: false,
            enableTracking: true,
            buttons: {
                twitter: {  }
            },
            click: function(api, options){
                api.simulateClick();
                api.openPopup('twitter');
            }
        });

        $('#facebook').sharrre({
            share: {
                facebook: true
            },
            template: '<a class="box" href="#"><div class="share"><span></span>Like</div><div class="count" href="#">{total}</div></a>',
            enableHover: false,
            enableTracking: true,
            click: function(api, options){
                api.simulateClick();
                api.openPopup('facebook');
            }
        });

        $('#googleplus').sharrre({
            share: {
                googlePlus: true
            },
            template: '<a class="box" href="#"><div class="share"><span></span>Google+</div><div class="count" href="#">{total}</div></a>',
            enableHover: false,
            enableTracking: true,
            click: function(api, options){
                api.simulateClick();
                api.openPopup('googlePlus');
            }
        });
    },



    // SEARCH STRING IN ARRAY
    inArray : function(array, search) {
        for (var i = 0; i < array.length; i++) {
            if (array[i] === search) {
                return true;
            }
        }
        return false;
    },


    // ADD or REMOVE GRID ON DOM
    grid : {
        draw : function(o, grid){
            var $doc = $(document),
                column = o == 'column' ? true : false

                lines = {
                    html : null,
                    size : grid.lines.size / grid.lines.count,
                    margin : column ? ( grid.unit == 'px' ? ( $doc.width() - grid.lines.size ) / 2 : ( 100 - grid.lines.size ) / 2) : 0,
                    style : null
                };

            for(var i = 0; i < grid.lines.count + ( grid.unit == '%' && grid.lines.size == 100 ? 0 : 1 ); i++) {
                var p = (lines.size * i) + lines.margin;

                lines.style = (column ? 'height' : 'width') + ' : 100%;'
                            + 'background : ' + grid.lines.color + ';' 
                            + (column ? 'width' : 'height') + ': 1px;'
                            + (column ? 'left : ' : 'top : ') + p + grid.unit + ';'
                            + ' display : block; position : fixed; z-index : 10000; '
                            + (column ? 'top : 0;' : null)

                lines.html = ( lines.html == null ? '' : lines.html ) + '<span class="UI_gridJS_' + o + '" style="' + lines.style + '"></span>';
            }

            app.UI.body.append(lines.html);
        },

        column : function(unit, count, width, color){
            $('.UI_gridJS_column').remove();

            var grid = {
                    unit : unit == '%' || unit == 'px' ? unit : '%',
                    lines : {
                        size : typeof width == 'number' ? width : 100,
                        count : typeof count == 'number' ? count : 12,
                        color : typeof color == 'string' ? color : '#ccc'
                    }
                };

            if(grid.unit == '%' && grid.lines.size > 100) { grid.lines.size = 100; }

            helpers.grid.draw('column', grid);
        },
    
        row : function(unit, count, height, color){
            $('.UI_gridJS_row').remove();

            var grid = {
                    unit : unit == '%' || unit == 'px' ? unit : '%',
                    lines : {
                        size : typeof height == 'number' ? height : 100,
                        count : typeof count == 'number' ? count : 12,
                        color : typeof color == 'string' ? color : '#ccc'
                    }
                };

            if(grid.unit == '%' && grid.lines.size > 100) { grid.lines.size = 100; }

            helpers.grid.draw('row', grid);
            return false;
        },

        remove : function(column, row) {
            if( column == true || column == null ) { $('.UI_gridJS_column').remove(); }
            if( row == true || row == null ) { $('.UI_gridJS_row').remove(); }
        }
    }
};