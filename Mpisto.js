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
		window.MP_volume = 100; // Audio Volume
		window.MP_audioPlaying = false; // Audio Playing?
		window.MP_audioloop = false; // Looping of Playlist
		window.MP_audioloopOnce = false; // Looping of Track
		window.MP_audioID = 0; // Audio ID
		window.MP_audioFiles = ["media/Sceptrum.ogg"]; // Audio File Name (Or an array of audio names)
		window.MP_audioFileNames = ["Sceptrum.ogg"]; // Audio File Name (Or an array of audio names)
		setTimeout(InitTimerValue,0);

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


/* Conditions */
function hasMultipleAudio() {
	return Array.isArray(window.MP_audioFiles);
}

function allowDrop(ev) {
  ev.preventDefault();
}


function isImage(img) {
	return img.match(/[^/]+(jpg|png|gif|avif|webp|ico|svg)$/)
}

function currentTrackName() {
	return window.MP_audioFileNames[window.MP_audioID];
}

function currentTrackURLName() {
	return window.MP_audioFiles[window.MP_audioID];
}

/** Bottom Bar **/

/* Miniplayer */
function ToggleMiniplayer() {
	if (document.querySelector('body').hasAttribute("miniplayer")) {
		document.querySelector('body').removeAttribute("miniplayer")
	} else {
		document.querySelector('body').setAttribute("miniplayer",'');
	}
}

/* Timer */
function InitTimerValue() {
// End
	var audio = document.getElementById("audio-player");
	
	valueM = Math.round(audio.duration*1000);
	hours = String( Math.floor( valueM / 3600000 ) ).padStart(2, '0');
	mins = String( Math.floor( (valueM / 60000) % 60 ) ).padStart(2, '0');
	secs = String( Math.floor( (valueM / 1000) % 60 ) ).padStart(2, '0');
	ms = String( (valueM % 1000) ).padStart(3, '0');
	document.querySelector(".media-controls .timer .timer_range").setAttribute("max",valueM);
	document.querySelector(".media-controls .timer .timer_end").innerHTML = hours + ":" + mins + ":" + secs + "." + ms; 
	document.querySelector(".media-controls .bottom .playing .name span").innerHTML = currentTrackName()

}

function UpdateTrackDuration() {
// End
	var audio = document.getElementById("audio-player");
	elem = document.querySelector("main.queue .proc_page article header[trackid='" + String( window.MP_audioID ).padStart(2, '0') + "'] .duration");
	
	valueM = Math.round(audio.duration*1000);
	hours = String( Math.floor( valueM / 3600000 ) ).padStart(2, '0');
	mins = String( Math.floor( (valueM / 60000) % 60 ) ).padStart(2, '0');
	secs = String( Math.floor( (valueM / 1000) % 60 ) ).padStart(2, '0');
	elem.innerHTML = hours + ":" + mins + ":" + secs;

}



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

function UpdateAudio() {
	var audio = document.getElementById("audio-player");
//Start
	value = document.querySelector(".media-controls .timer .timer_range").value;
	hours = String( Math.floor( value / 3600000 ) ).padStart(2, '0');
	mins = String( Math.floor( (value / 60000) % 60 ) ).padStart(2, '0');
	secs = String( Math.floor( (value / 1000) % 60 ) ).padStart(2, '0');
	ms = String( (value % 1000) ).padStart(3, '0');
	document.querySelector(".media-controls .timer .timer_start").innerHTML = hours + ":" + mins + ":" + secs + "." + ms; 
	document.querySelector(".media-controls .timer .timer_range").setAttribute("value",value);
	
	audio.currentTime=value/1000;

}

/* Media Controls */
function TogglePlayPause(playtext="Play",pausetext="Pause") {
	elem = document.querySelector(".media-controls .bottom .controls .play");
	elemIcon = document.querySelector(".media-controls .bottom .controls .play .cpe-icon");
	elem.setAttribute("state",(parseInt(elem.getAttribute("state")) + 1) % 2);
	state = parseInt(elem.getAttribute("state"));
	elem.setAttribute("title",[playtext,pausetext][state]);
	elemIcon.innerHTML = ["play_arrow","pause"][state];

	var audio = document.getElementById("audio-player");

	if (audio.src==="") {
		startPlaying(playtext,pausetext,true);
	}
	if (state === 1) {
		sliderInterval = setInterval(UpdateTimer, 10,playtext,pausetext);
		window.MP_audioPlaying = true;
		var sel = document.querySelector("main.queue .proc_page article header[trackid='" + String( window.MP_audioID ).padStart(2, '0') + "']");
		if (sel) {
			sel.classList.add("selected");
		}
		playAudio(audio,playtext); // Audio Play
	} else {
		window.MP_audioPlaying = false;
		clearInterval(sliderInterval);
		sliderInterval = null;
		var sel = document.querySelector("main.queue .proc_page article header[trackid].selected");
		if (sel) {
			sel.classList.remove("selected");
		}
		audio.pause(); // Audio Play
	}
}

async function playAudio(elem,playtext="Play") {
  try {
    await elem.play();
	InitTimerValue();
	UpdateTrackDuration();
	if (isImage(currentTrackName())) {
		document.querySelector('body').style.setProperty("--album-icon", 'url(' + currentTrackURLName() + ')'  );
	} else {
		document.querySelector('body').style.removeProperty("--album-icon");
	}
  } catch (err) {
	AddFloatingBanner('Failed to play audio content: <br>'+err,'alert');
	TogglePlayPause(playtext);
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
	var audio = document.getElementById("audio-player");
	elem = document.querySelector(".media-controls .bottom .controls .repeat");
	elemIcon = document.querySelector(".media-controls .bottom .controls .repeat .cpe-icon");
	elem.setAttribute("state",(parseInt(elem.getAttribute("state")) + 1) % 3);
	state = parseInt(elem.getAttribute("state"));
	elem.setAttribute("title",[offtext,ontext,onetext][state]);
	elemIcon.innerHTML = ["repeat","repeat_on","repeat_one_on"][state];
	window.MP_audioloop = (state!=0);
	window.MP_audioloopOnce = (state==2)
	audio.loop=window.MP_audioloopOnce;
}

function ChangeVolume(voltext="Volume",mutetext="Muted") {
	var audio = document.getElementById("audio-player");
	value = parseInt(document.querySelector(".media-controls .bottom .controls .cpe-dropdown__content .volume").value);
	window.MP_volume = value;
	state = (value == 0) ? 0 : (value < 51) ? 1 : 2;
	elem = document.querySelector(".media-controls .bottom .controls .volume-button");
	elemIcon = document.querySelector(".media-controls .bottom .controls .volume-button .cpe-icon");
	title = voltext + " (" + [mutetext,value+"%",value+"%"][state] +")";
	elem.setAttribute("title",title);
	elemIcon.innerHTML = ["no_sound","volume_down","volume_up"][state];
	audio.volume = window.MP_volume / 100;
	
	 
}

function UpdateTimer(playtext="Play",pausetext="Pause") {
	var audio = document.getElementById("audio-player");

	elem = document.querySelector(".media-controls .timer .timer_range");
	length = (window.MP_audioFiles.length) - 1
	norepeat = (!(window.MP_audioloop) && (window.MP_audioID == length) )
	value = Math.round(audio.currentTime*1000);
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
			window.MP_audioID=0;
			startPlaying(playtext,pausetext,true);
		} else if (!window.MP_audioloopOnce) {
			NextAudio(playtext,pausetext);
		}
	}
}

function GoForward(secs=10) {
	var audio = document.getElementById("audio-player");
	elem = document.querySelector(".media-controls .timer .timer_range");
	norepeat = (document.querySelector(".media-controls .bottom .controls .repeat").getAttribute('state') == 0)
	max = parseInt(elem.getAttribute("max"));
	value = Math.min(parseInt(elem.value) + (secs * 1000), max);
	document.querySelector(".media-controls .timer .timer_range").value= value;
	ChangeTimerValue();
	elem.style.setProperty("--range-percent",  (( ((elem.value) - 0 ) * 100) / (elem.getAttribute('max') - 0) ) + '%'  );
	audio.currentTime+=10
}

function GoBackward(secs=10) {
	var audio = document.getElementById("audio-player");
	elem = document.querySelector(".media-controls .timer .timer_range");
	norepeat = (document.querySelector(".media-controls .bottom .controls .repeat").getAttribute('state') == 0)
	max = 0;
	value = Math.max(parseInt(elem.value) - (secs * 1000), max);
	document.querySelector(".media-controls .timer .timer_range").value= value;
	ChangeTimerValue();
	elem.style.setProperty("--range-percent",  (( ((elem.value) - 0 ) * 100) / (elem.getAttribute('max') - 0) ) + '%'  );
	audio.currentTime-=10
}


function SetSpeed(id=3) {
	var audio = document.getElementById("audio-player");
	window.MP_playbackspeed = [0.25,0.5,0.75,1,1.25,1.5,1.75,2][id]
	var x = document.querySelector(".media-controls .bottom .controls .cpe-dropdown .cpe-dropdown-level-nested__content .cpe-list.speeds li.selected")
	if (x) {
		x.classList.remove("selected");
	}
	var y = document.querySelector(".media-controls .bottom .controls .cpe-dropdown .cpe-dropdown-level-nested__content .cpe-list.speeds li[data-speed='" + id + "']");
	if (y) {
		y.classList.add("selected");
	}
	audio.playbackRate=window.MP_playbackspeed;


}

/* Fullscreen */
function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  }
}


/* URL Audio */
function URLAudio(playtext="Play",pausetext="Pause") {
	var audio = document.getElementById("audio-player");
	var url = prompt("Audio URL");
	window.MP_audioFileNames = [];
	if (!(url.startsWith("["))) { // Single URL, convert it to an array of a single item
		var url = "[\"" + url + "\"]";
	}
	var url = JSON.parse(url);
	window.MP_audioFiles = [];
	clearTrackList();
	for (let i = 0; i < url.length; i++) {
		filename = decodeURIComponent(url[i]).split("/");
		window.MP_audioFiles[i] = url[i];
		window.MP_audioFileNames[i] = filename[filename.length-1];
		insertTrack(filename[filename.length-1],"",playtext,pausetext);
	}
	if (window.MP_audioPlaying) {
		TogglePlayPause(playtext,pausetext);
	}
	window.MP_audioFiles = url;
	window.MP_audioID = 0;
	startPlaying(playtext,pausetext);
}

function URLAudioAdd(playtext="Play",pausetext="Pause") {
	var url = prompt("Audio URL");
	if (!(url.startsWith("["))) { // Single URL, convert it to an array of a single item
		var url = "[\"" + url + "\"]";
	}
	var url = JSON.parse(url);
	var oldlength = window.MP_audioFileNames.length
	for (let i = 0; i < url.length; i++) {
		filename = decodeURIComponent(url[i]).split("/");
		window.MP_audioFiles[oldlength+i] = url[i];
		window.MP_audioFileNames[oldlength+i] = filename[filename.length-1];
		insertTrack(filename[filename.length-1],"",playtext,pausetext);
	}
}

function FileAudio(files,playtext="Play",pausetext="Pause") {
	window.URL = window.URL || window.webkitURL;
	var audio = document.getElementById("audio-player");
	window.MP_audioFileNames = [];
	window.MP_audioFiles = [];
	clearTrackList();
	for (let i = 0; i < files.length; i++) {
		window.MP_audioFiles[i] = window.URL.createObjectURL(files[i]);
		window.MP_audioFileNames[i] = files[i].name;
		insertTrack(files[i].name,"",playtext,pausetext);
	}
	if (window.MP_audioPlaying) {
		TogglePlayPause(playtext,pausetext);
	}
	window.MP_audioID = 0;
	startPlaying(playtext,pausetext);
}

function FileAudioAdd(files,playtext="Play",pausetext="Pause") {
	window.URL = window.URL || window.webkitURL;
	var oldlength = window.MP_audioFileNames.length
	for (let i = 0; i < files.length; i++) {
		window.MP_audioFiles[oldlength+i] = window.URL.createObjectURL(files[i]);
		window.MP_audioFileNames[oldlength+i] = files[i].name;
		insertTrack(files[i].name,"",playtext,pausetext);
	}
}

function DropAudio(ev,playtext="Play",pausetext="Pause") {
	ev.preventDefault();
	window.URL = window.URL || window.webkitURL;
	var audio = document.getElementById("audio-player");
	window.MP_audioFileNames = [];
	window.MP_audioFiles = [];
	clearTrackList();
	var files = ev.dataTransfer.getData("Files");
	
	
	  if (ev.dataTransfer.items) {
		// Use DataTransferItemList interface to access the file(s)
		[...ev.dataTransfer.items].forEach((item, i) => {
		  // If dropped items aren't files, reject them
		  if (item.kind === "file") {
			const file = item.getAsFile();
			window.MP_audioFiles[i] = window.URL.createObjectURL(file);
			window.MP_audioFileNames[i] = file.name;
			insertTrack(file.name,"",playtext,pausetext);
		  }
		});
	  } else {
		// Use DataTransfer interface to access the file(s)
		[...ev.dataTransfer.files].forEach((file, i) => {
			window.MP_audioFiles[i] = window.URL.createObjectURL(file);
			window.MP_audioFileNames[i] = file.name;
			insertTrack(file.name,"",playtext,pausetext);
		});
	  }

	if (window.MP_audioPlaying) {
		TogglePlayPause(playtext,pausetext);
	}
	window.MP_audioID = 0;
	startPlaying(playtext,pausetext);
}

function DropAudioAdd(ev,playtext="Play",pausetext="Pause") {
	ev.preventDefault();
	window.URL = window.URL || window.webkitURL;
	var oldlength = window.MP_audioFileNames.length

	var files = ev.dataTransfer.getData("Files");
	
	
	  if (ev.dataTransfer.items) {
		// Use DataTransferItemList interface to access the file(s)
		[...ev.dataTransfer.items].forEach((item, i) => {
		  // If dropped items aren't files, reject them
		  if (item.kind === "file") {
			const file = item.getAsFile();
			window.MP_audioFiles[oldlength+i] = window.URL.createObjectURL(file);
			window.MP_audioFileNames[oldlength+i] = file.name;
			insertTrack(file.name,"",playtext,pausetext);
		  }
		});
	  } else {
		// Use DataTransfer interface to access the file(s)
		[...ev.dataTransfer.files].forEach((file, i) => {
			window.MP_audioFiles[oldlength+i] = window.URL.createObjectURL(file);
			window.MP_audioFileNames[oldlength+i] = file.name;
			insertTrack(file.name,"",playtext,pausetext);
		});
	  }

}

/* Begins playing a new audio */
function startPlaying(playtext="Play",pausetext="Pause",nostart=false) {
	var audio = document.getElementById("audio-player");
	if (window.MP_audioPlaying) {
		TogglePlayPause(playtext,pausetext);
	}
	audio.currentTime=0;
	if (isImage(currentTrackName())) {
		audio.src="Blank.mp3";
	} else {
		audio.src=currentTrackURLName();
	}
	audio.playbackRate=window.MP_playbackspeed;
	audio.volume=window.MP_volume / 100;
	audio.loop=window.MP_audioloopOnce;
	if (!(nostart)) {
		TogglePlayPause(playtext,pausetext);
	}

}

function PlayTrack(id=0,playtext="Play",pausetext="Pause") {
	window.MP_audioID= id;
	startPlaying(playtext,pausetext);

}

/* Moving forward between songs */
function PrevAudio(playtext="Play",pausetext="Pause") {
	var audio = document.getElementById("audio-player");
	oldplay=window.MP_audioPlaying;
	audioid=window.MP_audioID;
	window.MP_audioID=(audioid==0) ? window.MP_audioFiles.length-1 : (audioid-1)%window.MP_audioFiles.length
	startPlaying(playtext,pausetext);
}

function NextAudio(playtext="Play",pausetext="Pause") {
	var audio = document.getElementById("audio-player");
	oldplay=window.MP_audioPlaying;
	audioid=window.MP_audioID;
	window.MP_audioID=(audioid+1)%window.MP_audioFiles.length
	startPlaying(playtext,pausetext);
}

/* Write new Tracks */
function insertTrack(trackname="Sample",time="",playtext="Play",pausetext="Pause") {
	len = document.querySelectorAll("main.queue .proc_page section article .header[trackid]").length;
	str = 	'<header trackid="' + len.toString().padStart(2, '0') + '" publisher="none" album="none" songname="' + trackname + '" class="header item" onclick="PlayTrack(' + len + ',\'' + playtext + '\',\'' + pausetext + '\')">' +
				'<span class="name">' + trackname + '</span>' +
				'<span class="artist">-//-</span>' +
				'<span class="album">-//-</span>' +
				'<span class="duration">' + time + '</span>' +
			'</header>'
	document.querySelector("main.queue .proc_page section article").insertAdjacentHTML('beforeend',str);
	if (isImage(trackname)) {
		document.querySelector("main.queue .proc_page article header[trackid='" + String( len ).padStart(2, '0') + "']").style.setProperty("--self-album-icon", 'url(' + window.MP_audioFiles[len] + ')'  );
	}
}

function clearTrackList() {
	document.querySelector("main.queue .proc_page section article").innerHTML = "";
}