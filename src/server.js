const express=require('express');
const path=require('path');
const fs=require('fs');
const app=express();
const PORT=process.env.PORT||10000;
const ROOT=path.join(__dirname,'..');
const PUBLIC=path.join(ROOT,'public');
const PROJECTS=path.join(ROOT,'projects');
const MAIN_FILE='mmw-company-home-v2.html';
const MAIN_PATH=path.join(PUBLIC,MAIN_FILE);
const BUILD='2026-09-02-mmW-nexus-work-v2';
if(!fs.existsSync(MAIN_PATH)){console.error(`[MMW-FATAL] Missing canonical home page: ${MAIN_PATH}`);process.exit(1)}
app.disable('x-powered-by');
app.use((req,res,next)=>{res.set('Cache-Control','no-store,no-cache,must-revalidate,proxy-revalidate');res.set('Pragma','no-cache');res.set('Expires','0');res.set('X-MMW-Build',BUILD);res.set('X-MMW-Repo','itimchenko00-hash/MMW_COMPANY');next()});
function sendHtml(file,res){fs.readFile(file,'utf8',(err,html)=>{if(err)return res.status(404).send('Page not found');let scripts='<script src="/public/mmw-language.js"></script>';const normalized=file.replace(/\\/g,'/');const isAladin=normalized.includes('/projects/ALADIN/');if(!isAladin)scripts+='<script src="/public/mmw-site-unifier.js"></script>';if(normalized.includes('/projects/NEXUS-WORK/'))scripts+='<script src="/public/nexus-work-product.js"></script><script src="/public/nexus-work-economics.js"></script>';if(normalized.includes('/projects/NEXUS-LOGISTICS/'))scripts+='<script src="/public/nexus-logistics-upgrade.js"></script><script src="/public/nexus-logistics-product-economics.js"></script>';if(normalized.includes('/projects/CARPATHIA/'))scripts+='<script src="/public/carpathia-upgrade.js"></script>';if(!html.includes('/public/mmw-language.js'))html=html.replace('</head>',scripts+'</head>');res.type('html').send(html)})}
function servePublic(file,res){return sendHtml(path.join(PUBLIC,file),res)}
function safeProjectFile(req,res,next){const rel=req.path.replace(/^\/+/, '');if(!rel.toLowerCase().endsWith('.html'))return next();const file=path.resolve(PROJECTS,rel);if(!file.startsWith(path.resolve(PROJECTS)+path.sep)||!fs.existsSync(file))return next();return sendHtml(file,res)}
app.use('/projects',safeProjectFile);
app.get('/',(req,res)=>servePublic(MAIN_FILE,res));
app.get(['/index.html','/company','/company/','/company.html','/mmw-company-home-v2.html','/mmw-company-home-v2','/home-v2'],(req,res)=>res.redirect(308,'/'));
app.get(['/international','/international/','/international.html'],(req,res)=>servePublic('international.html',res));app.get(['/global'],(req,res)=>res.redirect('/international'));
const pages={about:'about-v1.html',services:'services-v1.html',products:'products-v2.html',investment:'investment-v1.html',team:'team-v1.html',contact:'contact-v1.html'};Object.entries(pages).forEach(([route,file])=>app.get(['/'+route,'/'+route+'/' ],(req,res)=>servePublic(file,res)));
const aliases={'/aladin':'projects/ALADIN/website/aladin.html','/aladin-v2':'projects/ALADIN/website/aladin-v2.html','/nexus':'projects/NEXUS-WORK/website/nexus-work-v2.html','/nexus-work':'projects/NEXUS-WORK/website/nexus-work-v2.html','/nexus-work/':'projects/NEXUS-WORK/website/nexus-work-v2.html','/nexus-logistics':'projects/NEXUS-LOGISTICS/website/nexus-logistics-presentation-suite.html','/nexus-logistics-v2':'projects/NEXUS-LOGISTICS/website/nexus-logistics-presentation-suite.html','/carpathia':'projects/CARPATHIA/website/carpathia-presentation-suite.html','/carpathia-master':'projects/CARPATHIA/website/carpathia-presentation-suite.html','/carpathia-feasibility':'projects/CARPATHIA/website/carpathia-feasibility.html','/agrohub':'projects/AGROHUB/website/agrohub-presentation-suite.html','/energy':'projects/ENERGY-PARK/website/energy-presentations-v1.html','/energy-master':'projects/ENERGY-PARK/website/energy-presentations-v1.html'};Object.entries(aliases).forEach(([route,file])=>app.get([route,route+'/'],(req,res)=>sendHtml(path.join(ROOT,file),res)));
app.get('/project-presentation-hub.html',(req,res)=>servePublic('project-presentation-hub.html',res));app.get(['/projects','/projects/','/portfolio'],(req,res)=>servePublic('projects-v5.html',res));app.get('/order',(req,res)=>res.redirect('https://mmw-order.onrender.com'));
app.get('/health',(req,res)=>res.json({service:'MMW-COMPANY',status:'ok',build:BUILD,repo:'itimchenko00-hash/MMW_COMPANY',branch:'main',canonicalHome:'/',homeFile:MAIN_FILE,homeFileExists:fs.existsSync(MAIN_PATH),projects:['ALADIN','NEXUS WORK','NEXUS LOGISTICS','CARPATHIA ECO LODGE','AGROHUB','ENERGY PARK'],order:'https://mmw-order.onrender.com'}));app.get('/__mmw-version',(req,res)=>res.type('text').send(`${BUILD}\nrepo=itimchenko00-hash/MMW_COMPANY\nbranch=main\ncanonicalHome=/\nhomeFile=${MAIN_FILE}\n`));
app.use('/public',express.static(PUBLIC,{maxAge:0}));app.use(express.static(ROOT,{maxAge:0}));app.use((req,res,next)=>{if(req.method==='GET'&&(req.path.endsWith('.html')||req.path==='/'))return res.redirect(308,'/');next()});app.use((req,res)=>res.status(404).send('MMW-COMPANY: route not found'));
app.listen(PORT,'0.0.0.0',()=>console.log(`MMW-COMPANY listening on ${PORT} | ${BUILD}`));