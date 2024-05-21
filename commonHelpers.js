import{i as a}from"./assets/vendor-0c46edf9.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&l(o)}).observe(document,{childList:!0,subtree:!0});function e(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function l(t){if(t.ep)return;t.ep=!0;const s=e(t);fetch(t.href,s)}})();function m(){const r=document.querySelector(".loader");r.style.display="block"}function d(r){m();const e=`https://pixabay.com/api/?${new URLSearchParams({key:"43803497-a801e9cfe7ea9bdd19d306bb3",q:r.value,image_type:"photo",orientation:"horizontal",safesearch:!0})}`;return fetch(e)}const u=document.querySelector(".list");let n;const f=r=>{const i=r.hits.map(e=>`
      <li class="item-list">
        <a href="${e.largeImageURL}" class="item-list-link">
            <img class="item-list-img" src="${e.webformatURL}" alt="${e.tags}">
        </a>
        <div class='markup-info'>
            <div class="item-list-info-text">
                <h3 class="item-list-title">Likes</h3>
                <p class="item-list-text">${e.likes}</p>
            </div>
            <div class="item-list-info-text">
                <h3 class="item-list-title">Views</h3>
                <p class="item-list-text">${e.views}</p>
            </div>
            <div class="item-list-info-text">
                <h3 class="item-list-title">Comments</h3>
                <p class="item-list-text">${e.comments}</p>
            </div>
            <div class="item-list-info-text">
                <h3 class="item-list-title">Downloads</h3>
                <p class="item-list-text">${e.downloads}</p>
            </div>
        </div>
      </li>
    `).join("");u.innerHTML=i,n=new SimpleLightbox(".item-list-link",{captionsData:"alt",captionDelay:250,overlayOpacity:.8}),n.refresh()},p=document.querySelector(".searchButton"),h=()=>{const r=document.querySelector(".input");r.value=""};function c(){const r=document.querySelector(".loader");r.style.display="none"}p.addEventListener("click",r=>{r.preventDefault();const i=document.querySelector(".input");if(i.value.trim()==""){a.error({title:"Error",position:"topRight",message:"The search field cannot be empty! Please enter the search query!"});return}else d(i).then(e=>{if(!e.ok)throw new Error(e.status);return e.json()}).then(e=>{c(),f(e),u.childElementCount||a.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"})}).catch(e=>{c(),console.error("Error:",e)});h()});
//# sourceMappingURL=commonHelpers.js.map
