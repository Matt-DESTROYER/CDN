import a from"https://Matt-DESTROYER.github.io/CDN/JS/Classes/Point.mjs";import b from"https://Matt-DESTROYER.github.io/CDN/JS/Classes/Polygon.mjs";export default class c extends b{constructor(b,c,d,e){super([new a(b,c),new a(b+d,c),new a(b+d,c+e),new a(b,c+e)])}get p1(){return this.points[0]}set p1(a){return this.points[0]=a}get p2(){return this.points[1]}set p2(a){return this.points[1]=a}get p3(){return this.points[2]}set p3(a){return this.points[2]=a}get p4(){return this.points[3]}set p4(a){return this.points[3]=a}get x1(){return this.points[0].x}set x1(a){return this.points[0].x=a}get y1(){return this.points[0].y}set y1(a){return this.points[0].y=a}get x2(){return this.points[1].x}set x2(a){return this.points[0].x=a}get y2(){return this.points[1].y}set y2(a){return this.points[1].y=a}get x3(){return this.points[2].x}set x3(a){return this.points[0].x=a}get y3(){return this.points[2].y}set y3(a){return this.points[2].y=a}get x4(){return this.points[3].x}set x4(a){return this.points[0].x=a}get y4(){return this.points[3].y}set y4(a){return this.points[3].y=a}get x(){return this.points[0].x}set x(b){let a=b-this.points[0].x;this.points[0].x+=a,this.points[1].x+=a,this.points[2].x+=a,this.points[3].x+=a}get y(){return this.points[0].y}set y(b){let a=b-this.points[0].y;this.points[0].y+=a,this.points[1].y+=a,this.points[2].y+=a,this.points[3].y+=a}get width(){return this.points[1].x-this.points[0].x}set width(b){let a=b-(this.points[1].x-this.points[0].x);this.points[1].x+=a,this.points[2].x+=a}get height(){return this.points[2].y-this.points[0].y}set height(b){let a=b-(this.points[3].y-this.points[0].y);this.points[2].y+=a,this.points[3].y+=a}}
