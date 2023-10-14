function hideHUD() {
	// I should probably loop through the ids and hide them all, but im too lazy to do that !!! :p
	document.getElementById("playerList").style.display = "none";
	document.getElementById("chatIn").style.display = "none";
	document.getElementById("chatOut").style.display = "none";
	document.getElementById("captureIconWrap").style.display = "none";
	document.getElementById("captureContainer").style.display = "none";
	document.getElementById("account_panel").style.display = "none";
	document.getElementById("inGameUI").style.display = "none";
	document.getElementById("healthContainer").style.display = "none";
	document.getElementById("shellStreakContainer").style.display = "none";
	document.getElementById("hardBoiledContainer").style.display = "none";
	document.getElementById("eggBreakerContainer").style.display = "none";
	document.getElementById("teamScores").style.display = "none";
	document.getElementById("killTicker").style.display = "none";
	document.getElementById("best_streak_container").style.display = "none";
	document.getElementById("weaponBox").style.display = "none";
	document.getElementById("grenadeThrowContainer").style.display = "none";
	document.getElementById("spatulaPlayer").style.display = "none";
	document.getElementById("bigMessageContainer").style.display = "none";
	document.getElementById("killBox").style.display = "none";
	document.getElementById("deathBox").style.display = "none";
	document.getElementById("spectate").style.display = "none";
	document.getElementById("chickenBadge").style.display = "none";
	document.getElementById("reticleDot").style.display = "none";
	document.getElementById("reticleContainer").style.display = "none";
	document.getElementById("gameMessage").style.display = "none";
}
function showHUD() {
	// Very messy but its 1am and I could honestly care less right now.
	document.getElementById("playerList").style.display = "";
	document.getElementById("chatIn").style.display = "block";
	document.getElementById("chatOut").style.display = "block";
	if (extern.gameType === extern.GameType.king) {
		document.getElementById("captureIconWrap").style.display = "block";
		document.getElementById("captureContainer").style.display = "block";
	} else if (extern.gameType === extern.GameType.ctf || extern.gameType === extern.GameType.teams) {
		document.getElementById("teamScores").style.display = "block";
	}
	document.getElementById("inGameUI").style.display = "";
	document.getElementById("reticleDot").style.display = "";
	document.getElementById("reticleContainer").style.display = "";
	document.getElementById("killBox").style.display = "";
	document.getElementById("deathBox").style.display = "";
	document.getElementById("grenadeThrowContainer").style.display = "";
	document.getElementById("shellStreakContainer").style.display = "";
	document.getElementById("hardBoiledContainer").style.display = "";
	document.getElementById("eggBreakerContainer").style.display = "";
	document.getElementById("gameMessage").style.display = "";
	document.getElementById("best_streak_container").style.display = "";
	document.getElementById("account_panel").style.display = "";
	if (!vueApp.game.isPaused && !vueApp.ui.game.spectate && !vueApp.ui.game.spectatingPlayerName) {
		document.getElementById("weaponBox").style.display = "block";
		document.getElementById("healthContainer").style.display = "";
		if (extern.gameType == extern.GameType.ctf) {
			document.getElementById("spatulaPlayer").style.display = "";
		}
	} else if (vueApp.game.isPaused) {
		document.getElementById("chickenBadge").style.display = "";
	}
	if (!vueApp.game.isPaused) {
		document.getElementById("killTicker").style.display = "";
	}
	if (vueApp.ui.game.spectate) {
		document.getElementById("spectate").style.display = "block";
	}
}

window.hiddenHUD = false;
document.addEventListener('keydown', function(event) {
	if (document.activeElement.id == "chatIn") return;
	let hideKey = vueApp.settingsUi.controls.keyboard.spectate[vueApp.settingsUi.controls.keyboard.spectate.findIndex(item => item.id === "toggle_hud")].value.toLowerCase();
	if (event.key === hideKey) {
		if (!extern.inGame) return;
		window.hiddenHUD = !window.hiddenHUD;
		if (window.hiddenHUD) {
			hideHUD();
		} else {
			showHUD();
		}
	}
});

function hideMiscUI() {
	if (window.hiddenHUD) {
		document.getElementById("weaponBox").style.display = "none";
		document.getElementById("healthContainer").style.display = "none";
		document.getElementById("spectate").style.display = "none";
		document.getElementById("killTicker").style.display = "none";
	}
}

let interval = setInterval(() => {
	if (typeof (extern) === "undefined" || typeof (vueApp) === "undefined") return;
	clearInterval(interval);
	let oldRespawn = extern.respawn;
	extern.respawn = () => {
		oldRespawn();
		setTimeout(hideMiscUI, 150);
	}
	let oldSpec = extern.enterSpectatorMode;
	extern.enterSpectatorMode = () => {
		oldSpec();
		setTimeout(hideMiscUI, 150);
	}

	let oldLocFunc = vueApp.setLocData;
	vueApp.setLocData = (languageCode, newLocData) => {
		oldLocFunc(languageCode, newLocData);
		vueApp.loc.keybindings_toggle_hud = "Toggle HUD";
	}

	vueApp.loc.keybindings_toggle_hud = "Toggle HUD";
	vueApp.settingsUi.controls.keyboard.spectate.push({ id: 'toggle_hud', locKey: 'keybindings_toggle_hud', value: 'H' });
}, 250);
