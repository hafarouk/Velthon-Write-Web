'use strict';
(function(root){
const catalog=[['blank','Blank','A clear space'],['ruled','Ruled','Classic notebook'],['narrow','Narrow lines','More notes per page'],['wide','Wide lines','Room for larger writing'],['grid','Square grid','Maths and diagrams'],['grid-small','Fine grid','Detailed drawings'],['grid-large','Large grid','Big ideas and shapes'],['dots','Dot grid','A subtle guide'],['cornell','Cornell','Cues, notes and summary'],['blocks','Study blocks','Six idea spaces'],['columns','Two columns','Compare side by side'],['checklist','Checklist','Tasks and reminders'],['music','Music staff','Compose and practise']];
function paint(c,W,H,page){c.fillStyle=page.background||'#fffdf7';c.fillRect(0,0,W,H);const paper=page.paper||'ruled';c.strokeStyle='#d9dace';c.lineWidth=1;const line=(x,y,a,b)=>{c.moveTo(x,y);c.lineTo(a,b);};c.beginPath();
 if(['ruled','narrow','wide','cornell','checklist','music'].includes(paper)){const gap=paper==='narrow'?30:paper==='wide'?60:paper==='music'?18:44;for(let y=80;y<H;y+=gap){if(paper==='music'&&Math.floor((y-80)/18)%8>4)continue;line(paper==='checklist'?100:0,y,W,y);if(paper==='checklist'&&y+24<H)c.rect(52,y+10,18,18);}}
 if(['grid','grid-small','grid-large'].includes(paper)){const gap=paper==='grid-small'?18:paper==='grid-large'?60:36;for(let x=0;x<W;x+=gap)line(x,0,x,H);for(let y=0;y<H;y+=gap)line(0,y,W,y);}
 if(['ruled','narrow','wide','cornell'].includes(paper)){line(paper==='cornell'?225:70,0,paper==='cornell'?225:70,H);if(paper==='cornell')line(0,H-220,W,H-220);}
 if(paper==='columns'){line(W/2,50,W/2,H-50);for(let y=105;y<H-50;y+=44){line(40,y,W/2-25,y);line(W/2+25,y,W-40,y);}}
 if(paper==='blocks'){const margin=40,gap=24,w=(W-2*margin-gap)/2,h=(H-2*margin-2*gap)/3;for(let row=0;row<3;row++)for(let col=0;col<2;col++)c.rect(margin+col*(w+gap),margin+row*(h+gap),w,h);}
 c.stroke();if(paper==='dots'){c.fillStyle='#b9beb2';for(let x=24;x<W;x+=36)for(let y=24;y<H;y+=36){c.beginPath();c.arc(x,y,1.3,0,7);c.fill();}}
}
const api={catalog,paint};if(typeof module==='object'&&module.exports)module.exports=api;else root.WritePaper=api;
})(typeof window==='object'?window:globalThis);
