var S=Object.defineProperty;var L=(s,t,e)=>t in s?S(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e;var a=(s,t,e)=>L(s,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const h of o.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&i(h)}).observe(document,{childList:!0,subtree:!0});function e(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(r){if(r.ep)return;r.ep=!0;const o=e(r);fetch(r.href,o)}})();const b="https://localhost:4443/api/auth",u=class u{constructor(){a(this,"listeners",[])}static getInstance(){return u.instance||(u.instance=new u),u.instance}getCurrentUser(){const t=localStorage.getItem("user");return t?JSON.parse(t):null}async login(t,e,i){var r,o,h;try{const c=await fetch(`${b}/login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:t,password:e})}),l=await c.json();if(!c.ok||l.status!=="success")throw new Error(l.error||l.message||"Login failed");if(!((o=(r=l.data)==null?void 0:r.user)!=null&&o.email)||!((h=l.data)!=null&&h.token))throw new Error("Invalid server response format");const y={email:l.data.user.email,token:l.data.token,alias:i||l.data.user.alias||l.data.user.email.split("@")[0]};return this.saveUser(y),y}catch(c){throw console.error("Login error:",c),new Error(c instanceof Error?c.message:"An unknown error occurred")}}async register(t,e,i){var r,o,h;try{const c=await fetch(`${b}/register`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:t,password:e,...i&&{alias:i}})}),l=await c.json();if(!c.ok||l.status!=="success")throw new Error(l.error||l.message||"Registration failed");if(!((o=(r=l.data)==null?void 0:r.user)!=null&&o.email)||!((h=l.data)!=null&&h.token))throw new Error("Invalid server response format");const y={email:l.data.user.email,token:l.data.token,alias:i||l.data.user.alias||l.data.user.email.split("@")[0]};return this.saveUser(y),y}catch(c){throw console.error("Registration error:",c),new Error(c instanceof Error?c.message:"Registration failed")}}logout(){localStorage.removeItem("user"),this.notifyListeners()}updateAlias(t){const e=this.getCurrentUser();e&&(e.alias=t,this.saveUser(e))}onAuthStateChanged(t){this.listeners.push(t)}saveUser(t){localStorage.setItem("user",JSON.stringify(t)),this.notifyListeners()}notifyListeners(){this.listeners.forEach(t=>t())}};a(u,"instance");let w=u;const d=w.getInstance(),v={render(){const s=d.getCurrentUser();return s?this.renderProfile(s.email):this.renderAuthSelector()},renderAuthSelector(){return`
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
    `}},n={BASE_WIDTH:1024,BASE_HEIGHT:768,BALL_SPEED:4,MAX_BALL_SPEED:16,PADDLE_WIDTH:8,PADDLE_HEIGHT:40,PADDLE_SPEED:5,PADDLE_OFFSET:30,DEFLECTION_ANGLES:[-45,-30,-15,0,0,15,30,45]};class A{constructor(){a(this,"physicalWidth",0);a(this,"physicalHeight",0);a(this,"scaleFactor",1);a(this,"baseWidth",n.BASE_WIDTH);a(this,"baseHeight",n.BASE_HEIGHT)}update(t,e){this.physicalWidth=t,this.physicalHeight=e;const i=t/this.baseWidth,r=e/this.baseHeight;this.scaleFactor=Math.min(i,r)}toPhysicalX(t){return t*this.scaleFactor}toPhysicalY(t){return t*this.scaleFactor}toPhysicalSize(t){return t*this.scaleFactor}get currentVirtualWidth(){return this.baseWidth}get currentVirtualHeight(){return this.baseHeight}getPhysicalDimensions(){return{width:this.physicalWidth,height:this.physicalHeight}}}class C{constructor(){a(this,"x");a(this,"y");a(this,"radius");a(this,"dx");a(this,"dy");a(this,"speed");a(this,"color");this.x=n.BASE_WIDTH/2,this.y=n.BASE_HEIGHT/2,this.radius=10,this.speed=n.BALL_SPEED,this.dx=2*(Math.random()>.5?1:-1),this.dy=2*(Math.random()>.5?1:-1),this.color="white"}reset(){this.x=n.BASE_WIDTH/2,this.y=n.BASE_HEIGHT/2,this.radius=10,this.speed=n.BALL_SPEED,this.dx=2*(Math.random()>.5?1:-1),this.dy=2*(Math.random()>.5?1:-1),this.color="white"}move(){this.x+=this.dx,this.y+=this.dy}checkWallCollision(){const t=this.x-this.radius<=0,e=this.x+this.radius>=n.BASE_WIDTH,i=this.y-this.radius<=0,r=this.y+this.radius>=n.BASE_HEIGHT;return t||e?(this.dx=-this.dx,!0):i||r?(this.dy=-this.dy,!0):!1}handlePaddleCollision(t,e){this.dx=Math.cos(t)*this.speed*(e?-1:1),this.dy=Math.sin(t)*this.speed,this.speed=Math.min(this.speed*1.05,n.MAX_BALL_SPEED)}}class x{constructor(t){a(this,"x");a(this,"y");a(this,"width");a(this,"height");a(this,"speed");a(this,"targetY");this.width=n.PADDLE_WIDTH,this.height=n.PADDLE_HEIGHT,this.speed=n.PADDLE_SPEED,this.targetY=n.BASE_HEIGHT/2-this.height/2,this.x=t?n.PADDLE_OFFSET:n.BASE_WIDTH-n.PADDLE_OFFSET-this.width,this.y=this.targetY}move(t){const e=t*this.speed;this.targetY=Math.max(0,Math.min(n.BASE_HEIGHT-this.height,this.targetY+e)),this.y=this.targetY}update(t){const e=this.targetY-this.y,i=this.speed*t;this.y+=Math.sign(e)*Math.min(i,Math.abs(e))}reset(){this.y=n.BASE_HEIGHT/2-this.height/2,this.targetY=this.y}checkBallCollision(t,e,i){if(t+i<this.x||t-i>this.x+this.width||e+i<this.y||e-i>this.y+this.height)return 0;const r=this.height/8,o=e-this.y;let h=Math.floor(o/r)+1;return h=Math.max(1,Math.min(8,h)),h}getDeflectionAngle(t){return n.DEFLECTION_ANGLES[t-1]*(Math.PI/180)}}class p{static init(){this.ctx||(this.ctx=new(window.AudioContext||window.webkitAudioContext))}static play(t){this.init(),this.nodes[t]&&this.nodes[t].stop();const e=this.ctx.createOscillator(),i=this.ctx.createGain();switch(t){case"paddle":e.type="sine",e.frequency.value=220,i.gain.value=.3;break;case"wall":e.type="square",e.frequency.value=440,i.gain.value=.2;break;case"score":e.type="sawtooth",e.frequency.value=110,i.gain.value=.4;break}e.connect(i),i.connect(this.ctx.destination);const r=t==="score"?.5:.05;e.start(),e.stop(this.ctx.currentTime+r),this.nodes[t]=e}}a(p,"ctx"),a(p,"nodes",{});class I{constructor(){a(this,"canvas");a(this,"ctx");a(this,"virtualCanvas",new A);a(this,"ball",new C);a(this,"leftPaddle",new x(!0));a(this,"rightPaddle",new x(!1));a(this,"animationFrameId",0);a(this,"scorePlayer1",0);a(this,"scorePlayer2",0);a(this,"keysPressed",{});a(this,"showCollisionZones",!1);a(this,"hitsCount",0)}init(){this.canvas=document.getElementById("game-canvas"),this.ctx=this.canvas.getContext("2d"),this.resizeCanvas(),p.init(),window.addEventListener("resize",()=>this.resizeCanvas()),this.startLoop()}resizeCanvas(){const t=this.canvas.parentElement,e=window.getComputedStyle(t),i=t.clientWidth-(parseFloat(e.paddingLeft)+parseFloat(e.paddingRight)),r=t.clientHeight-(parseFloat(e.paddingTop)+parseFloat(e.paddingBottom));this.virtualCanvas.update(i,r),this.canvas.width=i,this.canvas.height=r,this.canvas.style.width=`${i}px`,this.canvas.style.height=`${r}px`}startLoop(){const t=()=>{this.update(),this.draw(),this.animationFrameId=requestAnimationFrame(t)};t()}update(){this.ball.move(),this.ball.checkWallCollision()&&p.play("wall"),this.checkPaddleCollision(this.leftPaddle),this.checkPaddleCollision(this.rightPaddle),this.checkGoal(),this.keysPressed.w&&this.leftPaddle.move(-1),this.keysPressed.s&&this.leftPaddle.move(1),this.keysPressed.ArrowUp&&this.rightPaddle.move(-1),this.keysPressed.ArrowDown&&this.rightPaddle.move(1)}checkPaddleCollision(t){const e=t.checkBallCollision(this.ball.x,this.ball.y,this.ball.radius);if(e>0){const i=t.getDeflectionAngle(e);p.play("paddle"),this.ball.handlePaddleCollision(i,t===this.rightPaddle),this.showCollisionZones=!0,setTimeout(()=>this.showCollisionZones=!1,100),this.hitsCount++}}checkGoal(){this.ball.x-this.ball.radius<=0?(this.scorePlayer2++,this.resetRound()):this.ball.x+this.ball.radius>=n.BASE_WIDTH&&(this.scorePlayer1++,this.resetRound()),(this.scorePlayer1>=11||this.scorePlayer2>=11)&&(this.scorePlayer1=0,this.scorePlayer2=0,this.hitsCount=0)}resetRound(){p.play("score"),this.ball.reset()}draw(){this.drawBackground(),this.drawCenterLine(),this.drawPaddle(this.leftPaddle),this.drawPaddle(this.rightPaddle),this.drawBall(),this.drawScore()}drawBackground(){this.ctx.fillStyle="black",this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height)}drawCenterLine(){this.ctx.strokeStyle="rgba(255, 255, 255, 0.5)",this.ctx.lineWidth=this.virtualCanvas.toPhysicalSize(4),this.ctx.setLineDash([this.virtualCanvas.toPhysicalSize(20),this.virtualCanvas.toPhysicalSize(15)]),this.ctx.beginPath(),this.ctx.moveTo(this.canvas.width/2,0),this.ctx.lineTo(this.canvas.width/2,this.canvas.height),this.ctx.stroke(),this.ctx.setLineDash([])}drawPaddle(t){if(this.ctx.fillStyle="white",this.ctx.fillRect(this.virtualCanvas.toPhysicalX(t.x),this.virtualCanvas.toPhysicalY(t.y),this.virtualCanvas.toPhysicalSize(t.width),this.virtualCanvas.toPhysicalSize(t.height)),this.showCollisionZones){const e=t.height/8;for(let i=0;i<8;i++)this.ctx.fillStyle=`rgba(255, 0, 0, ${.2+i*.1})`,this.ctx.fillRect(this.virtualCanvas.toPhysicalX(t.x),this.virtualCanvas.toPhysicalY(t.y+i*e),this.virtualCanvas.toPhysicalSize(t.width),this.virtualCanvas.toPhysicalSize(e))}}drawBall(){this.ctx.fillStyle="white",this.ctx.beginPath(),this.ctx.arc(this.virtualCanvas.toPhysicalX(this.ball.x),this.virtualCanvas.toPhysicalY(this.ball.y),this.virtualCanvas.toPhysicalSize(this.ball.radius),0,Math.PI*2),this.ctx.fill()}drawScore(){const t=this.virtualCanvas.toPhysicalSize(48);this.ctx.font=`${t}px 'DSEG7ClassicMini', monospace`,this.ctx.textAlign="center",this.ctx.fillStyle="white",this.ctx.fillText(this.scorePlayer1.toString().padStart(2," "),this.virtualCanvas.toPhysicalX(n.BASE_WIDTH/4),this.virtualCanvas.toPhysicalY(60)),this.ctx.fillText(this.scorePlayer2.toString().padStart(2," "),this.virtualCanvas.toPhysicalX(n.BASE_WIDTH*3/4),this.virtualCanvas.toPhysicalY(60))}setKey(t,e){this.keysPressed[t]=e}setBallSpeed(t){this.ball.speed=t}stop(){cancelAnimationFrame(this.animationFrameId)}render(){return`
      <div class="flex items-center justify-center w-full bg-[#fbd11b] p-4">
        <div class="relative aspect-[4/3] w-full max-w-[1024px] min-w-[600px] flex items-center justify-center">
  
          <!-- Bezel Layer -->
          <div class="absolute inset-0 rounded-[48px] bg-black/80 shadow-[inset_0_0_40px_#000000cc] z-0"
               style="clip-path: polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%);">
          </div>
 
          <!-- CRT Screen Layer -->
          <div class="relative z-10 w-[90%] aspect-[4/3] rounded-[24px] bg-[#111] shadow-[inset_0_0_30px_#444] flex justify-center items-center">
    		<canvas 
      			id="game-canvas"
      			class="w-full h-full block rounded-[20px]"
    		></canvas>
	 </div> 
      </div>
    `}}const g=new I,f={renderGameCanvas:()=>g.render(),initGameCanvas:()=>g.init(),stop:()=>g.stop(),setBallSpeed:s=>g.setBallSpeed(s),handleKeyDown:s=>g.setKey(s,!0),handleKeyUp:s=>g.setKey(s,!1)},E={renderGameSettings(){return`
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
    `},initSettings(){const s=document.getElementById("ball-speed");s&&s.addEventListener("input",()=>{const t=parseFloat(s.value);f.setBallSpeed(t)})}},D={init(){window.addEventListener("keydown",s=>{["ArrowUp","ArrowDown","w","s"].includes(s.key)&&s.preventDefault(),f.handleKeyDown(s.key)}),window.addEventListener("keyup",s=>{["ArrowUp","ArrowDown","w","s"].includes(s.key)&&s.preventDefault(),f.handleKeyUp(s.key)})}};class k{constructor(){a(this,"isLoginView",!0)}init(){this.render(),this.bindAuthEvents()}render(){const t=document.getElementById("auth-container");if(t){const e=d.getCurrentUser();t.innerHTML=e?v.renderProfile(e.email):v.renderAuthForm(this.isLoginView)}}bindAuthEvents(){document.addEventListener("click",t=>{const e=t.target;e.closest("#login-btn")?(this.isLoginView=!0,this.render()):e.closest("#register-btn")?(this.isLoginView=!1,this.render()):e.closest("#logout-btn")?(d.logout(),this.isLoginView=!0,this.render()):e.closest("#toggle-auth")&&(this.isLoginView=!this.isLoginView,this.render())}),document.addEventListener("submit",async t=>{t.target.id==="auth-form"&&(t.preventDefault(),await this.handleAuthFormSubmit())})}async handleAuthFormSubmit(){const t=document.getElementById("email"),e=document.getElementById("password"),i=document.getElementById("auth-error");if(!t||!e||!i)return;const r=t.value,o=e.value;try{this.isLoginView?await d.login(r,o):await d.register(r,o),this.render()}catch(h){i.textContent=h.message}}}const B=new k,P={currentUser:null,isLogin:!0,render(){return`
    <div class="flex flex-col min-h-screen bg-[#fbd11b] text-black">

      <!-- Header with Pong Logo -->
      <header class="flex justify-center items-center h-24 bg-[#fbd11b]">
        <img src="/pong-logo.png" alt="PONG Logo" class="h-16">
      </header>

      <!-- Game Canvas Area -->
	<main class="flex-1 flex items-center justify-center bg-[#fbd11b] overflow-y-auto min-h-[450px]">
        ${f.renderGameCanvas()}
      </main>

      <!-- Control Panel -->
      <footer class="bg-[#fbd11b] p-4">
        ${E.renderGameSettings()}
      </footer>

    </div>
    `},renderAuth(){const s=d.getCurrentUser();return s?v.renderProfile(s.email):v.renderAuthForm(this.isLogin)},init(){this.currentUser=d.getCurrentUser(),f.initGameCanvas(),D.init(),B.init(),E.initSettings(),d.onAuthStateChanged(()=>{this.currentUser=d.getCurrentUser(),document.getElementById("auth-container").innerHTML=this.renderAuth()})}};class H{constructor(){a(this,"currentUser",null);this.initializeUser()}initializeUser(){const t=localStorage.getItem("authToken"),e=localStorage.getItem("userEmail");t&&e?this.currentUser={email:e,token:t}:m.navigate("home")}render(){var t;return`
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
    `}initEventListeners(){const t=document.getElementById("logout-btn");t&&t.addEventListener("click",this.handleLogout.bind(this))}handleLogout(){localStorage.removeItem("authToken"),localStorage.removeItem("userEmail"),this.currentUser=null,m.navigate("home")}initialize(){const t=document.getElementById("app");t?(t.innerHTML=this.render(),this.initEventListeners()):console.error("App container not found")}}class m{static navigate(t){if(!this.app){console.error("App container not found");return}if(this.app.innerHTML="",t==="dashboard"&&!this.isAuthenticated())return console.warn("Redirecting to home: not authenticated"),this.navigate("home");switch(t){case"home":if(this.isAuthenticated())return this.navigate("dashboard");this.app.innerHTML=P.render(),P.init();break;case"dashboard":new H().initialize();break}history.pushState({},"",t==="home"?"/":`/${t}`)}static isAuthenticated(){return localStorage.getItem("authToken")!==null}static init(){window.addEventListener("load",()=>{const t=window.location.pathname;this.navigate(t.includes("dashboard")?"dashboard":"home")}),window.addEventListener("popstate",()=>{const t=window.location.pathname;this.navigate(t.includes("dashboard")?"dashboard":"home")})}}a(m,"app",document.getElementById("app"));m.init();window.addEventListener("load",()=>{const s=window.location.pathname;m.navigate(s.includes("dashboard")?"dashboard":"home")});window.addEventListener("popstate",()=>{const s=window.location.pathname;m.navigate(s.includes("dashboard")?"dashboard":"home")});
