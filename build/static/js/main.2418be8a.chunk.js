(this.webpackJsonpclassdio=this.webpackJsonpclassdio||[]).push([[0],{28:function(e){e.exports=JSON.parse('{"domain":"dev-g157vs9n.auth0.com","clientId":"UKitRgDQR62fZ605K3KX2O2HhF2Rrqv8"}')},30:function(e,t,a){},43:function(e,t,a){e.exports=a(72)},72:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(22),o=a.n(c),l=(a(30),a(8)),s=a.n(l),i=a(17),u=a(9),m=a(24),d=a(41),h=function(){return window.history.replaceState({},document.title,window.location.pathname)},p=r.a.createContext(),f=function(){return Object(n.useContext)(p)},v=function(e){var t=e.children,a=e.onRedirectCallback,c=void 0===a?h:a,o=Object(m.a)(e,["children","onRedirectCallback"]),l=Object(n.useState)(),f=Object(u.a)(l,2),v=f[0],b=f[1],E=Object(n.useState)(),g=Object(u.a)(E,2),y=g[0],w=g[1],k=Object(n.useState)(),j=Object(u.a)(k,2),O=j[0],N=j[1],S=Object(n.useState)(!0),x=Object(u.a)(S,2),C=x[0],R=x[1],q=Object(n.useState)(!1),D=Object(u.a)(q,2),A=D[0],W=D[1];Object(n.useEffect)((function(){(function(){var e=Object(i.a)(s.a.mark((function e(){var t,a,n,r,l;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(d.a)(o);case 2:if(t=e.sent,N(t),!window.location.search.includes("code=")){e.next=10;break}return e.next=7,t.handleRedirectCallback();case 7:a=e.sent,n=a.appState,c(n);case 10:return e.next=12,t.isAuthenticated();case 12:if(r=e.sent,b(r),!r){e.next=19;break}return e.next=17,t.getUser();case 17:l=e.sent,w(l);case 19:R(!1);case 20:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[]);var F=function(){var e=Object(i.a)(s.a.mark((function e(){var t,a,n=arguments;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=n.length>0&&void 0!==n[0]?n[0]:{},W(!0),e.prev=2,e.next=5,O.loginWithPopup(t);case 5:e.next=10;break;case 7:e.prev=7,e.t0=e.catch(2),console.error(e.t0);case 10:return e.prev=10,W(!1),e.finish(10);case 13:return e.next=15,O.getUser();case 15:a=e.sent,w(a),b(!0);case 18:case"end":return e.stop()}}),e,null,[[2,7,10,13]])})));return function(){return e.apply(this,arguments)}}(),I=function(){var e=Object(i.a)(s.a.mark((function e(){var t;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return R(!0),e.next=3,O.handleRedirectCallback();case 3:return e.next=5,O.getUser();case 5:t=e.sent,R(!1),b(!0),w(t);case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return r.a.createElement(p.Provider,{value:{isAuthenticated:v,user:y,loading:C,popupOpen:A,loginWithPopup:F,handleRedirectCallback:I,getIdTokenClaims:function(){return O.getIdTokenClaims.apply(O,arguments)},loginWithRedirect:function(){return O.loginWithRedirect.apply(O,arguments)},getTokenSilently:function(){return O.getTokenSilently.apply(O,arguments)},getTokenWithPopup:function(){return O.getTokenWithPopup.apply(O,arguments)},logout:function(){return O.logout.apply(O,arguments)}}},t)},b=a(11),E=function(){var e=f(),t=e.isAuthenticated,a=e.loginWithRedirect,c=e.logout;return r.a.createElement("nav",{className:"navbar navbar-expand-lg navbar-light bg-light "},r.a.createElement("div",{className:"container-fluid row d-flex justify-content-end",id:"navbarNavAltMarkup"},r.a.createElement("h1",{className:"navbar-brand"},r.a.createElement(b.b,{to:"/"},"Classdotio")," by ",r.a.createElement("a",{href:"https://www.mikalyoung.com/",target:"_blank",rel:"noopener noreferrer"}," Mikal Young")),r.a.createElement("ul",{className:"nav navbar-nav d-flex align-items-center flex-row-reverse col-3 ml-auto justify-content-start "},!t&&r.a.createElement("li",{className:"nav-item"},r.a.createElement("button",{className:"btn btn-primary",onClick:function(){return a({})}},"Log in")),t&&r.a.createElement("li",{className:"nav-item ml-auto"},r.a.createElement("button",{className:"btn btn-outline-primary justify-self-end",onClick:function(){return c({returnTo:window.location.origin})}},"Log out")),t&&r.a.createElement(n.Fragment,null,r.a.createElement("li",{className:"nav-item p-2"},r.a.createElement(b.b,{to:"/profile"},"Profile")),r.a.createElement("li",{className:"nav-item p-2"},r.a.createElement(b.b,{to:"/dashboard"},"Home"))))))},g=a(1),y=function(e){var t=e.component,a=e.path,c=Object(m.a)(e,["component","path"]),o=f(),l=o.loading,u=o.isAuthenticated,d=o.loginWithRedirect;Object(n.useEffect)((function(){l||u||function(){var e=Object(i.a)(s.a.mark((function e(){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d({appState:{targetUrl:a}});case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()()}),[l,u,d,a]);return r.a.createElement(g.a,Object.assign({path:a,render:function(e){return!0===u?r.a.createElement(t,e):null}},c))},w=function(){var e=f(),t=e.loading,a=e.user;return console.log("yikes"),t?r.a.createElement("div",null,"Loading..."):a?r.a.createElement(n.Fragment,null,console.log(a),r.a.createElement("img",{src:a.picture,alt:"Profile",style:{height:"100px"}}),r.a.createElement("h2",null,a.name),r.a.createElement("p",null,a.email),r.a.createElement("code",null,JSON.stringify(a,null,2))):r.a.createElement("div",null," not the user ")},k=a(5),j=Object(k.a)(),O=a(12),N=a(13),S=a(2),x=a(14),C=a(15),R=a(23),q=a.n(R),D=a(10),A=a.n(D);function W(e){return e.list.map((function(e){return r.a.createElement("button",{type:"button",key:e.toString(),onClick:F,className:"btn btn-secondary",value:e.replace(" ","-")},e)}))}function F(e){var t=e.target;document.getElementById(t.value).scrollIntoView({behavior:"smooth",block:"start",inline:"nearest"})}function I(e){e.pre;return e.completed?(e.color="blue",e.rank="1","blue"):(e.color="yellow",e.rank="2","yellow")}var K=function(e){var t,a=this;console.log(null===(t=e.data)||void 0===t?void 0:t.name);var n=e.data;return r.a.createElement("div",{id:n.area+"-"+n.code,className:I(n)+" classCard col-10 container offset-1"},r.a.createElement("div",{className:"row"},r.a.createElement("h3",{className:"col-xl-4 col-sm-4"},n.area+" "+n.code),r.a.createElement("h3",{className:"col-xl-7 col-sm-6"},n.name),r.a.createElement("img",{className:"col-xl-1 col-sm-2 deletebtn d-flex justify-content-end",src:"./assets/delete.svg",onClick:function(){a.onDelete()}})),r.a.createElement("div",{className:"row"},r.a.createElement("h4",{className:"col-8"},"pre-reqs: ",r.a.createElement(W,{list:n.preReq})," "),r.a.createElement("h4",{className:"col-4"},"completed: ",n.completed?"yes":"no")),r.a.createElement("div",{className:"row"},r.a.createElement("p",{className:"col-12"},"description: the course you need to learn all about ",n.name)))},T={name:"",classcode:"",preReqs:"",nameError:"",classcodeError:"",prereqError:"",value:"",valid:!0,dropdowndb:[]};function B(e){var t=e.type,a=e.list.filter((function(e){return"name"==t?e.name:"code"==t?e.area+" "+e.code:void 0})).map((function(e){return r.a.createElement("option",{value:e.name})}));return console.log(a),0!==a.length?r.a.createElement("datalist",{id:"options"},a):""}var U=function(e){Object(C.a)(a,e);var t=Object(x.a)(a);function a(e){var n;return Object(O.a)(this,a),(n=t.call(this,e)).state=T,n.handleChange=n.handleChange.bind(Object(S.a)(n)),n.codeChange=n.codeChange.bind(Object(S.a)(n)),n.handleSubmit=n.handleSubmit.bind(Object(S.a)(n)),n.validate=n.validate.bind(Object(S.a)(n)),n.onFocus=n.onFocus.bind(Object(S.a)(n)),n.onBlur=n.onBlur.bind(Object(S.a)(n)),n.changeState=n.changeState.bind(Object(S.a)(n)),n}return Object(N.a)(a,[{key:"handleChange",value:function(e){this.setState({name:e.target.value})}},{key:"changeState",value:function(e){}},{key:"codeChange",value:function(e){this.setState({classcode:e.target.value})}},{key:"handleSubmit",value:function(e){e.preventDefault(),this.validate()&&this.props.newclass(),this.setState({name:""}),this.setState({classcode:""}),this.setState({preReqs:""})}},{key:"validate",value:function(){this.setState({nameError:""}),this.setState({classcodeError:""});var e=1;return this.state.name||(this.setState({nameError:"name cannot be empty"}),this.setState({valid:!1}),e=0),this.state.classcode||(this.setState({classcodeError:"class code cannot be empty"}),this.setState({valid:!1}),e=0),1===e}},{key:"onFocus",value:function(){document.querySelector(".dropdown-container").removeClass("hide"),console.log(Date.now()),document.querySelector("#name").keyup((function(e){40===e.which&&console.log("yeet!")}))}},{key:"onBlur",value:function(){document.querySelector(document).ready((function(){document.querySelector(".dropdown-container").addClass("hide"),document.querySelector("#name").unbind("keyup")}))}},{key:"componentDidMount",value:function(){var e=this,t=new Headers;t.append("Accept","application/json"),fetch("/universaldb",{method:"GET",headers:t}).then((function(e){return e.json()})).then((function(t){e.setState({dropdowndb:t})})).catch((function(e){console.log("fetch request is broken"),console.log(e)}))}},{key:"render",value:function(){return r.a.createElement("form",{id:"classform",className:"",onSubmit:this.handleSubmit,autoComplete:"new-password"},r.a.createElement("div",{className:"form-group",style:{position:"relative"}},r.a.createElement("label",{htmlFor:"name"},"name"),r.a.createElement("br",null),r.a.createElement("input",{type:"text",id:"name",name:Date.now(),autoComplete:"new-password",className:this.state.nameError?"form-control incorrect":"form-control",value:this.state.name,onChange:this.handleChange,list:"options"}),r.a.createElement("div",{className:"errorMsg"},this.state.valid?"":this.state.nameError),""!==this.state.name?r.a.createElement(B,{list:this.state.dropdowndb,type:"name"}):""),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"classcode"},"code"),r.a.createElement("br",null),r.a.createElement("input",{type:"text",id:"classcode",className:this.state.classcodeError?"incorrect":"form-control",value:this.state.classcode,onChange:this.codeChange}),r.a.createElement("div",{className:"errorMsg"},this.state.valid?"":this.state.classcodeError)),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"classcode"},"completed:"),r.a.createElement("input",{type:"checkbox",name:"complete",id:"completed",className:"",style:{marginLeft:"20px"}})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"preReqs"},"prereq(s):"),r.a.createElement("br",null),r.a.createElement("input",{type:"text",id:"preReqs",className:"form-control"})),r.a.createElement("br",null),r.a.createElement("button",{type:"submit",className:"btn btn-primary",form:"classform"},"submit"))}}]),a}(r.a.Component);var P=function(e){Object(C.a)(a,e);var t=Object(x.a)(a);function a(e){var n;return Object(O.a)(this,a),(n=t.call(this,e)).state={value:"",searchtext:""},n.search=n.search.bind(Object(S.a)(n)),n.onKeyDown=n.onKeyDown.bind(Object(S.a)(n)),n}return Object(N.a)(a,[{key:"search",value:function(e){this.props.changeSearch(e.target.value)}},{key:"onKeyDown",value:function(e){8!==e.keyCode&&"Backspace"!==e.key||console.log("deleted")}},{key:"render",value:function(){return r.a.createElement("input",{className:"col-7 form-control",placeholder:"Search",name:"search",id:"search",onChange:this.search,value:this.props.searchtext,onKeyDown:this.onKeyDown})}}]),a}(r.a.Component),J=[];function M(){var e=[];return console.log("loading"),q.a.post("/payload",{body:JSON.stringify(this.state.user)}).then((function(e){return e.json()})).then((function(t){e=t.result,console.log(e),e.forEach((function(e){"string"==typeof e.preReqs&&(e.preReqs=JSON.parse(e.preReqs)),e.completed&&J.push(e.area+" "+e.code)})),e=e.sort((function(e,t){return e.completed-t.completed}))})),e}r.a.Component;var L=function(e){Object(C.a)(a,e);var t=Object(x.a)(a);function a(e){var n;return Object(O.a)(this,a),(n=t.call(this,e)).state={},console.log(n.props.list),n.removeClass=n.removeClass.bind(Object(S.a)(n)),n}return Object(N.a)(a,[{key:"removeClass",value:function(e){this.props.delete(e)}},{key:"render",value:function(){var e=this;return(this.props.list?this.props.list:[]).map((function(t){return console.log("loading "+t.name),r.a.createElement(K,{key:t.area.toString()+t.code.toString(),delete:e.removeClass,data:t})}))}}]),a}(r.a.Component),H=function(){return console.log("Home"),r.a.createElement(n.Fragment,null,r.a.createElement("div",{className:"mainbody"},r.a.createElement("div",{className:"row d-flex justify-content-center"},r.a.createElement("h1",{className:"col-6 text-center"},"Welcome To Class.io")),r.a.createElement("div",{className:"row d-flex  justify-content-center"},r.a.createElement("h4",{className:"col-8 text-center"},r.a.createElement("span",null,"    "),"Classdotio is an interactive Web Application using React, Node.js, Auth0, and MongoDB to visually tell users which classes they have taken, which classes they are eligible to take, and which classes they are unable to take. It uses the Auth0 SDK to enable user profile Authentication."))))};var _=function(e){var t=Object(n.useState)([]),a=Object(u.a)(t,2),c=(a[0],a[1],Object(n.useState)("")),o=Object(u.a)(c,2);return o[0],o[1],Object(n.useEffect)((function(){console.log(e.user),q.a.post("/getUserInfo",{email:e.user.email}).then((function(e){console.log(e)}))})),r.a.createElement("div",null,r.a.createElement("div",{className:"col-7"},r.a.createElement("div",{className:"card",style:{height:"100%"}},r.a.createElement("div",{className:"d-flex card-header container align-items-center"},r.a.createElement("h1",{className:"col-4 "},"Classes"),r.a.createElement(P,null)),r.a.createElement("div",{className:"card-body container-fluid",style:{overflow:"scroll",overflowX:"hidden"}},r.a.createElement("div",{className:"row"})))))};var X=function(e){return r.a.createElement("div",null,r.a.createElement(U,null),r.a.createElement(_,{user:e.user}))};var G=function(){var e=f(),t=e.loading,a=e.isAuthenticated,n=e.user;return t?r.a.createElement("div",null,"Loading..."):r.a.createElement("div",{className:"App container-fluid"},r.a.createElement(g.b,{history:j},r.a.createElement("header",null,r.a.createElement(E,null)),r.a.createElement(g.c,null,r.a.createElement(g.a,{exact:!0,path:"/"},a?r.a.createElement(X,{user:n}):r.a.createElement(H,null)),r.a.createElement(y,{exact:!0,path:"/dashboard"},r.a.createElement(X,{user:n})),r.a.createElement(g.a,{path:"/profile"},r.a.createElement(w,null)))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var Q=a(28);o.a.render(r.a.createElement(v,{domain:Q.domain,client_id:Q.clientId,redirect_uri:window.location.origin,onRedirectCallback:function(e){j.push(e&&e.targetUrl?e.targetUrl:window.location.pathname)}},r.a.createElement(b.a,null,r.a.createElement(G,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[43,1,2]]]);
//# sourceMappingURL=main.2418be8a.chunk.js.map