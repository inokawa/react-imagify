import{a as i,r as q}from"./index-60a5bb00.js";var D={exports:{}},x={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var B=i,A=Symbol.for("react.element"),H=Symbol.for("react.fragment"),V=Object.prototype.hasOwnProperty,$=B.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,J={key:!0,ref:!0,__self:!0,__source:!0};function U(e,t,r){var n,a={},o=null,d=null;r!==void 0&&(o=""+r),t.key!==void 0&&(o=""+t.key),t.ref!==void 0&&(d=t.ref);for(n in t)V.call(t,n)&&!J.hasOwnProperty(n)&&(a[n]=t[n]);if(e&&e.defaultProps)for(n in t=e.defaultProps,t)a[n]===void 0&&(a[n]=t[n]);return{$$typeof:A,type:e,key:o,ref:d,props:a,_owner:$.current}}x.Fragment=H;x.jsx=U;x.jsxs=U;D.exports=x;var P=D.exports;const s=P.jsx,c=P.jsxs,X=/^data:image\/.*;base64,/i,Y=e=>X.test(e),G=e=>{const t=new XMLSerializer().serializeToString(e);return"data:image/svg+xml;charset=utf-8,"+encodeURIComponent(t)},K=(e,t,r)=>new Promise((n,a)=>{const o=new Image(t,r);o.onload=d=>{n(o)},o.onerror=a,o.src=e}),Q=e=>new Promise((t,r)=>{e.complete&&t(),e.onload=n=>{t()},e.onerror=r}),Z=e=>new Promise((t,r)=>{const n=document.createElement("canvas"),a=n.getContext("2d");if(!a)return r();n.width=e.width,n.height=e.height,a.drawImage(e,0,0),t(n.toDataURL("image/png")),n.remove()}),ee=async(e,t,r)=>{await Promise.all(Array.from(e.querySelectorAll("img")).map(async o=>{Y(o.src)||(await Q(o),o.src=await Z(o))}));const n=G(e.children[0]);return await K(n,Number(t),Number(r))},S=({width:e,height:t,children:r,update:n})=>{const a=i.useRef(),o=a.current||(a.current=document.createDocumentFragment());return i.useEffect(()=>{n(o,e,t)},[r,e,t]),q.createPortal(s("svg",{width:e,height:t,children:s("foreignObject",{width:e,height:t,children:r})}),o)};try{S.displayName="Mounter",S.__docgenInfo={description:"",displayName:"Mounter",props:{width:{defaultValue:null,description:"",name:"width",required:!0,type:{name:"string | number | undefined"}},height:{defaultValue:null,description:"",name:"height",required:!0,type:{name:"string | number | undefined"}},update:{defaultValue:null,description:"",name:"update",required:!0,type:{name:"(el: DocumentFragment, width: string | number | undefined, height: string | number | undefined) => void"}}}}}catch{}const te=(...e)=>i.useCallback(t=>{e.forEach(r=>{!r||!t||(r.current=t)})},e),ne=i.forwardRef(({width:e,height:t,style:r,children:n,...a},o)=>{const d=i.useRef(null),l=window.devicePixelRatio??1,y=Number(e??0),v=Number(t??0),w=y*l,_=v*l,z=i.useMemo(()=>({...r,width:String(y)+"px",height:String(v)+"px"}),[r,y,v]);i.useLayoutEffect(()=>{var p;const m=(p=d.current)==null?void 0:p.getContext("2d");m&&m.scale(l,l)},[]);const F=i.useCallback(async(m,p,M)=>{var b;const I=(b=d.current)==null?void 0:b.getContext("2d");if(!I)return;const W=await ee(m,p,M);I.clearRect(0,0,w,_),I.drawImage(W,0,0)},[w,_]);return c("canvas",{...a,ref:te(o,d),width:w,height:_,style:z,children:[n,s(S,{width:e,height:t,update:F,children:n})]})}),u=i.memo(ne);try{u.displayName="Imagify",u.__docgenInfo={description:"",displayName:"Imagify",props:{}}}catch{}const re=""+new URL("Octocat-ff7ce735.png",import.meta.url).href,oe={title:"examples"},h=()=>c("div",{children:[s(u,{width:400,height:100,children:c("div",{style:{fontSize:"40px"},children:[s("em",{children:"I"})," like"," ",s("span",{style:{color:"white",textShadow:"0 0 2px blue"},children:"cheese"})]})}),c("div",{style:{fontSize:"40px"},children:[s("em",{children:"I"})," like"," ",s("span",{style:{color:"white",textShadow:"0 0 2px blue"},children:"cheese"})]})]}),g=()=>s("div",{children:s(u,{width:400,height:300,children:s("img",{src:re,width:400})})}),f=()=>{const[e,t]=i.useState(0),[r,n]=i.useState("textarea");return c("div",{children:[s(u,{width:200,height:400,children:c("div",{children:[s("div",{style:{background:e%2===0?"pink":"skyblue"},children:e}),s("div",{style:{wordBreak:"break-all",whiteSpace:"pre-wrap"},children:r})]})}),c("div",{children:[c("button",{onClick:()=>t(a=>a+1),children:["update count: ",e]}),s("textarea",{value:r,onChange:a=>n(a.target.value)})]})]})};var k,R,C;h.parameters={...h.parameters,docs:{...(k=h.parameters)==null?void 0:k.docs,source:{originalSource:`() => {
  return <div>
      <Imagify width={400} height={100}>
        <div style={{
        fontSize: "40px"
      }}>
          <em>I</em> like{" "}
          <span style={{
          color: "white",
          textShadow: "0 0 2px blue"
        }}>
            cheese
          </span>
        </div>
      </Imagify>
      <div style={{
      fontSize: "40px"
    }}>
        <em>I</em> like{" "}
        <span style={{
        color: "white",
        textShadow: "0 0 2px blue"
      }}>
          cheese
        </span>
      </div>
    </div>;
}`,...(C=(R=h.parameters)==null?void 0:R.docs)==null?void 0:C.source}}};var E,O,N;g.parameters={...g.parameters,docs:{...(E=g.parameters)==null?void 0:E.docs,source:{originalSource:`() => {
  return <div>
      <Imagify width={400} height={300}>
        <img src={Octocat} width={400} />
      </Imagify>
    </div>;
}`,...(N=(O=g.parameters)==null?void 0:O.docs)==null?void 0:N.source}}};var j,L,T;f.parameters={...f.parameters,docs:{...(j=f.parameters)==null?void 0:j.docs,source:{originalSource:`() => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("textarea");
  return <div>
      <Imagify width={200} height={400}>
        <div>
          <div style={{
          background: count % 2 === 0 ? "pink" : "skyblue"
        }}>
            {count}
          </div>
          <div style={{
          wordBreak: "break-all",
          whiteSpace: "pre-wrap"
        }}>
            {text}
          </div>
        </div>
      </Imagify>
      <div>
        <button onClick={() => setCount(p => p + 1)}>
          update count: {count}
        </button>
        <textarea value={text} onChange={e => setText(e.target.value)} />
      </div>
    </div>;
}`,...(T=(L=f.parameters)==null?void 0:L.docs)==null?void 0:T.source}}};const se=["HelloWorld","Image","WithState"];export{h as HelloWorld,g as Image,f as WithState,se as __namedExportsOrder,oe as default};
//# sourceMappingURL=examples.stories-0180ec3d.js.map
