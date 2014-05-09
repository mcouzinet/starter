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
        app.initClick();

        $win.bind('resize', function(){ app.resize(); });
    },


    initClick : function(){
        var $doc = $(document),
            event = app.mobile ? 'click, touchstart' : 'click';

        $doc.on(event, 'a[data-action], button[data-action]', function(e){
            e.preventDefault();

            var $elem = $(e.currentTarget),
                url = $elem.attr('href'),
                action = $elem.attr('data-action').split(':'),
                module = action[0],
                method = action[1];

            var params = url + ',' + $elem;

            if(typeof method == "undefined") {
                method = module;
                module = app;
            }

            module = typeof module == 'object' ? module : eval(module);

            if(typeof module[method] != "undefined") {
                module[method](url, $elem);
            } else { console.log('error : method "' + method + '" not found'); }
        });
    },


    resize : function(url, elem){

    }
};


$(function() { app.init(); });