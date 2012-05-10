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
		
		this.each(function(){
			if( $(this).is('time') ){
				var _element  = this;
				var _date = moment( $(_element).attr('datetime') );
				$(_element).html( _date.fromNow() );

				setInterval(function(){
					$(_element).html( _date.fromNow() );
				}, opts.refresh);
			} else {
				console.log('Ignoring elements that are not time.');
			};
		});
		
	};
	
	$.fn.relativitize.defaults = {
		refresh: 10000
	};
	
}(jQuery));