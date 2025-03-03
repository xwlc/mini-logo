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
  cancelId: -1, titleSecond: 0, lunarMinute: 0, ztreeCount: 0, ztreeMax: 3,
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
function waR3(msg) { return `<a style='color: hotpink'>${msg}</a>` }
function waG3(msg) { return `<a style='color: lawngreen'>${msg}</a>` }
function waB3(msg) { return `<a style='color: deepskyblue'>${msg}</a>` }
function waY3(msg) { return `<a style='color: yellow'>${msg}</a>` }
function waO3(msg) { return `<a style='color: darkorange'>${msg}</a>` }
function waC3(msg) { return `<a style='color: turquoise'>${msg}</a>` }
function waZ1(msg) { return `<a style='color: khaki'>${msg}</a>` }
function waZ2(msg) { return `<a style='color: lightcyan'>${msg}</a>` }

function updateWelcome() {
  const now = new Date(); let loc ={}, utc = {}, YMDhmsZ;
  loc.Y = now.getFullYear(); loc.M = now.getMonth() + 1; loc.D = now.getDate();
  loc.h = now.getHours();    loc.m = now.getMinutes();   loc.s = now.getSeconds();

  utc.Y = now.getUTCFullYear(); utc.M = now.getUTCMonth() + 1; utc.D = now.getUTCDate();
  utc.h = now.getUTCHours();    utc.m = now.getUTCMinutes();   utc.s = now.getUTCSeconds();

  let upLunar = Math.floor(loc.m / 15) > wUpdate.lunarMinute;
  if(!wFigure.xN) upLunar = true;
  if(wUpdate.lunarMinute == 3 && Math.floor(loc.m / 15) == 0) upLunar = true;
  if(upLunar) { // 每刻钟更新农历
    wUpdate.lunarMinute = Math.floor( loc.m / 15 );
    const lunar = LunarCalendar.lunarNow();
    const  yA = lunar.year.gz.y.ani,
           yG = lunar.year.gz.y.gan,     yZ = lunar.year.gz.y.zhi,
           mG = lunar.year.gz.m.gan,     mZ = lunar.year.gz.m.zhi,
           dG = lunar.year.gz.d.gan,     dZ = lunar.year.gz.d.zhi;
    const gzN = lunar.time.ganzhi.name, gzX = lunar.time.ganzhi.nick,
          gzH = lunar.time.ganzhi.hour, gzM = lunar.time.ganzhi.mins
          gzG = lunar.time.ganzhi.geng;

    wFigure.idx = 0;
    wFigure.xN = lunar.time.hisart.name;
    wFigure.xD = lunar.time.hisart.desc;

    const gzTimeYears = document.getElementById("gzTimeYears");
    gzTimeYears.innerHTML =
        waG3(yG)  + waB3(yZ)  + waR3("❲"+yA+"❳") + waD9('年 ')
      + waG3(mG)  + waB3(mZ)  + waD9('月 ')
      + waG3(dG)  + waB3(dZ)  + waD9('日 ➠ ')
      + waO3(gzN) + waY3(gzH) + waC3(gzM) + waD9(' ￮ '+gzX);
    if(gzG) { gzTimeYears.innerHTML += waD9(gzG); }
  }

  loc.M = padNum(loc.M); loc.D = padNum(loc.D);
  loc.h = padNum(loc.h); loc.m = padNum(loc.m); loc.s = padNum(loc.s);

  utc.M = padNum(utc.M); utc.D = padNum(utc.D);
  utc.h = padNum(utc.h); utc.m = padNum(utc.m); utc.s = padNum(utc.s);

  document.getElementById("gzTimeShiCi").innerHTML = // 贴纸人简单动画
    waZ1(wFigure.xN)+' '+waD9(wFigure.who[wFigure.idx])+' '+waZ2(wFigure.xD);
  wFigure.idx = ( wFigure.idx + 1 ) % 4;

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

  if(wUpdate.titleSecond % 30 == 0) { // 每 15 秒刷新一次
    if(wUpdate.ztreeCount % wUpdate.ztreeMax == 0) {
      wUpdate.ztreeCount = 0; // [1, 9] 次后清空画布
      wUpdate.ztreeMax = ZATree.randomInteger(1, 9);
      const tree = document.getElementById('zatree');
      const ctx = tree.getContext('2d'); // 清空画布
      ctx.clearRect(0, 0, tree.width, tree.height);
    }
    drawZATree(); wUpdate.ztreeCount++;
    const zatTitle = document.getElementById('zTreeTitle');
    if(zatTitle.innerHTML == 'Download') {
      zatTitle.removeEventListener('click', saveZATreeAsIamge);
    }
    zatTitle.innerHTML = wUpdate.ztreeCount + '/' + wUpdate.ztreeMax;
  }
}

function drawZATree() {
  ZATree.draw(document.getElementById('zatree'), { randomColor: true });
}

function saveZATreeAsIamge() {
  const now = new Date(); let Y, M, D, h, m, s;
  Y = now.getFullYear(); M = now.getMonth() + 1; D = now.getDate();
  h = now.getHours();    m = now.getMinutes();   s = now.getSeconds();

  M = padNum(M); D = padNum(D);
  h = padNum(h); m = padNum(m); s = padNum(s);

  const a = document.createElement('a');
  a.download = 'ZATree-'+Y+'-'+M+'-'+D+'-'+'T'+h+'-'+m+'-'+s;
  a.href = ZATree.base64(document.getElementById('zatree'));
  a.dispatchEvent(new MouseEvent('click'));
}

function downloadZATreeIamge() {
  const zatTitle = document.getElementById('zTreeTitle');
  if(zatTitle.innerHTML == 'Download') { return; }
  zatTitle.innerHTML = 'Download';
  zatTitle.style.cssText += 'cursor: pointer';
  zatTitle.style.cssText += 'border: 0.1vw solid';
  zatTitle.style.cssText += 'border-color: yellow';
  zatTitle.style.cssText += 'border-radius: 0.2vw';
  zatTitle.addEventListener('click', saveZATreeAsIamge);
}

function loadMiniLogoCreator(what) { // console.log(what);
  if(wUpdate.cancelId > -1) clearInterval(wUpdate.cancelId);
  //window.removeEventListener('dblclick', loadMiniLogoCreator);

  const ganzhi = document.getElementById('zGanZhiTime');
  ganzhi.removeEventListener('click', loadMiniLogoCreator);
  const tree = document.getElementById('zatree');
  tree.removeEventListener('click', downloadZATreeIamge);

  const creator = getFullUrl(window.location.href, '/creator.html');
  if(creator) { window.location.href = creator; }
}

//window.addEventListener('dblclick', loadMiniLogoCreator);
document.addEventListener('DOMContentLoaded', () => {
  const ganzhi = document.getElementById('zGanZhiTime');
  ganzhi.addEventListener('click', loadMiniLogoCreator);
  const tree = document.getElementById('zatree');
  tree.addEventListener('click', downloadZATreeIamge);

  tree.width  = window.screen.width  * 0.6;
  tree.height = window.screen.height * 0.6;

  wUpdate.ztreeCount++; updateWelcome(); drawZATree();
  wUpdate.cancelId = setInterval(updateWelcome, 1000); // 每秒刷新

  let repo; // 加载当前仓库更新日期及提交 ID
  repo = document.getElementById('zRepoUpdateTime');
  repo.innerHTML = 'Update Time : ' + repoUpdateTime;
  repo = document.getElementById('zRepoCommitHash');
  repo.innerHTML = 'Commit Hash : ' + repoCommitHash;
  repo.href = repositoryHome;
});
