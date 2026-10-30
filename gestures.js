'use strict';
// Touch changes only the paper viewport; pen events retain the incremental ink path.
(function(root){
function bind(canvas,{enabled,busy,getZoom,setZoom}){
 const view=canvas.parentElement,touches=new Map(),previousAction=view.style.touchAction;view.style.touchAction='none';let start=null,frame=0,disposed=false;
 const points=()=>[...touches.values()].slice(0,2),metrics=()=>{const p=points();return p.length===2?{x:(p[0].x+p[1].x)/2,y:(p[0].y+p[1].y)/2,d:Math.max(1,Math.hypot(p[0].x-p[1].x,p[0].y-p[1].y))}:{...p[0],d:0};};
 function reset(){if(!touches.size){start=null;return;}const m=metrics(),r=canvas.getBoundingClientRect();start={...m,zoom:getZoom(),u:(m.x-r.left)/r.width,v:(m.y-r.top)/r.height,left:view.scrollLeft,top:view.scrollTop};}
 function stop(){touches.clear();start=null;if(frame)cancelAnimationFrame(frame);frame=0;}
 function apply(){frame=0;if(disposed||!start||!touches.size||busy()||!enabled())return;const m=metrics();if(touches.size>1){setZoom(Math.max(1,Math.min(3,start.zoom*m.d/start.d)));const r=canvas.getBoundingClientRect();view.scrollLeft+=r.left+start.u*r.width-m.x;view.scrollTop+=r.top+start.v*r.height-m.y;}else{view.scrollLeft=start.left-(m.x-start.x);view.scrollTop=start.top-(m.y-start.y);}}
 const swallow=e=>{e.preventDefault();e.stopPropagation();};
 function down(e){if(e.pointerType==='pen'){stop();return;}if(e.pointerType!=='touch'||!enabled())return;swallow(e);if(busy())return;view.setPointerCapture(e.pointerId);touches.set(e.pointerId,{x:e.clientX,y:e.clientY});reset();}
 function move(e){if(!touches.has(e.pointerId))return;swallow(e);if(busy()||!enabled()){stop();return;}touches.set(e.pointerId,{x:e.clientX,y:e.clientY});if(!frame)frame=requestAnimationFrame(apply);}
 function end(e){if(!touches.has(e.pointerId))return;swallow(e);if(frame){cancelAnimationFrame(frame);frame=0;apply();}touches.delete(e.pointerId);reset();}
 const handlers={pointerdown:down,pointermove:move,pointerup:end,pointercancel:end,lostpointercapture:end};
 for(const[type,fn]of Object.entries(handlers))view.addEventListener(type,fn,{capture:true,passive:false});
 return {cancel:stop,dispose(){disposed=true;stop();view.style.touchAction=previousAction;for(const[type,fn]of Object.entries(handlers))view.removeEventListener(type,fn,true);}};
}
const api={bind};if(typeof module==='object'&&module.exports)module.exports=api;else root.WriteGestures=api;
})(typeof window==='object'?window:globalThis);
