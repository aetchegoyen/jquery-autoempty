/*
 * jQuery Auto Empty plug-in 1.0.2
 *
 * Copyright (c) 2013 Alejandro Etchegoyen 
 *
 * http://www.etchegoyen.net/jquery/jquery-autoempty/
 *
 * Depends:
 * - jQuery
 *
 * Dual licensed under the MIT and GPL licences:
 * 	http://www.opensource.org/licenses/mit-license.php
 *	http://www.gnu.org/licenses/gpl.html
 *
 */
 
 (function($){
    
    //Default settings
    var config = {
        defaultValue : ""    //The default value of the input element    
    };
    
    //Plugin methods
    var methods = {
        
        init : init,
        isDefault : isDefault

    };
    
    //Plugin declaration
    $.fn.autoEmpty = function (method) {
    
        if(methods[method]){
            return methods[method].apply(this, Array.prototype.slice.call(arguments,1));
        }else if (typeof method === 'object' || ! method) {
            return methods.init.apply(this, arguments);
        }else {
            $.error('Method '+method+' does not exist');
            return false;
        } 
        
    };
    
    //Main plugin function
    function init(userConfig){
            
        return this.each(function(){
            
            //Extends the default config with user config
            if (userConfig) { 
                $.extend(config, userConfig);
            }
            
            //For jQuery optimization
            var $this = $(this);
            
            //Placeholder
            var init_value = (config.defaultValue == "") ? $this.val() : config.defaultValue;
            
            //Uses placeholder when available
            if(supportsPlaceholder()){
                $this.attr("placeholder",init_value);
            
            //When not, its simulated
            }else{
                if($this.val()=="") $this.val(init_value);
            
                $this
                    .focus(function(){
                        if($this.val()==init_value){
                            $this.val("");
                        }
                    })
                    .blur(function(){
                        if($this.val()=="") $this.val(init_value);
                    });
            }
            
        });
            
    }
    
    function isDefault(){
        var $this = $(this);
        var init_value = (config.defaultValue == "") ? $this.val() : config.defaultValue;
        return $this.val()==init_value;
    }
    
    function supportsPlaceholder() {
        test = document.createElement('input');
        return ('placeholder' in test);
    }

    
})(jQuery);
