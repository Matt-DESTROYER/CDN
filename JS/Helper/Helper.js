let $=e=>{const t=document.querySelectorAll(e);return 1===t.length?t[0]:t};function importJS(e){let t=document.createElement("script");t.setAttribute("type","text/javascript"),t.setAttribute("src",e),document.getElementsByTagName("head")[0].appendChild(t)}function importCSS(e){let t=document.createElement("link");t.setAttribute("type","text/css"),t.setAttribute("rel","stylesheet"),t.setAttribute("href",e),document.getElementsByTagName("head")[0].appendChild(t)}function addCSS(e){let t=document.createElement("style");t.styleSheet?t.styleSheet.cssText=e:t.appendChild(document.createTextNode(e)),document.getElementsByTagName("head")[0].appendChild(t)}Array.prototype.equals=function(e){if(e instanceof Array){if(this.length!==e.length)return!1;for(let t=0;t<this.length;t++)if(this[t]!==e[t])return!1;return!0}throw new TypeError("[Array.prototype.equals] Expected input to be an array.")},Array.prototype.includesArray=function(e){if(e instanceof Array){for(let t=0;t<this.length;t++)if(this[t]instanceof Array&&this[t].equals(e))return!0;return!1}throw new TypeError("[Array.prototype.includesArray] Expected input to be an array.")},console.log("Loaded Helper.js by Matthew James");
