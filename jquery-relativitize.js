(function( $ ){
	'use strict';
	//!Public functions
	var pub = {
		init : function( options ) {
			return this.each(function(){
				var $this = $(this);
				
				//If the plugin hasn't been initialized yet, read and save all settings
				if(!$.isPlainObject( $this.data('relativitize') )){
					$this.data('relativitize', $.extend({}, $.fn.relativitize.defaults, options) );
					$this.data('relativitize').date = moment( $this.attr('datetime') );
					$this.data('relativitize').originalText = $this.html();
					
					//Read options from the data-attr
					if( $this.attr('data-relativitize') !== undefined ){
						options = $this.attr('data-relativitize').split(';');
						$.each(options, function( index, value ){
							var p = value.split(':');
							p[0] = $.trim(p[0]);
							p[1] = $.trim(p[1]);
							
							if (/true/i.test(p[1])) p[1] = true;
							if (/false/i.test(p[1])) p[1] = false;
							if(! isNaN (p[1]-0) && p[1] !== null && p[1] !== "" && p[1] !== false && p[1] !== true){
								p[1] = parseInt(p[1], 10);
							}
							if (p.length === 2 && p[0].length > 0){
								$this.data('relativitize')[p[0]] = p[1];
							}
						});
					}
					
					//Bind toggle between relativ and format
					if( $this.data('relativitize').toggle ){
						$this.on('click', function(event){
							event.preventDefault();
							pub.toggle.apply($this);
						});
					}
					
					//Setup interval to update the time
					$this.data('relativitize').interval = setInterval(function(){
						pub.update.apply($this);
					}, $this.data('relativitize').refresh);
				}
				
				pub.update.apply($this);
			});
		},
		
		update: function(){
			return this.each(function(){
				var $this = $(this),
					data = $this.data('relativitize');
				
				if( moment().subtract(data.gt.key, data.gt.time).diff(data.date) < 0 ){
					if( data.relative ){
						priv.relative.apply($this);
					} else {
						priv.format.apply($this);
					}
					$this.addClass(data.toggleClass);
				} else {
					priv.format.apply($this);
					$this.removeClass(data.toggleClass);
				}
				
				if( data.relative ){
					if( moment().subtract(data.gt.key, data.gt.time).diff(data.date) < 0 ){
						priv.relative.apply($this);
					} else {
						priv.format.apply($this);
					}
				} else {
					priv.format.apply($this);
				}
			});
		},
		
		toggle: function(){
			return this.each(function(){
				var $this = $(this);
				$this.data('relativitize').relative = !$this.data('relativitize').relative;
				pub.update.apply($this);
			});
		},
		
		destroy: function(){
			return this.each(function(){
				var $this = $(this),
					data = $this.data('relativitize');
				
				clearInterval(data.interval);
				if( data.toggle ){
					$this.off('click');
				}
				$this.html( data.originalText );
				$this.removeData('relativitize');
			});
		}
	};

	//!Private functions
	var priv = {
		relative: function(){
			var $this = $(this),
				data = $this.data('relativitize');

			$this.html( data.date.fromNow() );
		},
		
		format: function(){
			var $this = $(this),
				data = $this.data('relativitize');
			
			if(data.format){
				$this.html(data.date.format(data.format));
			} else {
				$this.html(data.originalText);
			}
		}
	};
	
	$.fn.relativitize = function( method ) {
		//!Method calling logic
		if ( pub[method] ) {
			return pub[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return pub.init.apply( this, arguments );
		} else {
			console.warn( 'jQuery relativitize: Method ' +  method + ' does not exist on jQuery.myplugin' );
		}
	};

	//!Default options
	$.fn.relativitize.defaults = {
		toggle: true,
		toggleClass: 'relativitize',
		format: moment.defaultFormat,
		refresh: 10000,
		relative: true,
		gt: { 
			key: 'days', 
			time: 1 
		}
	};
	
	$('time[data-relativitize]').relativitize();
	
})( jQuery );
