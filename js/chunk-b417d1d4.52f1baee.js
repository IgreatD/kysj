(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-b417d1d4"],{"0bc9":function(e,t,a){"use strict";a("96cf");var n=a("3b8d"),o=a("d225"),r=a("b0b4"),u=a("308d"),l=a("6bb5"),i=a("4e2b"),c=a("9ab4"),s=a("60a3"),d=a("d257"),m=a("54c5"),f=function(e){function t(){var e;return Object(o.a)(this,t),(e=Object(u.a)(this,Object(l.a)(t).apply(this,arguments))).formModel={},e.current={},e}var a;return Object(i.a)(t,e),Object(r.a)(t,[{key:"checkCurrentNotNull",value:function(){var e=this;return new Promise((function(t){Object(d.d)(e.current)?e.$message.warning("请选择需要操作的表格"):t(e.current)}))}},{key:"getData",value:(a=Object(n.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.$nextTick();case 2:return e.next=4,this.baseTable.getData();case 4:case"end":return e.stop()}}),e,this)}))),function(){return a.apply(this,arguments)})}]),t}(Object(s.c)(m.a));Object(c.a)([Object(s.f)()],f.prototype,"baseTable",void 0),f=Object(c.a)([s.a],f),t.a=f},"591e":function(e,t,a){"use strict";a.r(t);a("7f7f"),a("96cf");var n=a("3b8d"),o=a("d225"),r=a("b0b4"),u=a("308d"),l=a("6bb5"),i=a("4e2b"),c=a("9ab4"),s=a("60a3"),d=a("9c8d"),m=(a("a481"),[{type:"selection",width:65},{label:"图标",width:90,h:function(e,t){var a=t.row;return a.icon&&e("base-svg",{attrs:{iconClass:a.icon.replace("el-icon-dl-","")}})}},{label:"父菜单",prop:"pname"},{label:"菜单",prop:"name"},{label:"别名",prop:"otherName"},{label:"菜单url",prop:"url"},{label:"状态",width:120,h:function(e,t){var a="1"===t.row.status;return e("el-tag",{attrs:{type:a?"primary":"info"}},a?"启用":"停用")}}]),f=a("0bc9"),p=(a("28a5"),a("ac6a"),a("e2e8")),b=function(e){function t(){var e;return Object(o.a)(this,t),(e=Object(u.a)(this,Object(l.a)(t).apply(this,arguments))).menuIds=[],e.menus=[],e}return Object(i.a)(t,e),Object(r.a)(t,[{key:"open",value:function(){this.getMenusByMenuId()}},{key:"getMenusByMenuId",value:function(){var e=this;this.loading=!0,this.http({url:d.a.getFunctionsByMenuId,data:{menuId:this.dialogData.menuId}}).then((function(t){e.menus=t.data.data,e.loading=!1,e.menuIds=t.data.keys?t.data.keys.split(","):[]})).catch((function(t){e.loading=!1}))}},{key:"settings",value:function(){var e=this;this.updateLoading=!0,this.http({url:d.a.setFunctionsByMenuId,data:{menuId:this.dialogData.menuId,functionIDs:this.menuIds.join(",")}}).then((function(t){e.$message.success("功能设置成功"),e.updateLoading=!1,e.syncShow=!1})).catch((function(t){e.updateLoading=!1}))}}]),t}(Object(s.c)(p.a,f.a)),h=b=Object(c.a)([s.a],b),g=a("2877"),v=Object(g.a)(h,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("base-dialog",{attrs:{visible:e.syncShow,title:"功能设置"},on:{"update:visible":function(t){e.syncShow=t},opened:e.open},scopedSlots:e._u([{key:"footer",fn:function(){return[a("el-button",{attrs:{type:"primary",loading:e.updateLoading},on:{click:e.settings}},[e._v("设置")])]},proxy:!0}])},[e._v(" "),e.dialogData?a("el-form",{attrs:{"label-width":"100px"}},[a("el-form-item",{attrs:{label:"菜单名称"}},[a("span",[e._v(e._s(e.dialogData.name))])]),e._v(" "),a("el-form-item",{attrs:{label:"菜单功能"}},[a("el-checkbox-group",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],model:{value:e.menuIds,callback:function(t){e.menuIds=t},expression:"menuIds"}},e._l(e.menus,(function(t,n){return a("el-checkbox",{key:n,attrs:{label:t.id}},[e._v(e._s(t.name))])})),1)],1)],1):e._e()],1)}),[],!1,null,null,null).exports,O=(a("8e6e"),a("456d"),a("bd86"));function y(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function j(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?y(a,!0).forEach((function(t){Object(O.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):y(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var w=function(e){function t(){var e;return Object(o.a)(this,t),(e=Object(u.a)(this,Object(l.a)(t).apply(this,arguments))).isAddP=!1,e.formModel={menuName:"",menuUrl:"",menuOtherName:"",menuIcon:"",menuSort:"1",menuRemark:"",menuPid:"",menuId:""},e}return Object(i.a)(t,e),Object(r.a)(t,[{key:"add",value:function(){var e=this;this.updateLoading=!0,this.http({url:d.a.addMenu,data:j({},this.formModel)}).then((function(){e.$message.success("菜单添加成功"),e.syncShow=!1,e.updateLoading=!1,e.updateSuccess()})).catch((function(t){e.$message.error(t.message||"菜单添加失败"),e.updateLoading=!1}))}}]),t}(Object(s.c)(p.a));Object(c.a)([Object(s.d)()],w.prototype,"pMenus",void 0);var M=w=Object(c.a)([s.a],w),k=Object(g.a)(M,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("base-dialog",{attrs:{visible:e.syncShow,title:"添加菜单"},on:{"update:visible":function(t){e.syncShow=t}},scopedSlots:e._u([{key:"footer",fn:function(){return[a("el-button",{attrs:{type:"primary",loading:e.updateLoading},on:{click:e.add}},[e._v("添加")])]},proxy:!0}])},[e._v(" "),a("el-form",{ref:"form",attrs:{"label-width":"120px",model:e.formModel}},[a("el-form-item",{attrs:{label:"父菜单名称"}},[e.isAddP?e._e():[a("el-select",{attrs:{placeholder:"请选择菜单名称"},model:{value:e.formModel.menuPid,callback:function(t){e.$set(e.formModel,"menuPid",t)},expression:"formModel.menuPid"}},e._l(e.pMenus,(function(e){return a("el-option",{key:e.menuId,attrs:{label:e.name,value:e.menuId}})})),1)],e._v(" "),e.isAddP?[a("el-input",{staticStyle:{width:"85%"},attrs:{placeholder:"请输入父菜单名称"},model:{value:e.formModel.menuName,callback:function(t){e.$set(e.formModel,"menuName",t)},expression:"formModel.menuName"}})]:e._e(),e._v(" "),a("el-button",{attrs:{type:e.isAddP?"ifno":"primary"},on:{click:function(t){e.isAddP=!e.isAddP}}},[e._v(e._s(e.isAddP?"取消":"添加"))])],2),e._v(" "),e.isAddP?e._e():a("el-form-item",{attrs:{label:"子菜单名称"}},[a("el-input",{attrs:{placeholder:"请输入子菜单名称"},model:{value:e.formModel.menuName,callback:function(t){e.$set(e.formModel,"menuName",t)},expression:"formModel.menuName"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"菜单url"}},[a("el-input",{attrs:{placeholder:"请输入菜单url"},model:{value:e.formModel.menuUrl,callback:function(t){e.$set(e.formModel,"menuUrl",t)},expression:"formModel.menuUrl"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"菜单图标"}},[a("el-input",{attrs:{placeholder:"请输入菜单图标"},model:{value:e.formModel.menuIcon,callback:function(t){e.$set(e.formModel,"menuIcon",t)},expression:"formModel.menuIcon"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"菜单别名"}},[a("el-input",{attrs:{placeholder:"请输入菜单别名"},model:{value:e.formModel.menuOtherName,callback:function(t){e.$set(e.formModel,"menuOtherName",t)},expression:"formModel.menuOtherName"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"菜单序号"}},[a("el-input",{attrs:{placeholder:"请输入菜单序号"},model:{value:e.formModel.menuSort,callback:function(t){e.$set(e.formModel,"menuSort",t)},expression:"formModel.menuSort"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"备注"}},[a("el-input",{attrs:{placeholder:"请输入备注"},model:{value:e.formModel.menuRemark,callback:function(t){e.$set(e.formModel,"menuRemark",t)},expression:"formModel.menuRemark"}})],1)],1)],1)}),[],!1,null,null,null).exports,_=(a("55dd"),a("d257")),x=function(e){function t(){var e;return Object(o.a)(this,t),(e=Object(u.a)(this,Object(l.a)(t).apply(this,arguments))).formModel={},e}return Object(i.a)(t,e),Object(r.a)(t,[{key:"initFormModel",value:function(e){for(var t in e)if(e.hasOwnProperty(t)){var a=e[t];Object(_.d)(e)||this.$set(this.formModel,t,a)}}},{key:"update",value:function(){var e=this;this.updateLoading=!0,this.http({url:d.a.addMenu,data:{menuName:this.formModel.name,menuUrl:this.formModel.url,menuOtherName:this.formModel.otherName||"",menuIcon:this.formModel.icon,menuId:this.formModel.menuId,menuPid:this.formModel.menuPid,menuSort:this.formModel.sort||"1",menuRemark:""}}).then((function(){e.$message.success("菜单修改成功"),e.syncShow=!1,e.updateLoading=!1,e.updateSuccess()})).catch((function(t){e.$message.error(t.message||"菜单修改失败"),e.updateLoading=!1}))}}]),t}(Object(s.c)(p.a));Object(c.a)([Object(s.h)("dialogData")],x.prototype,"initFormModel",null);var S=x=Object(c.a)([s.a],x),D=Object(g.a)(S,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("base-dialog",{attrs:{visible:e.syncShow,title:"修改菜单"},on:{"update:visible":function(t){e.syncShow=t}},scopedSlots:e._u([{key:"footer",fn:function(){return[a("el-button",{attrs:{type:"warning",loading:e.updateLoading},on:{click:e.update}},[e._v("修改")])]},proxy:!0}])},[e._v(" "),a("el-form",{ref:"form",attrs:{model:e.formModel,"label-width":"120px"}},[a("el-form-item",{attrs:{label:"菜单名称"}},[a("el-input",{attrs:{placeholder:"请输入菜单名称"},model:{value:e.formModel.name,callback:function(t){e.$set(e.formModel,"name",t)},expression:"formModel.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"菜单图标"}},[a("el-input",{attrs:{placeholder:"请输入菜单图标"},model:{value:e.formModel.icon,callback:function(t){e.$set(e.formModel,"icon",t)},expression:"formModel.icon"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"菜单别名"}},[a("el-input",{attrs:{placeholder:"请输入菜单别名"},model:{value:e.formModel.otherName,callback:function(t){e.$set(e.formModel,"otherName",t)},expression:"formModel.otherName"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"菜单url"}},[a("el-input",{attrs:{placeholder:"请输入菜单url"},model:{value:e.formModel.url,callback:function(t){e.$set(e.formModel,"url",t)},expression:"formModel.url"}})],1)],1)],1)}),[],!1,null,null,null).exports,$=function(e){function t(){var e;return Object(o.a)(this,t),(e=Object(u.a)(this,Object(l.a)(t).apply(this,arguments))).settingDialogShow=!1,e.addDialogShow=!1,e.updateDialogShow=!1,e.pMenus=[],e}var a,c,s;return Object(i.a)(t,e),Object(r.a)(t,[{key:"mounted",value:function(){this.init()}},{key:"init",value:(s=Object(n.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.getData();case 2:this.pMenus=this.baseTable.tableData.filter((function(e){return!e.pname}));case 3:case"end":return e.stop()}}),e,this)}))),function(){return s.apply(this,arguments)})},{key:"functionSet",value:(c=Object(n.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.checkCurrentNotNull();case 2:this.settingDialogShow=!0;case 3:case"end":return e.stop()}}),e,this)}))),function(){return c.apply(this,arguments)})},{key:"add",value:function(){this.addDialogShow=!0}},{key:"update",value:(a=Object(n.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.checkCurrentNotNull();case 2:this.updateDialogShow=!0;case 3:case"end":return e.stop()}}),e,this)}))),function(){return a.apply(this,arguments)})},{key:"del",value:function(){var e=this;this.checkCurrentNotNull().then((function(){e.$confirm("此操作将删除：".concat(e.current.name,", 是否继续?"),"删除菜单",{confirmButtonText:"删除",cancelButtonText:"取消",type:"warning"}).then((function(){e.http({url:d.a.deleteMenu,data:{menuIds:e.current.menuId}}).then((function(){e.$message.success("菜单删除成功"),e.getData()})).catch((function(t){e.$message.error(t.message||"菜单删除失败")}))}))}))}},{key:"url",get:function(){return d.a.getMenus}},{key:"rowHeader",get:function(){return m}}]),t}(Object(s.c)(f.a)),I=$=Object(c.a)([Object(s.a)({components:{SettingDialog:v,AddDialog:k,UpdateDialog:D}})],$),N=Object(g.a)(I,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("base-table",{ref:"baseTable",attrs:{"row-header":e.rowHeader,"show-query":!1,"show-functions":!0,url:e.url},on:{delete:e.del,update:e.update,create:e.add,functionset:e.functionSet},model:{value:e.current,callback:function(t){e.current=t},expression:"current"}}),e._v(" "),a("setting-dialog",{attrs:{show:e.settingDialogShow,"dialog-data":e.current},on:{"update:show":function(t){e.settingDialogShow=t},"update:dialogData":function(t){e.current=t},"update:dialog-data":function(t){e.current=t},"update-success":e.getData}}),e._v(" "),a("add-dialog",{attrs:{show:e.addDialogShow,"p-menus":e.pMenus},on:{"update:show":function(t){e.addDialogShow=t},"update-success":e.getData}}),e._v(" "),a("update-dialog",{attrs:{show:e.updateDialogShow,"dialog-data":e.current},on:{"update:show":function(t){e.updateDialogShow=t},"update:dialogData":function(t){e.current=t},"update:dialog-data":function(t){e.current=t},"update-success":e.getData}})],1)}),[],!1,null,null,null);t.default=N.exports},e2e8:function(e,t,a){"use strict";var n=a("d225"),o=a("b0b4"),r=a("308d"),u=a("6bb5"),l=a("4e2b"),i=a("9ab4"),c=a("60a3"),s=a("54c5"),d=a("d257"),m=function(e){function t(){var e;return Object(n.a)(this,t),(e=Object(r.a)(this,Object(u.a)(t).apply(this,arguments))).formRef=null,e.updateLoading=!1,e}return Object(l.a)(t,e),Object(o.a)(t,[{key:"updateSuccess",value:function(e){return e}},{key:"close",value:function(){Object.assign(this.$data,this.$options.data.call(this))}},{key:"confirmType",get:function(){return Object(d.d)(this.dialogData)?"primary":"warning"}},{key:"confirmText",get:function(){return Object(d.d)(this.dialogData)?"添加":"修改"}}]),t}(Object(c.c)(s.a));Object(i.a)([Object(c.e)("show",{type:Boolean,default:!1})],m.prototype,"syncShow",void 0),Object(i.a)([Object(c.d)({default:function(){return{}}})],m.prototype,"dialogData",void 0),Object(i.a)([Object(c.b)("update-success")],m.prototype,"updateSuccess",null),m=Object(i.a)([c.a],m),t.a=m}}]);