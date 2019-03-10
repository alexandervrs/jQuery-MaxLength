
/**
 * Limits the characters in a text input or textarea
 *
 * @author  Alexander Vourtsis
 * @version	1.0.0
 * @updated	20 February 2013, 16:19 UTC+02:00
 * @license	The Unlicense
 */

(function($)
{
	$.fn.maxLength = function(options)
	{
		var defaults = {
			maxChars: null, //maximum characters allowed
			clearChars: true, //whether to clear/block characters if over the limit
			countHolder: '.chars-count', //class of element that holds the current character count
			remainHolder: '.chars-remaining', //class of element that holds the character remaining count
			maxHolder: '.chars-max', //class of element that holds the maximum allowed characters number
			onLimitOver: function(){}, //callback when characters exceed the limit
			onLimitUnder: function(){} //callback when characters do not exceed the limit
		};

		var options = $.extend(defaults, options);
		
		return $(this).each(function(i) {
			
			var currentlength, maxlength;			
			var thisElement = $(this);
			
			if (options.maxChars == null) {
				maxlength = parseInt($(this).attr('maxlength'), 10);
			} else {
				$(this).removeAttr('maxlength');
				maxlength = options.maxChars;
			}
			
			if (options.clearChars == false) {
				$(this).removeAttr('maxlength');
			}
			
			$(options.maxHolder).text(maxlength);
			
			function checkCharLimit()
			{
				currentlength = thisElement.val().length;
				
				$(options.countHolder).text(currentlength);
				$(options.remainHolder).text(maxlength - currentlength);
				
				if (currentlength >= maxlength) {
				
					if (options.clearChars == true) {
						thisElement.val(thisElement.val().substr(0, maxlength));
						$(options.countHolder).text(maxlength);
						$(options.remainHolder).text('0');
					}
					
				}
				
				if (currentlength > maxlength) {
					options.onLimitOver.call(this);
				}
				
				if (currentlength <= maxlength) {
					options.onLimitUnder.call(this);
				}
			}
			
			checkCharLimit();
			
			$(this).on('focus blur keyup keydown contextmenu paste', function(){
				checkCharLimit();
			});
		
		}); 
	};
})(jQuery);