#!/usr/bin/env node
// SPDX-License-Identifier: GPL-3.0-only OR Apache-2.0 OR MIT
// SPDX-FileCopyrightText: 2024 Charles Wong <charlie-wong@outlook.com>
// Created By: Charles Wong 2024-07-03T06:18:56+08:00 Asia/Shanghai
// Repository: https://github.com/xwlc/mini-logo

console.log(zlog.red('mini-logo') + ' => ' +
  zlog.green('Simple') + ' ' + zlog.blue('Logo') + ' ' + zlog.cyan('Creator')
);

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
let updateTimeTitleSeconds = 0;
function updateTimeTitle(init) {
  const now = new Date(); let YY, MM, DD, hh, mm, ss;
  YY = now.getFullYear(); MM = now.getMonth() + 1; DD = now.getDate();
  hh = now.getHours();    mm = now.getMinutes();   ss = now.getSeconds();
  document.getElementById("showTime").innerHTML =
    YY + "年" + MM + "月" + DD + "日" + " " + hh + "时" + mm + "分" + ss + "秒";

  if(updateTimeTitleSeconds % 300 == 0) {
    updateTimeTitleSeconds = 0; // 每五分钟更新一次标题
    const title = document.querySelector(`head > title`);
    const favicon = document.querySelector(`head > link`);
    const random = Math.floor(Math.random() * 1000);
    let idx1 = (random+10) % EMOJIS.length, idx2 = (random+25) % EMOJIS.length;
    let idx3 = (random+55) % EMOJIS.length, idx4 = (random+85) % EMOJIS.length;
    title.innerHTML = `${EMOJIS[idx2]} Mini Logo ${EMOJIS[idx3]} ${EMOJIS[idx4]}`;
    let emoji = `
      <svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22>
        <text y=%22.9em%22 font-size=%2290%22>${EMOJIS[idx1]}</text>
      </svg>`.trim();
    favicon.setAttribute(`href`, `data:image/svg+xml,${emoji}`);
  }; updateTimeTitleSeconds++;

  if(init) { setInterval(updateTimeTitle, 1000); } // 每秒刷新时间
}
