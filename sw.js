const V='besaitung-v1',SHELL=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=V&&x!='fonts').map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
 const r=e.request,u=new URL(r.url);if(r.method!='GET')return;
 if(u.origin==location.origin){
  e.respondWith(fetch(r).then(res=>{const c=res.clone();caches.open(V).then(x=>x.put(r,c));return res}).catch(()=>caches.match(r,{ignoreSearch:true}).then(m=>m||caches.match('./index.html'))));
 }else if(u.host=='fonts.googleapis.com'||u.host=='fonts.gstatic.com'){
  e.respondWith(caches.open('fonts').then(c=>c.match(r).then(m=>{const n=fetch(r).then(res=>{c.put(r,res.clone());return res}).catch(()=>m);return m||n})));
 }
});
