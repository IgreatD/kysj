(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-xmldom"],{"29d8":function(e,t,n){function r(e){this.options=e||{locator:{}}}function i(){this.cdata=!1}function o(e,t){t.lineNumber=e.lineNumber,t.columnNumber=e.columnNumber}function a(e){if(e)return"\n@"+(e.systemId||"")+"#[line:"+e.lineNumber+",col:"+e.columnNumber+"]"}function u(e,t,n){return"string"==typeof e?e.substr(t,n):e.length>=t+n||t?new java.lang.String(e,t,n)+"":e}function s(e,t){e.currentElement?e.currentElement.appendChild(t):e.doc.appendChild(t)}r.prototype.parseFromString=function(e,t){var n=this.options,r=new c,o=n.domBuilder||new i,u=n.errorHandler,s=n.locator,l=n.xmlns||{},h={lt:"<",gt:">",amp:"&",quot:'"',apos:"'"};return s&&o.setDocumentLocator(s),r.errorHandler=function(e,t,n){if(!e){if(t instanceof i)return t;e=t}var r={},o=e instanceof Function;function u(t){var i=e[t];!i&&o&&(i=2==e.length?function(n){e(t,n)}:e),r[t]=i&&function(e){i("[xmldom "+t+"]\t"+e+a(n))}||function(){}}return n=n||{},u("warning"),u("error"),u("fatalError"),r}(u,o,s),r.domBuilder=n.domBuilder||o,/\/x?html?$/.test(t)&&(h.nbsp=" ",h.copy="©",l[""]="http://www.w3.org/1999/xhtml"),l.xml=l.xml||"http://www.w3.org/XML/1998/namespace",e?r.parse(e,l,h):r.errorHandler.error("invalid doc source"),o.doc},i.prototype={startDocument:function(){this.doc=(new l).createDocument(null,null,null),this.locator&&(this.doc.documentURI=this.locator.systemId)},startElement:function(e,t,n,r){var i=this.doc,a=i.createElementNS(e,n||t),u=r.length;s(this,a),this.currentElement=a,this.locator&&o(this.locator,a);for(var c=0;c<u;c++){e=r.getURI(c);var l=r.getValue(c),h=(n=r.getQName(c),i.createAttributeNS(e,n));this.locator&&o(r.getLocator(c),h),h.value=h.nodeValue=l,a.setAttributeNode(h)}},endElement:function(e,t,n){var r=this.currentElement;r.tagName;this.currentElement=r.parentNode},startPrefixMapping:function(e,t){},endPrefixMapping:function(e){},processingInstruction:function(e,t){var n=this.doc.createProcessingInstruction(e,t);this.locator&&o(this.locator,n),s(this,n)},ignorableWhitespace:function(e,t,n){},characters:function(e,t,n){if(e=u.apply(this,arguments)){if(this.cdata)var r=this.doc.createCDATASection(e);else r=this.doc.createTextNode(e);this.currentElement?this.currentElement.appendChild(r):/^\s*$/.test(e)&&this.doc.appendChild(r),this.locator&&o(this.locator,r)}},skippedEntity:function(e){},endDocument:function(){this.doc.normalize()},setDocumentLocator:function(e){(this.locator=e)&&(e.lineNumber=0)},comment:function(e,t,n){e=u.apply(this,arguments);var r=this.doc.createComment(e);this.locator&&o(this.locator,r),s(this,r)},startCDATA:function(){this.cdata=!0},endCDATA:function(){this.cdata=!1},startDTD:function(e,t,n){var r=this.doc.implementation;if(r&&r.createDocumentType){var i=r.createDocumentType(e,t,n);this.locator&&o(this.locator,i),s(this,i)}},warning:function(e){console.warn("[xmldom warning]\t"+e,a(this.locator))},error:function(e){console.error("[xmldom error]\t"+e,a(this.locator))},fatalError:function(e){throw console.error("[xmldom fatalError]\t"+e,a(this.locator)),e}},"endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(/\w+/g,(function(e){i.prototype[e]=function(){return null}}));var c=n("d61d").XMLReader,l=t.DOMImplementation=n("749c").DOMImplementation;t.XMLSerializer=n("749c").XMLSerializer,t.DOMParser=r},"749c":function(e,t){function n(e,t){for(var n in e)t[n]=e[n]}function r(e,t){var r=e.prototype;if(Object.create){var i=Object.create(t.prototype);r.__proto__=i}if(!(r instanceof t)){function o(){}o.prototype=t.prototype,n(r,o=new o),e.prototype=r=o}r.constructor!=e&&("function"!=typeof e&&console.error("unknow Class:"+e),r.constructor=e)}var i="http://www.w3.org/1999/xhtml",o={},a=o.ELEMENT_NODE=1,u=o.ATTRIBUTE_NODE=2,s=o.TEXT_NODE=3,c=o.CDATA_SECTION_NODE=4,l=o.ENTITY_REFERENCE_NODE=5,h=o.ENTITY_NODE=6,d=o.PROCESSING_INSTRUCTION_NODE=7,f=o.COMMENT_NODE=8,m=o.DOCUMENT_NODE=9,p=o.DOCUMENT_TYPE_NODE=10,N=o.DOCUMENT_FRAGMENT_NODE=11,g=o.NOTATION_NODE=12,w={},v={},b=(w.INDEX_SIZE_ERR=(v[1]="Index size error",1),w.DOMSTRING_SIZE_ERR=(v[2]="DOMString size error",2),w.HIERARCHY_REQUEST_ERR=(v[3]="Hierarchy request error",3)),E=(w.WRONG_DOCUMENT_ERR=(v[4]="Wrong document",4),w.INVALID_CHARACTER_ERR=(v[5]="Invalid character",5),w.NO_DATA_ALLOWED_ERR=(v[6]="No data allowed",6),w.NO_MODIFICATION_ALLOWED_ERR=(v[7]="No modification allowed",7),w.NOT_FOUND_ERR=(v[8]="Not found",8)),x=(w.NOT_SUPPORTED_ERR=(v[9]="Not supported",9),w.INUSE_ATTRIBUTE_ERR=(v[10]="Attribute in use",10));w.INVALID_STATE_ERR=(v[11]="Invalid state",11),w.SYNTAX_ERR=(v[12]="Syntax error",12),w.INVALID_MODIFICATION_ERR=(v[13]="Invalid modification",13),w.NAMESPACE_ERR=(v[14]="Invalid namespace",14),w.INVALID_ACCESS_ERR=(v[15]="Invalid access",15);function D(e,t){if(t instanceof Error)var n=t;else n=this,Error.call(this,v[e]),this.message=v[e],Error.captureStackTrace&&Error.captureStackTrace(this,D);return n.code=e,t&&(this.message=this.message+": "+t),n}function y(){}function T(e,t){this._node=e,this._refresh=t,S(this)}function S(e){var t=e._node._inc||e._node.ownerDocument._inc;if(e._inc!=t){var r=e._refresh(e._node);ne(e,"length",r.length),n(r,e),e._inc=t}}function C(){}function _(e,t){for(var n=e.length;n--;)if(e[n]===t)return n}function I(e,t,n,r){if(r?t[_(t,r)]=n:t[t.length++]=n,e){n.ownerElement=e;var i=e.ownerDocument;i&&(r&&U(i,e,r),function(e,t,n){e&&e._inc++,"http://www.w3.org/2000/xmlns/"==n.namespaceURI&&(t._nsMap[n.prefix?n.localName:""]=n.value)}(i,e,n))}}function A(e,t,n){var r=_(t,n);if(!(r>=0))throw D(E,new Error(e.tagName+"@"+n));for(var i=t.length-1;r<i;)t[r]=t[++r];if(t.length=i,e){var o=e.ownerDocument;o&&(U(o,e,n),n.ownerElement=null)}}function R(e){if(this._features={},e)for(var t in e)this._features=e[t]}function O(){}function M(e){return("<"==e?"&lt;":">"==e&&"&gt;")||"&"==e&&"&amp;"||'"'==e&&"&quot;"||"&#"+e.charCodeAt()+";"}function F(e,t){if(t(e))return!0;if(e=e.firstChild)do{if(F(e,t))return!0}while(e=e.nextSibling)}function k(){}function U(e,t,n,r){e&&e._inc++,"http://www.w3.org/2000/xmlns/"==n.namespaceURI&&delete t._nsMap[n.prefix?n.localName:""]}function L(e,t,n){if(e&&e._inc){e._inc++;var r=t.childNodes;if(n)r[r.length++]=n;else{for(var i=t.firstChild,o=0;i;)r[o++]=i,i=i.nextSibling;r.length=o}}}function B(e,t){var n=t.previousSibling,r=t.nextSibling;return n?n.nextSibling=r:e.firstChild=r,r?r.previousSibling=n:e.lastChild=n,L(e.ownerDocument,e),t}function P(e,t,n){var r=t.parentNode;if(r&&r.removeChild(t),t.nodeType===N){var i=t.firstChild;if(null==i)return t;var o=t.lastChild}else i=o=t;var a=n?n.previousSibling:e.lastChild;i.previousSibling=a,o.nextSibling=n,a?a.nextSibling=i:e.firstChild=i,null==n?e.lastChild=o:n.previousSibling=o;do{i.parentNode=e}while(i!==o&&(i=i.nextSibling));return L(e.ownerDocument||e,e),t.nodeType==N&&(t.firstChild=t.lastChild=null),t}function $(){this._nsMap={}}function V(){}function q(){}function X(){}function j(){}function z(){}function H(){}function Y(){}function W(){}function G(){}function Q(){}function Z(){}function J(){}function K(e,t){var n=[],r=9==this.nodeType?this.documentElement:this,i=r.prefix,o=r.namespaceURI;if(o&&null==i&&null==(i=r.lookupPrefix(o)))var a=[{namespace:o,prefix:null}];return te(this,n,e,t,a),n.join("")}function ee(e,t,n){var r=e.prefix||"",i=e.namespaceURI;if(!r&&!i)return!1;if("xml"===r&&"http://www.w3.org/XML/1998/namespace"===i||"http://www.w3.org/2000/xmlns/"==i)return!1;for(var o=n.length;o--;){var a=n[o];if(a.prefix==r)return a.namespace!=i}return!0}function te(e,t,n,r,o){if(r){if(!(e=r(e)))return;if("string"==typeof e)return void t.push(e)}switch(e.nodeType){case a:o||(o=[]);o.length;var h=e.attributes,g=h.length,w=e.firstChild,v=e.tagName;n=i===e.namespaceURI||n,t.push("<",v);for(var b=0;b<g;b++){"xmlns"==(E=h.item(b)).prefix?o.push({prefix:E.localName,namespace:E.value}):"xmlns"==E.nodeName&&o.push({prefix:"",namespace:E.value})}for(b=0;b<g;b++){var E;if(ee(E=h.item(b),0,o)){var x=E.prefix||"",D=E.namespaceURI,y=x?" xmlns:"+x:" xmlns";t.push(y,'="',D,'"'),o.push({prefix:x,namespace:D})}te(E,t,n,r,o)}if(ee(e,0,o)){x=e.prefix||"",D=e.namespaceURI,y=x?" xmlns:"+x:" xmlns";t.push(y,'="',D,'"'),o.push({prefix:x,namespace:D})}if(w||n&&!/^(?:meta|link|img|br|hr|input)$/i.test(v)){if(t.push(">"),n&&/^script$/i.test(v))for(;w;)w.data?t.push(w.data):te(w,t,n,r,o),w=w.nextSibling;else for(;w;)te(w,t,n,r,o),w=w.nextSibling;t.push("</",v,">")}else t.push("/>");return;case m:case N:for(w=e.firstChild;w;)te(w,t,n,r,o),w=w.nextSibling;return;case u:return t.push(" ",e.name,'="',e.value.replace(/[<&"]/g,M),'"');case s:return t.push(e.data.replace(/[<&]/g,M));case c:return t.push("<![CDATA[",e.data,"]]>");case f:return t.push("\x3c!--",e.data,"--\x3e");case p:var T=e.publicId,S=e.systemId;if(t.push("<!DOCTYPE ",e.name),T)t.push(' PUBLIC "',T),S&&"."!=S&&t.push('" "',S),t.push('">');else if(S&&"."!=S)t.push(' SYSTEM "',S,'">');else{var C=e.internalSubset;C&&t.push(" [",C,"]"),t.push(">")}return;case d:return t.push("<?",e.target," ",e.data,"?>");case l:return t.push("&",e.nodeName,";");default:t.push("??",e.nodeName)}}function ne(e,t,n){e[t]=n}D.prototype=Error.prototype,n(w,D),y.prototype={length:0,item:function(e){return this[e]||null},toString:function(e,t){for(var n=[],r=0;r<this.length;r++)te(this[r],n,e,t);return n.join("")}},T.prototype.item=function(e){return S(this),this[e]},r(T,y),C.prototype={length:0,item:y.prototype.item,getNamedItem:function(e){for(var t=this.length;t--;){var n=this[t];if(n.nodeName==e)return n}},setNamedItem:function(e){var t=e.ownerElement;if(t&&t!=this._ownerElement)throw new D(x);var n=this.getNamedItem(e.nodeName);return I(this._ownerElement,this,e,n),n},setNamedItemNS:function(e){var t,n=e.ownerElement;if(n&&n!=this._ownerElement)throw new D(x);return t=this.getNamedItemNS(e.namespaceURI,e.localName),I(this._ownerElement,this,e,t),t},removeNamedItem:function(e){var t=this.getNamedItem(e);return A(this._ownerElement,this,t),t},removeNamedItemNS:function(e,t){var n=this.getNamedItemNS(e,t);return A(this._ownerElement,this,n),n},getNamedItemNS:function(e,t){for(var n=this.length;n--;){var r=this[n];if(r.localName==t&&r.namespaceURI==e)return r}return null}},R.prototype={hasFeature:function(e,t){var n=this._features[e.toLowerCase()];return!(!n||t&&!(t in n))},createDocument:function(e,t,n){var r=new k;if(r.implementation=this,r.childNodes=new y,r.doctype=n,n&&r.appendChild(n),t){var i=r.createElementNS(e,t);r.appendChild(i)}return r},createDocumentType:function(e,t,n){var r=new H;return r.name=e,r.nodeName=e,r.publicId=t,r.systemId=n,r}},O.prototype={firstChild:null,lastChild:null,previousSibling:null,nextSibling:null,attributes:null,parentNode:null,childNodes:null,ownerDocument:null,nodeValue:null,namespaceURI:null,prefix:null,localName:null,insertBefore:function(e,t){return P(this,e,t)},replaceChild:function(e,t){this.insertBefore(e,t),t&&this.removeChild(t)},removeChild:function(e){return B(this,e)},appendChild:function(e){return this.insertBefore(e,null)},hasChildNodes:function(){return null!=this.firstChild},cloneNode:function(e){return function e(t,n,r){var i=new n.constructor;for(var o in n){var s=n[o];"object"!=typeof s&&s!=i[o]&&(i[o]=s)}n.childNodes&&(i.childNodes=new y);i.ownerDocument=t;switch(i.nodeType){case a:var c=n.attributes,l=i.attributes=new C,h=c.length;l._ownerElement=i;for(var d=0;d<h;d++)i.setAttributeNode(e(t,c.item(d),!0));break;case u:r=!0}if(r)for(var f=n.firstChild;f;)i.appendChild(e(t,f,r)),f=f.nextSibling;return i}(this.ownerDocument||this,this,e)},normalize:function(){for(var e=this.firstChild;e;){var t=e.nextSibling;t&&t.nodeType==s&&e.nodeType==s?(this.removeChild(t),e.appendData(t.data)):(e.normalize(),e=t)}},isSupported:function(e,t){return this.ownerDocument.implementation.hasFeature(e,t)},hasAttributes:function(){return this.attributes.length>0},lookupPrefix:function(e){for(var t=this;t;){var n=t._nsMap;if(n)for(var r in n)if(n[r]==e)return r;t=t.nodeType==u?t.ownerDocument:t.parentNode}return null},lookupNamespaceURI:function(e){for(var t=this;t;){var n=t._nsMap;if(n&&e in n)return n[e];t=t.nodeType==u?t.ownerDocument:t.parentNode}return null},isDefaultNamespace:function(e){return null==this.lookupPrefix(e)}},n(o,O),n(o,O.prototype),k.prototype={nodeName:"#document",nodeType:m,doctype:null,documentElement:null,_inc:1,insertBefore:function(e,t){if(e.nodeType==N){for(var n=e.firstChild;n;){var r=n.nextSibling;this.insertBefore(n,t),n=r}return e}return null==this.documentElement&&e.nodeType==a&&(this.documentElement=e),P(this,e,t),e.ownerDocument=this,e},removeChild:function(e){return this.documentElement==e&&(this.documentElement=null),B(this,e)},importNode:function(e,t){return function e(t,n,r){var i;switch(n.nodeType){case a:(i=n.cloneNode(!1)).ownerDocument=t;case N:break;case u:r=!0}i||(i=n.cloneNode(!1));i.ownerDocument=t;i.parentNode=null;if(r)for(var o=n.firstChild;o;)i.appendChild(e(t,o,r)),o=o.nextSibling;return i}(this,e,t)},getElementById:function(e){var t=null;return F(this.documentElement,(function(n){if(n.nodeType==a&&n.getAttribute("id")==e)return t=n,!0})),t},createElement:function(e){var t=new $;return t.ownerDocument=this,t.nodeName=e,t.tagName=e,t.childNodes=new y,(t.attributes=new C)._ownerElement=t,t},createDocumentFragment:function(){var e=new Q;return e.ownerDocument=this,e.childNodes=new y,e},createTextNode:function(e){var t=new X;return t.ownerDocument=this,t.appendData(e),t},createComment:function(e){var t=new j;return t.ownerDocument=this,t.appendData(e),t},createCDATASection:function(e){var t=new z;return t.ownerDocument=this,t.appendData(e),t},createProcessingInstruction:function(e,t){var n=new Z;return n.ownerDocument=this,n.tagName=n.target=e,n.nodeValue=n.data=t,n},createAttribute:function(e){var t=new V;return t.ownerDocument=this,t.name=e,t.nodeName=e,t.localName=e,t.specified=!0,t},createEntityReference:function(e){var t=new G;return t.ownerDocument=this,t.nodeName=e,t},createElementNS:function(e,t){var n=new $,r=t.split(":"),i=n.attributes=new C;return n.childNodes=new y,n.ownerDocument=this,n.nodeName=t,n.tagName=t,n.namespaceURI=e,2==r.length?(n.prefix=r[0],n.localName=r[1]):n.localName=t,i._ownerElement=n,n},createAttributeNS:function(e,t){var n=new V,r=t.split(":");return n.ownerDocument=this,n.nodeName=t,n.name=t,n.namespaceURI=e,n.specified=!0,2==r.length?(n.prefix=r[0],n.localName=r[1]):n.localName=t,n}},r(k,O),$.prototype={nodeType:a,hasAttribute:function(e){return null!=this.getAttributeNode(e)},getAttribute:function(e){var t=this.getAttributeNode(e);return t&&t.value||""},getAttributeNode:function(e){return this.attributes.getNamedItem(e)},setAttribute:function(e,t){var n=this.ownerDocument.createAttribute(e);n.value=n.nodeValue=""+t,this.setAttributeNode(n)},removeAttribute:function(e){var t=this.getAttributeNode(e);t&&this.removeAttributeNode(t)},appendChild:function(e){return e.nodeType===N?this.insertBefore(e,null):function(e,t){var n=t.parentNode;if(n){var r=e.lastChild;n.removeChild(t);r=e.lastChild}return r=e.lastChild,t.parentNode=e,t.previousSibling=r,t.nextSibling=null,r?r.nextSibling=t:e.firstChild=t,e.lastChild=t,L(e.ownerDocument,e,t),t}(this,e)},setAttributeNode:function(e){return this.attributes.setNamedItem(e)},setAttributeNodeNS:function(e){return this.attributes.setNamedItemNS(e)},removeAttributeNode:function(e){return this.attributes.removeNamedItem(e.nodeName)},removeAttributeNS:function(e,t){var n=this.getAttributeNodeNS(e,t);n&&this.removeAttributeNode(n)},hasAttributeNS:function(e,t){return null!=this.getAttributeNodeNS(e,t)},getAttributeNS:function(e,t){var n=this.getAttributeNodeNS(e,t);return n&&n.value||""},setAttributeNS:function(e,t,n){var r=this.ownerDocument.createAttributeNS(e,t);r.value=r.nodeValue=""+n,this.setAttributeNode(r)},getAttributeNodeNS:function(e,t){return this.attributes.getNamedItemNS(e,t)},getElementsByTagName:function(e){return new T(this,(function(t){var n=[];return F(t,(function(r){r===t||r.nodeType!=a||"*"!==e&&r.tagName!=e||n.push(r)})),n}))},getElementsByTagNameNS:function(e,t){return new T(this,(function(n){var r=[];return F(n,(function(i){i===n||i.nodeType!==a||"*"!==e&&i.namespaceURI!==e||"*"!==t&&i.localName!=t||r.push(i)})),r}))}},k.prototype.getElementsByTagName=$.prototype.getElementsByTagName,k.prototype.getElementsByTagNameNS=$.prototype.getElementsByTagNameNS,r($,O),V.prototype.nodeType=u,r(V,O),q.prototype={data:"",substringData:function(e,t){return this.data.substring(e,e+t)},appendData:function(e){e=this.data+e,this.nodeValue=this.data=e,this.length=e.length},insertData:function(e,t){this.replaceData(e,0,t)},appendChild:function(e){throw new Error(v[b])},deleteData:function(e,t){this.replaceData(e,t,"")},replaceData:function(e,t,n){n=this.data.substring(0,e)+n+this.data.substring(e+t),this.nodeValue=this.data=n,this.length=n.length}},r(q,O),X.prototype={nodeName:"#text",nodeType:s,splitText:function(e){var t=this.data,n=t.substring(e);t=t.substring(0,e),this.data=this.nodeValue=t,this.length=t.length;var r=this.ownerDocument.createTextNode(n);return this.parentNode&&this.parentNode.insertBefore(r,this.nextSibling),r}},r(X,q),j.prototype={nodeName:"#comment",nodeType:f},r(j,q),z.prototype={nodeName:"#cdata-section",nodeType:c},r(z,q),H.prototype.nodeType=p,r(H,O),Y.prototype.nodeType=g,r(Y,O),W.prototype.nodeType=h,r(W,O),G.prototype.nodeType=l,r(G,O),Q.prototype.nodeName="#document-fragment",Q.prototype.nodeType=N,r(Q,O),Z.prototype.nodeType=d,r(Z,O),J.prototype.serializeToString=function(e,t,n){return K.call(e,t,n)},O.prototype.toString=K;try{if(Object.defineProperty){Object.defineProperty(T.prototype,"length",{get:function(){return S(this),this.$$length}}),Object.defineProperty(O.prototype,"textContent",{get:function(){return function e(t){switch(t.nodeType){case a:case N:var n=[];for(t=t.firstChild;t;)7!==t.nodeType&&8!==t.nodeType&&n.push(e(t)),t=t.nextSibling;return n.join("");default:return t.nodeValue}}(this)},set:function(e){switch(this.nodeType){case a:case N:for(;this.firstChild;)this.removeChild(this.firstChild);(e||String(e))&&this.appendChild(this.ownerDocument.createTextNode(e));break;default:this.data=e,this.value=e,this.nodeValue=e}}}),ne=function(e,t,n){e["$$"+t]=n}}}catch(e){}t.DOMImplementation=R,t.XMLSerializer=J},d61d:function(e,t){var n=/[A-Z_a-z\xC0-\xD6\xD8-\xF6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/,r=new RegExp("[\\-\\.0-9"+n.source.slice(1,-1)+"\\u00B7\\u0300-\\u036F\\u203F-\\u2040]"),i=new RegExp("^"+n.source+r.source+"*(?::"+n.source+r.source+"*)?$"),o=0,a=1,u=2,s=3,c=4,l=5,h=6,d=7;function f(){}function m(e,t){return t.lineNumber=e.lineNumber,t.columnNumber=e.columnNumber,t}function p(e,t,n,r,i,f){for(var m,p=++t,N=o;;){var g=e.charAt(p);switch(g){case"=":if(N===a)m=e.slice(t,p),N=s;else{if(N!==u)throw new Error("attribute equal must after attrName");N=s}break;case"'":case'"':if(N===s||N===a){if(N===a&&(f.warning('attribute value must after "="'),m=e.slice(t,p)),t=p+1,!((p=e.indexOf(g,t))>0))throw new Error("attribute value no end '"+g+"' match");w=e.slice(t,p).replace(/&#?\w+;/g,i),n.add(m,w,t-1),N=l}else{if(N!=c)throw new Error('attribute value must after "="');w=e.slice(t,p).replace(/&#?\w+;/g,i),n.add(m,w,t),f.warning('attribute "'+m+'" missed start quot('+g+")!!"),t=p+1,N=l}break;case"/":switch(N){case o:n.setTagName(e.slice(t,p));case l:case h:case d:N=d,n.closed=!0;case c:case a:case u:break;default:throw new Error("attribute invalid close char('/')")}break;case"":return f.error("unexpected end of input"),N==o&&n.setTagName(e.slice(t,p)),p;case">":switch(N){case o:n.setTagName(e.slice(t,p));case l:case h:case d:break;case c:case a:"/"===(w=e.slice(t,p)).slice(-1)&&(n.closed=!0,w=w.slice(0,-1));case u:N===u&&(w=m),N==c?(f.warning('attribute "'+w+'" missed quot(")!!'),n.add(m,w.replace(/&#?\w+;/g,i),t)):("http://www.w3.org/1999/xhtml"===r[""]&&w.match(/^(?:disabled|checked|selected)$/i)||f.warning('attribute "'+w+'" missed value!! "'+w+'" instead!!'),n.add(w,w,t));break;case s:throw new Error("attribute value missed!!")}return p;case"":g=" ";default:if(g<=" ")switch(N){case o:n.setTagName(e.slice(t,p)),N=h;break;case a:m=e.slice(t,p),N=u;break;case c:var w=e.slice(t,p).replace(/&#?\w+;/g,i);f.warning('attribute "'+w+'" missed quot(")!!'),n.add(m,w,t);case l:N=h}else switch(N){case u:n.tagName;"http://www.w3.org/1999/xhtml"===r[""]&&m.match(/^(?:disabled|checked|selected)$/i)||f.warning('attribute "'+m+'" missed value!! "'+m+'" instead2!!'),n.add(m,m,t),t=p,N=a;break;case l:f.warning('attribute space is required"'+m+'"!!');case h:N=a,t=p;break;case s:N=c,t=p;break;case d:throw new Error("elements closed character '/' and '>' must be connected to")}}p++}}function N(e,t,n){for(var r=e.tagName,i=null,o=e.length;o--;){var a=e[o],u=a.qName,s=a.value;if((d=u.indexOf(":"))>0)var c=a.prefix=u.slice(0,d),l=u.slice(d+1),h="xmlns"===c&&l;else l=u,c=null,h="xmlns"===u&&"";a.localName=l,!1!==h&&(null==i&&(i={},v(n,n={})),n[h]=i[h]=s,a.uri="http://www.w3.org/2000/xmlns/",t.startPrefixMapping(h,s))}for(o=e.length;o--;){(c=(a=e[o]).prefix)&&("xml"===c&&(a.uri="http://www.w3.org/XML/1998/namespace"),"xmlns"!==c&&(a.uri=n[c||""]))}var d;(d=r.indexOf(":"))>0?(c=e.prefix=r.slice(0,d),l=e.localName=r.slice(d+1)):(c=null,l=e.localName=r);var f=e.uri=n[c||""];if(t.startElement(f,l,r,e),!e.closed)return e.currentNSMap=n,e.localNSMap=i,!0;if(t.endElement(f,l,r),i)for(c in i)t.endPrefixMapping(c)}function g(e,t,n,r,i){if(/^(?:script|textarea)$/i.test(n)){var o=e.indexOf("</"+n+">",t),a=e.substring(t+1,o);if(/[&<]/.test(a))return/^script$/i.test(n)?(i.characters(a,0,a.length),o):(a=a.replace(/&#?\w+;/g,r),i.characters(a,0,a.length),o)}return t+1}function w(e,t,n,r){var i=r[n];return null==i&&((i=e.lastIndexOf("</"+n+">"))<t&&(i=e.lastIndexOf("</"+n)),r[n]=i),i<t}function v(e,t){for(var n in e)t[n]=e[n]}function b(e,t,n,r){switch(e.charAt(t+2)){case"-":return"-"===e.charAt(t+3)?(i=e.indexOf("--\x3e",t+4))>t?(n.comment(e,t+4,i-t-4),i+3):(r.error("Unclosed comment"),-1):-1;default:if("CDATA["==e.substr(t+3,6)){var i=e.indexOf("]]>",t+9);return n.startCDATA(),n.characters(e,t+9,i-t-9),n.endCDATA(),i+3}var o=function(e,t){var n,r=[],i=/'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g;i.lastIndex=t,i.exec(e);for(;n=i.exec(e);)if(r.push(n),n[1])return r}(e,t),a=o.length;if(a>1&&/!doctype/i.test(o[0][0])){var u=o[1][0],s=a>3&&/^public$/i.test(o[2][0])&&o[3][0],c=a>4&&o[4][0],l=o[a-1];return n.startDTD(u,s&&s.replace(/^(['"])(.*?)\1$/,"$2"),c&&c.replace(/^(['"])(.*?)\1$/,"$2")),n.endDTD(),l.index+l[0].length}}return-1}function E(e,t,n){var r=e.indexOf("?>",t);if(r){var i=e.substring(t,r).match(/^<\?(\S*)\s*([\s\S]*?)\s*$/);if(i){i[0].length;return n.processingInstruction(i[1],i[2]),r+2}return-1}return-1}function x(e){}function D(e,t){return e.__proto__=t,e}f.prototype={parse:function(e,t,n){var r=this.domBuilder;r.startDocument(),v(t,t={}),function(e,t,n,r,i){function o(e){var t=e.slice(1,-1);return t in n?n[t]:"#"===t.charAt(0)?function(e){if(e>65535){var t=55296+((e-=65536)>>10),n=56320+(1023&e);return String.fromCharCode(t,n)}return String.fromCharCode(e)}(parseInt(t.substr(1).replace("x","0x"))):(i.error("entity not found:"+e),e)}function a(t){if(t>v){var n=e.substring(v,t).replace(/&#?\w+;/g,o);h&&u(v),r.characters(n,0,t-v),v=t}}function u(t,n){for(;t>=c&&(n=l.exec(e));)s=n.index,c=s+n[0].length,h.lineNumber++;h.columnNumber=t-s+1}var s=0,c=0,l=/.*(?:\r\n?|\n)|.*$/g,h=r.locator,d=[{currentNSMap:t}],f={},v=0;for(;;){try{var D=e.indexOf("<",v);if(D<0){if(!e.substr(v).match(/^\s*$/)){var y=r.doc,T=y.createTextNode(e.substr(v));y.appendChild(T),r.currentElement=T}return}switch(D>v&&a(D),e.charAt(D+1)){case"/":var S=e.indexOf(">",D+3),C=e.substring(D+2,S),_=d.pop();S<0?(C=e.substring(D+2).replace(/[\s<].*/,""),i.error("end tag name: "+C+" is not complete:"+_.tagName),S=D+1+C.length):C.match(/\s</)&&(C=C.replace(/[\s<].*/,""),i.error("end tag name: "+C+" maybe not complete"),S=D+1+C.length);var I=_.localNSMap,A=_.tagName==C;if(A||_.tagName&&_.tagName.toLowerCase()==C.toLowerCase()){if(r.endElement(_.uri,_.localName,C),I)for(var R in I)r.endPrefixMapping(R);A||i.fatalError("end tag name: "+C+" is not match the current start tagName:"+_.tagName)}else d.push(_);S++;break;case"?":h&&u(D),S=E(e,D,r);break;case"!":h&&u(D),S=b(e,D,r,i);break;default:h&&u(D);var O=new x,M=d[d.length-1].currentNSMap,F=(S=p(e,D,O,M,o,i),O.length);if(!O.closed&&w(e,S,O.tagName,f)&&(O.closed=!0,n.nbsp||i.warning("unclosed xml attribute")),h&&F){for(var k=m(h,{}),U=0;U<F;U++){var L=O[U];u(L.offset),L.locator=m(h,{})}r.locator=k,N(O,r,M)&&d.push(O),r.locator=h}else N(O,r,M)&&d.push(O);"http://www.w3.org/1999/xhtml"!==O.uri||O.closed?S++:S=g(e,S,O.tagName,o,r)}}catch(e){i.error("element parse error: "+e),S=-1}S>v?v=S:a(Math.max(D,v)+1)}}(e,t,n,r,this.errorHandler),r.endDocument()}},x.prototype={setTagName:function(e){if(!i.test(e))throw new Error("invalid tagName:"+e);this.tagName=e},add:function(e,t,n){if(!i.test(e))throw new Error("invalid attribute:"+e);this[this.length++]={qName:e,value:t,offset:n}},length:0,getLocalName:function(e){return this[e].localName},getLocator:function(e){return this[e].locator},getQName:function(e){return this[e].qName},getURI:function(e){return this[e].uri},getValue:function(e){return this[e].value}},D({},D.prototype)instanceof D||(D=function(e,t){function n(){}for(t in n.prototype=t,n=new n,e)n[t]=e[t];return n}),t.XMLReader=f}}]);