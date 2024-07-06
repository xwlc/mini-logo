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

const XFIGURE = {
  idx: 0, haN: '', haD: '', who: [ '🯅', '🯆', '🯇', '🯈' ]
};

const timezoneName = Intl.DateTimeFormat().resolvedOptions().timeZone;
const timezoneOffset = (function() {
  let hh, mm, sign, val = new Date().getTimezoneOffset();
  if(val < 0) { sign = '+'; val = -val; } else { sign = '-'; }
  hh = Math.floor(val / 60).toString().padStart(2, '0');
  mm = (val % 60).toString().padStart(2, '0');
  return sign + hh + mm;
})();

// https://drafts.csswg.org/css-color/#named-colors
function waD9(msg) { return `<a style='color: darkgray'>${msg}</a>` }
function waR3(msg) { return `<a style='color: red'>${msg}</a>` }
function waG3(msg) { return `<a style='color: forestgreen'>${msg}</a>` }
function waB3(msg) { return `<a style='color: royalblue'>${msg}</a>` }
function waY3(msg) { return `<a style='color: yellow'>${msg}</a>` }
function waP3(msg) { return `<a style='color: darkorchid'>${msg}</a>` }
function waO3(msg) { return `<a style='color: chocolate'>${msg}</a>` }
function waZ1(msg) { return `<a style='color: lightcoral'>${msg}</a>` }
function waZ2(msg) { return `<a style='color: lightcyan'>${msg}</a>` }
function waZ3(msg) { return `<a style='color: olive'>${msg}</a>` }

let updateCyclesSeconds = 0, prevLunarMinute = 0, repeatUpdateId;

function updateTimeTitle(init) {
  const now = new Date(); let loc ={}, utc = {}, YMDhmsZ, lunar, flag;
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
    const gzN = lunar.time.ganzhi.name, gzX = lunar.time.ganzhi.nick,
          gzH = lunar.time.ganzhi.hour, gzM = lunar.time.ganzhi.mins
          gzG = lunar.time.ganzhi.geng;

    XFIGURE.idx = 0;
    XFIGURE.haN = lunar.time.hisart.name;
    XFIGURE.haD = lunar.time.hisart.desc;

    const gzTimeYears = document.getElementById("gzTimeYears");
    gzTimeYears.innerHTML =
        waG3(yG) + waB3(yZ) + waR3("❲"+yA+"❳") + waD9('年 ')
      + waY3(mG) + waO3(mZ) + waD9('月 ')
      + waP3(dG) + waZ3(dZ) + waD9('日 ➠ ')
      + waR3(gzN) + waG3(gzH) + waB3(gzM) + waD9(' ￮ '+gzX);
    if(gzG) { gzTimeYears.innerHTML += waD9(gzG); }
  }

  if(init || flag || updateCyclesSeconds % 2 == 0) {
    document.getElementById("gzTimeShiCi").innerHTML =
    waZ1(XFIGURE.haN)+' '+waD9(XFIGURE.who[XFIGURE.idx])+' '+waZ2(XFIGURE.haD);
    XFIGURE.idx = ( XFIGURE.idx + 1 ) % 4;
  }

  YMDhmsZ  = loc.Y + '-' + loc.M + '-' + loc.D + ' ';
  YMDhmsZ += loc.h + ':' + loc.m + ':' + loc.s + ' ' + timezoneOffset;
  document.getElementById("showTimeLoc").innerHTML = waD9(YMDhmsZ);
  YMDhmsZ  = utc.Y + '-' + utc.M + '-' + utc.D + ' ';
  YMDhmsZ += utc.h + ':' + utc.m + ':' + utc.s + ' +0000';
  document.getElementById("showTimeUtc").innerHTML = waD9(YMDhmsZ);

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
