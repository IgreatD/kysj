(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-5e450d59"],{"0bc9":function(e,t,r){"use strict";r("96cf");var n=r("3b8d"),a=r("d225"),o=r("b0b4"),c=r("308d"),i=r("6bb5"),s=r("4e2b"),u=r("9ab4"),l=r("60a3"),p=r("d257"),d=r("54c5"),f=function(e){function t(){var e;return Object(a.a)(this,t),(e=Object(c.a)(this,Object(i.a)(t).apply(this,arguments))).formModel={},e.current={},e}var r;return Object(s.a)(t,e),Object(o.a)(t,[{key:"checkCurrentNotNull",value:function(){var e=this;return new Promise((function(t){Object(p.d)(e.current)?e.$message.warning("请选择需要操作的表格"):t(e.current)}))}},{key:"getData",value:(r=Object(n.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.$nextTick();case 2:return e.next=4,this.baseTable.getData();case 4:case"end":return e.stop()}}),e,this)}))),function(){return r.apply(this,arguments)})}]),t}(Object(l.c)(d.a));Object(u.a)([Object(l.f)()],f.prototype,"baseTable",void 0),f=Object(u.a)([l.a],f),t.a=f},6342:function(e,t,r){"use strict";r.r(t);r("96cf");var n=r("3b8d"),a=r("d225"),o=r("b0b4"),c=r("308d"),i=r("6bb5"),s=r("4e2b"),u=r("9ab4"),l=r("60a3"),p=r("9c8d"),d=r("0bc9"),f=[{type:"selection",width:65},{prop:"sort",label:"序号",width:120},{prop:"jumpActive_Android",label:"Android端跳转界面",width:150},{prop:"jumpActive_IOS",label:"IOS端跳转界面",width:150},{label:"预览",width:120,h:function(e,t){var r=t.row;return e("el-button",{attrs:{icon:"el-icon-view",circle:!0},on:{click:function(){window.open(r.posterUrl)}}})}},{label:"状态",width:120,h:function(e,t){var r=t.row;return e("el-tag",{attrs:{type:"1"===r.status?"success":"info"}},"1"===r.status?"启用":"停用")}}],b=(r("8e6e"),r("ac6a"),r("456d"),r("bd86")),h=r("e2e8"),O=r("d257");function g(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function m(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?g(r,!0).forEach((function(t){Object(b.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):g(r).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var j=function(e){function t(){var e;return Object(a.a)(this,t),(e=Object(c.a)(this,Object(i.a)(t).apply(this,arguments))).poster={},e.rulesPoster={posterUrl:[{required:!0,message:"请输入海报图片地址",trigger:"change"}],jumpActive_Android:[{required:!0,message:"请输入Android程序内部跳转地址",trigger:"change"}],jumpActive_IOS:[{required:!0,message:"请输入IOS程序内部跳转地址",trigger:"change"}],sort:[{required:!0,message:"请输入海报序号",trigger:"change"}]},e}return Object(s.a)(t,e),Object(o.a)(t,[{key:"opened",value:function(){this.poster={},Object(O.d)(this.dialogData)||(this.poster=Object.assign({},this.dialogData))}},{key:"update",value:function(){var e=this;this.$refs.formRef.validate((function(t){if(!t)return!1;e.updateLoading=!0,e.http({url:p.a.addPoster,data:m({posterId:""},e.poster)}).then((function(){e.$message.success("".concat(e.confirmText,"海报成功")),e.updateLoading=!1,e.syncShow=!1,e.updateSuccess()})).catch((function(t){e.$message.error("".concat(e.confirmText,"海报失败")),e.updateLoading=!1}))}))}},{key:"title",get:function(){return"".concat(this.confirmText,"海报")}}]),t}(Object(l.c)(h.a)),v=j=Object(u.a)([l.a],j),y=r("2877"),w=Object(y.a)(v,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("base-dialog",{attrs:{visible:e.syncShow,title:e.title},on:{"update:visible":function(t){e.syncShow=t},opened:e.opened},scopedSlots:e._u([{key:"footer",fn:function(){return[r("el-button",{attrs:{type:e.confirmType,loading:e.updateLoading},on:{click:e.update}},[e._v(e._s(e.confirmText))])]},proxy:!0}])},[e._v(" "),r("el-form",{ref:"formRef",attrs:{model:e.poster,rules:e.rulesPoster,"status-icon":"","label-width":"200px"}},[r("el-form-item",{attrs:{label:"海报地址",prop:"posterUrl"}},[r("el-input",{attrs:{placeholder:"请输入海报地址",autocomplete:"off"},model:{value:e.poster.posterUrl,callback:function(t){e.$set(e.poster,"posterUrl",t)},expression:"poster.posterUrl"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"Android程序内部跳转地址",prop:"jumpActive_Android"}},[r("el-input",{attrs:{placeholder:"请输入Android程序内部跳转地址",autocomplete:"off"},model:{value:e.poster.jumpActive_Android,callback:function(t){e.$set(e.poster,"jumpActive_Android",t)},expression:"poster.jumpActive_Android"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"IOS程序内部跳转地址",prop:"jumpActive_IOS"}},[r("el-input",{attrs:{placeholder:"请输入IOS程序内部跳转地址",autocomplete:"off"},model:{value:e.poster.jumpActive_IOS,callback:function(t){e.$set(e.poster,"jumpActive_IOS",t)},expression:"poster.jumpActive_IOS"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"海报序号",prop:"sort"}},[r("el-input",{attrs:{type:"number",placeholder:"请输入海报序号",autocomplete:"off"},model:{value:e.poster.sort,callback:function(t){e.$set(e.poster,"sort",t)},expression:"poster.sort"}})],1)],1)],1)}),[],!1,null,null,null).exports,k=function(e){function t(){var e;return Object(a.a)(this,t),(e=Object(c.a)(this,Object(i.a)(t).apply(this,arguments))).url=p.a.getPosterList,e.rowHeader=f,e.addUpdateDialogShow=!1,e}var r;return Object(s.a)(t,e),Object(o.a)(t,[{key:"created",value:function(){this.getData()}},{key:"add",value:function(){this.current={},this.addUpdateDialogShow=!0}},{key:"update",value:(r=Object(n.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.checkCurrentNotNull();case 2:this.addUpdateDialogShow=!0;case 3:case"end":return e.stop()}}),e,this)}))),function(){return r.apply(this,arguments)})},{key:"del",value:function(){var e=this;this.$confirm("此操作将删除海报, 是否继续?",{confirmButtonText:"删除",confirmButtonClass:"el-button--danger el-icon-delete",cancelButtonText:"取消",type:"error"}).then((function(){e.http({url:p.a.deletePoster,data:{posterId:e.current.posterId}}).then((function(){e.$message.success("海报删除成功"),e.getData()})).catch((function(){e.$message.error("海报删除失败")}))})).catch((function(){console.log()}))}},{key:"posterOnOff",value:function(e,t){var r=this;this.$confirm("此操作将".concat(e,"海报, 是否继续?"),{confirmButtonText:"".concat(e),cancelButtonText:"取消",type:"warning"}).then((function(){r.http({url:p.a.posterExamine,data:{posterId:r.current.posterId,enable:t}}).then((function(){r.$message.success("".concat(e,"海报成功")),r.getData()})).catch((function(){r.$message.error("".concat(e,"海报失败"))}))})).catch((function(){console.log()}))}}]),t}(Object(l.c)(d.a)),x=k=Object(u.a)([Object(l.a)({components:{AddUpdateDialog:w}})],k),S=Object(y.a)(x,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("base-table",{ref:"baseTable",attrs:{url:e.url,"row-header":e.rowHeader,"show-page":!1},on:{create:e.add,update:e.update,delete:e.del,onuse:function(t){return e.posterOnOff("启用","1")},offuse:function(t){return e.posterOnOff("停用","-1")}},model:{value:e.current,callback:function(t){e.current=t},expression:"current"}}),e._v(" "),r("add-update-dialog",{attrs:{show:e.addUpdateDialogShow,"dialog-data":e.current},on:{"update:show":function(t){e.addUpdateDialogShow=t},"update-success":e.getData}})],1)}),[],!1,null,null,null);t.default=S.exports},e2e8:function(e,t,r){"use strict";var n=r("d225"),a=r("b0b4"),o=r("308d"),c=r("6bb5"),i=r("4e2b"),s=r("9ab4"),u=r("60a3"),l=r("54c5"),p=r("d257"),d=function(e){function t(){var e;return Object(n.a)(this,t),(e=Object(o.a)(this,Object(c.a)(t).apply(this,arguments))).formRef=null,e.updateLoading=!1,e}return Object(i.a)(t,e),Object(a.a)(t,[{key:"updateSuccess",value:function(e){return e}},{key:"close",value:function(){Object.assign(this.$data,this.$options.data.call(this))}},{key:"confirmType",get:function(){return Object(p.d)(this.dialogData)?"primary":"warning"}},{key:"confirmText",get:function(){return Object(p.d)(this.dialogData)?"添加":"修改"}}]),t}(Object(u.c)(l.a));Object(s.a)([Object(u.e)("show",{type:Boolean,default:!1})],d.prototype,"syncShow",void 0),Object(s.a)([Object(u.d)({default:function(){return{}}})],d.prototype,"dialogData",void 0),Object(s.a)([Object(u.b)("update-success")],d.prototype,"updateSuccess",null),d=Object(s.a)([u.a],d),t.a=d}}]);