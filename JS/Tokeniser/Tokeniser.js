const Tokeniser=function(){const t=/-?(\d+\.d+|\d+\.|\.\d+|\d+)((e|E)(\+|-)?\d+)?/g;return{settings:{operators:["<",">","=","+","-","*","/","?","!"],separators:[",",".",";",":"," ","\t","\n"],groupers:["(",")","[","]","{","}",'"','"',"'","'"],keepWhiteSpacesAsTokens:!1,trimTokens:!0},isNumber:function(e){return"number"==typeof e||"string"==typeof e&&t.test(e)},closeGrouper:function(t){return this.settings.groupers.includes(t)?this.settings.groupers[this.settings.groupers.indexOf(t)+1]:null},tokenType:function(t){return this.settings.operators.includes(t)?"operator":this.settings.separators.includes(t)?"separator":this.settings.groupers.includes(t)?"grouper":"other"},parseString:function(t){if("string"!=typeof t){if(null===t)return"null";t="object"==typeof t?JSON.stringify(t):t.toString()}let e=[],s="";for(let i=0;i<t.length;i++)this.tokenType(t[i])!==this.tokenType(s)||"separator"===this.tokenType(t[i])?(""!==s.trim()?e.push(this.settings.trimTokens?s.trim():s):this.settings.keepWhiteSpacesAsTokens&&e.push(s),s=t[i],"separator"===this.tokenType(s)&&(""!==s.trim()?e.push(this.settings.trimTokens?s.trim():s):this.settings.keepWhiteSpacesAsTokens&&e.push(s),s="")):s+=t[i];return""!==s.trim()?e.push(this.settings.trimTokens?s.trim():s):this.settings.keepWhiteSpacesAsTokens&&e.push(s),e.filter(t=>""!==t)}}}();console.log("Loaded Tokeniser.js by Matthew James");
