import{i as c}from"./assets/vendor-0c46edf9.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();function m(){const t=document.querySelector(".loader");t.style.display="block"}function p(t){m();const e=`https://pixabay.com/api/?${new URLSearchParams({key:"43803497-a801e9cfe7ea9bdd19d306bb3",q:t.value,image_type:"photo",orientation:"horizontal",safesearch:!0})}`;return fetch(e)}const d=document.querySelector(".list");let l;const f=t=>{const o=t.hits.map(e=>`
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
    `).join("");d.innerHTML=o,l=new SimpleLightbox(".item-list-link",{captionsData:"alt",captionDelay:250,overlayOpacity:.8}),l.refresh()},h=document.querySelector(".searchButton"),y=()=>{const t=document.querySelector(".input");t.value=""};function u(){const t=document.querySelector(".loader");t.style.display="none"}h.addEventListener("click",t=>{t.preventDefault();const o=document.querySelector(".input");if(o.value.trim()==""){c.error({title:"Error",position:"topRight",message:"The search field cannot be empty! Please enter the search query!"});return}else p(o).then(e=>{if(!e.ok)throw new Error(e.status);return e.json()}).then(e=>{u(),f(e),d.childElementCount||c.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"})}).catch(e=>{u(),console.error("Error:",e)});y()});document.querySelector(".btn");let a=1,g=10;fetchPostsBtn.addEventListener("click",async()=>{try{const t=await v();b(t),a+=1,a>1&&(fetchPostsBtn.textContent="Load more")}catch(t){console.log(t)}});async function v(){const t=new URLSearchParams({_limit:g,_page:a});return(await axios.get(`https://jsonplaceholder.typicode.com/posts?${t}`)).data}function b(t){const o=t.map(({id:e,title:i,body:s,userId:r})=>`<li>
          <h2 class="post-title">${i.slice(0,30)}</h2>
          <p><b>Post id</b>: ${e}</p>
          <p><b>Author id</b>: ${r}</p>
          <p class="post-body">${s}</p>
        </li>`).join("");postList.insertAdjacentHTML("beforeend",o)}
//# sourceMappingURL=commonHelpers.js.map
