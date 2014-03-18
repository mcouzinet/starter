helpers = {

    cache : [],

    // IS MOBILE
    isMobile : function(){
        if(jQuery.browser.mobile) {
            app.mobile = true;
            app.UI.body.addClass('mobile');
        }
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

    preloadSprite : function(path, length, callback){
        var id = [];
        id.push(path);

        for(var i = 0; i < length; i++) {
            id[path] = i < 10 ? '0' + i : i;
            helpers.preload( 'assets/img/' + path + '_000' + id[path] + '.png' );

            if(i = length && typeof callback == 'function') { callback(); }
        }
    },

    // IF ELEMENT COMPLETELY VISIBLE : RETURN "TRUE" OR ELEMENT'S POSITION
    isOnScreen : function($el) {
        var $win = $(window),
            win = {
                scroll : $win.scrollTop(),
                width : $win.width(),
                height : $win.height()
            },
            elem = {
                width : $el.width(),
                height : $el.height(),
                top : $el.offset().top,
                left : $el.offset().left,
            },
            pos = true;

        if(elem.left + elem.width > win.width){ pos = (pos == true ? 'right' : pos + ' right'); }
        if(elem.left < 0){ pos = (pos == true ? 'left' : pos + ' left'); }

        if(elem.top < win.scroll) { pos = (pos == true ? 'top' : pos + ' top'); }
        if(win.scroll + win.height < elem.top + elem.height) { pos = (pos == true ? 'bottom' : pos + ' bottom'); }

        return pos;
    },

    // ADD HTML VIEW ON DOM : NAME'S VIEW = CLASS !
    addView : function(path, callback, $parent){
        if(typeof path != 'undefined') {
            $elem = $parent != null ? $parent : app.UI.body;
            $.ajax({
                url: '/views/' + path + '.html',
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
                            + ' display : block; position : absolute;'

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