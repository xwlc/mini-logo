// SPDX-License-Identifier: GPL-3.0-only OR Apache-2.0 OR MIT
// SPDX-FileCopyrightText: 2024 Charles Wong <charlie-wong@outlook.com>
// Created By: Charles Wong 2024-03-05T14:48:15+08:00 Asia/Shanghai
// Repository: https://github.com/xwlc/mini-logo

const FONTS = [
  "Abandon",
  "AnyFreak",
  "BabyBalloon",
  "BackToSchool",
  "BakeryRoast",
  "Bluetea",
  "Calvous",
  "Creamy",
  "Derek",
  "FluxArchitect",
  "Gabriella",
  "Gremlins",
  "HeavyRain",
  "Klara",
  "LnYoff",
  "MariaHand",
  "MilkyHoney",
  "NeonSans",
  "PatchFun",
  "Sausage",
  "SmileCandy",
  "SquishyWhale",
  "ThemE",
  "ThinkSmart",
  "Turtles",
  "Unranked",
  "Valorie",
  "Virgil",
  "WickedGrit"
];
const hasLoadFont = new Map();

// document.URL, this.location, window.location
// document.URL.indexOf('/'), document.URL.lastIndexOf('/')
const baseUrl = document.URL.substring(0, document.URL.lastIndexOf('/'));

async function dynamicLoadFont(family, callback) {
  // https://developer.mozilla.org/zh-CN/docs/Web/API/URL/URL
  let url = "url(fonts/" + family + ".ttf)";

  // https://developer.mozilla.org/en-US/docs/Web/API/FontFace/FontFace
  let font = new FontFace(family, url, { style: "normal", weight: "400" });
  await font.load(); // wait for font to be loaded
  document.fonts.add(font);
  hasLoadFont.set(family, 'true');
  if(typeof callback == 'function') callback();
}

// 自 定*义 CSS 变量属性 https://developer.mozilla.org/zh-CN/docs/Web/CSS/--*
// https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_custom_properties
//
// const all = document.documentElement
// getComputedStyle(all).getPropertyValue("--font-size");

function fontResize() {
  const main = document.getElementById('main');
  // console.log("Old => " + main.style.getPropertyValue("--font-size"));
  const newsize = document.getElementById("font-size").value;
  main.style.setProperty('--font-size', newsize + 'px');
  // console.log("New => " + main.style.getPropertyValue("--font-size"));
}

function fontChange(key, value) {
  const main = document.getElementById('main');
  main.style.setProperty(key, value);
}

function fontSelector() {
  if(!window.event || !window.event.srcElement) return;

  const opts = window.event.srcElement.options;
  const used = window.event.srcElement.selectedIndex;
  const data = opts[used].getAttribute("value");

  if(window.event.srcElement.id == "font-selector") {
    if(!data) {
      document.getElementById('main').removeAttribute('style');
      return;
    }
    if(hasLoadFont.get(data)) {
      fontChange('--font-family', data);
    } else {
      dynamicLoadFont(data, () => { fontChange('--font-family', data); });
    }
  } else if(window.event.srcElement.id == "font-weight") {
    fontChange('--font-weight', data);
  } else if(window.event.srcElement.id == "font-style") {
    fontChange('--font-style', data);
  }
}

function showGlyph(el, glyphcode, placeholder=false) {
  let li = document.createElement("li");
  // <li>
  //   <i class="glyphs">&#32;</i>
  //   <div class="code">0x20</div>
  // </li>
  if(!placeholder) {
    let i = document.createElement("i");
    i.className = 'glyphs';
    i.innerHTML = '&#' + glyphcode + ';';

    let div = document.createElement("div");
    div.className = 'code';
    div.innerHTML = 'U+' + parseInt(glyphcode).toString(16);

    li.appendChild(i);
    li.appendChild(div);
  }

  el.appendChild(li);
}

function updatePrivateArea(beg, end) {
  const priarea = document.getElementById("pri-area");
  while(priarea.firstChild) {
    priarea.removeChild(priarea.firstChild);
  }
  for(let xdec = beg; xdec < end; xdec++) {
    showGlyph(priarea, xdec);
  }
}

function onChangePriBeg() {
  let dec = document.getElementById("pri-beg").value;
  document.getElementById("pri-beg-hex").innerHTML = parseInt(dec).toString(16);
  updatePrivateArea(dec, document.getElementById("pri-end").value);
}

function onChangePriEnd() {
  let dec = document.getElementById("pri-end").value;
  document.getElementById("pri-end-hex").innerHTML = parseInt(dec).toString(16);
  updatePrivateArea(document.getElementById("pri-beg").value, dec);
}

// contenteditable="true"
window.onload = function() {
  FONTS.forEach((font) => {
    const opt = document.createElement("option");
    opt.value = font;
    opt.innerHTML = font;
    document.getElementById("font-selector").appendChild(opt);
  });

  // Basic Latin 0x20 ~ 0x7F
  const latin = document.getElementById("basic-latin");
  for(let blc = 32; blc <= 127; blc++) {
    showGlyph(latin, blc, (blc == 32 || blc == 127) ? true : false);
  }

  // Latin Supplement
  showGlyph(latin, 161); // 0xA1 ¡
  showGlyph(latin, 164); // 0xA4 ¤
  showGlyph(latin, 166); // 0xA6 ¦
  showGlyph(latin, 167); // 0xA7 §
  showGlyph(latin, 169); // 0xA9 ©
  showGlyph(latin, 171); // 0xAB «
  showGlyph(latin, 174); // 0xAE ®
  showGlyph(latin, 177); // 0xB1 ±
  showGlyph(latin, 183); // 0xB7 ·
  showGlyph(latin, 187); // 0xBB »
  showGlyph(latin, 8214); // 0x2016 ‖
  showGlyph(latin, 8224); // 0x2020 †
  showGlyph(latin, 8225); // 0x2021 ‡
  showGlyph(latin, 8226); // 0x2022 •
  showGlyph(latin, 8227); // 0x2023 ‣

  document.getElementById("font-size").onchange = fontResize;
  document.getElementById("font-style").onclick = fontSelector;
  document.getElementById("font-weight").onclick = fontSelector;
  document.getElementById("font-selector").onclick = fontSelector;

  document.getElementById("pri-beg").onchange = onChangePriBeg;
  document.getElementById("pri-end").onchange = onChangePriEnd;
}
