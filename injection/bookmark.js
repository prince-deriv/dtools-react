(function () {
  const script = document.createElement("script");
  script.src =
    "https://prince-deriv.github.io/dtools-react/injection/production.js";
  script.type = "module";
  document.head.appendChild(script);
})();
(function () {
  const script = document.createElement("script");
  script.src =
    atob("aHR0cHM6Ly9wcmluY2UtZGVyaXYuZ2l0aHViLmlvL2R0b29scy1yZWFjdA==") +
    "/injection/production.js";
  script.type = "module";
  document.head.appendChild(script);
})();

(function () {
  const script = document.createElement("script");
  const timestamp = new Date().getTime();
  script.src =
    "http://localhost:8888/dtools-react/injection/local.js?cache-buster=" +
    timestamp;
  script.type = "module";
  script.onload = function () {
    console.log("Script loaded successfully!");
  };
  script.onerror = function () {
    console.error("Error loading script.");
  };
  document.head.appendChild(script);
})();

//local
// javascript:function _0x47eb(_0x2c9b84,_0x3d8440){const _0x4d0bae=_0x4d0b();return _0x47eb=function(_0x47eb8a,_0x21c0a5){_0x47eb8a=_0x47eb8a-0xe4;let _0x5e6eba=_0x4d0bae[_0x47eb8a];return _0x5e6eba;},_0x47eb(_0x2c9b84,_0x3d8440);}function _0x4d0b(){const _0x54f2ae=['Error\x20loading\x20script.','head','852xHIfHW','aHR0cHM6Ly9wcmluY2UtZGVyaXYuZ2l0aHViLmlvL2R0b29scy1yZWFjdA==','2KjKcZM','8rdvvUo','95410RYSJqI','477301pBelhk','3959080SjNtXs','error','appendChild','onload','71466jgFWzT','490ddZAEH','module','Script\x20loaded\x20successfully!','createElement','getTime','306ppAlzI','3022416lIViMm','1628540jgOoAu','760318FCLfVt'];_0x4d0b=function(){return _0x54f2ae;};return _0x4d0b();}(function(_0x3a0ab2,_0x52f20e){const _0x57446c=_0x47eb,_0xa414b1=_0x3a0ab2();while(!![]){try{const _0x1cc6e3=parseInt(_0x57446c(0xf3))/0x1*(parseInt(_0x57446c(0xee))/0x2)+-parseInt(_0x57446c(0xec))/0x3+parseInt(_0x57446c(0xf4))/0x4*(-parseInt(_0x57446c(0xed))/0x5)+-parseInt(_0x57446c(0xe5))/0x6*(parseInt(_0x57446c(0xe6))/0x7)+-parseInt(_0x57446c(0xf7))/0x8+parseInt(_0x57446c(0xeb))/0x9*(-parseInt(_0x57446c(0xf5))/0xa)+parseInt(_0x57446c(0xf6))/0xb*(parseInt(_0x57446c(0xf1))/0xc);if(_0x1cc6e3===_0x52f20e)break;else _0xa414b1['push'](_0xa414b1['shift']());}catch(_0x235815){_0xa414b1['push'](_0xa414b1['shift']());}}}(_0x4d0b,0x812f6),(function(){const _0x1914ea=_0x47eb,_0x19519a=document[_0x1914ea(0xe9)]('script'),_0x589185=new Date()[_0x1914ea(0xea)]();_0x19519a['src']=atob(_0x1914ea(0xf2))+'/injection/local.js?cache-buster='+_0x589185,_0x19519a['type']=_0x1914ea(0xe7),_0x19519a[_0x1914ea(0xe4)]=function(){const _0x4a4cb5=_0x1914ea;console['log'](_0x4a4cb5(0xe8));},_0x19519a['onerror']=function(){const _0x33ef00=_0x1914ea;console[_0x33ef00(0xf8)](_0x33ef00(0xef));},document[_0x1914ea(0xf0)][_0x1914ea(0xf9)](_0x19519a);}()));

// production
// javascript:function _0x321d(_0x50acb3,_0x1a6d2f){const _0x1cf804=_0x1cf8();return _0x321d=function(_0x321d27,_0x5275b2){_0x321d27=_0x321d27-0x7d;let _0x3b59d7=_0x1cf804[_0x321d27];return _0x3b59d7;},_0x321d(_0x50acb3,_0x1a6d2f);}function _0x1cf8(){const _0x19077c=['module','7277460cHCpIC','3757077uLoEZl','createElement','/injection/production.js','src','aHR0cHM6Ly9wcmluY2UtZGVyaXYuZ2l0aHViLmlvL2R0b29scy1yZWFjdA==','363144hUafWW','47656AOobjI','3327312tRdMZo','28yWhGPt','452372YhFtXX','82525XtKPli','type','3duLtNq','175bYxUHy'];_0x1cf8=function(){return _0x19077c;};return _0x1cf8();}(function(_0xbc7dc8,_0x387e13){const _0x14d809=_0x321d,_0x227ab6=_0xbc7dc8();while(!![]){try{const _0x3eaa50=parseInt(_0x14d809(0x8b))/0x1+parseInt(_0x14d809(0x7f))/0x2*(parseInt(_0x14d809(0x82))/0x3)+-parseInt(_0x14d809(0x7e))/0x4*(-parseInt(_0x14d809(0x80))/0x5)+-parseInt(_0x14d809(0x7d))/0x6+-parseInt(_0x14d809(0x83))/0x7*(parseInt(_0x14d809(0x8c))/0x8)+-parseInt(_0x14d809(0x86))/0x9+parseInt(_0x14d809(0x85))/0xa;if(_0x3eaa50===_0x387e13)break;else _0x227ab6['push'](_0x227ab6['shift']());}catch(_0x425352){_0x227ab6['push'](_0x227ab6['shift']());}}}(_0x1cf8,0x4c181),(function(){const _0x39e80a=_0x321d,_0x272f66=document[_0x39e80a(0x87)]('script');_0x272f66[_0x39e80a(0x89)]=atob(_0x39e80a(0x8a))+_0x39e80a(0x88),_0x272f66[_0x39e80a(0x81)]=_0x39e80a(0x84),document['head']['appendChild'](_0x272f66);}()));
