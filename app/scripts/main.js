"use strict";

jQuery(document).ready(function($) {
	$('#reset-btn').slideUp();

	// Work slider
	var workSlider = document.getElementById('work-slider');

	noUiSlider.create(workSlider, {
		start: [ 25 ],
		step: 1,
		range: {
			'min': [  1 ],
			'max': [ 60 ]
		},
	    format: {
		  to: function ( value ) {
			return value + '';
		  },
		  from: function ( value ) {
			return value.replace('.', '');
		  }
		}
	});
	var workSliderValueElement = document.getElementById('work-slider-value');

	workSlider.noUiSlider.on('update', function( values, handle ) {
		workSliderValueElement.innerHTML = values[handle];
	});

	// Break slider
	var breakSlider = document.getElementById('break-slider');

	noUiSlider.create(breakSlider, {
		start: [ 5 ],
		step: 1,
		range: {
			'min': [  1 ],
			'max': [ 30 ]
		},
	    format: {
		  to: function ( value ) {
			return value + '';
		  },
		  from: function ( value ) {
			return value.replace('.', '');
		  }
		}
	});
	var breakSliderValueElement = document.getElementById('break-slider-value');

	breakSlider.noUiSlider.on('update', function( values, handle ) {
		breakSliderValueElement.innerHTML = values[handle];
	});

	function timeFormat(value){
		var mins = Math.floor(value / 60); 
		var secs = value % 60;
		if (secs < 10) {
			secs = '0' + secs;
		}
		return mins.toString() + ":" + secs.toString();
	}

	var sessionCounter = 0;
	var resetCounter = 0;
	var globalWorkSliderVal = $('#work-slider-value').html();
	var globalBreakSliderVal = $('#break-slider-value').html();
	var workState = false;
	var breakState = false;
	
	function workCountdownFunction(){

		$('#break-slider-value').slideDown();
		$('#break-time-remaining-header').slideUp();
		$('#work-for').css('visibility', 'visible');
		$('#break-slider-value').css('visibility', 'visible');
		$('#break-for').html('Upcoming break:');
		$('#break-mins').css('visibility', 'visible');
		var workVal = $('#work-slider-value');
		var originalVal = workVal.html();
		workVal.html(parseInt(workVal.html()) * 60);
		$('#work-time-remaining-header').html(timeFormat(workVal.html()));
		var workCountdown = setInterval(function(){
			// workVal = time in secs
			workVal.html(parseInt(workVal.html()) - 1);
			// time-remaining-header = time in mins (display for user)
			if (parseInt(workVal.html()) > -1) {
				$('#work-time-remaining-header').html(timeFormat(workVal.html()));
			} else { // If the timer has reached 0, stop it, launch the other, and add count to counter
				$('.bottom-text h3').css('visibility', 'visible');
				workVal.html(originalVal);
				clearInterval(workCountdown);
				breakCountdownFunction();
				$('#completed-sessions').html(++sessionCounter);
			}

		}, 1000);
		$('#reset-btn').click(function(event) {
			$('#start-btn').css('visibility', 'visible');
			$('#reset-btn').css('visibility', 'hidden');
			$('#work-slider-value').css('visibility', 'visible');
			$('#work-time-remaining-header').html('');
			$('#work-slider-value').html(globalWorkSliderVal);
			clearInterval(workCountdown);
		});
	}

	function breakCountdownFunction(){

		$('#break-for').html('Break time remaining:');
		$('#work-for').css('visibility', 'hidden');
		$('#break-mins').css('visibility', 'hidden');
		$('#break-slider-value').css('visibility', 'hidden');
		$('#break-time-remaining-header').slideDown();

		var breakVal = $('#break-slider-value');
		var originalVal = breakVal.html();
		breakVal.html(parseInt(breakVal.html()) * 60);
		$('#break-time-remaining-header').html(timeFormat(breakVal.html()));

		var breakCountdown = setInterval(function(){
			// breakVal = time in secs
			breakVal.html(parseInt(breakVal.html()) - 1);
			// time-remaining-header = time in mins (display for user)
			if (parseInt(breakVal.html()) > -1) {
				$('#break-time-remaining-header').html(timeFormat(breakVal.html()));
			} else { // If the timer has reached 0, stop it, launch the other, and add count to counter
				breakVal.html(originalVal);
				clearInterval(breakCountdown);
				workCountdownFunction();
			}

		}, 1000);
		$('#reset-btn').click(function(event) {
			$('#start-btn').css('visibility', 'visible');
			$('#reset-btn').css('visibility', 'hidden');

			$('#break-slider-value').css('visibility', 'visible');
			$('#break-slider-value').slideDown();
			$('#break-mins').css('visibility', 'visible');

			$('#break-time-remaining-header').html('');

			$('#break-slider-value').html(globalBreakSliderVal);
			clearInterval(breakCountdown);
		});
	}
	$('#start-btn').click(function(event) {
		$('#work-slider-value').slideUp();
		$('#break-slider').slideUp();
		$('#work-mins').slideUp();
		$('#start-btn').slideUp();
		$('#work-slider').slideUp();

		$('#reset-btn').slideDown();

		$('#break-for').html('Upcoming break:');
		
		$('#reset-btn').css('visibility', 'visible');
		
		$('.bars').css('visibility', 'hidden');
		$('#work-mins').css('visibility', 'hidden');
		$('#work-slider-value').css('visibility', 'hidden');
		// workCountdownFunction triggers the 'infinite loop' of work then break
		workCountdownFunction();
	});
	$('#reset-btn').click(function(event) {
		$('#start-btn').slideDown();
		$('#work-slider-value').slideDown();
		$('#break-slider').slideDown();
		$('#work-mins').slideDown();
		$('#work-slider').slideDown();

		$('#work-for').html('Work for:');
		$('#break-for').html('Break for:');
		
		$('.bottom-text h4').css('visibility', 'visible');
		$('.bottom-text #resets').css('visibility', 'visible');
		$('#break-time-remaining-header').css('visibility', 'visible');
		$('.bars').css('visibility', 'visible');
		$('#work-mins').css('visibility', 'visible');
		$('h6').css('visibility', 'visible');

		$('#resets').html(++resetCounter);
	});

});