(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{264:function(t,e,r){var i=r(38).Buffer;function n(t,e){this._block=i.alloc(t),this._finalSize=e,this._blockSize=t,this._len=0}n.prototype.update=function(t,e){"string"==typeof t&&(e=e||"utf8",t=i.from(t,e));for(var r=this._block,n=this._blockSize,s=t.length,o=this._len,h=0;h<s;){for(var a=o%n,c=Math.min(s-h,n-a),u=0;u<c;u++)r[a+u]=t[h+u];h+=c,(o+=c)%n==0&&this._update(r)}return this._len+=s,this},n.prototype.digest=function(t){var e=this._len%this._blockSize;this._block[e]=128,this._block.fill(0,e+1),e>=this._finalSize&&(this._update(this._block),this._block.fill(0));var r=8*this._len;if(r<=4294967295)this._block.writeUInt32BE(r,this._blockSize-4);else{var i=(4294967295&r)>>>0,n=(r-i)/4294967296;this._block.writeUInt32BE(n,this._blockSize-8),this._block.writeUInt32BE(i,this._blockSize-4)}this._update(this._block);var s=this._hash();return t?s.toString(t):s},n.prototype._update=function(){throw new Error("_update must be implemented by subclass")},t.exports=n},622:function(t,e,r){(e=t.exports=function(t){t=t.toLowerCase();var r=e[t];if(!r)throw new Error(t+" is not supported (we accept pull requests)");return new r}).sha=r(7621),e.sha1=r(7622),e.sha224=r(7623),e.sha256=r(6614),e.sha384=r(7624),e.sha512=r(6615)},6614:function(t,e,r){var i=r(33),n=r(264),s=r(38).Buffer,o=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298],h=new Array(64);function a(){this.init(),this._w=h,n.call(this,64,56)}function c(t,e,r){return r^t&(e^r)}function u(t,e,r){return t&e|r&(t|e)}function l(t){return(t>>>2|t<<30)^(t>>>13|t<<19)^(t>>>22|t<<10)}function f(t){return(t>>>6|t<<26)^(t>>>11|t<<21)^(t>>>25|t<<7)}function p(t){return(t>>>7|t<<25)^(t>>>18|t<<14)^t>>>3}i(a,n),a.prototype.init=function(){return this._a=1779033703,this._b=3144134277,this._c=1013904242,this._d=2773480762,this._e=1359893119,this._f=2600822924,this._g=528734635,this._h=1541459225,this},a.prototype._update=function(t){for(var e,r=this._w,i=0|this._a,n=0|this._b,s=0|this._c,h=0|this._d,a=0|this._e,_=0|this._f,v=0|this._g,m=0|this._h,w=0;w<16;++w)r[w]=t.readInt32BE(4*w);for(;w<64;++w)r[w]=0|(((e=r[w-2])>>>17|e<<15)^(e>>>19|e<<13)^e>>>10)+r[w-7]+p(r[w-15])+r[w-16];for(var d=0;d<64;++d){var g=m+f(a)+c(a,_,v)+o[d]+r[d]|0,y=l(i)+u(i,n,s)|0;m=v,v=_,_=a,a=h+g|0,h=s,s=n,n=i,i=g+y|0}this._a=i+this._a|0,this._b=n+this._b|0,this._c=s+this._c|0,this._d=h+this._d|0,this._e=a+this._e|0,this._f=_+this._f|0,this._g=v+this._g|0,this._h=m+this._h|0},a.prototype._hash=function(){var t=s.allocUnsafe(32);return t.writeInt32BE(this._a,0),t.writeInt32BE(this._b,4),t.writeInt32BE(this._c,8),t.writeInt32BE(this._d,12),t.writeInt32BE(this._e,16),t.writeInt32BE(this._f,20),t.writeInt32BE(this._g,24),t.writeInt32BE(this._h,28),t},t.exports=a},6615:function(t,e,r){var i=r(33),n=r(264),s=r(38).Buffer,o=[1116352408,3609767458,1899447441,602891725,3049323471,3964484399,3921009573,2173295548,961987163,4081628472,1508970993,3053834265,2453635748,2937671579,2870763221,3664609560,3624381080,2734883394,310598401,1164996542,607225278,1323610764,1426881987,3590304994,1925078388,4068182383,2162078206,991336113,2614888103,633803317,3248222580,3479774868,3835390401,2666613458,4022224774,944711139,264347078,2341262773,604807628,2007800933,770255983,1495990901,1249150122,1856431235,1555081692,3175218132,1996064986,2198950837,2554220882,3999719339,2821834349,766784016,2952996808,2566594879,3210313671,3203337956,3336571891,1034457026,3584528711,2466948901,113926993,3758326383,338241895,168717936,666307205,1188179964,773529912,1546045734,1294757372,1522805485,1396182291,2643833823,1695183700,2343527390,1986661051,1014477480,2177026350,1206759142,2456956037,344077627,2730485921,1290863460,2820302411,3158454273,3259730800,3505952657,3345764771,106217008,3516065817,3606008344,3600352804,1432725776,4094571909,1467031594,275423344,851169720,430227734,3100823752,506948616,1363258195,659060556,3750685593,883997877,3785050280,958139571,3318307427,1322822218,3812723403,1537002063,2003034995,1747873779,3602036899,1955562222,1575990012,2024104815,1125592928,2227730452,2716904306,2361852424,442776044,2428436474,593698344,2756734187,3733110249,3204031479,2999351573,3329325298,3815920427,3391569614,3928383900,3515267271,566280711,3940187606,3454069534,4118630271,4000239992,116418474,1914138554,174292421,2731055270,289380356,3203993006,460393269,320620315,685471733,587496836,852142971,1086792851,1017036298,365543100,1126000580,2618297676,1288033470,3409855158,1501505948,4234509866,1607167915,987167468,1816402316,1246189591],h=new Array(160);function a(){this.init(),this._w=h,n.call(this,128,112)}function c(t,e,r){return r^t&(e^r)}function u(t,e,r){return t&e|r&(t|e)}function l(t,e){return(t>>>28|e<<4)^(e>>>2|t<<30)^(e>>>7|t<<25)}function f(t,e){return(t>>>14|e<<18)^(t>>>18|e<<14)^(e>>>9|t<<23)}function p(t,e){return(t>>>1|e<<31)^(t>>>8|e<<24)^t>>>7}function _(t,e){return(t>>>1|e<<31)^(t>>>8|e<<24)^(t>>>7|e<<25)}function v(t,e){return(t>>>19|e<<13)^(e>>>29|t<<3)^t>>>6}function m(t,e){return(t>>>19|e<<13)^(e>>>29|t<<3)^(t>>>6|e<<26)}function w(t,e){return t>>>0<e>>>0?1:0}i(a,n),a.prototype.init=function(){return this._ah=1779033703,this._bh=3144134277,this._ch=1013904242,this._dh=2773480762,this._eh=1359893119,this._fh=2600822924,this._gh=528734635,this._hh=1541459225,this._al=4089235720,this._bl=2227873595,this._cl=4271175723,this._dl=1595750129,this._el=2917565137,this._fl=725511199,this._gl=4215389547,this._hl=327033209,this},a.prototype._update=function(t){for(var e=this._w,r=0|this._ah,i=0|this._bh,n=0|this._ch,s=0|this._dh,h=0|this._eh,a=0|this._fh,d=0|this._gh,g=0|this._hh,y=0|this._al,b=0|this._bl,E=0|this._cl,I=0|this._dl,B=0|this._el,j=0|this._fl,k=0|this._gl,S=0|this._hl,$=0;$<32;$+=2)e[$]=t.readInt32BE(4*$),e[$+1]=t.readInt32BE(4*$+4);for(;$<160;$+=2){var x=e[$-30],P=e[$-30+1],T=p(x,P),R=_(P,x),U=v(x=e[$-4],P=e[$-4+1]),O=m(P,x),A=e[$-14],N=e[$-14+1],C=e[$-32],M=e[$-32+1],V=R+N|0,z=T+A+w(V,R)|0;z=(z=z+U+w(V=V+O|0,O)|0)+C+w(V=V+M|0,M)|0,e[$]=z,e[$+1]=V}for(var L=0;L<160;L+=2){z=e[L],V=e[L+1];var D=u(r,i,n),q=u(y,b,E),X=l(r,y),G=l(y,r),H=f(h,B),Z=f(B,h),F=o[L],J=o[L+1],K=c(h,a,d),Q=c(B,j,k),W=S+Z|0,Y=g+H+w(W,S)|0;Y=(Y=(Y=Y+K+w(W=W+Q|0,Q)|0)+F+w(W=W+J|0,J)|0)+z+w(W=W+V|0,V)|0;var tt=G+q|0,et=X+D+w(tt,G)|0;g=d,S=k,d=a,k=j,a=h,j=B,h=s+Y+w(B=I+W|0,I)|0,s=n,I=E,n=i,E=b,i=r,b=y,r=Y+et+w(y=W+tt|0,W)|0}this._al=this._al+y|0,this._bl=this._bl+b|0,this._cl=this._cl+E|0,this._dl=this._dl+I|0,this._el=this._el+B|0,this._fl=this._fl+j|0,this._gl=this._gl+k|0,this._hl=this._hl+S|0,this._ah=this._ah+r+w(this._al,y)|0,this._bh=this._bh+i+w(this._bl,b)|0,this._ch=this._ch+n+w(this._cl,E)|0,this._dh=this._dh+s+w(this._dl,I)|0,this._eh=this._eh+h+w(this._el,B)|0,this._fh=this._fh+a+w(this._fl,j)|0,this._gh=this._gh+d+w(this._gl,k)|0,this._hh=this._hh+g+w(this._hl,S)|0},a.prototype._hash=function(){var t=s.allocUnsafe(64);function e(e,r,i){t.writeInt32BE(e,i),t.writeInt32BE(r,i+4)}return e(this._ah,this._al,0),e(this._bh,this._bl,8),e(this._ch,this._cl,16),e(this._dh,this._dl,24),e(this._eh,this._el,32),e(this._fh,this._fl,40),e(this._gh,this._gl,48),e(this._hh,this._hl,56),t},t.exports=a},7106:function(t,e,r){(function(t,e){!function(t,r){"use strict";if(!t.setImmediate){var i,n,s,o,h,a=1,c={},u=!1,l=t.document,f=Object.getPrototypeOf&&Object.getPrototypeOf(t);f=f&&f.setTimeout?f:t,"[object process]"==={}.toString.call(t.process)?i=function(t){e.nextTick((function(){_(t)}))}:!function(){if(t.postMessage&&!t.importScripts){var e=!0,r=t.onmessage;return t.onmessage=function(){e=!1},t.postMessage("","*"),t.onmessage=r,e}}()?t.MessageChannel?((s=new MessageChannel).port1.onmessage=function(t){_(t.data)},i=function(t){s.port2.postMessage(t)}):l&&"onreadystatechange"in l.createElement("script")?(n=l.documentElement,i=function(t){var e=l.createElement("script");e.onreadystatechange=function(){_(t),e.onreadystatechange=null,n.removeChild(e),e=null},n.appendChild(e)}):i=function(t){setTimeout(_,0,t)}:(o="setImmediate$"+Math.random()+"$",h=function(e){e.source===t&&"string"==typeof e.data&&0===e.data.indexOf(o)&&_(+e.data.slice(o.length))},t.addEventListener?t.addEventListener("message",h,!1):t.attachEvent("onmessage",h),i=function(e){t.postMessage(o+e,"*")}),f.setImmediate=function(t){"function"!=typeof t&&(t=new Function(""+t));for(var e=new Array(arguments.length-1),r=0;r<e.length;r++)e[r]=arguments[r+1];var n={callback:t,args:e};return c[a]=n,i(a),a++},f.clearImmediate=p}function p(t){delete c[t]}function _(t){if(u)setTimeout(_,0,t);else{var e=c[t];if(e){u=!0;try{!function(t){var e=t.callback,r=t.args;switch(r.length){case 0:e();break;case 1:e(r[0]);break;case 2:e(r[0],r[1]);break;case 3:e(r[0],r[1],r[2]);break;default:e.apply(void 0,r)}}(e)}finally{p(t),u=!1}}}}}("undefined"==typeof self?void 0===t?this:t:self)}).call(this,r(36),r(43))},7621:function(t,e,r){var i=r(33),n=r(264),s=r(38).Buffer,o=[1518500249,1859775393,-1894007588,-899497514],h=new Array(80);function a(){this.init(),this._w=h,n.call(this,64,56)}function c(t){return t<<30|t>>>2}function u(t,e,r,i){return 0===t?e&r|~e&i:2===t?e&r|e&i|r&i:e^r^i}i(a,n),a.prototype.init=function(){return this._a=1732584193,this._b=4023233417,this._c=2562383102,this._d=271733878,this._e=3285377520,this},a.prototype._update=function(t){for(var e,r=this._w,i=0|this._a,n=0|this._b,s=0|this._c,h=0|this._d,a=0|this._e,l=0;l<16;++l)r[l]=t.readInt32BE(4*l);for(;l<80;++l)r[l]=r[l-3]^r[l-8]^r[l-14]^r[l-16];for(var f=0;f<80;++f){var p=~~(f/20),_=0|((e=i)<<5|e>>>27)+u(p,n,s,h)+a+r[f]+o[p];a=h,h=s,s=c(n),n=i,i=_}this._a=i+this._a|0,this._b=n+this._b|0,this._c=s+this._c|0,this._d=h+this._d|0,this._e=a+this._e|0},a.prototype._hash=function(){var t=s.allocUnsafe(20);return t.writeInt32BE(0|this._a,0),t.writeInt32BE(0|this._b,4),t.writeInt32BE(0|this._c,8),t.writeInt32BE(0|this._d,12),t.writeInt32BE(0|this._e,16),t},t.exports=a},7622:function(t,e,r){var i=r(33),n=r(264),s=r(38).Buffer,o=[1518500249,1859775393,-1894007588,-899497514],h=new Array(80);function a(){this.init(),this._w=h,n.call(this,64,56)}function c(t){return t<<5|t>>>27}function u(t){return t<<30|t>>>2}function l(t,e,r,i){return 0===t?e&r|~e&i:2===t?e&r|e&i|r&i:e^r^i}i(a,n),a.prototype.init=function(){return this._a=1732584193,this._b=4023233417,this._c=2562383102,this._d=271733878,this._e=3285377520,this},a.prototype._update=function(t){for(var e,r=this._w,i=0|this._a,n=0|this._b,s=0|this._c,h=0|this._d,a=0|this._e,f=0;f<16;++f)r[f]=t.readInt32BE(4*f);for(;f<80;++f)r[f]=(e=r[f-3]^r[f-8]^r[f-14]^r[f-16])<<1|e>>>31;for(var p=0;p<80;++p){var _=~~(p/20),v=c(i)+l(_,n,s,h)+a+r[p]+o[_]|0;a=h,h=s,s=u(n),n=i,i=v}this._a=i+this._a|0,this._b=n+this._b|0,this._c=s+this._c|0,this._d=h+this._d|0,this._e=a+this._e|0},a.prototype._hash=function(){var t=s.allocUnsafe(20);return t.writeInt32BE(0|this._a,0),t.writeInt32BE(0|this._b,4),t.writeInt32BE(0|this._c,8),t.writeInt32BE(0|this._d,12),t.writeInt32BE(0|this._e,16),t},t.exports=a},7623:function(t,e,r){var i=r(33),n=r(6614),s=r(264),o=r(38).Buffer,h=new Array(64);function a(){this.init(),this._w=h,s.call(this,64,56)}i(a,n),a.prototype.init=function(){return this._a=3238371032,this._b=914150663,this._c=812702999,this._d=4144912697,this._e=4290775857,this._f=1750603025,this._g=1694076839,this._h=3204075428,this},a.prototype._hash=function(){var t=o.allocUnsafe(28);return t.writeInt32BE(this._a,0),t.writeInt32BE(this._b,4),t.writeInt32BE(this._c,8),t.writeInt32BE(this._d,12),t.writeInt32BE(this._e,16),t.writeInt32BE(this._f,20),t.writeInt32BE(this._g,24),t},t.exports=a},7624:function(t,e,r){var i=r(33),n=r(6615),s=r(264),o=r(38).Buffer,h=new Array(160);function a(){this.init(),this._w=h,s.call(this,128,112)}i(a,n),a.prototype.init=function(){return this._ah=3418070365,this._bh=1654270250,this._ch=2438529370,this._dh=355462360,this._eh=1731405415,this._fh=2394180231,this._gh=3675008525,this._hh=1203062813,this._al=3238371032,this._bl=914150663,this._cl=812702999,this._dl=4144912697,this._el=4290775857,this._fl=1750603025,this._gl=1694076839,this._hl=3204075428,this},a.prototype._hash=function(){var t=o.allocUnsafe(48);function e(e,r,i){t.writeInt32BE(e,i),t.writeInt32BE(r,i+4)}return e(this._ah,this._al,0),e(this._bh,this._bl,8),e(this._ch,this._cl,16),e(this._dh,this._dl,24),e(this._eh,this._el,32),e(this._fh,this._fl,40),t},t.exports=a},7794:function(t,e,r){(function(r){var i;e=t.exports=Z,i="object"==typeof r&&Object({NODE_ENV:"production",NODE_PATH:"",PUBLIC_URL:"."})&&Object({NODE_ENV:"production",NODE_PATH:"",PUBLIC_URL:"."}).NODE_DEBUG&&/\bsemver\b/i.test(Object({NODE_ENV:"production",NODE_PATH:"",PUBLIC_URL:"."}).NODE_DEBUG)?function(){var t=Array.prototype.slice.call(arguments,0);t.unshift("SEMVER"),console.log.apply(console,t)}:function(){},e.SEMVER_SPEC_VERSION="2.0.0";var n=Number.MAX_SAFE_INTEGER||9007199254740991,s=e.re=[],o=e.src=[],h=0,a=h++;o[a]="0|[1-9]\\d*";var c=h++;o[c]="[0-9]+";var u=h++;o[u]="\\d*[a-zA-Z-][a-zA-Z0-9-]*";var l=h++;o[l]="("+o[a]+")\\.("+o[a]+")\\.("+o[a]+")";var f=h++;o[f]="("+o[c]+")\\.("+o[c]+")\\.("+o[c]+")";var p=h++;o[p]="(?:"+o[a]+"|"+o[u]+")";var _=h++;o[_]="(?:"+o[c]+"|"+o[u]+")";var v=h++;o[v]="(?:-("+o[p]+"(?:\\."+o[p]+")*))";var m=h++;o[m]="(?:-?("+o[_]+"(?:\\."+o[_]+")*))";var w=h++;o[w]="[0-9A-Za-z-]+";var d=h++;o[d]="(?:\\+("+o[w]+"(?:\\."+o[w]+")*))";var g=h++,y="v?"+o[l]+o[v]+"?"+o[d]+"?";o[g]="^"+y+"$";var b="[v=\\s]*"+o[f]+o[m]+"?"+o[d]+"?",E=h++;o[E]="^"+b+"$";var I=h++;o[I]="((?:<|>)?=?)";var B=h++;o[B]=o[c]+"|x|X|\\*";var j=h++;o[j]=o[a]+"|x|X|\\*";var k=h++;o[k]="[v=\\s]*("+o[j]+")(?:\\.("+o[j]+")(?:\\.("+o[j]+")(?:"+o[v]+")?"+o[d]+"?)?)?";var S=h++;o[S]="[v=\\s]*("+o[B]+")(?:\\.("+o[B]+")(?:\\.("+o[B]+")(?:"+o[m]+")?"+o[d]+"?)?)?";var $=h++;o[$]="^"+o[I]+"\\s*"+o[k]+"$";var x=h++;o[x]="^"+o[I]+"\\s*"+o[S]+"$";var P=h++;o[P]="(?:^|[^\\d])(\\d{1,16})(?:\\.(\\d{1,16}))?(?:\\.(\\d{1,16}))?(?:$|[^\\d])";var T=h++;o[T]="(?:~>?)";var R=h++;o[R]="(\\s*)"+o[T]+"\\s+",s[R]=new RegExp(o[R],"g");var U=h++;o[U]="^"+o[T]+o[k]+"$";var O=h++;o[O]="^"+o[T]+o[S]+"$";var A=h++;o[A]="(?:\\^)";var N=h++;o[N]="(\\s*)"+o[A]+"\\s+",s[N]=new RegExp(o[N],"g");var C=h++;o[C]="^"+o[A]+o[k]+"$";var M=h++;o[M]="^"+o[A]+o[S]+"$";var V=h++;o[V]="^"+o[I]+"\\s*("+b+")$|^$";var z=h++;o[z]="^"+o[I]+"\\s*("+y+")$|^$";var L=h++;o[L]="(\\s*)"+o[I]+"\\s*("+b+"|"+o[k]+")",s[L]=new RegExp(o[L],"g");var D=h++;o[D]="^\\s*("+o[k]+")\\s+-\\s+("+o[k]+")\\s*$";var q=h++;o[q]="^\\s*("+o[S]+")\\s+-\\s+("+o[S]+")\\s*$";var X=h++;o[X]="(<|>)?=?\\s*\\*";for(var G=0;G<35;G++)i(G,o[G]),s[G]||(s[G]=new RegExp(o[G]));function H(t,e){if(e&&"object"==typeof e||(e={loose:!!e,includePrerelease:!1}),t instanceof Z)return t;if("string"!=typeof t)return null;if(t.length>256)return null;if(!(e.loose?s[E]:s[g]).test(t))return null;try{return new Z(t,e)}catch(t){return null}}function Z(t,e){if(e&&"object"==typeof e||(e={loose:!!e,includePrerelease:!1}),t instanceof Z){if(t.loose===e.loose)return t;t=t.version}else if("string"!=typeof t)throw new TypeError("Invalid Version: "+t);if(t.length>256)throw new TypeError("version is longer than 256 characters");if(!(this instanceof Z))return new Z(t,e);i("SemVer",t,e),this.options=e,this.loose=!!e.loose;var r=t.trim().match(e.loose?s[E]:s[g]);if(!r)throw new TypeError("Invalid Version: "+t);if(this.raw=t,this.major=+r[1],this.minor=+r[2],this.patch=+r[3],this.major>n||this.major<0)throw new TypeError("Invalid major version");if(this.minor>n||this.minor<0)throw new TypeError("Invalid minor version");if(this.patch>n||this.patch<0)throw new TypeError("Invalid patch version");r[4]?this.prerelease=r[4].split(".").map((function(t){if(/^[0-9]+$/.test(t)){var e=+t;if(e>=0&&e<n)return e}return t})):this.prerelease=[],this.build=r[5]?r[5].split("."):[],this.format()}e.parse=H,e.valid=function(t,e){var r=H(t,e);return r?r.version:null},e.clean=function(t,e){var r=H(t.trim().replace(/^[=v]+/,""),e);return r?r.version:null},e.SemVer=Z,Z.prototype.format=function(){return this.version=this.major+"."+this.minor+"."+this.patch,this.prerelease.length&&(this.version+="-"+this.prerelease.join(".")),this.version},Z.prototype.toString=function(){return this.version},Z.prototype.compare=function(t){return i("SemVer.compare",this.version,this.options,t),t instanceof Z||(t=new Z(t,this.options)),this.compareMain(t)||this.comparePre(t)},Z.prototype.compareMain=function(t){return t instanceof Z||(t=new Z(t,this.options)),J(this.major,t.major)||J(this.minor,t.minor)||J(this.patch,t.patch)},Z.prototype.comparePre=function(t){if(t instanceof Z||(t=new Z(t,this.options)),this.prerelease.length&&!t.prerelease.length)return-1;if(!this.prerelease.length&&t.prerelease.length)return 1;if(!this.prerelease.length&&!t.prerelease.length)return 0;var e=0;do{var r=this.prerelease[e],n=t.prerelease[e];if(i("prerelease compare",e,r,n),void 0===r&&void 0===n)return 0;if(void 0===n)return 1;if(void 0===r)return-1;if(r!==n)return J(r,n)}while(++e)},Z.prototype.inc=function(t,e){switch(t){case"premajor":this.prerelease.length=0,this.patch=0,this.minor=0,this.major++,this.inc("pre",e);break;case"preminor":this.prerelease.length=0,this.patch=0,this.minor++,this.inc("pre",e);break;case"prepatch":this.prerelease.length=0,this.inc("patch",e),this.inc("pre",e);break;case"prerelease":0===this.prerelease.length&&this.inc("patch",e),this.inc("pre",e);break;case"major":0===this.minor&&0===this.patch&&0!==this.prerelease.length||this.major++,this.minor=0,this.patch=0,this.prerelease=[];break;case"minor":0===this.patch&&0!==this.prerelease.length||this.minor++,this.patch=0,this.prerelease=[];break;case"patch":0===this.prerelease.length&&this.patch++,this.prerelease=[];break;case"pre":if(0===this.prerelease.length)this.prerelease=[0];else{for(var r=this.prerelease.length;--r>=0;)"number"==typeof this.prerelease[r]&&(this.prerelease[r]++,r=-2);-1===r&&this.prerelease.push(0)}e&&(this.prerelease[0]===e?isNaN(this.prerelease[1])&&(this.prerelease=[e,0]):this.prerelease=[e,0]);break;default:throw new Error("invalid increment argument: "+t)}return this.format(),this.raw=this.version,this},e.inc=function(t,e,r,i){"string"==typeof r&&(i=r,r=void 0);try{return new Z(t,r).inc(e,i).version}catch(t){return null}},e.diff=function(t,e){if(Y(t,e))return null;var r=H(t),i=H(e),n="";if(r.prerelease.length||i.prerelease.length){n="pre";var s="prerelease"}for(var o in r)if(("major"===o||"minor"===o||"patch"===o)&&r[o]!==i[o])return n+o;return s},e.compareIdentifiers=J;var F=/^[0-9]+$/;function J(t,e){var r=F.test(t),i=F.test(e);return r&&i&&(t=+t,e=+e),t===e?0:r&&!i?-1:i&&!r?1:t<e?-1:1}function K(t,e,r){return new Z(t,r).compare(new Z(e,r))}function Q(t,e,r){return K(t,e,r)>0}function W(t,e,r){return K(t,e,r)<0}function Y(t,e,r){return 0===K(t,e,r)}function tt(t,e,r){return 0!==K(t,e,r)}function et(t,e,r){return K(t,e,r)>=0}function rt(t,e,r){return K(t,e,r)<=0}function it(t,e,r,i){switch(e){case"===":return"object"==typeof t&&(t=t.version),"object"==typeof r&&(r=r.version),t===r;case"!==":return"object"==typeof t&&(t=t.version),"object"==typeof r&&(r=r.version),t!==r;case"":case"=":case"==":return Y(t,r,i);case"!=":return tt(t,r,i);case">":return Q(t,r,i);case">=":return et(t,r,i);case"<":return W(t,r,i);case"<=":return rt(t,r,i);default:throw new TypeError("Invalid operator: "+e)}}function nt(t,e){if(e&&"object"==typeof e||(e={loose:!!e,includePrerelease:!1}),t instanceof nt){if(t.loose===!!e.loose)return t;t=t.value}if(!(this instanceof nt))return new nt(t,e);i("comparator",t,e),this.options=e,this.loose=!!e.loose,this.parse(t),this.semver===st?this.value="":this.value=this.operator+this.semver.version,i("comp",this)}e.rcompareIdentifiers=function(t,e){return J(e,t)},e.major=function(t,e){return new Z(t,e).major},e.minor=function(t,e){return new Z(t,e).minor},e.patch=function(t,e){return new Z(t,e).patch},e.compare=K,e.compareLoose=function(t,e){return K(t,e,!0)},e.rcompare=function(t,e,r){return K(e,t,r)},e.sort=function(t,r){return t.sort((function(t,i){return e.compare(t,i,r)}))},e.rsort=function(t,r){return t.sort((function(t,i){return e.rcompare(t,i,r)}))},e.gt=Q,e.lt=W,e.eq=Y,e.neq=tt,e.gte=et,e.lte=rt,e.cmp=it,e.Comparator=nt;var st={};function ot(t,e){if(e&&"object"==typeof e||(e={loose:!!e,includePrerelease:!1}),t instanceof ot)return t.loose===!!e.loose&&t.includePrerelease===!!e.includePrerelease?t:new ot(t.raw,e);if(t instanceof nt)return new ot(t.value,e);if(!(this instanceof ot))return new ot(t,e);if(this.options=e,this.loose=!!e.loose,this.includePrerelease=!!e.includePrerelease,this.raw=t,this.set=t.split(/\s*\|\|\s*/).map((function(t){return this.parseRange(t.trim())}),this).filter((function(t){return t.length})),!this.set.length)throw new TypeError("Invalid SemVer Range: "+t);this.format()}function ht(t){return!t||"x"===t.toLowerCase()||"*"===t}function at(t,e,r,i,n,s,o,h,a,c,u,l,f){return((e=ht(r)?"":ht(i)?">="+r+".0.0":ht(n)?">="+r+"."+i+".0":">="+e)+" "+(h=ht(a)?"":ht(c)?"<"+(+a+1)+".0.0":ht(u)?"<"+a+"."+(+c+1)+".0":l?"<="+a+"."+c+"."+u+"-"+l:"<="+h)).trim()}function ct(t,e,r){for(var n=0;n<t.length;n++)if(!t[n].test(e))return!1;if(e.prerelease.length&&!r.includePrerelease){for(n=0;n<t.length;n++)if(i(t[n].semver),t[n].semver!==st&&t[n].semver.prerelease.length>0){var s=t[n].semver;if(s.major===e.major&&s.minor===e.minor&&s.patch===e.patch)return!0}return!1}return!0}function ut(t,e,r){try{e=new ot(e,r)}catch(t){return!1}return e.test(t)}function lt(t,e,r,i){var n,s,o,h,a;switch(t=new Z(t,i),e=new ot(e,i),r){case">":n=Q,s=rt,o=W,h=">",a=">=";break;case"<":n=W,s=et,o=Q,h="<",a="<=";break;default:throw new TypeError('Must provide a hilo val of "<" or ">"')}if(ut(t,e,i))return!1;for(var c=0;c<e.set.length;++c){var u=e.set[c],l=null,f=null;if(u.forEach((function(t){t.semver===st&&(t=new nt(">=0.0.0")),l=l||t,f=f||t,n(t.semver,l.semver,i)?l=t:o(t.semver,f.semver,i)&&(f=t)})),l.operator===h||l.operator===a)return!1;if((!f.operator||f.operator===h)&&s(t,f.semver))return!1;if(f.operator===a&&o(t,f.semver))return!1}return!0}nt.prototype.parse=function(t){var e=this.options.loose?s[V]:s[z],r=t.match(e);if(!r)throw new TypeError("Invalid comparator: "+t);this.operator=r[1],"="===this.operator&&(this.operator=""),r[2]?this.semver=new Z(r[2],this.options.loose):this.semver=st},nt.prototype.toString=function(){return this.value},nt.prototype.test=function(t){return i("Comparator.test",t,this.options.loose),this.semver===st||("string"==typeof t&&(t=new Z(t,this.options)),it(t,this.operator,this.semver,this.options))},nt.prototype.intersects=function(t,e){if(!(t instanceof nt))throw new TypeError("a Comparator is required");var r;if(e&&"object"==typeof e||(e={loose:!!e,includePrerelease:!1}),""===this.operator)return r=new ot(t.value,e),ut(this.value,r,e);if(""===t.operator)return r=new ot(this.value,e),ut(t.semver,r,e);var i=!(">="!==this.operator&&">"!==this.operator||">="!==t.operator&&">"!==t.operator),n=!("<="!==this.operator&&"<"!==this.operator||"<="!==t.operator&&"<"!==t.operator),s=this.semver.version===t.semver.version,o=!(">="!==this.operator&&"<="!==this.operator||">="!==t.operator&&"<="!==t.operator),h=it(this.semver,"<",t.semver,e)&&(">="===this.operator||">"===this.operator)&&("<="===t.operator||"<"===t.operator),a=it(this.semver,">",t.semver,e)&&("<="===this.operator||"<"===this.operator)&&(">="===t.operator||">"===t.operator);return i||n||s&&o||h||a},e.Range=ot,ot.prototype.format=function(){return this.range=this.set.map((function(t){return t.join(" ").trim()})).join("||").trim(),this.range},ot.prototype.toString=function(){return this.range},ot.prototype.parseRange=function(t){var e=this.options.loose;t=t.trim();var r=e?s[q]:s[D];t=t.replace(r,at),i("hyphen replace",t),t=t.replace(s[L],"$1$2$3"),i("comparator trim",t,s[L]),t=(t=(t=t.replace(s[R],"$1~")).replace(s[N],"$1^")).split(/\s+/).join(" ");var n=e?s[V]:s[z],o=t.split(" ").map((function(t){return function(t,e){return i("comp",t,e),t=function(t,e){return t.trim().split(/\s+/).map((function(t){return function(t,e){i("caret",t,e);var r=e.loose?s[M]:s[C];return t.replace(r,(function(e,r,n,s,o){var h;return i("caret",t,e,r,n,s,o),ht(r)?h="":ht(n)?h=">="+r+".0.0 <"+(+r+1)+".0.0":ht(s)?h="0"===r?">="+r+"."+n+".0 <"+r+"."+(+n+1)+".0":">="+r+"."+n+".0 <"+(+r+1)+".0.0":o?(i("replaceCaret pr",o),h="0"===r?"0"===n?">="+r+"."+n+"."+s+"-"+o+" <"+r+"."+n+"."+(+s+1):">="+r+"."+n+"."+s+"-"+o+" <"+r+"."+(+n+1)+".0":">="+r+"."+n+"."+s+"-"+o+" <"+(+r+1)+".0.0"):(i("no pr"),h="0"===r?"0"===n?">="+r+"."+n+"."+s+" <"+r+"."+n+"."+(+s+1):">="+r+"."+n+"."+s+" <"+r+"."+(+n+1)+".0":">="+r+"."+n+"."+s+" <"+(+r+1)+".0.0"),i("caret return",h),h}))}(t,e)})).join(" ")}(t,e),i("caret",t),t=function(t,e){return t.trim().split(/\s+/).map((function(t){return function(t,e){var r=e.loose?s[O]:s[U];return t.replace(r,(function(e,r,n,s,o){var h;return i("tilde",t,e,r,n,s,o),ht(r)?h="":ht(n)?h=">="+r+".0.0 <"+(+r+1)+".0.0":ht(s)?h=">="+r+"."+n+".0 <"+r+"."+(+n+1)+".0":o?(i("replaceTilde pr",o),h=">="+r+"."+n+"."+s+"-"+o+" <"+r+"."+(+n+1)+".0"):h=">="+r+"."+n+"."+s+" <"+r+"."+(+n+1)+".0",i("tilde return",h),h}))}(t,e)})).join(" ")}(t,e),i("tildes",t),t=function(t,e){return i("replaceXRanges",t,e),t.split(/\s+/).map((function(t){return function(t,e){t=t.trim();var r=e.loose?s[x]:s[$];return t.replace(r,(function(e,r,n,s,o,h){i("xRange",t,e,r,n,s,o,h);var a=ht(n),c=a||ht(s),u=c||ht(o);return"="===r&&u&&(r=""),a?e=">"===r||"<"===r?"<0.0.0":"*":r&&u?(c&&(s=0),o=0,">"===r?(r=">=",c?(n=+n+1,s=0,o=0):(s=+s+1,o=0)):"<="===r&&(r="<",c?n=+n+1:s=+s+1),e=r+n+"."+s+"."+o):c?e=">="+n+".0.0 <"+(+n+1)+".0.0":u&&(e=">="+n+"."+s+".0 <"+n+"."+(+s+1)+".0"),i("xRange return",e),e}))}(t,e)})).join(" ")}(t,e),i("xrange",t),t=function(t,e){return i("replaceStars",t,e),t.trim().replace(s[X],"")}(t,e),i("stars",t),t}(t,this.options)}),this).join(" ").split(/\s+/);return this.options.loose&&(o=o.filter((function(t){return!!t.match(n)}))),o=o.map((function(t){return new nt(t,this.options)}),this)},ot.prototype.intersects=function(t,e){if(!(t instanceof ot))throw new TypeError("a Range is required");return this.set.some((function(r){return r.every((function(r){return t.set.some((function(t){return t.every((function(t){return r.intersects(t,e)}))}))}))}))},e.toComparators=function(t,e){return new ot(t,e).set.map((function(t){return t.map((function(t){return t.value})).join(" ").trim().split(" ")}))},ot.prototype.test=function(t){if(!t)return!1;"string"==typeof t&&(t=new Z(t,this.options));for(var e=0;e<this.set.length;e++)if(ct(this.set[e],t,this.options))return!0;return!1},e.satisfies=ut,e.maxSatisfying=function(t,e,r){var i=null,n=null;try{var s=new ot(e,r)}catch(t){return null}return t.forEach((function(t){s.test(t)&&(i&&-1!==n.compare(t)||(n=new Z(i=t,r)))})),i},e.minSatisfying=function(t,e,r){var i=null,n=null;try{var s=new ot(e,r)}catch(t){return null}return t.forEach((function(t){s.test(t)&&(i&&1!==n.compare(t)||(n=new Z(i=t,r)))})),i},e.minVersion=function(t,e){t=new ot(t,e);var r=new Z("0.0.0");if(t.test(r))return r;if(r=new Z("0.0.0-0"),t.test(r))return r;r=null;for(var i=0;i<t.set.length;++i){t.set[i].forEach((function(t){var e=new Z(t.semver.version);switch(t.operator){case">":0===e.prerelease.length?e.patch++:e.prerelease.push(0),e.raw=e.format();case"":case">=":r&&!Q(r,e)||(r=e);break;case"<":case"<=":break;default:throw new Error("Unexpected operation: "+t.operator)}}))}if(r&&t.test(r))return r;return null},e.validRange=function(t,e){try{return new ot(t,e).range||"*"}catch(t){return null}},e.ltr=function(t,e,r){return lt(t,e,"<",r)},e.gtr=function(t,e,r){return lt(t,e,">",r)},e.outside=lt,e.prerelease=function(t,e){var r=H(t,e);return r&&r.prerelease.length?r.prerelease:null},e.intersects=function(t,e,r){return t=new ot(t,r),e=new ot(e,r),t.intersects(e)},e.coerce=function(t){if(t instanceof Z)return t;if("string"!=typeof t)return null;var e=t.match(s[P]);if(null==e)return null;return H(e[1]+"."+(e[2]||"0")+"."+(e[3]||"0"))}}).call(this,r(43))}}]);