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
    const random = Math.floor(Math.random() * 100);
    const title = document.querySelector(`head > title`);
    let idx1 = (random+50) % EMOJIS.length, idx2 = (random+99) % EMOJIS.length;
    title.innerHTML = ` Mini ${EMOJIS[idx1]} Logo ${EMOJIS[idx2]}`;
  }; updateTimeTitleSeconds++;

  if(init) { setInterval(updateTimeTitle, 1000); } // 每秒刷新时间
}
