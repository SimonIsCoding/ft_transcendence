var x=Object.defineProperty;var L=(t,e,s)=>e in t?x(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s;var n=(t,e,s)=>L(t,typeof e!="symbol"?e+"":e,s);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const d of a.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&o(d)}).observe(document,{childList:!0,subtree:!0});function s(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(i){if(i.ep)return;i.ep=!0;const a=s(i);fetch(i.href,a)}})();const y="https://localhost:4443/api/auth",c=class c{constructor(){n(this,"listeners",[])}static getInstance(){return c.instance||(c.instance=new c),c.instance}getCurrentUser(){const e=localStorage.getItem("user");return e?JSON.parse(e):null}async login(e,s,o){var i,a,d;try{const l=await fetch(`${y}/login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:e,password:s})}),r=await l.json();if(!l.ok||r.status!=="success")throw new Error(r.error||r.message||"Login failed");if(!((a=(i=r.data)==null?void 0:i.user)!=null&&a.email)||!((d=r.data)!=null&&d.token))throw new Error("Invalid server response format");const g={email:r.data.user.email,token:r.data.token,alias:o||r.data.user.alias||r.data.user.email.split("@")[0]};return this.saveUser(g),g}catch(l){throw console.error("Login error:",l),new Error(l instanceof Error?l.message:"An unknown error occurred")}}async register(e,s,o){var i,a,d;try{const l=await fetch(`${y}/register`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:e,password:s,...o&&{alias:o}})}),r=await l.json();if(!l.ok||r.status!=="success")throw new Error(r.error||r.message||"Registration failed");if(!((a=(i=r.data)==null?void 0:i.user)!=null&&a.email)||!((d=r.data)!=null&&d.token))throw new Error("Invalid server response format");const g={email:r.data.user.email,token:r.data.token,alias:o||r.data.user.alias||r.data.user.email.split("@")[0]};return this.saveUser(g),g}catch(l){throw console.error("Registration error:",l),new Error(l instanceof Error?l.message:"Registration failed")}}logout(){localStorage.removeItem("user"),this.notifyListeners()}updateAlias(e){const s=this.getCurrentUser();s&&(s.alias=e,this.saveUser(s))}onAuthStateChanged(e){this.listeners.push(e)}saveUser(e){localStorage.setItem("user",JSON.stringify(e)),this.notifyListeners()}notifyListeners(){this.listeners.forEach(e=>e())}};n(c,"instance");let b=c;const h=b.getInstance(),f={render(){const t=h.getCurrentUser();return t?this.renderProfile(t.email):this.renderAuthSelector()},renderAuthSelector(){return`
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
    `}};class S{constructor(){n(this,"canvas");n(this,"ctx");n(this,"animationFrameId",0);n(this,"ball",{x:100,y:100,radius:10});n(this,"dx",2);n(this,"dy",2);n(this,"speed",2);n(this,"keysPressed",{});n(this,"paddleWidth",10);n(this,"paddleHeight",80);n(this,"leftPaddle",{x:0,y:100});n(this,"rightPaddle",{x:0,y:100});n(this,"paddleSpeed",5)}init(){this.canvas=document.getElementById("game-canvas"),this.ctx=this.canvas.getContext("2d"),this.resizeCanvas(),this.startLoop()}setSpeed(e){this.speed=e;const s=Math.atan2(this.dy,this.dx);this.dx=Math.cos(s)*this.speed,this.dy=Math.sin(s)*this.speed}render(){return`
    <div class="flex justify-center items-center w-full h-full">
      <canvas 
        id="game-canvas" 
        class="border-4 border-white block" 
        style="min-width: 800px; aspect-ratio: 4 / 3;">
      </canvas>
    </div>
    `}update(){this.ball.x+=this.dx,this.ball.y+=this.dy,(this.ball.x-this.ball.radius<=0||this.ball.x+this.ball.radius>=this.canvas.width)&&(this.dx=-this.dx),(this.ball.y-this.ball.radius<=0||this.ball.y+this.ball.radius>=this.canvas.height)&&(this.dy=-this.dy),this.keysPressed.w&&(this.leftPaddle.y=Math.max(0,this.leftPaddle.y-this.paddleSpeed)),this.keysPressed.s&&(this.leftPaddle.y=Math.min(this.canvas.height-this.paddleHeight,this.leftPaddle.y+this.paddleSpeed)),this.keysPressed.ArrowUp&&(this.rightPaddle.y=Math.max(0,this.rightPaddle.y-this.paddleSpeed)),this.keysPressed.ArrowDown&&(this.rightPaddle.y=Math.min(this.canvas.height-this.paddleHeight,this.rightPaddle.y+this.paddleSpeed))}draw(){this.ctx.fillStyle="black",this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height),this.ctx.fillStyle="white",this.ctx.beginPath(),this.ctx.arc(this.ball.x,this.ball.y,this.ball.radius,0,Math.PI*2),this.ctx.fill(),this.ctx.fillStyle="white",this.ctx.fillRect(this.leftPaddle.x,this.leftPaddle.y,this.paddleWidth,this.paddleHeight),this.ctx.fillRect(this.rightPaddle.x,this.rightPaddle.y,this.paddleWidth,this.paddleHeight)}startLoop(){const e=()=>{this.update(),this.draw(),this.animationFrameId=requestAnimationFrame(e)};e()}resizeCanvas(){const e=this.canvas.parentElement,s=Math.max(e.clientWidth,800),o=s*3/4;this.canvas.width=s,this.canvas.height=o,this.leftPaddle.x=30,this.rightPaddle.x=this.canvas.width-30-this.paddleWidth}setKey(e,s){this.keysPressed[e]=s}stop(){cancelAnimationFrame(this.animationFrameId)}}const u=new S,m={renderGameCanvas(){return u.render()},initGameCanvas(){u.init()},stop(){u.stop()},setBallSpeed(t){u.setSpeed(t)},handleKeyDown(t){u.setKey(t,!0)},handleKeyUp(t){u.setKey(t,!1)}},w={renderGameSettings(){return`
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

          <!-- New Ball Speed Slider -->
          <label class="block">
            <span class="text-gray-700">Ball Speed:</span>
            <input 
              type="range" 
              id="ball-speed" 
              min="1" 
              max="10" 
              value="2" 
              class="mt-1 w-full accent-red-600"
            >
          </label>
        </div>
      </div>
    `},initSettings(){const t=document.getElementById("ball-speed");t&&t.addEventListener("input",()=>{const e=parseFloat(t.value);m.setBallSpeed(e)})}},P={init(){window.addEventListener("keydown",t=>{m.handleKeyDown(t.key)}),window.addEventListener("keyup",t=>{m.handleKeyUp(t.key)})}};class E{constructor(){n(this,"isLoginView",!0)}init(){this.render(),this.bindAuthEvents()}render(){const e=document.getElementById("auth-container");if(e){const s=h.getCurrentUser();e.innerHTML=s?f.renderProfile(s.email):f.renderAuthForm(this.isLoginView)}}bindAuthEvents(){document.addEventListener("click",e=>{const s=e.target;s.closest("#login-btn")?(this.isLoginView=!0,this.render()):s.closest("#register-btn")?(this.isLoginView=!1,this.render()):s.closest("#logout-btn")?(h.logout(),this.isLoginView=!0,this.render()):s.closest("#toggle-auth")&&(this.isLoginView=!this.isLoginView,this.render())}),document.addEventListener("submit",async e=>{e.target.id==="auth-form"&&(e.preventDefault(),await this.handleAuthFormSubmit())})}async handleAuthFormSubmit(){const e=document.getElementById("email"),s=document.getElementById("password"),o=document.getElementById("auth-error");if(!e||!s||!o)return;const i=e.value,a=s.value;try{this.isLoginView?await h.login(i,a):await h.register(i,a),this.render()}catch(d){o.textContent=d.message}}}const I=new E,v={currentUser:null,isLogin:!0,render(){return`
    <div class="flex flex-col h-screen">
      <!-- Main Content -->
      <div class="flex-1 flex flex-col md:flex-row md:min-w-[1000px] overflow-hidden">
        <!-- Left Sidebar -->
        <aside class="w-full md:w-64 bg-gray-100 p-4 border-r border-gray-200" id="auth-container">
          ${this.renderAuth()}
        </aside>

        <!-- Game Area -->
        <main class="flex-1 bg-black p-0 overflow-hidden flex items-center justify-center">
          ${m.renderGameCanvas()}
        </main>

        <!-- Settings Panel -->
        <div class="w-full md:w-72 bg-gray-50 p-4 border-l border-gray-200">
          ${w.renderGameSettings()}
        </div>
      </div>

      <!-- Message Bar -->
      <div class="w-full bg-gray-800 text-white p-2" id="system-messages"></div>
    </div>
    `},renderAuth(){const t=h.getCurrentUser();return t?f.renderProfile(t.email):f.renderAuthForm(this.isLogin)},init(){this.currentUser=h.getCurrentUser(),m.initGameCanvas(),P.init(),I.init(),w.initSettings(),h.onAuthStateChanged(()=>{this.currentUser=h.getCurrentUser(),document.getElementById("auth-container").innerHTML=this.renderAuth()})}};class k{constructor(){n(this,"currentUser",null);this.initializeUser()}initializeUser(){const e=localStorage.getItem("authToken"),s=localStorage.getItem("userEmail");e&&s?this.currentUser={email:s,token:e}:p.navigate("home")}render(){var e;return`
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
    `}initEventListeners(){const e=document.getElementById("logout-btn");e&&e.addEventListener("click",this.handleLogout.bind(this))}handleLogout(){localStorage.removeItem("authToken"),localStorage.removeItem("userEmail"),this.currentUser=null,p.navigate("home")}initialize(){const e=document.getElementById("app");e?(e.innerHTML=this.render(),this.initEventListeners()):console.error("App container not found")}}class p{static navigate(e){if(!this.app){console.error("App container not found");return}if(this.app.innerHTML="",e==="dashboard"&&!this.isAuthenticated())return console.warn("Redirecting to home: not authenticated"),this.navigate("home");switch(e){case"home":if(this.isAuthenticated())return this.navigate("dashboard");this.app.innerHTML=v.render(),v.init();break;case"dashboard":new k().initialize();break}history.pushState({},"",e==="home"?"/":`/${e}`)}static isAuthenticated(){return localStorage.getItem("authToken")!==null}static init(){window.addEventListener("load",()=>{const e=window.location.pathname;this.navigate(e.includes("dashboard")?"dashboard":"home")}),window.addEventListener("popstate",()=>{const e=window.location.pathname;this.navigate(e.includes("dashboard")?"dashboard":"home")})}}n(p,"app",document.getElementById("app"));p.init();window.addEventListener("load",()=>{const t=window.location.pathname;p.navigate(t.includes("dashboard")?"dashboard":"home")});window.addEventListener("popstate",()=>{const t=window.location.pathname;p.navigate(t.includes("dashboard")?"dashboard":"home")});
