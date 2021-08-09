class Maths{static parseInt(e){if("number"==typeof e)return e;if("string"!=typeof e)throw{name:"Parsing Error",message:"Invalid input type in Maths.parseInt"};if(e.includes("."))throw{name:"Parsing Error",message:"Invalid input in Maths.parseInt (must be an integer)"};if("0"===e)return 0;let t=e;t=t.match(/-?[0-9]+/g).join("");let a=0;for(let e=0;e<t.length;e++)switch(t[t.length-e-1]){case"1":a+=10**e;break;case"2":a+=2*10**e;break;case"3":a+=3*10**e;break;case"4":a+=4*10**e;break;case"5":a+=5*10**e;break;case"6":a+=6*10**e;break;case"7":a+=7*10**e;break;case"8":a+=8*10**e;break;case"9":a+=9*10**e}return"-"===t[0]?-a:a}static parseFloat(e){if("number"==typeof e)return e;if("string"!=typeof e)throw{name:"Parsing Error",message:"Invalid input type in Maths.parseFloat"};if("0"===e)return 0;if(!e.toString().includes("."))return Maths.parseInt(e);let t=e.match(/-?[0-9]+\.[0-9]+/g).join(""),a=0;for(let e=0;e<t.length;e++)switch(t[e]){case"0":break;case"1":a+=10**(t.indexOf(".")-e-1<0?t.indexOf(".")-e:t.indexOf(".")-e-1);break;case"2":a+=2*10**(t.indexOf(".")-e-1<0?t.indexOf(".")-e:t.indexOf(".")-e-1);break;case"3":a+=3*10**(t.indexOf(".")-e-1<0?t.indexOf(".")-e:t.indexOf(".")-e-1);break;case"4":a+=4*10**(t.indexOf(".")-e-1<0?t.indexOf(".")-e:t.indexOf(".")-e-1);break;case"5":a+=5*10**(t.indexOf(".")-e-1<0?t.indexOf(".")-e:t.indexOf(".")-e-1);break;case"6":a+=6*10**(t.indexOf(".")-e-1<0?t.indexOf(".")-e:t.indexOf(".")-e-1);break;case"7":a+=7*10**(t.indexOf(".")-e-1<0?t.indexOf(".")-e:t.indexOf(".")-e-1);break;case"8":a+=8*10**(t.indexOf(".")-e-1<0?t.indexOf(".")-e:t.indexOf(".")-e-1);break;case"9":a+=9*10**(t.indexOf(".")-e-1<0?t.indexOf(".")-e:t.indexOf(".")-e-1);break;case".":continue}return"-"===t[0]?-a:a}static evaluate(e){let t=e,a=t.match(/\(/g),r=t.match(/\)/g);if(a&&r){if(a.length!==r.length)throw{name:"Evaluation Error",message:'Syntax invalid, every opening bracket "(" must be paired with a closing bracket ")" in Maths.evaluate'};if(a&&!r||!a&&r)throw{name:"Evaluation Error",message:'Syntax invalid, every opening bracket "(" must be paired with a closing bracket ")" in Maths.evaluate'}}for(t=(t=(t=t.split(" ").join("")).replaceAll("+-","-")).replaceAll("--","+");t.includes("(");){let e,a=t.indexOf("("),r=1;for(let i=a+1;r>0;i++){switch(t[i]){case"(":r++;break;case")":r--}e=i}let i=t.substring(a,e+1),n=i.split("");n.shift(),n.pop(),t=t.replace(i,Maths.evaluate(n.join("")))}for(;t.includes("^");){let e=t.match(/-?[0-9]+(\.[0-9]+)?\^-?[0-9]+(\.[0-9]+)?/g);if(e){let a=e[0].toString(),r=e[0].split("^");t=t.replace(a,Maths.parseFloat(r[0])**Maths.parseFloat(r[1]))}}for(;t.includes("/");){let e=t.match(/-?[0-9]+(\.[0-9]+)?\/-?[0-9]+(\.[0-9]+)?/g);if(e){let a=e[0].toString(),r=e[0].split("/");t=t.replace(a,Maths.parseFloat(r[0])/Maths.parseFloat(r[1]))}}for(;t.includes("%");){let e=t.match(/-?[0-9]+(\.[0-9]+)?%-?[0-9]+(\.[0-9]+)?/g);if(e){let a=e[0].toString(),r=e[0].split("%");t=t.replace(a,Maths.parseFloat(r[0])%Maths.parseFloat(r[1]))}}for(;t.includes("*");){let e=t.match(/-?[0-9]+(\.[0-9]+)?\*-?[0-9]+(\.[0-9]+)?/g);if(e){let a=e[0].toString(),r=e[0].split("*");t=t.replace(a,Maths.parseFloat(r[0])*Maths.parseFloat(r[1]))}}for(;t.includes("-");){let e=t.match(/-[0-9]+(\.[0-9]+)?/g);if(e&&1===e.length&&0===t.indexOf(e[0]))break;let a=t.match(/-?[0-9]+(\.[0-9]+)?-[0-9]+(\.[0-9]+)?/g);if(a){let e=a[0],r=a[0].match(/-?[0-9]+(\.[0-9]+)?/g);t=(t=(t=t.replace(e,Maths.parseFloat(r[0])- -Maths.parseFloat(r[1]))).replaceAll("+-","-")).replaceAll("--","+")}}for(;t.includes("+");){let e=t.match(/-?[0-9]+(\.[0-9]+)?\+-?[0-9]+(\.[0-9]+)?/g);if(e){let a=e[0].toString(),r=e[0].split("+");t=t.replace(a,Maths.parseFloat(r[0])+Maths.parseFloat(r[1]))}}return Maths.parseFloat(t)}static ceil(e){if("number"!=typeof e)throw{name:"Rounding Error",message:"Invalid input type in Maths.ceil"};return e.toString().includes(".")?Maths.parseInt(e.toString().split(".")[0]):e}static floor(e){if("number"!=typeof e)throw{name:"Rounding Error",message:"Invalid input type in Math.floor"};return e.toString().includes(".")?Maths.parseInt(e.toString().split(".")[0])+1:e}static round(e){if("number"!=typeof e)throw{name:"Rounding Error",message:"Invalid input type in Maths.round"};let t=e.toString();return t.includes(".")?Maths.parseInt(t[t.indexOf(".")+1])>=5?Maths.ceil(Maths.parseFloat(t)):Maths.floor(Maths.parseFloat(t)):e}static add(e,t){return e+t}static subtract(e,t){return e-t}static multiply(e,t){return e*t}static divide(e,t){return e/t}static remainder(e,t){return e%t}static mod(e,t){return e%t}static modulus(e,t){return e%t}}class Algebra{solve(e,t){if(!e.includes("="))throw{name:"Albegra Error",message:"No equality statement in Maths.algebra.solve"};if(!e.includes(t))throw{name:"Albegra Error",message:"Variable not included in equation in Maths.algebra.solve"};if((e=e.split(" ").join(""))[0].includes(t)&&!e[1].includes(t)||!e[0].includes(t)&&e[1].includes(t)){let a=e.split("="),r=a[1].includes(t)?1:0;if(a[1===r?0:1]=Maths.evaluate(a[1===r?0:1]),console.log(a.join("=")),a[1===r?1:0]===t)return a[1===r?0:1]}}}