(function(jQuery) {
    var $ = window.jQuery;
    jQuery.extend({
        tippy : {
            settings : {
                hiddenClass: 'hidden',
                defPosClass: 'tippyPosTop',
                dataClasses: 'tippyHeader tippyVessel tippyArrow'
            },
            debug : false,
            log : function(msg){
                if(!$.tippy.debug) return;
                msg = "[jQuery.tippy] " + msg;
                ret = $.tippy.hasFirebug ? console.log(msg) :$.tippy.hasConsoleLog ? window.console.log(msg) : alert(msg);
            },
            hasFirebug : "console" in window && "firebug" in window.console,
            hasConsoleLog: "console" in window && "log" in window.console
        }
    });

    var tippySettings = jQuery.tippy.settings;
    var methods = {
        init : function( options ) {

            var tClasses = tippySettings.dataClasses.split(' '),
                tHeader  = tClasses[0],
                tVessel  = tClasses[1],
                tArrow   = tClasses[2];

            return this.each(function(){
                var $this = $(this),
                html = '',

                mk_vssl  = $('<span />', {
                    id: $this.attr('id'),
                    html: $this.attr('title')
                }).addClass(tVessel),

                mk_arrow = $('<span />').addClass(tArrow),

                mk_parnt = $('<div />', {
                    html: mk_arrow.add(mk_vssl)
                }).addClass(tHeader).addClass(tippySettings.hiddenClass),

                hovIn    = function(){
                    this.title = ''
                    mk_parnt.css('left', $this.offset().left-25)
                            .css('top', ($this.offset().top - mk_parnt.height()-25))
                            .css('max-width','500px');
                    mk_parnt.removeClass(tippySettings.hiddenClass);
                },

                hovOut  = function(){
                    this.title = html
                    mk_parnt.addClass(tippySettings.hiddenClass);
                };

                $(document.body).append(mk_parnt);
                $this.hover(hovIn, hovOut);
            });
        }
    };

    $.fn.tippy = function(method, opts) {
        return ( methods[method] ) ? methods[method].apply( this, Array.prototype.slice.call( arguments, 1 )):(
            ( typeof method === 'object' || ! method ) ? methods.init.apply( this, arguments ): jQuery.error( '[jQuery.tippy] ' + method + ' does not exist' )
        );
    };
})(jQuery);
