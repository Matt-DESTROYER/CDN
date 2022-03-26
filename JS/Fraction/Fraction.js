const Fraction=function(t,r){if("number"!=typeof t||"number"!=typeof r)throw new TypeError("[Fraction] Expected input to be of type 'Number'.");if(t!==~~t||r!==~~r)throw new Error("[Fraction] Fractions can only be made up of whole numbers.");this.numerator=t,this.denominator=r};Fraction.prototype.simplify=function(){for(let t=Math.max(this.numerator,this.denominator);t>1;t--)if(this.numerator%t==0&&this.denominator%t==0)return this.numerator/=t,this.denominator/=t,this},Fraction.prototype.add=function(t,r){if(t instanceof Fraction)return this.denominator!==t.denominator?(this.numerator=this.numerator*t.denominator+t.numerator*this.denominator,this.denominator*=t.denominator):this.numerator=this.numerator+t.numerator,this;if(r&&"number"==typeof t&&"number"==typeof r){if(t!==~~t||r!==~~r)throw new Error("[Fraction.prototype.add] Fractions can only be made up of whole numbers.");return this.denominator!==r?(this.numerator=this.numerator*r+t*this.denominator,this.denominator*=r):this.numerator=this.numerator+t,this}throw new Error("[Fraction.prototype.add] Invalid input.")},Fraction.prototype.subtract=function(t,r){if(t instanceof Fraction)return this.denominator!==t.denominator?(this.numerator=this.numerator*t.denominator-t.numerator*this.denominator,this.denominator*=t.denominator):this.numerator=this.numerator-t.numerator,this;if(r&&"number"==typeof t&&"number"==typeof r){if(t!==~~t||r!==~~r)throw new Error("[Fraction.prototype.subtract] Fractions can only be made up of whole numbers.");return this.denominator!==r?(this.numerator=this.numerator*r-t*this.denominator,this.denominator*=r):this.numerator=this.numerator-t,this}throw new Error("[Fraction.prototype.subtract] Invalid input.")},Fraction.prototype.multiply=function(t,r){if(t instanceof Fraction)return this.numerator*=t.numerator,this.denominator*=t.denominator,this;if(r&&"number"==typeof t&&"number"==typeof r){if(t!==~~t||r!==~~r)throw new Error("[Fraction.prototype.multiply] Fractions can only be made up of whole numbers.");return this.numerator*=t,this.denominator*=r,this}throw new Error("[Fraction.prototype.multiply] Invalid input.")},Fraction.prototype.divide=function(t,r){if(t instanceof Fraction)return this.numerator*=t.denominator,this.denominator*=t.numerator,this;if(r&&"number"==typeof t&&"number"==typeof r){if(t!==~~t||r!==~~r)throw new Error("[Fraction.prototype.divide] Fractions can only be made up of whole numbers.");return this.numerator*=r,this.denominator*=t,this}throw new Error("[Fraction.prototype.divide] Invalid input.")},Fraction.prototype.toString=function(){return this.numerator+"/"+this.denominator},console.log("Loaded Fraction.js by Matthew James!");
