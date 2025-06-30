var m=Object.defineProperty;var f=(t,e,a)=>e in t?m(t,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[e]=a;var d=(t,e,a)=>f(t,typeof e!="symbol"?e+"":e,a);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function a(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(s){if(s.ep)return;s.ep=!0;const r=a(s);fetch(s.href,r)}})();const h="https://localhost:4443/api/auth",i=class i{constructor(){d(this,"listeners",[])}static getInstance(){return i.instance||(i.instance=new i),i.instance}getCurrentUser(){const e=localStorage.getItem("user");return e?JSON.parse(e):null}async login(e,a,o){const s=await fetch(`${h}/login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:e,password:a})}),r=await s.json();if(!s.ok)throw new Error(r.error||"Login failed");const n={email:r.user.email,token:r.token,alias:o||r.user.email.split("@")[0]};return this.saveUser(n),n}async register(e,a,o){const s=await fetch(`${h}/register`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:e,password:a})}),r=await s.json();if(!s.ok)throw new Error(r.error||"Registration failed");const n={email:r.user.email,token:r.token,alias:o||r.user.email.split("@")[0]};return this.saveUser(n),n}logout(){localStorage.removeItem("user"),this.notifyListeners()}updateAlias(e){const a=this.getCurrentUser();a&&(a.alias=e,this.saveUser(a))}onAuthStateChanged(e){this.listeners.push(e)}saveUser(e){localStorage.setItem("user",JSON.stringify(e)),this.notifyListeners()}notifyListeners(){this.listeners.forEach(e=>e())}};d(i,"instance");let u=i;const c=u.getInstance(),g={render(){const t=c.getCurrentUser();return t?this.renderProfile(t.email):this.renderAuthSelector()},renderAuthSelector(){return`
      <div class="p-4 space-y-4">
        <h2 class="text-xl font-bold">Welcome!</h2>
        <div class="flex space-x-4">
          <button id="login-btn" class="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            Login
          </button>
          <button id="register-btn" class="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600">
            Register
          </button>
        </div>
      </div>
    `},renderAuthForm(t){return`
      <div class="space-y-4 p-4">
        <h2 class="text-xl font-bold">${t?"Login":"Register"}</h2>
        <form id="auth-form" class="space-y-3">
          <input type="email" id="email" placeholder="Email" required
                 class="w-full px-3 py-2 border rounded">
          <input type="password" id="password" placeholder="Password" required
                 class="w-full px-3 py-2 border rounded">
          <button type="submit" 
                  class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            ${t?"Login":"Register"}
          </button>
          <button id="toggle-auth" type="button"
                  class="w-full text-blue-500 underline text-sm">
            ${t?"Need an account? Register":"Have an account? Login"}
          </button>
        </form>
        <div id="auth-error" class="text-red-500 text-sm"></div>
      </div>
    `},renderProfile(t){return`
      <div class="p-4 space-y-3">
        <h3 class="font-bold text-lg">Profile</h3>
        <p>Logged in as: <strong>${t}</strong></p>
        <button id="logout-btn"
                class="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600">
          Logout
        </button>
      </div>
    `}},p={renderGameCanvas(){return`
      <div class="flex justify-center items-center h-full">
        <canvas 
          id="game-canvas" 
          class="bg-gray-200 rounded-lg shadow-lg max-w-full"
        ></canvas>
      </div>
    `},initGameCanvas(){const t=document.getElementById("game-canvas");t&&(t.width=Math.max(800,t.offsetWidth),t.height=t.offsetHeight)}},b={renderGameSettings(){return`
      <div class="space-y-4 p-4">
        <h3 class="text-lg font-bold">Game Settings</h3>
        
        <div class="space-y-2">
          <label class="block">
            <span class="text-gray-700">Player 1 Alias:</span>
            <input 
              type="text" 
              id="p1-alias" 
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              value="Player 1"
            >
          </label>
          
          <label class="block">
            <span class="text-gray-700">Player 2 Alias:</span>
            <input 
              type="text" 
              id="p2-alias" 
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              value="Player 2"
            >
          </label>
          
          <label class="flex items-center space-x-2">
            <input 
              type="checkbox" 
              id="vs-ai" 
              class="rounded border-gray-300 text-indigo-600"
            >
            <span>Play against AI</span>
          </label>
        </div>
      </div>
    `}},v={currentUser:null,isLogin:!0,render(){return`
      <div class="flex flex-col h-screen md:flex-row md:min-w-[1000px]">
        <!-- Left Sidebar -->
        <aside class="w-full md:w-64 bg-gray-100 p-4 border-r border-gray-200" id="auth-container">
          ${this.renderAuth()}
        </aside>
        
        <!-- Game Area -->
        <main class="flex-1 min-w-[800px] bg-white p-4 overflow-auto">
          ${p.renderGameCanvas()}
        </main>
        
        <!-- Settings Panel -->
        <div class="w-full md:w-72 bg-gray-50 p-4 border-l border-gray-200">
          ${b.renderGameSettings()}
        </div>
        
        <!-- Message Bar -->
        <div class="w-full bg-gray-800 text-white p-2" id="system-messages"></div>
      </div>
    `},renderAuth(){const t=c.getCurrentUser();return t?g.renderProfile(t.email):g.renderAuthForm(this.isLogin)},init(){this.currentUser=c.getCurrentUser(),p.initGameCanvas(),c.onAuthStateChanged(()=>{this.currentUser=c.getCurrentUser(),document.getElementById("auth-container").innerHTML=this.renderAuth()})}};class w{constructor(){d(this,"currentUser",null);this.initializeUser()}initializeUser(){const e=localStorage.getItem("authToken"),a=localStorage.getItem("userEmail");e&&a?this.currentUser={email:a,token:e}:l.navigate("home")}render(){var e;return`
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
    `}initEventListeners(){const e=document.getElementById("logout-btn");e&&e.addEventListener("click",this.handleLogout.bind(this))}handleLogout(){localStorage.removeItem("authToken"),localStorage.removeItem("userEmail"),this.currentUser=null,l.navigate("home")}initialize(){const e=document.getElementById("app");e?(e.innerHTML=this.render(),this.initEventListeners()):console.error("App container not found")}}class l{static navigate(e){if(!this.app){console.error("App container not found");return}if(this.app.innerHTML="",e==="dashboard"&&!this.isAuthenticated())return console.warn("Redirecting to home: not authenticated"),this.navigate("home");switch(e){case"home":if(this.isAuthenticated())return this.navigate("dashboard");this.app.innerHTML=v.render();break;case"dashboard":new w().initialize();break}history.pushState({},"",e==="home"?"/":`/${e}`)}static isAuthenticated(){return localStorage.getItem("authToken")!==null}static init(){window.addEventListener("load",()=>{const e=window.location.pathname;this.navigate(e.includes("dashboard")?"dashboard":"home")}),window.addEventListener("popstate",()=>{const e=window.location.pathname;this.navigate(e.includes("dashboard")?"dashboard":"home")})}}d(l,"app",document.getElementById("app"));l.init();window.addEventListener("load",()=>{const t=window.location.pathname;l.navigate(t.includes("dashboard")?"dashboard":"home")});window.addEventListener("popstate",()=>{const t=window.location.pathname;l.navigate(t.includes("dashboard")?"dashboard":"home")});
