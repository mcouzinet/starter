app = {

    mobile : false,


    UI : {
        'body' : $( 'body' ),
        'preloader' : $( '#UI_preloader' )
    },



    init : function(){
        var $win = $( window );

        app.resize();
        app.initClick();

        $win.bind( 'resize', function(){
            app.resize();
        });
    },



    initClick : function(){
        var $doc = $(document);

        $doc.on( 'click' , 'a[data-action], button[data-action]', function(e){

            e.preventDefault();


            var $elem = $( e.currentTarget ),
                url = $elem.attr( 'href' ),
                action = $elem.attr( 'data-action' ).split( ':' ),
                module = eval( action[ 0 ] ),
                method = action[ 1 ];

            if ( typeof module[ method ] != "undefined" ) {
                module[ method ]( url, $elem );

            } else {
                console.log( 'error : method "' + method + '" not found' );

            }
        });
    },



    resize : function( url, elem ){

    },



    doSomething : function( url, elem) {
        console.log( elem );
    }
};


$(function() { app.init(); });