// SPDX-License-Identifier: GPL-3.0-only OR Apache-2.0 OR MIT
// SPDX-FileCopyrightText: 2024 Charles Wong <charlie-wong@outlook.com>
// Created By: Charles Wong 2024-07-05T07:56:07+08:00 Asia/Shanghai
// Repository: https://github.com/xwlc/mini-logo

const wEmojis = [
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

const wFigure = {
  idx: 0, xN: '', xD: '', who: [ '🯅', '🯆', '🯇', '🯈' ]
};

const wUpdate = {
  cancelId: -1, titleSecond: 0, lunarMinute: 0, ztreeCount: 1, ztreeMax: 3,
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

function updateWelcome(init) {
  const now = new Date(); let loc ={}, utc = {}, YMDhmsZ, lunar, flag;
  loc.Y = now.getFullYear(); loc.M = now.getMonth() + 1; loc.D = now.getDate();
  loc.h = now.getHours();    loc.m = now.getMinutes();   loc.s = now.getSeconds();

  utc.Y = now.getUTCFullYear(); utc.M = now.getUTCMonth() + 1; utc.D = now.getUTCDate();
  utc.h = now.getUTCHours();    utc.m = now.getUTCMinutes();   utc.s = now.getUTCSeconds();

  flag = Math.floor(loc.m / 15) > wUpdate.lunarMinute;
  if(wUpdate.lunarMinute == 3 && Math.floor(loc.m / 15) == 0) flag = true;
  if(init || flag) { // 每刻钟更新农历
    wUpdate.lunarMinute = Math.floor( loc.m / 15 );
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

    wFigure.idx = 0;
    wFigure.xN = lunar.time.hisart.name;
    wFigure.xD = lunar.time.hisart.desc;

    const gzTimeYears = document.getElementById("gzTimeYears");
    gzTimeYears.innerHTML =
        waG3(yG) + waB3(yZ) + waR3("❲"+yA+"❳") + waD9('年 ')
      + waY3(mG) + waO3(mZ) + waD9('月 ')
      + waP3(dG) + waZ3(dZ) + waD9('日 ➠ ')
      + waR3(gzN) + waG3(gzH) + waB3(gzM) + waD9(' ￮ '+gzX);
    if(gzG) { gzTimeYears.innerHTML += waD9(gzG); }
  }

  if(init || flag || wUpdate.titleSecond % 2 == 0) {
    document.getElementById("gzTimeShiCi").innerHTML = // 贴纸人简单动画
      waZ1(wFigure.xN)+' '+waD9(wFigure.who[wFigure.idx])+' '+waZ2(wFigure.xD);
    wFigure.idx = ( wFigure.idx + 1 ) % 4;
  }

  YMDhmsZ  = loc.Y + '-' + loc.M + '-' + loc.D + ' ';
  YMDhmsZ += loc.h + ':' + loc.m + ':' + loc.s + ' ' + timezoneOffset;
  document.getElementById("showTimeLoc").innerHTML = waD9(YMDhmsZ);
  YMDhmsZ  = utc.Y + '-' + utc.M + '-' + utc.D + ' ';
  YMDhmsZ += utc.h + ':' + utc.m + ':' + utc.s + ' +0000';
  document.getElementById("showTimeUtc").innerHTML = waD9(YMDhmsZ);

  if(wUpdate.titleSecond % 300 == 0) {
    wUpdate.titleSecond = 0; // 每五分钟更新一次标题
    const random = Math.floor(Math.random() * 100);
    const title = document.querySelector(`head > title`);
    let idx1 = (random+50) % wEmojis.length, idx2 = (random+99) % wEmojis.length;
    title.innerHTML = ` Mini ${wEmojis[idx1]} Logo ${wEmojis[idx2]}`;
  }; wUpdate.titleSecond++;

  if(init) { wUpdate.cancelId = setInterval(updateWelcome, 1000); } // 每秒刷新
  if(wUpdate.titleSecond % 30 == 0) { // 每 15 秒刷新一次
    if(wUpdate.ztreeCount % wUpdate.ztreeMax == 0) {
      wUpdate.ztreeCount = 1; // [2, 8] 次后清空画布
      wUpdate.ztreeMax = ZATree.randomInteger(2, 8);
      const tree = document.getElementById('zatree');
      const ctx = tree.getContext('2d'); // 清空画布
      ctx.clearRect(0, 0, tree.width, tree.height);
    }
    drawZATree(); wUpdate.ztreeCount++;
  }
}

function drawZATree() {
  ZATree.draw(document.getElementById('zatree'), { randomColor: true });
}

function loadMiniLogoCreator() {
  if(wUpdate.cancelId > -1) clearInterval(wUpdate.cancelId);
  window.removeEventListener('click', loadMiniLogoCreator);
  document.removeEventListener('DOMContentLoaded', drawZATree);
  const creator = getFullUrl(window.location.href, '/creator.html');
  if(creator) { window.location.href = creator; }
}

window.addEventListener('click', loadMiniLogoCreator);
document.addEventListener('DOMContentLoaded', drawZATree);
