var B=Object.defineProperty;var C=(i,e,t)=>e in i?B(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var a=(i,e,t)=>C(i,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const l of s)if(l.type==="childList")for(const r of l.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function t(s){const l={};return s.integrity&&(l.integrity=s.integrity),s.referrerPolicy&&(l.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?l.credentials="include":s.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function n(s){if(s.ep)return;s.ep=!0;const l=t(s);fetch(s.href,l)}})();const o={BASE_WIDTH:1024,BASE_HEIGHT:768,BALL_SPEED:2,MAX_BALL_SPEED:10,PADDLE_WIDTH:10,PADDLE_HEIGHT:80,PADDLE_SPEED:5,PADDLE_OFFSET:30,DEFLECTION_ANGLES:[-45,-30,-15,0,0,15,30,45]};class S{constructor(){a(this,"physicalWidth",0);a(this,"physicalHeight",0);a(this,"scaleFactor",1);a(this,"baseWidth",o.BASE_WIDTH);a(this,"baseHeight",o.BASE_HEIGHT)}update(e,t){this.physicalWidth=e,this.physicalHeight=t;const n=e/this.baseWidth,s=t/this.baseHeight;this.scaleFactor=Math.min(n,s)}toPhysicalX(e){return e*this.scaleFactor}toPhysicalY(e){return e*this.scaleFactor}toPhysicalSize(e){return e*this.scaleFactor}get currentVirtualWidth(){return this.baseWidth}get currentVirtualHeight(){return this.baseHeight}getPhysicalDimensions(){return{width:this.physicalWidth,height:this.physicalHeight}}}class I{constructor(){a(this,"x");a(this,"y");a(this,"radius");a(this,"dx");a(this,"dy");a(this,"speed");a(this,"color");this.x=o.BASE_WIDTH/2,this.y=o.BASE_HEIGHT/2,this.radius=10,this.speed=o.BALL_SPEED,this.dx=2*(Math.random()>.5?1:-1),this.dy=2*(Math.random()>.5?1:-1),this.color="white"}reset(){this.x=o.BASE_WIDTH/2,this.y=o.BASE_HEIGHT/2,this.radius=10,this.speed=o.BALL_SPEED,this.dx=2*(Math.random()>.5?1:-1),this.dy=2*(Math.random()>.5?1:-1),this.color="white"}move(){this.x+=this.dx,this.y+=this.dy}checkWallCollision(){const e=this.x-this.radius<=0,t=this.x+this.radius>=o.BASE_WIDTH,n=this.y-this.radius<=0,s=this.y+this.radius>=o.BASE_HEIGHT;return e||t?(this.dx=-this.dx,!0):n||s?(this.dy=-this.dy,!0):!1}handlePaddleCollision(e,t){this.dx=Math.cos(e)*this.speed*(t?-1:1),this.dy=Math.sin(e)*this.speed,this.speed=Math.min(this.speed*1.05,o.MAX_BALL_SPEED)}}class w{constructor(e){a(this,"x");a(this,"y");a(this,"width");a(this,"height");a(this,"speed");a(this,"targetY");this.width=o.PADDLE_WIDTH,this.height=o.PADDLE_HEIGHT,this.speed=o.PADDLE_SPEED,this.targetY=o.BASE_HEIGHT/2-this.height/2,this.x=e?o.PADDLE_OFFSET:o.BASE_WIDTH-o.PADDLE_OFFSET-this.width,this.y=this.targetY}move(e){const t=e*this.speed;this.targetY=Math.max(0,Math.min(o.BASE_HEIGHT-this.height,this.targetY+t)),this.y=this.targetY}update(e){const t=this.targetY-this.y,n=this.speed*e;this.y+=Math.sign(t)*Math.min(n,Math.abs(t))}reset(){this.y=o.BASE_HEIGHT/2-this.height/2,this.targetY=this.y}checkBallCollision(e,t,n){if(e+n<this.x||e-n>this.x+this.width||t+n<this.y||t-n>this.y+this.height)return 0;const s=this.height/8,l=t-this.y;let r=Math.floor(l/s)+1;return r=Math.max(1,Math.min(8,r)),r}getDeflectionAngle(e){return o.DEFLECTION_ANGLES[e-1]*(Math.PI/180)}}class h{static init(){this.ctx||(this.ctx=new(window.AudioContext||window.webkitAudioContext))}static play(e){this.init(),this.nodes[e]&&this.nodes[e].stop();const t=this.ctx.createOscillator(),n=this.ctx.createGain();switch(e){case"paddle":t.type="sine",t.frequency.value=220,n.gain.value=.3;break;case"wall":t.type="square",t.frequency.value=440,n.gain.value=.2;break;case"score":t.type="sawtooth",t.frequency.value=110,n.gain.value=.4;break}t.connect(n),n.connect(this.ctx.destination);const s=e==="score"?.5:.05;t.start(),t.stop(this.ctx.currentTime+s),this.nodes[e]=t}}a(h,"ctx"),a(h,"nodes",{});class L{constructor(){a(this,"canvas");a(this,"ctx");a(this,"virtualCanvas",new S);a(this,"ball",new I);a(this,"leftPaddle",new w(!0));a(this,"rightPaddle",new w(!1));a(this,"animationFrameId",0);a(this,"scorePlayer1",0);a(this,"scorePlayer2",0);a(this,"keysPressed",{});a(this,"showCollisionZones",!1)}init(){this.canvas=document.getElementById("game-canvas"),this.ctx=this.canvas.getContext("2d"),this.resizeCanvas(),h.init(),window.addEventListener("resize",()=>this.resizeCanvas()),this.startLoop()}resizeCanvas(){const e=this.canvas.parentElement,t=window.getComputedStyle(e),n=e.clientWidth-(parseFloat(t.paddingLeft)+parseFloat(t.paddingRight)),s=e.clientHeight-(parseFloat(t.paddingTop)+parseFloat(t.paddingBottom));this.virtualCanvas.update(n,s),this.canvas.width=n,this.canvas.height=s,this.canvas.style.width=`${n}px`,this.canvas.style.height=`${s}px`}startLoop(){const e=()=>{this.update(),this.draw(),this.animationFrameId=requestAnimationFrame(e)};e()}update(){this.ball.move(),this.ball.checkWallCollision()&&h.play("wall"),this.checkPaddleCollision(this.leftPaddle),this.checkPaddleCollision(this.rightPaddle),this.checkGoal(),this.keysPressed.w&&this.leftPaddle.move(-1),this.keysPressed.s&&this.leftPaddle.move(1),this.keysPressed.ArrowUp&&this.rightPaddle.move(-1),this.keysPressed.ArrowDown&&this.rightPaddle.move(1)}checkPaddleCollision(e){const t=e.checkBallCollision(this.ball.x,this.ball.y,this.ball.radius);if(t>0){const n=e.getDeflectionAngle(t);h.play("paddle"),this.ball.handlePaddleCollision(n,e===this.rightPaddle),this.showCollisionZones=!0,setTimeout(()=>this.showCollisionZones=!1,100)}}checkGoal(){this.ball.x-this.ball.radius<=0?(this.scorePlayer2++,this.resetRound()):this.ball.x+this.ball.radius>=o.BASE_WIDTH&&(this.scorePlayer1++,this.resetRound()),(this.scorePlayer1>=21||this.scorePlayer2>=21)&&(this.scorePlayer1=0,this.scorePlayer2=0)}resetRound(){h.play("score"),this.ball.reset()}draw(){this.drawBackground(),this.drawCenterLine(),this.drawPaddle(this.leftPaddle),this.drawPaddle(this.rightPaddle),this.drawBall(),this.drawScore()}drawBackground(){this.ctx.fillStyle="black",this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height)}drawCenterLine(){this.ctx.strokeStyle="rgba(255, 255, 255, 0.5)",this.ctx.lineWidth=this.virtualCanvas.toPhysicalSize(4),this.ctx.setLineDash([this.virtualCanvas.toPhysicalSize(20),this.virtualCanvas.toPhysicalSize(15)]),this.ctx.beginPath(),this.ctx.moveTo(this.canvas.width/2,0),this.ctx.lineTo(this.canvas.width/2,this.canvas.height),this.ctx.stroke(),this.ctx.setLineDash([])}drawPaddle(e){if(this.ctx.fillStyle="white",this.ctx.fillRect(this.virtualCanvas.toPhysicalX(e.x),this.virtualCanvas.toPhysicalY(e.y),this.virtualCanvas.toPhysicalSize(e.width),this.virtualCanvas.toPhysicalSize(e.height)),this.showCollisionZones){const t=e.height/8;for(let n=0;n<8;n++)this.ctx.fillStyle=`rgba(255, 0, 0, ${.2+n*.1})`,this.ctx.fillRect(this.virtualCanvas.toPhysicalX(e.x),this.virtualCanvas.toPhysicalY(e.y+n*t),this.virtualCanvas.toPhysicalSize(e.width),this.virtualCanvas.toPhysicalSize(t))}}drawBall(){this.ctx.fillStyle="white",this.ctx.beginPath(),this.ctx.arc(this.virtualCanvas.toPhysicalX(this.ball.x),this.virtualCanvas.toPhysicalY(this.ball.y),this.virtualCanvas.toPhysicalSize(this.ball.radius),0,Math.PI*2),this.ctx.fill()}drawScore(){const e=this.virtualCanvas.toPhysicalSize(48);this.ctx.font=`${e}px 'SevenSegment', monospace`,this.ctx.textAlign="center",this.ctx.fillStyle="white",this.ctx.fillText(this.scorePlayer1.toString().padStart(2,"0"),this.virtualCanvas.toPhysicalX(o.BASE_WIDTH/4),this.virtualCanvas.toPhysicalY(60)),this.ctx.fillText(this.scorePlayer2.toString().padStart(2,"0"),this.virtualCanvas.toPhysicalX(o.BASE_WIDTH*3/4),this.virtualCanvas.toPhysicalY(60))}setKey(e,t){this.keysPressed[e]=t}setBallSpeed(e){this.ball.speed=e}stop(){cancelAnimationFrame(this.animationFrameId)}render(){return`
    <div class="flex items-center justify-center bg-[#fbd11b] p-2 w-full">
      <div class="aspect-[4/3] w-full max-w-[1024px] min-w-[600px] bg-black border-4 border-white">
        <canvas 
          id="game-canvas" 
          class="w-full h-full"
        ></canvas>
      </div>
    </div>
    `}}const d=new L,g={renderGameCanvas:()=>d.render(),initGameCanvas:()=>d.init(),stop:()=>d.stop(),setBallSpeed:i=>d.setBallSpeed(i),handleKeyDown:i=>d.setKey(i,!0),handleKeyUp:i=>d.setKey(i,!1)},b={renderGameSettings(){return`
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
    `},initSettings(){const i=document.getElementById("ball-speed");i&&i.addEventListener("input",()=>{const e=parseFloat(i.value);g.setBallSpeed(e)})}},k={init(){window.addEventListener("keydown",i=>{["ArrowUp","ArrowDown","w","s"].includes(i.key)&&i.preventDefault(),g.handleKeyDown(i.key)}),window.addEventListener("keyup",i=>{["ArrowUp","ArrowDown","w","s"].includes(i.key)&&i.preventDefault(),g.handleKeyUp(i.key)})}};function A(i,e){e.strokeStyle="rgba(255, 255, 255, 0.5)",e.lineWidth=4,e.setLineDash([20,15]),e.beginPath(),e.moveTo(i.width/2,0),e.lineTo(i.width/2,i.height),e.stroke(),e.setLineDash([])}function T(){const i=document.getElementById("game-canvas");if(!i)return;const e=i.getBoundingClientRect();i.width=e.width,i.height=e.height;const t=i.getContext("2d");t&&A(i,t)}const v={currentUser:null,isLogin:!0,render(){return`
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
        ${g.renderGameCanvas()}

      </main>

      <!-- Control Panel -->
      <footer class="bg-[#fbd11b] p-4">
        ${b.renderGameSettings()}
      </footer>

    </div>
    `},init(){g.initGameCanvas(),k.init(),b.initSettings(),T()}};function D(i){console.log("in isConnected(), user: ",i),fetch("/api/private/info",{method:"GET",credentials:"include"}).then(e=>{if(!e.ok)throw new Error("Unauthorized");return e.json()}).then(e=>{console.log("In isConnected(): userId:",e.userId),console.log("In isConnected(): login:",e.login),console.log("In isConnected(): alias:",e.alias),console.log("connecté in data");const t=document.getElementById("login-icon"),n=document.getElementById("logged-icon");console.log("User info:",e),t==null||t.classList.add("hidden"),n==null||n.classList.remove("hidden")}).catch(()=>{console.log("Pas connecté, in catch");const e=document.getElementById("login-icon"),t=document.getElementById("logged-icon");t==null||t.classList.add("hidden"),e==null||e.classList.remove("hidden")})}function H(){document.getElementById("loginBtn").addEventListener("click",()=>{const e=document.getElementById("login").value,t=document.getElementById("password").value;fetch("/api/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({login:e,password:t}),credentials:"include"}).then(n=>n.json()).then(n=>{localStorage.setItem("login",e);const s=localStorage.getItem("login");s&&n.success==!0?(document.getElementById("title").textContent=`Hi ${s}`,document.getElementById("welcome-div").style.display="block",document.getElementById("welcome-div").textContent=`Welcome ${s}, you are now connected :)`,document.getElementById("login").style.display="none",document.getElementById("password").style.display="none",document.getElementById("loginBtn").style.display="none",document.getElementById("registerBtn").style.display="none",document.getElementById("logoutBtn").style.display="block"):(document.getElementById("title").textContent="Hi",document.getElementById("welcome-div").style.display="block",document.getElementById("welcome-div").textContent="Sorry. Your credentials doesn't match.")}),console.log("login: ",e,"Password:",t),fetch("/api/auth/debug-token",{credentials:"include"}).then(n=>n.json()).then(n=>console.log("Token received via cookie:",n.token)),fetch("/api/auth/info",{method:"GET",credentials:"include"}).then(n=>{if(!n.ok)throw new Error("Unauthorized");return n.json()}).then(n=>{console.log("In isConnected(): userId:",n.userId),console.log("In isConnected(): login:",n.login),console.log("In isConnected(): alias:",n.alias)}),fetch("/api/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:"alice",password:"1234"})})})}async function _(i){const e=document.getElementById("registerBtn");e==null||e.addEventListener("click",()=>{var s,l;if(document.getElementById("connexionBlock").style.display="none",document.getElementById("register-container"))return;const n=document.createElement("div");n.id="register-container",n.innerHTML=`
		<div id="registrationBlock" class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
			<h1 id="title" class="text-3xl font-bold mb-6 text-blue-600">Hi</h1>
			<input id="new-username" placeholder="Username" class="mb-4 px-4 py-2 border rounded w-64"/><br/>
			<input id="new-password" placeholder="Password" type="password" class="mb-4 px-4 py-2 border rounded w-64"/><br/>
			<input id="new-alias" placeholder="Alias" class="mb-4 px-4 py-2 border rounded w-64"/><br/>
			<button id="create-account" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Create Account</button>
			<button id="backToLogin" class="cursor-pointer text-blue-500 underline">Click here to be back to log in</button>
		</div>
	`,document.body.appendChild(n),(s=document.getElementById("backToLogin"))==null||s.addEventListener("click",()=>{var r;(r=document.getElementById("register-container"))==null||r.remove(),document.getElementById("connexionBlock").style.display="flex"}),(l=document.getElementById("create-account"))==null||l.addEventListener("click",async()=>{const r=document.getElementById("new-username").value,P=document.getElementById("new-password").value,m=document.getElementById("new-alias").value,u=await(await fetch("/api/auth/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({login:r,password:P,alias:m}),credentials:"include"})).json(),f={login:u.data.user.login,password:u.data.password,alias:m,token:u.data.token},p=document.getElementById("registrationBlock");let c=document.getElementById("registration-created");c||(c=document.createElement("p"),c.id="registration-created",p==null||p.appendChild(c)),u.status===200?(c.textContent="Wonderful. You have created your account. You can connect to your account now.",i(f)):u.status===500?c.textContent="DB Error":c.textContent="An account with this login has already been created.",console.log(f)})})}function G(){fetch("/api/auth/info",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({}),credentials:"include"}).then(i=>i.json()).then(i=>{console.log("You are in info page & data:",i)})}async function M(){try{const i=await fetch("/api/auth/info",{method:"GET",credentials:"include"});if(!i.ok)throw new Error("Not authenticated");const e=await i.json();return console.log("User info received:",e),!0}catch(i){return console.warn("User not authenticated:",i),!1}}class x{static render(){return`
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
	</div>`}static init(){H(),_(e=>{D(e)})}}class E{static render(){return`
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
	</div>`}static init(){M();const e=localStorage.getItem("login")||"",t=localStorage.getItem("alias")||"";console.log("current login in localStorage:",e),console.log("current alias in localStorage:",t);const n=document.getElementById("current-login"),s=document.getElementById("current-alias"),l=document.getElementById("new-login"),r=document.getElementById("new-alias");n&&(n.innerText=`Current login: ${e} - Change it to:`),s&&(s.innerText=`Current alias: ${t} - Change it to:`),l&&(l.value=e),r&&(r.value=t),G()}}class y{static navigate(e){if(!this.app){console.error("App container not found");return}switch(this.app.innerHTML="",e){case"home":this.app.innerHTML=v.render(),v.init();break;case"login":this.app.innerHTML=x.render(),x.init();break;case"info":this.app.innerHTML=E.render(),E.init();break}history.pushState({},"",e==="home"?"/":`/${e}`)}static init(){window.addEventListener("load",()=>{const e=window.location.pathname;this.navigate(e.includes("login")?"login":e.includes("info")?"info":"home")}),window.addEventListener("popstate",()=>{const e=window.location.pathname;this.navigate(e.includes("login")?"login":e.includes("info")?"info":"home")})}}a(y,"app",document.getElementById("app"));y.init();window.addEventListener("load",()=>{const i=window.location.pathname;y.navigate(i.includes("login")?"login":i.includes("info")?"info":"home")});window.addEventListener("popstate",()=>{const i=window.location.pathname;y.navigate(i.includes("login")?"login":i.includes("info")?"info":"home")});
