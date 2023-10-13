# Hide HUD | Shell Shockers
```js
// ==UserScript==
// @name         Hide HUD | Shell Shockers
// @version      1.0
// @author       Infinite Smasher
// @description  Adds a toggle to hide the HUD elements (in-game/spectate UI)
// @icon         https://raw.githubusercontent.com/InfiniteSmasher/Hide-HUD/main/ico_egg.png
// @match        *://*shellshock.io/*
// @run-at       document-end
// ==/UserScript==

(function() {
    let script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/gh/InfiniteSmasher/Hide-HUD@latest/hideHud.js';
    document.head.appendChild(script);
})();
```
