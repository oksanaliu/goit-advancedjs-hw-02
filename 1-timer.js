import"./assets/modulepreload-polyfill-B5Qt9EMX.js";import{f as x,i as u}from"./assets/vendor-A92OCY9B.js";const r=document.querySelector("#datetime-picker"),o=document.querySelector("#start-btn"),a=document.querySelector("#days"),d=document.querySelector("#hours"),l=document.querySelector("#minutes"),m=document.querySelector("#seconds");let i=null,f=null;const S={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(t){const e=new Date;t[0]<=e?(u.error({title:"Error",message:"Please choose a date in the future",position:"topRight"}),o.disabled=!0):(f=t[0],o.disabled=!1)}};x(r,S);o.addEventListener("click",()=>{o.disabled=!0,r.disabled=!0,i=setInterval(()=>{const e=f-new Date;if(e<=0){clearInterval(i),u.success({title:"Finished",message:"Countdown completed!",position:"topRight"}),g();return}b(w(e))},1e3)});function b({days:t,hours:e,minutes:s,seconds:c}){a.textContent=n(t),d.textContent=n(e),l.textContent=n(s),m.textContent=n(c)}function w(t){const h=Math.floor(t/864e5),y=Math.floor(t%864e5/36e5),p=Math.floor(t%864e5%36e5/6e4),C=Math.floor(t%864e5%36e5%6e4/1e3);return{days:h,hours:y,minutes:p,seconds:C}}function n(t){return String(t).padStart(2,"0")}function g(){a.textContent="00",d.textContent="00",l.textContent="00",m.textContent="00",r.disabled=!1}
//# sourceMappingURL=1-timer.js.map
