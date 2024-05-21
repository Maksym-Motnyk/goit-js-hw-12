import{a as m,i as l}from"./assets/vendor-e350efa0.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function e(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(t){if(t.ep)return;t.ep=!0;const r=e(t);fetch(t.href,r)}})();function d(){const s=document.querySelector(".loader");s.style.display="block"}m.default.baseURL=BASE_URL;function f(s){d();const e=`https://pixabay.com/api/?${new URLSearchParams({key:"43803497-a801e9cfe7ea9bdd19d306bb3",q:s.value,image_type:"photo",orientation:"horizontal",safesearch:!0})}`;return fetch(e)}const u=document.querySelector(".list");let n;const p=s=>{const i=s.hits.map(e=>`
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
    `).join("");u.innerHTML=i,n=new SimpleLightbox(".item-list-link",{captionsData:"alt",captionDelay:250,overlayOpacity:.8}),n.refresh()},h=document.querySelector(".searchButton"),y=()=>{const s=document.querySelector(".input");s.value=""};function c(){const s=document.querySelector(".loader");s.style.display="none"}h.addEventListener("click",s=>{s.preventDefault();const i=document.querySelector(".input");if(i.value.trim()==""){l.error({title:"Error",position:"topRight",message:"The search field cannot be empty! Please enter the search query!"});return}else f(i).then(e=>{if(!e.ok)throw new Error(e.status);return e.json()}).then(e=>{c(),p(e),u.childElementCount||l.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"})}).catch(e=>{c(),console.error("Error:",e)});y()});
//# sourceMappingURL=commonHelpers.js.map
