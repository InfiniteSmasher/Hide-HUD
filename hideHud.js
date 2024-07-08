let elemIds = [
    "healthContainer",
    "egg-breaker-wrap",
    "reticleDot",
    "reticleContainer",
    "grenadeThrowContainer",
    "captureIconWrap",
    "captureContainer",
    "teamScores",
    "spatulaPlayer",
    "cts-message",
    "weaponBox",
    "account_panel",
    "chatIn",
    "chatOut",
    "playerList",
    "bigMessageContainer",
    "gameMessage",
    "kill-death-box",
    "inGameUI",
    "killTicker",
    "shellStreakContainer",
    "spectate",
    "chickenBadge"
];

let hideHUDInterval = setInterval(() => {
	if (typeof (vueApp) === "undefined") return;
	clearInterval(hideHUDInterval);

	let oldLocFunc = vueApp.setLocData;
	vueApp.setLocData = (languageCode, newLocData) => {
		oldLocFunc(languageCode, newLocData);
		vueApp.loc.keybindings_toggle_hud = "Toggle HUD";
	}

	vueApp.loc.keybindings_toggle_hud = "Toggle HUD";
	vueApp.settingsUi.controls.keyboard.spectate.push({ id: 'toggle_hud', locKey: 'keybindings_toggle_hud', value: 'H' });

	document.addEventListener('keydown', (event) => {
		if (document.activeElement.tagName == "INPUT" || !extern.inGame || vueApp.game.isPaused) return;
		let hideKey = vueApp.settingsUi.controls.keyboard.spectate[vueApp.settingsUi.controls.keyboard.spectate.findIndex(item => item.id === "toggle_hud")].value.toLowerCase();
		if (event.key === hideKey) elemIds.map(id => document.getElementById(id)).forEach(e => e.style.opacity ^= 1);	
	});
}, 250);
