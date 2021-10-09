(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{"+dU1":function(e,t,a){"use strict";a.d(t,"a",(function(){return s}));var n=a("q1tI"),o=a.n(n),r=a("/MKj"),l=a("r5Q1"),c=a.n(l),u=function(e){var t=e.label,a=e.id,r=e.options,l=e.onChange,u=e.selectedOption,i=e.className,d=void 0===i?"":i,m=Object(n.useState)(!1),V=m[0],s=m[1],p="dropdown-"+a;return Object(n.useEffect)((function(){var e=function(e){var t=document.getElementById(p);(null==t?void 0:t.contains(e.target))||s(!1)};return document.addEventListener("click",e),function(){return document.removeEventListener("click",e)}}),[s]),o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:c.a.dropdownContainer+" "+(V?c.a.dropdownOpen:"")+" "+d,id:p},o.a.createElement("div",{className:c.a.dropdownToggle,onClick:function(){return s(!V)}},o.a.createElement("div",{className:c.a.dropdownMenuLabel},t),o.a.createElement("div",null,u.label)),o.a.createElement("div",{className:c.a.dropdownMenu,onBlur:function(){return s(!1)}},o.a.createElement("ul",{className:c.a.dropdownMenuContent},r.map((function(e){return o.a.createElement("li",{key:e.value,onClick:function(){l(e.value),s(!1)},className:c.a.dropdownMenuItem,value:e.value},e.label)}))))))},i=a("j/Ep"),d=a("No7A"),m=a("vd24"),V=a.n(m),s=function(e){var t=e.hasDifficultySetting,a=e.hasSizeSetting,n=Object(r.useSelector)((function(e){return e.game.options.size})),l=Object(r.useSelector)((function(e){return e.game.options.difficulty})),c=Object(r.useSelector)((function(e){return e.game.phase})),m=Object(r.useDispatch)(),s=[{value:i.b.easy,label:"Easy"},{value:i.b.normal,label:"Normal"},{value:i.b.hard,label:"Hard"}],p=[{value:i.a.small,label:"4x4"},{value:i.a.medium,label:"5x5"},{value:i.a.big,label:"6x6"}];return o.a.createElement("div",{className:V.a.settings},Boolean(a)&&o.a.createElement(u,{label:"Board size",className:V.a.customDropdown,id:"board-size",options:p,selectedOption:p.find((function(e){return e.value===n})),onChange:function(e){m(Object(d.a)(e)),c!==i.c.gameEnd&&m(Object(d.d)(e))}}),Boolean(t)&&o.a.createElement(u,{label:"Difficulty",id:"difficulty",selectedOption:s.find((function(e){return e.value===l})),options:s,onChange:function(e){m(Object(d.b)(e)),c!==i.c.gameEnd&&m(Object(d.d)(n))}}))}},"4XLq":function(e,t,a){"use strict";a.d(t,"a",(function(){return A}));var n=a("q1tI"),o=a.n(n),r=a("Wbzz"),l=a("rCLJ"),c=a("yxp9"),u=a.n(c),i=a("uC36"),d=a("eWwy"),m=a.n(d),V=function(e){var t=e.game,a=Object(n.useState)(!0),c=a[0],d=a[1],V=i.a[t];return o.a.createElement("div",{className:m.a.top},o.a.createElement("div",{className:m.a.header},o.a.createElement("h1",{className:m.a.title},V.title),o.a.createElement("span",{className:m.a.sound,onClick:function(){d(!c);var e=document.getElementById("ost");c?e.play():e.pause()}},c?o.a.createElement(l.a,{size:32}):o.a.createElement(l.b,{size:32}))),o.a.createElement("audio",{id:"ost",loop:!0,src:u.a}),o.a.createElement("div",{className:m.a.nav},V.routes.map((function(e){return o.a.createElement(r.Link,{key:e.route,className:m.a.tab,activeClassName:m.a.active,to:e.route},e.label)}))))},s=a("9kNL"),p=a.n(s),A=function(e){var t=e.children,a=e.game;return o.a.createElement("div",{className:p.a.container},o.a.createElement(V,{game:a}),o.a.createElement("div",{className:p.a.content},t))}},"9kNL":function(e,t,a){e.exports={container:"Layout-module--container--j7Jey",content:"Layout-module--content--2aW9H"}},CpIh:function(e,t,a){e.exports=a.p+"static/playthrough-f6438af940546a3d46285fbf5c5de4d6.gif"},Lnxd:function(e,t,a){"use strict";a.d(t,"a",(function(){return i}));var n=a("q1tI"),o=a.n(n),r={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},l=o.a.createContext&&o.a.createContext(r),c=function(){return(c=Object.assign||function(e){for(var t,a=1,n=arguments.length;a<n;a++)for(var o in t=arguments[a])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},u=function(e,t){var a={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(a[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(n=Object.getOwnPropertySymbols(e);o<n.length;o++)t.indexOf(n[o])<0&&Object.prototype.propertyIsEnumerable.call(e,n[o])&&(a[n[o]]=e[n[o]])}return a};function i(e){return function(t){return o.a.createElement(d,c({attr:c({},e.attr)},t),function e(t){return t&&t.map((function(t,a){return o.a.createElement(t.tag,c({key:a},t.attr),e(t.child))}))}(e.child))}}function d(e){var t=function(t){var a,n=e.attr,r=e.size,l=e.title,i=u(e,["attr","size","title"]),d=r||t.size||"1em";return t.className&&(a=t.className),e.className&&(a=(a?a+" ":"")+e.className),o.a.createElement("svg",c({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},t.attr,n,i,{className:a,style:c(c({color:e.color||t.color},t.style),e.style),height:d,width:d,xmlns:"http://www.w3.org/2000/svg"}),l&&o.a.createElement("title",null,l),e.children)};return void 0!==l?o.a.createElement(l.Consumer,null,(function(e){return t(e)})):t(r)}},No7A:function(e,t,a){"use strict";a.d(t,"d",(function(){return l})),a.d(t,"c",(function(){return c})),a.d(t,"e",(function(){return u})),a.d(t,"a",(function(){return i})),a.d(t,"b",(function(){return d})),a.d(t,"f",(function(){return m}));var n=a("j/Ep"),o=a("5qFX"),r=a("xflN"),l=function(e){var t=parseInt(e,10),a=new Array(t*t).fill(0,0,t*t).map((function(e){return Math.random()})),l=Object(o.a)(a,t),c=[n.c.player1Turn,n.c.player2Turn],u=c[Math.floor(Math.random()*c.length)];return{type:r.f,payload:{phase:u,pieces:l.pieces,allMarbles:l.initialMarbles}}},c=function(){return{type:r.c}},u=function(e){return{type:r.e,payload:{cell:e}}},i=function(e){return{type:r.d,payload:{size:e}}},d=function(e){return{type:r.d,payload:{difficulty:e}}},m=function(){return{type:r.a}}},SL6I:function(e,t,a){e.exports={button:"Button-module--button--3lPXX",animate1:"Button-module--animate1--2fRxM",animate2:"Button-module--animate2--FE7-H",animate3:"Button-module--animate3--3d0f0",animate4:"Button-module--animate4--2U4sP"}},Tz5b:function(e,t){e.exports="data:audio/mpeg;base64,SUQzBAAAAAAAVlREUkMAAAAMAAADMTk5Ni0wMi0wNwBUWFhYAAAAEwAAA0lFTkcAQmlsbCBXb2xmb3JkAFRTU0UAAAAPAAADTGF2ZjU3LjM2LjEwMAAAAAAAAAAAAAAA//NwAAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAAEAAAD+QBiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmKWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy/////////////////////////////////8AAAAATGF2YzU3LjM5AAAAAAAAAAAAAAAAJAAAAAAAAAAAA/kUVf8HAAAAAAD/84BkAAx9CV0ooIgADPAC4l1BEAK6O2VIwAN5AwDHG+Ab/H6nPzn/QhCEIT/7nOc5z/+chCEIRpyEIQhCN/kIBgYGBgZzoQDAwMDAwMW6BwMDAwMDB8uD4Pv9QJh/g+D5/8H3xACYPg+H1A+D4Pg//4nB8H6wfB8/JJLLbro0yh+IAQBMH3xAH4f5cH+D7/KA+/BM+p3ggCb1AgGPBP8HwfNec//Lh///+D4fcpucuYmJh1ZkZePQHBZhAj84w+NrhFqBgCQYA7bpRjGLQfuW//OCZCMM2U+FjswoAxdTVvsdjFAH2J4CYfiIc0xBuQGmkW12NGRDUisqFDFECRCKArfOPUwoaaKyxVO//1Jc1Djm/p/6EWRKx3+d///8iV87ocdOJv///FWBomHh4l1AEQN/AEAhBAOQlTPanB4y52ADw/VrBYVicMpMc581Tv1MfR/mOREyXqa50xrtQ8i//zlT0N///NQ02aayt////9Geq9DWOIR6U/////zTW/Ueso9Y6paIZhoSCwAC0JgACAANBaKYoY0xUjqOSIcTXjj/84JkGw6hlzctyLQAEttaul+BKALDmBUzFl8L0NIGQtEy4ckcoXV/8YUKIdgcQjmSSq+YjhPGw9Uj+vX/mpPJY8Sx8eqBdr1//xPh5ksgSSJiUTVJc5////j2SRkkbssuoqSfV/////tUiZPKpiKAYDgUDgQDAYCAQCAQAP1+/N/mDpv1ZTf7lKEhb/xERDrOML//lRKaL//+xwGFjK1RXT////MEgYRQWytM6V/////9VZVKIrRTCRVVTEFNRTMuOTkuNVVVVVVVVVVVVVVVVf/zgmQWAAABpADgAAAAAANIAcAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV"},U5E3:function(e,t,a){e.exports={buttonNew:"Buttons-module--buttonNew--2KPcq"}},U7va:function(e,t,a){e.exports=a.p+"static/win-ab3cb11060eac248dbe89b7950a005dc.mp3"},UE3f:function(e,t,a){e.exports={preloadImage1:"Board-module--preloadImage1--19Qjf",preloadImage2:"Board-module--preloadImage2--lFZpT",stage:"Board-module--stage--1qRCh",gameArea:"Board-module--gameArea--2JpI2",board:"Board-module--board--4t-NE",gameAreaSmall:"Board-module--gameAreaSmall--3ihl8",gameAreaRest:"Board-module--gameAreaRest--_upUo",p1:"Board-module--p1--214Ot",p2:"Board-module--p2--OWkJj",block:"Board-module--block--31UXZ",blockSmall:"Board-module--blockSmall--3kUxT",blockNormal:"Board-module--blockNormal--3Qm9M",blockBig:"Board-module--blockBig--1j0VP",piece:"Board-module--piece--p-9hQ",obstacle:"Board-module--obstacle--iAPXD",selectedPlayer1:"Board-module--selectedPlayer1--2lVCq",selectedPlayer2:"Board-module--selectedPlayer2--bzg3m",empty:"Board-module--empty--1wnUx",tutorial:"Board-module--tutorial--3fm-b"}},XdKK:function(e,t,a){"use strict";a.d(t,"a",(function(){return f}));var n=a("q1tI"),o=a.n(n),r=a("/MKj"),l=a("eqEe"),c=a.n(l),u=a("SL6I"),i=a.n(u),d=function(e){var t=e.label,a=(e.id,e.onClick),n=e.className,r=void 0===n?"":n;return o.a.createElement("div",{className:i.a.button+" "+r,onClick:a},o.a.createElement("span",null),o.a.createElement("span",null),o.a.createElement("span",null),o.a.createElement("span",null),o.a.createElement("span",null),t)},m=a("j/Ep"),V=a("No7A"),s=a("U5E3"),p=a.n(s),A=function(e){e.pause(),e.currentTime=0,e.play()},f=function(){var e=Object(r.useSelector)((function(e){return e.game.options.size})),t=Object(r.useSelector)((function(e){return e.game.phase})),a=Object(r.useDispatch)();return o.a.createElement("div",null,o.a.createElement("audio",{id:"buttonSound",src:c.a}),t!==m.c.gameEnd&&o.a.createElement(d,{label:"Quit",onClick:function(){A(document.getElementById("buttonSound")),a(Object(V.c)())}}),o.a.createElement(d,{label:"New game",className:p.a.buttonNew,onClick:function(){A(document.getElementById("buttonSound")),a(Object(V.d)(e))}}))}},XmWl:function(e,t,a){e.exports={gameInfo:"GameInfo-module--gameInfo--3NxRb",playerInfo:"GameInfo-module--playerInfo--2u7Xf",p1:"GameInfo-module--p1--we2gx",p2:"GameInfo-module--p2--WSaKE"}},eWwy:function(e,t,a){e.exports={top:"Header-module--top--8yFkq",header:"Header-module--header--1rl48",sound:"Header-module--sound--23dFt",title:"Header-module--title--10s7Z",nav:"Header-module--nav--1H61L",tab:"Header-module--tab--2YSrf",active:"Header-module--active--3R6RC"}},eqEe:function(e,t,a){e.exports=a.p+"static/button-0859886874293b3a7807d701de4e69dd.mp3"},jj42:function(e,t,a){"use strict";a.d(t,"a",(function(){return v}));var n=a("q1tI"),o=a.n(n),r=a("/MKj"),l=a("Tz5b"),c=a.n(l),u=a("CpIh"),i=a.n(u),d=a("U7va"),m=a.n(d),V=a("j/Ep"),s=a("No7A"),p=a("XmWl"),A=a.n(p),f=function(e){var t,a=e.vsComp,n=Object(r.useSelector)((function(e){return e.game.phase})),l=(t={},t[V.c.player1Turn]=a?"Your turn":"Player 1 turn",t[V.c.player2Turn]="Player 2 turn",t[V.c.computerTurn]="Computer turn",t[V.c.player1Wins]=(a?"You win":"Player 1 wins")+"!",t[V.c.player2Wins]=(a?"Computer":"Player 2")+" wins!",t)[n]||"",c=n===V.c.player1Turn||n===V.c.player1Wins;return o.a.createElement("div",{className:""+A.a.gameInfo},n!==V.c.gameEnd&&o.a.createElement("div",{className:A.a.playerInfo+" "+(c?A.a.p1:A.a.p2),id:"game-info"},l))},b=a("UE3f"),y=a.n(b),g=function(e){e.pause(),e.currentTime=0,e.play()},v=function(e){var t=e.handleBothPlayers,a=Object(n.useState)(!1),l=a[0],u=a[1],d=Object(r.useSelector)((function(e){return e.game.phase})),p=parseInt(Object(r.useSelector)((function(e){return e.game.options.size})),10),A=Object(r.useSelector)((function(e){return e.game.pieces})),b=Object(r.useDispatch)(),v=function(){u(!1),b(Object(s.f)())},E=function(e,a,n,o){(t||d===V.c.player1Turn)&&a.type===V.e.piece&&(u(!0),e.preventDefault(),g(document.getElementById("clickSound")),b(Object(s.e)(n*p+o)))};return o.a.createElement("div",{className:y.a.stage},o.a.createElement("div",{className:y.a.preloadImage1}),o.a.createElement("div",{className:y.a.preloadImage2}),o.a.createElement("audio",{id:"clickSound",src:c.a}),o.a.createElement("audio",{id:"winSound",src:m.a}),d===V.c.gameEnd?o.a.createElement("img",{className:y.a.tutorial,alt:"Game Tutorial",src:i.a}):o.a.createElement("div",{className:y.a.gameArea+" "+(p.toString()===V.a.small?y.a.gameAreaSmall:y.a.gameAreaRest)},o.a.createElement(f,{vsComp:!t}),o.a.createElement("table",{className:y.a.board+" "+(V.c.player1Turn===d?y.a.p1:y.a.p2),onMouseUp:function(){return v()},onTouchEnd:function(){return v()}},o.a.createElement("tbody",null,A.slice(0,p).map((function(e,a){return o.a.createElement("tr",null,A.slice(a*p,a*p+p).map((function(e,n){return o.a.createElement("td",{className:y.a.block+" "+(u=e.type,(i={},i[V.e.obstacle]=y.a.obstacle,i[V.e.empty]=y.a.empty,i[V.e.piece]=y.a.piece,i[V.e.selected]=d===V.c.player1Turn?y.a.selectedPlayer1:y.a.selectedPlayer2,i)[u]+" ")+(r=p,(c={},c[V.a.small]=y.a.blockSmall,c[V.a.medium]=y.a.blockNormal,c[V.a.big]=y.a.blockBig,c)[r]),key:n,id:e.type+"-"+a+"-"+n,onMouseDown:function(t){return E(t,e,a,n)},onTouchStart:function(t){return E(t,e,a,n)},onMouseOver:function(){return function(e,a,n){(t||d===V.c.player1Turn)&&l&&e.type===V.e.piece&&(g(document.getElementById("clickSound")),b(Object(s.e)(a*p+n)))}(e,a,n)},onTouchMove:function(e){return function(e){var a,n=e.touches[0],o=null===(a=document.elementFromPoint(n.clientX,n.clientY))||void 0===a?void 0:a.id,r=(null==o?void 0:o.split("-"))||[],c=r[0],u=r[1],i=r[2];(t||d===V.c.player1Turn)&&l&&c===V.e.piece&&(g(document.getElementById("clickSound")),b(Object(s.e)(parseInt(u,10)*p+parseInt(i,10))))}(e)}});var r,c,u,i})))}))))))}},r5Q1:function(e,t,a){e.exports={dropdownContainer:"Dropdown-module--dropdown-container--3cArm",dropdownToggle:"Dropdown-module--dropdown-toggle--2Jwc9",dropdownMenu:"Dropdown-module--dropdown-menu--37o-7",dropdownMenuContent:"Dropdown-module--dropdown-menu-content--1ulcq",dropdownMenuLabel:"Dropdown-module--dropdown-menu-label--AIzo0",dropdownMenuItem:"Dropdown-module--dropdown-menu-item--192E7",dropdownOpen:"Dropdown-module--dropdown-open--3-1QB"}},uC36:function(e,t,a){"use strict";a.d(t,"a",(function(){return o}));var n,o=((n={})[a("j/Ep").d.randix]={title:"Randix",routes:[{route:"/randix/",label:"Home"},{route:"/randix/vs-player/",label:"vs Player"},{route:"/randix/vs-computer/",label:"vs Cp"}]},n)},vd24:function(e,t,a){e.exports={settings:"Settings-module--settings--3ThMv",label:"Settings-module--label--1TUCt",customDropdown:"Settings-module--customDropdown--2GisM"}},wm3r:function(e,t,a){e.exports={content:"Page-module--content--1OpUk",wrapper:"Page-module--wrapper--2dZoo",card:"Page-module--card--aWZnI",container:"Page-module--container--3d82p"}},yxp9:function(e,t,a){e.exports=a.p+"static/Wallpaper-e63e046a58bdc1f0a28e56777708e45d.mp3"}}]);
//# sourceMappingURL=75f2a265e551a99f639361285889ae7aa39be9c5-4034784e390264eb6a62.js.map