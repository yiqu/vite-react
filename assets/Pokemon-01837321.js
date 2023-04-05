import{g as M,b as S,s as f,P as D,r as w,u as k,e as T,_ as d,a as e,h as _,i as j,T as C,j as y,y as E,z as U,A as B,t as L,C as q,D as F,E as G,S as v,F as H,G as b,B as P,I as V,H as W,J}from"./index-337d8a9d.js";import{u as O,r as Q,E as K,A as X,B as Y,L as Z}from"./ErrorPage-772b342a.js";function ee(a){return M("MuiCard",a)}S("MuiCard",["root"]);const te=["className","raised"],ae=a=>{const{classes:t}=a;return j({root:["root"]},ee,t)},re=f(D,{name:"MuiCard",slot:"Root",overridesResolver:(a,t)=>t.root})(()=>({overflow:"hidden"})),se=w.forwardRef(function(t,i){const s=k({props:t,name:"MuiCard"}),{className:r,raised:o=!1}=s,c=T(s,te),n=d({},s,{raised:o}),l=ae(n);return e(re,d({className:_(l.root,r),elevation:o?8:void 0,ref:i,ownerState:n},c))}),oe=se;function ne(a){return M("MuiCardHeader",a)}const ie=S("MuiCardHeader",["root","avatar","action","content","title","subheader"]),R=ie,le=["action","avatar","className","component","disableTypography","subheader","subheaderTypographyProps","title","titleTypographyProps"],de=a=>{const{classes:t}=a;return j({root:["root"],avatar:["avatar"],action:["action"],content:["content"],title:["title"],subheader:["subheader"]},ne,t)},ce=f("div",{name:"MuiCardHeader",slot:"Root",overridesResolver:(a,t)=>d({[`& .${R.title}`]:t.title,[`& .${R.subheader}`]:t.subheader},t.root)})({display:"flex",alignItems:"center",padding:16}),ue=f("div",{name:"MuiCardHeader",slot:"Avatar",overridesResolver:(a,t)=>t.avatar})({display:"flex",flex:"0 0 auto",marginRight:16}),pe=f("div",{name:"MuiCardHeader",slot:"Action",overridesResolver:(a,t)=>t.action})({flex:"0 0 auto",alignSelf:"flex-start",marginTop:-4,marginRight:-8,marginBottom:-4}),he=f("div",{name:"MuiCardHeader",slot:"Content",overridesResolver:(a,t)=>t.content})({flex:"1 1 auto"}),me=w.forwardRef(function(t,i){const s=k({props:t,name:"MuiCardHeader"}),{action:r,avatar:o,className:c,component:n="div",disableTypography:l=!1,subheader:g,subheaderTypographyProps:$,title:A,titleTypographyProps:I}=s,z=T(s,le),p=d({},s,{component:n,disableTypography:l}),u=de(p);let h=A;h!=null&&h.type!==C&&!l&&(h=e(C,d({variant:o?"body2":"h5",className:u.title,component:"span",display:"block"},I,{children:h})));let m=g;return m!=null&&m.type!==C&&!l&&(m=e(C,d({variant:o?"body2":"body1",className:u.subheader,color:"text.secondary",component:"span",display:"block"},$,{children:m}))),y(ce,d({className:_(u.root,c),as:n,ref:i,ownerState:p},z,{children:[o&&e(ue,{className:u.avatar,ownerState:p,children:o}),y(he,{className:u.content,ownerState:p,children:[h,m]}),r&&e(pe,{className:u.action,ownerState:p,children:r})]}))}),fe=me;var x={},Ce=U;Object.defineProperty(x,"__esModule",{value:!0});var N=x.default=void 0,ve=Ce(E()),ye=B,ge=(0,ve.default)((0,ye.jsx)("path",{d:"M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"}),"MoreVert");N=x.default=ge;function He(){const{isMobile:a}=O(),t=L();q();const i=F(),{state:{pokemonDetailUrl:s}}=i,{data:r,isFetching:o,isLoading:c,error:n,isError:l}=G(s??Q.skipToken);console.log(r);const g=()=>{t(W.util.invalidateTags([{type:J,id:r==null?void 0:r.id}]))};return c?e(v,{direction:"column",width:"100%",justifyContent:"center",alignItems:"center",height:"100vh",children:e(H,{children:"Loading"})}):l?e(K,{reason:n.status,debug:n.error}):r?y(v,{direction:"column",width:"100%",children:[e(X,{toolbarProps:{position:"sticky",sx:{top:a?"56px":"64px"}},children:y(b,{container:!0,xs:12,children:[e(b,{xs:10,sm:6,children:e(v,{direction:"row",justifyContent:"start",alignItems:"center",children:e(Y,{onClick:g,disabled:c||o,children:"Refresh"})})}),e(b,{xs:2,sm:6,sx:{display:"flex",justifyContent:"end",alignItems:"center"},children:e(v,{direction:"row",justifyContent:"end",alignItems:"center",children:e(P,{children:!1})})})]})}),e(P,{mt:2,mx:a?2:0,children:e(Z,{size:"skinny",children:e(oe,{sx:{width:"100%"},children:e(fe,{avatar:e(H,{}),action:e(V,{"aria-label":"settings",children:e(N,{})}),title:"Shrimp and Chorizo Paella",subheader:"September 14, 2016"})})})})]}):null}export{He as default};
