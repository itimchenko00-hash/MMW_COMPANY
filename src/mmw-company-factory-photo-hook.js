const fs=require('fs');
const path=require('path');
const original=fs.readFileSync.bind(fs);
const ROOT=path.join(__dirname,'..');
const FACTORY='https://raw.githubusercontent.com/itimchenko00-hash/MMW-ORDER-FACTORY/main/ASSETS/MMW-COMPANY/photos/';
const map={
  'photo-1454165804606-c3d57bc86b40':'photo-1454165804606-c3d57bc86b40-5cb4ffe2d354.jpg',
  'photo-1556761175-b413da4baf72':'photo-1556761175-b413da4baf72-54886b3aabbb.jpg',
  'photo-1521737711867-e3b97375f902':'photo-1521737711867-e3b97375f902-dc2ffad77d44.jpg',
  'photo-1554224155-6726b3ff858f':'photo-1554224155-6726b3ff858f-600c3f7500f5.jpg',
  'photo-1523958203904-cdcb402031fd':'photo-1523958203904-cdcb402031fd-eea3588fbc8e.jpg',
  'photo-1556761175-4b46a572b786':'photo-1556761175-4b46a572b786-5f0869ca04c5.jpg',
  'photo-1556761175-5973dc0f32e7':'photo-1556761175-5973dc0f32e7-f6d4c58e7202.jpg',
  'photo-1486406146926-c627a92ad1ab':'photo-1486406146926-c627a92ad1ab-21482423fc87.jpg',
  'photo-1497366754035-f200968a6e72':'photo-1497366754035-f200968a6e72-e27ad949c922.jpg',
  'photo-1497366811353-6870744d04b2':'photo-1497366811353-6870744d04b2-52aaa4b902a1.jpg',
  'photo-1450101499163-c8848c66ca85':'photo-1450101499163-c8848c66ca85-a1683e4494b0.jpg',
  'photo-1500534314209-a25ddb2bd429':'photo-1500534314209-a25ddb2bd429-25cfb8c2dad4.jpg',
  'photo-1504307651254-35680f356dfd':'photo-1504307651254-35680f356dfd-9750b75b1cb4.jpg',
  'photo-1504384308090-c894fdcc538d':'photo-1504384308090-c894fdcc538d-c3b2c2711ef9.jpg',
  'photo-1509440159596-0249088772ff':'photo-1509440159596-0249088772ff-f157815b508e.jpg',
  'photo-1517245386807-bb43f82c33c4':'photo-1517245386807-bb43f82c33c4-4681ea60bfa2.jpg',
  'photo-1552664730-d307ca884978':'photo-1552664730-d307ca884978-8acb77ea6fa1.jpg',
  'photo-1553877522-43269d4ea984':'photo-1553877522-43269d4ea984-efaae09e4491.jpg',
  'photo-1566665797739-1674de7a421a':'photo-1566665797739-1674de7a421a-8f316122da7e.jpg',
  'photo-1613395450289-e560907d9308':'photo-1613395450289-e560907d9308-ea4be18cb589.jpg'
};
function integrate(value,file){if(typeof value!=='string')return value;if(!path.resolve(file).startsWith(path.join(ROOT,'company','website')))return value;for(const [id,target] of Object.entries(map)){const re=new RegExp('https://images\\.unsplash\\.com/'+id.replace(/[.*+?^${}()|[\\]\\]/g,'\\$&')+'[^\"\\']*','g');value=value.replace(re,FACTORY+target)}return value}
fs.readFileSync=function(file,options){const value=original(file,options);return integrate(value,file)};
