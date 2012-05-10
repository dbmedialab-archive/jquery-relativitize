/*

	jquery-relativitize
	--------

	@file       jquery-relativitize.js
	@version    
	@date       10.05.12
	@author     Tom-Marius Olsen <tmol@dagbladet.no>

	Copyright (c) 2012 db medialab <http://www.dbmedialab.no/>

*/

(function($) {

	$.fn.relativitize = function(options){
		
		// Extend our default options with those provided.
		var opts = $.extend({}, $.fn.relativitize.defaults, options);
		
		return this.each(function(){
			if( $(this).is('time') ){
				var _element  = this;
				var _date = moment( $(_element).attr('datetime') );
				var _text = $(_element).html();
				
				if( moment().subtract(opts.gt.key, opts.gt.time).diff(_date) < 0 ){
					$(_element).html( _date.fromNow() );
					setInterval(function(){
						$(_element).html( _date.fromNow() );
					}, opts.refresh);
				} else {
					if(opts.use_format){
						$(_element).html(_date.format(opts.format));
					} else {
						$(_element).html(_text);
					};
				};
			};
		});
		
	};
	
	$.fn.relativitize.defaults = {
		use_format: false,
		format: moment.defaultFormat,
		refresh: 10000,
		gt: { 
			key: 'days', 
			time: 1  
		}
	};
	
}(jQuery));