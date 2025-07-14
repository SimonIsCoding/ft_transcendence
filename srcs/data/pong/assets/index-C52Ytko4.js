var k=Object.defineProperty;var T=(i,e,t)=>e in i?k(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var a=(i,e,t)=>T(i,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function t(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(n){if(n.ep)return;n.ep=!0;const o=t(n);fetch(n.href,o)}})();const x="https://localhost:4443/api/auth",g=class g{constructor(){a(this,"listeners",[])}static getInstance(){return g.instance||(g.instance=new g),g.instance}getCurrentUser(){const e=localStorage.getItem("user");return e?JSON.parse(e):null}async login(e,t,s){var n,o,c;try{const d=await fetch(`${x}/login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:e,password:t}),credentials:"include"}),r=await d.json();if(!d.ok||r.status!=="success")throw new Error(r.error||r.message||"Login failed");if(!((o=(n=r.data)==null?void 0:n.user)!=null&&o.email)||!((c=r.data)!=null&&c.token))throw new Error("Invalid server response format");const h={email:r.data.user.email,token:r.data.token,alias:s||r.data.user.alias||r.data.user.email.split("@")[0]};return this.saveUser(h),h}catch(d){throw console.error("Login error:",d),new Error(d instanceof Error?d.message:"An unknown error occurred")}}async register(e,t,s){var n,o,c;try{const d=await fetch(`${x}/register`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:e,password:t,...s&&{alias:s}}),credentials:"include"}),r=await d.json();if(!d.ok||r.status!=="success")throw new Error(r.error||r.message||"Registration failed");if(!((o=(n=r.data)==null?void 0:n.user)!=null&&o.email)||!((c=r.data)!=null&&c.token))throw new Error("Invalid server response format");const h={email:r.data.user.email,token:r.data.token,alias:s||r.data.user.alias||r.data.user.email.split("@")[0]};return this.saveUser(h),h}catch(d){throw console.error("Registration error:",d),new Error(d instanceof Error?d.message:"Registration failed")}}logout(){localStorage.removeItem("user"),this.notifyListeners()}updateAlias(e){const t=this.getCurrentUser();t&&(t.alias=e,this.saveUser(t))}onAuthStateChanged(e){this.listeners.push(e)}saveUser(e){localStorage.setItem("user",JSON.stringify(e)),this.notifyListeners()}notifyListeners(){this.listeners.forEach(e=>e())}};a(g,"instance");let v=g;const u=v.getInstance(),w={render(){const i=u.getCurrentUser();return i?this.renderProfile(i.email):this.renderAuthSelector()},renderAuthSelector(){return`
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
    `},renderAuthForm(i){return`
      <div class="space-y-4 p-4">
        <h2 class="text-xl font-bold">${i?"Login":"Register"}</h2>
        <form id="auth-form" class="space-y-3">
          <input type="email" id="email" placeholder="Email" required
                 class="w-full px-3 py-2 border rounded">
          <input type="password" id="password" placeholder="Password" required
                 class="w-full px-3 py-2 border rounded">
          <button type="submit" 
                  class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            ${i?"Login":"Register"}
          </button>
          <button id="toggle-auth" type="button"
                  class="w-full text-blue-500 underline text-sm">
            ${i?"Need an account? Register":"Have an account? Login"}
          </button>
        </form>
        <div id="auth-error" class="text-red-500 text-sm"></div>
      </div>
    `},renderProfile(i){return`
      <div class="p-4 space-y-3">
        <h3 class="font-bold text-lg">Profile</h3>
        <p>Logged in as: <strong>${i}</strong></p>
        <button id="logout-btn"
                class="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600">
          Logout
        </button>
      </div>
    `}},l={BASE_WIDTH:1024,BASE_HEIGHT:768,BALL_SPEED:2,MAX_BALL_SPEED:10,PADDLE_WIDTH:10,PADDLE_HEIGHT:80,PADDLE_SPEED:5,PADDLE_OFFSET:30,DEFLECTION_ANGLES:[-45,-30,-15,0,0,15,30,45]};class H{constructor(){a(this,"physicalWidth",0);a(this,"physicalHeight",0);a(this,"scaleFactor",1);a(this,"baseWidth",l.BASE_WIDTH);a(this,"baseHeight",l.BASE_HEIGHT)}update(e,t){this.physicalWidth=e,this.physicalHeight=t;const s=e/this.baseWidth,n=t/this.baseHeight;this.scaleFactor=Math.min(s,n)}toPhysicalX(e){return e*this.scaleFactor}toPhysicalY(e){return e*this.scaleFactor}toPhysicalSize(e){return e*this.scaleFactor}get currentVirtualWidth(){return this.baseWidth}get currentVirtualHeight(){return this.baseHeight}getPhysicalDimensions(){return{width:this.physicalWidth,height:this.physicalHeight}}}class D{constructor(){a(this,"x");a(this,"y");a(this,"radius");a(this,"dx");a(this,"dy");a(this,"speed");a(this,"color");this.x=l.BASE_WIDTH/2,this.y=l.BASE_HEIGHT/2,this.radius=10,this.speed=l.BALL_SPEED,this.dx=2*(Math.random()>.5?1:-1),this.dy=2*(Math.random()>.5?1:-1),this.color="white"}reset(){this.x=l.BASE_WIDTH/2,this.y=l.BASE_HEIGHT/2,this.radius=10,this.speed=l.BALL_SPEED,this.dx=2*(Math.random()>.5?1:-1),this.dy=2*(Math.random()>.5?1:-1),this.color="white"}move(){this.x+=this.dx,this.y+=this.dy}checkWallCollision(){const e=this.x-this.radius<=0,t=this.x+this.radius>=l.BASE_WIDTH,s=this.y-this.radius<=0,n=this.y+this.radius>=l.BASE_HEIGHT;return e||t?(this.dx=-this.dx,!0):s||n?(this.dy=-this.dy,!0):!1}handlePaddleCollision(e,t){this.dx=Math.cos(e)*this.speed*(t?-1:1),this.dy=Math.sin(e)*this.speed,this.speed=Math.min(this.speed*1.05,l.MAX_BALL_SPEED)}}class E{constructor(e){a(this,"x");a(this,"y");a(this,"width");a(this,"height");a(this,"speed");a(this,"targetY");this.width=l.PADDLE_WIDTH,this.height=l.PADDLE_HEIGHT,this.speed=l.PADDLE_SPEED,this.targetY=l.BASE_HEIGHT/2-this.height/2,this.x=e?l.PADDLE_OFFSET:l.BASE_WIDTH-l.PADDLE_OFFSET-this.width,this.y=this.targetY}move(e){const t=e*this.speed;this.targetY=Math.max(0,Math.min(l.BASE_HEIGHT-this.height,this.targetY+t)),this.y=this.targetY}update(e){const t=this.targetY-this.y,s=this.speed*e;this.y+=Math.sign(t)*Math.min(s,Math.abs(t))}reset(){this.y=l.BASE_HEIGHT/2-this.height/2,this.targetY=this.y}checkBallCollision(e,t,s){if(e+s<this.x||e-s>this.x+this.width||t+s<this.y||t-s>this.y+this.height)return 0;const n=this.height/8,o=t-this.y;let c=Math.floor(o/n)+1;return c=Math.max(1,Math.min(8,c)),c}getDeflectionAngle(e){return l.DEFLECTION_ANGLES[e-1]*(Math.PI/180)}}class y{static init(){this.ctx||(this.ctx=new(window.AudioContext||window.webkitAudioContext))}static play(e){this.init(),this.nodes[e]&&this.nodes[e].stop();const t=this.ctx.createOscillator(),s=this.ctx.createGain();switch(e){case"paddle":t.type="sine",t.frequency.value=220,s.gain.value=.3;break;case"wall":t.type="square",t.frequency.value=440,s.gain.value=.2;break;case"score":t.type="sawtooth",t.frequency.value=110,s.gain.value=.4;break}t.connect(s),s.connect(this.ctx.destination);const n=e==="score"?.5:.05;t.start(),t.stop(this.ctx.currentTime+n),this.nodes[e]=t}}a(y,"ctx"),a(y,"nodes",{});class M{constructor(){a(this,"canvas");a(this,"ctx");a(this,"virtualCanvas",new H);a(this,"ball",new D);a(this,"leftPaddle",new E(!0));a(this,"rightPaddle",new E(!1));a(this,"animationFrameId",0);a(this,"scorePlayer1",0);a(this,"scorePlayer2",0);a(this,"keysPressed",{});a(this,"showCollisionZones",!1)}init(){this.canvas=document.getElementById("game-canvas"),this.ctx=this.canvas.getContext("2d"),this.resizeCanvas(),y.init(),window.addEventListener("resize",()=>this.resizeCanvas()),this.startLoop()}resizeCanvas(){const e=this.canvas.parentElement,t=window.getComputedStyle(e),s=e.clientWidth-(parseFloat(t.paddingLeft)+parseFloat(t.paddingRight)),n=e.clientHeight-(parseFloat(t.paddingTop)+parseFloat(t.paddingBottom));this.virtualCanvas.update(s,n),this.canvas.width=s,this.canvas.height=n,this.canvas.style.width=`${s}px`,this.canvas.style.height=`${n}px`}startLoop(){const e=()=>{this.update(),this.draw(),this.animationFrameId=requestAnimationFrame(e)};e()}update(){this.ball.move(),this.ball.checkWallCollision()&&y.play("wall"),this.checkPaddleCollision(this.leftPaddle),this.checkPaddleCollision(this.rightPaddle),this.checkGoal(),this.keysPressed.w&&this.leftPaddle.move(-1),this.keysPressed.s&&this.leftPaddle.move(1),this.keysPressed.ArrowUp&&this.rightPaddle.move(-1),this.keysPressed.ArrowDown&&this.rightPaddle.move(1)}checkPaddleCollision(e){const t=e.checkBallCollision(this.ball.x,this.ball.y,this.ball.radius);if(t>0){const s=e.getDeflectionAngle(t);y.play("paddle"),this.ball.handlePaddleCollision(s,e===this.rightPaddle),this.showCollisionZones=!0,setTimeout(()=>this.showCollisionZones=!1,100)}}checkGoal(){this.ball.x-this.ball.radius<=0?(this.scorePlayer2++,this.resetRound()):this.ball.x+this.ball.radius>=l.BASE_WIDTH&&(this.scorePlayer1++,this.resetRound()),(this.scorePlayer1>=21||this.scorePlayer2>=21)&&(this.scorePlayer1=0,this.scorePlayer2=0)}resetRound(){y.play("score"),this.ball.reset()}draw(){this.drawBackground(),this.drawCenterLine(),this.drawPaddle(this.leftPaddle),this.drawPaddle(this.rightPaddle),this.drawBall(),this.drawScore()}drawBackground(){this.ctx.fillStyle="black",this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height)}drawCenterLine(){this.ctx.strokeStyle="rgba(255, 255, 255, 0.5)",this.ctx.lineWidth=this.virtualCanvas.toPhysicalSize(4),this.ctx.setLineDash([this.virtualCanvas.toPhysicalSize(20),this.virtualCanvas.toPhysicalSize(15)]),this.ctx.beginPath(),this.ctx.moveTo(this.canvas.width/2,0),this.ctx.lineTo(this.canvas.width/2,this.canvas.height),this.ctx.stroke(),this.ctx.setLineDash([])}drawPaddle(e){if(this.ctx.fillStyle="white",this.ctx.fillRect(this.virtualCanvas.toPhysicalX(e.x),this.virtualCanvas.toPhysicalY(e.y),this.virtualCanvas.toPhysicalSize(e.width),this.virtualCanvas.toPhysicalSize(e.height)),this.showCollisionZones){const t=e.height/8;for(let s=0;s<8;s++)this.ctx.fillStyle=`rgba(255, 0, 0, ${.2+s*.1})`,this.ctx.fillRect(this.virtualCanvas.toPhysicalX(e.x),this.virtualCanvas.toPhysicalY(e.y+s*t),this.virtualCanvas.toPhysicalSize(e.width),this.virtualCanvas.toPhysicalSize(t))}}drawBall(){this.ctx.fillStyle="white",this.ctx.beginPath(),this.ctx.arc(this.virtualCanvas.toPhysicalX(this.ball.x),this.virtualCanvas.toPhysicalY(this.ball.y),this.virtualCanvas.toPhysicalSize(this.ball.radius),0,Math.PI*2),this.ctx.fill()}drawScore(){const e=this.virtualCanvas.toPhysicalSize(48);this.ctx.font=`${e}px 'DSEG7ClassicMini', monospace`,this.ctx.textAlign="center",this.ctx.fillStyle="white",this.ctx.fillText(this.scorePlayer1.toString().padStart(2,"0"),this.virtualCanvas.toPhysicalX(l.BASE_WIDTH/4),this.virtualCanvas.toPhysicalY(60)),this.ctx.fillText(this.scorePlayer2.toString().padStart(2,"0"),this.virtualCanvas.toPhysicalX(l.BASE_WIDTH*3/4),this.virtualCanvas.toPhysicalY(60))}setKey(e,t){this.keysPressed[e]=t}setBallSpeed(e){this.ball.speed=e}stop(){cancelAnimationFrame(this.animationFrameId)}render(){return`
    <div class="flex items-center justify-center bg-[#fbd11b] p-2 w-full">
      <div class="aspect-[4/3] w-full max-w-[1024px] min-w-[600px] bg-black border-4 border-white">
        <canvas 
          id="game-canvas" 
          class="w-full h-full"
        ></canvas>
      </div>
    </div>
    `}}const p=new M,b={renderGameCanvas:()=>p.render(),initGameCanvas:()=>p.init(),stop:()=>p.stop(),setBallSpeed:i=>p.setBallSpeed(i),handleKeyDown:i=>p.setKey(i,!0),handleKeyUp:i=>p.setKey(i,!1)},P={renderGameSettings(){return`
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
    `},initSettings(){const i=document.getElementById("ball-speed");i&&i.addEventListener("input",()=>{const e=parseFloat(i.value);b.setBallSpeed(e)})}},U={init(){window.addEventListener("keydown",i=>{["ArrowUp","ArrowDown","w","s"].includes(i.key)&&i.preventDefault(),b.handleKeyDown(i.key)}),window.addEventListener("keyup",i=>{["ArrowUp","ArrowDown","w","s"].includes(i.key)&&i.preventDefault(),b.handleKeyUp(i.key)})}};class _{constructor(){a(this,"isLoginView",!0)}init(){this.render(),this.bindAuthEvents()}render(){const e=document.getElementById("auth-container");if(e){const t=u.getCurrentUser();e.innerHTML=t?w.renderProfile(t.email):w.renderAuthForm(this.isLoginView)}}bindAuthEvents(){document.addEventListener("click",e=>{const t=e.target;t.closest("#login-btn")?(this.isLoginView=!0,this.render()):t.closest("#register-btn")?(this.isLoginView=!1,this.render()):t.closest("#logout-btn")?(u.logout(),this.isLoginView=!0,this.render()):t.closest("#toggle-auth")&&(this.isLoginView=!this.isLoginView,this.render())}),document.addEventListener("submit",async e=>{e.target.id==="auth-form"&&(e.preventDefault(),await this.handleAuthFormSubmit())})}async handleAuthFormSubmit(){const e=document.getElementById("email"),t=document.getElementById("password"),s=document.getElementById("auth-error");if(!e||!t||!s)return;const n=e.value,o=t.value;try{this.isLoginView?await u.login(n,o):await u.register(n,o),this.render()}catch(c){s.textContent=c.message}}}const G=new _;function F(){fetch("/api/private/info",{method:"GET",credentials:"include"}).then(i=>{if(!i.ok)throw new Error("Unauthorized");return i.json()}).then(i=>{console.log("In isConnected(): userId:",i.userId),console.log("In isConnected(): login:",i.login),console.log("In isConnected(): alias:",i.alias),console.log("connecté in data");const e=document.getElementById("login-icon"),t=document.getElementById("logged-icon");console.log("User info:",i),e==null||e.classList.add("hidden"),t==null||t.classList.remove("hidden")}).catch(()=>{console.log("Pas connecté, in catch");const i=document.getElementById("login-icon"),e=document.getElementById("logged-icon");e==null||e.classList.add("hidden"),i==null||i.classList.remove("hidden")})}function C(){document.getElementById("login-btn").addEventListener("click",()=>{const e=document.getElementById("login").value,t=document.getElementById("password").value;fetch("/api/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({login:e,password:t}),credentials:"include"}).then(s=>s.json()).then(s=>{localStorage.setItem("login",e);const n=localStorage.getItem("login");n&&s.success==!0?(document.getElementById("title").textContent=`Hi ${n}`,document.getElementById("welcome-div").style.display="block",document.getElementById("welcome-div").textContent=`Welcome ${n}, you are now connected :)`):(document.getElementById("title").textContent="Hi",document.getElementById("welcome-div").style.display="block",document.getElementById("welcome-div").textContent="Sorry. Your credentials doesn't match.")}),console.log("login: ",e,"Password:",t),fetch("/api/auth/debug-token",{credentials:"include"}).then(s=>s.json()).then(s=>console.log("Token received via cookie:",s.token)),fetch("/api/auth/login",{method:"GET",credentials:"include"}).then(s=>{if(!s.ok)throw new Error("Unauthorized");return s.json()}).then(s=>{console.log("In isConnected(): userId:",s.userId),console.log("In isConnected(): login:",s.login),console.log("In isConnected(): alias:",s.alias)})})}function B(){const i=document.getElementById("registerBtn");i==null||i.addEventListener("click",()=>{var s,n;if(document.getElementById("connexionBlock").style.display="none",document.getElementById("register-container"))return;const t=document.createElement("div");t.id="register-container",t.innerHTML=`
		<div id="registrationBlock" class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
			<h1 id="title" class="text-3xl font-bold mb-6 text-blue-600">Hi</h1>
			<input id="new-username" placeholder="Username" class="mb-4 px-4 py-2 border rounded w-64"/><br/>
			<input id="new-password" placeholder="Password" type="password" class="mb-4 px-4 py-2 border rounded w-64"/><br/>
			<input id="new-alias" placeholder="Alias" class="mb-4 px-4 py-2 border rounded w-64"/><br/>
			<button id="create-account" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Create Account</button>
			<button id="backToLogin" class="cursor-pointer text-blue-500 underline">Click here to be back to log in</button>
		</div>
	`,document.body.appendChild(t),(s=document.getElementById("backToLogin"))==null||s.addEventListener("click",()=>{var o;(o=document.getElementById("register-container"))==null||o.remove(),document.getElementById("connexionBlock").style.display="flex"}),(n=document.getElementById("create-account"))==null||n.addEventListener("click",()=>{const o=document.getElementById("new-username").value,c=document.getElementById("new-password").value,d=document.getElementById("new-alias").value;fetch("/api/auth/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({login:o,password:c,alias:d}),credentials:"include"}).then(r=>{const h=document.getElementById("registrationBlock");let m=document.getElementById("registration-created");return m||(m=document.createElement("p"),m.id="registration-created",h==null||h.appendChild(m)),r.status===200?m.textContent="Wonderful. You have created your account. You can connect to your account now.":m.textContent="An account with this login has already been created.",r.json()}).then(r=>{console.log("Account created:",r)}).catch(r=>console.error(r))})})}function A(){fetch("/api/auth/info",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({}),credentials:"include"}).then(i=>i.json()).then(i=>{console.log("You are in info page & data:",i)})}async function W(){try{const i=await fetch("/api/auth/info",{method:"GET",credentials:"include"});if(!i.ok)throw new Error("Not authenticated");const e=await i.json();return console.log("User info received:",e),!0}catch(i){return console.warn("User not authenticated:",i),!1}}const S={currentUser:null,isLogin:!0,render(){return`
    <div class="flex flex-col min-h-screen bg-[#fbd11b] text-black">

      <!-- Header with Pong Logo -->
      <header class="flex justify-center items-center h-24 bg-[#fbd11b]">
        <img src="/pong-logo.png" alt="PONG Logo" class="h-16">
		<a href="/login" id="login-icon" class="hidden absolute right-6 top-6">
  			<img src="/login-icon.png" alt="Login" class="h-8 w-8" />
		</a>
		<a href="/logged" id="logged-icon" class="hidden absolute right-6 top-6">
  			<img src="/logged-icon.png" alt="Logged" class="h-8 w-8" />
		</a>
      </header>

      <!-- Game Canvas Area -->
	<main class="flex-1 flex items-center justify-center bg-[#fbd11b] overflow-y-auto min-h-[450px]">
        ${b.renderGameCanvas()}
      </main>

      <!-- Control Panel -->
      <footer class="bg-[#fbd11b] p-4">
        ${P.renderGameSettings()}
      </footer>

    </div>
    `},renderAuth(){const i=u.getCurrentUser();return i?w.renderProfile(i.email):w.renderAuthForm(this.isLogin)},init(){this.currentUser=u.getCurrentUser(),b.initGameCanvas(),U.init(),G.init(),P.initSettings(),u.onAuthStateChanged(()=>{this.currentUser=u.getCurrentUser(),document.getElementById("auth-container").innerHTML=this.renderAuth()}),F()}};class O{constructor(){a(this,"currentUser",null);this.initializeUser()}initializeUser(){const e=localStorage.getItem("token"),t=localStorage.getItem("userEmail");e&&t?this.currentUser={email:t,token:e}:f.navigate("home")}render(){var e;return`
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
    `}initEventListeners(){const e=document.getElementById("logout-btn");e&&e.addEventListener("click",this.handleLogout.bind(this))}handleLogout(){localStorage.removeItem("authToken"),localStorage.removeItem("userEmail"),this.currentUser=null,f.navigate("home")}initialize(){const e=document.getElementById("app");e?(e.innerHTML=this.render(),this.initEventListeners()):console.error("App container not found")}}class I{static render(){return`
	<div id="connexionBlock" class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
		<h1 id="title" class="text-3xl font-bold mb-6 text-blue-600">Hi</h1>
		<input id="login" type="text" placeholder="Login" class="mb-2 px-4 py-2 border rounded w-64" />
		<input id="password" type="password" placeholder="Password" class="mb-4 px-4 py-2 border rounded w-64"/>
		<div class="mb-4 px-4 py-2 rounded w-64 flex justify-between">
			<button id="login-btn" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Log in</button>
			<button id="registerBtn" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Register</button>
		</div>
		<p id="welcome-div" style="display: none;"></p>
	</div>`}static init(){C(),B()}}class L{static render(){return`
	<div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
		<h1 class="text-3xl font-bold mb-6 text-blue-600">Welcome to your info page!<h1>
		<p class="flex flex-col items-center justify-center">You can see your details about your login and alias</p>
		<div id="info-credentials" class="flex flex-col items-center justify-center">
			<label id="current-login" for="current-login">current login: - Change it to: </label>
  			<input type="text" id="new-login" name="new-login" class="mb-4 px-4 py-2 border rounded w-64"><br><br>
			<label id="current-alias" for="current-alias">current alias: - Change it to: </label>
  			<input type="text" id="new-alias" name="new-alias" class="mb-4 px-4 py-2 border rounded w-64"><br><br>
			<button id="modifyBtn" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Modify</button>
		</div>
	</div>`}static init(){W();const e=localStorage.getItem("login")||"",t=localStorage.getItem("alias")||"";console.log("current login in localStorage:",e),console.log("current alias in localStorage:",t);const s=document.getElementById("current-login"),n=document.getElementById("current-alias"),o=document.getElementById("new-login"),c=document.getElementById("new-alias");s&&(s.innerText=`Current login: ${e} - Change it to:`),n&&(n.innerText=`Current alias: ${t} - Change it to:`),o&&(o.value=e),c&&(c.value=t),A()}}class f{static navigate(e){if(!this.app){console.error("App container not found");return}if(this.app.innerHTML="",e==="dashboard"&&!this.isAuthenticated())return console.warn("Redirecting to home: not authenticated"),this.navigate("home");switch(e){case"home":if(this.isAuthenticated())return this.navigate("dashboard");this.app.innerHTML=S.render(),S.init();break;case"dashboard":new O().initialize();break;case"login":this.app.innerHTML=I.render(),I.init();break;case"info":this.app.innerHTML=L.render(),L.init();break}history.pushState({},"",e==="home"?"/":`/${e}`)}static isAuthenticated(){return localStorage.getItem("authToken")!==null}static init(){window.addEventListener("load",()=>{const e=window.location.pathname;this.navigate(e.includes("dashboard")?"dashboard":e.includes("login")?"login":e.includes("info")?"info":"home")}),window.addEventListener("popstate",()=>{const e=window.location.pathname;this.navigate(e.includes("dashboard")?"dashboard":e.includes("login")?"login":e.includes("info")?"info":"home")})}}a(f,"app",document.getElementById("app"));f.init();window.addEventListener("load",()=>{const i=window.location.pathname;f.navigate(i.includes("dashboard")?"dashboard":i.includes("login")?"login":i.includes("info")?"info":"home"),C(),B(),A()});window.addEventListener("popstate",()=>{const i=window.location.pathname;f.navigate(i.includes("dashboard")?"dashboard":i.includes("login")?"login":i.includes("info")?"info":"home")});
