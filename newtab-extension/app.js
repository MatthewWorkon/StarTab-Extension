/* ═══════════════════════════════════════════════════════
   StarTab v5  —  app.js
   ═══════════════════════════════════════════════════════ */
'use strict';

/* ── ENGINES ─────────────────────────────────────────── */
const ENGINES={
  google:{icon:'G',url:'https://www.google.com/search?q='},
  bing:{icon:'B',url:'https://www.bing.com/search?q='},
  duckduckgo:{icon:'🦆',url:'https://duckduckgo.com/?q='},
  baidu:{icon:'百',url:'https://www.baidu.com/s?wd='},
  sogou:{icon:'搜',url:'https://www.sogou.com/web?query='},
};

/* ── CATEGORIES ──────────────────────────────────────── */
const CATS={
  '效率办公':{cls:'cat-c1'},  '工具':{cls:'cat-c2'},
  '视频网站':{cls:'cat-c3'},  '社交媒体':{cls:'cat-c4'},
  '阅读资讯':{cls:'cat-c5'},  '游戏娱乐':{cls:'cat-c6'},
  '购物电商':{cls:'cat-c7'},  '学习教育':{cls:'cat-c8'},
  '金融理财':{cls:'cat-c9'},  '未指明':{cls:'cat-c10'},
};

/* ── AUTO-CLASSIFY (3 strategies) ────────────────────── */
const E='效率办公',T='工具',V='视频网站',S='社交媒体',
      R='阅读资讯',G='游戏娱乐',P='购物电商',L='学习教育',F='金融理财';

const DM={
  // 效率办公
  'mail.google.com':E,'docs.google.com':E,'drive.google.com':E,'calendar.google.com':E,
  'meet.google.com':E,'sheets.google.com':E,'slides.google.com':E,'forms.google.com':E,
  'notion.so':E,'app.notion.so':E,'slack.com':E,'app.slack.com':E,'discord.com':E,
  'figma.com':E,'linear.app':E,'trello.com':E,'asana.com':E,'airtable.com':E,
  'miro.com':E,'feishu.cn':E,'lark.com':E,'app.lark.com':E,'dingtalk.com':E,
  'work.weixin.qq.com':E,'outlook.office.com':E,'outlook.office365.com':E,
  'confluence.atlassian.com':E,'jira.atlassian.com':E,'basecamp.com':E,
  'monday.com':E,'clickup.com':E,'todoist.com':E,'evernote.com':E,
  'teams.microsoft.com':E,'zoom.us':E,'webex.com':E,'dropbox.com':E,'box.com':E,
  'overleaf.com':E,'notion.so':E,'obsidian.md':E,'roamresearch.com':E,
  // 工具
  'github.com':T,'gist.github.com':T,'gitlab.com':T,'bitbucket.org':T,
  'stackoverflow.com':T,'stackexchange.com':T,'developer.mozilla.org':T,'devdocs.io':T,
  'npmjs.com':T,'pypi.org':T,'crates.io':T,
  'chatgpt.com':T,'chat.openai.com':T,'platform.openai.com':T,'claude.ai':T,
  'gemini.google.com':T,'copilot.microsoft.com':T,'perplexity.ai':T,'bard.google.com':T,
  'translate.google.com':T,'maps.google.com':T,'google.com':T,'www.google.com':T,
  'bing.com':T,'duckduckgo.com':T,'excalidraw.com':T,'draw.io':T,'app.diagrams.net':T,
  'codepen.io':T,'replit.com':T,'vercel.com':T,'netlify.com':T,'railway.app':T,
  'huggingface.co':T,'colab.research.google.com':T,'arxiv.org':T,
  'stackblitz.com':T,'codesandbox.io':T,'regex101.com':T,'jwt.io':T,
  'canva.com':T,'unsplash.com':T,'pexels.com':T,'tinypng.com':T,
  // 视频
  'youtube.com':V,'www.youtube.com':V,'music.youtube.com':V,'youtu.be':V,
  'netflix.com':V,'bilibili.com':V,'www.bilibili.com':V,'b23.tv':V,
  'twitch.tv':V,'vimeo.com':V,'iqiyi.com':V,'v.youku.com':V,'youku.com':V,
  'v.qq.com':V,'mgtv.com':V,'douyin.com':V,'tiktok.com':V,'www.tiktok.com':V,
  'hulu.com':V,'disneyplus.com':V,'primevideo.com':V,'hbomax.com':V,'max.com':V,
  'ted.com':V,'dailymotion.com':V,'rumble.com':V,'crunchyroll.com':V,
  // 社交
  'x.com':S,'twitter.com':S,'reddit.com':S,'old.reddit.com':S,'linkedin.com':S,
  'instagram.com':S,'facebook.com':S,'threads.net':S,'bsky.app':S,'mastodon.social':S,
  'news.ycombinator.com':S,'producthunt.com':S,'xiaohongshu.com':S,'weibo.com':S,
  'pinterest.com':S,'snapchat.com':S,'tumblr.com':S,'vk.com':S,'quora.com':S,
  'v2ex.com':S,'nodeseek.com':S,'telegram.org':S,'web.telegram.org':S,'t.me':S,
  'web.whatsapp.com':S,'web.signal.org':S,
  // 阅读
  'medium.com':R,'substack.com':R,'wikipedia.org':R,'en.wikipedia.org':R,
  'zh.wikipedia.org':R,'news.google.com':R,'theguardian.com':R,'nytimes.com':R,
  'bbc.com':R,'bbc.co.uk':R,'wsj.com':R,'economist.com':R,'ft.com':R,
  'techcrunch.com':R,'theverge.com':R,'wired.com':R,'arstechnica.com':R,
  'venturebeat.com':R,'readwise.io':R,'instapaper.com':R,'getpocket.com':R,
  'zhihu.com':R,'jianshu.com':R,'36kr.com':R,'sspai.com':R,'ifanr.com':R,
  'inoreader.com':R,'feedly.com':R,
  // 游戏
  'store.steampowered.com':G,'steamcommunity.com':G,'epicgames.com':G,'gog.com':G,
  'itch.io':G,'battle.net':G,'ea.com':G,'ubisoft.com':G,'xbox.com':G,
  'playstation.com':G,'nintendo.com':G,'roblox.com':G,'minecraft.net':G,
  'leagueoflegends.com':G,'dota2.com':G,'gamespot.com':G,'ign.com':G,'kotaku.com':G,
  'www.4399.com':G,'wegame.com.cn':G,'game.bilibili.com':G,
  // 购物
  'amazon.com':P,'amazon.co.uk':P,'amazon.co.jp':P,'amazon.de':P,
  'ebay.com':P,'taobao.com':P,'tmall.com':P,'jd.com':P,'pinduoduo.com':P,
  'shopify.com':P,'etsy.com':P,'aliexpress.com':P,'walmart.com':P,'target.com':P,
  'bestbuy.com':P,'shein.com':P,'shopee.com':P,'lazada.com':P,'rakuten.com':P,
  // 学习
  'coursera.org':L,'udemy.com':L,'edx.org':L,'khanacademy.org':L,
  'skillshare.com':L,'pluralsight.com':L,'freecodecamp.org':L,'codecademy.com':L,
  'leetcode.com':L,'leetcode.cn':L,'hackerrank.com':L,'codewars.com':L,
  'brilliant.org':L,'duolingo.com':L,'babbel.com':L,'quizlet.com':L,
  'ankiweb.net':L,'wolframalpha.com':L,'desmos.com':L,'geogebra.org':L,
  'scholar.google.com':L,'researchgate.net':L,'jstor.org':L,'arxiv.org':L,
  'coursera.org':L,'imooc.com':L,'icourse163.org':L,'xuetangx.com':L,
  // 金融
  'paypal.com':F,'stripe.com':F,'binance.com':F,'coinbase.com':F,'kraken.com':F,
  'tradingview.com':F,'finance.yahoo.com':F,'investing.com':F,'morningstar.com':F,
  'bloomberg.com':F,'cnbc.com':F,'seekingalpha.com':F,'xueqiu.com':F,
  'eastmoney.com':F,'10jqka.com.cn':F,'bankofamerica.com':F,'chase.com':F,
  'icbc.com.cn':F,'ccb.com':F,'boc.cn':F,'abchina.com':F,'alipay.com':F,
  'wise.com':F,'robinhood.com':F,'fidelity.com':F,'vanguard.com':F,'schwab.com':F,
};

const STRUCT=[
  {t:h=>/\.edu(\.|$)/.test(h),c:L},{t:h=>/\.ac\.[a-z]{2}$/.test(h),c:L},
  {t:h=>/\.gov(\.|$)/.test(h),c:R},{t:h=>/^(mail|inbox)\./i.test(h),c:E},
  {t:h=>/^(calendar|cal)\./i.test(h),c:E},{t:h=>/^(docs?|sheets?|slides?)\./i.test(h),c:E},
  {t:h=>/^(meet|zoom|conf)\./i.test(h),c:E},{t:h=>/^(pay|bank|invest)\./i.test(h),c:F},
  {t:h=>/^(shop|store|buy|cart)\./i.test(h),c:P},{t:h=>/^(learn|edu|academy|course)\./i.test(h),c:L},
  {t:h=>/^(news|press|blog|media)\./i.test(h),c:R},{t:h=>/^(game|play|gaming)\./i.test(h),c:G},
  {t:h=>/^(video|watch|stream|tv)\./i.test(h),c:V},{t:h=>/^(social|chat|community)\./i.test(h),c:S},
  {t:h=>/^(api|dev|docs?|sandbox|console)\./i.test(h),c:T},
];

const KW=[
  [/\b(office|workspace|task|todo|project|plan|team|collab|crm|okr|slack|notion|figma|asana|jira|trello|clickup|zoom)\b/i,E,3],
  [/\b(code|dev|git|api|sdk|npm|pip|docker|cloud|deploy|ci|cd|debug|ide|chatgpt|claude|gemini|openai|anthropic|ai|llm)\b/i,T,3],
  [/\b(tool|util|convert|format|compress|generate|calc|translate|map)\b/i,T,2],
  [/\b(video|watch|stream|tube|tv|movie|film|anime|drama|vod|live|youtube|netflix|bilibili|tiktok)\b/i,V,3],
  [/\b(social|community|forum|tweet|share|follow|feed|reddit|twitter|instagram|discord|telegram|weibo)\b/i,S,3],
  [/\b(news|blog|read|article|magazine|journal|press|media|wiki|substack|medium|zhihu)\b/i,R,2],
  [/\b(game|play|steam|gaming|esport|rpg|fps|moba|roblox|minecraft|fortnite|lol)\b/i,G,3],
  [/\b(shop|store|buy|cart|order|checkout|ecommerce|market|mall|deal|amazon|taobao|ebay)\b/i,P,3],
  [/\b(learn|course|edu|school|study|tutor|lesson|exam|quiz|lecture|coursera|udemy|leetcode|duolingo)\b/i,L,3],
  [/\b(bank|finance|invest|stock|crypto|fund|pay|wallet|trade|exchange|insurance|loan|tax|paypal|binance)\b/i,F,3],
];

function autoClassify(hostname,url){
  if(!hostname)return'未指明';
  const h=hostname.toLowerCase();
  if(DM[h])return DM[h];
  const bare=h.replace(/^www\./,'');
  if(DM[bare])return DM[bare];
  const parts=bare.split('.');
  if(parts.length>=2){
    const a2=parts.slice(-2).join('.');if(DM[a2])return DM[a2];
    const a3=parts.slice(-3).join('.');if(DM[a3])return DM[a3];
  }
  for(const r of STRUCT)if(r.t(h))return r.c;
  const tgt=h+' '+(url||'').replace(/https?:\/\/[^/]+/,'').slice(0,100);
  const sc={};
  for(const[re,cat,w]of KW)if(re.test(tgt))sc[cat]=(sc[cat]||0)+w;
  const best=Object.entries(sc).sort(([,a],[,b])=>b-a)[0];
  return best&&best[1]>=3?best[0]:'未指明';
}

/* ── WCAG THEME ENGINE ───────────────────────────────── */
function lum(hex){
  const r=parseInt(hex.slice(1,3),16)/255,g=parseInt(hex.slice(3,5),16)/255,b=parseInt(hex.slice(5,7),16)/255;
  const f=c=>c<=0.03928?c/12.92:Math.pow((c+0.055)/1.055,2.4);
  return 0.2126*f(r)+0.7152*f(g)+0.0722*f(b);
}
function cr(h1,h2){const l1=lum(h1),l2=lum(h2),hi=Math.max(l1,l2),lo=Math.min(l1,l2);return(hi+0.05)/(lo+0.05);}
function mixHex(hex,amt){
  let r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16);
  r=Math.max(0,Math.min(255,Math.round(r+amt*255)));
  g=Math.max(0,Math.min(255,Math.round(g+amt*255)));
  b=Math.max(0,Math.min(255,Math.round(b+amt*255)));
  return'#'+[r,g,b].map(v=>v.toString(16).padStart(2,'0')).join('');
}
function avgHex(h1,h2){
  const r=(parseInt(h1.slice(1,3),16)+parseInt(h2.slice(1,3),16))>>1;
  const g=(parseInt(h1.slice(3,5),16)+parseInt(h2.slice(3,5),16))>>1;
  const b=(parseInt(h1.slice(5,7),16)+parseInt(h2.slice(5,7),16))>>1;
  return'#'+[r,g,b].map(v=>v.toString(16).padStart(2,'0')).join('');
}

/** Compute readable text colour that meets minCR against bgHex */
function readableOn(bgHex,minCR=4.5){
  const dark=lum(bgHex)<0.18;
  const candidates=dark
    ?['#eef0f5','#d8dce8','#c0c8d8','#ffffff']
    :['#12151e','#1e2434','#2e3448','#000000'];
  for(const c of candidates)if(cr(bgHex,c)>=minCR)return c;
  return dark?'#ffffff':'#000000';
}
function readableT2(bgHex){
  const dark=lum(bgHex)<0.18;
  const candidates=dark
    ?['#9aa6be','#8390a8','#7080a0']
    :['#5a6272','#464e5e','#333c4a'];
  for(const c of candidates)if(cr(bgHex,c)>=3.0)return c;
  return dark?'#9aa6be':'#464e5e';
}
function readableT3(bgHex){
  const dark=lum(bgHex)<0.18;
  const candidates=dark
    ?['#526080','#607090','#506278']
    :['#8898b0','#9aabb8','#aabbca'];
  for(const c of candidates)if(cr(bgHex,c)>=2.2)return c;
  return dark?'#526080':'#8898b0';
}

/** Apply board theme from a representative background colour */
function applyBoardTheme(bgHex){
  const t1=readableOn(bgHex,4.5);
  const t2=readableT2(bgHex);
  const t3=readableT3(bgHex);
  const dark=lum(bgHex)<0.18;

  const cardAlpha=dark?'rgba(255,255,255,0.045)':'rgba(0,0,0,0.05)';
  const bdAlpha  =dark?'rgba(255,255,255,0.09)' :'rgba(0,0,0,0.09)';
  const gsAlpha  =dark?'rgba(255,255,255,0.05)' :'rgba(0,0,0,0.04)';
  const gsbAlpha =dark?'rgba(255,255,255,0.10)' :'rgba(0,0,0,0.10)';

  const rr=parseInt(bgHex.slice(1,3),16),gg=parseInt(bgHex.slice(3,5),16),bb=parseInt(bgHex.slice(5,7),16);
  const fbg=`rgba(${rr},${gg},${bb},0.96)`;

  const root=document.documentElement;
  root.style.setProperty('--tb-bg',  bgHex);
  root.style.setProperty('--tb-bg2', fbg);
  root.style.setProperty('--tb-card',cardAlpha);
  root.style.setProperty('--tb-bd',  bdAlpha);
  root.style.setProperty('--tb-t1',  t1);
  root.style.setProperty('--tb-t2',  t2);
  root.style.setProperty('--tb-t3',  t3);
  root.style.setProperty('--tb-gs',  gsAlpha);
  root.style.setProperty('--tb-gsb', gsbAlpha);

  const c1v=cr(bgHex,t1).toFixed(1);
  return `主文字对比度 ${c1v}:1 ${Number(c1v)>=7?'✦ AAA':Number(c1v)>=4.5?'✓ AA':'△ 偏低'} · 次要 ${cr(bgHex,t2).toFixed(1)}:1`;
}

/** Apply gradient: use mid-point colour for text derivation */
function applyGradientTheme(c1,c2,dir){
  const mid=avgHex(c1,c2);
  const info=applyBoardTheme(mid);
  const board=document.getElementById('boardSection');
  if(board)board.style.background=`linear-gradient(${dir},${c1},${c2})`;
  return info;
}

/** Reset board background to --tb-bg (solid mode) */
function resetBoardBg(){
  const board=document.getElementById('boardSection');
  if(board)board.style.background='';
}

/* ── STATE ───────────────────────────────────────────── */
let openTabs=[], domainGroups=[], activeEngine='google';
let timeFilter='all', typeFilter='all';
let ddOpen=false, rafId=null, starPaused=false;

/* ── Undo-close state ─────────────────────────────────── */
// Snapshot of all tabs before "close all" — [{url, title}]
let _undoAllSnapshot = null;
// Last single tab closed — {url, title}
let _undoOneTab = null;
// Timer handles for auto-hiding restore buttons
let _undoAllTimer = null, _undoOneTimer = null;
const UNDO_TTL = 30000; // 30 s window

function _showRestoreAll() {
  _undoAllSnapshot && _setRestoreBtn('all', true);
  clearTimeout(_undoAllTimer);
  _undoAllTimer = setTimeout(() => _setRestoreBtn('all', false), UNDO_TTL);
}
function _showRestoreOne() {
  _undoOneTab && _setRestoreBtn('one', true);
  clearTimeout(_undoOneTimer);
  _undoOneTimer = setTimeout(() => _setRestoreBtn('one', false), UNDO_TTL);
}
function _setRestoreBtn(which, show) {
  const el = document.getElementById(which === 'all' ? 'restoreAllBtn' : 'restoreOneBtn');
  if (el) el.style.display = show ? 'flex' : 'none';
  if (!show) {
    if (which === 'all') _undoAllSnapshot = null;
    else _undoOneTab = null;
  }
}
let themeState={type:'solid',color:'#0e1520',gc1:'#0e1520',gc2:'#1a0f30',dir:'135deg'};

/* ── CHROME API ──────────────────────────────────────── */
const SKIP=['chrome://','chrome-extension://','about:','edge://','brave://'];

async function fetchTabs(){
  try{
    const extId=chrome.runtime.id, ntUrl=`chrome-extension://${extId}/index.html`;
    const all=await chrome.tabs.query({});
    openTabs=all.map(t=>({id:t.id,url:t.url,title:t.title,favIconUrl:t.favIconUrl,
      windowId:t.windowId,active:t.active,lastAccessed:t.lastAccessed||Date.now(),
      isStarTab:t.url===ntUrl||t.url==='chrome://newtab/'}));
  }catch{openTabs=[];}
}

async function getTopSites(){
  try{if(chrome.topSites){const s=await chrome.topSites.get();return s.slice(0,10);}}catch{}
  try{
    const{visitCounts={}}=await chrome.storage.local.get('visitCounts');
    return Object.entries(visitCounts).sort(([,a],[,b])=>b-a).slice(0,10)
      .map(([url])=>{let title=url;try{const u=new URL(url);title=fd(u.hostname)||u.hostname;}catch{}return{url,title};});
  }catch{return[];}
}

async function loadSettings(){try{const{settings={}}=await chrome.storage.local.get('settings');return settings;}catch{return{};}}
async function patchSettings(obj){
  try{const{settings={}}=await chrome.storage.local.get('settings');
    await chrome.storage.local.set({settings:{...settings,...obj}});}catch{}
}

/* ── BOOKMARKS (chrome.storage.sync + local mirror) ──────
   Data structure:
   {
     groups: [{id, name, collapsed}],           // ordered groups
     bookmarks: [{id, url, title, groupId, addedAt}]
     // groupId === 'root' means ungrouped
   }
   ─────────────────────────────────────────────────────── */
const BM_KEY = 'bookmarks_v2';

async function loadBmData(){
  try{
    const r = await chrome.storage.sync.get(BM_KEY);
    const d = r[BM_KEY];
    if(d && d.bookmarks) return d;
  }catch{}
  try{
    const r = await chrome.storage.local.get(BM_KEY);
    const d = r[BM_KEY];
    if(d && d.bookmarks) return d;
    // Migrate old flat array if present
    const old = r['bookmarks_v1'] || r[BM_KEY];
    if(Array.isArray(old)){
      const migrated = {groups:[], bookmarks: old.map(b=>({...b, groupId:'root'}))};
      return migrated;
    }
  }catch{}
  return {groups:[], bookmarks:[]};
}

async function saveBmData(data){
  const payload = {
    groups: (data.groups||[]).slice(0,100),
    bookmarks: (data.bookmarks||[]).slice(0,500)
  };
  try{ await chrome.storage.sync.set({[BM_KEY]:payload}); }catch{}
  try{ await chrome.storage.local.set({[BM_KEY]:payload}); }catch{}
}

// Legacy compat
async function loadBookmarks(){
  const d = await loadBmData();
  return d.bookmarks||[];
}
async function saveBookmarks(list){
  const d = await loadBmData();
  d.bookmarks = list.slice(0,500);
  await saveBmData(d);
}

async function addBookmark(url, title, groupId='root'){
  const d = await loadBmData();
  if(d.bookmarks.some(b=>b.url===url)) return false;
  d.bookmarks.unshift({id:Date.now().toString(), url, title, groupId, addedAt:new Date().toISOString()});
  await saveBmData(d);
  return true;
}

async function removeBookmark(id){
  const d = await loadBmData();
  d.bookmarks = d.bookmarks.filter(b=>b.id!==id);
  await saveBmData(d);
}

async function addGroup(name){
  const d = await loadBmData();
  const id = 'g'+Date.now().toString();
  d.groups.push({id, name, collapsed:false});
  await saveBmData(d);
  return id;
}

async function removeGroup(groupId){
  const d = await loadBmData();
  d.groups = d.groups.filter(g=>g.id!==groupId);
  // Move items from deleted group to root
  d.bookmarks = d.bookmarks.map(b=>b.groupId===groupId ? {...b, groupId:'root'} : b);
  await saveBmData(d);
}

async function toggleGroupCollapsed(groupId){
  const d = await loadBmData();
  const g = d.groups.find(g=>g.id===groupId);
  if(g) g.collapsed = !g.collapsed;
  await saveBmData(d);
}

async function moveBookmarkToGroup(bmId, groupId){
  const d = await loadBmData();
  const bm = d.bookmarks.find(b=>b.id===bmId);
  if(bm) bm.groupId = groupId;
  await saveBmData(d);
}

function exportBookmarks(data){
  const blob = new Blob([JSON.stringify({version:2, exported:new Date().toISOString(), ...data}, null, 2)], {type:'application/json'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `startab-bookmarks-${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  setTimeout(()=>URL.revokeObjectURL(a.href), 1000);
}

async function importBookmarks(file){
  return new Promise((resolve, reject)=>{
    const reader = new FileReader();
    reader.onload = async e=>{
      try{
        const raw = JSON.parse(e.target.result);
        let groups=[], bookmarks=[];
        if(raw.version===2 && raw.bookmarks){
          groups = (raw.groups||[]).map(g=>({id:g.id,name:g.name,collapsed:!!g.collapsed}));
          bookmarks = raw.bookmarks.filter(b=>b.url&&b.title).map(b=>({
            id:b.id||Date.now().toString()+Math.random(),
            url:b.url, title:b.title,
            groupId:b.groupId||'root',
            addedAt:b.addedAt||new Date().toISOString()
          }));
        } else {
          const list = raw.bookmarks||raw;
          if(!Array.isArray(list)) throw new Error('invalid');
          bookmarks = list.filter(b=>b.url&&b.title).map(b=>({
            id:b.id||Date.now().toString()+Math.random(),
            url:b.url, title:b.title, groupId:'root',
            addedAt:b.addedAt||new Date().toISOString()
          }));
        }
        await saveBmData({groups, bookmarks});
        resolve(bookmarks.length);
      }catch(err){ reject(err); }
    };
    reader.readAsText(file);
  });
}

/* ── WALLPAPER HISTORY ───────────────────────────────── */
const BG_HIST_KEY = 'bgHistory';

async function loadBgHistory(){
  try{ const{[BG_HIST_KEY]:h=[]}=await chrome.storage.local.get(BG_HIST_KEY); return h; }catch{ return []; }
}

async function pushBgHistory(url){
  if(!url) return;
  let hist = await loadBgHistory();
  hist = [url, ...hist.filter(u=>u!==url)].slice(0, 5);
  try{ await chrome.storage.local.set({[BG_HIST_KEY]:hist}); }catch{}
}

async function removeBgHistory(url){
  let hist = await loadBgHistory();
  hist = hist.filter(u=>u!==url);
  try{ await chrome.storage.local.set({[BG_HIST_KEY]:hist}); }catch{}
}

async function renderBgHistory(activeUrl=''){
  const hist = await loadBgHistory();
  const wrap = document.getElementById('bgHistory');
  const strip = document.getElementById('bgHistoryStrip');
  if(!wrap||!strip) return;
  if(!hist.length){ wrap.style.display='none'; return; }
  wrap.style.display='block';
  strip.innerHTML = hist.map(url=>`
    <div class="bg-hist-thumb${url===activeUrl?' active':''}"
         style="background-image:url('${esc(url)}')"
         data-bg-hist="${esc(url)}"
         title="${esc(url)}">
      <button class="bg-hist-del" data-del-hist="${esc(url)}" title="从历史中删除">✕</button>
    </div>`).join('');
}

/* ── SAVED-FOR-LATER (local storage) ─────────────────── */
async function saveForLater(tab){
  const{deferred=[]}=await chrome.storage.local.get('deferred');
  deferred.push({id:Date.now().toString(),url:tab.url,title:tab.title,savedAt:new Date().toISOString(),done:false,deleted:false});
  await chrome.storage.local.set({deferred});
}
async function getDeferred(){
  const{deferred=[]}=await chrome.storage.local.get('deferred');
  const live=deferred.filter(t=>!t.deleted);
  return{active:live.filter(t=>!t.done),archived:live.filter(t=>t.done)};
}
async function patchDeferred(id,patch){
  const{deferred=[]}=await chrome.storage.local.get('deferred');
  const t=deferred.find(t=>t.id===id);if(t)Object.assign(t,patch);
  await chrome.storage.local.set({deferred});
}
async function deleteDeferred(id){
  const{deferred=[]}=await chrome.storage.local.get('deferred');
  await chrome.storage.local.set({deferred:deferred.filter(t=>t.id!==id)});
}

/* ── TRASH (soft-delete store) ───────────────────────── */
const TRASH_KEY='trash_v1';
async function getTrash(){
  try{const{[TRASH_KEY]:t=[]}=await chrome.storage.local.get(TRASH_KEY);return t;}catch{return[];}
}
async function moveToTrash(item,sourceType){
  // item: {id,url,title,...}  sourceType: 'bookmark'|'later'
  const trash=await getTrash();
  trash.unshift({...item,_source:sourceType,_deletedAt:new Date().toISOString()});
  // Keep at most 200 items in trash
  await chrome.storage.local.set({[TRASH_KEY]:trash.slice(0,200)});
}
async function restoreFromTrash(trashId){
  const trash=await getTrash();
  const item=trash.find(t=>t.id===trashId);if(!item)return null;
  await chrome.storage.local.set({[TRASH_KEY]:trash.filter(t=>t.id!==trashId)});
  return item;
}
async function permanentDelete(trashId){
  const trash=await getTrash();
  await chrome.storage.local.set({[TRASH_KEY]:trash.filter(t=>t.id!==trashId)});
}
async function emptyTrash(){
  await chrome.storage.local.set({[TRASH_KEY]:[]});
}

/* ── TAB ACTIONS ─────────────────────────────────────── */
async function closeTabUrl(url) {
  const all = await chrome.tabs.query({});
  const m = all.find(t => t.url === url);
  if (!m) return;
  // Snapshot for single-tab undo
  _undoOneTab = { url: m.url, title: m.title || m.url };
  _setRestoreBtn('all', false); // hide "restore all" when a single close happens
  await chrome.tabs.remove(m.id);
  await fetchTabs();
  _showRestoreOne();
}

async function closeByHost(h) {
  const all = await chrome.tabs.query({});
  const ids = all.filter(t => { try { return new URL(t.url).hostname === h; } catch { return false; } }).map(t => t.id);
  if (ids.length) await chrome.tabs.remove(ids);
  await fetchTabs();
}

async function closeAll() {
  const all = await chrome.tabs.query({});
  const targets = all.filter(t => t.url && !SKIP.some(p => t.url.startsWith(p)));
  // Snapshot for undo
  _undoAllSnapshot = targets.map(t => ({ url: t.url, title: t.title || t.url }));
  _setRestoreBtn('one', false); // hide single-tab restore when closing all
  const ids = targets.map(t => t.id);
  if (ids.length) await chrome.tabs.remove(ids);
  await fetchTabs();
  _showRestoreAll();
}
async function focusTab(url){
  const all=await chrome.tabs.query({});const cw=await chrome.windows.getCurrent();
  let m=all.filter(t=>t.url===url);
  if(!m.length){try{const h=new URL(url).hostname;m=all.filter(t=>{try{return new URL(t.url).hostname===h;}catch{return false;}});}catch{}}
  if(!m.length)return;
  const match=m.find(t=>t.windowId!==cw.id)||m[0];
  await chrome.tabs.update(match.id,{active:true});
  await chrome.windows.update(match.windowId,{focused:true});
}
async function dedupeUrl(url){
  const all=await chrome.tabs.query({});const d=all.filter(t=>t.url===url);
  if(d.length<=1)return;const keep=d.find(t=>t.active)||d[0];
  const ids=d.filter(t=>t.id!==keep.id).map(t=>t.id);if(ids.length)await chrome.tabs.remove(ids);await fetchTabs();
}
async function closeStarDupes(){
  const id=chrome.runtime.id;const url=`chrome-extension://${id}/index.html`;
  const all=await chrome.tabs.query({});const cw=await chrome.windows.getCurrent();
  const nt=all.filter(t=>t.url===url||t.url==='chrome://newtab/');if(nt.length<=1)return;
  const keep=nt.find(t=>t.active&&t.windowId===cw.id)||nt.find(t=>t.active)||nt[0];
  const ids=nt.filter(t=>t.id!==keep.id).map(t=>t.id);if(ids.length)await chrome.tabs.remove(ids);await fetchTabs();
}

/* ── STRING UTILS ────────────────────────────────────── */
const FD={'github.com':'GitHub','gist.github.com':'GitHub Gist','youtube.com':'YouTube',
  'music.youtube.com':'YouTube Music','x.com':'X','twitter.com':'X','reddit.com':'Reddit',
  'substack.com':'Substack','medium.com':'Medium','linkedin.com':'LinkedIn',
  'stackoverflow.com':'Stack Overflow','news.ycombinator.com':'Hacker News',
  'google.com':'Google','mail.google.com':'Gmail','docs.google.com':'Google Docs',
  'drive.google.com':'Google Drive','calendar.google.com':'Google Calendar',
  'meet.google.com':'Google Meet','gemini.google.com':'Gemini',
  'chatgpt.com':'ChatGPT','chat.openai.com':'ChatGPT','claude.ai':'Claude',
  'notion.so':'Notion','figma.com':'Figma','slack.com':'Slack','discord.com':'Discord',
  'wikipedia.org':'Wikipedia','en.wikipedia.org':'Wikipedia',
  'amazon.com':'Amazon','netflix.com':'Netflix','bilibili.com':'Bilibili',
  'vercel.com':'Vercel','npmjs.com':'npm','developer.mozilla.org':'MDN',
  'arxiv.org':'arXiv','huggingface.co':'Hugging Face','producthunt.com':'Product Hunt',
  'xiaohongshu.com':'小红书','douyin.com':'抖音','taobao.com':'淘宝','jd.com':'京东',
  'tmall.com':'天猫','zhihu.com':'知乎','weibo.com':'微博','instagram.com':'Instagram',};
function fd(h){
  if(!h)return'';const k=h.replace(/^www\./,'');if(FD[h])return FD[h];if(FD[k])return FD[k];
  if(h.endsWith('.substack.com'))return cap(h.replace('.substack.com',''))+"'s Substack";
  if(h.endsWith('.github.io'))return cap(h.replace('.github.io',''))+' (gh-pages)';
  return k.replace(/\.(com|org|net|io|co|ai|dev|app|so|me|xyz|cn|uk|gov|edu)$/,'').split('.').map(cap).join(' ');
}
function cap(s){return s?s[0].toUpperCase()+s.slice(1):'';}
function cleanTitle(t,h){
  if(!t||!h)return t||'';const fr=fd(h),dm=h.replace(/^www\./,'');
  for(const sep of[' - ',' | ',' — ',' · ',' – ']){
    const i=t.lastIndexOf(sep);if(i<0)continue;
    const sfx=t.slice(i+sep.length).trim().toLowerCase();
    if([dm,fr,dm.replace(/\.\w+$/,'')].map(s=>s.toLowerCase()).some(s=>s===sfx)||dm.toLowerCase().includes(sfx)||fr.toLowerCase().includes(sfx)){
      const c=t.slice(0,i).trim();if(c.length>=5)return c;}
  }return t;
}
function dispTitle(tab){
  if(!tab.url)return tab.title||'';
  let h='';try{h=new URL(tab.url).hostname;}catch{}
  let t=(tab.title||'').replace(/^\(\d+\+?\)\s*/,'').replace(/[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/g,'').trim();
  return cleanTitle(t,h)||fd(h)||tab.url;
}
function favUrl(h){return`https://www.google.com/s2/favicons?domain=${encodeURIComponent(h)}&sz=64`;}
function timeAgo(v){
  if(!v)return'';const ms=typeof v==='number'?v:new Date(v).getTime(),d=Date.now()-ms;
  const m=Math.floor(d/6e4),hr=Math.floor(d/36e5),dy=Math.floor(d/864e5);
  if(m<1)return'刚刚';if(m<60)return`${m}分前`;if(hr<24)return`${hr}时前`;
  if(dy===1)return'昨天';return`${dy}天前`;
}
function timeBucket(ms){
  const now=new Date(),today=new Date(now.getFullYear(),now.getMonth(),now.getDate()).getTime();
  if(ms>=today)return'today';if(ms>=today-864e5)return'yesterday';
  if(ms>=today-864e5*2)return'day-before';if(ms>=today-864e5*7)return'last-week';
  return'older';
}
function esc(s){if(!s)return'';return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}

let _tt;
function toast(msg){
  const el=document.getElementById('toast');document.getElementById('toastMsg').textContent=msg;
  el.classList.add('on');clearTimeout(_tt);_tt=setTimeout(()=>el.classList.remove('on'),2400);
}

function chipClose(chip){
  if(!chip)return;chip.style.cssText+='transition:opacity .16s,transform .16s;opacity:0;transform:scale(.84)';
  setTimeout(()=>{const card=chip.closest('.d-card');chip.remove();if(card&&!card.querySelectorAll('.chip').length)cardOut(card);},180);
}
function cardOut(card){
  if(!card)return;const r=card.getBoundingClientRect();burst(r.left+r.width/2,r.top+r.height/2);
  card.classList.add('out');setTimeout(()=>{card.remove();checkEmpty();},240);
}
function checkEmpty(){
  const g=document.getElementById('tabGrid');if(!g)return;
  if(g.querySelector('.d-card:not(.out)'))return;
  g.innerHTML=`<div class="empty-state"><div class="empty-ic">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"/></svg></div>
    <p class="empty-ttl">标签清零！</p><p class="empty-sub">脑清爽，心自由。</p></div>`;
}
function burst(x,y){
  const cols=['#e8a845','#e87070','#a87be8','#5cc8a0','#5ba3f5','#f07347','#e8689f','#60c5e8'];
  for(let i=0;i<13;i++){
    const el=document.createElement('div'),sz=5+Math.random()*6,circ=Math.random()>.5;
    el.style.cssText=`position:fixed;left:${x}px;top:${y}px;width:${sz}px;height:${sz}px;background:${cols[i%cols.length]};border-radius:${circ?'50%':'2px'};pointer-events:none;z-index:9999;transform:translate(-50%,-50%)`;
    document.body.appendChild(el);
    const a=Math.random()*Math.PI*2,sp=60+Math.random()*110,vx=Math.cos(a)*sp,vy=Math.sin(a)*sp-75;
    const dur=640+Math.random()*200,t0=performance.now();
    (function f(now){const e=(now-t0)/1e3,p=e/(dur/1e3);if(p>=1){el.remove();return;}
      el.style.transform=`translate(calc(-50% + ${vx*e}px),calc(-50% + ${vy*e+90*e*e}px)) rotate(${e*160*(circ?0:1)}deg)`;
      el.style.opacity=p<.5?1:1-(p-.5)*2;requestAnimationFrame(f);})(performance.now());
  }
}
function playClose(){
  try{
    const ctx=new(window.AudioContext||window.webkitAudioContext)(),t=ctx.currentTime,dur=.18;
    const buf=ctx.createBuffer(1,ctx.sampleRate*dur,ctx.sampleRate),d=buf.getChannelData(0);
    for(let i=0;i<d.length;i++){const p=i/d.length;d[i]=(Math.random()*2-1)*(p<.1?p/.1:Math.pow(1-(p-.1)/.9,1.5));}
    const src=ctx.createBufferSource();src.buffer=buf;
    const flt=ctx.createBiquadFilter();flt.type='bandpass';flt.Q.value=2;
    flt.frequency.setValueAtTime(2800,t);flt.frequency.exponentialRampToValueAtTime(260,t+dur);
    const g=ctx.createGain();g.gain.setValueAtTime(.09,t);g.gain.exponentialRampToValueAtTime(.001,t+dur);
    src.connect(flt).connect(g).connect(ctx.destination);src.start(t);
    setTimeout(()=>ctx.close(),350);
  }catch{}
}

/* ── STARFIELD ───────────────────────────────────────── */
function initStarfield(){
  const canvas=document.getElementById('starfield');if(!canvas)return;
  const ctx=canvas.getContext('2d');let W,H,stars;
  function resize(){
    const dpr=Math.min(window.devicePixelRatio||1,2);W=window.innerWidth;H=window.innerHeight;
    canvas.width=W*dpr;canvas.height=H*dpr;canvas.style.width=W+'px';canvas.style.height=H+'px';
    ctx.setTransform(dpr,0,0,dpr,0,0);build();
  }
  function build(){
    const n=Math.min(Math.floor(W*H/1600),340);
    stars=Array.from({length:n},()=>({x:Math.random()*W,y:Math.random()*H*.80,r:.3+Math.random()*1.3,a:.3+Math.random()*.7,ph:Math.random()*Math.PI*2,sp:.3+Math.random()*.7}));
  }
  function rocks(){
    ctx.fillStyle='#020408';
    ctx.beginPath();ctx.moveTo(0,H);ctx.lineTo(0,H*.73);ctx.bezierCurveTo(W*.05,H*.60,W*.12,H*.58,W*.18,H*.65);ctx.bezierCurveTo(W*.22,H*.70,W*.26,H*.76,W*.29,H);ctx.closePath();ctx.fill();
    ctx.beginPath();ctx.moveTo(W,H);ctx.lineTo(W,H*.69);ctx.bezierCurveTo(W*.90,H*.57,W*.82,H*.56,W*.76,H*.63);ctx.bezierCurveTo(W*.71,H*.70,W*.69,H*.76,W*.67,H);ctx.closePath();ctx.fill();
  }
  function draw(ts){
    if(!starPaused){
      const dpr=Math.min(window.devicePixelRatio||1,2);ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,W,H);
      const bg=ctx.createLinearGradient(0,0,0,H);bg.addColorStop(0,'#04070f');bg.addColorStop(.5,'#070d1a');bg.addColorStop(.75,'#0c1020');bg.addColorStop(1,'#161108');
      ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);
      const hor=ctx.createRadialGradient(W*.5,H,0,W*.5,H*.84,W*.55);hor.addColorStop(0,'rgba(155,76,14,.34)');hor.addColorStop(.42,'rgba(88,44,10,.16)');hor.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=hor;ctx.fillRect(0,0,W,H);
      const neb=ctx.createRadialGradient(W*.3,H*.32,0,W*.3,H*.32,W*.3);neb.addColorStop(0,'rgba(48,32,108,.07)');neb.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=neb;ctx.fillRect(0,0,W,H);
      const t=ts/1000;for(const s of stars){const a=s.a*(.7+.3*Math.sin(t*s.sp+s.ph));ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fillStyle=`rgba(215,205,255,${a})`;ctx.fill();}
      rocks();
    }
    rafId=requestAnimationFrame(draw);
  }
  document.addEventListener('visibilitychange',()=>{starPaused=document.hidden;});
  window.addEventListener('resize',resize,{passive:true});
  resize();rafId=requestAnimationFrame(draw);
}

function applyBackground(url){
  const canvas=document.getElementById('starfield'),layer=document.getElementById('bgImageLayer');
  if(url){
    if(canvas)canvas.style.display='none';if(rafId){cancelAnimationFrame(rafId);rafId=null;}
    layer.style.backgroundImage=`url("${url.replace(/"/g,'%22')}")`;layer.classList.add('active');
    document.body.style.background='#0a0f1e';
  }else{
    if(canvas)canvas.style.display='block';layer.classList.remove('active');layer.style.backgroundImage='';
    if(!rafId)initStarfield();
  }
}

/* ── CLOCK ───────────────────────────────────────────── */
function tick(){const now=new Date(),el=document.getElementById('heroClock');if(el)el.textContent=String(now.getHours()).padStart(2,'0')+':'+String(now.getMinutes()).padStart(2,'0');}
function renderDate(){const D=['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],now=new Date(),el=document.getElementById('heroDate');if(el)el.textContent=`${now.getFullYear()}年${now.getMonth()+1}月${now.getDate()}日 ${D[now.getDay()]}`;}

/* ── ENGINE DROPDOWN ─────────────────────────────────── */
function ddPos(){const b=document.getElementById('engBtn'),d=document.getElementById('engDropdown');if(!b||!d)return;const r=b.getBoundingClientRect();d.style.top=(r.bottom+7)+'px';d.style.left=r.left+'px';}
function ddShow(){ddOpen=true;const d=document.getElementById('engDropdown');if(!d)return;ddPos();d.style.display='block';d.style.animation='none';void d.offsetWidth;d.style.animation='';document.getElementById('engChev')?.classList.add('open');}
function ddHide(){ddOpen=false;const d=document.getElementById('engDropdown');if(!d)return;d.style.display='none';document.getElementById('engChev')?.classList.remove('open');}
function setEngine(k){activeEngine=k;const e=ENGINES[k]||ENGINES.google;const i=document.getElementById('engIcon');if(i)i.textContent=e.icon;document.querySelectorAll('.eng-opt').forEach(b=>b.classList.toggle('selected',b.dataset.engine===k));const s=document.getElementById('setEngine');if(s)s.value=k;}

/* ── SEARCH ──────────────────────────────────────────── */
function doSearch(){const q=(document.getElementById('searchInput')?.value||'').trim();if(!q)return;const e=ENGINES[activeEngine]||ENGINES.google;const isUrl=/^https?:\/\//i.test(q)||(/^[a-z0-9.-]+\.[a-z]{2,}/i.test(q)&&!q.includes(' '));window.location.href=isUrl?(q.startsWith('http')?q:'https://'+q):e.url+encodeURIComponent(q);}

/* ── SHORTCUTS ───────────────────────────────────────── */
function renderShortcuts(sites){
  const row=document.getElementById('shortcutsRow');if(!row)return;
  if(!sites?.length){row.innerHTML=`<span style="font-size:11px;color:rgba(255,255,255,.30);padding:6px">暂无常用网站记录</span>`;return;}
  const frag=document.createDocumentFragment();
  sites.forEach((s,i)=>{
    let host='';try{host=new URL(s.url).hostname;}catch{}
    const raw=s.title&&s.title!==s.url?s.title:(fd(host)||host);
    const label=raw.length>10?raw.slice(0,10)+'…':raw;
    const a=document.createElement('a');a.className='sc-item';a.href=s.url;a.title=raw+'\n'+s.url;a.style.animationDelay=(i*35)+'ms';
    a.innerHTML=`<div class="sc-ring"><img src="${esc(favUrl(host))}" alt="" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"><span class="sc-letter" style="display:none">${host?host[0].toUpperCase():'?'}</span></div><span class="sc-label">${esc(label)}</span>`;
    frag.appendChild(a);
  });row.innerHTML='';row.appendChild(frag);
}
function showSkel(){const row=document.getElementById('shortcutsRow');if(!row)return;row.innerHTML=Array.from({length:8},()=>`<div class="sc-skel"><div class="sk-c"></div><div class="sk-l"></div></div>`).join('');}

/* ── TAB BOARD ───────────────────────────────────────── */
function buildGroups(tabs){
  const map=new Map();
  for(const t of tabs){
    const url=t.url||'';if(SKIP.some(p=>url.startsWith(p))||t.isStarTab)continue;
    let host='__local__';try{host=new URL(url).hostname||'__local__';}catch{}
    if(!map.has(host)){const cat=autoClassify(host,url);map.set(host,{domain:host,label:fd(host)||host,tabs:[],cat});}
    map.get(host).tabs.push(t);
  }return[...map.values()].sort((a,b)=>b.tabs.length-a.tabs.length);
}
function filteredGroups(all){
  return all.filter(g=>{
    if(typeFilter!=='all'&&g.cat!==typeFilter)return false;
    if(timeFilter==='all')return true;
    return g.tabs.some(t=>timeBucket(t.lastAccessed)===timeFilter);
  }).map(g=>timeFilter==='all'?g:{...g,tabs:g.tabs.filter(t=>timeBucket(t.lastAccessed)===timeFilter)}).filter(g=>g.tabs.length>0);
}

const I={
  bm:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"/></svg>`,
  save:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>`,
  close:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/></svg>`,
  check:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"/></svg>`,
  undo:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"/></svg>`,
  trash:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/></svg>`,
};

function chipHTML(tab,host,letter,uc,bookmarkedUrls){
  const title=dispTitle(tab),isDupe=(uc.get(tab.url)||0)>1;
  const img=tab.favIconUrl||(host?favUrl(host):'');
  const isBm=bookmarkedUrls&&bookmarkedUrls.has(tab.url);
  const fav=img?`<img src="${esc(img)}" alt="" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"><span class="chip-let" style="display:none">${letter}</span>`:`<span class="chip-let">${letter}</span>`;
  return`<div class="chip" data-action="focus-tab" data-url="${esc(tab.url)}" title="${esc(title+'\n'+tab.url)}"><div class="chip-ico">${fav}</div><span class="chip-title">${esc(title)}</span>${isDupe?`<span class="chip-dupe">重复</span>`:''}<div class="chip-acts"><button class="chip-act bm-act${isBm?' bookmarked':''}" data-action="toggle-bm-chip" data-url="${esc(tab.url)}" data-tab-title="${esc(tab.title||'')}" title="${isBm?'已收藏':'添加到收藏夹'}">${I.bm}</button><button class="chip-act save-act" data-action="save-tab" data-url="${esc(tab.url)}" data-tab-title="${esc(tab.title||'')}" title="稍后阅读">${I.save}</button><button class="chip-act close-act" data-action="close-tab" data-url="${esc(tab.url)}" title="关闭">${I.close}</button></div></div>`;
}

function cardHTML(group,idx,bookmarkedUrls){
  const{domain,label,tabs,cat}=group;const info=CATS[cat]||CATS['未指明'];
  const cid='card-'+domain.replace(/[^a-z0-9]/gi,'-');
  const host=domain==='__local__'?'':domain,letter=(label||host||'?')[0]?.toUpperCase()||'?';
  const fav=host?favUrl(host):'';
  const uc=new Map();tabs.forEach(t=>uc.set(t.url,(uc.get(t.url)||0)+1));
  const dupeUrls=[...uc.entries()].filter(([,c])=>c>1).map(([u])=>u);
  const faviconInner=fav?`<img src="${esc(fav)}" alt="" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"><span class="d-let" style="display:none">${letter}</span>`:`<span class="d-let">${letter}</span>`;
  const dedup=dupeUrls.length?`<div class="dedup-notice" data-action="dedup" data-dupe-urls="${dupeUrls.map(u=>encodeURIComponent(u)).join(',')}" data-card-id="${cid}">${I.close} ${dupeUrls.length} 个重复 — 点击清理</div>`:'';
  return`<div class="d-card ${info.cls}" id="${cid}" style="animation-delay:${idx*38}ms"><div class="d-bar"></div><div class="d-hdr"><div class="d-fav">${faviconInner}</div><div class="d-info"><div class="d-name" title="${esc(host)}">${esc(label)}</div><div class="d-meta"><span class="d-cnt">${tabs.length} 个标签</span><span class="d-badge">${esc(cat)}</span></div></div><button class="d-close" data-action="close-domain" data-domain="${esc(domain)}" data-card-id="${cid}">${I.close}</button></div>${dedup}<div class="d-chips">${tabs.map(t=>chipHTML(t,host,letter,uc,bookmarkedUrls)).join('')}</div></div>`;
}

async function renderBoard(){
  const grid=document.getElementById('tabGrid'),cnt=document.getElementById('secCount');
  const sumEl=document.getElementById('fsum'),statEl=document.getElementById('statN');
  if(!grid)return;
  const all=buildGroups(openTabs);domainGroups=all;const filtered=filteredGroups(all);
  const total=filtered.reduce((s,g)=>s+g.tabs.length,0);
  if(sumEl)sumEl.textContent=`${filtered.length} 个域名 · ${total} 个标签`;
  if(cnt)cnt.textContent=`${filtered.length}`;
  if(statEl)statEl.textContent=openTabs.filter(t=>!t.isStarTab&&!SKIP.some(p=>(t.url||'').startsWith(p))).length;
  const bar=document.getElementById('dupeBar');if(bar)bar.style.display=openTabs.filter(t=>t.isStarTab).length>1?'flex':'none';
  // Build set of bookmarked URLs for chip highlighting
  const bmList=await loadBookmarks();
  const bookmarkedUrls=new Set(bmList.map(b=>b.url));
  if(!filtered.length){grid.innerHTML=`<div class="empty-state"><div class="empty-ic">${I.close}</div><p class="empty-ttl">没有符合条件的标签</p><p class="empty-sub">换个筛选条件试试？</p></div>`;return;}
  grid.innerHTML=filtered.map((g,i)=>cardHTML(g,i,bookmarkedUrls)).join('');
}

/* ══════════════════════════════════════════════════════
   BOOKMARKS — tree-view + move-to-group popup (v8)
   ══════════════════════════════════════════════════════ */

/** Build one bookmark row DOM element */
function makeBmRow(bm, currentGroupId, hasGroups) {
  let host = '';
  try { host = new URL(bm.url).hostname; } catch {}
  const letter = (bm.title || host || '?')[0]?.toUpperCase() || '?';
  const img    = host ? favUrl(host) : '';

  const row = document.createElement('div');
  row.className = 'bm-row';
  row.title     = `${bm.title || bm.url}\n${bm.url}`;

  const favInner = img
    ? `<img src="${esc(img)}" alt="" loading="lazy"
         onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
       <span class="bm-row-letter" style="display:none">${letter}</span>`
    : `<span class="bm-row-letter">${letter}</span>`;

  // "Move" button only shown when there are groups to move between
  const moveBtn = hasGroups
    ? `<button class="bm-row-btn btn-move" data-bm-id="${bm.id}" data-current-gid="${currentGroupId}" title="移动到分组">
         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
           <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5"/>
         </svg></button>`
    : '';

  row.innerHTML = `
    <div class="bm-row-fav">${favInner}</div>
    <span class="bm-row-title">${esc(bm.title || bm.url)}</span>
    <div class="bm-row-acts">
      ${moveBtn}
      <button class="bm-row-btn btn-del" data-bm-id="${bm.id}" title="删除（移至垃圾箱）">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>`;

  // Open URL on row/title click
  row.querySelector('.bm-row-title').addEventListener('click', () => window.open(bm.url, '_blank'));
  row.querySelector('.bm-row-fav').addEventListener('click',   () => window.open(bm.url, '_blank'));

  // Move button → show popup
  const moveEl = row.querySelector('.btn-move');
  if (moveEl) {
    moveEl.addEventListener('click', e => {
      e.stopPropagation();
      showMovePopup(moveEl, bm.id, currentGroupId);
    });
  }

  // Delete button → trash
  row.querySelector('.btn-del').addEventListener('click', async e => {
    e.stopPropagation();
    const d    = await loadBmData();
    const item = d.bookmarks.find(b => b.id === bm.id);
    if (item) await moveToTrash({ ...item }, 'bookmark');
    await removeBookmark(bm.id);
    row.style.cssText += 'transition:opacity .16s;opacity:0';
    setTimeout(async () => { row.remove(); await renderBookmarks(); }, 180);
    await renderTrash();
    toast('已移至垃圾箱');
  });

  return row;
}

/** Render the full bookmark tree into #bmTree */
async function renderBookmarks() {
  const bmData   = await loadBmData();
  const { groups = [], bookmarks = [] } = bmData;
  const tree     = document.getElementById('bmTree');
  const empty    = document.getElementById('bmEmpty');
  const badge    = document.getElementById('bmCount');

  if (!tree) return;

  if (badge) {
    badge.textContent = bookmarks.length || '';
    badge.classList.toggle('visible', bookmarks.length > 0);
  }

  tree.innerHTML = '';

  if (!bookmarks.length) {
    if (empty) empty.style.display = 'block';
    return;
  }
  if (empty) empty.style.display = 'none';

  const hasGroups = groups.length > 0;

  // ── Root items (ungrouped) ──────────────────────────
  const rootItems = bookmarks.filter(b => !b.groupId || b.groupId === 'root');
  if (rootItems.length) {
    if (hasGroups) {
      const lbl = document.createElement('p');
      lbl.className   = 'bm-section-label';
      lbl.textContent = '未分组';
      tree.appendChild(lbl);
    }
    rootItems.forEach(bm => tree.appendChild(makeBmRow(bm, 'root', hasGroups)));
  }

  // ── Group nodes (collapsible) ───────────────────────
  groups.forEach(g => {
    const gItems = bookmarks.filter(b => b.groupId === g.id);

    const node = document.createElement('div');
    node.className    = `bm-group-node${g.collapsed ? ' collapsed' : ''}`;
    node.dataset.gid  = g.id;

    // Header
    const hdr = document.createElement('div');
    hdr.className = 'bm-group-hdr';
    hdr.innerHTML = `
      <svg class="bm-group-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"/>
      </svg>
      <span class="bm-group-hdr-name">${esc(g.name)}</span>
      <span class="bm-group-hdr-cnt">${gItems.length}</span>
      <button class="bm-group-hdr-del" title="删除分组（内容移至未分组）">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/>
        </svg>
      </button>`;

    // Toggle collapse
    hdr.addEventListener('click', async e => {
      if (e.target.closest('.bm-group-hdr-del')) return;
      node.classList.toggle('collapsed');
      const d = await loadBmData();
      const grp = d.groups.find(x => x.id === g.id);
      if (grp) { grp.collapsed = node.classList.contains('collapsed'); await saveBmData(d); }
    });

    // Delete group button
    hdr.querySelector('.bm-group-hdr-del').addEventListener('click', async e => {
      e.stopPropagation();
      await removeGroup(g.id);
      await renderBookmarks();
      toast(`分组「${g.name}」已删除，内容移至未分组`);
    });

    node.appendChild(hdr);

    // Children
    const children = document.createElement('div');
    children.className = 'bm-group-children';
    if (!gItems.length) {
      const hint = document.createElement('p');
      hint.className   = 'bm-group-empty';
      hint.textContent = '暂无收藏，可将未分组书签移入此处';
      children.appendChild(hint);
    } else {
      gItems.forEach(bm => children.appendChild(makeBmRow(bm, g.id, hasGroups)));
    }
    node.appendChild(children);
    tree.appendChild(node);
  });
}

/* ── Move-to-group popup ───────────────────────────────── */
let _movePopupOpen = false;

function closeMovePopup() {
  const p = document.getElementById('bmMovePopup');
  if (p) p.style.display = 'none';
  _movePopupOpen = false;
}

async function showMovePopup(anchorEl, bmId, currentGroupId) {
  const popup   = document.getElementById('bmMovePopup');
  const listEl  = document.getElementById('bmMoveList');
  if (!popup || !listEl) return;

  closeMovePopup();                              // close any existing one first
  const { groups = [] } = await loadBmData();

  // Options: root + all groups except current location
  const opts = [
    { id: 'root', name: '未分组（根目录）', icon: '📋' },
    ...groups.map(g => ({ id: g.id, name: g.name, icon: '📁' })),
  ];

  listEl.innerHTML = '';
  opts.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = `bm-move-opt${opt.id === currentGroupId ? ' is-current' : ''}`;
    btn.innerHTML = `<span>${opt.icon}</span>${esc(opt.name)}`;
    if (opt.id !== currentGroupId) {
      btn.addEventListener('click', async () => {
        closeMovePopup();
        await moveBookmarkToGroup(bmId, opt.id);
        await renderBookmarks();
        toast(`已移动到「${opt.name}」`);
      });
    }
    listEl.appendChild(btn);
  });

  // Position near anchor
  const rect = anchorEl.getBoundingClientRect();
  let left = rect.left;
  const W  = 200;
  if (left + W > window.innerWidth - 8) left = window.innerWidth - W - 8;
  popup.style.left    = left + 'px';
  popup.style.top     = (rect.bottom + 5) + 'px';
  popup.style.display = 'block';
  _movePopupOpen = true;
}

// Close popup on outside click
document.addEventListener('click', e => {
  if (_movePopupOpen &&
      !e.target.closest('#bmMovePopup') &&
      !e.target.closest('.btn-move')) {
    closeMovePopup();
  }
});

/* ── New-group form wiring ─────────────────────────────── */
document.getElementById('bmNewGroup')?.addEventListener('click', () => {
  const row = document.getElementById('bmNewGroupRow');
  if (row) { row.style.display = 'flex'; document.getElementById('bmGroupNameInput')?.focus(); }
});

async function _confirmNewGroup() {
  const inp  = document.getElementById('bmGroupNameInput');
  const name = (inp?.value || '').trim();
  if (!name) { inp?.focus(); return; }
  const row  = document.getElementById('bmNewGroupRow');
  if (row) row.style.display = 'none';
  if (inp)  inp.value = '';
  await addGroup(name);
  await renderBookmarks();
  toast(`已创建分组「${name}」`);
}

document.getElementById('bmGroupConfirm')?.addEventListener('click', _confirmNewGroup);
document.getElementById('bmGroupCancel')?.addEventListener('click', () => {
  const row = document.getElementById('bmNewGroupRow');
  if (row) row.style.display = 'none';
  const inp = document.getElementById('bmGroupNameInput');
  if (inp)  inp.value = '';
});
document.getElementById('bmGroupNameInput')?.addEventListener('keydown', e => {
  if (e.key === 'Enter')  _confirmNewGroup();
  if (e.key === 'Escape') document.getElementById('bmGroupCancel')?.click();
});

function arcItemHTML(item){
  return`<div class="arc-item" data-arc-id="${item.id}"><div class="arc-info"><a class="arc-ttl" href="${esc(item.url)}" target="_top" title="${esc(item.title||item.url)}">${esc(item.title||item.url)}</a><div class="arc-ago">${timeAgo(item.savedAt)}</div></div><div class="arc-acts"><button class="arc-btn arc-undo" data-action="unarchive" data-id="${item.id}" title="撤销">${I.undo}</button><button class="arc-btn arc-del" data-action="del-arc" data-id="${item.id}" title="删除">${I.trash}</button></div></div>`;
}
function refreshArcList(arch){const el=document.getElementById('arcList');if(!el)return;el.innerHTML=arch.length?arch.map(arcItemHTML).join(''):`<p style="font-size:10px;color:var(--tb-t3);padding:5px 0">无归档内容</p>`;}
async function renderLater(){
  const list=document.getElementById('laterList'),empty=document.getElementById('laterEmpty');
  const cnt=document.getElementById('laterBadge'),arcWrp=document.getElementById('archiveWrap'),arcCnt=document.getElementById('arcCnt');
  if(!list)return;
  const{active,archived}=await getDeferred();
  if(cnt){cnt.textContent=active.length||'';cnt.classList.toggle('visible',active.length>0);}
  if(empty)empty.style.display=active.length?'none':'block';
  list.innerHTML=active.length?active.map(item=>`<div class="later-item" data-id="${item.id}"><button class="later-chk" data-action="check-later" data-id="${item.id}">${I.check}</button><div class="later-info"><a class="later-ttl" href="${esc(item.url)}" target="_top">${esc(item.title||item.url)}</a><div class="later-ago">${timeAgo(item.savedAt)}</div></div><div class="later-acts"><button class="la-btn la-undo" data-action="restore-later" data-id="${item.id}" data-url="${esc(item.url)}" title="重新打开">${I.undo}</button><button class="la-btn la-del" data-action="del-later" data-id="${item.id}" title="删除">${I.trash}</button></div></div>`).join(''):'';
  if(arcWrp)arcWrp.style.display=archived.length?'block':'none';
  if(arcCnt)arcCnt.textContent=archived.length||'';
  const arcBody=document.getElementById('archiveBody');if(arcBody&&arcBody.style.display!=='none')refreshArcList(archived);
}

/* ── TRASH PANEL ─────────────────────────────────────── */
async function renderTrash(){
  const trash=await getTrash();
  const el=document.getElementById('trashList'),empty=document.getElementById('trashEmpty');
  const badge=document.getElementById('trashBadge');
  if(!el)return;
  if(badge){badge.textContent=trash.length||'';badge.classList.toggle('visible',trash.length>0);}
  if(!trash.length){el.innerHTML='';if(empty)empty.style.display='block';return;}
  if(empty)empty.style.display='none';
  el.innerHTML=trash.map(item=>{
    let host='';try{host=new URL(item.url).hostname;}catch{}
    const letter=(item.title||host||'?')[0]?.toUpperCase()||'?';
    const img=host?favUrl(host):'';
    const fav=img?`<img src="${esc(img)}" alt="" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"><span class="trash-fl" style="display:none">${letter}</span>`:`<span class="trash-fl">${letter}</span>`;
    const sourceLabel=item._source==='bookmark'?'收藏':'稍后';
    return`<div class="trash-item" title="${esc(item.title+'\n'+item.url)}">
      <div class="trash-fav">${fav}</div>
      <span class="trash-title">${esc(item.title||item.url)}</span>
      <span class="trash-source">${sourceLabel}</span>
      <div class="trash-acts">
        <button class="trash-btn trash-restore" data-action="restore-trash" data-trash-id="${item.id}" data-trash-source="${item._source}" title="恢复">${I.undo}</button>
        <button class="trash-btn trash-perm" data-action="perm-delete" data-trash-id="${item.id}" title="永久删除">${I.trash}</button>
      </div>
    </div>`;
  }).join('');
}
function switchPane(name){
  document.querySelectorAll('.rp-tab').forEach(t=>t.classList.toggle('active',t.dataset.pane===name));
  const panes={later:'laterPane',bookmarks:'bookmarksPane',trash:'trashPane'};
  Object.entries(panes).forEach(([k,id])=>{const el=document.getElementById(id);if(el)el.style.display=k===name?'flex':'none';});
  if(name==='trash')renderTrash();
}

/* ── THEME SETTINGS ──────────────────────────────────── */
function updateGradPreview(){
  const prev=document.getElementById('gradPreview');if(!prev)return;
  prev.style.background=`linear-gradient(${themeState.dir},${themeState.gc1},${themeState.gc2})`;
}
function switchThemeType(type){
  themeState.type=type;
  document.querySelectorAll('.ttype-tab').forEach(t=>t.classList.toggle('active',t.dataset.ttype===type));
  document.getElementById('solidPane').style.display=type==='solid'?'flex':'none';
  document.getElementById('gradPane').style.display=type==='gradient'?'flex':'none';
}
function applySolidTheme(hex){
  themeState.color=hex;resetBoardBg();
  const info=applyBoardTheme(hex);
  document.getElementById('wcagInfo').textContent=info;
  document.querySelectorAll('.sw').forEach(s=>s.classList.toggle('active',s.dataset.color===hex));
  const p=document.getElementById('solidPicker'),h=document.getElementById('solidHex');
  if(p)p.value=hex;if(h)h.value=hex;
  patchSettings({themeType:'solid',themeColor:hex});
}
function applyGradTheme(){
  const info=applyGradientTheme(themeState.gc1,themeState.gc2,themeState.dir);
  document.getElementById('wcagInfo').textContent=info;
  updateGradPreview();
  patchSettings({themeType:'gradient',gradC1:themeState.gc1,gradC2:themeState.gc2,gradDir:themeState.dir});
}

/* ── EVENT WIRING ────────────────────────────────────── */
// Search
// Search
document.getElementById('searchInput')?.addEventListener('keydown', e => {
  if (e.key === 'Enter') { closeSlashMenu(); doSearch(); }
  if (e.key === 'Escape') { closeSlashMenu(); e.target.value = ''; }
});
document.getElementById('searchInput')?.addEventListener('input', e => {
  const val = e.target.value;
  if (val === '/') {
    openSlashMenu();
  } else if (!val || val[0] !== '/') {
    closeSlashMenu();
  }
});
document.getElementById('searchGo')?.addEventListener('click', doSearch);
// Engine
document.getElementById('engBtn')?.addEventListener('click',e=>{e.stopPropagation();ddOpen?ddHide():ddShow();});
document.getElementById('engDropdown')?.addEventListener('click',e=>{const o=e.target.closest('.eng-opt');if(!o)return;setEngine(o.dataset.engine);patchSettings({engine:o.dataset.engine});ddHide();});
document.addEventListener('click',()=>{if(ddOpen)ddHide();});
window.addEventListener('scroll',()=>{if(ddOpen)ddPos();},{passive:true});
window.addEventListener('resize',()=>{if(ddOpen)ddPos();},{passive:true});
// Settings modal
document.getElementById('settingsBtn')?.addEventListener('click',()=>{document.getElementById('modalMask').style.display='flex';});
document.getElementById('modalClose')?.addEventListener('click',()=>{document.getElementById('modalMask').style.display='none';});
document.getElementById('modalMask')?.addEventListener('click',e=>{if(e.target===e.currentTarget)document.getElementById('modalMask').style.display='none';});
document.getElementById('setEngine')?.addEventListener('change',e=>{setEngine(e.target.value);patchSettings({engine:e.target.value});});
// Theme type tabs
document.querySelectorAll('.ttype-tab').forEach(t=>t.addEventListener('click',()=>switchThemeType(t.dataset.ttype)));
// Solid swatches
document.getElementById('themeSwatches')?.addEventListener('click',e=>{const sw=e.target.closest('.sw');if(!sw)return;applySolidTheme(sw.dataset.color);});
document.getElementById('solidPicker')?.addEventListener('input',e=>applySolidTheme(e.target.value));
document.getElementById('solidHex')?.addEventListener('change',e=>{let v=e.target.value.trim();if(!v.startsWith('#'))v='#'+v;if(/^#[0-9a-f]{6}$/i.test(v))applySolidTheme(v);});
// Gradient pickers
function setupGradPicker(picId,hexId,key){
  document.getElementById(picId)?.addEventListener('input',e=>{themeState[key]=e.target.value;const h=document.getElementById(hexId);if(h)h.value=e.target.value;applyGradTheme();});
  document.getElementById(hexId)?.addEventListener('change',e=>{let v=e.target.value.trim();if(!v.startsWith('#'))v='#'+v;if(/^#[0-9a-f]{6}$/i.test(v)){themeState[key]=v;const p=document.getElementById(picId);if(p)p.value=v;applyGradTheme();}});
}
setupGradPicker('gradC1','gradC1Hex','gc1');
setupGradPicker('gradC2','gradC2Hex','gc2');
document.getElementById('dirBtns')?.addEventListener('click',e=>{const b=e.target.closest('.dir-btn');if(!b)return;document.querySelectorAll('.dir-btn').forEach(x=>x.classList.remove('active'));b.classList.add('active');themeState.dir=b.dataset.dir;applyGradTheme();});
// Background
document.getElementById('bgApply')?.addEventListener('click',async()=>{
  const hint=document.getElementById('bgHint'),url=(document.getElementById('bgInput')?.value||'').trim();
  if(hint)hint.textContent='';
  if(!url){
    applyBackground('');await patchSettings({bgUrl:''});
    await renderBgHistory('');toast('已恢复星空动画');return;
  }
  if(!/^https:\/\//i.test(url)){if(hint)hint.textContent='请使用 HTTPS 图片链接';return;}
  applyBackground(url);await patchSettings({bgUrl:url});
  await pushBgHistory(url);await renderBgHistory(url);
  toast('背景已更新');
});

// Wallpaper history clicks (event delegation on history strip)
document.addEventListener('click',async e=>{
  const thumb=e.target.closest('[data-bg-hist]');
  if(thumb&&!e.target.closest('[data-del-hist]')){
    const url=thumb.dataset.bgHist;
    applyBackground(url);await patchSettings({bgUrl:url});
    const inp=document.getElementById('bgInput');if(inp)inp.value=url;
    await renderBgHistory(url);toast('背景已更新');return;
  }
  const delBtn=e.target.closest('[data-del-hist]');
  if(delBtn){
    e.stopPropagation();
    const url=delBtn.dataset.delHist;
    await removeBgHistory(url);
    const{settings={}}=await chrome.storage.local.get('settings');
    const currentBg=settings.bgUrl||'';
    if(currentBg===url){applyBackground('');await patchSettings({bgUrl:''});}
    await renderBgHistory(currentBg===url?'':currentBg);return;
  }
});
// Scroll hint
document.getElementById('scrollHint')?.addEventListener('click',()=>{document.getElementById('boardSection')?.scrollIntoView({behavior:'smooth'});});
// Filter pills
document.getElementById('filterBar')?.addEventListener('click',e=>{
  const p=e.target.closest('.fpill');if(!p)return;
  if('time'in p.dataset){document.querySelectorAll('.fpill[data-time]').forEach(x=>x.classList.remove('active'));p.classList.add('active');timeFilter=p.dataset.time;}
  if('type'in p.dataset){document.querySelectorAll('.fpill[data-type]').forEach(x=>x.classList.remove('active'));p.classList.add('active');typeFilter=p.dataset.type;}
  renderBoard();
});
// Right panel tabs
document.querySelectorAll('.rp-tab').forEach(t=>t.addEventListener('click',()=>switchPane(t.dataset.pane)));
// Archive toggle
document.addEventListener('click',e=>{
  const tog=e.target.closest('#archiveTog');if(!tog)return;tog.classList.toggle('open');
  const body=document.getElementById('archiveBody');if(!body)return;
  body.style.display=body.style.display==='none'?'block':'none';
  if(body.style.display!=='none')getDeferred().then(({archived})=>refreshArcList(archived));
});
document.addEventListener('input',async e=>{
  if(e.target.id!=='arcSearch')return;const q=e.target.value.trim().toLowerCase();
  const{archived}=await getDeferred();
  refreshArcList(q.length<2?archived:archived.filter(i=>(i.title||'').toLowerCase().includes(q)||(i.url||'').toLowerCase().includes(q)));
});
// Bookmarks: add current
// New group button
document.getElementById('bmNewGroup')?.addEventListener('click',()=>{
  const row=document.getElementById('bmNewGroupRow');
  if(!row)return;
  row.style.display='flex';
  document.getElementById('bmGroupNameInput')?.focus();
});
document.getElementById('bmGroupConfirm')?.addEventListener('click',async()=>{
  const inp=document.getElementById('bmGroupNameInput');
  const name=(inp?.value||'').trim();
  if(!name){inp?.focus();return;}
  await addGroup(name);
  await renderBookmarks();
  const row=document.getElementById('bmNewGroupRow');if(row)row.style.display='none';
  if(inp)inp.value='';
  toast(`已创建分组「${name}」`);
});
document.getElementById('bmGroupCancel')?.addEventListener('click',()=>{
  const row=document.getElementById('bmNewGroupRow');if(row)row.style.display='none';
  const inp=document.getElementById('bmGroupNameInput');if(inp)inp.value='';
});
document.getElementById('bmGroupNameInput')?.addEventListener('keydown',async e=>{
  if(e.key==='Enter'){document.getElementById('bmGroupConfirm')?.click();}
  if(e.key==='Escape'){document.getElementById('bmGroupCancel')?.click();}
});
// Bookmarks: export
document.getElementById('bmExport')?.addEventListener('click',async()=>{const data=await loadBmData();exportBookmarks(data);const n=(data.bookmarks||[]).length;toast(`已导出 ${n} 条收藏`);});
// Bookmarks: import
document.getElementById('bmImportFile')?.addEventListener('change',async e=>{
  const file=e.target.files?.[0];if(!file)return;
  try{const n=await importBookmarks(file);await renderBookmarks();toast(`已导入 ${n} 条收藏（已覆盖原有数据）`);}
  catch{toast('导入失败，请检查文件格式');}
  e.target.value='';
});

// Main action delegation
document.addEventListener('click',async e=>{
  const el=e.target.closest('[data-action]');if(!el)return;const action=el.dataset.action;

  if(action==='focus-tab'){const url=el.dataset.url;if(url)await focusTab(url);return;}
  if(action==='toggle-group'){
    const gid=el.dataset.groupId;if(!gid)return;
    await toggleGroupCollapsed(gid);
    const grpEl=document.querySelector(`.bm-group[data-group-id="${gid}"]`);
    if(grpEl)grpEl.classList.toggle('collapsed');return;
  }
  if(action==='del-group'){
    e.stopPropagation();const gid=el.dataset.groupId;if(!gid)return;
    await removeGroup(gid);await renderBookmarks();toast('分组已删除，内容移至根目录');return;
  }
  if(action==='open-bm'){const url=el.dataset.url;if(url)window.open(url,'_blank');return;}

  /* Toggle bookmark from chip button */
  if(action==='toggle-bm-chip'){
    e.stopPropagation();
    const url=el.dataset.url,title=el.dataset.tabTitle||url;if(!url)return;
    const list=await loadBookmarks();const existing=list.find(b=>b.url===url);
    if(existing){
      // Already bookmarked → move to trash (unfav)
      await removeBookmark(existing.id);
      await moveToTrash({...existing},'bookmark');
      el.classList.remove('bookmarked');el.title='添加到收藏夹';
      await renderBookmarks();await renderTrash();toast('已取消收藏');
    }else{
      const ok=await addBookmark(url,title);
      if(ok){el.classList.add('bookmarked');el.title='已收藏';await renderBookmarks();toast('已添加到收藏夹');}
      else toast('该页面已在收藏夹中');
    }
    return;
  }

  if(action==='close-tab'){
    e.stopPropagation();const url=el.dataset.url;if(!url)return;
    await closeTabUrl(url);playClose();chipClose(el.closest('.chip'));
    const s=document.getElementById('statN');if(s)s.textContent=openTabs.filter(t=>!t.isStarTab).length;
    toast('标签已关闭，可点击「恢复已关闭」撤销');return;
  }
  if(action==='save-tab'){
    e.stopPropagation();const url=el.dataset.url,title=el.dataset.tabTitle||url;if(!url)return;
    await saveForLater({url,title});const all2=await chrome.tabs.query({});const m=all2.find(t=>t.url===url);if(m)await chrome.tabs.remove(m.id);
    await fetchTabs();chipClose(el.closest('.chip'));await renderLater();toast('已保存至稍后阅读');return;
  }
  if(action==='close-domain'){
    const dom=el.dataset.domain,cid=el.dataset.cardId;const group=domainGroups.find(g=>g.domain===dom);
    if(group){
      if(dom==='__local__'){const all2=await chrome.tabs.query({});const ids=all2.filter(t=>group.tabs.some(gT=>gT.url===t.url)).map(t=>t.id);if(ids.length)await chrome.tabs.remove(ids);await fetchTabs();}
      else await closeByHost(dom);toast(`已关闭 ${group.tabs.length} 个标签`);
    }
    const card=document.getElementById(cid);if(card){playClose();cardOut(card);}
    const s=document.getElementById('statN');if(s)s.textContent=openTabs.filter(t=>!t.isStarTab).length;return;
  }
  if(action==='dedup'){
    const urls=(el.dataset.dupeUrls||'').split(',').map(u=>decodeURIComponent(u)).filter(Boolean),cid=el.dataset.cardId;
    for(const u of urls)await dedupeUrl(u);playClose();
    el.style.cssText+='transition:opacity .16s;opacity:0';setTimeout(()=>el.remove(),180);
    const card=document.getElementById(cid);if(card)card.querySelectorAll('.chip-dupe').forEach(b=>b.remove());
    toast('重复标签已清理');return;
  }
  if(action==='restore-all'){
    if(!_undoAllSnapshot?.length) return;
    const snap = _undoAllSnapshot;
    _setRestoreBtn('all', false);
    clearTimeout(_undoAllTimer);
    // Re-open each tab; duplicates skipped by browser naturally
    for(const t of snap) {
      try { await chrome.tabs.create({ url: t.url, active: false }); } catch {}
    }
    await fetchTabs(); await renderBoard();
    toast(`已恢复 ${snap.length} 个标签页`); return;
  }
  if(action==='restore-one'){
    if(!_undoOneTab) return;
    const tab = _undoOneTab;
    _setRestoreBtn('one', false);
    clearTimeout(_undoOneTimer);
    try { await chrome.tabs.create({ url: tab.url, active: true }); } catch {}
    await fetchTabs(); await renderBoard();
    toast(`已恢复「${tab.title}」`); return;
  }
  if(action==='close-all'){await closeAll();playClose();document.querySelectorAll('.d-card').forEach(c=>cardOut(c));toast('所有标签已关闭，可点击「恢复上次关闭」撤销');return;}
  if(action==='close-dupes'){await closeStarDupes();document.getElementById('dupeBar').style.display='none';toast('多余 StarTab 已关闭');return;}

  /* Bookmark actions — both send to trash */
  if(action==='unfav-bm'||action==='del-bm'){
    const id=el.dataset.bmId;if(!id)return;
    const list=await loadBookmarks();const bm=list.find(b=>b.id===id);
    if(bm)await moveToTrash({...bm},'bookmark');
    await removeBookmark(id);await renderBookmarks();await renderTrash();
    toast('已移至垃圾箱');return;
  }

  /* Later actions */
  if(action==='check-later'){
    const id=el.dataset.id;if(!id)return;await patchDeferred(id,{done:true,doneAt:new Date().toISOString()});
    const item=el.closest('.later-item');if(item){item.classList.add('done');setTimeout(()=>{item.classList.add('going');setTimeout(()=>{item.remove();renderLater();},260);},750);}
    return;
  }
  if(action==='restore-later'){
    const id=el.dataset.id,url=el.dataset.url;if(!id)return;if(url)chrome.tabs.create({url});await deleteDeferred(id);
    const item=el.closest('.later-item');if(item){item.classList.add('going');setTimeout(()=>{item.remove();renderLater();},260);}
    toast('已重新打开');return;
  }
  if(action==='del-later'){
    // Move to trash instead of permanent delete
    const id=el.dataset.id;if(!id)return;
    const{deferred=[]}=await chrome.storage.local.get('deferred');
    const def=deferred.find(d=>d.id===id);
    if(def)await moveToTrash({...def},'later');
    await deleteDeferred(id);
    const item=el.closest('.later-item');if(item){item.classList.add('going');setTimeout(()=>{item.remove();renderLater();},260);}
    await renderTrash();return;
  }
  if(action==='unarchive'){
    const id=el.dataset.id;if(!id)return;await patchDeferred(id,{done:false,doneAt:undefined});
    const item=el.closest('.arc-item');if(item){item.style.cssText+='transition:opacity .16s;opacity:0';setTimeout(()=>{item.remove();renderLater();},180);}
    toast('已移回稍后阅读');return;
  }
  if(action==='del-arc'){
    // Archive delete → trash
    const id=el.dataset.id;if(!id)return;
    const{deferred=[]}=await chrome.storage.local.get('deferred');
    const def=deferred.find(d=>d.id===id);
    if(def)await moveToTrash({...def},'later');
    await deleteDeferred(id);
    const item=el.closest('.arc-item');if(item){item.style.cssText+='transition:opacity .16s;opacity:0';setTimeout(()=>{item.remove();renderLater();},180);}
    await renderTrash();return;
  }

  /* Trash actions */
  if(action==='restore-trash'){
    const tid=el.dataset.trashId,src=el.dataset.trashSource;if(!tid)return;
    const item=await restoreFromTrash(tid);if(!item)return;
    if(src==='bookmark'){
      await addBookmark(item.url,item.title||item.url);
      await renderBookmarks();toast('已恢复到收藏夹');
    }else{
      // Restore to later list
      const{deferred=[]}=await chrome.storage.local.get('deferred');
      deferred.unshift({id:item.id||Date.now().toString(),url:item.url,title:item.title,savedAt:item.savedAt||new Date().toISOString(),done:false,deleted:false});
      await chrome.storage.local.set({deferred});
      await renderLater();toast('已恢复到稍后阅读');
    }
    const trashEl=el.closest('.trash-item');if(trashEl){trashEl.style.cssText+='transition:opacity .16s;opacity:0';setTimeout(()=>{trashEl.remove();renderTrash();},180);}
    return;
  }
  if(action==='perm-delete'){
    const tid=el.dataset.trashId;if(!tid)return;await permanentDelete(tid);
    const trashEl=el.closest('.trash-item');if(trashEl){trashEl.style.cssText+='transition:opacity .16s;opacity:0';setTimeout(()=>{trashEl.remove();renderTrash();},180);}
    toast('已永久删除');return;
  }
});

/* Trash: empty all */
document.getElementById('trashEmptyAll')?.addEventListener('click',async()=>{
  await emptyTrash();await renderTrash();toast('垃圾箱已清空');
});

/* ── BOOT ────────────────────────────────────────────── */
/* ══════════════════════════════════════════════════════════
   SLASH COMMAND MENU
   ══════════════════════════════════════════════════════════ */

// Built-in tool registry — add new tools here to expand the menu
const SLASH_TOOLS = [
  {
    id:   'ar-calc',
    name: '宽高比计算器',
    desc: '快速计算图片、视频的宽高比尺寸',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
             <rect x="3" y="3" width="18" height="18" rx="2"/>
             <path stroke-linecap="round" d="M3 9h18M9 3v18"/>
           </svg>`,
    kbd:  '↩ 打开',
    open: () => openArCalc(),
  },
];

function openSlashMenu() {
  const menu     = document.getElementById('slashMenu');
  const listEl   = document.getElementById('slashMenuList');
  const shortcuts = document.getElementById('shortcutsRow');
  if (!menu || !listEl) return;

  // Hide shortcuts, show menu
  if (shortcuts) shortcuts.style.display = 'none';

  listEl.innerHTML = '';
  SLASH_TOOLS.forEach(tool => {
    const btn = document.createElement('button');
    btn.className = 'slash-tool-btn';
    btn.innerHTML = `
      <div class="slash-tool-icon">${tool.icon}</div>
      <div class="slash-tool-info">
        <div class="slash-tool-name">${esc(tool.name)}</div>
        <div class="slash-tool-desc">${esc(tool.desc)}</div>
      </div>
      <span class="slash-tool-kbd">${tool.kbd}</span>`;
    btn.addEventListener('click', () => {
      closeSlashMenu();
      const inp = document.getElementById('searchInput');
      if (inp) inp.value = '';
      tool.open();
    });
    listEl.appendChild(btn);
  });

  menu.style.display = 'block';
}

function closeSlashMenu() {
  const menu     = document.getElementById('slashMenu');
  const shortcuts = document.getElementById('shortcutsRow');
  if (menu) menu.style.display = 'none';
  if (shortcuts) shortcuts.style.display = '';
}

// Close slash menu on outside click
document.addEventListener('click', e => {
  const menu = document.getElementById('slashMenu');
  if (menu && menu.style.display !== 'none') {
    if (!e.target.closest('#slashMenu') && !e.target.closest('#searchInput')) {
      closeSlashMenu();
    }
  }
});

/* ══════════════════════════════════════════════════════════
   ASPECT RATIO CALCULATOR
   ══════════════════════════════════════════════════════════ */

// Common sizes per ratio  {ratio: [{w,h,name}]}
const AR_SIZES = {
  '16:9':  [{w:1920,h:1080,n:'1080p FHD'},{w:2560,h:1440,n:'1440p QHD'},{w:3840,h:2160,n:'4K UHD'},{w:1280,h:720,n:'720p HD'},{w:7680,h:4320,n:'8K'}],
  '4:3':   [{w:1024,h:768,n:'XGA'},{w:1280,h:960,n:'QVGA'},{w:1600,h:1200,n:'UXGA'},{w:2048,h:1536,n:'QXGA'}],
  '1:1':   [{w:1080,h:1080,n:'Instagram'},{w:1200,h:1200,n:'Facebook'},{w:2048,h:2048,n:'2K'},{w:3000,h:3000,n:'Print'}],
  '3:2':   [{w:1080,h:720,n:'6MP'},{w:4500,h:3000,n:'13.5MP'},{w:6000,h:4000,n:'24MP'}],
  '2:3':   [{w:720,h:1080,n:'Portrait'},{w:2000,h:3000,n:'Print A4'},{w:3456,h:5184,n:'DSLR'}],
  '9:16':  [{w:1080,h:1920,n:'Portrait FHD'},{w:720,h:1280,n:'Portrait HD'},{w:1440,h:2560,n:'Portrait QHD'}],
  '21:9':  [{w:2560,h:1080,n:'UWFHD'},{w:3440,h:1440,n:'UWQHD'},{w:5120,h:2160,n:'UW5K'}],
  '16:10': [{w:1280,h:800,n:'WXGA'},{w:1440,h:900,n:'WXGA+'},{w:1920,h:1200,n:'WUXGA'}],
  '5:4':   [{w:1280,h:1024,n:'SXGA'},{w:2560,h:2048,n:'QSXGA'}],
  '4:5':   [{w:1080,h:1350,n:'Instagram Portrait'},{w:864,h:1080,n:'Reel'},{w:720,h:900,n:'Standard'}],
};

let _arRatioW = 16, _arRatioH = 9; // current ratio
let _arLock = null;               // 'width' | 'height' — which user is typing

function _gcd(a, b) { return b === 0 ? a : _gcd(b, a % b); }

function _simplifyRatio(w, h) {
  const g = _gcd(Math.round(w), Math.round(h));
  return [Math.round(w / g), Math.round(h / g)];
}

function _arCalcWidth(h)  { return Math.round(h * _arRatioW / _arRatioH); }
function _arCalcHeight(w) { return Math.round(w * _arRatioH / _arRatioW); }

function _arUpdatePreview() {
  const bar = document.getElementById('arPreviewBar');
  if (!bar) return;
  const maxW = 200, maxH = 80;
  const scale = Math.min(maxW / _arRatioW, maxH / _arRatioH);
  const bw = Math.max(24, Math.round(_arRatioW * scale));
  const bh = Math.max(12, Math.round(_arRatioH * scale));
  bar.style.width  = bw + 'px';
  bar.style.height = bh + 'px';
}

function _arUpdateDisplay() {
  const disp = document.getElementById('arRatioDisplay');
  if (disp) disp.textContent = `${_arRatioW}∶${_arRatioH}`;
  _arUpdatePreview();
  _arRenderPresets();
}

function _arSetRatio(rw, rh) {
  _arRatioW = rw; _arRatioH = rh;
  _arUpdateDisplay();
  // Recalculate the non-locked field
  const wInp = document.getElementById('arWidth');
  const hInp = document.getElementById('arHeight');
  if (!wInp || !hInp) return;
  const wv = parseInt(wInp.value) || 0;
  const hv = parseInt(hInp.value) || 0;
  if (wv > 0) {
    hInp.value = _arCalcHeight(wv);
  } else if (hv > 0) {
    wInp.value = _arCalcWidth(hv);
  }
}

function _arRenderPresets() {
  const wrap = document.getElementById('arPresetsWrap');
  const grid = document.getElementById('arPresetsGrid');
  const key  = `${_arRatioW}:${_arRatioH}`;
  const sizes = AR_SIZES[key];
  if (!wrap || !grid) return;
  if (!sizes?.length) { wrap.style.display = 'none'; return; }
  wrap.style.display = 'block';
  grid.innerHTML = sizes.map(s => `
    <div class="ar-preset-chip" data-pw="${s.w}" data-ph="${s.h}">
      <span class="ar-preset-size">${s.w} × ${s.h}</span>
      <span class="ar-preset-name">${esc(s.n)}</span>
    </div>`).join('');
  grid.querySelectorAll('.ar-preset-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const wInp = document.getElementById('arWidth');
      const hInp = document.getElementById('arHeight');
      if (wInp) wInp.value = chip.dataset.pw;
      if (hInp) hInp.value = chip.dataset.ph;
    });
  });
}

function openArCalc() {
  const mask = document.getElementById('arCalcMask');
  if (!mask) return;
  mask.style.display = 'flex';
  _arSetRatio(16, 9);
  const wInp = document.getElementById('arWidth');
  const hInp = document.getElementById('arHeight');
  if (wInp) wInp.value = 1920;
  if (hInp) hInp.value = 1080;
  // Activate first tab
  document.querySelectorAll('.ar-tab').forEach(t => t.classList.toggle('active', t.dataset.ratio === '16:9'));
}

// Ratio tab clicks
document.getElementById('arTabs')?.addEventListener('click', e => {
  const tab = e.target.closest('.ar-tab');
  if (!tab) return;
  document.querySelectorAll('.ar-tab').forEach(t => t.classList.remove('active'));
  tab.classList.add('active');
  const customRow = document.getElementById('arCustomRow');
  if (tab.dataset.ratio === 'custom') {
    if (customRow) customRow.style.display = 'flex';
  } else {
    if (customRow) customRow.style.display = 'none';
    const [rw, rh] = tab.dataset.ratio.split(':').map(Number);
    _arSetRatio(rw, rh);
  }
});

// Custom ratio apply
document.getElementById('arCustomApply')?.addEventListener('click', () => {
  const rw = parseInt(document.getElementById('arCustomW')?.value) || 0;
  const rh = parseInt(document.getElementById('arCustomH')?.value) || 0;
  if (rw > 0 && rh > 0) {
    const [sw, sh] = _simplifyRatio(rw, rh);
    _arSetRatio(sw, sh);
  }
});
document.getElementById('arCustomW')?.addEventListener('keydown', e => { if (e.key === 'Enter') document.getElementById('arCustomApply')?.click(); });
document.getElementById('arCustomH')?.addEventListener('keydown', e => { if (e.key === 'Enter') document.getElementById('arCustomApply')?.click(); });

// Width / height live calc
document.getElementById('arWidth')?.addEventListener('input', e => {
  const v = parseInt(e.target.value);
  if (v > 0) {
    const hInp = document.getElementById('arHeight');
    if (hInp) hInp.value = _arCalcHeight(v);
  }
});
document.getElementById('arHeight')?.addEventListener('input', e => {
  const v = parseInt(e.target.value);
  if (v > 0) {
    const wInp = document.getElementById('arWidth');
    if (wInp) wInp.value = _arCalcWidth(v);
  }
});

// Copy buttons
document.getElementById('arCalcMask')?.addEventListener('click', async e => {
  const btn = e.target.closest('.ar-copy-btn');
  if (!btn) return;
  const inp = document.getElementById(btn.dataset.copy);
  if (!inp || !inp.value) return;
  try {
    await navigator.clipboard.writeText(inp.value);
    btn.classList.add('copied');
    setTimeout(() => btn.classList.remove('copied'), 1500);
    toast(`已复制：${inp.value} px`);
  } catch { toast('复制失败，请手动选取'); }
});

// Close calculator
document.getElementById('arCalcClose')?.addEventListener('click', () => {
  document.getElementById('arCalcMask').style.display = 'none';
});
document.getElementById('arCalcMask')?.addEventListener('click', e => {
  if (e.target === e.currentTarget) document.getElementById('arCalcMask').style.display = 'none';
});

async function boot(){
  renderDate();tick();setInterval(tick,15000);
  const settings=await loadSettings();
  setEngine(settings.engine||'google');

  // Restore theme
  const ttype=settings.themeType||'solid';
  if(ttype==='gradient'&&settings.gradC1&&settings.gradC2){
    themeState={type:'gradient',color:settings.themeColor||'#0e1520',gc1:settings.gradC1,gc2:settings.gradC2,dir:settings.gradDir||'135deg'};
    switchThemeType('gradient');
    const mid=avgHex(themeState.gc1,themeState.gc2);applyBoardTheme(mid);
    applyGradTheme();
    const p1=document.getElementById('gradC1'),h1=document.getElementById('gradC1Hex'),p2=document.getElementById('gradC2'),h2=document.getElementById('gradC2Hex'),db=document.querySelector(`.dir-btn[data-dir="${themeState.dir}"]`);
    if(p1)p1.value=themeState.gc1;if(h1)h1.value=themeState.gc1;
    if(p2)p2.value=themeState.gc2;if(h2)h2.value=themeState.gc2;
    if(db){document.querySelectorAll('.dir-btn').forEach(x=>x.classList.remove('active'));db.classList.add('active');}
  }else{
    const hex=settings.themeColor||'#0e1520';
    themeState.color=hex;applySolidTheme(hex);
  }

  // Background
  if(settings.bgUrl){
    applyBackground(settings.bgUrl);
    const inp=document.getElementById('bgInput');if(inp)inp.value=settings.bgUrl;
    await renderBgHistory(settings.bgUrl);
  } else {
    initStarfield();
    await renderBgHistory('');
  }

  // Shortcuts
  showSkel();getTopSites().then(s=>renderShortcuts(s));

  // Board + sidebars
  await fetchTabs();
  await renderBoard();
  await renderBookmarks();
  await renderLater();

  // Default pane: later is now first
  const bms=await loadBmData();
  if(!(bms.bookmarks||[]).length){
    const{active}=await getDeferred();if(active.length)switchPane('later');
  }
}
boot();
