const {readFileSync}=require('fs'),vm=require('vm'),assert=require('assert');
function boot({ios=false,installed=false}={}) {
 const events={},elements={};
 const element=id=>elements[id] ||= {hidden:false,disabled:false,textContent:'',innerHTML:'',open:false,events:{},addEventListener(t,f){this.events[t]=f},showModal(){this.open=true},close(){this.open=false}};
 const media={matches:installed,addEventListener(){}};
 vm.runInNewContext(readFileSync('pwa.js','utf8'),{window:{matchMedia:()=>media,isSecureContext:true,addEventListener(t,f){events[t]=f}},navigator:{userAgent:ios?'iPhone':'Android',platform:'',maxTouchPoints:0},document:{getElementById:element}});
 return {events,element};
}
(async()=>{
 let b=boot({ios:true});await b.element('install-app').events.click();assert(b.element('install-help').open);assert(b.element('install-steps').innerHTML.includes('Safari'));assert(b.element('install-steps').innerHTML.includes('Tela de Início'));
 b=boot();await b.element('install-app').events.click();assert(b.element('install-steps').innerHTML.includes('Android'));
 let prompted=0,prevented=0;b.events.beforeinstallprompt({preventDefault(){prevented++},prompt:async()=>{prompted++},userChoice:Promise.resolve({outcome:'dismissed'})});await b.element('install-app').events.click();assert.equal(prompted,1);assert.equal(prevented,1);assert.equal(b.element('install-app').disabled,false);await b.element('install-app').events.click();assert.equal(prompted,1);
 b.events.appinstalled();assert(b.element('install-bar').hidden);assert.equal(b.element('install-help').open,false);
 assert(boot({installed:true}).element('install-bar').hidden);
 const manifest=JSON.parse(readFileSync('manifest.webmanifest'));assert.equal(manifest.start_url,'./');assert.equal(manifest.scope,'./');assert.equal(manifest.display,'standalone');for(const icon of manifest.icons)assert(require('fs').existsSync(icon.src));
 const swEvents={},cached=[];const base='https://example.com/repository/';const context={URL,self:{registration:{scope:base},location:{origin:'https://example.com'},addEventListener(t,f){swEvents[t]=f},skipWaiting(){},clients:{claim(){}}},caches:{open:async()=>({addAll:async files=>cached.push(...files),put:async()=>{},match:async()=>({cached:true})}),keys:async()=>['unrelated-cache'],delete:async()=>{throw Error('must not delete unrelated cache')}},fetch:async()=>{throw Error('offline')}};vm.runInNewContext(readFileSync('sw.js','utf8'),context);
 let done;swEvents.install({waitUntil(p){done=p}});await done;assert(cached.includes('pwa.js'));assert(cached.includes('assets/icon-512.png'));swEvents.activate({waitUntil(p){done=p}});await done;
 let response;swEvents.fetch({request:{method:'GET',url:base+'index.html'},respondWith(p){response=p}});assert((await response).cached);response=null;swEvents.fetch({request:{method:'GET',url:base+'api/orders'},respondWith(p){response=p}});assert.equal(response,null);
 console.log('PASS: iOS/Android guidance, native install/dismissal, installed state, relative manifest/icons, scoped cache and offline fallback');
})().catch(e=>{console.error(e);process.exit(1)});
