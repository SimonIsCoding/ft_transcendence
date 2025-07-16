var M=Object.defineProperty;var _=(s,e,t)=>e in s?M(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var o=(s,e,t)=>_(s,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function t(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(n){if(n.ep)return;n.ep=!0;const a=t(n);fetch(n.href,a)}})();const L="https://localhost:4443/api/auth",u=class u{constructor(){o(this,"listeners",[])}static getInstance(){return u.instance||(u.instance=new u),u.instance}getCurrentUser(){const e=localStorage.getItem("user");return e?JSON.parse(e):null}async login(e,t,i){var n,a,l;try{const d=await fetch(`${L}/login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:e,password:t}),credentials:"include"}),c=await d.json();if(!d.ok||c.status!=="success")throw new Error(c.error||c.message||"Login failed");if(!((a=(n=c.data)==null?void 0:n.user)!=null&&a.email)||!((l=c.data)!=null&&l.token))throw new Error("Invalid server response format");const m={email:c.data.user.email,token:c.data.token,alias:i||c.data.user.alias||c.data.user.email.split("@")[0]};return this.saveUser(m),m}catch(d){throw console.error("Login error:",d),new Error(d instanceof Error?d.message:"An unknown error occurred")}}async register(e,t,i){var n,a,l;try{const d=await fetch(`${L}/register`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:e,password:t,...i&&{alias:i}}),credentials:"include"}),c=await d.json();if(!d.ok||c.status!=="success")throw new Error(c.error||c.message||"Registration failed");if(!((a=(n=c.data)==null?void 0:n.user)!=null&&a.email)||!((l=c.data)!=null&&l.token))throw new Error("Invalid server response format");const m={email:c.data.user.email,token:c.data.token,alias:i||c.data.user.alias||c.data.user.email.split("@")[0]};return this.saveUser(m),m}catch(d){throw console.error("Registration error:",d),new Error(d instanceof Error?d.message:"Registration failed")}}logout(){localStorage.removeItem("user"),this.notifyListeners()}updateAlias(e){const t=this.getCurrentUser();t&&(t.alias=e,this.saveUser(t))}onAuthStateChanged(e){this.listeners.push(e)}saveUser(e){localStorage.setItem("user",JSON.stringify(e)),this.notifyListeners()}notifyListeners(){this.listeners.forEach(e=>e())}};o(u,"instance");let E=u;const g=E.getInstance(),v={render(){const s=g.getCurrentUser();return s?this.renderProfile(s.email):this.renderAuthSelector()},renderAuthSelector(){return`
      <div class="p-4 space-y-4">
        <h2 class="text-xl font-bold">Welcome!</h2>
        <div class="flex space-x-4">
          <button id="loginBtn" class="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
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
    `}},r={BASE_WIDTH:1024,BASE_HEIGHT:768,BALL_SPEED:2,MAX_BALL_SPEED:10,PADDLE_WIDTH:10,PADDLE_HEIGHT:80,PADDLE_SPEED:5,PADDLE_OFFSET:30,DEFLECTION_ANGLES:[-45,-30,-15,0,0,15,30,45]};class G{constructor(){o(this,"physicalWidth",0);o(this,"physicalHeight",0);o(this,"scaleFactor",1);o(this,"baseWidth",r.BASE_WIDTH);o(this,"baseHeight",r.BASE_HEIGHT)}update(e,t){this.physicalWidth=e,this.physicalHeight=t;const i=e/this.baseWidth,n=t/this.baseHeight;this.scaleFactor=Math.min(i,n)}toPhysicalX(e){return e*this.scaleFactor}toPhysicalY(e){return e*this.scaleFactor}toPhysicalSize(e){return e*this.scaleFactor}get currentVirtualWidth(){return this.baseWidth}get currentVirtualHeight(){return this.baseHeight}getPhysicalDimensions(){return{width:this.physicalWidth,height:this.physicalHeight}}}class F{constructor(){o(this,"x");o(this,"y");o(this,"radius");o(this,"dx");o(this,"dy");o(this,"speed");o(this,"color");this.x=r.BASE_WIDTH/2,this.y=r.BASE_HEIGHT/2,this.radius=10,this.speed=r.BALL_SPEED,this.dx=2*(Math.random()>.5?1:-1),this.dy=2*(Math.random()>.5?1:-1),this.color="white"}reset(){this.x=r.BASE_WIDTH/2,this.y=r.BASE_HEIGHT/2,this.radius=10,this.speed=r.BALL_SPEED,this.dx=2*(Math.random()>.5?1:-1),this.dy=2*(Math.random()>.5?1:-1),this.color="white"}move(){this.x+=this.dx,this.y+=this.dy}checkWallCollision(){const e=this.x-this.radius<=0,t=this.x+this.radius>=r.BASE_WIDTH,i=this.y-this.radius<=0,n=this.y+this.radius>=r.BASE_HEIGHT;return e||t?(this.dx=-this.dx,!0):i||n?(this.dy=-this.dy,!0):!1}handlePaddleCollision(e,t){this.dx=Math.cos(e)*this.speed*(t?-1:1),this.dy=Math.sin(e)*this.speed,this.speed=Math.min(this.speed*1.05,r.MAX_BALL_SPEED)}}class C{constructor(e){o(this,"x");o(this,"y");o(this,"width");o(this,"height");o(this,"speed");o(this,"targetY");this.width=r.PADDLE_WIDTH,this.height=r.PADDLE_HEIGHT,this.speed=r.PADDLE_SPEED,this.targetY=r.BASE_HEIGHT/2-this.height/2,this.x=e?r.PADDLE_OFFSET:r.BASE_WIDTH-r.PADDLE_OFFSET-this.width,this.y=this.targetY}move(e){const t=e*this.speed;this.targetY=Math.max(0,Math.min(r.BASE_HEIGHT-this.height,this.targetY+t)),this.y=this.targetY}update(e){const t=this.targetY-this.y,i=this.speed*e;this.y+=Math.sign(t)*Math.min(i,Math.abs(t))}reset(){this.y=r.BASE_HEIGHT/2-this.height/2,this.targetY=this.y}checkBallCollision(e,t,i){if(e+i<this.x||e-i>this.x+this.width||t+i<this.y||t-i>this.y+this.height)return 0;const n=this.height/8,a=t-this.y;let l=Math.floor(a/n)+1;return l=Math.max(1,Math.min(8,l)),l}getDeflectionAngle(e){return r.DEFLECTION_ANGLES[e-1]*(Math.PI/180)}}class y{static init(){this.ctx||(this.ctx=new(window.AudioContext||window.webkitAudioContext))}static play(e){this.init(),this.nodes[e]&&this.nodes[e].stop();const t=this.ctx.createOscillator(),i=this.ctx.createGain();switch(e){case"paddle":t.type="sine",t.frequency.value=220,i.gain.value=.3;break;case"wall":t.type="square",t.frequency.value=440,i.gain.value=.2;break;case"score":t.type="sawtooth",t.frequency.value=110,i.gain.value=.4;break}t.connect(i),i.connect(this.ctx.destination);const n=e==="score"?.5:.05;t.start(),t.stop(this.ctx.currentTime+n),this.nodes[e]=t}}o(y,"ctx"),o(y,"nodes",{});class U{constructor(){o(this,"canvas");o(this,"ctx");o(this,"virtualCanvas",new G);o(this,"ball",new F);o(this,"leftPaddle",new C(!0));o(this,"rightPaddle",new C(!1));o(this,"animationFrameId",0);o(this,"scorePlayer1",0);o(this,"scorePlayer2",0);o(this,"keysPressed",{});o(this,"showCollisionZones",!1)}init(){this.canvas=document.getElementById("game-canvas"),this.ctx=this.canvas.getContext("2d"),this.resizeCanvas(),y.init(),window.addEventListener("resize",()=>this.resizeCanvas()),this.startLoop()}resizeCanvas(){const e=this.canvas.parentElement,t=window.getComputedStyle(e),i=e.clientWidth-(parseFloat(t.paddingLeft)+parseFloat(t.paddingRight)),n=e.clientHeight-(parseFloat(t.paddingTop)+parseFloat(t.paddingBottom));this.virtualCanvas.update(i,n),this.canvas.width=i,this.canvas.height=n,this.canvas.style.width=`${i}px`,this.canvas.style.height=`${n}px`}startLoop(){const e=()=>{this.update(),this.draw(),this.animationFrameId=requestAnimationFrame(e)};e()}update(){this.ball.move(),this.ball.checkWallCollision()&&y.play("wall"),this.checkPaddleCollision(this.leftPaddle),this.checkPaddleCollision(this.rightPaddle),this.checkGoal(),this.keysPressed.w&&this.leftPaddle.move(-1),this.keysPressed.s&&this.leftPaddle.move(1),this.keysPressed.ArrowUp&&this.rightPaddle.move(-1),this.keysPressed.ArrowDown&&this.rightPaddle.move(1)}checkPaddleCollision(e){const t=e.checkBallCollision(this.ball.x,this.ball.y,this.ball.radius);if(t>0){const i=e.getDeflectionAngle(t);y.play("paddle"),this.ball.handlePaddleCollision(i,e===this.rightPaddle),this.showCollisionZones=!0,setTimeout(()=>this.showCollisionZones=!1,100)}}checkGoal(){this.ball.x-this.ball.radius<=0?(this.scorePlayer2++,this.resetRound()):this.ball.x+this.ball.radius>=r.BASE_WIDTH&&(this.scorePlayer1++,this.resetRound()),(this.scorePlayer1>=21||this.scorePlayer2>=21)&&(this.scorePlayer1=0,this.scorePlayer2=0)}resetRound(){y.play("score"),this.ball.reset()}draw(){this.drawBackground(),this.drawCenterLine(),this.drawPaddle(this.leftPaddle),this.drawPaddle(this.rightPaddle),this.drawBall(),this.drawScore()}drawBackground(){this.ctx.fillStyle="black",this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height)}drawCenterLine(){this.ctx.strokeStyle="rgba(255, 255, 255, 0.5)",this.ctx.lineWidth=this.virtualCanvas.toPhysicalSize(4),this.ctx.setLineDash([this.virtualCanvas.toPhysicalSize(20),this.virtualCanvas.toPhysicalSize(15)]),this.ctx.beginPath(),this.ctx.moveTo(this.canvas.width/2,0),this.ctx.lineTo(this.canvas.width/2,this.canvas.height),this.ctx.stroke(),this.ctx.setLineDash([])}drawPaddle(e){if(this.ctx.fillStyle="white",this.ctx.fillRect(this.virtualCanvas.toPhysicalX(e.x),this.virtualCanvas.toPhysicalY(e.y),this.virtualCanvas.toPhysicalSize(e.width),this.virtualCanvas.toPhysicalSize(e.height)),this.showCollisionZones){const t=e.height/8;for(let i=0;i<8;i++)this.ctx.fillStyle=`rgba(255, 0, 0, ${.2+i*.1})`,this.ctx.fillRect(this.virtualCanvas.toPhysicalX(e.x),this.virtualCanvas.toPhysicalY(e.y+i*t),this.virtualCanvas.toPhysicalSize(e.width),this.virtualCanvas.toPhysicalSize(t))}}drawBall(){this.ctx.fillStyle="white",this.ctx.beginPath(),this.ctx.arc(this.virtualCanvas.toPhysicalX(this.ball.x),this.virtualCanvas.toPhysicalY(this.ball.y),this.virtualCanvas.toPhysicalSize(this.ball.radius),0,Math.PI*2),this.ctx.fill()}drawScore(){const e=this.virtualCanvas.toPhysicalSize(48);this.ctx.font=`${e}px 'DSEG7ClassicMini', monospace`,this.ctx.textAlign="center",this.ctx.fillStyle="white",this.ctx.fillText(this.scorePlayer1.toString().padStart(2,"0"),this.virtualCanvas.toPhysicalX(r.BASE_WIDTH/4),this.virtualCanvas.toPhysicalY(60)),this.ctx.fillText(this.scorePlayer2.toString().padStart(2,"0"),this.virtualCanvas.toPhysicalX(r.BASE_WIDTH*3/4),this.virtualCanvas.toPhysicalY(60))}setKey(e,t){this.keysPressed[e]=t}setBallSpeed(e){this.ball.speed=e}stop(){cancelAnimationFrame(this.animationFrameId)}render(){return`
    <div class="flex items-center justify-center bg-[#fbd11b] p-2 w-full">
      <div class="aspect-[4/3] w-full max-w-[1024px] min-w-[600px] bg-black border-4 border-white">
        <canvas 
          id="game-canvas" 
          class="w-full h-full"
        ></canvas>
      </div>
    </div>
    `}}const p=new U,w={renderGameCanvas:()=>p.render(),initGameCanvas:()=>p.init(),stop:()=>p.stop(),setBallSpeed:s=>p.setBallSpeed(s),handleKeyDown:s=>p.setKey(s,!0),handleKeyUp:s=>p.setKey(s,!1)},B={renderGameSettings(){return`
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
    `},initSettings(){const s=document.getElementById("ball-speed");s&&s.addEventListener("input",()=>{const e=parseFloat(s.value);w.setBallSpeed(e)})}},O={init(){window.addEventListener("keydown",s=>{["ArrowUp","ArrowDown","w","s"].includes(s.key)&&s.preventDefault(),w.handleKeyDown(s.key)}),window.addEventListener("keyup",s=>{["ArrowUp","ArrowDown","w","s"].includes(s.key)&&s.preventDefault(),w.handleKeyUp(s.key)})}};class W{constructor(){o(this,"isLoginView",!0)}init(){this.render(),this.bindAuthEvents()}render(){const e=document.getElementById("auth-container");if(e){const t=g.getCurrentUser();e.innerHTML=t?v.renderProfile(t.email):v.renderAuthForm(this.isLoginView)}}bindAuthEvents(){document.addEventListener("click",e=>{const t=e.target;t.closest("#loginBtn")?(this.isLoginView=!0,this.render()):t.closest("#register-btn")?(this.isLoginView=!1,this.render()):t.closest("#logout-btn")?(g.logout(),this.isLoginView=!0,this.render()):t.closest("#toggle-auth")&&(this.isLoginView=!this.isLoginView,this.render())}),document.addEventListener("submit",async e=>{e.target.id==="auth-form"&&(e.preventDefault(),await this.handleAuthFormSubmit())})}async handleAuthFormSubmit(){const e=document.getElementById("email"),t=document.getElementById("password"),i=document.getElementById("auth-error");if(!e||!t||!i)return;const n=e.value,a=t.value;try{this.isLoginView?await g.login(n,a):await g.register(n,a),this.render()}catch(l){i.textContent=l.message}}}const j=new W;function T(s){fetch("/api/private/info",{method:"GET",credentials:"include"}).then(e=>{if(!e.ok)throw new Error("Unauthorized");return e.json()}).then(e=>{console.log("In isConnected(): userId:",e.userId),console.log("In isConnected(): login:",e.login),console.log("In isConnected(): alias:",e.alias),console.log("connecté in data");const t=document.getElementById("login-icon"),i=document.getElementById("logged-icon");console.log("User info:",e),t==null||t.classList.add("hidden"),i==null||i.classList.remove("hidden")}).catch(()=>{console.log("Pas connecté, in catch");const e=document.getElementById("login-icon"),t=document.getElementById("logged-icon");t==null||t.classList.add("hidden"),e==null||e.classList.remove("hidden")}),console.log("in isConnected(), user: ",s)}function H(){document.getElementById("loginBtn").addEventListener("click",()=>{const e=document.getElementById("login").value,t=document.getElementById("password").value;fetch("/api/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({login:e,password:t}),credentials:"include"}).then(i=>i.json()).then(i=>{localStorage.setItem("login",e);const n=localStorage.getItem("login");n&&i.success==!0?(document.getElementById("title").textContent=`Hi ${n}`,document.getElementById("welcome-div").style.display="block",document.getElementById("welcome-div").textContent=`Welcome ${n}, you are now connected :)`,document.getElementById("login").style.display="none",document.getElementById("password").style.display="none",document.getElementById("loginBtn").style.display="none",document.getElementById("registerBtn").style.display="none",document.getElementById("logoutBtn").style.display="block"):(document.getElementById("title").textContent="Hi",document.getElementById("welcome-div").style.display="block",document.getElementById("welcome-div").textContent="Sorry. Your credentials doesn't match.")}),console.log("login: ",e,"Password:",t),fetch("/api/auth/debug-token",{credentials:"include"}).then(i=>i.json()).then(i=>console.log("Token received via cookie:",i.token)),fetch("/api/auth/info",{method:"GET",credentials:"include"}).then(i=>{if(!i.ok)throw new Error("Unauthorized");return i.json()}).then(i=>{console.log("In isConnected(): userId:",i.userId),console.log("In isConnected(): login:",i.login),console.log("In isConnected(): alias:",i.alias)}),fetch("/api/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:"alice",password:"1234"})})})}async function I(s){const e=document.getElementById("registerBtn");e==null||e.addEventListener("click",()=>{var n,a;if(document.getElementById("connexionBlock").style.display="none",document.getElementById("register-container"))return;const i=document.createElement("div");i.id="register-container",i.innerHTML=`
		<div id="registrationBlock" class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
			<h1 id="title" class="text-3xl font-bold mb-6 text-blue-600">Hi</h1>
			<input id="new-username" placeholder="Username" class="mb-4 px-4 py-2 border rounded w-64"/><br/>
			<input id="new-password" placeholder="Password" type="password" class="mb-4 px-4 py-2 border rounded w-64"/><br/>
			<input id="new-alias" placeholder="Alias" class="mb-4 px-4 py-2 border rounded w-64"/><br/>
			<button id="create-account" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Create Account</button>
			<button id="backToLogin" class="cursor-pointer text-blue-500 underline">Click here to be back to log in</button>
		</div>
	`,document.body.appendChild(i),(n=document.getElementById("backToLogin"))==null||n.addEventListener("click",()=>{var l;(l=document.getElementById("register-container"))==null||l.remove(),document.getElementById("connexionBlock").style.display="flex"}),(a=document.getElementById("create-account"))==null||a.addEventListener("click",async()=>{const l=document.getElementById("new-username").value,d=document.getElementById("new-password").value,c=document.getElementById("new-alias").value,b=await(await fetch("/api/auth/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({login:l,password:d,alias:c}),credentials:"include"})).json(),S={login:b.data.user.login,password:b.data.password,alias:c,token:b.data.token},x=document.getElementById("registrationBlock");let h=document.getElementById("registration-created");h||(h=document.createElement("p"),h.id="registration-created",x==null||x.appendChild(h)),b.status===200?(h.textContent="Wonderful. You have created your account. You can connect to your account now.",s(S)):b.status===500?h.textContent="DB Error":h.textContent="An account with this login has already been created.",console.log(S)})})}function D(){fetch("/api/auth/info",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({}),credentials:"include"}).then(s=>s.json()).then(s=>{console.log("You are in info page & data:",s)})}async function z(){try{const s=await fetch("/api/auth/info",{method:"GET",credentials:"include"});if(!s.ok)throw new Error("Not authenticated");const e=await s.json();return console.log("User info received:",e),!0}catch(s){return console.warn("User not authenticated:",s),!1}}class P{static render(){return`
	<div id="connexionBlock" class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
		<h1 id="title" class="text-3xl font-bold mb-6 text-blue-600">Hi</h1>
		<input id="login" type="text" placeholder="Login" class="mb-2 px-4 py-2 border rounded w-64" />
		<input id="password" type="password" placeholder="Password" class="mb-4 px-4 py-2 border rounded w-64"/>
		<div class="mb-4 px-4 py-2 rounded w-64 flex justify-between">
			<button id="loginBtn" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Log in</button>
			<button id="registerBtn" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Register</button>
		</div>
	<p id="welcome-div" style="display: none;"></p><br>
	<button id="logoutBtn" style="display: none;" class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">Logout</button>
	</div>`}static init(){H(),I(e=>{T(e)})}}const A={currentUser:null,isLogin:!0,render(){return`
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
        ${w.renderGameCanvas()}
      </main>

      <!-- Control Panel -->
      <footer class="bg-[#fbd11b] p-4">
        ${B.renderGameSettings()}
      </footer>

    </div>
    `},renderAuth(){const s=g.getCurrentUser();return s?v.renderProfile(s.email):v.renderAuthForm(this.isLogin)},init(){w.initGameCanvas(),O.init(),j.init(),B.initSettings(),g.onAuthStateChanged(()=>{document.getElementById("auth-container").innerHTML=this.renderAuth()}),console.log("HOLAAAA"),P.init(),I(s=>{T(s)})}};class N{constructor(){o(this,"currentUser",null);this.initializeUser()}initializeUser(){const e=localStorage.getItem("token"),t=localStorage.getItem("userEmail");e&&t?this.currentUser={email:t,token:e}:f.navigate("home")}render(){var e;return`
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
    `}initEventListeners(){const e=document.getElementById("logout-btn");e&&e.addEventListener("click",this.handleLogout.bind(this))}handleLogout(){localStorage.removeItem("authToken"),localStorage.removeItem("userEmail"),this.currentUser=null,f.navigate("home")}initialize(){const e=document.getElementById("app");e?(e.innerHTML=this.render(),this.initEventListeners()):console.error("App container not found")}}class k{static render(){return`
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
	</div>`}static init(){z();const e=localStorage.getItem("login")||"",t=localStorage.getItem("alias")||"";console.log("current login in localStorage:",e),console.log("current alias in localStorage:",t);const i=document.getElementById("current-login"),n=document.getElementById("current-alias"),a=document.getElementById("new-login"),l=document.getElementById("new-alias");i&&(i.innerText=`Current login: ${e} - Change it to:`),n&&(n.innerText=`Current alias: ${t} - Change it to:`),a&&(a.value=e),l&&(l.value=t),D()}}class f{static navigate(e){if(!this.app){console.error("App container not found");return}if(this.app.innerHTML="",e==="dashboard"&&!this.isAuthenticated())return console.warn("Redirecting to home: not authenticated"),this.navigate("home");switch(e){case"home":if(this.isAuthenticated())return this.navigate("dashboard");this.app.innerHTML=A.render(),A.init();break;case"dashboard":new N().initialize();break;case"login":this.app.innerHTML=P.render(),P.init();break;case"info":this.app.innerHTML=k.render(),k.init();break}history.pushState({},"",e==="home"?"/":`/${e}`)}static isAuthenticated(){return localStorage.getItem("authToken")!==null}static init(){window.addEventListener("load",()=>{const e=window.location.pathname;this.navigate(e.includes("dashboard")?"dashboard":e.includes("login")?"login":e.includes("info")?"info":"home")}),window.addEventListener("popstate",()=>{const e=window.location.pathname;this.navigate(e.includes("dashboard")?"dashboard":e.includes("login")?"login":e.includes("info")?"info":"home")})}}o(f,"app",document.getElementById("app"));f.init();window.addEventListener("load",()=>{const s=window.location.pathname;f.navigate(s.includes("dashboard")?"dashboard":s.includes("login")?"login":s.includes("info")?"info":"home"),H(),I(e=>{console.log("in app.ts, user",e)}),D()});window.addEventListener("popstate",()=>{const s=window.location.pathname;f.navigate(s.includes("dashboard")?"dashboard":s.includes("login")?"login":s.includes("info")?"info":"home")});
