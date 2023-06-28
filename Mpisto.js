(function () {

		document.querySelector("head").insertAdjacentHTML('afterbegin', 
		'<link rel="manifest" href="manifest.json" crossorigin="use-credentials">' +
		'<link rel="shortcut icon" href="favicon.ico">' +
		'<link rel="icon" href="favicon.ico">' +
		'<link rel="favicon" href="favicon.ico">'
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
		SetPage(page=0);

})();



/* Page Changing Functions */
function SetPage(page=0) {
		$('.page.performancepage').attr("page", page);
		$('.page.performancepage .left .button.selected, .page .right').removeClass("selected");
		$('.page.performancepage .left .button.p' + page + ', .page .right.p'+ page).addClass("selected");
}




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
