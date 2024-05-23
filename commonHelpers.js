import{a as v,i}from"./assets/vendor-34708528.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function r(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(e){if(e.ep)return;e.ep=!0;const o=r(e);fetch(e.href,o)}})();let c=1,d="",m=0;function w(){const t=document.querySelector(".loader");t.style.display="block"}function L(){const t=document.querySelector(".loader");t.style.display="none"}async function y(t,s=1){w();const a=`https://pixabay.com/api/?${new URLSearchParams({key:"43803497-a801e9cfe7ea9bdd19d306bb3",q:t.trim(),image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:s})}`;try{const e=await v.get(a);return m=e.data.totalHits,e.data}catch(e){throw console.error("Error:",e),e}finally{L()}}function P(){c=1}function b(){c+=1}function f(){return c}function S(t){d=t}function p(){return d}function q(){return m}const h=document.querySelector(".list");let u;const g=t=>{const s=t.hits.map(r=>`
      <li class="item-list">
        <a href="${r.largeImageURL}" class="item-list-link">
            <img class="item-list-img" src="${r.webformatURL}" alt="${r.tags}">
        </a>
        <div class='markup-info'>
            <div class="item-list-info-text">
                <h3 class="item-list-title">Likes</h3>
                <p class="item-list-text">${r.likes}</p>
            </div>
            <div class="item-list-info-text">
                <h3 class="item-list-title">Views</h3>
                <p class="item-list-text">${r.views}</p>
            </div>
            <div class="item-list-info-text">
                <h3 class="item-list-title">Comments</h3>
                <p class="item-list-text">${r.comments}</p>
            </div>
            <div class="item-list-info-text">
                <h3 class="item-list-title">Downloads</h3>
                <p class="item-list-text">${r.downloads}</p>
            </div>
        </div>
      </li>
    `).join("");h.innerHTML=s,u=new SimpleLightbox(".item-list-link",{captionsData:"alt",captionDelay:250,overlayOpacity:.8}),u.refresh()},x=document.querySelector(".searchButton"),n=document.querySelector(".load-more"),E=()=>{const t=document.querySelector(".input");t.value=""};x.addEventListener("click",async t=>{t.preventDefault();const s=document.querySelector(".input");if(s.value.trim()===""){i.error({title:"Error",message:"The search field cannot be empty! Please enter the search query!"});return}P(),S(s.value),h.innerHTML="",n.style.display="none";try{const r=await y(p(),f());g(r),r.hits.length&&(n.style.display="block"),r.totalHits===0&&i.error({title:"Error",message:"Sorry, there was an error when receiving data. Please try again!"})}catch{i.error({title:"Error",message:"Sorry, there was an error when receiving data. Please try again!"})}E()});n.addEventListener("click",async()=>{b();try{const t=await y(p(),f());g(t),document.querySelectorAll(".item-list").length>=q()&&(n.style.display="none",i.error({title:"Error",message:"We're sorry, but you've reached the end of search results."}));const{height:r}=document.querySelector(".item-list").getBoundingClientRect();window.scrollBy({top:r*2,behavior:"smooth"})}catch{i.error({title:"Error",message:"Sorry, there was an error when receiving data. Please try again!"})}});
//# sourceMappingURL=commonHelpers.js.map