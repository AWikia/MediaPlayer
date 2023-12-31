(function () {

		document.querySelector("head").insertAdjacentHTML('afterbegin', 
		'<link rel="manifest" href="manifest.json" crossorigin="use-credentials">' +
		// Standard Light
		'<link rel="shortcut icon" href="favicon.ico">' +
		'<link rel="icon" href="favicon.ico">' +
		'<link rel="favicon" href="favicon.ico">' +
		// Standard Dark
		'<link rel="shortcut icon" href="favicon_dark.ico" media="(prefers-color-scheme:dark)">' +
		'<link rel="icon" href="favicon_dark.ico" media="(prefers-color-scheme:dark)">' +
		'<link rel="favicon" href="favicon_dark.ico" media="(prefers-color-scheme:dark)">' +
		// High Contrast Light
		'<link rel="shortcut icon" href="favicon_hc.ico" media="(forced-colors:active)">' +
		'<link rel="icon" href="favicon_hc.ico" media="(forced-colors:active)">' +
		'<link rel="favicon" href="favicon_hc.ico" media="(forced-colors:active)">' +
		// High Contrast Dark
		'<link rel="shortcut icon" href="favicon_hcDark.ico" media="(forced-colors:active) and (prefers-color-scheme:dark)">' +
		'<link rel="icon" href="favicon_hcDark.ico" media="(forced-colors:active) and (prefers-color-scheme:dark)">' +
		'<link rel="favicon" href="favicon_hcDark.ico" media="(forced-colors:active) and (prefers-color-scheme:dark)">' 
		);
	if (getKey('mp-default-page') === '-1') {
		insertKey('mp-default-page', 'recent' );
	}
		/* Active Theme */
		if (getKey('device-theme') === 'light' ) {
			active_tm_theme =  (getKey('color-style-behavior') === 'duo' ) ? 'auto' : 'light'
		} else if ( (getKey('device-theme') === 'dark' ) ) {
			active_tm_theme =  (getKey('color-style-behavior') === 'duo' ) ? 'auto-dark' : 'dark'
		} else if ( (getKey('device-theme') === 'auto' ) || (getKey('device-theme') === 'auto-dark' ) ) {
			active_tm_theme = 'custom';
		} else {
			active_tm_theme = 'auto';
		}
		document.getElementById("AppTheme" + ['01','02','03','04','05'][ ['auto','auto-dark','light','dark','custom'].indexOf(active_tm_theme) ]).checked=true;
		/* Default Page */
		default_page = getKey('mp-default-page');
		$('body').attr("page",  default_page);
		document.getElementById("LandingPage" + ['01','02','03','04','05'][ ['recent','libraries','queue','playlists','sessions'].indexOf(default_page) ]).checked=true;
		sliderInterval=null;
		window.MP_playbackspeed = 1;

})();





/* Section Changing Functions */

function Tab0() {
		$('body').attr("page", "recent");
}

function Tab1() {
		$('body').attr("page", "libraries");
}

function Tab2() {
		$('body').attr("page", "queue");
}

function Tab3() {
		$('body').attr("page", "playlists");
}

function Tab4() {
		$('body').attr("page", "sessions");
}

function Tab5() {
		$('body').attr("page", "settings");
}


/** Bottom Bar **/

/* Timer */
function ChangeTimerValue() {
//Start
	value = document.querySelector(".media-controls .timer .timer_range").value;
	hours = String( Math.floor( value / 3600000 ) ).padStart(2, '0');
	mins = String( Math.floor( (value / 60000) % 60 ) ).padStart(2, '0');
	secs = String( Math.floor( (value / 1000) % 60 ) ).padStart(2, '0');
	ms = String( (value % 1000) ).padStart(3, '0');
	document.querySelector(".media-controls .timer .timer_start").innerHTML = hours + ":" + mins + ":" + secs + "." + ms; 
	document.querySelector(".media-controls .timer .timer_range").setAttribute("value",value);
// End
	valueM = document.querySelector(".media-controls .timer .timer_range").getAttribute("max");
	hours = String( Math.floor( valueM / 3600000 ) ).padStart(2, '0');
	mins = String( Math.floor( (valueM / 60000) % 60 ) ).padStart(2, '0');
	secs = String( Math.floor( (valueM / 1000) % 60 ) ).padStart(2, '0');
	ms = String( (valueM % 1000) ).padStart(3, '0');
	document.querySelector(".media-controls .timer .timer_end").innerHTML = hours + ":" + mins + ":" + secs + "." + ms; 


}

/* Media Controls */
function TogglePlayPause(playtext="Play",pausetext="Pause") {
	elem = document.querySelector(".media-controls .bottom .controls .play");
	elemIcon = document.querySelector(".media-controls .bottom .controls .play .cpe-icon");
	elem.setAttribute("state",(parseInt(elem.getAttribute("state")) + 1) % 2);
	state = parseInt(elem.getAttribute("state"));
	elem.setAttribute("title",[playtext,pausetext][state]);
	elemIcon.innerHTML = ["play_arrow","pause"][state];
	if (state === 1) {
		sliderInterval = setInterval(UpdateTimer, 10,playtext,pausetext);
	} else {
		clearInterval(sliderInterval);
		sliderInterval = null;
	}
}

function ToggleRandomness(offtext="No Random Selection",ontext="Active Random Selection") {
	elem = document.querySelector(".media-controls .bottom .controls .shuffle");
	elemIcon = document.querySelector(".media-controls .bottom .controls .shuffle .cpe-icon");
	elem.setAttribute("state",(parseInt(elem.getAttribute("state")) + 1) % 2);
	state = parseInt(elem.getAttribute("state"));
	elem.setAttribute("title",[offtext,ontext][state]);
	elemIcon.innerHTML = ["shuffle","shuffle_on"][state];
}

function ToggleRepeatness(offtext="No Repeat",ontext="Repeat All", onetext="Repeat One") {
	elem = document.querySelector(".media-controls .bottom .controls .repeat");
	elemIcon = document.querySelector(".media-controls .bottom .controls .repeat .cpe-icon");
	elem.setAttribute("state",(parseInt(elem.getAttribute("state")) + 1) % 3);
	state = parseInt(elem.getAttribute("state"));
	elem.setAttribute("title",[offtext,ontext,onetext][state]);
	elemIcon.innerHTML = ["repeat","repeat_on","repeat_one_on"][state];
}

function ChangeVolume(voltext="Volume",mutetext="Muted") {
	value = parseInt(document.querySelector(".media-controls .bottom .controls .cpe-dropdown__content .volume").value);
	state = (value == 0) ? 0 : (value < 51) ? 1 : 2;
	elem = document.querySelector(".media-controls .bottom .controls .volume-button");
	elemIcon = document.querySelector(".media-controls .bottom .controls .volume-button .cpe-icon");
	title = voltext + " (" + [mutetext,value+"%",value+"%"][state] +")";
	elem.setAttribute("title",title);
	elemIcon.innerHTML = ["no_sound","volume_down","volume_up"][state];
	 
}

function UpdateTimer(playtext="Play",pausetext="Pause") {
	elem = document.querySelector(".media-controls .timer .timer_range");
	norepeat = (document.querySelector(".media-controls .bottom .controls .repeat").getAttribute('state') == 0)
	value = parseInt(elem.value) + (10 * window.MP_playbackspeed);
	max = parseInt(elem.getAttribute("max"));
	document.querySelector(".media-controls .timer .timer_range").value= value;
	ChangeTimerValue();
	elem.style.setProperty("--range-percent",  (( ((elem.value) - 0 ) * 100) / (elem.getAttribute('max') - 0) ) + '%'  );
	if (value >= max) {
		document.querySelector(".media-controls .timer .timer_range").value = 0;
		ChangeTimerValue();
		elem.style.setProperty("--range-percent",  (( ((elem.value) - 0 ) * 100) / (elem.getAttribute('max') - 0) ) + '%'  );
		if (norepeat) {
			TogglePlayPause(playtext);
		}
	}
}

function GoForward(secs=10) {

	elem = document.querySelector(".media-controls .timer .timer_range");
	norepeat = (document.querySelector(".media-controls .bottom .controls .repeat").getAttribute('state') == 0)
	max = parseInt(elem.getAttribute("max"));
	value = Math.min(parseInt(elem.value) + (secs * 1000), max);
	document.querySelector(".media-controls .timer .timer_range").value= value;
	ChangeTimerValue();
	elem.style.setProperty("--range-percent",  (( ((elem.value) - 0 ) * 100) / (elem.getAttribute('max') - 0) ) + '%'  );
}

function GoBackward(secs=10) {

	elem = document.querySelector(".media-controls .timer .timer_range");
	norepeat = (document.querySelector(".media-controls .bottom .controls .repeat").getAttribute('state') == 0)
	max = 0;
	value = Math.max(parseInt(elem.value) - (secs * 1000), max);
	document.querySelector(".media-controls .timer .timer_range").value= value;
	ChangeTimerValue();
	elem.style.setProperty("--range-percent",  (( ((elem.value) - 0 ) * 100) / (elem.getAttribute('max') - 0) ) + '%'  );
}


function SetSpeed(id=3) {
	window.MP_playbackspeed = [0.25,0.5,0.75,1,1.25,1.5,1.75,2][id]
	var x = document.querySelector(".media-controls .bottom .controls .cpe-dropdown .cpe-dropdown-level-nested__content .cpe-list.speeds li.selected")
	if (x) {
		x.classList.remove("selected");
	}
	var y = document.querySelector(".media-controls .bottom .controls .cpe-dropdown .cpe-dropdown-level-nested__content .cpe-list.speeds li[data-speed='" + id + "']");
	if (y) {
		y.classList.add("selected");
	}


}

/* Fullscreen */
function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  }
}
