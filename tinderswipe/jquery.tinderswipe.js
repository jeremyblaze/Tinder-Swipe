(function($){
$.fn.tinderswipe = function(options){

    var elem = $(this);
    $(elem).addClass('tinderswipe_container');

    var defaults = {
        endItemClass: 'end',
        afterYes: function() {},
        afterNo: function() {}
    };
    
    var options = $.extend(defaults, options);
    
    var elemCount = $(elem).children('li').length;
    
    var newElemIndex = elemCount;
    $(elem).children('li').each(function(){
        $(this).css('z-index', newElemIndex);
        newElemIndex = newElemIndex - 1;
    });
    
    $(elem).children('li').first().addClass('active');
    
    $(elem).append('<a class="tinderswipe_yes"></a>');
    $(elem).append('<a class="tinderswipe_no"></a>');
    
    $('.tinderswipe_yes').click(function(){
        tinderswipeYes();
    });
    
    $('.tinderswipe_no').click(function(){
        tinderswipeNo();
    });
    
    $(document).keyup(function(e){
        if (e.keyCode == 37) {
            tinderswipeNo();
            return false;
        }
    });
    
    $(document).keyup(function(e){
        if (e.keyCode == 39) {
            tinderswipeYes();
            return false;
        }
    });
    
    function tinderswipeYes() {
        var actv = $(elem).children('li.active');
        if ( !$(actv).hasClass('yes') && !$(actv).hasClass('no') && !$(actv).hasClass(options.endItemClass) ) {
            var actvIndex = $(actv).index();
            var nextIndex =  actvIndex + 2;
            
            $(actv).addClass('yes');
            $(actv).removeClass('active');
            $(elem).children('li:nth-child(' + nextIndex + ')').addClass('active');
            
            var actvId = $(actv).attr('id');
            options.afterYes(actvId);
        }
    }
    
    function tinderswipeNo() {
        var actv = $(elem).children('li.active');
        if ( !$(actv).hasClass('yes') && !$(actv).hasClass('no') && !$(actv).hasClass(options.endItemClass) ) {
            var actvIndex = $(actv).index();
            var nextIndex =  actvIndex + 2;
            
            $(actv).addClass('no');
            $(actv).removeClass('active');
            $(elem).children('li:nth-child(' + nextIndex + ')').addClass('active');
            
            var actvId = $(actv).attr('id');
            options.afterNo(actvId);
        }
    }

};
})(jQuery);
