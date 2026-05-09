'use strict';
async function updateBadge(){
  try{
    const t=await chrome.tabs.query({});
    const sk=['chrome://','chrome-extension://','about:','edge://','brave://'];
    const n=t.filter(x=>x.url&&!sk.some(p=>x.url.startsWith(p))).length;
    await chrome.action.setBadgeText({text:n>0?String(n):''});
    await chrome.action.setBadgeBackgroundColor({color:n<=10?'#3d7a4a':n<=20?'#b8892e':'#b35a5a'});
  }catch{try{chrome.action.setBadgeText({text:''});}catch{}}
}
async function recordVisit(tabId){
  try{
    const tab=await chrome.tabs.get(tabId);
    const url=tab.url;
    if(!url||['chrome://','chrome-extension://','about:'].some(p=>url.startsWith(p)))return;
    let key=url;try{key=new URL(url).origin;}catch{}
    const{visitCounts={}}=await chrome.storage.local.get('visitCounts');
    visitCounts[key]=(visitCounts[key]||0)+1;
    const pruned=Object.fromEntries(Object.entries(visitCounts).sort(([,a],[,b])=>b-a).slice(0,200));
    await chrome.storage.local.set({visitCounts:pruned});
  }catch{}
}
chrome.runtime.onInstalled.addListener(updateBadge);
chrome.runtime.onStartup.addListener(updateBadge);
chrome.tabs.onCreated.addListener(updateBadge);
chrome.tabs.onRemoved.addListener(updateBadge);
chrome.tabs.onUpdated.addListener(updateBadge);
chrome.tabs.onActivated.addListener(({tabId})=>{updateBadge();recordVisit(tabId);});
chrome.tabs.onUpdated.addListener((id,info,tab)=>{if(info.status==='complete'&&tab.active)recordVisit(id);});
updateBadge();
