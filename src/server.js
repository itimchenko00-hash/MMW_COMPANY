const express=require('express');
const path=require('path');
const fs=require('fs');
const app=express();
const PORT=process.env.PORT||10000;
const ROOT=path.join(__dirname,'..');
const PUBLIC=path.join(ROOT,'public');
const PROJECTS=path.join(ROOT,'projects');
const MAIN_FILE='company/website/mmw-company-interactive-v11.html';
const MAIN_PATH=path.join(ROOT,MAIN_FILE);
const BUILD='2026-09-02-mmW-intelligent-v13';
if(!fs.existsSync(MAIN_PATH)){console.error(`[MMW-FATAL] Missing canonical home page: ${MAIN_PATH}`);process.exit(1)}
app.disable('x-powered-by');
app.use((req,res,next)=>{res.set('Cache-Control','no-store,no-cache,must-revalidate,proxy-revalidate,max-age=0');res.set('Pragma','no-cache');res.set('Expires','0');res.set('X-MMW-Build',BUILD);res.set('X-MMW-Repo','itimchenko00-hash/MMW_COMPANY');next()});
function sendHtml(file,res){
  if(!fs.existsSync(file))return res.status(404).send(`MMW-COMPANY: missing page ${path.relative(ROOT,file)}`);
  fs.readFile(file,'utf8',(err,html)=>{
    if(err)return res.status(404).send('MMW-COMPANY: page read error');
    const normalized=file.replace(/\\/g,'/');
    let scripts=`<script src="/public/mmw-language.js?v=${encodeURIComponent(BUILD)}"></script><script src="/public/mmw-intelligence-v1.js?v=${encodeURIComponent(BUILD)}"></script>`;
    if(!normalized.includes('/projects/ALADIN/'))scripts+=`<script src="/public/mmw-site-unifier.js?v=${encodeURIComponent(BUILD)}"></script>`;
    if(normalized.includes('/projects/NEXUS-WORK/'))scripts+=`<script src="/public/nexus-work-product.js?v=${encodeURIComponent(BUILD)}"></script><script src="/public/nexus-work-economics.js?v=${encodeURIComponent(BUILD)}"></script>`;
    if(normalized.includes('/projects/NEXUS-LOGISTICS/'))scripts+=`<script src="/public/nexus-logistics-upgrade.js?v=${encodeURIComponent(BUILD)}"></script><script src="/public/nexus-logistics-product-economics.js?v=${encodeURIComponent(BUILD)}"></script>`;
    if(normalized.includes('/projects/CARPATHIA/'))scripts+=`<script src="/public/carpathia-upgrade.js?v=${encodeURIComponent(BUILD)}"></script>`;
    if(!html.includes('/public/mmw-intelligence-v1.js'))html=html.replace('</head>',`${scripts}</head>`);
    res.set('X-MMW-Source-File',path.relative(ROOT,file).replace(/\\/g,'/'));
    res.type('html').send(html);
  });
}
function servePublic(file,res){return sendHtml(path.join(PUBLIC,file),res)}
function safeProjectFile(req,res,next){
  const rel=req.path.replace(/^\/+/, '');
  if(!rel.toLowerCase().endsWith('.html'))return next();
  const file=path.resolve(PROJECTS,rel);
  if(!file.startsWith(path.resolve(PROJECTS)+path.sep)||!fs.existsSync(file))return next();
  return sendHtml(file,res);
}
app.use('/projects',safeProjectFile);
app.get('/',(req,res)=>sendHtml(MAIN_PATH,res));
app.get(['/index.html','/company','/company/','/company.html','/mmw-company-home-v2.html','/mmw-company-home-v2','/home-v2'],(req,res)=>res.redirect(308,'/'));
app.get(['/international','/international/','/international.html'],(req,res)=>servePublic('international.html',res));
app.get(['/global'],(req,res)=>res.redirect('/international'));
const pages={about:'about-v1.html',services:'services-v1.html',products:'products-v2.html',investment:'investment-v1.html',team:'team-v1.html',contact:'contact-v1.html'};
Object.entries(pages).forEach(([route,file])=>app.get(['/'+route,'/'+route+'/' ],(req,res)=>servePublic(file,res)));
const aliases={
  '/aladin':'projects/ALADIN/website/aladin-presentation-suite.html','/aladin/':'projects/ALADIN/website/aladin-presentation-suite.html','/aladin-v2':'projects/ALADIN/website/aladin-presentation-suite.html','/aladin-v13':'projects/ALADIN/website/aladin-presentation-suite.html',
  '/nexus':'projects/NEXUS-WORK/website/nexus-work-presentation-suite.html','/nexus-work':'projects/NEXUS-WORK/website/nexus-work-presentation-suite.html','/nexus-work/':'projects/NEXUS-WORK/website/nexus-work-presentation-suite.html','/nexus-work-v13':'projects/NEXUS-WORK/website/nexus-work-presentation-suite.html',
  '/nexus-logistics':'projects/NEXUS-LOGISTICS/website/nexus-logistics-presentation-v2.html','/nexus-logistics/':'projects/NEXUS-LOGISTICS/website/nexus-logistics-presentation-v2.html','/nexus-logistics-v2':'projects/NEXUS-LOGISTICS/website/nexus-logistics-presentation-v2.html','/nexus-logistics-v3':'projects/NEXUS-LOGISTICS/website/nexus-logistics-presentation-v2.html','/nexus-logistics-v13':'projects/NEXUS-LOGISTICS/website/nexus-logistics-presentation-v2.html',
  '/carpathia':'projects/CARPATHIA/website/carpathia-compact.html','/carpathia/':'projects/CARPATHIA/website/carpathia-compact.html','/carpathia-master':'projects/CARPATHIA/website/carpathia-compact.html','/carpathia-feasibility':'projects/CARPATHIA/website/carpathia-feasibility.html','/carpathia-v13':'projects/CARPATHIA/website/carpathia-compact.html',
  '/agrohub':'projects/AGROHUB/website/agrohub-compact.html','/agrohub/':'projects/AGROHUB/website/agrohub-compact.html','/agrohub-compact':'projects/AGROHUB/website/agrohub-compact.html','/agrohub-v13':'projects/AGROHUB/website/agrohub-compact.html',
  '/energy':'projects/ENERGY-PARK/website/energy-compact.html','/energy/':'projects/ENERGY-PARK/website/energy-compact.html','/energy-master':'projects/ENERGY-PARK/website/energy-compact.html','/energy-v13':'projects/ENERGY-PARK/website/energy-compact.html'
};
Object.entries(aliases).forEach(([route,file])=>app.get(route,(req,res)=>sendHtml(path.join(ROOT,file),res)));
app.get('/project-presentation-hub.html',(req,res)=>servePublic('project-presentation-hub.html',res));
app.get(['/projects','/projects/','/portfolio'],(req,res)=>servePublic('projects-v5.html',res));
app.get('/order',(req,res)=>res.redirect('https://mmw-order.onrender.com'));
app.get('/health',(req,res)=>res.json({service:'MMW-COMPANY',status:'ok',build:BUILD,repo:'itimchenko00-hash/MMW_COMPANY',branch:'main',canonicalHome:'/',homeFile:MAIN_FILE,homeFileExists:fs.existsSync(MAIN_PATH),projects:['ALADIN','NEXUS WORK','NEXUS LOGISTICS','CARPATHIA ECO LODGE','AGROHUB','ENERGY PARK'],order:'https://mmw-order.onrender.com'}));
app.get('/__mmw-version',(req,res)=>res.type('text').send(`${BUILD}\nrepo=itimchenko00-hash/MMW_COMPANY\nbranch=main\ncanonicalHome=/\nhomeFile=${MAIN_FILE}\n`));
app.get('/__mmw-routes',(req,res)=>res.json({build:BUILD,routes:Object.keys(aliases).filter(r=>!r.endsWith('/')),order:'https://mmw-order.onrender.com'}));
app.use('/public',express.static(PUBLIC,{maxAge:0}));
app.use(express.static(ROOT,{maxAge:0}));
app.use((req,res,next)=>{if(req.method==='GET'&&(req.path.endsWith('.html')||req.path==='/'))return res.redirect(308,'/');next()});
app.use((req,res)=>res.status(404).send('MMW-COMPANY: route not found'));
app.listen(PORT,'0.0.0.0',()=>console.log(`MMW-COMPANY listening on ${PORT} | ${BUILD}`));
