import"./assets/modulepreload-polyfill-3cfb730f.js";import{i as r}from"./assets/vendor-77e16229.js";const e=document.querySelector("input"),l=document.querySelector('[value="fulfilled"]'),d=document.querySelector('[value="rejected"]'),i=document.querySelector(".form");i.addEventListener("submit",s=>{s.preventDefault(),new Promise((o,t)=>{setTimeout(()=>{l.checked?o(e.value):d.checked&&t(e.value)},e.value)}).then(o=>{r.show({message:`✅ Fulfilled promise in ${e.value}ms`,backgroundColor:"#59A10D",borderBottom:"2px solid #B5EA7C",borderRadius:"4px",padding:"20px",messageColor:"#FFF"})}).catch(o=>{r.show({message:`❌ Rejected promise in ${e.value}ms`,backgroundColor:"#EF4040",borderBottom:"2px solid #FFBEBE",borderRadius:"4px",padding:"20px",messageColor:"#FFF"})})});
//# sourceMappingURL=commonHelpers2.js.map
