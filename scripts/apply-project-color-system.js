const fs=require('fs');
const path=require('path');
const ROOT=path.join(__dirname,'..');
const themes={
  'projects/ALADIN/website/aladin-presentation-suite.html':{p:'#C98B5B',s:'#8E5A3C',soft:'#3A2921',signal:'#D8A06A'},
  'projects/NEXUS-WORK/website/nexus-work-presentation-suite.html':{p:'#5C8DFF',s:'#314A73',soft:'#1C2940',signal:'#73A7FF'},
  'projects/NEXUS-LOGISTICS/website/nexus-logistics-presentation-v2.html':{p:'#5B86A8',s:'#465867',soft:'#25313A',signal:'#D6A34A'},
  'projects/AGROHUB/website/agrohub-compact.html':{p:'#5C9A67',s:'#66784A',soft:'#243326',signal:'#D6B84C'},
  'projects/ENERGY-PARK/website/energy-compact.html':{p:'#35D4E8',s:'#315E72',soft:'#17343D',signal:'#E7C84B'},
  'projects/CARPATHIA/website/carpathia-compact.html':{p:'#4F8A69',s:'#35604C',soft:'#1E3028',signal:'#6CA6C4'}
};
const marker='/* ETALON-03 PROJECT COLOR SYSTEM 01 */';
for(const [rel,t] of Object.entries(themes)){
 const file=path.join(ROOT,rel);
 if(!fs.existsSync(file)) throw new Error(`Missing page: ${rel}`);
 let html=fs.readFileSync(file,'utf8');
 const css=`\n${marker}\n:root{--project-primary:${t.p};--project-secondary:${t.s};--project-soft:${t.soft};--project-signal:${t.signal};--gold:var(--project-primary);--gold2:${t.signal};}\n.nav small,.ey{color:var(--project-primary)!important}.hero h1 span,h2 span,.quote{color:var(--project-primary)!important}.node:hover,.node.active,.step.active,.toggle button.active{border-color:var(--project-primary)!important}.node:hover,.node.active,.toggle button.active{color:var(--project-signal)!important}.card summary,.step b,.detail b,.risk b{color:var(--project-signal)!important}.final h2{color:var(--project-primary)!important}.nav{box-shadow:0 1px 0 var(--project-soft)}\n`;
 if(html.includes(marker)) html=html.replace(new RegExp(`\\n${marker}[\\s\\S]*?(?=</style>)`),'\n'+css.trim()+'\n');
 else html=html.replace('</style>',css+'</style>');
 fs.writeFileSync(file,html);
 console.log(`updated ${rel}`);
}
