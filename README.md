#README

Simple jquery-plugin making time-tags relative using moment.js

##Usage:

Add `data-relativitize` to a time-tag.

HTML:	
	
	<time datetime="2013-10-22T09:19:44+02:00" data-relativitize></time>
	
	<!-- with options -->
	
	<time datetime="2013-10-22T09:19:44+02:00" data-relativitize="format:dddd, MMMM Do YYYY, hh.mm.ss;"></time>
	
or, using javascript:

	$('time').relativitize();
	
	//with options
	$('time').relativitize({ 'format': 'dddd, MMMM Do YYYY, hh.mm.ss' });

Options:
	
	$('time').relativitize({
		toggle: true,				  // Enable toggle between relative and formated date
		toggleClass: 'relativitize', // The class the time-tag recives when it can be toggled
		format: moment.defaultFormat, // YYYY-MM-DDTHH:mm:ssZ
		refresh: 10000,				  // Milliseconds for each refresh
		relative: true,				  // Wheter to display the relative data or the formated date
		gt: { 						  // Only relativitize dates newer than now minus this
			key: 'days', 			  // Key can be seconds, minutes, days etc.
			time: 1  				  // A number of how much to subract from now
		}
	});