app = {

    mobile : false,

    UI : {
        'body' : $('body'),
        'preloader' : $('#UI_preloader')
    },

    init : function(){
        var $win = $(window);

        helpers.isMobile();

        app.resize();
        app.click();

        $win.bind('resize', function(){ app.resize(); });
    },

    resize : function(){

    },

    click : function(){
        var $win = $(window),
            event = app.mobile ? 'click, touchstart' : 'click';

        $win.bind(event, 'a[data-action], button[data-action]', function(e){
            e.preventDefault();

            var el = e.target,
                url = $(el).attr('href'),
                method = $(el).attr('data-action');

            if(typeof app[method] != "undefined") {
                app[method](el, url);
            } else { console.log('error : method "' + method + '" not found'); }
        });
    }
};



$(function() { app.init(); });