(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-782d73c6"],{a4bb:function(e,t,a){e.exports=a("8aae")},a8db:function(e,t,a){"use strict";var n=a("e265"),r=a.n(n),o=a("a4bb"),c=a.n(o);function l(e,t){if(null==e)return{};var a,n,o=function(e,t){if(null==e)return{};var a,n,r={},o=c()(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(r.a){var l=r()(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(o[a]=e[a])}return o}a.d(t,"a",(function(){return l}))},c0bf:function(e,t,a){"use strict";a.r(t);a("96cf");var n=a("3b8d"),r=a("d225"),o=a("b0b4"),c=a("308d"),l=a("6bb5"),i=a("4e2b"),u=a("9ab4"),s=a("60a3"),p=a("9c8d"),d=a("0bc9"),f=[{type:"selection",width:65},{prop:"modular",label:"模块功能",width:240},{label:"帮助内容",width:120,h:function(e,t){var a=t.vm,n=t.row;return e("el-button",{attrs:{type:"text"},on:{click:function(){a.$emit("preview",n)}}},"点击查看")}},{label:"状态",width:120,h:function(e,t){var a=t.row;return e("el-tag",{attrs:{type:"1"===a.status?"success":"info"}},"1"===a.status?"启用":"停用")}}],h=(a("8e6e"),a("ac6a"),a("456d"),a("bd86")),b=a("a8db"),v=a("e2e8"),g=a("d257"),m=a("1a58"),y=a("8256");function w(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function O(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?w(a,!0).forEach((function(t){Object(h.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):w(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var j=function(e){function t(){var e;return Object(r.a)(this,t),(e=Object(c.a)(this,Object(l.a)(t).apply(this,arguments))).help={},e.rulesHelp={modular:[{required:!0,message:"请输入模块功能",trigger:"blur"}],helpContent:[{required:!0,message:"请输入帮助内容",trigger:"blur"}],deviceTypeId:[{required:!0,message:"请选择客户端信息",trigger:"change"}],appTypeId:[{required:!0,message:"请选择设备类型",trigger:"change"}]},e}return Object(i.a)(t,e),Object(o.a)(t,[{key:"opened",value:function(){this.help={},Object(g.d)(this.dialogData)||(this.help=Object.assign({},this.dialogData))}},{key:"update",value:function(){var e=this;this.$refs.formRef.validate((function(t){if(!t)return!1;e.updateLoading=!0;var a=e.help,n=a.helpContent,r=Object(b.a)(a,["helpContent"]);e.http({url:p.a.addHelp,data:O({helpContent:Object(m.a)(n)},r)}).then((function(){e.$message.success("".concat(e.confirmText,"帮助成功")),e.updateLoading=!1,e.syncShow=!1,e.updateSuccess()})).catch((function(t){e.$message.error("".concat(e.confirmText,"帮助失败")),e.updateLoading=!1}))}))}},{key:"title",get:function(){return"".concat(this.confirmText,"帮助")}}]),t}(Object(s.c)(v.a));Object(u.a)([Object(s.d)()],j.prototype,"forms",void 0);var k=j=Object(u.a)([Object(s.a)({components:{Tinymce:y.a}})],j),D=a("2877"),T=Object(D.a)(k,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("base-dialog",{attrs:{visible:e.syncShow,title:e.title},on:{"update:visible":function(t){e.syncShow=t},opened:e.opened},scopedSlots:e._u([{key:"footer",fn:function(){return[a("el-button",{attrs:{type:e.confirmType,loading:e.updateLoading},on:{click:e.update}},[e._v(e._s(e.confirmText))])]},proxy:!0}])},[e._v(" "),a("el-form",{ref:"formRef",attrs:{model:e.help,rules:e.rulesHelp,"status-icon":"","label-width":"130px"}},[e._l(e.forms,(function(t,n){var r=t.form;return a("el-form-item",{key:n,attrs:{label:r.label,prop:r.key}},[a("el-select",{attrs:{placeholder:"请选择"+r.label},model:{value:e.help[r.key],callback:function(t){e.$set(e.help,r.key,t)},expression:"help[form.key]"}},e._l(r.options,(function(e,t){return a("el-option",{key:t,attrs:{value:e.value,label:e.label}})})),1)],1)})),e._v(" "),a("el-form-item",{attrs:{prop:"modular",label:"模块功能"}},[a("el-input",{attrs:{placeholder:"请输入模块功能"},model:{value:e.help.modular,callback:function(t){e.$set(e.help,"modular",t)},expression:"help.modular"}})],1),e._v(" "),a("el-form-item",{attrs:{prop:"helpContent",label:"帮助内容"}},[a("tinymce",{attrs:{placeholder:"请输入帮助内容"},model:{value:e.help.helpContent,callback:function(t){e.$set(e.help,"helpContent",t)},expression:"help.helpContent"}})],1)],2)],1)}),[],!1,null,null,null).exports,x=a("135c"),S=a("c0ac"),$=function(e){function t(){var e;return Object(r.a)(this,t),(e=Object(c.a)(this,Object(l.a)(t).apply(this,arguments))).url=p.a.getHelpList,e.rowHeader=f,e.addUpdateDialogShow=!1,e.previewDialogShow=!1,e.deviceTypes=[],e.appTypes=[],e}var a;return Object(i.a)(t,e),Object(o.a)(t,[{key:"created",value:function(){this.getData(),this.getSelects()}},{key:"getSelects",value:function(){var e=this;this.http({url:p.a.getDeviceTypeList,data:{}}).then((function(t){var a=t.data;e.deviceTypes=a.data.map((function(e){return{label:e.deviceTypeName,value:e.deviceTypeId}})),e.deviceTypes.unshift({label:"全部",value:"0"})}))}},{key:"add",value:function(){this.current={},this.addUpdateDialogShow=!0}},{key:"update",value:(a=Object(n.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.checkCurrentNotNull();case 2:this.addUpdateDialogShow=!0;case 3:case"end":return e.stop()}}),e,this)}))),function(){return a.apply(this,arguments)})},{key:"del",value:function(){var e=this;this.$confirm("此操作将删除帮助, 是否继续?",{confirmButtonText:"删除",confirmButtonClass:"el-button--danger el-icon-delete",cancelButtonText:"取消",type:"error"}).then((function(){e.http({url:p.a.deleteHelp,data:{helpId:e.current.helpId}}).then((function(){e.$message.success("帮助删除成功"),e.getData()})).catch((function(){e.$message.error("帮助删除失败")}))})).catch((function(){console.log()}))}},{key:"posterOnOff",value:function(e,t){var a=this;this.$confirm("此操作将".concat(e,"帮助, 是否继续?"),{confirmButtonText:"".concat(e),cancelButtonText:"取消",type:"warning"}).then((function(){a.http({url:p.a.advertisExamine,data:{advertisId:a.current.AdvertisID,enable:t}}).then((function(){a.$message.success("".concat(e,"帮助成功")),a.getData()})).catch((function(){a.$message.error("".concat(e,"帮助失败"))}))})).catch((function(){console.log()}))}},{key:"preview",value:function(e){var t=e.modular,a=e.helpContent;this.previewDialogShow=!0,this.$refs.previewDialog.setContent(t,a)}},{key:"forms",get:function(){return[{type:S.a.SELECT,form:{label:"客户端",value:"0",key:"deviceTypeId",options:this.deviceTypes}},{type:S.a.SELECT,form:{label:"设备",value:"0",key:"appTypeId",options:[{value:"0",label:"全部"},{value:"1",label:"Android"},{value:"2",label:"PC"},{value:"3",label:"IOS"}]}}]}}]),t}(Object(s.c)(d.a)),C=$=Object(u.a)([Object(s.a)({components:{AddUpdateDialog:T,PreviewDialog:x.a}})],$),_=Object(D.a)(C,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("base-table",{ref:"baseTable",attrs:{url:e.url,"row-header":e.rowHeader,forms:e.forms,"show-page":!1,"show-form":!0,"show-query":!1},on:{create:e.add,update:e.update,delete:e.del,onuse:function(t){return e.posterOnOff("启用","1")},offuse:function(t){return e.posterOnOff("停用","-1")},preview:e.preview},model:{value:e.current,callback:function(t){e.current=t},expression:"current"}}),e._v(" "),a("add-update-dialog",{attrs:{show:e.addUpdateDialogShow,"dialog-data":e.current,forms:e.forms},on:{"update:show":function(t){e.addUpdateDialogShow=t},"update-success":e.getData}}),e._v(" "),a("preview-dialog",{ref:"previewDialog",attrs:{show:e.previewDialogShow},on:{"update:show":function(t){e.previewDialogShow=t}}})],1)}),[],!1,null,null,null);t.default=_.exports},e265:function(e,t,a){e.exports=a("ed33")}}]);