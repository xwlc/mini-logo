// SPDX-License-Identifier: GPL-3.0-only OR Apache-2.0 OR MIT
// SPDX-FileCopyrightText: 2024 Charles Wong <charlie-wong@outlook.com>
// Created By: Charles Wong 2024-07-05T07:56:07+08:00 Asia/Shanghai
// Repository: https://github.com/xwlc/mini-logo

const EMOJIS = [
  '🎉', '🚀', '🔥', '💥', '🏆', '🏅', '🎖', '🥇', '🥈', '🥉', '🙅🏻‍', '🙅🏻‍♀️',
  '🔴', '🔵', '🟠', '🟡', '🟢', '🟣', '🟤', '💛', '💙', '💜', '💔', '🔶',
  '🔷', '🔰', '💠', '🌅', '🌄', '🌠', '🎇', '🎆', '🌇', '🌆', '🏙', '🌃',
  '🌌', '🌉', '🌁', '♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐',
  '♑', '♒', '♓', '⛎', '💀', '👽', '🤖', '👾', '🎮', '😺', '😸', '😹',
  '😻', '😼', '😽', '🙀', '😿', '😾', '👹', '👺', '😈', '👿', '💩', '🎃',
  '👻', '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁',
  '🐮', '🐷', '🐽', '🐸', '🐵', '🙈', '🙉', '🙊', '🐒', '🐔', '🐧', '🐦',
  '🐤', '🐣', '🐥', '🦆', '🦅', '🦉', '🦇', '🐺', '🐗', '🐴', '🦄', '🐝',
  '🐛', '🦋', '🐌', '🐚', '🐞', '🐜', '🕷', '🕸', '🐢', '🐍', '🦎', '🦂',
  '🦀', '🦑', '🐙', '🦐', '🐠', '🐟', '🐡', '🐬', '🦈', '🐳', '🐋', '🐊',
  '🐆', '🐅', '🐃', '🐂', '🐄', '🦌', '🐪', '🐫', '🐘', '🦏', '🦍', '🐎',
  '🐖', '🐐', '🐏', '🐑', '🐕', '🐩', '🐈', '🐓', '🦃', '🕊', '🐇', '🐁',
  '🐀', '🐿', '🐉', '🐲', '🍏', '🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇',
  '🍓', '🍈', '🍒', '🍑', '🍍', '🥝', '🥑', '🍅', '🍆', '🥒', '🥕', '🌽',
  '🌶', '🥔', '🍠', '🌰', '🥜', '🍯', '🥐', '🍞', '🥖', '🧀', '🥚', '🍳',
  '🥓', '🥞', '🍤', '🍗', '🍖', '🍕', '🌭', '🍔', '🍟', '🥙', '🌮', '🌯',
  '🥗', '🥘', '🍝', '🍜', '🍲', '🍥', '🍣', '🍱', '🍛', '🍚', '🍙', '🍘',
  '🍢', '🍡', '🍧', '🍨', '🍦', '🍰', '🎂', '🍮', '🍭', '🍬', '🍫', '🍿',
  '🍩', '🍪', '🥛', '🍼', '🍵', '🍶', '🍺', '🍻', '🥂', '☠️', '☕️', '🍄',
];

const timezoneName = Intl.DateTimeFormat().resolvedOptions().timeZone;
const timezoneOffset = (function() {
  let hh, mm, sign, val = new Date().getTimezoneOffset();
  if(val < 0) { sign = '+'; val = -val; } else { sign = '-'; }
  hh = Math.floor(val / 60).toString().padStart(2, '0');
  mm = (val % 60).toString().padStart(2, '0');
  return sign + hh + mm;
})();

// https://drafts.csswg.org/css-color/#named-colors
function weaD(msg) { return `<a style='color: darkgray'>${msg}</a>` }
function weaR(msg) { return `<a style='color: red'>${msg}</a>` }
function weaG(msg) { return `<a style='color: limegreen'>${msg}</a>` }
function weaB(msg) { return `<a style='color: blue'>${msg}</a>` }
function weaY(msg) { return `<a style='color: yellow'>${msg}</a>` }
function weaP(msg) { return `<a style='color: darkorchid'>${msg}</a>` }
function weaC(msg) { return `<a style='color: darkturquoise'>${msg}</a>` }

let updateCyclesSeconds = 0, prevLunarMinute = 0, repeatUpdateId;

function updateTimeTitle(init) {
  const now = new Date(); let loc ={}, utc = {}, lunar, flag;
  loc.Y = now.getFullYear(); loc.M = now.getMonth() + 1; loc.D = now.getDate();
  loc.h = now.getHours();    loc.m = now.getMinutes();   loc.s = now.getSeconds();

  utc.Y = now.getUTCFullYear(); utc.M = now.getUTCMonth() + 1; utc.D = now.getUTCDate();
  utc.h = now.getUTCHours();    utc.m = now.getUTCMinutes();   utc.s = now.getUTCSeconds();

  flag = Math.floor(loc.m / 15) > prevLunarMinute;
  if(prevLunarMinute == 3 && Math.floor( loc.m / 15 ) == 0) flag = true;
  if(init || flag) { // 每刻钟更新农历
    prevLunarMinute = Math.floor( loc.m / 15 );
    lunar = LunarCalendar.lunarNow();
  }

  loc.M = padNum(loc.M); loc.D = padNum(loc.D);
  loc.h = padNum(loc.h); loc.m = padNum(loc.m); loc.s = padNum(loc.s);

  utc.M = padNum(utc.M); utc.D = padNum(utc.D);
  utc.h = padNum(utc.h); utc.m = padNum(utc.m); utc.s = padNum(utc.s);

  if(init || flag) {
    const yA = lunar.year.gz.y.ani,
          yG = lunar.year.gz.y.gan, yZ = lunar.year.gz.y.zhi,
          mG = lunar.year.gz.m.gan, mZ = lunar.year.gz.m.zhi,
          dG = lunar.year.gz.d.gan, dZ = lunar.year.gz.d.zhi;
    const  aN = lunar.time.hisart.name,  aD = lunar.time.hisart.desc;
    const gzN = lunar.time.ganzhi.name, gzX = lunar.time.ganzhi.nick,
          gzH = lunar.time.ganzhi.hour, gzM = lunar.time.ganzhi.mins
          gzG = lunar.time.ganzhi.geng;
    let gzTimeYears = document.getElementById("gzTimeYears");
    let gzTimeShiCi = document.getElementById("gzTimeShiCi");
    gzTimeShiCi.innerHTML = weaB(aN) + ' ' + weaD(aD);
    gzTimeYears.innerHTML =
      weaG(yG) + weaB(yZ) + weaR("『"+yA+"』") + weaD('年')
      + weaY(mG) + weaC(mZ) + weaD('月')
      + weaY(dG) + weaC(dZ) + weaD('日') + ' ➠ ';
    if(gzG) {
      gzTimeYears.innerHTML +=
        weaR(gzN) + weaG(gzH) + weaD("『"+gzX+"』")
        + weaP(gzM) + weaD("『"+gzG+"』");
    } else {
      gzTimeYears.innerHTML +=
        weaR(gzN) + weaG(gzH) + weaD("『"+gzX+"』") + weaP(gzM);
    }
  }

  document.getElementById("showTimeLoc").innerHTML =
  weaD(loc.Y) + weaD('-') + weaD(loc.M) + weaD('-') + weaD(loc.D) + " " +
  weaD(loc.h) + weaD(':') + weaD(loc.m) + weaD(':') + weaR(loc.s) + " " +
  weaD(timezoneOffset) + ' ' + weaD(timezoneName);
  document.getElementById("showTimeUtc").innerHTML =
  weaD(utc.Y) + weaD('-') + weaD(utc.M) + weaD('-') + weaD(utc.D) + " " +
  weaD(utc.h) + weaD(':') + weaD(utc.m) + weaD(':') + weaG(utc.s) + " " +
  weaD('+0000') + ' ' + weaD('Universal Time');

  if(updateCyclesSeconds % 300 == 0) {
    updateCyclesSeconds = 0; // 每五分钟更新一次标题
    const random = Math.floor(Math.random() * 100);
    const title = document.querySelector(`head > title`);
    let idx1 = (random+50) % EMOJIS.length, idx2 = (random+99) % EMOJIS.length;
    title.innerHTML = ` Mini ${EMOJIS[idx1]} Logo ${EMOJIS[idx2]}`;
  }; updateCyclesSeconds++;

  if(init) { repeatUpdateId = setInterval(updateTimeTitle, 1000); } // 每秒刷新
}

function loadMiniLogoCreator() {
  if(repeatUpdateId) clearInterval(repeatUpdateId);
  window.removeEventListener('click', loadMiniLogoCreator);
  const creator = getFullUrl(window.location.href, '/creator.html');
  if(creator) { window.location.href = creator; }
}

window.addEventListener('click', loadMiniLogoCreator);
