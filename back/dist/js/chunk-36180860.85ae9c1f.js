(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-36180860"],{"3f36":function(e,t,r){var s=r("91fe"),a=r("f30e"),n=r("8c47"),i=r("4aef").f,l=r("7a23"),o=a((function(){i(1)})),u=!l||o;s({target:"Object",stat:!0,forced:u,sham:!l},{getOwnPropertyDescriptor:function(e,t){return i(n(e),t)}})},"4ca4":function(e,t,r){"use strict";function s(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.d(t,"a",(function(){return s}))},"79dd":function(e,t,r){var s=r("91fe"),a=r("ee6f"),n=r("16e5"),i=r("f30e"),l=i((function(){n(1)}));s({target:"Object",stat:!0,forced:l},{keys:function(e){return n(a(e))}})},"89bb":function(e,t,r){},aaef:function(e,t,r){"use strict";r.d(t,"a",(function(){return s}));var s={ACCOUNT:/^[a-z-A-Z]{4,10}$/,PASSWORD:/^[a-zA-Z][a-zA-Z0-9]{3,9}$/,USERNAME:/[\u4e00-\u9fa5_a-zA-Z]{3,10}$/,MOBILE:/^[1]([3-9])[0-9]{9}$/}},c77d:function(e,t,r){"use strict";r.r(t);var s=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{directives:[{name:"loading",rawName:"v-loading",value:e.isLoading,expression:"isLoading"}],staticClass:"personal-page-wrapper"},[e.userInfos?r("el-form",{ref:"form",staticClass:"permission-form",attrs:{model:e.userInfos,rules:e.rules,"label-width":"96px","label-position":"left"}},[r("el-row",{staticClass:"form-content-wrapper",attrs:{gutter:20}},[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{size:"small",label:"账号：",prop:"account"}},[r("el-input",{attrs:{size:"small"},model:{value:e.userInfos.account,callback:function(t){e.$set(e.userInfos,"account",t)},expression:"userInfos.account"}})],1),r("el-form-item",{attrs:{size:"small",label:"密码：",prop:"password"}},[r("el-input",{attrs:{size:"small"},model:{value:e.userInfos.password,callback:function(t){e.$set(e.userInfos,"password",t)},expression:"userInfos.password"}})],1),r("el-form-item",{attrs:{size:"small",label:"名称：",prop:"name"}},[r("el-input",{attrs:{size:"small"},model:{value:e.userInfos.name,callback:function(t){e.$set(e.userInfos,"name",t)},expression:"userInfos.name"}})],1),r("el-form-item",{attrs:{size:"small",label:"号码：",prop:"mobile"}},[r("el-input",{attrs:{size:"small",maxlength:"11"},model:{value:e.userInfos.mobile,callback:function(t){e.$set(e.userInfos,"mobile",t)},expression:"userInfos.mobile"}})],1),r("el-form-item",{attrs:{size:"small",label:"创建时间："}},[r("el-input",{attrs:{size:"small",disabled:""},model:{value:e.userInfos.createdTime,callback:function(t){e.$set(e.userInfos,"createdTime",t)},expression:"userInfos.createdTime"}})],1),r("el-form-item",{attrs:{size:"small",label:"头像：",prop:"avatar"}},[r("div",{staticClass:"avatar-wrapper"},[r("UploadFiles",{attrs:{action:"/api/upload",data:{directory:"avatar"},defaultPics:e.defaultPics},on:{removeCallBack:e.removeCallBack,successCallback:e.successCallback}})],1)]),r("el-form-item",{attrs:{size:"small",label:"级别："}},[r("el-select",{attrs:{disabled:"SUPERADMIN"===e.userInfos.role,placeholder:"请选择"},model:{value:e.userInfos.role,callback:function(t){e.$set(e.userInfos,"role",t)},expression:"userInfos.role"}},e._l(e.roleEnum,(function(e){return r("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),r("el-form-item",{attrs:{size:"small",label:"描述：",prop:"desc"}},[r("el-input",{attrs:{type:"textarea",autosize:{minRows:3,maxRows:6},"show-word-limit":"",maxlength:"100",placeholder:"请输入内容"},model:{value:e.userInfos.desc,callback:function(t){e.$set(e.userInfos,"desc",t)},expression:"userInfos.desc"}})],1)],1),r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{size:"small",label:"权限菜单："}},[e.menuList?r("el-tree",{ref:"tree",attrs:{disable:"",data:e.menuList,"show-checkbox":"","default-expand-all":"","node-key":"permission","highlight-current":"","check-strictly":"",props:e.defaultProps},on:{check:e.checkChange}}):e._e()],1)],1)],1),r("div",{staticClass:"button-wrapper mgt-20"},[r("el-button",{attrs:{type:"primary",size:"small"},nativeOn:{click:function(t){return e.$throttleHandleSave("form")}}},[e._v("保 存")])],1)],1):e._e()],1)},a=[],n=(r("4178"),r("7ae7"),r("86dd"),r("af82"),r("a677"),r("1a8c"),r("c354"),r("3f36"),r("f4dd"),r("79dd"),r("3a20"),r("b3f9"),r("baa4"),r("3547"),r("ef8e"),r("3e5e"),r("9a14"),r("252a"),r("93ff")),i=(r("63ff"),r("34fe")),l=r("4ca4"),o=r("2f14"),u=r("a206"),c=r("aaef"),f=r("08c1");function d(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);t&&(s=s.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,s)}return r}function m(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?d(Object(r),!0).forEach((function(t){Object(l["a"])(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):d(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var p={name:"Personal",components:{},props:{},data:function(){return{userInfos:null,rules:{account:[{required:!0,message:"请输入用户账号"},{pattern:c["a"].ACCOUNT,message:"账号格式不正确，4～10个的字母"}],password:[{required:!0,message:"请输入用户密码"},{pattern:c["a"].PASSWORD,message:"密码格式不正确，4～10个的字母或数字组合"}],name:[{required:!0,message:"请输入用户名称"},{pattern:c["a"].USERNAME,message:"名称格式不正确，4～10个的字母或中文组合"}],mobile:[{required:!0,message:"请输入用户号码"},{pattern:c["a"].MOBILE,message:"号码格式不正确"}],avatar:[{required:!0,message:"请上传头像"}],desc:[{required:!0,message:"请输入用户相关的描述"}]},isLoading:!1,menuList:null,hasPermission:null,defaultProps:{children:"children",label:"title"},defaultPics:null}},computed:{roleEnum:function(){return"SUPERADMIN"===this.userInfos.role?u["a"]:u["a"].filter((function(e){return"SUPERADMIN"!==e.value}))},$throttleHandleSave:function(){var e=this;return Object(o["c"])((function(t){return e.handleSave(t)}),2e3)}},methods:m({},Object(f["b"])(["SETMENULIST"]),{getUserInfo:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.$axios.get("/getUserInfos");case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),getAllPermissionMenu:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.$axios.get("/getAllPermissionMenu");case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),updateUserPersonalInfos:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.$axios.post("/updateUserPersonalInfos",t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}(),checkChange:function(e,t){var r=e.permission,s=t.checkedKeys,a=s.includes(r),i=[];this.getAllChildKeys([e],i);var l=this.$refs.tree.getCheckedKeys(),o=null;if(a){var u=this.$refs.tree.getNode(r),c=u.parent,f=[];this.getAllParentKeys(c,f),o=Object(n["a"])(new Set([].concat(i,Object(n["a"])(l),f)))}else o=l.filter((function(e){return!i.includes(e)}));this.$refs.tree.setCheckedKeys(o)},getAllChildKeys:function(e){var t=this,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];e.map((function(e){r.push(e.permission),e.children&&t.getAllChildKeys(e.children,r)}))},getAllParentKeys:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];Array.isArray(e.data)||t.push(e.data.permission),e.parent&&this.getAllParentKeys(e.parent,t)},disabledMenuList:function(e){for(var t=0,r=e.length;t<r;t++)e[t].disabled=!0,e[t].children&&e[t].children.length&&this.disabledMenuList(e[t].children)},removeCallBack:function(){this.userInfos.avatar=""},successCallback:function(e){var t=e.result,r=t.url;this.userInfos.avatar=r},handleSave:function(e){var t=this;this.$refs[e].validate((function(e){if(!e)return console.log("error submit!!"),!1;var r=t.userInfos,s=r.account,a=r.password,n=r.name,i=r.mobile,l=r.avatar,o=r.desc,u={account:s,password:a,name:n,mobile:i,avatar:l,desc:o};t.updateUserPersonalInfos(u).then((function(e){var r=e.data,s=r.status,a=r.msg;0===s&&(t.$message.success(a),t.SETMENULIST(null),t.$router.back())}))}))}}),created:function(){var e=this;this.isLoading=!0,this.$axios.all([this.getUserInfo(),this.getAllPermissionMenu()]).then(this.$axios.spread((function(t,r){var s=r.data.status;0===s&&(e.disabledMenuList(r.data.result),e.menuList=r.data.result);var a=t.data.status;if(0===a){e.userInfos=t.data.result,e.defaultPics=[{name:"avatar",url:t.data.result.avatar}],e.userInfos.createdTime=Object(o["a"])(new Date(e.userInfos.createdTime),"yyyy-MM-dd hh:mm:ss");var n=e.userInfos.permission,i=void 0===n?"":n;e.hasPermission=i.split(","),e.$nextTick((function(){e.$refs.tree.setCheckedKeys(i.split(","))}))}e.isLoading=!1})))},mounted:function(){},watch:{}},h=p,b=(r("ec1b"),r("5511")),v=Object(b["a"])(h,s,a,!1,null,"b92d8c1c",null);t["default"]=v.exports},ec1b:function(e,t,r){"use strict";var s=r("89bb"),a=r.n(s);a.a},f4dd:function(e,t,r){var s=r("91fe"),a=r("7a23"),n=r("e628"),i=r("8c47"),l=r("4aef"),o=r("01d7");s({target:"Object",stat:!0,sham:!a},{getOwnPropertyDescriptors:function(e){var t,r,s=i(e),a=l.f,u=n(s),c={},f=0;while(u.length>f)r=a(s,t=u[f++]),void 0!==r&&o(c,t,r);return c}})}}]);
//# sourceMappingURL=chunk-36180860.85ae9c1f.js.map