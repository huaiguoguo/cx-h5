(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{1137:function(n,t,e){n.exports=e.p+"img/1711357.png"},1138:function(n,t,e){n.exports=e.p+"img/a3eb7af.png"},1139:function(n,t,e){var content=e(1145);"string"==typeof content&&(content=[[n.i,content,""]]),content.locals&&(n.exports=content.locals);(0,e(49).default)("371b7733",content,!0,{sourceMap:!1})},1140:function(n,t,e){"use strict";var r=e(21),o=e(66),c=e(77),l=e(569),d=e(173),m=e(38),f=e(119).f,h=e(174).f,v=e(32).f,w=e(1141).trim,_=r.Number,x=_,y=_.prototype,C="Number"==c(e(257)(y)),k="trim"in String.prototype,P=function(n){var t=d(n,!1);if("string"==typeof t&&t.length>2){var e,r,o,c=(t=k?t.trim():w(t,3)).charCodeAt(0);if(43===c||45===c){if(88===(e=t.charCodeAt(2))||120===e)return NaN}else if(48===c){switch(t.charCodeAt(1)){case 66:case 98:r=2,o=49;break;case 79:case 111:r=8,o=55;break;default:return+t}for(var code,l=t.slice(2),i=0,m=l.length;i<m;i++)if((code=l.charCodeAt(i))<48||code>o)return NaN;return parseInt(l,r)}}return+t};if(!_(" 0o1")||!_("0b1")||_("+0x1")){_=function(n){var t=arguments.length<1?0:n,e=this;return e instanceof _&&(C?m((function(){y.valueOf.call(e)})):"Number"!=c(e))?l(new x(P(t)),e,_):P(t)};for(var N,S=e(29)?f(x):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),I=0;S.length>I;I++)o(x,N=S[I])&&!o(_,N)&&v(_,N,h(x,N));_.prototype=y,y.constructor=_,e(39)(r,"Number",_)}},1141:function(n,t,e){var r=e(28),o=e(76),c=e(38),l=e(1142),d="["+l+"]",m=RegExp("^"+d+d+"*"),f=RegExp(d+d+"*$"),h=function(n,t,e){var o={},d=c((function(){return!!l[n]()||"​"!="​"[n]()})),m=o[n]=d?t(v):l[n];e&&(o[e]=m),r(r.P+r.F*d,"String",o)},v=h.trim=function(n,t){return n=String(o(n)),1&t&&(n=n.replace(m,"")),2&t&&(n=n.replace(f,"")),n};n.exports=h},1142:function(n,t){n.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"},1144:function(n,t,e){"use strict";var r=e(1139);e.n(r).a},1145:function(n,t,e){(n.exports=e(48)(!1)).push([n.i,".backContainer[data-v-40f7ce90] {\n  width: 100%;\n  height: 1.2rem;\n  margin-bottom: 0.266667rem;\n  background-color: #fff;\n  box-shadow: 0 0.266667rem 0.4rem -0.133333rem rgba(0, 0, 0, 0.13);\n  position: fixed;\n  top: 0;\n  z-index: 10;\n}\n.backContainer .back_content[data-v-40f7ce90] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  color: blue;\n  padding: 0 0.266667rem;\n}\n.backContainer .back_content .left_arrow[data-v-40f7ce90] {\n  width: 8%;\n  height: 1.066667rem;\n  line-height: 1.066667rem;\n  text-align: center;\n}\n.backContainer .back_content .left_arrow img[data-v-40f7ce90] {\n  max-width: 32%;\n}\n.backContainer .back_content .title[data-v-40f7ce90] {\n  margin: 0 auto;\n  font-family: PingFang-SC-Bold;\n  font-size: 0.48rem;\n  font-weight: normal;\n  font-stretch: normal;\n  letter-spacing: 0;\n  color: #333333;\n  text-align: left;\n}\n.backContainer .back_content .avatar[data-v-40f7ce90] {\n  width: 0.733333rem;\n}\n.backContainer .header .nav[data-v-40f7ce90] {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n  text-align: center;\n}\n.backContainer .header .nav .item[data-v-40f7ce90] {\n  width: 50%;\n  height: 0.933333rem;\n  line-height: 0.933333rem;\n  margin-top: 0.266667rem;\n}\n.backContainer .header .nav .item span[data-v-40f7ce90] {\n  font-family: PingFang-SC-Medium;\n  font-size: 0.373333rem;\n  font-weight: bold;\n  font-stretch: normal;\n  letter-spacing: 0;\n  color: #0017fe;\n}\n.backContainer .header .nav .item span.active[data-v-40f7ce90] {\n  border-bottom: 0.066667rem solid #0017fe;\n}",""])},1147:function(n,t,e){"use strict";e(256),e(172),e(1140);var r={name:"BackNav",props:{title:{type:[String,Number],default:""}},data:function(){return{marginTopObject:"",isOrder:0}},mounted:function(){this.isIPhoneX();["/user/order-ing","/user/order-ing/","/user/order-wait","/user/order-wait/","/user/order-waitEnter","/user/order-waitEnter/","/user/order-finish","/user/order-finish/"].includes(this.$route.path)&&(this.isOrder=1)},methods:{ShowLeftNav:function(){this.leftNavStatus;this.$store.commit("user/setLeftNavStatus",1)},isIPhoneX:function(){navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);var n=/iphone/gi.test(window.navigator.userAgent)&&window.devicePixelRatio&&3===window.devicePixelRatio&&375===window.screen.width&&812===window.screen.height,t=/iphone/gi.test(window.navigator.userAgent)&&window.devicePixelRatio&&3===window.devicePixelRatio&&414===window.screen.width&&896===window.screen.height,e=/iphone/gi.test(window.navigator.userAgent)&&window.devicePixelRatio&&2===window.devicePixelRatio&&414===window.screen.width&&896===window.screen.height;(n||t||e)&&(this.marginTopObject="top: 0.83rem")}}},o=(e(1144),e(37)),component=Object(o.a)(r,(function(){var n=this,t=n.$createElement,r=n._self._c||t;return r("div",{staticClass:"backContainer",style:n.marginTopObject},[r("div",{staticClass:"back_content"},[r("div",{staticClass:"left_arrow",on:{click:function(t){return n.$router.push("/home")}}},[r("img",{attrs:{src:e(1137),alt:""}})]),n._v(" "),r("div",{staticClass:"title"},[n._v(n._s(n.title))]),n._v(" "),r("div",{staticClass:"avatar",on:{click:n.ShowLeftNav}},[r("img",{attrs:{src:e(1138),alt:""}})])]),n._v(" "),n.isOrder?r("div",{staticClass:"header"},[r("div",{staticClass:"nav"},[r("div",{staticClass:"item inprogress",on:{click:function(t){return n.$router.push("/user/order-ing")}}},["/user/order-ing"===n.$route.path?r("span",{staticClass:"active"},[n._v("进行中")]):r("span",{},[n._v("进行中")])]),n._v(" "),r("div",{staticClass:"item inprogress",on:{click:function(t){return n.$router.push("/user/order-wait")}}},["/user/order-wait"===n.$route.path?r("span",{staticClass:"active"},[n._v("待支付")]):r("span",{attrs:{"enter-to-class":""}},[n._v("待支付")])]),n._v(" "),r("div",{staticClass:"item inprogress",on:{click:function(t){return n.$router.push("/user/order-waitEnter")}}},["/user/order-waitEnter"===n.$route.path?r("span",{staticClass:"active"},[n._v("待确认")]):r("span",{},[n._v("待确认")])]),n._v(" "),r("div",{staticClass:"item completed",on:{click:function(t){return n.$router.push("/user/order-finish")}}},["/user/order-finish"===n.$route.path?r("span",{staticClass:"active"},[n._v("已完成")]):r("span",{},[n._v("已完成")])])])]):n._e()])}),[],!1,null,"40f7ce90",null);t.a=component.exports},1180:function(n,t,e){var content=e(1270);"string"==typeof content&&(content=[[n.i,content,""]]),content.locals&&(n.exports=content.locals);(0,e(49).default)("28f4a613",content,!0,{sourceMap:!1})},1269:function(n,t,e){"use strict";var r=e(1180);e.n(r).a},1270:function(n,t,e){(n.exports=e(48)(!1)).push([n.i,".container[data-v-e042be74] {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n}\n.container .nodata[data-v-e042be74] {\n  margin-top: 2rem;\n}\n.container .header .nav[data-v-e042be74] {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n  text-align: center;\n}\n.container .header .nav .item[data-v-e042be74] {\n  width: 50%;\n  height: 0.933333rem;\n  line-height: 0.933333rem;\n  margin-top: 0.266667rem;\n}\n.container .header .nav .item span[data-v-e042be74] {\n  font-family: PingFang-SC-Medium;\n  font-size: 0.373333rem;\n  font-weight: bold;\n  font-stretch: normal;\n  letter-spacing: 0;\n  color: #0017fe;\n}\n.container .header .nav .item span.active[data-v-e042be74] {\n  border-bottom: 0.066667rem solid #0017fe;\n}\n.container .content[data-v-e042be74] {\n  width: 100%;\n  height: 100%;\n  margin-top: 2.533333rem;\n}\n.container .content .list[data-v-e042be74] {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n}\n.container .content .list .item[data-v-e042be74] {\n  background-color: #ffffff;\n  box-shadow: 0 0.066667rem 0.106667rem 0 rgba(0, 0, 0, 0.13);\n  border-radius: 0.133333rem;\n  border: solid 0.013333rem #e2e2e2;\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  margin-top: 0.266667rem;\n  padding-right: 0.2rem;\n}\n.container .content .list .item .left[data-v-e042be74] {\n  width: 2rem;\n  height: 2rem;\n  line-height: 2rem;\n  text-align: center;\n  margin-left: 0.133333rem;\n  margin-top: 0.2rem;\n  margin-bottom: 0.2rem;\n}\n.container .content .list .item .left img[data-v-e042be74] {\n  max-width: 100%;\n  max-height: 100%;\n}\n.container .content .list .item .right[data-v-e042be74] {\n  width: 7.066667rem;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-evenly;\n  align-items: space-between;\n  color: #333333;\n  padding-right: 0.2rem;\n  padding-left: 0.2rem;\n}\n.container .content .list .item .right .top[data-v-e042be74] {\n  width: 100%;\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n}\n.container .content .list .item .right .top .title span[data-v-e042be74] {\n  display: block;\n  font-family: PingFang-SC-Medium;\n  font-size: 0.32rem;\n  font-weight: normal;\n  font-stretch: normal;\n  letter-spacing: 0;\n  color: #333333;\n}\n.container .content .list .item .right .top .price span[data-v-e042be74] {\n  display: block;\n  font-family: PingFang-SC-Medium;\n  font-size: 0.4rem;\n  font-weight: normal;\n  font-stretch: normal;\n  letter-spacing: 0;\n  color: #333333;\n}\n.container .content .list .item .right .middle[data-v-e042be74] {\n  flex: 1;\n  margin-top: 0.2rem;\n  margin-bottom: 0.266667rem;\n  width: 100%;\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n}\n.container .content .list .item .right .middle .order_num span[data-v-e042be74]:first-child {\n  width: 1.146667rem;\n  height: 0.253333rem;\n  font-family: PingFang-SC-Medium;\n  font-size: 0.266667rem;\n  font-weight: normal;\n  font-stretch: normal;\n  letter-spacing: 0;\n  color: #666666;\n}\n.container .content .list .item .right .middle .order_num span[data-v-e042be74]:last-child {\n  font-family: PingFang-SC-Medium;\n  font-size: 0.32rem;\n  font-weight: normal;\n  font-stretch: normal;\n  letter-spacing: 0;\n  color: #007eff;\n}\n.container .content .list .item .right .middle .total span[data-v-e042be74] {\n  font-family: PingFang-SC-Medium;\n  font-size: 0.266667rem;\n  font-weight: normal;\n  font-stretch: normal;\n  letter-spacing: 0;\n  color: #666666;\n}\n.container .content .list .item .right .bottom[data-v-e042be74] {\n  flex: 1;\n  width: 100%;\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n}\n.container .content .list .item .right .bottom .pay_type span[data-v-e042be74] {\n  font-family: PingFang-SC-Medium;\n  font-size: 0.266667rem;\n  font-weight: normal;\n  font-stretch: normal;\n  letter-spacing: 0;\n  color: #666666;\n}\n.container .content .list .item .right .bottom .pay_date span[data-v-e042be74] {\n  font-family: PingFang-SC-Medium;\n  font-size: 0.266667rem;\n  font-weight: normal;\n  font-stretch: normal;\n  letter-spacing: 0;\n  color: #666666;\n}",""])},1327:function(n,t,e){"use strict";e.r(t);e(75);var r,o=e(20),c=(e(256),{components:{BackNav:e(1147).a},data:function(){return{list:[],marginTopObject:""}},mounted:function(){if(this.isIPhoneX(),!this.$store.state.user.userInfo){return this.$toast.center("请登录"),this.$router.push("/user/login"),!1}this.finish(),this.$message.config({top:"300px",duration:2,maxCount:1})},methods:{isIPhoneX:function(){navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);var n=/iphone/gi.test(window.navigator.userAgent)&&window.devicePixelRatio&&3===window.devicePixelRatio&&375===window.screen.width&&812===window.screen.height,t=/iphone/gi.test(window.navigator.userAgent)&&window.devicePixelRatio&&3===window.devicePixelRatio&&414===window.screen.width&&896===window.screen.height,e=/iphone/gi.test(window.navigator.userAgent)&&window.devicePixelRatio&&2===window.devicePixelRatio&&414===window.screen.width&&896===window.screen.height;(n||t||e)&&(this.marginTopObject="margin-top: 3.5rem")},finish:(r=Object(o.a)(regeneratorRuntime.mark((function n(){var t=this;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,this.$axios.post("payment/myOrder",{status:4}).then((function(n){console.log(n.data.data),console.log("========================end"),t.list=n.data.data})).catch((function(n){console.log(n)}));case 2:case"end":return n.stop()}}),n,this)}))),function(){return r.apply(this,arguments)})}}),l=(e(1269),e(37)),component=Object(l.a)(c,(function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{staticClass:"container"},[e("BackNav",{attrs:{title:"订单记录"}}),n._v(" "),e("div",{staticClass:"content",style:n.marginTopObject},[e("div",{staticClass:"list"},n._l(n.list,(function(t,r){return e("div",{key:r},[t.goods&&4==t.status?e("div",{staticClass:"item"},[e("div",{staticClass:"left"},[e("img",{attrs:{src:t.goods.cover,alt:""}})]),n._v(" "),e("div",{staticClass:"right"},[e("div",{staticClass:"top"},[e("div",{staticClass:"title"},[e("span",[n._v(n._s(t.goods.name1))])]),n._v(" "),e("div",{staticClass:"price"},[e("span",[n._v("￥"+n._s(t.goods.priceActivity))])])]),n._v(" "),e("div",{staticClass:"middle"},[e("div",{staticClass:"order_num"},[e("span",[n._v("订单编号:")]),n._v(" "),e("span",[n._v(n._s(t.orderSn))])]),n._v(" "),e("div",{staticClass:"total"},[e("span",[n._v("x"+n._s(t.number))])])]),n._v(" "),e("div",{staticClass:"bottom"},[e("div",{staticClass:"pay_type"},[1==n.list.payType?e("span",[n._v("支付方式: 支付宝")]):n._e(),n._v(" "),2==n.list.payType?e("span",[n._v("支付方式: 微信")]):n._e(),n._v(" "),3==n.list.payType?e("span",[n._v("支付方式: 银行卡")]):n._e(),n._v(" "),4==n.list.payType?e("span",[n._v("支付方式: USDT")]):n._e()]),n._v(" "),e("div",{staticClass:"pay_date"},[e("span",[n._v("支付日期: "+n._s(t.addTime))])])])])]):n._e()])})),0)])],1)}),[],!1,null,"e042be74",null);t.default=component.exports}}]);