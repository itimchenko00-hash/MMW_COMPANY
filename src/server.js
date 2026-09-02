const express=require('express');
const path=require('path');
const fs=require('fs');
const app=express();
const PORT=process.env.PORT||10000;
const ROOT=path.join(__dirname,'..');
const PUBLIC=path.join(ROOT,'public');
const PROJECTS=path.join(ROOT,'projects');
const BUILD='2026-09-02-mmw-company-portfolio-v1';
app.disable('x-powered-by');
app.use((req,res,next)=>{res.set('Cache-Control','no-store,no-cache,must-revalidate,proxy-revalidate');res.set('Pragma','no-cache');res.set('Expires','0');res.set('X-MMW-Build',BUILD);res.set('X-MMW-Repo','itimchenko00-hash/MMW_COMPANY');res.set('X-MMW-Projects','portfolio-pages-independent');res.set('X-MMW-International','global-platform');next()});
function sendHtml(file,res){fs.readFile(file,'utf8',(err,html)=>{if(err)return res.status(404).send('Page not found');const script='<script src="/public/mmw-language.js"></script>';if(!html.includes('/public/mmw-language.js'))html=html.replace('</head>',script+'</head>');res.type('html').send(html)})}
function safeProjectFile(req,res,next){const rel=req.path.replace(/^\/+/, '');if(!rel.toLowerCase().endsWith('.html'))return next();const file=path.resolve(PROJECTS,rel);if(!file.startsWith(path.resolve(PROJECTS)+path.sep)||!fs.existsSync(file))return next();return sendHtml(file,res)}
app.use('/projects',safeProjectFile);
app.get('/',(req,res)=>sendHtml(path.join(PUBLIC,'mmw-company-master-v1.html'),res));
app.get('/index.html',(req,res)=>sendHtml(path.join(PUBLIC,'mmw-company-master-v1.html'),res));
app.get(['/company','/company/','/company.html'],(req,res)=>sendHtml(path.join(PUBLIC,'mmw-company-master-v1.html'),res));
app.get(['/international','/international/','/international.html'],(req,res)=>sendHtml(path.join(PUBLIC,'international.html'),res));
app.get(['/global'],(req,res)=>res.redirect('/international'));
const pages={about:'about-v1.html',services:'services-v1.html',products:'products-v2.html',investment:'investment-v1.html',team:'team-v1.html',contact:'contact-v1.html'};
Object.entries(pages).forEach(([route,file])=>app.get(['/'+route,'/'+route+'/' ],(req,res)=>sendHtml(path.join(PUBLIC,file),res)));
const aliases={
'/aladin':'projects/ALADIN/website/aladin.html','/aladin-v2':'projects/ALADIN/website/aladin-v2.html',
'/nexus':'projects/NEXUS-WORK/website/nexus-presentation-suite.html',
'/nexus-logistics':'projects/NEXUS-LOGISTICS/website/nexus-logistics-presentation-suite.html','/nexus-logistics-v2':'projects/NEXUS-LOGISTICS/website/nexus-logistics-presentation-suite.html',
'/carpathia':'projects/CARPATHIA/website/carpathia-presentation-suite.html','/carpathia-master':'projects/CARPATHIA/website/carpathia-presentation-suite.html','/carpathia-feasibility':'projects/CARPATHIA/website/carpathia-feasibility.html',
'/agrohub':'projects/AGROHUB/website/agrohub-presentation-suite.html',
'/energy':'projects/ENERGY-PARK/website/energy-presentations-v1.html','/energy-master':'projects/ENERGY-PARK/website/energy-presentations-v1.html'};
Object.entries(aliases).forEach(([route,file])=>app.get([route,route+'/'],(req,res)=>sendHtml(path.join(ROOT,file),res)));
app.get('/project-presentation-hub.html',(req,res)=>sendHtml(path.join(PUBLIC,'project-presentation-hub.html'),res));
app.get('/projects',(req,res)=>sendHtml(path.join(PUBLIC,'projects-v5.html'),res));
app.get('/projects/',(req,res)=>sendHtml(path.join(PUBLIC,'projects-v5.html'),res));
app.get('/portfolio',(req,res)=>sendHtml(path.join(PUBLIC,'projects-v5.html'),res));
app.get('/order',(req,res)=>res.redirect('https://mmw-order.onrender.com'));
app.get('/health',(req,res)=>res.json({service:'MMW-COMPANY',status:'ok',build:BUILD,repo:'itimchenko00-hash/MMW_COMPANY',branch:'main',visualLayer:'enabled-on-project-html',projects:['ALADIN','NEXUS WORK','NEXUS LOGISTICS','CARPATHIA ECO LODGE','AGROHUB','ENERGY PARK'],international:'/international',presentations:'/project-presentation-hub.html',order:'https://mmw-order.onrender.com'}));
app.get('/__mmw-version',(req,res)=>res.type('text').send(`${BUILD}\nrepo=itimchenko00-hash/MMW_COMPANY\nbranch=main\nvisualLayer=enabled-on-project-html\nprojects=ALADIN|NEXUS-WORK|NEXUS-LOGISTICS|CARPATHIA|AGROHUB|ENERGY-PARK\n`));
app.use('/public',express.static(PUBLIC,{maxAge:0}));
app.use(express.static(ROOT,{maxAge:0}));
app.listen(PORT,'0.0.0.0',()=>console.log(`MMW-COMPANY listening on ${PORT}`));