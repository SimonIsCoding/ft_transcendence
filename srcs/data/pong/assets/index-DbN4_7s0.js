var g=Object.defineProperty;var f=(t,e,o)=>e in t?g(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o;var u=(t,e,o)=>f(t,typeof e!="symbol"?e+"":e,o);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function o(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(r){if(r.ep)return;r.ep=!0;const i=o(r);fetch(r.href,i)}})();const h="https://localhost:4443/api/auth",p=async(t,e)=>{try{const o=await fetch(`${h}/login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:t,password:e})}),a=await o.json();if(!o.ok)throw new Error(a.error||"Registration failed");return a}catch(o){throw console.error("Login error:",o),o}},b=async(t,e)=>{try{const o=await fetch(`${h}/register`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:t,password:e})}),a=await o.json();if(!o.ok)throw new Error(a.error||a.message||"Registration failed");return a}catch(o){throw console.error("Register error:",o),o}};let l=null,s=!0;const c=t=>{const e=document.getElementById(t);if(!e)throw new Error(`Element #${t} not found`);return e},w=()=>{const t=c("auth-form"),e=document.createElement("div");return e.id="auth-error",e.className="mt-4 text-red-600 text-center",t.appendChild(e),e},v=t=>{const e=document.getElementById("auth-error")||w();e.textContent=t},m={render(){return`
    <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div id="auth-container" class="sm:mx-auto sm:w-full sm:max-w-md">
        ${!!localStorage.getItem("authToken")?this.renderWelcome():this.renderAuthForm()}
      </div>
    </div>
  `},renderWelcome(){return`
    <div class="text-center">
      <h2 class="text-2xl font-bold text-gray-900">
        Welcome, ${(l==null?void 0:l.email)??"User"}!
      </h2>
      <button id="logout-btn" class="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700">
        Logout
      </button>
    </div>
  `},renderAuthForm(){return`
    <h2 class="text-center text-3xl font-extrabold text-gray-900">
      ${s?"Sign In":"Register"}
    </h2>
    <form id="auth-form" class="mt-8 space-y-6">
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autocomplete="email"
          required
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
      </div>
      <div>
        <label for="password" class="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autocomplete="${s?"current-password":"new-password"}"
          required
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
      </div>
      <div>
        <button
          type="submit"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          ${s?"Sign in":"Register"}
        </button>
      </div>
    </form>
    <button id="toggle-auth" class="mt-6 text-center text-sm font-medium text-indigo-600 hover:text-indigo-500">
      ${s?"Need an account? Register":"Already have an account? Sign in"}
    </button>
    <div id="auth-error" class="mt-4 text-red-600 text-center"></div>
    `},initEventListeners(){if(!document.getElementById("auth-form")){requestAnimationFrame(()=>this.initEventListeners());return}try{c("auth-form").addEventListener("submit",async o=>{var i;o.preventDefault();const a=c("email").value,r=c("password").value;try{const n=await(s?p(a,r):b(a,r));if(!(n!=null&&n.status)||!((i=n.data)!=null&&i.token))throw new Error("Invalid API response");n.status==="success"&&(l={email:n.data.user.email,token:n.data.token},localStorage.setItem("authToken",n.data.token),localStorage.setItem("userEmail",n.data.user.email),this.updateUI(),d.navigate("dashboard"))}catch(n){v(n instanceof Error?n.message:"Authentication failed")}}),c("toggle-auth").addEventListener("click",o=>{o.preventDefault(),s=!s,this.updateUI()});const e=document.getElementById("logout-btn");e&&e.addEventListener("click",()=>{l=null,localStorage.removeItem("authToken"),localStorage.removeItem("userEmail"),this.updateUI()})}catch(e){console.error("Error initializing event listeners:",e)}},updateUI(){const t=document.getElementById("auth-container");if(!t)return;const e=!!localStorage.getItem("authToken");t.innerHTML=e?this.renderWelcome():this.renderAuthForm(),this.initEventListeners()},init(){const t=localStorage.getItem("authToken"),e=localStorage.getItem("userEmail");t&&e&&(l={email:e,token:t}),this.updateUI()}};m.init();class y{constructor(){u(this,"currentUser",null);this.initializeUser()}initializeUser(){const e=localStorage.getItem("authToken"),o=localStorage.getItem("userEmail");e&&o?this.currentUser={email:o,token:e}:d.navigate("home")}render(){var e;return`
      <div class="flex h-screen bg-gray-100">
        <!-- Sidebar -->
        <div class="w-64 bg-white shadow-md p-4">
          <div class="p-4 border-b">
            <p class="font-medium">${((e=this.currentUser)==null?void 0:e.email)||"User"}</p>
          </div>
          <ul class="mt-4 space-y-2">
            <li>
              <button id="logout-btn" class="w-full text-left p-2 rounded hover:bg-gray-100 text-red-600">
                Logout
              </button>
            </li>
          </ul>
        </div>

        <!-- Main Content -->
        <main class="flex-1 overflow-auto p-8">
          <h1 class="text-2xl font-bold mb-6">Dashboard</h1>
          <div class="bg-white p-6 rounded-lg shadow">
            <p>Welcome to your dashboard!</p>
          </div>
        </main>
      </div>
    `}initEventListeners(){const e=document.getElementById("logout-btn");e&&e.addEventListener("click",this.handleLogout.bind(this))}handleLogout(){localStorage.removeItem("authToken"),localStorage.removeItem("userEmail"),this.currentUser=null,d.navigate("home")}initialize(){const e=document.getElementById("app");e?(e.innerHTML=this.render(),this.initEventListeners()):console.error("App container not found")}}class d{static navigate(e){if(!this.app){console.error("App container not found");return}if(this.app.innerHTML="",e==="dashboard"&&!this.isAuthenticated())return console.warn("Redirecting to home: not authenticated"),this.navigate("home");switch(e){case"home":if(this.isAuthenticated())return this.navigate("dashboard");this.app.innerHTML=m.render(),m.initEventListeners();break;case"dashboard":new y().initialize();break}history.pushState({},"",e==="home"?"/":`/${e}`)}static isAuthenticated(){return localStorage.getItem("authToken")!==null}static init(){window.addEventListener("load",()=>{const e=window.location.pathname;this.navigate(e.includes("dashboard")?"dashboard":"home")}),window.addEventListener("popstate",()=>{const e=window.location.pathname;this.navigate(e.includes("dashboard")?"dashboard":"home")})}}u(d,"app",document.getElementById("app"));d.init();window.addEventListener("load",()=>{const t=window.location.pathname;d.navigate(t.includes("dashboard")?"dashboard":"home")});window.addEventListener("popstate",()=>{const t=window.location.pathname;d.navigate(t.includes("dashboard")?"dashboard":"home")});
