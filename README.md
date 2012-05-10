#README

Simple jquery-plugin making time-tags relative using moment.js

Usage:
	
	$('time').relativitize();

Options:
	
	$('time').relativitize({
		use_format: false, 			  // If time is older than spesified in gt, use format or fallback to original text
		format: moment.defaultFormat, // YYYY-MM-DDTHH:mm:ssZ
		refresh: 10000,				  // Milliseconds for each refresh
		gt: { 						  // Only relativitize dates newer than now minus this
			key: 'days', 			  // Key can be seconds, minutes, days etc.
			time: 1  				  // A number of how much to subract from now
		}
	});