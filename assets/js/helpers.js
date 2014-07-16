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
    },



    // ADD or REMOVE GRID ON DOM
    grid : {
        draw : function( o, grid ){
            var $doc = $( document ),
                column = o == 'column' ? true : false

                lines = {
                    html : null,
                    size : grid.lines.size / grid.lines.count,
                    margin : column ? ( grid.unit == 'px' ? ( $doc.width() - grid.lines.size ) / 2 : ( 100 - grid.lines.size ) / 2) : 0,
                    style : null
                };

            for ( var i = 0; i < grid.lines.count + ( grid.unit == '%' && grid.lines.size == 100 ? 0 : 1 ); i++ ) {
                var p = ( lines.size * i ) + lines.margin;

                lines.style = ( column ? 'height' : 'width') + ' : 100%;'
                            + 'background : ' + grid.lines.color + ';' 
                            + ( column ? 'width' : 'height') + ': 1px;'
                            + ( column ? 'left : ' : 'top : ' ) + p + grid.unit + ';'
                            + ' display : block; position : fixed; z-index : 10000; '
                            + ( column ? 'top : 0;' : null )

                lines.html = ( lines.html == null ? '' : lines.html ) + '<span class="UI_gridJS_' + o + '" style="' + lines.style + '"></span>';
            }

            app.UI.body.append( lines.html );
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

            if ( grid.unit == '%' && grid.lines.size > 100 ) { grid.lines.size = 100; }

            helpers.grid.draw( 'column', grid );
        },
    
        row : function( unit, count, height, color ){
            $('.UI_gridJS_row').remove();

            var grid = {
                    unit : unit == '%' || unit == 'px' ? unit : '%',
                    lines : {
                        size : typeof height == 'number' ? height : 100,
                        count : typeof count == 'number' ? count : 12,
                        color : typeof color == 'string' ? color : '#ccc'
                    }
                };

            if ( grid.unit == '%' && grid.lines.size > 100 ) { grid.lines.size = 100; }

            helpers.grid.draw( 'row', grid );
            return false;
        },

        remove : function( column, row ) {
            if ( column == true || column == null ) { $('.UI_gridJS_column').remove(); }
            if ( row == true || row == null ) { $('.UI_gridJS_row').remove(); }
        }
    }
};