var A=Object.defineProperty;var C=(s,t,e)=>t in s?A(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e;var n=(s,t,e)=>C(s,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const d of r.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&i(d)}).observe(document,{childList:!0,subtree:!0});function e(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(a){if(a.ep)return;a.ep=!0;const r=e(a);fetch(a.href,r)}})();const f="https://localhost:4443/api/auth",u=class u{constructor(){n(this,"listeners",[])}static getInstance(){return u.instance||(u.instance=new u),u.instance}getCurrentUser(){const t=localStorage.getItem("user");return t?JSON.parse(t):null}async login(t,e,i){var a,r,d;try{const h=await fetch(`${f}/login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:t,password:e})}),o=await h.json();if(!h.ok||o.status!=="success")throw new Error(o.error||o.message||"Login failed");if(!((r=(a=o.data)==null?void 0:a.user)!=null&&r.email)||!((d=o.data)!=null&&d.token))throw new Error("Invalid server response format");const y={email:o.data.user.email,token:o.data.token,alias:i||o.data.user.alias||o.data.user.email.split("@")[0]};return this.saveUser(y),y}catch(h){throw console.error("Login error:",h),new Error(h instanceof Error?h.message:"An unknown error occurred")}}async register(t,e,i){var a,r,d;try{const h=await fetch(`${f}/register`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:t,password:e,...i&&{alias:i}})}),o=await h.json();if(!h.ok||o.status!=="success")throw new Error(o.error||o.message||"Registration failed");if(!((r=(a=o.data)==null?void 0:a.user)!=null&&r.email)||!((d=o.data)!=null&&d.token))throw new Error("Invalid server response format");const y={email:o.data.user.email,token:o.data.token,alias:i||o.data.user.alias||o.data.user.email.split("@")[0]};return this.saveUser(y),y}catch(h){throw console.error("Registration error:",h),new Error(h instanceof Error?h.message:"Registration failed")}}logout(){localStorage.removeItem("user"),this.notifyListeners()}updateAlias(t){const e=this.getCurrentUser();e&&(e.alias=t,this.saveUser(e))}onAuthStateChanged(t){this.listeners.push(t)}saveUser(t){localStorage.setItem("user",JSON.stringify(t)),this.notifyListeners()}notifyListeners(){this.listeners.forEach(t=>t())}};n(u,"instance");let v=u;const c=v.getInstance(),b={render(){const s=c.getCurrentUser();return s?this.renderProfile(s.email):this.renderAuthSelector()},renderAuthSelector(){return`
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
    `},renderAuthForm(s){return`
      <div class="space-y-4 p-4">
        <h2 class="text-xl font-bold">${s?"Login":"Register"}</h2>
        <form id="auth-form" class="space-y-3">
          <input type="email" id="email" placeholder="Email" required
                 class="w-full px-3 py-2 border rounded">
          <input type="password" id="password" placeholder="Password" required
                 class="w-full px-3 py-2 border rounded">
          <button type="submit" 
                  class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            ${s?"Login":"Register"}
          </button>
          <button id="toggle-auth" type="button"
                  class="w-full text-blue-500 underline text-sm">
            ${s?"Need an account? Register":"Have an account? Login"}
          </button>
        </form>
        <div id="auth-error" class="text-red-500 text-sm"></div>
      </div>
    `},renderProfile(s){return`
      <div class="p-4 space-y-3">
        <h3 class="font-bold text-lg">Profile</h3>
        <p>Logged in as: <strong>${s}</strong></p>
        <button id="logout-btn"
                class="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600">
          Logout
        </button>
      </div>
    `}},l={BASE_WIDTH:1024,BASE_HEIGHT:768,BALL_SPEED:2,MAX_BALL_SPEED:10,PADDLE_WIDTH:10,PADDLE_HEIGHT:80,PADDLE_SPEED:5,PADDLE_OFFSET:30,DEFLECTION_ANGLES:[-45,-30,-15,0,0,15,30,45]};class I{constructor(){n(this,"physicalWidth",0);n(this,"physicalHeight",0);n(this,"scaleFactor",1);n(this,"baseWidth",l.BASE_WIDTH);n(this,"baseHeight",l.BASE_HEIGHT)}update(t,e){this.physicalWidth=t,this.physicalHeight=e;const i=t/this.baseWidth,a=e/this.baseHeight;this.scaleFactor=Math.min(i,a)}toPhysicalX(t){return t*this.scaleFactor}toPhysicalY(t){return t*this.scaleFactor}toPhysicalSize(t){return t*this.scaleFactor}get currentVirtualWidth(){return this.baseWidth}get currentVirtualHeight(){return this.baseHeight}getPhysicalDimensions(){return{width:this.physicalWidth,height:this.physicalHeight}}}class B{constructor(){n(this,"x");n(this,"y");n(this,"radius");n(this,"dx");n(this,"dy");n(this,"speed");n(this,"color");this.x=l.BASE_WIDTH/2,this.y=l.BASE_HEIGHT/2,this.radius=10,this.speed=l.BALL_SPEED,this.dx=2*(Math.random()>.5?1:-1),this.dy=2*(Math.random()>.5?1:-1),this.color="white"}reset(){this.x=l.BASE_WIDTH/2,this.y=l.BASE_HEIGHT/2,this.radius=10,this.speed=l.BALL_SPEED,this.dx=2*(Math.random()>.5?1:-1),this.dy=2*(Math.random()>.5?1:-1),this.color="white"}move(){this.x+=this.dx,this.y+=this.dy}checkWallCollision(){const t=this.x-this.radius<=0,e=this.x+this.radius>=l.BASE_WIDTH,i=this.y-this.radius<=0,a=this.y+this.radius>=l.BASE_HEIGHT;return t||e?(this.dx=-this.dx,!0):i||a?(this.dy=-this.dy,!0):!1}handlePaddleCollision(t,e){this.dx=Math.cos(t)*this.speed*(e?-1:1),this.dy=Math.sin(t)*this.speed,this.speed=Math.min(this.speed*1.05,l.MAX_BALL_SPEED)}}class x{constructor(t){n(this,"x");n(this,"y");n(this,"width");n(this,"height");n(this,"speed");n(this,"targetY");this.width=l.PADDLE_WIDTH,this.height=l.PADDLE_HEIGHT,this.speed=l.PADDLE_SPEED,this.targetY=l.BASE_HEIGHT/2-this.height/2,this.x=t?l.PADDLE_OFFSET:l.BASE_WIDTH-l.PADDLE_OFFSET-this.width,this.y=this.targetY}move(t){const e=t*this.speed;this.targetY=Math.max(0,Math.min(l.BASE_HEIGHT-this.height,this.targetY+e)),this.y=this.targetY}update(t){const e=this.targetY-this.y,i=this.speed*t;this.y+=Math.sign(e)*Math.min(i,Math.abs(e))}reset(){this.y=l.BASE_HEIGHT/2-this.height/2,this.targetY=this.y}checkBallCollision(t,e,i){if(t+i<this.x||t-i>this.x+this.width||e+i<this.y||e-i>this.y+this.height)return 0;const a=this.height/8,r=e-this.y;let d=Math.floor(r/a)+1;return d=Math.max(1,Math.min(8,d)),d}getDeflectionAngle(t){return l.DEFLECTION_ANGLES[t-1]*(Math.PI/180)}}class p{static init(){this.ctx||(this.ctx=new(window.AudioContext||window.webkitAudioContext))}static play(t){this.init(),this.nodes[t]&&this.nodes[t].stop();const e=this.ctx.createOscillator(),i=this.ctx.createGain();switch(t){case"paddle":e.type="sine",e.frequency.value=220,i.gain.value=.3;break;case"wall":e.type="square",e.frequency.value=440,i.gain.value=.2;break;case"score":e.type="sawtooth",e.frequency.value=110,i.gain.value=.4;break}e.connect(i),i.connect(this.ctx.destination);const a=t==="score"?.5:.05;e.start(),e.stop(this.ctx.currentTime+a),this.nodes[t]=e}}n(p,"ctx"),n(p,"nodes",{});class k{constructor(){n(this,"canvas");n(this,"ctx");n(this,"virtualCanvas",new I);n(this,"ball",new B);n(this,"leftPaddle",new x(!0));n(this,"rightPaddle",new x(!1));n(this,"animationFrameId",0);n(this,"scorePlayer1",0);n(this,"scorePlayer2",0);n(this,"keysPressed",{});n(this,"showCollisionZones",!1)}init(){this.canvas=document.getElementById("game-canvas"),this.ctx=this.canvas.getContext("2d"),this.resizeCanvas(),p.init(),window.addEventListener("resize",()=>this.resizeCanvas()),this.startLoop()}resizeCanvas(){const t=this.canvas.parentElement,e=window.getComputedStyle(t),i=t.clientWidth-(parseFloat(e.paddingLeft)+parseFloat(e.paddingRight)),a=t.clientHeight-(parseFloat(e.paddingTop)+parseFloat(e.paddingBottom));this.virtualCanvas.update(i,a),this.canvas.width=i,this.canvas.height=a,this.canvas.style.width=`${i}px`,this.canvas.style.height=`${a}px`}startLoop(){const t=()=>{this.update(),this.draw(),this.animationFrameId=requestAnimationFrame(t)};t()}update(){this.ball.move(),this.ball.checkWallCollision()&&p.play("wall"),this.checkPaddleCollision(this.leftPaddle),this.checkPaddleCollision(this.rightPaddle),this.checkGoal(),this.keysPressed.w&&this.leftPaddle.move(-1),this.keysPressed.s&&this.leftPaddle.move(1),this.keysPressed.ArrowUp&&this.rightPaddle.move(-1),this.keysPressed.ArrowDown&&this.rightPaddle.move(1)}checkPaddleCollision(t){const e=t.checkBallCollision(this.ball.x,this.ball.y,this.ball.radius);if(e>0){const i=t.getDeflectionAngle(e);p.play("paddle"),this.ball.handlePaddleCollision(i,t===this.rightPaddle),this.showCollisionZones=!0,setTimeout(()=>this.showCollisionZones=!1,100)}}checkGoal(){this.ball.x-this.ball.radius<=0?(this.scorePlayer2++,this.resetRound()):this.ball.x+this.ball.radius>=l.BASE_WIDTH&&(this.scorePlayer1++,this.resetRound()),(this.scorePlayer1>=21||this.scorePlayer2>=21)&&(this.scorePlayer1=0,this.scorePlayer2=0)}resetRound(){p.play("score"),this.ball.reset()}draw(){this.drawBackground(),this.drawCenterLine(),this.drawPaddle(this.leftPaddle),this.drawPaddle(this.rightPaddle),this.drawBall(),this.drawScore()}drawBackground(){this.ctx.fillStyle="black",this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height)}drawCenterLine(){this.ctx.strokeStyle="rgba(255, 255, 255, 0.5)",this.ctx.lineWidth=this.virtualCanvas.toPhysicalSize(4),this.ctx.setLineDash([this.virtualCanvas.toPhysicalSize(20),this.virtualCanvas.toPhysicalSize(15)]),this.ctx.beginPath(),this.ctx.moveTo(this.canvas.width/2,0),this.ctx.lineTo(this.canvas.width/2,this.canvas.height),this.ctx.stroke(),this.ctx.setLineDash([])}drawPaddle(t){if(this.ctx.fillStyle="white",this.ctx.fillRect(this.virtualCanvas.toPhysicalX(t.x),this.virtualCanvas.toPhysicalY(t.y),this.virtualCanvas.toPhysicalSize(t.width),this.virtualCanvas.toPhysicalSize(t.height)),this.showCollisionZones){const e=t.height/8;for(let i=0;i<8;i++)this.ctx.fillStyle=`rgba(255, 0, 0, ${.2+i*.1})`,this.ctx.fillRect(this.virtualCanvas.toPhysicalX(t.x),this.virtualCanvas.toPhysicalY(t.y+i*e),this.virtualCanvas.toPhysicalSize(t.width),this.virtualCanvas.toPhysicalSize(e))}}drawBall(){this.ctx.fillStyle="white",this.ctx.beginPath(),this.ctx.arc(this.virtualCanvas.toPhysicalX(this.ball.x),this.virtualCanvas.toPhysicalY(this.ball.y),this.virtualCanvas.toPhysicalSize(this.ball.radius),0,Math.PI*2),this.ctx.fill()}drawScore(){const t=this.virtualCanvas.toPhysicalSize(48);this.ctx.font=`${t}px 'DSEG7ClassicMini', monospace`,this.ctx.textAlign="center",this.ctx.fillStyle="white",this.ctx.fillText(this.scorePlayer1.toString().padStart(2,"0"),this.virtualCanvas.toPhysicalX(l.BASE_WIDTH/4),this.virtualCanvas.toPhysicalY(60)),this.ctx.fillText(this.scorePlayer2.toString().padStart(2,"0"),this.virtualCanvas.toPhysicalX(l.BASE_WIDTH*3/4),this.virtualCanvas.toPhysicalY(60))}setKey(t,e){this.keysPressed[t]=e}setBallSpeed(t){this.ball.speed=t}stop(){cancelAnimationFrame(this.animationFrameId)}render(){return`
    <div class="flex items-center justify-center bg-[#fbd11b] p-2 w-full">
      <div class="aspect-[4/3] w-full max-w-[1024px] min-w-[600px] bg-black border-4 border-white">
        <canvas 
          id="game-canvas" 
          class="w-full h-full"
        ></canvas>
      </div>
    </div>
    `}}const g=new k,w={renderGameCanvas:()=>g.render(),initGameCanvas:()=>g.init(),stop:()=>g.stop(),setBallSpeed:s=>g.setBallSpeed(s),handleKeyDown:s=>g.setKey(s,!0),handleKeyUp:s=>g.setKey(s,!1)},E={renderGameSettings(){return`
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
    `},initSettings(){const s=document.getElementById("ball-speed");s&&s.addEventListener("input",()=>{const t=parseFloat(s.value);w.setBallSpeed(t)})}},D={init(){window.addEventListener("keydown",s=>{["ArrowUp","ArrowDown","w","s"].includes(s.key)&&s.preventDefault(),w.handleKeyDown(s.key)}),window.addEventListener("keyup",s=>{["ArrowUp","ArrowDown","w","s"].includes(s.key)&&s.preventDefault(),w.handleKeyUp(s.key)})}};class H{constructor(){n(this,"isLoginView",!0)}init(){this.render(),this.bindAuthEvents()}render(){const t=document.getElementById("auth-container");if(t){const e=c.getCurrentUser();t.innerHTML=e?b.renderProfile(e.email):b.renderAuthForm(this.isLoginView)}}bindAuthEvents(){document.addEventListener("click",t=>{const e=t.target;e.closest("#login-btn")?(this.isLoginView=!0,this.render()):e.closest("#register-btn")?(this.isLoginView=!1,this.render()):e.closest("#logout-btn")?(c.logout(),this.isLoginView=!0,this.render()):e.closest("#toggle-auth")&&(this.isLoginView=!this.isLoginView,this.render())}),document.addEventListener("submit",async t=>{t.target.id==="auth-form"&&(t.preventDefault(),await this.handleAuthFormSubmit())})}async handleAuthFormSubmit(){const t=document.getElementById("email"),e=document.getElementById("password"),i=document.getElementById("auth-error");if(!t||!e||!i)return;const a=t.value,r=e.value;try{this.isLoginView?await c.login(a,r):await c.register(a,r),this.render()}catch(d){i.textContent=d.message}}}const T=new H,P={currentUser:null,isLogin:!0,render(){return`
    <div class="flex flex-col min-h-screen bg-[#fbd11b] text-black">

      <!-- Header with Pong Logo -->
      <header class="flex justify-center items-center h-24 bg-[#fbd11b]">
        <img src="/pong-logo.png" alt="PONG Logo" class="h-16">
      </header>

      <!-- Game Canvas Area -->
	<main class="flex-1 flex items-center justify-center bg-[#fbd11b] overflow-y-auto min-h-[450px]">
        ${w.renderGameCanvas()}
      </main>

      <!-- Control Panel -->
      <footer class="bg-[#fbd11b] p-4">
        ${E.renderGameSettings()}
      </footer>

    </div>
    `},renderAuth(){const s=c.getCurrentUser();return s?b.renderProfile(s.email):b.renderAuthForm(this.isLogin)},init(){this.currentUser=c.getCurrentUser(),w.initGameCanvas(),D.init(),T.init(),E.initSettings(),c.onAuthStateChanged(()=>{this.currentUser=c.getCurrentUser(),document.getElementById("auth-container").innerHTML=this.renderAuth()})}};class M{constructor(){n(this,"currentUser",null);this.initializeUser()}initializeUser(){const t=localStorage.getItem("authToken"),e=localStorage.getItem("userEmail");t&&e?this.currentUser={email:e,token:t}:m.navigate("home")}render(){var t;return`
      <div class="flex h-screen bg-gray-100">
        <!-- Sidebar -->
        <div class="w-64 bg-white shadow-md p-4">
          <div class="p-4 border-b">
            <p class="font-medium">${((t=this.currentUser)==null?void 0:t.email)||"User"}</p>
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
    `}initEventListeners(){const t=document.getElementById("logout-btn");t&&t.addEventListener("click",this.handleLogout.bind(this))}handleLogout(){localStorage.removeItem("authToken"),localStorage.removeItem("userEmail"),this.currentUser=null,m.navigate("home")}initialize(){const t=document.getElementById("app");t?(t.innerHTML=this.render(),this.initEventListeners()):console.error("App container not found")}}function L(){document.getElementById("login-btn").addEventListener("click",()=>{const e=document.getElementById("login").value,i=document.getElementById("password").value;fetch("/api/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({login:e,password:i})}).then(a=>a.json()).then(a=>{localStorage.setItem("login",e);const r=localStorage.getItem("login");r&&a.success==!0&&(document.getElementById("title").textContent=`Hi ${r}`),document.getElementById("welcome-div").style.display=a.success?"block":"none",document.getElementById("welcome-div").textContent=`Welcome ${r}, you are now connected :)`}),console.log(e,"Password:",i)});const t=document.getElementById("registerBtn");t==null||t.addEventListener("click",()=>{var a;if(document.getElementById("register-container"))return;const i=document.createElement("div");i.id="register-container",i.innerHTML=`
		<input id="new-username" placeholder="Username" class="mb-4 px-4 py-2 border rounded w-64"/><br/>
		<input id="new-password" placeholder="Password" type="password" class="mb-4 px-4 py-2 border rounded w-64"/><br/>
		<input id="new-alias" placeholder="Alias" class="mb-4 px-4 py-2 border rounded w-64"/><br/>
		<button id="create-account" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Create Account</button>
	`,document.body.appendChild(i),(a=document.getElementById("create-account"))==null||a.addEventListener("click",()=>{const r=document.getElementById("new-username").value,d=document.getElementById("new-password").value,h=document.getElementById("new-alias").value;fetch("/api/auth/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({login:r,password:d,alias:h})}).then(o=>o.json()).then(o=>console.log("Account created:",o)).catch(o=>console.error(o))})})}class S{static render(){return`
	<div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
		<h1 id="title" class="text-3xl font-bold mb-6 text-blue-600">Hi</h1>
		<input type="text" id="login" placeholder="Login" class="mb-2 px-4 py-2 border rounded w-64" />
		<input type="password" id="password" placeholder="Password" class="mb-4 px-4 py-2 border rounded w-64"/>
		<div class="mb-4 px-4 py-2 rounded w-64 flex justify-between">
			<button id="login-btn" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Log in</button>
			<button id="registerBtn" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Register</button>
		</div>
		<div id="welcome-div" style="display: none;"></div>
	</div>`}static init(){console.log("in webdev/pong/src/views/login.ts: Login page initialized"),L()}}class m{static navigate(t){if(!this.app){console.error("App container not found");return}if(this.app.innerHTML="",t==="dashboard"&&!this.isAuthenticated())return console.warn("Redirecting to home: not authenticated"),this.navigate("home");switch(t){case"home":if(this.isAuthenticated())return this.navigate("dashboard");this.app.innerHTML=P.render(),P.init();break;case"dashboard":new M().initialize();break;case"login":this.app.innerHTML=S.render(),S.init();break}history.pushState({},"",t==="home"?"/":`/${t}`)}static isAuthenticated(){return localStorage.getItem("authToken")!==null}static init(){window.addEventListener("load",()=>{const t=window.location.pathname;this.navigate(t.includes("dashboard")?"dashboard":t.includes("login")?"login":"home")}),window.addEventListener("popstate",()=>{const t=window.location.pathname;this.navigate(t.includes("dashboard")?"dashboard":t.includes("login")?"login":"home")})}}n(m,"app",document.getElementById("app"));m.init();window.addEventListener("load",()=>{const s=window.location.pathname;m.navigate(s.includes("dashboard")?"dashboard":s.includes("login")?"login":"home"),L()});window.addEventListener("popstate",()=>{const s=window.location.pathname;m.navigate(s.includes("dashboard")?"dashboard":s.includes("login")?"login":"home")});
