class StringNumber{constructor(a){this.n=StringNumber.CleanNumberString((a||"0").toString())}static zero(){return new StringNumber("0")}static CleanNumberString(a){if("number"==typeof a)return a.toString();if("string"==typeof a)return""===(a=a.split(/[^0-9\.\-]/g).join(""))?"0":a;throw new TypeError("[StringNumber.CleanNumberString] Expected parameter n to be a string.")}static ValidNumberString(a){if("string"==typeof a)return a===a.match(/-?[0-9]+(\.[0-9]+)?/)[0];throw new TypeError("[StringNumber.ValidNumberString] Expected parameter n to be a string.")}static DigitToInt(a){switch(a.toString().trim()){case"0":return 0;case"1":return 1;case"2":return 2;case"3":return 3;case"4":return 4;case"5":return 5;case"6":return 6;case"7":return 7;case"8":return 8;case"9":return 9}throw new Error("[StringNumber.DigitToInt] An error occurred converting a digit to an integer.")}toNumber(){return Number(this.n)}toString(){return StringNumber.CleanNumberString(this.n)}trim(){if(Array.isArray(this.n)){this.n=this.n.flatMap(a=>""===a||" "===a?[]:[a]);let a=!1;for(this.n.includes("-")&&(a=!0,this.n=this.n.join("").replace("-","").split(""));"0"===this.n[0]&&"."!==this.n[1];)this.n.splice(0,1);for(;"0"===this.n[this.n.length-1];)this.n.splice(this.n.length-1,1);"."===this.n[this.n.length-1]&&this.n.splice(this.n.length-1,1),this.n=(a?"-":"")+this.n.join("")}else if("string"==typeof this.n){this.n=this.n.replace(/\s+/g,"");let b=!1;for(this.n.includes("-")&&(b=!0,this.n=this.n.replace("-","")),this.n=this.n.split("");"0"===this.n[0]&&"."!==this.n[1];)this.n.splice(0,1);for(;this.n.includes(".")&&("0"===this.n[this.n.length-1]||"."===this.n[this.n.length-1]);)this.n.splice(this.n.length-1,1);this.n=(b?"-":"")+this.n.join("")}else if("number"==typeof this.n)this.n=this.n.toString();else throw new Error("[StringNumber.prototype.trim] A StringNumber was likely manipulated externally causing an internal error.");return""===this.n&&(this.n="0"),this}equalTo(a){if(("string"==typeof a||"number"==typeof a)&&(a=new StringNumber(a)),a instanceof StringNumber)return this.trim().n===a.trim().n;throw new TypeError("[StringNumber.prototype.equalTo] Expected parameter other to be a StringNumber, String or Number.")}notEqualTo(a){if(("string"==typeof a||"number"==typeof a)&&(a=new StringNumber(a)),a instanceof StringNumber)return this.trim().n!==a.trim().n;throw new TypeError("[StringNumber.prototype.notEqualTo] Expected parameter other to be a StringNumber, String or Number.")}greaterThan(b){if(("string"==typeof b||"number"==typeof b)&&(b=new StringNumber(b)),b instanceof StringNumber){this.n=this.n.split("");let _=b.n.split("");if(this.n.includes(".")||_.includes(".")){for(this.n.includes(".")||this.n.push("."),_.includes(".")||_.push(".");this.n.length-this.n.indexOf(".")<_.length-_.indexOf(".");)this.n.push("0");for(;this.n.length-this.n.indexOf(".")>_.length-_.indexOf(".");)_.push("0")}for(;this.n.length>_.length;)_.splice(0,0,"0");for(;this.n.length<_.length;)this.n.splice(0,0,"0");if(this.n=this.n.join(""),_=_.join(""),this.n.includes("-")&&!_.includes("-"))return!1;if(_.includes("-")&&!this.includes("-"))return!0;if(this.n.includes("-")&&!_.includes("-")){this.n=this.n.replace("-","");let _=this.lessThan(_.replace("-"),"");return this.n="-"+this.n,_}let c=Math.min(this.n.length,_.length);for(let a=0;a<c;a++)if("."!==_[a]){if(StringNumber.DigitToInt(this.n[a])>StringNumber.DigitToInt(_[a]))return this.trim(),!0;if(StringNumber.DigitToInt(this.n[a])<StringNumber.DigitToInt(_[a]))return this.trim(),!1}return this.trim(),this.n.length>_.length}throw new TypeError("[StringNumber.prototype.greaterThan] Expected parameter other to be a StringNumber, String or Number.")}greaterThanOrEqualTo(a){return this.equalTo(a)||this.greaterThan(a)}lessThan(b){if(("string"==typeof b||"number"==typeof b)&&(b=new StringNumber(b)),b instanceof StringNumber){this.n=this.n.split("");let _=b.n.split("");if(this.n.includes(".")||_.includes(".")){for(this.n.includes(".")||this.n.push("."),_.includes(".")||_.push(".");this.n.length-this.n.indexOf(".")<_.length-_.indexOf(".");)this.n.push("0");for(;this.n.length-this.n.indexOf(".")>_.length-_.indexOf(".");)_.push("0")}for(;this.n.length>_.length;)_.splice(0,0,"0");for(;this.n.length<_.length;)this.n.splice(0,0,"0");if(this.n=this.n.join(""),_=_.join(""),this.n.includes("-")&&!_.includes("-"))return!0;if(_.includes("-")&&this.includes("-"))return!1;if(this.n.includes("-")&&_.includes("-")){this.n=this.n.replace("-","");let _=this.greaterThan(_.replace("-"),"");return this.n="-"+this.n,_}let c=Math.min(this.n.length,_.length);for(let a=0;a<c;a++)if("."!==_[a]){if(StringNumber.DigitToInt(this.n[a])<StringNumber.DigitToInt(_[a]))return this.trim(),!0;if(StringNumber.DigitToInt(this.n[a])>StringNumber.DigitToInt(_[a]))return this.trim(),!1}return this.trim(),this.n.length<_.length}throw new TypeError("[StringNumber.prototype.lessThan] Expected parameter other to be a StringNumber, String or Number.")}lessThanOrEqualTo(a){return this.equalTo(a)||this.lessThan(a)}round(){return this.n.includes(".")?StringNumber.DigitToInt(this.n[this.n.indexOf(".")+1])>4?this.ceil():this.floor():this}floor(){return this.n.includes(".")&&(this.n=this.n.substr(0,this.n.indexOf("."))),this}ceil(){return this.n.includes(".")&&(this.n=this.n.substr(0,this.n.indexOf(".")),this.add(1)),this}add(a){if(("string"==typeof a||"number"==typeof a)&&(a=new StringNumber(a)),a instanceof StringNumber){if(0===a.trim().n)return this;if(0===this.trim().n)return this.n=a.n,this;let e=!1;if(a.n.includes("-"))return this.subtract(a.n.replace("-","")),this;if(this.n.includes("-")){let _=a.n;return a.n=this.n.replace("-",""),this.n=_,this.subtract(a),a.n=_,this}this.n="0"+this.n,this.n=this.n.split("");let _=a.n.split("");if(this.n.includes(".")||_.includes(".")){for(this.n.includes(".")||this.n.push("."),_.includes(".")||_.push(".");this.n.length-this.n.indexOf(".")<_.length-_.indexOf(".");)this.n.push("0");for(;this.n.length-this.n.indexOf(".")>_.length-_.indexOf(".");)_.push("0")}for(;this.n.length>_.length;)_.splice(0,0,"0");for(;this.n.length<_.length;)this.n.splice(0,0,"0");let c,d=0;for(let b=0;b<_.length;b++)if("."!==_[_.length-b-1]){for(c=StringNumber.DigitToInt(this.n[this.n.length-b-1])+StringNumber.DigitToInt(_[_.length-b-1]),c+=d,d=0;c>9;)d++,c-=10;this.n[this.n.length-b-1]=c.toString()}return d>0&&this.n.splice(0,0,d.toString()),this.n=this.n.join(""),e&&(this.n="-"+this.n),this.trim()}throw new TypeError("[StringNumber.prototype.add] Expected parameter other to be a StringNumber, String or Number.")}subtract(a){if(("string"==typeof a||"number"==typeof a)&&(a=new StringNumber(a)),a instanceof StringNumber){if(a.n.includes("-"))return this.add(a.n.replace("-","")),this;if(this.n.includes("-"))return this.n=this.n.replace("-",""),this.add(a),this.n="-"+this.n,this;if(this.equalTo(a))return this.n="0",this;this.n="0"+this.n;let e=!1,_;if(this.lessThan(a)?(e=!0,_=this.n.split(""),this.n=a.n.split("")):(this.n=this.n.split(""),_=a.n.split("")),this.n.includes(".")||_.includes(".")){for(this.n.includes(".")||this.n.push("."),_.includes(".")||_.push(".");this.n.length-this.n.indexOf(".")<_.length-_.indexOf(".");)this.n.push("0");for(;this.n.length-this.n.indexOf(".")>_.length-_.indexOf(".");)_.push("0")}for(;this.n.length>_.length;)_.splice(0,0,"0");for(;this.n.length<_.length;)this.n.splice(0,0,"0");this.n=this.n.map(a=>"."===a?".":StringNumber.DigitToInt(a)),_=_.map(a=>"."===a?".":StringNumber.DigitToInt(a));let f,d;for(let c=0;c<_.length;c++)if("."!==(d=_[_.length-c-1])){if(this.n[this.n.length-c-1]<d){let b=c+1;for(;0===this.n[this.n.length-b-1]||"."===this.n[this.n.length-b-1];)b++;for(;b>c;){if("."===this.n[this.n.length-b-1]){b--;continue}this.n[this.n.length-b-1]-=1,"."===this.n[this.n.length-b]?this.n[this.n.length-b+1]+=10:this.n[this.n.length-b]+=10,b--}}f=this.n[this.n.length-c-1]-d,this.n[this.n.length-c-1]=f}return this.n=this.n.map(a=>a.toString()).join(""),this.n=(e?"-":"")+this.n,this.trim()}throw new TypeError("[StringNumber.prototype.subtract] Expected parameter other to be a StringNumber, String or Number.")}multiply(a){if(("string"==typeof a||"number"==typeof a)&&(a=new StringNumber(a)),a instanceof StringNumber){if("0"===this.trim().n||"0"===a.trim().n)return this.n="0",this;let e=!1,_;this.n.includes("-")&&(e=!e,this.n=this.n.replace("-","")),a.n.includes("-")&&(e=!e,a.n=a.n.replace("-","")),this.lessThan(a)?(_=this.n,this.n=a.n):_=a.n;let f=0;this.n.includes(".")&&(f+=this.n.split(".")[1].length,this.n=this.n.replace(".","")),_.includes(".")&&(f+=_.split(".")[1].length,_=_.replace(".","")),_=_.split("").map(Number),this.n=this.n.split("").map(Number);let b=this.n.slice(),g=[],c=0;for(let h=0;h<_.length;h++){this.n=b.slice();for(let d=0;d<b.length;d++)for(this.n[b.length-d-1]*=_[_.length-h-1],this.n[b.length-d-1]+=c,c=0;this.n[b.length-d-1]>9;)this.n[b.length-d-1]-=10,c++;c>0&&(this.n.splice(0,0,c),c=0);for(let j=0;j<h;j++)this.n.push(0);g.push(this.n.map(a=>a.toString()).join(""))}this.n=g[0];for(let i=1;i<g.length;i++)this.add(g[i]);return f>0&&(this.n=this.n.split(""),this.n.splice(this.n.length-f,0,"."),this.n=this.n.join("")),e&&(this.n="-"+this.n),this.trim(),this}throw new TypeError("[StringNumber.prototype.multiply] Expected parameter other to be a StringNumber, String or Number.")}divide(a,g=10){if(("string"==typeof a||"number"==typeof a)&&(a=new StringNumber(a)),a instanceof StringNumber){if(g<0&&(g=0),"0"===this.trim().n)return this;if("0"===a.trim().n)throw new Error("Cannot divide by 0.");let e=!1,_;this.n.includes("-")&&(e=!e,this.n=this.n.replace("-","")),a.n.includes("-")&&(e=!e,a.n=a.n.replace("-","")),this.n=this.n.split(""),_=a.n;let f="",c,b,d="0";for(let h=0;h<this.n.length;h++){if("."===this.n[h]){f+=".";continue}for(c=0,b=new StringNumber(d+this.n[h]);b.greaterThanOrEqualTo(_);)b.subtract(_),c++;d=b.n,f+=c.toString()}if("0"!==d)for(this.n.ibcludes(".")||(this.n.push("."),f+=".");g>0;){for(c=0,b=new StringNumber(d+"0");b.greaterThanOrEqualTo(_);)b.subtract(_),c++;if(d=b.n,f+=c.toString(),g--,"0"===d)break}return this.n=(e?"-":"")+f,this.trim(),this}throw new TypeError("[StringNumber.prototype.divide] Expected parameter other to be a StringNumber, String or Number.")}modulus(a){if(("string"==typeof a||"number"==typeof a)&&(a=new StringNumber(a)),a instanceof StringNumber){for(;this.greaterThanOrEqualTo(a);)this.subtract(a);return this.trim(),this}throw new TypeError("[StringNumber.prototype.modulus] Expected parameter other to be a StringNumber, String or Number.")}addDigit(a){if(("string"==typeof a||"number"==typeof a)&&(a=new StringNumber(a)),a instanceof StringNumber)return this.n=StringNumber.CleanNumberString(this.n+a.n),this;throw new TypeError("[StringNumber.prototype.addDigit] Expected parameter digit to be a StringNumber, String or Number")}removeLastDigit(){return this.n=this.n.substr(0,this.n.length-1),""===this.n&&(this.n="0"),this}removeFirstDigit(){return this.n=this.n.substr(1),""===this.trim().n&&(this.n="0"),this}}
