var L=Object.defineProperty;var A=(s,e,t)=>e in s?L(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var n=(s,e,t)=>A(s,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const d of r.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&a(d)}).observe(document,{childList:!0,subtree:!0});function t(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(i){if(i.ep)return;i.ep=!0;const r=t(i);fetch(i.href,r)}})();const x="https://localhost:4443/api/auth",f=class f{constructor(){n(this,"listeners",[])}static getInstance(){return f.instance||(f.instance=new f),f.instance}getCurrentUser(){const e=localStorage.getItem("user");return e?JSON.parse(e):null}async login(e,t,a){var i,r,d;try{const l=await fetch(`${x}/login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:e,password:t})}),c=await l.json();if(!l.ok||c.status!=="success")throw new Error(c.error||c.message||"Login failed");if(!((r=(i=c.data)==null?void 0:i.user)!=null&&r.email)||!((d=c.data)!=null&&d.token))throw new Error("Invalid server response format");const v={email:c.data.user.email,token:c.data.token,alias:a||c.data.user.alias||c.data.user.email.split("@")[0]};return this.saveUser(v),v}catch(l){throw console.error("Login error:",l),new Error(l instanceof Error?l.message:"An unknown error occurred")}}async register(e,t,a){var i,r,d;try{const l=await fetch(`${x}/register`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:e,password:t,...a&&{alias:a}})}),c=await l.json();if(!l.ok||c.status!=="success")throw new Error(c.error||c.message||"Registration failed");if(!((r=(i=c.data)==null?void 0:i.user)!=null&&r.email)||!((d=c.data)!=null&&d.token))throw new Error("Invalid server response format");const v={email:c.data.user.email,token:c.data.token,alias:a||c.data.user.alias||c.data.user.email.split("@")[0]};return this.saveUser(v),v}catch(l){throw console.error("Registration error:",l),new Error(l instanceof Error?l.message:"Registration failed")}}logout(){localStorage.removeItem("user"),this.notifyListeners()}updateAlias(e){const t=this.getCurrentUser();t&&(t.alias=e,this.saveUser(t))}onAuthStateChanged(e){this.listeners.push(e)}saveUser(e){localStorage.setItem("user",JSON.stringify(e)),this.notifyListeners()}notifyListeners(){this.listeners.forEach(e=>e())}};n(f,"instance");let w=f;const u=w.getInstance(),b={render(){const s=u.getCurrentUser();return s?this.renderProfile(s.email):this.renderAuthSelector()},renderAuthSelector(){return`
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
    `}},o={BASE_WIDTH:1024,BASE_HEIGHT:768,BALL_SPEED:8,MAX_BALL_SPEED:24,PADDLE_WIDTH:8,PADDLE_HEIGHT:40,PADDLE_SPEED:5,PADDLE_OFFSET:30,DEFLECTION_ANGLES:[-45,-30,-15,0,0,15,30,45]};class C{constructor(){n(this,"physicalWidth",0);n(this,"physicalHeight",0);n(this,"scaleFactor",1);n(this,"baseWidth",o.BASE_WIDTH);n(this,"baseHeight",o.BASE_HEIGHT)}update(e,t){this.physicalWidth=e,this.physicalHeight=t;const a=e/this.baseWidth,i=t/this.baseHeight;this.scaleFactor=Math.min(a,i)}toPhysicalX(e){return e*this.scaleFactor}toPhysicalY(e){return e*this.scaleFactor}toPhysicalSize(e){return e*this.scaleFactor}get currentVirtualWidth(){return this.baseWidth}get currentVirtualHeight(){return this.baseHeight}getPhysicalDimensions(){return{width:this.physicalWidth,height:this.physicalHeight}}}class k{constructor(){n(this,"x");n(this,"y");n(this,"radius");n(this,"dx");n(this,"dy");n(this,"speed");n(this,"color");this.x=o.BASE_WIDTH/2,this.y=o.BASE_HEIGHT/2,this.radius=10,this.speed=o.BALL_SPEED,this.dx=2*(Math.random()>.5?1:-1),this.dy=2*(Math.random()>.5?1:-1),this.color="white"}reset(){this.x=o.BASE_WIDTH/2,this.y=o.BASE_HEIGHT/2,this.radius=10,this.speed=o.BALL_SPEED,this.dx=2*(Math.random()>.5?1:-1),this.dy=2*(Math.random()>.5?1:-1),this.color="white"}move(){this.x+=this.dx,this.y+=this.dy}checkWallCollision(){const e=this.x-this.radius<=0,t=this.x+this.radius>=o.BASE_WIDTH,a=this.y-this.radius<=0,i=this.y+this.radius>=o.BASE_HEIGHT;return e||t?(this.dx=-this.dx,!0):a||i?(this.dy=-this.dy,!0):!1}handlePaddleCollision(e,t){this.dx=Math.cos(e)*this.speed*(t?-1:1),this.dy=Math.sin(e)*this.speed,this.speed=Math.min(this.speed*1.05,o.MAX_BALL_SPEED)}}class P{constructor(e){n(this,"x");n(this,"y");n(this,"width");n(this,"height");n(this,"speed");n(this,"targetY");this.width=o.PADDLE_WIDTH,this.height=o.PADDLE_HEIGHT,this.speed=o.PADDLE_SPEED,this.targetY=o.BASE_HEIGHT/2-this.height/2,this.x=e?o.PADDLE_OFFSET:o.BASE_WIDTH-o.PADDLE_OFFSET-this.width,this.y=this.targetY}setPaddleHeight(e){this.height=e}move(e){const t=e*this.speed;this.targetY=Math.max(0,Math.min(o.BASE_HEIGHT-this.height,this.targetY+t)),this.y=this.targetY}update(e){const t=this.targetY-this.y,a=this.speed*e;this.y+=Math.sign(t)*Math.min(a,Math.abs(t))}reset(){this.y=o.BASE_HEIGHT/2-this.height/2,this.targetY=this.y}checkBallCollision(e,t,a){if(e+a<this.x||e-a>this.x+this.width||t+a<this.y||t-a>this.y+this.height)return 0;const i=this.height/8,r=t-this.y;let d=Math.floor(r/i)+1;return d=Math.max(1,Math.min(8,d)),d}getDeflectionAngle(e){return o.DEFLECTION_ANGLES[e-1]*(Math.PI/180)}}class h{static init(){this.isInitialized||document.addEventListener("click",()=>{this.ctx||(this.ctx=new(window.AudioContext||window.webkitAudioContext),this.isInitialized=!0)},{once:!0})}static setEnabled(e){var t;this.isEnabled=e,e&&((t=this.ctx)==null?void 0:t.state)==="suspended"&&this.ctx.resume()}static async play(e){if(!this.isEnabled||!this.ctx&&(await this.init(),!this.ctx))return;this.ctx.state==="suspended"&&await this.ctx.resume(),this.nodes[e]&&this.nodes[e].stop();const t=this.ctx.createOscillator(),a=this.ctx.createGain();switch(e){case"paddle":t.type="sine",t.frequency.value=220,a.gain.value=.3;break;case"wall":t.type="square",t.frequency.value=440,a.gain.value=.2;break;case"score":t.type="sawtooth",t.frequency.value=110,a.gain.value=.4;break}t.connect(a),a.connect(this.ctx.destination);const i=e==="score"?.5:.05;t.start(),t.stop(this.ctx.currentTime+i),this.nodes[e]=t}}n(h,"ctx",null),n(h,"nodes",{}),n(h,"isEnabled",!1),n(h,"isInitialized",!1);h.init();class I{constructor(){n(this,"canvas");n(this,"ctx");n(this,"virtualCanvas",new C);n(this,"ball",new k);n(this,"leftPaddle",new P(!0));n(this,"rightPaddle",new P(!1));n(this,"animationFrameId",0);n(this,"scorePlayer1",0);n(this,"scorePlayer2",0);n(this,"keysPressed",{});n(this,"showCollisionZones",!1);n(this,"maxPoints",11);n(this,"hitsCount",0)}init(){this.canvas=document.getElementById("game-canvas"),this.ctx=this.canvas.getContext("2d"),this.resizeCanvas(),h.init(),window.addEventListener("resize",()=>this.resizeCanvas()),this.startLoop()}resizeCanvas(){const e=this.canvas.parentElement,t=window.getComputedStyle(e),a=e.clientWidth-(parseFloat(t.paddingLeft)+parseFloat(t.paddingRight)),i=e.clientHeight-(parseFloat(t.paddingTop)+parseFloat(t.paddingBottom)),r=Math.min(a,i*4/3),d=r*3/4;this.virtualCanvas.update(r,d),this.canvas.width=Math.round(r),this.canvas.height=Math.round(d),this.canvas.style.width=`${r}px`,this.canvas.style.height=`${d}px`,this.virtualCanvas.update(r,d)}startLoop(){const e=()=>{this.update(),this.draw(),this.animationFrameId=requestAnimationFrame(e)};e()}update(){this.ball.move(),this.ball.checkWallCollision()&&h.play("wall"),this.checkPaddleCollision(this.leftPaddle),this.checkPaddleCollision(this.rightPaddle),this.checkGoal(),this.keysPressed.w&&this.leftPaddle.move(-1),this.keysPressed.s&&this.leftPaddle.move(1),this.keysPressed.ArrowUp&&this.rightPaddle.move(-1),this.keysPressed.ArrowDown&&this.rightPaddle.move(1)}checkPaddleCollision(e){const t=e.checkBallCollision(this.ball.x,this.ball.y,this.ball.radius);if(t>0){const a=e.getDeflectionAngle(t);h.play("paddle"),this.ball.handlePaddleCollision(a,e===this.rightPaddle),this.showCollisionZones=!0,setTimeout(()=>this.showCollisionZones=!1,100),this.hitsCount++}}checkGoal(){this.ball.x-this.ball.radius<=0?(this.scorePlayer2++,this.resetRound()):this.ball.x+this.ball.radius>=o.BASE_WIDTH&&(this.scorePlayer1++,this.resetRound()),(this.scorePlayer1>=this.maxPoints||this.scorePlayer2>=this.maxPoints)&&(this.scorePlayer1=0,this.scorePlayer2=0,this.hitsCount=0)}resetRound(){h.play("score"),this.ball.reset()}draw(){this.drawBackground(),this.drawCenterLine(),this.drawPaddle(this.leftPaddle),this.drawPaddle(this.rightPaddle),this.drawBall(),this.drawScore()}drawBackground(){this.ctx.fillStyle="black",this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height)}drawCenterLine(){this.ctx.strokeStyle="rgba(255, 255, 255, 0.5)",this.ctx.lineWidth=this.virtualCanvas.toPhysicalSize(4),this.ctx.setLineDash([this.virtualCanvas.toPhysicalSize(20),this.virtualCanvas.toPhysicalSize(15)]),this.ctx.beginPath(),this.ctx.moveTo(this.canvas.width/2,0),this.ctx.lineTo(this.canvas.width/2,this.canvas.height),this.ctx.stroke(),this.ctx.setLineDash([])}drawPaddle(e){if(this.ctx.fillStyle="white",this.ctx.fillRect(this.virtualCanvas.toPhysicalX(e.x),this.virtualCanvas.toPhysicalY(e.y),this.virtualCanvas.toPhysicalSize(e.width),this.virtualCanvas.toPhysicalSize(e.height)),this.showCollisionZones){const t=e.height/8;for(let a=0;a<8;a++)this.ctx.fillStyle=`rgba(255, 0, 0, ${.2+a*.1})`,this.ctx.fillRect(this.virtualCanvas.toPhysicalX(e.x),this.virtualCanvas.toPhysicalY(e.y+a*t),this.virtualCanvas.toPhysicalSize(e.width),this.virtualCanvas.toPhysicalSize(t))}}drawBall(){this.ctx.fillStyle="white",this.ctx.beginPath(),this.ctx.arc(this.virtualCanvas.toPhysicalX(this.ball.x),this.virtualCanvas.toPhysicalY(this.ball.y),this.virtualCanvas.toPhysicalSize(this.ball.radius),0,Math.PI*2),this.ctx.fill()}drawScore(){const e=this.virtualCanvas.toPhysicalSize(48);this.ctx.font=`${e}px 'DSEG7ClassicMini', monospace`,this.ctx.textAlign="center",this.ctx.fillStyle="white",this.ctx.fillText(this.scorePlayer1.toString().padStart(2," "),this.virtualCanvas.toPhysicalX(o.BASE_WIDTH/4),this.virtualCanvas.toPhysicalY(60)),this.ctx.fillText(this.scorePlayer2.toString().padStart(2," "),this.virtualCanvas.toPhysicalX(o.BASE_WIDTH*3/4),this.virtualCanvas.toPhysicalY(60))}setKey(e,t){this.keysPressed[e]=t}setBallSpeed(e){this.ball.speed=e}setPaddleSize(e){this.leftPaddle.setPaddleHeight(e),this.rightPaddle.setPaddleHeight(e)}setMaxPoints(e){this.maxPoints=e}stop(){cancelAnimationFrame(this.animationFrameId)}render(){return`
      <div class="flex items-center justify-center w-full bg-[#fbd11b] px-4 py-2 overflow-hidden">
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
    `}}const g=new I,p={renderGameCanvas:()=>g.render(),initGameCanvas:()=>g.init(),stop:()=>g.stop(),setBallSpeed:s=>g.setBallSpeed(s),setPaddleSize:s=>g.setPaddleSize(s),setMaxPoints:s=>g.setMaxPoints(s),setPlayerType(s,e){console.log(`Player ${s} set to ${e}`)},handleKeyDown:s=>g.setKey(s,!0),handleKeyUp:s=>g.setKey(s,!1)};class m{static getCurrentPhase(){return this.currentPhase}static setPhase(e){this.currentPhase=e,this.settingsLocked=e!=="MENU",this.updateSettingsUI()}static isSettingsEditable(){return!this.settingsLocked}static updateSettingsUI(){document.querySelectorAll("#game-settings input, #game-settings select").forEach(t=>{var a,i;this.settingsLocked?(t.setAttribute("disabled","true"),(a=t.parentElement)==null||a.classList.add("opacity-50")):(t.removeAttribute("disabled"),(i=t.parentElement)==null||i.classList.remove("opacity-50"))})}}n(m,"currentPhase","MENU"),n(m,"settingsLocked",!1);const E={renderGameSettings(){const s=m.isSettingsEditable();return`
      <div class="flex flex-col md:flex-row justify-between gap-4 p-4">
        <!-- Player 1 Settings -->
        <div class="flex-1 bg-yellow-100 p-4 rounded-lg border-2 border-black shadow-md">
          <h3 class="text-lg font-bold mb-3 text-center">Player 1</h3>
          ${this.renderPlayerControls("p1",s)}
        </div>

        <!-- Game Settings -->
        <div class="flex-1 bg-yellow-100 p-4 rounded-lg border-2 border-black shadow-md mx-0 md:mx-4">
          <h3 class="text-lg font-bold mb-3 text-center">Game Settings</h3>
          
          <!-- Level DIP Switch -->
          <div class="mb-6">
            <p class="text-sm font-medium mb-2 text-center">Game Level</p>
            <div class="flex justify-center gap-6">
              ${this.renderDipSwitch("level","normal","Normal",!0,s)}
              ${this.renderDipSwitch("level","high","High",!1,s)}
            </div>
          </div>
          
          <!-- Points DIP Switch -->
          <div class="mb-6">
            <p class="text-sm font-medium mb-2 text-center">Points to Win</p>
            <div class="flex justify-center gap-6">
              ${this.renderDipSwitch("points","11","11",!0,s)}
              ${this.renderDipSwitch("points","15","15",!1,s)}
            </div>
          </div>
          
          <!-- Sound Toggle (always editable) -->
          <div>
            <p class="text-sm font-medium mb-2 text-center">Sound</p>
            ${this.renderSoundToggle()}
          </div>
        </div>

        <!-- Player 2 Settings -->
        <div class="flex-1 bg-yellow-100 p-4 rounded-lg border-2 border-black shadow-md">
          <h3 class="text-lg font-bold mb-3 text-center">Player 2</h3>
          ${this.renderPlayerControls("p2",s)}
        </div>
      </div>
    `},renderPlayerControls(s,e){return`
      <div class="space-y-4">
        <!-- Player Type Selector -->
        <div>
          <select 
            id="${s}-type" 
            class="w-full p-2 rounded-md border-2 border-black bg-yellow-50 shadow-inner focus:ring-2 focus:ring-black focus:outline-none ${e?"":"opacity-50 cursor-not-allowed"}"
            ${e?"":"disabled"}
          >
            <option value="me">Me</option>
            <option value="alias">Alias</option>
            <option value="remote">Remote Player</option>
            <option value="ia" selected>AI</option>
          </select>
        </div>
        
        <!-- Alias Input (hidden by default) -->
        <div id="${s}-alias-container" class="hidden">
          <input 
            type="text" 
            id="${s}-alias" 
            placeholder="Enter alias" 
            class="w-full p-2 rounded-md border-2 border-black bg-yellow-50 shadow-inner focus:ring-2 focus:ring-black focus:outline-none ${e?"":"opacity-50 cursor-not-allowed"}"
            ${e?"":"disabled"}
          >
        </div>
        
        <!-- Remote Player Selector (hidden by default) -->
        <div id="${s}-remote-container" class="hidden">
          <select 
            id="${s}-remote" 
            class="w-full p-2 rounded-md border-2 border-black bg-yellow-50 shadow-inner focus:ring-2 focus:ring-black focus:outline-none ${e?"":"opacity-50 cursor-not-allowed"}"
            ${e?"":"disabled"}
          >
            <option value="">Select player</option>
            <!-- Remote players populated dynamically -->
          </select>
        </div>
      </div>
    `},renderDipSwitch(s,e,t,a,i){return`
      <label class="relative inline-flex items-center mb-5 cursor-pointer ${i?"":"opacity-50"}">
        <input 
          type="radio" 
          name="${s}" 
          value="${e}" 
          class="sr-only peer" 
          ${a?"checked":""}
          ${i?"":"disabled"}
        >
        <div class="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-black ${i?"":"cursor-not-allowed"}"></div>
        <span class="ml-2 text-sm font-medium">${t}</span>
      </label>
    `},renderSoundToggle(){return`
      <div class="flex justify-center">
        <label class="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" id="sound-toggle" class="sr-only peer" checked>
          <div class="w-20 h-8 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-black">
            <span class="absolute left-2 top-1/2 -translate-y-1/2 text-xs font-medium text-black peer-checked:text-white transition-all">
              OFF
            </span>
            <span class="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-medium text-white peer-checked:text-black transition-all">
              ON
            </span>
          </div>
        </label>
      </div>
    `},initSettings(){var s;document.querySelectorAll('input[name="level"]').forEach(e=>{e.addEventListener("change",a=>{if(!m.isSettingsEditable())return;const i=a.target.value;p.setBallSpeed(i==="high"?8:12),p.setPaddleSize(i==="high"?o.PADDLE_HEIGHT:o.PADDLE_HEIGHT*.75)});const t=document.getElementById("sound-toggle");t&&(t.addEventListener("change",async a=>{const i=a.target.checked;h.setEnabled(i),i&&await h.play("paddle")}),t.checked=!0)}),document.querySelectorAll('input[name="points"]').forEach(e=>{e.addEventListener("change",t=>{m.isSettingsEditable()&&p.setMaxPoints(parseInt(t.target.value))})}),(s=document.getElementById("sound-toggle"))==null||s.addEventListener("change",e=>{const t=e.target.checked;h.setEnabled(t),t&&h.play("paddle")}),["p1","p2"].forEach(e=>{const t=document.getElementById(`${e}-type`),a=document.getElementById(`${e}-alias-container`),i=document.getElementById(`${e}-remote-container`);if(t==null||t.addEventListener("change",r=>{if(!m.isSettingsEditable())return;const l=r.target.value;l==="me"||l==="alias"||l==="remote"||l==="ia"?(p.setPlayerType(e,l),a&&i&&(a.classList.toggle("hidden",l!=="alias"),i.classList.toggle("hidden",l!=="remote"))):console.error("Invalid player type selected:",l)}),t&&a&&i){const r=t.value;(r==="me"||r==="alias"||r==="remote"||r==="ia")&&(a.classList.toggle("hidden",r!=="alias"),i.classList.toggle("hidden",r!=="remote"))}})},updateSettingsForGamePhase(){const s=m.isSettingsEditable();document.querySelectorAll('#p1-type, #p1-alias, #p1-remote, #p2-type, #p2-alias, #p2-remote, input[name="level"], input[name="points"]').forEach(t=>{s?(t.removeAttribute("disabled"),t.classList.remove("opacity-50","cursor-not-allowed")):(t.setAttribute("disabled","true"),t.classList.add("opacity-50","cursor-not-allowed"))}),document.querySelectorAll("label").forEach(t=>{t.querySelector('input[name="level"], input[name="points"]')&&t.classList.toggle("opacity-50",!s)})}},D={init(){window.addEventListener("keydown",s=>{["ArrowUp","ArrowDown","w","s"].includes(s.key)&&s.preventDefault(),p.handleKeyDown(s.key)}),window.addEventListener("keyup",s=>{["ArrowUp","ArrowDown","w","s"].includes(s.key)&&s.preventDefault(),p.handleKeyUp(s.key)})}};class H{constructor(){n(this,"isLoginView",!0)}init(){this.render(),this.bindAuthEvents()}render(){const e=document.getElementById("auth-container");if(e){const t=u.getCurrentUser();e.innerHTML=t?b.renderProfile(t.email):b.renderAuthForm(this.isLoginView)}}bindAuthEvents(){document.addEventListener("click",e=>{const t=e.target;t.closest("#login-btn")?(this.isLoginView=!0,this.render()):t.closest("#register-btn")?(this.isLoginView=!1,this.render()):t.closest("#logout-btn")?(u.logout(),this.isLoginView=!0,this.render()):t.closest("#toggle-auth")&&(this.isLoginView=!this.isLoginView,this.render())}),document.addEventListener("submit",async e=>{e.target.id==="auth-form"&&(e.preventDefault(),await this.handleAuthFormSubmit())})}async handleAuthFormSubmit(){const e=document.getElementById("email"),t=document.getElementById("password"),a=document.getElementById("auth-error");if(!e||!t||!a)return;const i=e.value,r=t.value;try{this.isLoginView?await u.login(i,r):await u.register(i,r),this.render()}catch(d){a.textContent=d.message}}}const T=new H,S={currentUser:null,isLogin:!0,render(){return`
    <div class="flex flex-col min-h-screen bg-[#fbd11b] text-black">

      <!-- Header with Pong Logo -->
      <header class="flex justify-center items-center bg-[#fbd11b] h-auto min-h-[26px] py-[clamp(4px,2vh,16px)]">
        <img src="/pong-logo.png"
	     alt="PONG Logo"
	     class="h-[clamp(24px,10vh,52px)] transition-all duration-300">
      </header>

      <!-- Game Canvas Area -->
	<main class="flex-1 flex items-center justify-center bg-[#fbd11b] overflow-hidden">
        ${p.renderGameCanvas()}
      </main>

      <!-- Control Panel -->
      <footer class="bg-[#fbd11b] p-4">
        ${E.renderGameSettings()}
      </footer>

    </div>
    `},renderAuth(){const s=u.getCurrentUser();return s?b.renderProfile(s.email):b.renderAuthForm(this.isLogin)},init(){this.currentUser=u.getCurrentUser(),p.initGameCanvas(),D.init(),T.init(),E.initSettings(),u.onAuthStateChanged(()=>{this.currentUser=u.getCurrentUser(),document.getElementById("auth-container").innerHTML=this.renderAuth()})}};class B{constructor(){n(this,"currentUser",null);this.initializeUser()}initializeUser(){const e=localStorage.getItem("authToken"),t=localStorage.getItem("userEmail");e&&t?this.currentUser={email:t,token:e}:y.navigate("home")}render(){var e;return`
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
    `}initEventListeners(){const e=document.getElementById("logout-btn");e&&e.addEventListener("click",this.handleLogout.bind(this))}handleLogout(){localStorage.removeItem("authToken"),localStorage.removeItem("userEmail"),this.currentUser=null,y.navigate("home")}initialize(){const e=document.getElementById("app");e?(e.innerHTML=this.render(),this.initEventListeners()):console.error("App container not found")}}class y{static navigate(e){if(!this.app){console.error("App container not found");return}if(this.app.innerHTML="",e==="dashboard"&&!this.isAuthenticated())return console.warn("Redirecting to home: not authenticated"),this.navigate("home");switch(e){case"home":if(this.isAuthenticated())return this.navigate("dashboard");this.app.innerHTML=S.render(),S.init();break;case"dashboard":new B().initialize();break}history.pushState({},"",e==="home"?"/":`/${e}`)}static isAuthenticated(){return localStorage.getItem("authToken")!==null}static init(){window.addEventListener("load",()=>{const e=window.location.pathname;this.navigate(e.includes("dashboard")?"dashboard":"home")}),window.addEventListener("popstate",()=>{const e=window.location.pathname;this.navigate(e.includes("dashboard")?"dashboard":"home")})}}n(y,"app",document.getElementById("app"));y.init();window.addEventListener("load",()=>{const s=window.location.pathname;y.navigate(s.includes("dashboard")?"dashboard":"home")});window.addEventListener("popstate",()=>{const s=window.location.pathname;y.navigate(s.includes("dashboard")?"dashboard":"home")});
