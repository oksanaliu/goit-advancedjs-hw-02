import"./assets/modulepreload-polyfill-B5Qt9EMX.js";import{i as s}from"./assets/vendor-A92OCY9B.js";const n=document.querySelector(".form");n.addEventListener("submit",t=>{t.preventDefault();const e=new FormData(n),i=parseInt(e.get("delay"),10),o=e.get("state");if(isNaN(i)||!o){s.error({title:"Error",message:"Please provide valid inputs",position:"topRight",timeout:3e3});return}m(i,o).then(r=>{s.success({title:"Success",message:r,position:"topRight",timeout:3e3})}).catch(r=>{s.error({title:"Error",message:r,position:"topRight",timeout:3e3})})});function m(t,e){return new Promise((i,o)=>{setTimeout(()=>{e==="fulfilled"?i(`Fulfilled promise in ${t}ms`):o(`Rejected promise in ${t}ms`)},t)})}
//# sourceMappingURL=2-snackbar.js.map
