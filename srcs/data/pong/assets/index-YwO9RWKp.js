var Ve=Object.defineProperty;var je=(t,e,n)=>e in t?Ve(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var l=(t,e,n)=>je(t,typeof e!="symbol"?e+"":e,n);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function n(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(i){if(i.ep)return;i.ep=!0;const o=n(i);fetch(i.href,o)}})();function Ue(t){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t)}function K(t,e,n,s){const i=document.getElementById(t),o=document.getElementById(e),a=document.getElementById(n),r=document.getElementById(s);if(!i||!o||!r||!a)return;let d=!1;o.addEventListener("click",()=>{d=!d,i.type=d?"text":"password",r.classList.toggle("hidden",!d),a.classList.toggle("hidden",d)})}async function N(t,e=3500,n){const s=document.getElementById(n);s&&(s.classList.remove("bg-red-600"),s.classList.add("bg-green-600"),s.textContent=t,s.classList.remove("hidden"),setTimeout(()=>{s.classList.add("hidden")},e))}function m(t,e){const n=document.getElementById(e);n&&(n.classList.remove("bg-green-600"),n.classList.add("bg-red-600"),n.textContent=t,n.classList.remove("hidden"),setTimeout(()=>n.classList.add("hidden"),3500))}async function Ne(t){const e=new FormData;e.append("file",t);const n=await fetch("api/auth/uploadProfilePicture",{method:"POST",body:e,credentials:"include"}),s=await n.json();if(!n.ok||!s.success){console.error("Error on upload:",s),alert(`Error: ${s.error||"failed to store the picture."}`);return}}async function qe(){return(await(await fetch("/api/auth/me",{credentials:"include"})).json()).user}class ze{constructor(){l(this,"players",[]);l(this,"semifinal1",null);l(this,"semifinal2",null);l(this,"finalMatch",null);l(this,"winner",null)}addPlayer(e){this.players.push({alias:e})}isReady(){return this.players.length===4}generateMatches(){this.semifinal1={player1:{...this.players[0]},player2:{...this.players[1]},winner:null},this.semifinal2={player1:{...this.players[2]},player2:{...this.players[3]},winner:null}}generateFinal(){var e,n;(e=this.semifinal1)!=null&&e.winner&&((n=this.semifinal2)!=null&&n.winner)&&(this.finalMatch={player1:this.semifinal1.winner,player2:this.semifinal2.winner,winner:null})}setWinner(e){this.winner=e}saveToLocalStorage(){var n;const e=JSON.parse(localStorage.getItem("torneos")||"[]");e.push({jugadores:this.players.map(s=>s.alias),ganador:(n=this.winner)==null?void 0:n.alias,fecha:new Date().toISOString()}),localStorage.setItem("torneos",JSON.stringify(e))}}let g=null;function We(t){g=t}function Q(){g=null}function ke(){return g}let W=null;function Ye(t){W=t}function Ze(){return W}let Xe=class{showPreGame(e,n){return new Promise(s=>{const i=document.getElementById("game-overlay"),o=document.getElementById("pre-game-screen"),a=document.getElementById("player-vs-player"),r=document.getElementById("countdown-text");r.textContent="",a.textContent=`${e} vs ${n}`,o==null||o.classList.remove("hidden"),i==null||i.classList.remove("hidden"),i==null||i.classList.add("flex"),setTimeout(()=>{o==null||o.classList.add("hidden"),s()},3e3)})}startCountdown(){return new Promise(e=>{const n=document.getElementById("game-overlay"),s=document.getElementById("pre-game-screen"),i=document.getElementById("countdown-screen"),o=document.getElementById("countdown-text");s==null||s.classList.add("hidden"),i==null||i.classList.remove("hidden");let a=3;o.textContent=String(a);const r=setInterval(()=>{a--,a>0?o.textContent=String(a):a===0?o.textContent="GO!":(clearInterval(r),n==null||n.classList.add("hidden"),n==null||n.classList.remove("flex"),e())},1e3)})}updateBracket(e){var n,s,i,o,a,r,d,h,u,p,f,E,x,L,I,M;if(e.semifinal1){const y=e.semifinal1,P=document.querySelector("#alias1"),D=document.querySelector("#alias1-point"),S=document.querySelector("#alias2"),$=document.querySelector("#alias2-point");if(console.log(y),P.value=y.player1.alias,S.value=y.player2.alias,P.disabled=!0,S.disabled=!0,D.textContent=((n=y.player1.score)==null?void 0:n.toString())??"0",$.textContent=((s=y.player2.score)==null?void 0:s.toString())??"0",y.winner){const H=document.querySelector("#final2");H&&(H.textContent=y.winner.alias),y.winner.alias===y.player1.alias?(i=P.closest(".flex"))==null||i.classList.add("winner-bg"):(o=S.closest(".flex"))==null||o.classList.add("winner-bg")}}if(e.semifinal2){const y=e.semifinal2;console.log(y);const P=document.querySelector("#alias3"),D=document.querySelector("#alias4"),S=document.querySelector("#alias3-point"),$=document.querySelector("#alias4-point");if(P.value=y.player1.alias,D.value=y.player2.alias,P.disabled=!0,D.disabled=!0,S.textContent=((a=y.player1.score)==null?void 0:a.toString())??"0",$.textContent=((r=y.player2.score)==null?void 0:r.toString())??"0",(d=P.closest(".flex"))==null||d.classList.remove("winner-bg"),(h=D.closest(".flex"))==null||h.classList.remove("winner-bg"),y.winner){const H=document.querySelector("#final1");H&&(H.textContent=y.winner.alias),y.winner.alias===y.player1.alias?(u=P.closest(".flex"))==null||u.classList.add("winner-bg"):(p=D.closest(".flex"))==null||p.classList.add("winner-bg")}}if(e.finalMatch){const y=e.finalMatch,P=document.querySelector("#final1"),D=document.querySelector("#final2"),S=document.querySelector("#final1-point"),$=document.querySelector("#final2-point");P.textContent=y.player1.alias,D.textContent=y.player2.alias,S.textContent=((f=y.player1.score)==null?void 0:f.toString())??"0",$.textContent=((E=y.player2.score)==null?void 0:E.toString())??"0",(x=P.closest(".flex"))==null||x.classList.remove("winner-bg"),(L=D.closest(".flex"))==null||L.classList.remove("winner-bg"),y.winner&&(y.winner.alias===y.player1.alias?(I=P.closest(".flex"))==null||I.classList.add("winner-bg"):(M=D.closest(".flex"))==null||M.classList.add("winner-bg"))}}showTournamentWinner(e){const n=document.getElementById("game-overlay"),s=document.getElementById("winner-screen"),i=document.getElementById("winner-name"),o=document.getElementById("countdown-screen");i.textContent=e,s==null||s.classList.remove("hidden"),n==null||n.classList.remove("hidden"),n==null||n.classList.add("flex"),o==null||o.classList.add("hidden"),document.getElementById("showResumBtn").onclick=()=>{let a=document.getElementById("game-overlay");a==null||a.classList.add("hidden");let r=document.getElementById("nextMatchBtn");r==null||r.classList.add("hidden");let d=document.getElementById("resetTournamentBtn");d&&d.classList.remove("hidden")},document.getElementById("resetTournamentBtn").onclick=()=>{let a=document.getElementById("game-overlay");a==null||a.classList.add("hidden");let r=document.getElementById("nextMatchBtn");r==null||r.classList.add("hidden"),v.navigate("home")}}};const _=new Xe,Je=.02;class ue{constructor(e){l(this,"paddleElem");l(this,"_position",50);this.paddleElem=e,this.reset()}get position(){return this._position}set position(e){this._position=e,this.updatePosition()}updatePosition(){const e=2+this._position*.96;this.paddleElem.style.top=`${e}vh`}rect(){return this.paddleElem.getBoundingClientRect()}reset(){this.position=50}update(e,n){this.position+=Je*e*(n-this.position);const s=5;this.position=Math.max(s,Math.min(100-s,this.position))}highlight(){this.paddleElem.style.backgroundColor="#EDD24E",setTimeout(()=>{this.paddleElem.style.backgroundColor="#D9D9D9"},150)}}const ge=.055,Ke=1.1,Qe=.1;class et{constructor(e){l(this,"ballElem");l(this,"direction",{x:0,y:0});l(this,"velocity",ge);l(this,"_x",50);l(this,"_y",50);this.ballElem=e,this.reset()}get x(){return this._x}set x(e){this._x=e,this.updatePosition()}get y(){return this._y}set y(e){this._y=e,this.updatePosition()}updatePosition(){const e=(this._x-50)*.88,n=(this._y-50)*.96;this.ballElem.style.transform=`translate(${e}vw, ${n}vh)`}get directionX(){return this.direction.x}get directionY(){return this.direction.y}get ballVelocity(){return this.velocity}rect(){return this.ballElem.getBoundingClientRect()}reset(){for(this.x=50,this.y=50,this.direction={x:0,y:0};Math.abs(this.direction.x)<=.3||Math.abs(this.direction.x)>=.8;){const e=tt(0,2*Math.PI);this.direction={x:Math.cos(e),y:Math.sin(e)}}this.velocity=ge}bounceVertical(){this.direction.y*=-1,this.direction.y<0?this.direction.y-=.1:this.direction.y+=.1}update(e,n,s){const i=[n.rect(),s.rect()];this.x+=this.direction.x*this.velocity*e,this.y+=this.direction.y*this.velocity*e;const o=this.rect(),a=window.innerHeight*.02,r=window.innerHeight*.98;(o.bottom>=r||o.top<=a)&&this.bounceVertical(),i.forEach(d=>{if(nt(d,o)){const h=o.top+o.height/2,u=d.top+d.height/2,p=d.height,f=(h-(u-p/2))/p,E=Math.max(0,Math.min(1,f)),x=Math.PI/3,L=(E-.5)*2*x,I=Math.sqrt(this.direction.x*this.direction.x+this.direction.y*this.direction.y);d.left<window.innerWidth/2?(n.highlight(),this.direction.x=Math.cos(L)*I,this.direction.y=Math.sin(L)*I):(s.highlight(),this.direction.x=-Math.cos(L)*I,this.direction.y=Math.sin(L)*I);const M=Math.sqrt(this.direction.x*this.direction.x+this.direction.y*this.direction.y);this.direction.x/=M,this.direction.y/=M,this.velocity=Math.min(this.velocity*Ke,Qe)}})}}function tt(t,e){return Math.random()*(e-t)+t}function nt(t,e){return t.left<=e.right&&t.right>=e.left&&t.top<=e.bottom&&t.bottom>=e.top}class c{}l(c,"MAX_SCORE",5),l(c,"PADDLE_SPEED",.08),l(c,"FRAME_RATE_LIMIT",8.33),l(c,"AI_UPDATE_COOLDOWN",1e3),l(c,"AI_TARGET_THRESHOLD",2),l(c,"AI_MOVEMENT_THRESHOLD",1),l(c,"AI_MAX_SIMULATION_STEPS",10),l(c,"GAME_AREA_TOP_PERCENT",2),l(c,"GAME_AREA_BOTTOM_PERCENT",98),l(c,"PADDLE_BOUNDARY_TOP",4),l(c,"PADDLE_BOUNDARY_BOTTOM",92),l(c,"SIDEBAR_WIDTH",64),l(c,"RIGHT_MARGIN_VW",.02),l(c,"PADDLE_X_OFFSET",30),l(c,"BALL_SCALING_FACTOR",.0088),l(c,"DEFAULT_LEFT_PLAYER","Erik"),l(c,"DEFAULT_RIGHT_PLAYER","Simon");var G=(t=>(t.MOVE_LEFT_UP="w",t.MOVE_LEFT_DOWN="s",t.MOVE_RIGHT_UP="ArrowUp",t.MOVE_RIGHT_DOWN="ArrowDown",t.PAUSE=" ",t))(G||{});class st{constructor(e){l(this,"keys",{w:!1,s:!1,ArrowUp:!1,ArrowDown:!1," ":!1});l(this,"onPauseToggle");this.onPauseToggle=e,this.setupEventListeners()}setupEventListeners(){document.addEventListener("keydown",e=>{var s;const n=this.getKeyFromEvent(e);n&&(n===" "&&!this.keys[" "]&&((s=this.onPauseToggle)==null||s.call(this)),this.keys[n]=!0)}),document.addEventListener("keyup",e=>{const n=this.getKeyFromEvent(e);n&&(this.keys[n]=!1)})}getKeyFromEvent(e){const n=e.key.toLowerCase();return n==="w"||n==="s"?n:e.key==="ArrowUp"||e.key==="ArrowDown"?e.key:e.key===" "?" ":null}isPressed(e){return this.keys[e]}getKeyState(){return{...this.keys}}}var k=(t=>(t.LEFT="left",t.RIGHT="right",t))(k||{});class it{constructor(){l(this,"leftAI",{target:50,lastUpdate:0,isEnabled:!0});l(this,"rightAI",{target:50,lastUpdate:0,isEnabled:!0})}enableAI(e){e==="left"?this.leftAI.isEnabled=!0:this.rightAI.isEnabled=!0}disableAI(e){(e==="left"||!e)&&(this.leftAI.isEnabled=!1),(e==="right"||!e)&&(this.rightAI.isEnabled=!1)}isEnabled(e){return e==="left"?this.leftAI.isEnabled:this.rightAI.isEnabled}getTarget(e){return e==="left"?this.leftAI.target:this.rightAI.target}updateAI(e,n){const s=e.directionX;if(this.leftAI.isEnabled&&s<0&&n-this.leftAI.lastUpdate>=c.AI_UPDATE_COOLDOWN){const i=this.predictBallLanding(e,"left");Math.abs(i-this.leftAI.target)>c.AI_TARGET_THRESHOLD&&(this.leftAI.target=i,this.leftAI.lastUpdate=n)}if(this.rightAI.isEnabled&&s>0&&n-this.rightAI.lastUpdate>=c.AI_UPDATE_COOLDOWN){const i=this.predictBallLanding(e,"right");Math.abs(i-this.rightAI.target)>c.AI_TARGET_THRESHOLD&&(this.rightAI.target=i,this.rightAI.lastUpdate=n)}}predictBallLanding(e,n){const s=e.x*1e3,i=e.y*1e3,o=e.directionX*1e3,a=e.directionY*1e3,r=window.innerWidth-c.SIDEBAR_WIDTH-window.innerWidth*c.RIGHT_MARGIN_VW,d=c.PADDLE_X_OFFSET,h=r-c.PADDLE_X_OFFSET,u=r/2,p=window.innerWidth*c.BALL_SCALING_FACTOR,f=((d-u)/p+50)*1e3,E=((h-u)/p+50)*1e3,x=n==="left"?f:E;return n==="left"&&o>=0||n==="right"&&o<=0?50:this.simulateBallTrajectoryGeometric(s,i,o,a,x)/1e3}simulateBallTrajectoryGeometric(e,n,s,i,o){let a=e,r=n,d=s,h=i;const u=c.GAME_AREA_TOP_PERCENT*1e3,p=c.GAME_AREA_BOTTOM_PERCENT*1e3,f=c.PADDLE_BOUNDARY_TOP*1e3,E=c.PADDLE_BOUNDARY_BOTTOM*1e3;let x=0;for(;x<c.AI_MAX_SIMULATION_STEPS;){if(Math.abs(d)<1||(o-a)/d<=0)return Math.max(f,Math.min(E,r));const I=(o-a)*(h/d),M=r+I;if(M<u&&h<0){const y=u-r;a=a+y*(d/h),r=u,h*=-1,h<0?h-=100:h+=100}else if(M>p&&h>0){const y=p-r;a=a+y*(d/h),r=p,h*=-1,h<0?h-=100:h+=100}else return Math.max(f,Math.min(E,M));x++}return Math.max(f,Math.min(E,r))}}var z=(t=>(t[t.CONTINUE=0]="CONTINUE",t[t.LEFT_WINS=1]="LEFT_WINS",t[t.RIGHT_WINS=2]="RIGHT_WINS",t[t.LEFT_SCORES=3]="LEFT_SCORES",t[t.RIGHT_SCORES=4]="RIGHT_SCORES",t))(z||{});class ot{constructor(e,n,s=c.MAX_SCORE){l(this,"leftPlayerScoreElem");l(this,"rightPlayerScoreElem");l(this,"scores",{left:0,right:0});l(this,"maxScore");this.leftPlayerScoreElem=e,this.rightPlayerScoreElem=n,this.maxScore=s,this.updateDisplay()}addScore(e){return e==="left"?this.scores.left++:this.scores.right++,this.updateDisplay(),this.scores.left>=this.maxScore?1:this.scores.right>=this.maxScore?2:e==="left"?3:4}reset(){this.scores={left:0,right:0},this.updateDisplay()}getScores(){return{...this.scores}}getScoreString(){return`${this.scores.left} - ${this.scores.right}`}updateDisplay(){this.leftPlayerScoreElem.textContent=this.scores.left.toString(),this.rightPlayerScoreElem.textContent=this.scores.right.toString()}}class C{constructor(e,n,s,i,o,a,r){l(this,"pauseOverlay");l(this,"pauseBtn");l(this,"playBtn");l(this,"gameArea");l(this,"leftPlayer");l(this,"rightPlayer");l(this,"onPauseToggle");this.pauseOverlay=e,this.pauseBtn=n,this.playBtn=s,this.gameArea=i,this.leftPlayer=o,this.rightPlayer=a,this.onPauseToggle=r,this.setupEventListeners()}setupEventListeners(){this.pauseBtn.addEventListener("click",()=>{var e;(e=this.onPauseToggle)==null||e.call(this)}),this.playBtn.addEventListener("click",()=>{var e;(e=this.onPauseToggle)==null||e.call(this)})}showPauseOverlay(){this.pauseOverlay.classList.remove("hidden"),this.gameArea.classList.add("blur-[9px]")}hidePauseOverlay(){this.pauseOverlay.classList.add("hidden"),this.gameArea.classList.remove("blur-[9px]")}setPlayerNames(e,n){this.leftPlayer.textContent=e,this.rightPlayer.textContent=n}static getElement(e){const n=document.getElementById(e);if(!n)throw new Error(`Required DOM element with id "${e}" not found`);return n}}class De{constructor(e){l(this,"options");l(this,"gameId");l(this,"isPaused",!1);l(this,"gameOn",!1);l(this,"lastTime");l(this,"isGameActive",!0);l(this,"animationFrameId",null);l(this,"ball");l(this,"leftPlayerPaddle");l(this,"rightPlayerPaddle");l(this,"inputManager");l(this,"aiManager");l(this,"scoreManager");l(this,"uiManager");l(this,"ballElement");l(this,"leftPaddleElement");l(this,"rightPaddleElement");l(this,"onFinishCallback");e!=null&&e.maxScore&&(c.MAX_SCORE=e.maxScore),e!=null&&e.aiDifficulty&&(c.AI_UPDATE_COOLDOWN=e.aiDifficulty),this.gameId=`game-${Date.now()}-${Math.random().toString(36).substr(2,9)}`,console.log(`🎮 Creating new Game instance: ${this.gameId}`),this.options={leftPlayer:(e==null?void 0:e.leftPlayer)||c.DEFAULT_LEFT_PLAYER,rightPlayer:(e==null?void 0:e.rightPlayer)||c.DEFAULT_RIGHT_PLAYER,maxScore:(e==null?void 0:e.maxScore)||c.MAX_SCORE,gameMode:(e==null?void 0:e.gameMode)||"p-vs-p",onFinish:(e==null?void 0:e.onFinish)||void 0,aiDifficulty:(e==null?void 0:e.aiDifficulty)||c.AI_UPDATE_COOLDOWN},this.onFinishCallback=(e==null?void 0:e.onFinish)||null,this.initializeDOM(),this.initializeManagers(),this.initializeGameObjects(),this.setupDebugFunctions()}initializeDOM(){this.ballElement=C.getElement("ball"),this.leftPaddleElement=C.getElement("left-paddle"),this.rightPaddleElement=C.getElement("right-paddle")}initializeManagers(){const e=C.getElement("left-score"),n=C.getElement("right-score"),s=C.getElement("left-player"),i=C.getElement("right-player"),o=C.getElement("pause-overlay"),a=C.getElement("pause-btn"),r=C.getElement("play-btn"),d=C.getElement("game-area");this.inputManager=new st(()=>this.togglePause()),this.aiManager=new it,this.scoreManager=new ot(e,n,this.options.maxScore),this.uiManager=new C(o,a,r,d,s,i,()=>this.togglePause()),this.configureGameMode(),this.uiManager.setPlayerNames(this.options.leftPlayer,this.options.rightPlayer)}configureGameMode(){switch(this.options.gameMode){case"p-vs-ai":this.options.rightPlayer="ChatGPT",this.options.leftPlayer=w.otherPlayer,this.aiManager.disableAI(k.LEFT);break;case"ai-vs-p":this.options.leftPlayer="Gemini",this.aiManager.disableAI(k.RIGHT);break;case"p-vs-p":this.aiManager.disableAI(k.LEFT),this.aiManager.disableAI(k.RIGHT);break;case"ai-vs-ai":this.options.leftPlayer="ChatGPT",this.options.rightPlayer="Gemini";break}}initializeGameObjects(){this.ball=new et(this.ballElement),this.leftPlayerPaddle=new ue(this.leftPaddleElement),this.rightPlayerPaddle=new ue(this.rightPaddleElement)}togglePause(){this.isPaused=!this.isPaused,this.isPaused?this.uiManager.showPauseOverlay():this.uiManager.hidePauseOverlay()}setGameOn(){this.gameOn=!0}enableAILeft(){this.aiManager.enableAI(k.LEFT)}enableAIRight(){this.aiManager.enableAI(k.RIGHT)}disableAI(){this.aiManager.disableAI()}resetGame(){this.scoreManager.reset(),this.leftPlayerPaddle.reset(),this.rightPlayerPaddle.reset(),this.ball.reset(),this.isPaused=!1,w.gameController=!1}stopGame(){console.log(`🛑 Stopping Game instance: ${this.gameId}`),this.isGameActive=!1,this.gameOn=!1,this.isPaused=!0,this.animationFrameId!==null&&(cancelAnimationFrame(this.animationFrameId),this.animationFrameId=null,console.log(`🎬 Cancelled animation frame for Game: ${this.gameId}`)),this.lastTime=void 0,this.resetGame()}get gameAreaTop(){return c.GAME_AREA_TOP_PERCENT}get gameAreaBottom(){return c.GAME_AREA_BOTTOM_PERCENT}get getBall(){return this.ball}get getLeftPaddle(){return this.leftPlayerPaddle}get getRightPaddle(){return this.rightPlayerPaddle}setupDebugFunctions(){window.enableAILeft=()=>this.enableAILeft(),window.enableAIRight=()=>this.enableAIRight(),window.disableAI=()=>this.disableAI()}start(){console.log(`▶️ Starting Game instance: ${this.gameId}`);const e=n=>{if(!this.isGameActive||!w.noWinner||!this.gameOn){console.log(`⏹️ Game loop stopping for Game: ${this.gameId} (isActive: ${this.isGameActive}, noWinner: ${w.noWinner}, gameOn: ${this.gameOn})`),window.addEventListener("popstate",s=>{Q(),v.navigate("home"),console.log("History changed:",s.state)}),this.resetGame(),this.animationFrameId=null;return}if(this.lastTime!=null){const s=n-this.lastTime;if(s<c.FRAME_RATE_LIMIT){this.animationFrameId=window.requestAnimationFrame(e);return}this.isPaused||(this.ball.update(s,this.leftPlayerPaddle,this.rightPlayerPaddle),this.aiManager.updateAI(this.ball,n),this.updateLeftPlayerPaddle(s),this.updateRightPlayerPaddle(s),this.isLose()&&(console.log(`⚽ Ball lost in Game: ${this.gameId}`),this.handleLose()))}this.lastTime=n,this.animationFrameId=window.requestAnimationFrame(e)};this.animationFrameId=window.requestAnimationFrame(e)}updateLeftPlayerPaddle(e){if(this.aiManager.isEnabled(k.LEFT)){const n=this.leftPlayerPaddle.position,i=this.aiManager.getTarget(k.LEFT)-n;if(Math.abs(i)>c.AI_MOVEMENT_THRESHOLD){const o=i>0?1:-1,a=n+o*c.PADDLE_SPEED*e;this.leftPlayerPaddle.position=Math.max(c.PADDLE_BOUNDARY_TOP,Math.min(c.PADDLE_BOUNDARY_BOTTOM,a))}return}this.inputManager.isPressed(G.MOVE_LEFT_UP)?this.leftPlayerPaddle.position=Math.max(c.PADDLE_BOUNDARY_TOP,this.leftPlayerPaddle.position-c.PADDLE_SPEED*e):this.inputManager.isPressed(G.MOVE_LEFT_DOWN)&&(this.leftPlayerPaddle.position=Math.min(c.PADDLE_BOUNDARY_BOTTOM,this.leftPlayerPaddle.position+c.PADDLE_SPEED*e))}updateRightPlayerPaddle(e){if(this.aiManager.isEnabled(k.RIGHT)){const n=this.rightPlayerPaddle.position,i=this.aiManager.getTarget(k.RIGHT)-n;if(Math.abs(i)>c.AI_MOVEMENT_THRESHOLD){const o=i>0?1:-1,a=n+o*c.PADDLE_SPEED*e;this.rightPlayerPaddle.position=Math.max(c.PADDLE_BOUNDARY_TOP,Math.min(c.PADDLE_BOUNDARY_BOTTOM,a))}return}this.inputManager.isPressed(G.MOVE_RIGHT_UP)?this.rightPlayerPaddle.position=Math.max(c.PADDLE_BOUNDARY_TOP,this.rightPlayerPaddle.position-c.PADDLE_SPEED*e):this.inputManager.isPressed(G.MOVE_RIGHT_DOWN)&&(this.rightPlayerPaddle.position=Math.min(c.PADDLE_BOUNDARY_BOTTOM,this.rightPlayerPaddle.position+c.PADDLE_SPEED*e))}isLose(){const e=this.ball.rect(),n=c.SIDEBAR_WIDTH,s=window.innerWidth-window.innerWidth*c.RIGHT_MARGIN_VW;return e.right>=s||e.left<=n}handleLose(){const e=this.ball.rect(),n=window.innerWidth-window.innerWidth*c.RIGHT_MARGIN_VW;let s;if(e.right>=n?s=this.scoreManager.addScore("left"):s=this.scoreManager.addScore("right"),s===z.LEFT_WINS||s===z.RIGHT_WINS){this.isPaused=!0;const i=s===z.LEFT_WINS?this.options.leftPlayer:this.options.rightPlayer;if(this.onFinishCallback){const o=this.scoreManager.getScores();this.isGameActive=!1,this.gameOn=!1,this.resetGame(),this.onFinishCallback(i,o.left,o.right)}}this.ball.reset()}}async function V(t,e){const n={service:"tournament-service",level:"INFO",event_type:t,timestamp:new Date().toISOString(),...e};try{await fetch("http://localhost:5051",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)})}catch{console.log("LOG (fallback):",n)}}function at(){return`
    <div id="gameHistorySubmenu" class="submenu h-screen w-full top-0 bg-[#fbd11b] flex items-center flex-col max-h-0 transition-[max-height] duration-450 z-50 space-y-5">
      ${ce("backBtnGameHistorySubmenu")}
      <p id="gameHistorySubmenuName" class="font-bold text-center pt-5">Game History</p>
      <hr class="w-full border-t-1.5 border-black" />
      <div id="gameHistoryContainer" class="flex flex-col w-[90%] space-y-5">
      </div>
    </div>
  `}function rt(t){return`
    <div class="flex flex-col rounded-2xl w-full space-y-2 shadow-base shadow-gray-600 px-5 py-3 bg-black">
      <div class="flex w-full justify-between items-center text-white text-sm">
        <!-- User -->
        <div class="flex flex-col items-start">
          <span class="font-semibold">${t.player1}</span>
          <span class="text-xs text-gray-400">Score: ${t.scorePlayer1}</span>
        </div>

        <!-- VS & date -->
        <div class="flex flex-col items-center">
          <span class="font-bold">VS</span>
          <span class="text-xs text-gray-400">${t.finished_at}</span>
        </div>

        <!-- Opponent -->
        <div class="flex flex-col items-end">
          <span class="font-semibold">${t.player2}</span>
          <span class="text-xs text-gray-400">Score: ${t.scorePlayer2}</span>
        </div>
      </div>
    </div>
  `}async function Ae(t,e){var n,s,i;console.log(`
				player1: ${e.player1.alias},
				player2: ${e.player2.alias},
				scorePlayer1: ${e.player1.score},
				scorePlayer2: ${e.player2.score},
				winner: ${(n=e.winner)==null?void 0:n.alias},
				gameMode: ${t},
			`),t=="p-vs-ai"&&e.player1.alias==""&&(e.player1.alias=e.player2.alias,e.player2.alias="AI");try{console.log(`
				player1: ${e.player1.alias},
				player2: ${e.player2.alias},
				scorePlayer1: ${e.player1.score},
				scorePlayer2: ${e.player2.score},
				winner: ${(s=e.winner)==null?void 0:s.alias},
				gameMode: ${t},
			`),fetch("/api/auth/games/matches",{method:"POST",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify({player1:e.player1.alias,player2:e.player2.alias,scorePlayer1:e.player1.score??0,scorePlayer2:e.player2.score??0,winner:(i=e.winner)==null?void 0:i.alias,gameMode:t})})}catch(o){console.error("Game Fetch error:",o),m("Error with storing the game in historial.","popup"),v.navigate("home")}}async function lt(){try{const t=await fetch("/api/auth/games/nbMatchesPlayed",{credentials:"include"}).then(n=>n.json()),e={count:t.length,data:t};return console.log(e),e}catch(t){console.error("gameCurrentUserHasPlayedService error:",t),m("Error with storing the game in historial.","popup"),v.navigate("home")}}const ie=(()=>{let t=[];async function e(){console.log("entered in manageGameHistorial");const s=await lt();t=(s==null?void 0:s.data)??[];const i=document.getElementById("gameHistoryContainer");i&&(i.innerHTML=t.map(o=>rt(o)).join(""))}function n(){const s=document.getElementById("gameHistoryContainer");s&&(s.innerHTML=""),t=[]}return{main:e,reset:n}})();class dt{async iniciarTorneo(){var e,n,s,i,o,a,r,d,h,u,p,f;if(g!=null&&g.isReady()&&(g==null||g.generateMatches(),await this.jugarPartido(g.semifinal1,"semifinal"),_.updateBracket(g),this.mostrarVistaTorneo(),V("Semifinal",{tournament_id:"tourn-"+Date.now(),player1:(e=g==null?void 0:g.semifinal1)==null?void 0:e.player1.alias,player2:(n=g==null?void 0:g.semifinal1)==null?void 0:n.player2.alias,score1:(s=g==null?void 0:g.semifinal1)==null?void 0:s.player1.score,score2:(i=g==null?void 0:g.semifinal1)==null?void 0:i.player2.score}),await this.esperarClickDelUsuario(),await this.jugarPartido(g.semifinal2,"semifinal"),_.updateBracket(g),this.mostrarVistaTorneo(),V("Semifinal",{tournament_id:"tourn-"+Date.now(),player1:(o=g==null?void 0:g.semifinal2)==null?void 0:o.player1.alias,player2:(a=g==null?void 0:g.semifinal2)==null?void 0:a.player2.alias,score1:(r=g==null?void 0:g.semifinal2)==null?void 0:r.player1.score,score2:(d=g==null?void 0:g.semifinal2)==null?void 0:d.player2.score}),await this.esperarClickDelUsuario(),(h=g.semifinal1)!=null&&h.winner&&((u=g.semifinal2)!=null&&u.winner))){g.generateFinal(),await this.jugarPartido(g.finalMatch,"final");const E=g.finalMatch.winner;V("Final",{tournament_id:"tourn-"+Date.now(),player1:(p=g==null?void 0:g.finalMatch)==null?void 0:p.player1,player2:(f=g==null?void 0:g.finalMatch)==null?void 0:f.player2,winner:E.alias,scores:E.score}),g.setWinner(E),_.updateBracket(g),this.mostrarVistaTorneo(),_.showTournamentWinner(E.alias),Q()}}async esperarClickDelUsuario(){let e=document.getElementById("nextMatchBtn");e&&e.classList.remove("hidden");let n=document.getElementById("playtournamentBtn");return n&&n.classList.remove("inline-block"),new Promise(s=>{const i=document.getElementById("nextMatchBtn");if(!i){console.warn('Botón "Siguiente" no encontrado.'),s();return}const o=()=>{const a=document.querySelectorAll(".submenu");F(a),i.removeEventListener("click",o),s()};i.addEventListener("click",o)})}mostrarVistaTorneo(){const e=document.getElementById("esquemaTorneo"),n=document.getElementById("gameCanvasContainer");e&&(e.style.display="block"),n&&(n.style.display="none")}mostrarVistaJuego(){const e=document.getElementById("esquemaTorneo"),n=document.getElementById("gameCanvasContainer");e&&(e.style.display="none"),n&&(n.style.display="block")}jugarPartido(e,n){return new Promise(async s=>{if(!w.isCreatingGame){w.isCreatingGame=!0;try{w.currentGame&&(w.currentGame.stopGame(),w.currentGame=null,await new Promise(o=>setTimeout(o,50))),await _.showPreGame(e.player1.alias,e.player2.alias),await _.startCountdown(),this.mostrarVistaJuego(),v.navigate("tournament"),await new Promise(o=>setTimeout(o,100));const i=new De({leftPlayer:e.player1.alias,rightPlayer:e.player2.alias,maxScore:3,gameMode:"p-vs-p",onFinish:(o,a,r)=>{console.log(a,r),e.player1.score=a,e.player2.score=r,e.winner=e.player1.alias===o?e.player1:e.player2,Ae(n,e);const d=ke();e.winner.alias&&e.winner.alias!==void 0?d&&_.updateBracket(d):(Q(),v.navigate("home")),s()}});i.resetGame(),i.setGameOn(),i.start()}finally{w.isCreatingGame=!1}}})}}function ct(){return`
    <svg width="206" height="147" viewBox="0 0 206 147" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.00244 143.698C1.17401 143.698 0.502441 144.37 0.502441 145.198C0.502441 146.027 1.17401 146.698 2.00244 146.698V145.198V143.698ZM205.06 12.9925C205.646 12.4068 205.646 11.457 205.06 10.8712L195.515 1.32528C194.929 0.739496 193.979 0.739496 193.393 1.32528C192.807 1.91107 192.807 2.86082 193.393 3.4466L201.878 11.9319L193.393 20.4172C192.807 21.003 192.807 21.9527 193.393 22.5385C193.979 23.1243 194.929 23.1243 195.515 22.5385L205.06 12.9925ZM2.00244 145.198V146.698H81.0011V145.198V143.698H2.00244V145.198ZM105.001 121.198H106.501V35.9319H105.001H103.501V121.198H105.001ZM129.001 11.9319V13.4319H204V11.9319V10.4319H129.001V11.9319ZM105.001 35.9319H106.501C106.501 23.5055 116.575 13.4319 129.001 13.4319V11.9319V10.4319C114.918 10.4319 103.501 21.8486 103.501 35.9319H105.001ZM81.0011 145.198V146.698C95.0844 146.698 106.501 135.281 106.501 121.198H105.001H103.501C103.501 133.625 93.4275 143.698 81.0011 143.698V145.198Z" fill="#D9D9D9" fill-opacity="0.5"/>
    </svg>
	`}function ut(){return`
    <svg width="203" height="147" viewBox="0 0 203 147" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M200.653 3.38904C201.482 3.38904 202.153 2.71747 202.153 1.88904C202.153 1.06061 201.482 0.389038 200.653 0.389038V1.88904V3.38904ZM1.20204 134.871C0.616249 135.457 0.616249 136.407 1.20204 136.993L10.748 146.538C11.3338 147.124 12.2835 147.124 12.8693 146.538C13.4551 145.953 13.4551 145.003 12.8693 144.417L4.38402 135.932L12.8693 127.447C13.4551 126.861 13.4551 125.911 12.8693 125.325C12.2835 124.74 11.3338 124.74 10.748 125.325L1.20204 134.871ZM200.653 1.88904V0.389038H123.458V1.88904V3.38904H200.653V1.88904ZM99.4581 25.889H97.9581V111.932H99.4581H100.958V25.889H99.4581ZM75.4581 135.932V134.432H2.2627V135.932V137.432H75.4581V135.932ZM99.4581 111.932H97.9581C97.9581 124.358 87.8845 134.432 75.4581 134.432V135.932V137.432C89.5413 137.432 100.958 126.015 100.958 111.932H99.4581ZM123.458 1.88904V0.389038C109.375 0.389038 97.9581 11.8058 97.9581 25.889H99.4581H100.958C100.958 13.4626 111.032 3.38904 123.458 3.38904V1.88904Z" fill="#D9D9D9" fill-opacity="0.5"/>
    </svg>
  `}const ee={render(){return`
      <main id="tournamentArea" class="hidden flex-1 bg-black d-flex items-center justify-center bg-[url('/pongBackgroundPlay.png')] bg-no-repeat bg-cover bg-center w-full h-full" style="background-image: url('/pongBackgroundPlay.png');">
		<div id="tournamentAreaPopup" class="fixed top-4 right-4 bg-green-600 text-white px-4 py-3 rounded shadow-lg hidden z-50">
		</div>
		<div id="esquemaTorneo" class="hidden relative w-full min-h-screen bg-[#1a1a1a] text-white p-4 md:p-8 overflow-hidden">

    <div class="absolute top-4 left-5 md:top-4 z-7 left-[21%]">
        <h1 class="text-4xl md:text-5xl font-bold tracking-wider text-yellow-400/90">
            Tournament
        </h1>
    </div>

    <div class="absolute bottom-4 left-2 z-10 left-[21%] top-[46.5%]">
        <p class="mb-2 text-sm text-white/60">Semifinal 1</p>
        <div class="space-y-3">
            <div class="flex items-center justify-between w-52 p-2 border border-yellow-400/80 rounded bg-[#2a2a2a]">
                <input id="alias1" type="text" placeholder="login" class="bg-transparent focus:outline-none w-full text-white placeholder:text-white/70">
                <span id="alias1-point" class="pl-2 text-white/80">0</span>
            </div>
            <div class="flex items-center justify-between w-52 p-2 border border-yellow-400/80 rounded bg-[#2a2a2a]">
                <input id="alias2" type="text" placeholder="user 2" class="bg-transparent focus:outline-none w-full text-white placeholder:text-white/70">
                <span id="alias2-point" class="pl-2 text-white/80">0</span>
            </div>
        </div>
    </div>

    <div class="absolute top-4 right-4 z-10 flex flex-col items-end top-[13.5%] right-[21%]">
        <p class="mb-2 text-sm text-white/60">Semifinal 2</p>
        <div class="space-y-3">
            <div class="flex items-center justify-between w-52 p-2 border border-yellow-400/80 rounded bg-[#2a2a2a]">
                <input id="alias3" type="text" placeholder="user 3" class="bg-transparent focus:outline-none w-full text-white placeholder:text-white/70">
                <span id="alias3-point" class="pl-2 text-white/80">0</span>
            </div>
            <div class="flex items-center justify-between w-52 p-2 border border-yellow-400/80 rounded bg-[#2a2a2a]">
                <input id="alias4" type="text" placeholder="user 4" class="bg-transparent focus:outline-none w-full text-white placeholder:text-white/70">
                <span id="alias4-point" class="pl-2 text-white/80">0</span>
            </div>
        </div>
    </div>

    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-0 top-[47%]">
    
        <div class="relative bottom-0 right-[107%]">
             ${ct()}
        </div>
        
        <div class="absolute z-10 bottom-[76%]">
            <p class="mb-2 text-sm text-white/60 text-center">Final</p>
            <div class="space-y-3">
                <div class="flex items-center justify-between w-52 p-2 border border-yellow-400/80 rounded bg-[#2a2a2a]">
                    <span id="final1" class="text-white/70">---</span>
                    <span id="final1-point" class="pl-2 text-white/80">0</span>
                </div>
                <div class="flex items-center justify-between w-52 p-2 border border-yellow-400/80 rounded bg-[#2a2a2a]">
                    <span id="final2" class="text-white/70">---</span>
                    <span id="final2-point" class="pl-2 text-white/80">0</span>
                </div>
            </div>
        </div>

        <div class="absolute top-0 -translate-y-full top-[-18%] left-[107%]">
            ${ut()}
        </div>
    </div>
    <div class="absolute top-[62%] left-[70.5%]">
		<button id="playtournamentBtn" class="inline-block text-yellow-400 hover:text-black hover:bg-yellow-400 transition-colors duration-300 border border-[#fbd11b] rounded-lg my-4 p-2.75 font-bold w-40 text-xl mt-10">Play</button>
		<button id="nextMatchBtn" class="hidden text-yellow-400 hover:text-black hover:bg-yellow-400 transition-colors duration-300 border border-[#fbd11b] rounded-lg my-4 p-2.75 font-bold w-40 text-xl mt-10">Next</button>
		<button id="resetTournamentBtn" class="hidden text-yellow-400 hover:text-black hover:bg-yellow-400 transition-colors duration-300 border border-[#fbd11b] rounded-lg my-4 p-2.75 font-bold w-40 text-xl mt-10">Back to home</button>
    </div>
</div>
<div id="game-overlay" class="absolute inset-0 bg-black/80 flex-col items-center justify-center hidden z-50">
                    <!-- Pantalla Pre-Juego -->
                    <div id="pre-game-screen" class="text-center hidden">
                        <h2 id="player-vs-player" class="text-5xl md:text-7xl font-bold text-white animate-pulse"></h2>
                    </div>

                    <!-- Pantalla Cuenta Atrás -->
                    <div id="countdown-screen" class="text-center hidden">
                        <p id="countdown-text" class="text-9xl font-bold text-yellow-400"></p>
                    </div>

                    <!-- Pantalla de Ganador del Torneo -->
                    <div id="winner-screen" class="text-center hidden flex items-center flex-col">
                       <svg width="122" height="122" viewBox="0 0 122 122" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <mask id="mask0_176_1235" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="122" height="122">
                          <rect width="122" height="122" fill="#D9D9D9"/>
                          </mask>
                          <g mask="url(#mask0_176_1235)">
                          <path d="M27.8017 99.1249V93.3566H94.1977V99.1249H27.8017ZM27.5768 82.5355L20.4499 41.5079C20.0915 41.6443 19.7463 41.7256 19.4142 41.7519C19.0821 41.7781 18.7368 41.7913 18.3785 41.7913C16.7942 41.7913 15.453 41.244 14.355 40.1494C13.257 39.0556 12.708 37.7127 12.708 36.1208C12.708 34.5348 13.257 33.164 14.355 32.0084C15.453 30.8528 16.795 30.275 18.381 30.275C19.9662 30.275 21.3361 30.8528 22.4909 32.0084C23.6465 33.164 24.2243 34.5348 24.2243 36.1208C24.2243 36.6783 24.151 37.2201 24.0044 37.7462C23.857 38.2723 23.6207 38.7409 23.2953 39.1518L41.5165 46.9038L58.5063 23.6184C57.4837 23.1753 56.6691 22.4932 56.0625 21.5723C55.4567 20.6522 55.1538 19.6203 55.1538 18.4766C55.1538 16.8897 55.7312 15.5316 56.886 14.4023C58.0408 13.2729 59.4111 12.7083 60.9971 12.7083C62.5823 12.7083 63.9535 13.2721 65.1108 14.3997C66.2673 15.5274 66.8455 16.8829 66.8455 18.4664C66.8455 19.633 66.5426 20.6726 65.9369 21.585C65.3302 22.4975 64.5317 23.1753 63.5413 23.6184L80.4828 46.9038L98.704 39.1518C98.4177 38.7527 98.1915 38.2846 98.0254 37.7475C97.8585 37.2103 97.7751 36.6681 97.7751 36.1208C97.7751 34.5348 98.3291 33.164 99.4373 32.0084C100.545 30.8528 101.882 30.275 103.448 30.275C105.034 30.275 106.404 30.8528 107.559 32.0084C108.714 33.164 109.291 34.5348 109.291 36.1208C109.291 37.7077 108.713 39.0492 107.555 40.1455C106.398 41.2427 105.025 41.7913 103.435 41.7913C103.097 41.7913 102.78 41.757 102.483 41.6883C102.186 41.6197 101.869 41.5333 101.533 41.4291L94.4226 82.5355H27.5768ZM32.4936 76.7684H89.554L94.8432 47.2063L78.527 54.1374L60.9997 29.942L43.4723 54.1374L27.1561 47.2063L32.4936 76.7684Z" fill="#EDD24E"/>
                          </g>
                        </svg>
                        <p id="winner-name" class="text-6xl font-bold text-yellow-400 mt-2"></p>
                        <button id="showResumBtn" class="mt-8 px-6 py-2 border border-yellow-400 text-yellow-400 font-bold rounded hover:bg-yellow-400 hover:text-black transition-colors">
                            continue
                        </button>
                    </div>
                </div>
	 </main>
      `},init(){const t=document.getElementById("playtournamentBtn");let e=localStorage.getItem("login");const n=document.querySelector("#alias1");n&&(n.value=e||""),t==null||t.addEventListener("click",()=>{let s=document.getElementById("alias1").value,i=document.getElementById("alias2").value,o=document.getElementById("alias3").value,a=document.getElementById("alias4").value;i.trim()||(i="user2"),o.trim()||(o="user3"),a.trim()||(a="user4");const r=document.getElementById("alias2"),d=document.getElementById("alias3"),h=document.getElementById("alias4");if(r&&(r.value=i),d&&(d.value=o),h&&(h.value=a),!ke()){const x=new ze;x.addPlayer(s),x.addPlayer(i),x.addPlayer(o),x.addPlayer(a),We(x)}Ze()||Ye({player1:s,player2:i,partidoActivo:!0,onMatchEnd:(x,L,I)=>{console.log(`Match ended. Winner: ${x}, Scores: ${L} - ${I}`)}}),t.classList.add("hidden"),new dt().iniciarTorneo();const E=document.querySelectorAll(".submenu");F(E)})}};function gt(t,e){const n=document.getElementById(t),s=document.getElementById(e);if(n&&s){const i=n.value;n.value=s.value,s.value=i}}function ht(t,e){const n=document.getElementById(t),s=document.getElementById(e);if(!n||!s)return;const i=n.parentNode,o=n.nextSibling,a=s.nextSibling;o===s?i.insertBefore(s,n):a===n?i.insertBefore(n,s):(i.insertBefore(n,a),i.insertBefore(s,o))}function mt(){var a;const t=document.getElementById("oneVsOneBtn"),e=document.getElementById("gameArea"),n=document.getElementById("oneVsOneArea"),s=document.getElementById("oneVsAIArea"),i=document.getElementById("tournamentArea");t==null||t.addEventListener("click",()=>{e==null||e.classList.add("hidden"),n==null||n.classList.remove("hidden"),s==null||s.classList.add("hidden"),i==null||i.classList.add("hidden")}),(a=document.getElementById("swapBtn"))==null||a.addEventListener("click",()=>{gt("player1","player2")}),document.getElementById("playOneVsOneBtn").addEventListener("click",()=>{const r=document.getElementById("player1"),d=document.getElementById("player2");if(!r.value.trim()||!d.value.trim()){m("You need 2 players to play.","oneVsOneAreaPopup");return}w.gameType="p-vs-p",w.inGame=!0,v.navigate("game")})}function pt(){var r;const t=document.getElementById("oneVsAIBtn"),e=document.getElementById("gameArea"),n=document.getElementById("oneVsAIArea"),s=document.getElementById("oneVsOneArea"),i=document.getElementById("tournamentArea"),o=document.getElementById("esquemaTorneo");t==null||t.addEventListener("click",()=>{e==null||e.classList.add("hidden"),s==null||s.classList.add("hidden"),n==null||n.classList.remove("hidden"),i==null||i.classList.add("hidden"),o==null||o.classList.add("hidden")}),(r=document.getElementById("swapAIBtn"))==null||r.addEventListener("click",()=>{ht("player1VSAI","AIPlayer")}),document.getElementById("playOneVsAIBtn").addEventListener("click",()=>{if(!document.getElementById("player1VSAI").value.trim()){m("You need 1 player to play.","oneVsAIAreaPopup");return}w.gameType="p-vs-ai",w.inGame=!0,v.navigate("game")})}function ft(){const t=document.querySelectorAll(".submenu"),e=document.getElementById("playSidebarBtn");e==null||e.addEventListener("click",()=>{U("playSubmenu",t)})}function bt(){return`
	<div id="editProfileSubmenu" 
		class="submenu max-h-0 absolute left-[64px] top-0 w-48 h-screen bg-[#fbd11b] border border-black flex flex-col overflow-hidden transition-[max-height] duration-450 z-50">

		<!-- Header -->
		<div class="relative p-2 bg-[#fbd11b] border-b border-black py-5">
			<button id="backBtnEditProfileSubmenu"
				class="absolute top-2 left-2 hover:underline underline-offset-2 decoration-black flex items-center group">
				<svg xmlns="http://www.w3.org/2000/svg"
					class="w-4 h-4 text-black transition"
					fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
				</svg>
			</button>
			<p id="editProfileSubmenuName" class="font-bold text-center">
				Edit Profile
			</p>
		</div>

		<!-- Body -->
		<div id="editProfileFormContainer" class="flex flex-col h-full overflow-hidden">

			<div class="flex-1 overflow-y-auto py-4 space-y-4">
				<!-- Profile Picture -->
				<input type="file" id="uploadProfilePictureInput" accept="image/*" class="hidden">
				<button id="uploadPictureBtnEditProfile" 
					class="relative w-24 h-24 mx-auto bg-black rounded-full flex items-center justify-center border border-black hover:bg-[#fbd11b] transition">
					<svg id="uploadIconEditProfile" xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-[#fbd11b] group-hover:text-black transition" fill="currentColor" viewBox="0 0 24 24">
						<path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z"/>
					</svg>
					<span class="absolute bottom-0 right-0 bg-[#fbd11b] text-black rounded-full w-5 h-5 flex items-center justify-center text-xl font-bold group-hover:bg-black group-hover:text-[#fbd11b] transition shadow-md">+</span>
					<img id="previewProfilePictureEditProfile" class="absolute w-24 h-24 rounded-full object-cover hidden" />
				</button>

				<!-- Login / alias -->
				<div class="flex flex-col items-center space-y-2">
					<p>Login</p>
					<input id="loginEditProfile" type="text" placeholder="Change login"
						class="border border-black w-[80%] rounded-xl text-center placeholder-black/50 placeholder:text-sm h-[4vh]">
				</div>

				<!-- Mail -->
				<div id="editProfileChangeMail" class="flex flex-col items-center space-y-2">
					<p>Mail</p>
					<input id="changeMailEditProfile" type="text" placeholder="Change email"
						class="border border-black w-[80%] rounded-xl text-center placeholder-black/50 placeholder:text-sm h-[4vh]">
				</div>

				<!-- Password block -->
				<div id="editProfileChangePassword" class="flex flex-col items-center space-y-2">
					<p>Change password</p>
					<input id="currentPasswordEditProfile" type="password" placeholder="Current password"
						class="border border-black w-[80%] rounded-xl text-center placeholder-black/50 placeholder:text-sm h-[4vh]">
					<input id="changePasswordEditProfile" type="password" placeholder="New password"
						class="border border-black w-[80%] rounded-xl text-center placeholder-black/50 placeholder:text-sm h-[4vh]">
					<input id="repeatPasswordEditProfile" type="password" placeholder="Repeat password"
						class="border border-black w-[80%] rounded-xl text-center placeholder-black/50 placeholder:text-sm h-[4vh]">
				</div>

				<!-- 2FA -->
				<div id="editProfile2FA" class="flex flex-col items-center space-y-2">
					<p>Activate 2FA ?</p>
					<button id="2FAtoggleSwitch"
						class="relative w-12 h-6 flex items-center bg-gray-400 rounded-full p-1 transition-colors duration-300">
						<span class="w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300"></span>
					</button>
				</div>

				<!-- Anonymity -->
				<div class="flex flex-col items-center space-y-2">
					<p>Stay anonymous ?</p>
					<button id="anonymousToggleSwitch"
						class="relative w-12 h-6 flex items-center bg-gray-400 rounded-full p-1 transition-colors duration-300">
						<span class="w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300"></span>
					</button>
				</div>

				<!-- Save -->
				<div class="flex justify-center">
					<button id="saveBtnEditProfile" 
						class="font-bold rounded px-3 py-1 text-sm hover:bg-black hover:text-[#fbd11b] border border-black">
						Save
					</button>
				</div>
			</div>

			<!-- Footer: Erase -->
			<div class="p-3 border-t border-black bg-[#fbd11b] flex-shrink-0">
				<button id="eraseAccountBtn" class="w-full font-bold border rounded px-2 py-1 text-sm hover:bg-red-500">
					Erase account
				</button>
			</div>
		</div>
		<!-- Hidden 2FA container -->
		<div id="twofa-container" class="hidden flex-col justify-center items-center w-full space-y-10"><!-- Will be populated by TwoFAController --></div>
	</div>
	${yt()}

	`}function yt(){return`
	<div id="confirmPopup" class="hidden bg-[url('/pongBackgroundPlay.png')] bg-no-repeat bg-cover bg-center fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" style="background-image: url('/pongBackgroundPlay.png');">
		<div class="bg-white rounded-lg shadow-lg p-6 w-80">
			<p id="popupMessage" class="text-gray-800 text-center">Do you really want to delete your account ?</p>
			<p class="text-gray-800 text-center text-base mb-4">You will lose all your informations</p>
			<div class="flex justify-center space-x-4">
			<button id="popupYes" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">Yes</button>
			<button id="popupNo" class="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded">No</button>
			</div>
		</div>
	</div>
	`}async function vt(){var t,e,n,s,i,o;try{const a=await fetch("/api/auth/me",{credentials:"include"});if(!a.ok)throw new Error("Failed to load profile");const r=await a.json(),d=r.user;q(r.user);const h=document.getElementById("loginEditProfile");h&&(h.value=d.login??"");const u=document.getElementById("changeMailEditProfile"),p=document.getElementById("mailLabel");u&&(u.value=d.mail??"",d.provider==="google"&&(u.readOnly=!0,u.classList.add("bg-gray-200","cursor-not-allowed","text-gray-500"),p&&(p.textContent="Mail (Google-managed)")));const f=document.getElementById("previewProfilePictureEditProfile"),E=document.getElementById("uploadIconEditProfile");f&&E&&(d.profile_picture?(f.src=d.profile_picture,f.classList.remove("hidden"),E.classList.add("hidden")):(f.classList.add("hidden"),E.classList.remove("hidden")));const x=document.getElementById("2FAtoggleSwitch");x&&(d.is_2fa_activated?(x.classList.remove("bg-gray-400"),x.classList.add("bg-green-500"),(t=x.querySelector("span"))==null||t.classList.add("translate-x-6")):(x.classList.add("bg-gray-400"),x.classList.remove("bg-green-500"),(e=x.querySelector("span"))==null||e.classList.remove("translate-x-6")));const L=document.getElementById("anonymousToggleSwitch");L&&(d.GDPR_activated?(L.classList.remove("bg-gray-400"),L.classList.add("bg-green-500"),(n=L.querySelector("span"))==null||n.classList.add("translate-x-6")):(L.classList.add("bg-gray-400"),L.classList.remove("bg-green-500"),(s=L.querySelector("span"))==null||s.classList.remove("translate-x-6"))),d.provider==="google"&&((i=document.getElementById("editProfileChangePassword"))==null||i.classList.add("hidden"),(o=document.getElementById("editProfile2FA"))==null||o.classList.add("hidden"))}catch(a){console.error("Error loading profile:",a)}}const wt={render(t){return`
      <div class="flex flex-col justify-center items-center w-full space-y-10">
        <h2 class="text-white text-2xl font-bold mb-4">Two-Factor Authentication</h2>
        <p class="text-white mb-6">Enter verification code sent to ${t}</p>
        
        <form id="twofaForm" class="w-80">
          <input 
            type="text" 
            id="twofaCode" 
            class="w-80 inline-block text-white font-bold text-lg border border-[#fbd11b] rounded-lg p-2.75 mb-4"
            maxlength="6" 
            placeholder="6-digit code"
            inputmode="numeric"
            required
          >
          <button 
            type="submit" 
            id="verifyBtn" 
            class="w-80 inline-block text-white font-bold text-lg border border-[#fbd11b] rounded-lg p-2.75"
          >
            Verify
          </button>
        </form>

		<p id="twofaError" class="text-red-400 hidden mt-2"></p>
        
        <button 
          id="resendBtn" 
          class="text-white px-2 py-1 text-xl underline"
        >
          Resend Code
        </button>
      </div>
    `},showMessage(t,e){const n=t.querySelector(".twofa-message");n.textContent=e},showError(t,e){const n=t.querySelector("#twofaError");n.textContent=e,n.classList.remove("hidden")},clearError(t){const e=t.querySelector("#twofaError");e.textContent="",e.classList.add("hidden")},setButtonState(t,e){const n=t.querySelector("#verifyBtn");n.disabled=e,n.innerHTML=e?'<span class="spinner"></span> Verifying...':"Verify"}},xt={render(t){return`
    <div class="flex flex-col items-center w-full space-y-4 p-2">
      <h3 class="font-bold text-black text-lg">Verify 2FA</h3>
      <p class="text-black text-sm">Code sent to ${t}</p>
      <form id="twofaForm" class="w-full flex flex-col gap-2">
        <input type="text" id="twofaCode" maxlength="6" placeholder="6-digit code"
          class="w-full text-black border border-black rounded p-1 text-sm font-bold">
        <button type="submit" id="verifyBtn"
          class="w-full border border-black rounded p-1 font-bold hover:bg-black hover:text-[#fbd11b]">
          Verify
        </button>
      </form>
      <p id="twofaError" class="text-red-600 hidden text-sm"></p>
      <button id="resendBtn" class="underline text-black text-sm">Resend Code</button>
    </div>`},showMessage(t,e){const n=t.querySelector(".twofa-message");n.textContent=e},showError(t,e){const n=t.querySelector("#twofaError");n.textContent=e,n.classList.remove("hidden")},clearError(t){const e=t.querySelector("#twofaError");e.textContent="",e.classList.add("hidden")},setButtonState(t,e){const n=t.querySelector("#verifyBtn");n.disabled=e,n.innerHTML=e?'<span class="spinner"></span> Verifying...':"Verify"}},Z={async requestCode(t){const e=await fetch("/api/2fa/request",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:t}),credentials:"include"});if(!e.ok){const n=await e.json().catch(()=>({}));throw new Error(n.message||"Failed to send verification code")}},async verifyCode(t,e){const n=await fetch("/api/2fa/verify",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:t,token:e}),credentials:"include"}),s=await n.json();return n.ok?s:{...s,success:!1}}};class oe{constructor(e,n,s,i,o){l(this,"attempts",0);l(this,"maxAttempts",3);l(this,"email");l(this,"onSuccess");l(this,"container");l(this,"onFailure");l(this,"viewRender");this.email=e,this.onSuccess=n,this.container=s,this.onFailure=i,this.viewRender=o||wt}init(){const e=document.createElement("div");if(e.innerHTML=this.viewRender.render(this.email),!e.innerHTML.includes("twofaForm"))throw console.error("Template rendering failed!",{templateOutput:this.viewRender.render(this.email),container:this.container}),new Error("2FA template error");return this.container=e,this.setupEventListeners(e),console.log("[TwoFAController] init() setupEventListener done"),this.sendInitialCode(),e}async sendInitialCode(){console.log("Requesting initial 2FA code for:",this.email);try{await Z.requestCode(this.email),console.log("Initial 2FA code sent")}catch(e){console.error("Failed to send initial 2FA code:",e),this.showError("Could not send verification code")}}setupEventListeners(e){e.querySelector("#twofaForm").addEventListener("submit",async i=>{i.preventDefault();const o=e.querySelector("#twofaCode");await this.verifyCode(o.value.trim())}),e.querySelector("#resendBtn").addEventListener("click",()=>this.resendCode())}async verifyCode(e){if(!/^\d{6}$/.test(e)){this.showError("Please enter a valid 6-digit code");return}this.attempts++,console.log(`Attempt ${this.attempts}/${this.maxAttempts}`);try{const n=await Z.verifyCode(this.email,e);n.success?this.onSuccess():await this.handleFailedAttempt(n)}catch(n){console.error("Verification error:",n),await this.handleFailedAttempt()}}async handleFailedAttempt(e){const n=this.maxAttempts-this.attempts,s=n<=0;let i="Verification failed";if(e)try{i=e.message||i,console.log("Failure details:",e)}catch(o){console.error("Failed to parse error response:",o)}i+=s?". Maximum attempts reached.":` (${n} ${n===1?"attempt":"attempts"} remaining)`,console.log(`Attempt failed. Message: ${i}`),this.showError(`Attempt failed. Message: ${i}`),this.onFailure&&this.onFailure(i,s)}async resendCode(){console.log("Resending 2FA code to:",this.email);try{await Z.requestCode(this.email),this.showError("New code sent successfully")}catch(e){console.error("Resend failed:",e),this.showError("Failed to resend code")}}showError(e){console.log("Displaying error:",e);const n=this.container.querySelector("#twofaError");n&&(n.textContent=e,n.classList.remove("hidden"))}}async function Et(){try{const t=await fetch("/api/auth/me",{credentials:"include"});if(!t.ok)return console.error("Error fetching user info:",t.status);const e=await t.json();console.log("in reloadUserInfo, data = ",e),console.log(`reloadUserInfo
			id: ${e.user.id},
			login: ${e.user.login},
			email: ${e.user.mail},
			profile_picture: ${e.user.profile_picture}
		`),q(e.user),document.getElementById("mailInProfileSubmenu").textContent=e.user.mail}catch(t){console.error("Network error:",t)}}function Lt(){const t=document.getElementById("loginEditProfile"),e=document.getElementById("changeMailEditProfile"),n=document.getElementById("2FAtoggleSwitch"),s=document.getElementById("anonymousToggleSwitch"),i=document.getElementById("currentPasswordEditProfile"),o=document.getElementById("changePasswordEditProfile"),a=document.getElementById("repeatPasswordEditProfile");return{login:(t==null?void 0:t.value)??"",mail:(e==null?void 0:e.value)??"",is_2fa_activated:n!=null&&n.classList.contains("bg-green-500")?1:0,GDPR_activated:s!=null&&s.classList.contains("bg-green-500")?1:0,currentPassword:(i==null?void 0:i.value)??"",changePassword:(o==null?void 0:o.value)??"",repeatPassword:(a==null?void 0:a.value)??""}}async function Pt(){const t=de();if(!t)return m("Current user not loaded.","popup");const e=Lt();if(!e.login||!e.mail)return m("Login and mail cannot be empty.","popup");if((e.currentPassword||e.changePassword||e.repeatPassword)&&e.changePassword!==e.repeatPassword)return m("The new passwords are not the same.","popup");if(e.currentPassword&&!e.changePassword)return m("You have to insert a new password.","popup");if(e.mail&&!Ue(e.mail))return m("The mail format is not valid.","popup");const n={};let s=!1,i=!1;if(e.login!==t.login&&(n.login=e.login),t.provider!=="google"&&e.mail!==t.mail&&(n.mail=e.mail,i=!0),e.is_2fa_activated!==t.is_2fa_activated&&(n.is_2fa_activated=e.is_2fa_activated,e.is_2fa_activated===1&&(s=!0)),e.GDPR_activated!==t.GDPR_activated&&(n.GDPR_activated=e.GDPR_activated),e.currentPassword&&e.changePassword&&(n.currentPassword=e.currentPassword,n.changePassword=e.changePassword),Object.keys(n).length===0)return m("No changes detected.","popup");if(s)return It(t.mail,n);i&&console.log("A confirmation email will be sent to your new address."),await Me(n)}let O=null,A=null;function It(t,e){if(O=document.getElementById("editProfileFormContainer"),A=document.getElementById("twofa-container"),!O||!A){console.error("Missing containers for 2FA flow");return}A.innerHTML="",O.classList.add("hidden"),A.classList.remove("hidden");const n=new Date(Date.now()+5*60*1e3).toUTCString();if(document.cookie=`pending_2fa_edit=true; path=/; Expires=${n}; SameSite=Strict`,A.querySelector("*")===null){const i=new oe(t,async()=>{console.log("2FA success, saving profile..."),document.cookie="pending2FAEdit=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;",await Me(e),s()},A,(o,a)=>{m(o,"popup"),a&&(document.getElementById("currentPasswordEditProfile").value="",document.getElementById("changePasswordEditProfile").value="",document.cookie="pending2FAEdit=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;",s())},xt);A.appendChild(i.init())}function s(){A==null||A.classList.add("hidden"),O==null||O.classList.remove("hidden")}}async function Me(t){try{const e=await fetch("/api/auth/me",{method:"PUT",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}),n=await e.json();if(e.status===409)m(n.error,"popup");else if(e.status===400)m(n.error,"popup");else if(!e.ok)m(n.error||"Unexpected error","popup");else{N(n.message,3500,"popup");const s=de();s&&q({...s,...t}),Et()}}catch(e){console.error(e),m("Unexpected error while saving profile.","popup")}}async function Bt(t){console.log(`in checkFriendHasGDPRActivated friendId = ${t}`);const e=await fetch(`/api/auth/friends/${t}/GDPR`,{credentials:"include"}),n=await e.json();return e.status===409&&m(n.error,"popup"),n.GDPR_activated}async function Ct(){const t=await fetch("/api/auth/users/count",{method:"GET",credentials:"include"}),{total:e}=await t.json();return e}async function Te(t){return await fetch(`/api/auth/friends/${t}`,{method:"GET",credentials:"include"}).then(n=>n.json()).then(n=>n)}async function kt(t){fetch("/api/auth/friends",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({toUserId:t.id}),credentials:"include"})}async function he(){const t=await fetch("/api/auth/randomEligibleOtherUser",{method:"GET",credentials:"include"}).then(e=>e.status===204?null:e.json()).then(e=>e);return t||null}async function Se(){return await fetch("/api/auth/requestFriendExists",{credentials:"include"}).then(e=>e.json()).then(async e=>e.length)}async function _e(t){const e=await fetch("/api/auth/requestFriendExists",{credentials:"include"}).then(n=>n.json()).then(async n=>n);return await Te(e[t].from_user_id)}async function me(t,e,n){fetch("/api/auth/updateFriendshipStatus",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({currentUser:t,otherUser:e,status:n}),credentials:"include"})}async function Oe(){return(await fetch("/api/auth/getFriends",{method:"GET",credentials:"include"}).then(e=>e.json())).length}async function Dt(t){const e=de();if(!e)throw new Error("Current user not set");const n=await fetch("/api/auth/getFriends",{method:"GET",credentials:"include"}).then(i=>i.json());if(!n||t<0||t>=n.length)throw new Error("Invalid index || no friends found");const s=n[t].user_a_id===e.id?n[t].user_b_id:n[t].user_a_id;return await Te(s)}async function At(t){return(await(await fetch(`/api/auth/friends/${t}/online`,{method:"GET",credentials:"include"})).json()).success}async function pe(){const t=await Se();let e=0;for(;e<t;){const i=await _e(e);await Fe(i),e++}const n=await Oe();let s=0;for(;s<n;)Re(s),s++}async function Mt(){const t=document.getElementById("uploadPictureBtnEditProfile"),e=document.getElementById("uploadProfilePictureInput"),n=document.getElementById("previewProfilePicture"),s=document.getElementById("previewProfilePictureEditProfile"),i=document.getElementById("uploadIcon");return new Promise((o,a)=>{t.addEventListener("click",()=>{e.click()}),e.addEventListener("change",async()=>{var d;const r=(d=e.files)==null?void 0:d[0];if(!r){a();return}if(r.type.startsWith("image/")){const h=new FileReader;h.onload=u=>{const p=u.target.result;n.src=p,n.classList.remove("hidden"),s.src=p,s.classList.remove("hidden"),i.classList.add("hidden")},h.readAsDataURL(r)}await Ne(r),o()})})}async function Tt(){const t=document.getElementById("previewProfilePicture"),e=document.getElementById("previewProfilePictureEditProfile"),n=document.getElementById("uploadIcon"),s=document.getElementById("uploadPictureProfileSubmenu"),i=document.getElementById("uploadIconEditProfile"),o=document.getElementById("uploadPictureBtnEditProfile");try{const a=await fetch("/api/auth/me",{credentials:"include"});if(!a.ok)return;const r=await a.json();console.log(`data.user.provider = ${r.user.provider}`),r&&r.user&&r.user.profile_picture&&r.user.provider!=="google"?(console.log("provider not google"),t.src=`https://localhost:4443/${r.user.profile_picture}`,t.classList.remove("hidden"),e.src=`https://localhost:4443/${r.user.profile_picture}`,e.classList.remove("hidden"),n.classList.add("hidden")):(await te(t,r.user.profile_picture),await te(e,r.user.profile_picture),n.classList.add("hidden"),s.classList.remove("bg-black"),i.classList.add("hidden"),o.classList.remove("bg-black"))}catch(a){console.warn("Error: No image to load:",a)}}async function te(t,e){try{await new Promise((n,s)=>{t.onload=()=>n(),t.onerror=()=>s(new Error("Failed to load Google avatar")),t.src=e}),t.classList.remove("hidden")}catch(n){console.warn("Impossible to load Google default image",n),t.src="/basicGoogleImage.png",t.classList.remove("hidden")}}const X={render(t){return`
	<div id="newRequestsFrom_${t.id}" class="flex flex-col rounded-2xl w-full space-y-1 shadow-base shadow-gray-600 pr-5 pl-5 pt-2 pb-2 bg-black mb-2">
		<div class="flex items-center space-x-2">
			<img id="profilePictureFrom_${t.id}" class="w-10 h-10 rounded-full object-cover border border-black bg-[#fbd11b] text-black flex items-center justify-center text-xl font-bold group-hover:bg-black group-hover:text-[#fbd11b] transition shadow-md" />
			
			<div class="flex flex-col justify-center">
				<p id="requestedFriendUsername_${t.id}" class="font-bold text-sm text-[#fbd11b]">FriendUsername</p>
			</div>
		</div>

		<div class="flex justify-center space-x-2">
			<button id="acceptBtn_${t.id}" class="px-2 py-1 rounded-full border border-[#fbd11b] text-[#fbd11b] bg-black hover:bg-[#fbd11b] hover:text-black transition font-bold text-sm w-40">
				Accept
			</button>
			<button id="ignoreBtn_${t.id}" class="px-2 py-1 rounded-full border border-[#fbd11b] text-[#fbd11b] bg-black hover:bg-[#fbd11b] hover:text-black transition font-bold text-sm w-30">
				Ignore
			</button>
		</div>
	</div>
	`},async init(t){if(t){const e=await qe();q(e);const n=document.getElementById(`profilePictureFrom_${t.id}`);t.profile_picture&&t.profile_picture.startsWith("https://lh3.googleusercontent.com")?n.src=`${t.profile_picture}`:n.src=`https://localhost:4443/${t.profile_picture}`;const s=document.getElementById(`requestedFriendUsername_${t.id}`);s&&(s.textContent=t.login);const i=document.getElementById(`acceptBtn_${t.id}`),o=document.getElementById(`ignoreBtn_${t.id}`),a=document.getElementById(`newRequestsFrom_${t.id}`);i==null||i.addEventListener("click",async()=>{me(e,t,!0),ne(a),pe()}),o==null||o.addEventListener("click",async()=>{me(e,t,!1),ne(a),pe()})}}},J={render(t){return`
	<div id="friendBox_${t.id}" class="flex flex-col rounded-2xl w-full space-y-5 shadow-base shadow-gray-600 pr-5 pl-5 pt-2 pb-2 bg-black mb-2">
		<div class="flex items-center space-x-2">
			<img id="friendProfilePic_${t.id}" class="w-10 h-10 rounded-full object-cover border border-black bg-[#fbd11b] text-black flex items-center justify-center text-xl font-bold group-hover:bg-black group-hover:text-[#fbd11b] transition shadow-md" />
			<div class="space-x-2">
				<p id="friendUsername_${t.id}" class="font-bold text-sm text-[#fbd11b]">FriendUsername</p>
				<p id="friendMail_${t.id}" class="text-sm text-[#fbd11b]"></p>
				<hr class="w-55"/>
			</div>
			<div id="friendsStatus_${t.id}" class="top-1 right-1 w-3 h-3 rounded-full border border-black"></div>
		</div>
	</div>
  `},async init(t){const e=document.getElementById(`friendProfilePic_${t.id}`),n=document.getElementById(`friendUsername_${t.id}`),s=document.getElementById(`friendMail_${t.id}`),i=document.getElementById(`friendsStatus_${t.id}`),o=await At(t.id),a=await Bt(t.id);console.log(`isGPDRActivated = ${a}`),console.log(`isFriendConnected = ${o}`),o&&!a?(console.log("entered in green"),i==null||i.classList.add("bg-green-500")):!o&&!a?(console.log("entered in red"),i==null||i.classList.add("bg-red-500")):(console.log("entered in black"),i==null||i.classList.add("bg-black")),t.profile_picture&&t.profile_picture.startsWith("https://lh3.googleusercontent.com")?e.src=`${t.profile_picture}`:e.src=`https://localhost:4443/${t.profile_picture}`,n.textContent=t.login,a===0&&(s.textContent=t.mail)}},fe={render(t,e){return`
	<div id="${t}" class="flex flex-col rounded-2xl w-full space-y-1 shadow-base shadow-gray-600 px-5 py-2 bg-black mb-3 opacity-100 transition-opacity">
		<div class="flex items-center space-x-2">
			<img id="othersUsersPhoto_${e}" class="w-10 h-10 rounded-full object-cover border border-black bg-[#fbd11b] text-black flex items-center justify-center text-xl font-bold group-hover:bg-black group-hover:text-[#fbd11b] transition shadow-md" />
			
			<div class="flex flex-col justify-center">
				<p id="othersUsersUsername_${e}" class="font-bold text-sm text-[#fbd11b]">FriendUsername</p>
			</div>
		</div>

		<div class="flex justify-center space-x-2">
			<button id="addFriendBtn_${e}" class="px-2 py-1 rounded-full border border-[#fbd11b] text-[#fbd11b] bg-black hover:bg-[#fbd11b] hover:text-black transition font-bold text-sm w-full">
				Add as a friend
			</button>
		</div>
	</div>
  `},async init(t){const e=document.getElementById(`othersUsersUsername_${t.id}`);e&&(e.textContent=t.login);const n=document.getElementById(`othersUsersPhoto_${t.id}`);t.profile_picture&&t.profile_picture.startsWith("https://lh3.googleusercontent.com")?await te(n,t.profile_picture):n.src=`https://localhost:4443/${t.profile_picture}`;const s=document.getElementById(`addFriendBtn_${t.id}`),i=document.getElementById(`othersUsers_${t.id}_card`);s==null||s.addEventListener("click",async()=>{ne(i),N("Invitation sent",3500,"popup"),kt(t)})}};function St(){return`
	<div id="friendsSubmenu" class="submenu h-screen w-full top-0 bg-[#fbd11b] flex items-center flex-col max-h-0 transition-[max-height] duration-450 z-50 space-y-5 overflow-y-auto max-h-screen">
		${ce("backBtnFriendsSubmenu")}
		<p id="submenuFriendsName" class="font-bold text-center pt-5">Friends List</p>
		<hr class="w-full border-t-1.5 border-black" />
		<div id="friendRequestDiv" class="hidden w-[85%]">
			<p id="friendRequest" class="pl-4 self-start font-semibold text-sm">Friend Requests</p>
			<div id="friendRequestCard">
			</div>
		</div>
		<div id="friendsListDiv" class="hidden w-[85%]">
			<p id="friendsListP" class="pl-4 self-start font-semibold text-sm">Friends</p>
			<div id="friendsCard">
			</div>
		</div>
		<div id="othersUsersDiv" class="hidden w-[85%]">
			<p id="othersUsersP" class="pl-4 self-start font-semibold text-sm">Others Users</p>
			<div id="othersUsersCard">
			</div>
		</div>
	</div>
	`}function ne(t,e="duration-750"){if(!t)return;t.classList.remove("hidden","opacity-0"),t.classList.add("opacity-100","transition-opacity","duration-1000","ease-out"),t.offsetWidth,t.classList.remove("opacity-100"),t.classList.add("opacity-0"),setTimeout(()=>t.remove(),(e==="duration-1000"?1e3:300)+20)}async function Fe(t){var s;const e=document.getElementById("friendRequestDiv"),n=document.getElementById(`newRequestsFrom_${t.id}`);if(t)e==null||e.classList.remove("hidden"),n?await X.init(t):((s=document.getElementById("friendRequestCard"))==null||s.insertAdjacentHTML("beforeend",X.render(t)),await X.init(t));else{e==null||e.classList.remove("hidden");const i=document.getElementById("friendRequest");i.textContent="No Friend Request"}}const ae=(()=>{let t=0;async function e(){const s=await Se();for(;t<s;){const i=await _e(t);await Fe(i),t++}}function n(){t=0}return{main:e,reset:n}})();async function Re(t){var s;const e=document.getElementById("friendsListDiv"),n=await Dt(t);e&&(e.classList.remove("hidden"),document.getElementById(`friendBox_${n.id}`)?await J.init(n):((s=document.getElementById("friendsCard"))==null||s.insertAdjacentHTML("beforeend",J.render(n)),await J.init(n)))}const re=(()=>{let t=0;async function e(){const s=await Oe();for(;t<s;)Re(t),t++}function n(){t=0}return{main:e,reset:n}})(),le=(()=>{let t=0,e=0;async function n(){const i=document.getElementById("othersUsersDiv");i==null||i.classList.remove("hidden");const o=await Ct();if(o>1){let a=o-1>2?2:o-1;console.log(`max user is ${a}`);let r,d=[],h=0;for(;t<a;){if(r=await he(),r&&d.push(r),t>0)for(;r&&d[0].id===d[1].id;)d.pop(),r=await he(),r&&d.push(r),e>=o&&(r=null),e++;const u=document.getElementById("othersUsersCard"),p=document.getElementById("othersUsersP");if(r&&u){let f=`othersUsers_${r.id}_card`,E=r.id.toString();u.insertAdjacentHTML("beforeend",fe.render(f,E)),fe.init(r),p.textContent="Others Users",h++}else h==0&&(p.textContent="No others users to connect with");t++}}else{const a=document.getElementById("othersUsersP");a.textContent="You are the only player registered in the database. You can't connect with no one."}}function s(){t=0,e=0}return{main:n,reset:s}})();async function _t(){ae.main(),re.main(),le.main()}function Ot(t,e,n,s){const i=document.getElementById("backBtnFriendsSubmenu");i==null||i.addEventListener("click",()=>{F(t),U("profileSubmenu",t)}),e==null||e.classList.add("hidden"),n==null||n.classList.add("hidden"),s==null||s.classList.remove("hidden"),T("largeSubmenu"),T("friendsSubmenu"),_t()}async function Ft(){ae.reset(),re.reset(),le.reset(),ie.reset(),await fetch("/api/auth/me",{method:"DELETE",credentials:"include"})}function Rt(){const t=document.getElementById("saveBtnEditProfile");t==null||t.addEventListener("click",()=>{Pt()}),$t(),Ht(),Gt()}function $t(){const t=document.getElementById("2FAtoggleSwitch"),e=t.querySelector("span");t.addEventListener("click",()=>{const s=!t.classList.contains("bg-green-500");$e(t,e,s)})}function Ht(){const t=document.getElementById("anonymousToggleSwitch"),e=t.querySelector("span");t.addEventListener("click",async()=>{const s=!t.classList.contains("bg-green-500");$e(t,e,s)})}function $e(t,e,n){n?(t.classList.remove("bg-gray-400"),t.classList.add("bg-green-500"),e.classList.add("translate-x-6")):(t.classList.remove("bg-green-500"),t.classList.add("bg-gray-400"),e.classList.remove("translate-x-6"))}function Gt(){const t=document.getElementById("eraseAccountBtn"),e=document.getElementById("confirmPopup");t==null||t.addEventListener("click",()=>{e==null||e.classList.remove("hidden")});const n=document.getElementById("popupNo");n==null||n.addEventListener("click",()=>{e==null||e.classList.add("hidden")});const s=document.getElementById("popupYes");s==null||s.addEventListener("click",async()=>{await Ft(),await R(),v.navigate("home"),N("You have been disconnected and your account has been deleted",3500,"popup")})}const Vt=()=>B.iaDifficulty==="Easy"?1e3:B.iaDifficulty==="Medium"?100:1,B={iaDifficulty:"Easy",scoreLimit:"5"};function jt(){const t=document.getElementById("iaDifficultySliderInput"),e=document.getElementById("iaDifficultyValue"),n=document.getElementById("scoreLimitSliderInput"),s=document.getElementById("scoreLimitValue");B.iaDifficulty=ye(parseInt(t.value)),e.textContent=B.iaDifficulty,B.scoreLimit=be(parseInt(n.value)),s.textContent=B.scoreLimit,t.addEventListener("input",i=>{const o=parseInt(i.target.value);B.iaDifficulty=ye(o),e.textContent=B.iaDifficulty}),n.addEventListener("input",i=>{const o=parseInt(i.target.value);B.scoreLimit=be(o),s.textContent=B.scoreLimit})}function be(t){return t==1?"3":t==2?"5":"11"}function ye(t){return t==1?"Easy":t==2?"Medium":"Hard"}function Ut(t){const e=document.getElementById("dashboard-container");if(e){if(e.innerHTML=`
        <div class="bg-custom-yellow h-auto space-y-3.5 flex flex-col rounded-none w-full overflow-hidden mx-auto">        
        <p id="submenuFriendsName" class="font-bold text-center pt-5">Dashboard</p>
        <hr class="w-full border-t-1.5 border-black" />
        <div class="p-4 space-y-2">
        <div class="flex justify-between items-center px-1">
          <h2 id="username" class="text-base font-bold text-custom-black truncate"></h2>
        </div>
        <div class="grid grid-cols-2 gap-1">
          <div class="bg-custom-black rounded-xl p-1 text-center">
            <div class="bg-gray-700 rounded-full w-6 h-6 mx-auto flex items-center justify-center mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-custom-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <p id="total-won" class="text-base font-bold text-custom-white"></p>
            <p class="text-xs text-gray-400">Won</p>
          </div>
          <div class="bg-custom-black rounded-xl p-1 text-center">
            <div class="bg-gray-700 rounded-full w-6 h-6 mx-auto flex items-center justify-center mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-custom-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
            </div>
            <p id="total-lost" class="text-base font-bold text-custom-white"></p>
            <p class="text-xs text-gray-400">Lost</p>
          </div>
          <div class="bg-custom-black rounded-xl p-1 text-center">
            <div class="bg-gray-700 rounded-full w-6 h-6 mx-auto flex items-center justify-center mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-custom-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V7a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            </div>
            <p id="total-scores" class="text-base font-bold text-custom-white"></p>
            <p class="text-xs text-gray-400">Scores</p>
          </div>
          <div class="bg-custom-black rounded-xl p-1 text-center">
            <div class="bg-gray-700 rounded-full w-6 h-6 mx-auto flex items-center justify-center mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-custom-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            </div>
            <p id="total-friends" class="text-base font-bold text-custom-white"></p>
            <p class="text-xs text-gray-400">Friends</p>
          </div>
        </div>
        <div class="bg-custom-black rounded-2xl p-4">
          <h3 class="text-xl font-bold text-custom-white mb-4">Total Points</h3>
          <div id="bar-chart"></div>
          <div class="flex justify-center items-center space-x-6 mt-4">
            <div class="flex items-center space-x-2">
              <div class="w-3 h-3 rounded-full bg-custom-yellow"></div>
              <span class="text-sm text-gray-400">Scored</span>
            </div>
            <div class="flex items-center space-x-2">
              <div class="w-3 h-3 rounded-full bg-custom-white"></div>
              <span class="text-sm text-gray-400">Received</span>
            </div>
          </div>
        </div>
        <div class="bg-custom-black rounded-2xl p-4">
          <h3 class="text-xl font-bold text-custom-white mb-4">Wons & Lost</h3>
          <div id="donut-chart" class="relative"></div>
          <div class="flex justify-center items-center space-x-6 mt-4">
            <div class="flex items-center space-x-2">
              <div class="w-3 h-3 rounded-full bg-custom-yellow"></div>
              <span id="won-percentage" class="text-sm text-gray-400"></span>
            </div>
            <div class="flex items-center space-x-2">
              <div class="w-3 h-3 rounded-full bg-custom-white"></div>
              <span id="lost-percentage" class="text-sm text-gray-400"></span>
            </div>
          </div>
        </div>
        </div>
        </div>
    `,!document.getElementById("dashboard-custom-style")){const n=document.createElement("style");n.id="dashboard-custom-style",n.innerHTML=`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');
        body { font-family: 'Inter', sans-serif; background-color: #191A1A; }
        .bg-custom-yellow { background-color: #fbd11b; }
        .bg-custom-black { background-color: #191A1A; }
        .bg-custom-white { background-color: #D9D9D9; }
        .text-custom-yellow { color: #fbd11b; }
        .text-custom-white { color: #D9D9D9; }
        .fill-custom-yellow { fill: #fbd11b; }
        .fill-custom-white { fill: #D9D9D9; }
      `,document.head.appendChild(n)}if(window.d3)ve(t);else{const n=document.createElement("script");n.src="https://d3js.org/d3.v7.min.js",n.onload=()=>ve(t),document.head.appendChild(n)}}}function ve(t){document.getElementById("username").textContent=t.username,document.getElementById("total-won").textContent=String(t.stats.won),document.getElementById("total-lost").textContent=String(t.stats.lost),document.getElementById("total-scores").textContent=String(t.stats.scores),document.getElementById("total-friends").textContent=String(t.stats.friends);const e=[{label:"Received",value:t.points.received},{label:"Scored",value:t.points.scored}];Nt(e);const n=t.stats.won+t.stats.lost,s=n>0?Math.round(t.stats.won/n*100):0,i=100-s;qt([{label:"Won",value:s},{label:"Lost",value:i}]),document.getElementById("won-percentage").textContent=`Won ${s}%`,document.getElementById("lost-percentage").textContent=`Lost ${i}%`}function Nt(t){const e=window.d3;e.select("#bar-chart").html("");const n={top:20,right:20,bottom:20,left:40},s=300-n.left-n.right,i=150-n.top-n.bottom,o=e.select("#bar-chart").append("svg").attr("viewBox",`0 0 ${s+n.left+n.right} ${i+n.top+n.bottom}`).append("g").attr("transform",`translate(${n.left},${n.top})`),a=e.scaleLinear().domain([0,e.max(t,u=>u.value)*1.1]).range([i,0]),r=e.scaleBand().domain(t.map(u=>u.label)).range([0,s]).padding(.5),d=e.axisLeft(a).tickSize(-s).tickFormat(()=>"").ticks(3);o.append("g").attr("class","y-axis-grid").call(d).selectAll("line").attr("stroke","#4A5568"),o.selectAll(".domain").remove();const h=e.axisLeft(a).ticks(3);o.append("g").call(h).attr("color","#A0AEC0").selectAll(".domain, .tick line").remove(),o.selectAll(".bar").data(t).enter().append("rect").attr("class","bar").attr("x",u=>r(u.label)).attr("y",u=>a(u.value)).attr("width",r.bandwidth()).attr("height",u=>i-a(u.value)).attr("fill",u=>u.label==="Scored"?"#EDD24E":"#D9D9D9").attr("rx",6).attr("ry",6)}function qt(t){const e=window.d3;e.select("#donut-chart").html("");const n=200,s=200,i=Math.min(n,s)/2,o=30,a=e.scaleOrdinal().domain(t.map(u=>u.label)).range(["#EDD24E","#D9D9D9"]),r=e.select("#donut-chart").append("svg").attr("viewBox",`0 0 ${n} ${s}`).append("g").attr("transform",`translate(${n/2},${s/2})`),d=e.arc().innerRadius(i-o).outerRadius(i).cornerRadius(10),h=e.pie().value(u=>u.value).sort(null);r.selectAll("path").data(h(t)).enter().append("path").attr("d",d).attr("fill",u=>a(u.data.label))}let He=null;function q(t){He={...t}}function de(){return He}function ce(t){return`
    <button id="${t}" class="absolute top-1.5 left-1.5 flex items-center group z-50">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-black transition" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      <span class="text-xs font-semibold text-black group-hover:underline ml-1">Back</span>
    </button>
  `}function U(t,e){e.forEach(n=>{n.id===t?(n.classList.toggle("max-h-0"),n.classList.toggle("max-h-screen")):(n.classList.add("max-h-0"),n.classList.remove("max-h-screen"))})}function T(t){const e=document.getElementById(t);e&&(e.classList.remove("max-h-0"),e.classList.add("max-h-screen"))}function F(t){t.forEach(e=>{e.classList.add("max-h-0"),e.classList.remove("max-h-screen")})}const zt={username:"PlayerOne",stats:{won:12,lost:8,scores:230,friends:5},points:{scored:150,received:180}};function Wt(){Kt();const t=document.querySelectorAll(".submenu"),e=document.getElementById("friendsSubmenu"),n=document.getElementById("dashboardSubmenu"),s=document.getElementById("gameHistorySubmenu"),i=document.getElementById("DashboardBtn");i==null||i.addEventListener("click",()=>{e==null||e.classList.add("hidden"),s==null||s.classList.add("hidden"),n==null||n.classList.remove("hidden"),T("largeSubmenu"),T("dashboardSubmenu"),Ut(zt);const d=document.getElementById("backBtnDasboardSubmenu");d==null||d.addEventListener("click",()=>{F(t),U("profileSubmenu",t)})});const o=document.getElementById("friendsListBtn");o==null||o.addEventListener("click",()=>{Ot(t,n,s,e)});const a=document.getElementById("gameHistoryBtn"),r=document.getElementById("backBtnGameHistorySubmenu");r==null||r.addEventListener("click",()=>{console.log("clicked"),F(t),U("profileSubmenu",t)}),a==null||a.addEventListener("click",()=>{n==null||n.classList.add("hidden"),e==null||e.classList.add("hidden"),s==null||s.classList.remove("hidden"),T("largeSubmenu"),T("gameHistorySubmenu"),ie.main()}),Yt(),Rt()}function Yt(){const t=document.getElementById("profileSubmenu"),e=document.getElementById("editProfileSubmenu"),n=document.getElementById("profileSidebarBtn"),s=document.getElementById("editProfileBtn"),i=document.querySelectorAll(".submenu"),o=document.getElementById("backBtnEditProfileSubmenu");s==null||s.addEventListener("click",()=>{vt(),e==null||e.classList.add("max-h-screen"),e==null||e.classList.remove("max-h-0"),e==null||e.classList.remove("hidden"),o==null||o.addEventListener("click",()=>{e==null||e.classList.add("max-h-0"),e==null||e.classList.remove("max-h-screen")})}),n==null||n.addEventListener("click",()=>{const a=t==null?void 0:t.classList.contains("max-h-screen"),r=e==null?void 0:e.classList.contains("max-h-screen");a||r?i.forEach(d=>{d.classList.remove("max-h-screen"),d.classList.add("max-h-0")}):(U("profileSubmenu",i),e==null||e.classList.add("max-h-0"),e==null||e.classList.remove("max-h-screen"))})}function Zt(){const t=document.querySelectorAll(".submenu"),e=document.getElementById("settingsSidebarBtn"),n=document.getElementById("largeSubmenu"),s=document.getElementById("settingsSubmenu");e==null||e.addEventListener("click",()=>{s!=null&&s.classList.contains("max-h-screen")?(n==null||n.classList.add("max-h-0"),n==null||n.classList.remove("max-h-screen"),s.classList.add("max-h-0"),s.classList.remove("max-h-screen")):(F(t),T("largeSubmenu"),T("settingsSubmenu"))})}function Xt(){ft(),Wt(),Zt(),jt()}async function Jt(){const e=await(await fetch("/api/auth/me/status",{method:"GET",credentials:"include"})).json();return console.log("data.authenticated = ",e.authenticated),e.authenticated===!0}async function Kt(){const e=await(await fetch("/api/auth/me",{method:"GET",credentials:"include"})).json();q(e.user);const n=document.getElementById("profileName");n&&(n.textContent=e.user.login||"Profile Name");const s=document.getElementById("mailInProfileSubmenu");s&&(s.textContent=e.user.mail||"contact@mail.com");const i=document.getElementById("playerNameDashboard");i&&(i.textContent=e.user.login||"Username")}function Qt(){const t=document.getElementById("logoutSidebarBtn");if(!t){console.error("Logout button not found");return}t.addEventListener("click",async e=>{e.preventDefault();try{const n=await fetch("/api/auth/me/sessions",{method:"DELETE",credentials:"include"});if(!n.ok)throw new Error(`Logout failed: ${n.statusText}`);localStorage.removeItem("userState"),sessionStorage.clear(),ae.reset(),re.reset(),le.reset(),ie.reset(),v.navigate("home"),m("You have been disconnected","popup")}catch(n){console.error("Logout error:",n),v.navigate("home")}})}function en(){return`
	<div id="settingsSubmenu" class="submenu h-screen w-full absolute top-0 bg-[#fbd11b] flex flex-col overflow-hidden max-h-0 transition-[max-height] duration-450 z-50 space-y-5">
		<p id="submenuSettingsName" class="font-bold text-center pt-5">Game Settings</p>
		<hr class="w-full border-t-1.5 border-black" />
		<div class="flex items-center pt-5 w-full">
			<label for="iaDifficulty" class="font-bold basis-[40%] whitespace-nowrap text-sm pl-2 text-center">
				AI Difficulty
			</label>
			<input id="iaDifficultySliderInput" type="range" min="1" max="3" value="1"
				class="basis-[40%] h-1 rounded cursor-pointer" />
			<span id="iaDifficultyValue" class="font-bold basis-[20%] text-center font-mono">
				${B.iaDifficulty}
			</span>
		</div>
		<div class="flex items-center pt-5 w-full">
			<label for="scoreLimitSlider" class="font-bold basis-[40%] whitespace-nowrap text-sm pl-2 text-center">
				Score Limit
			</label>
			<input id="scoreLimitSliderInput" type="range" min="1" max="3" value="2"
				class="basis-[40%] h-1 rounded cursor-pointer" />
			<span id="scoreLimitValue" class="font-bold basis-[20%] text-center font-mono">
				${B.scoreLimit}
			</span>
		</div>
	</div>
	`}function tn(){return`
	<div id="sidebarLowPart" class="flex flex-col mt-auto items-center space-y-2 pb-6">
		<button id="logoutSidebarBtn" class="group mx-2 my-2 border border-black rounded-lg px-2 py-1 hover:bg-black transition">
		<svg xmlns="http://www.w3.org/2000/svg" 
			viewBox="0 0 24 24" 
			class="w-5 h-5 fill-black group-hover:fill-[#fbd11b] transition">
			<path d="M16 13v-2H7V8l-5 4 5 4v-3h9zm4-10H8a2 2 0 0 0-2 2v4h2V5h12v14H8v-4H6v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z"/>
		</svg>
		</button>
	</div>
	`}function nn(){return`
	<div id="profileSubmenu" class="submenu h-screen absolute left-[64px] top-0 w-48 bg-[#fbd11b] border border-black flex items-center flex-col overflow-hidden max-h-0 transition-[max-height] duration-450 z-50 space-y-3.5">
		<p id="submenuProfileName" class="font-bold text-center pt-5">Profile</p>
		<hr class="border-t-1.5 border-black w-full" />
		<input type="file" id="uploadProfilePictureInput" accept="image/*" class="hidden">
		<div id="uploadPictureProfileSubmenu" class="relative w-24 h-24 bg-black rounded-full flex items-center justify-center border border-black hover:border-black group hover:bg-[#fbd11b] transition">
			<svg id="uploadIcon" xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-[#fbd11b] group-hover:text-black transition" fill="currentColor" viewBox="0 0 24 24">
				<path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z"/>
			</svg>
			<img id="previewProfilePicture" class="absolute w-24 h-24 rounded-full object-cover hidden" />
		</div>
		<div class="flex flex-col items-center space-y-1 mx-2 px-2 w-full">
			<p id="profileName" class="font-bold">Profile Name</p>
			<p id="mailInProfileSubmenu" class="w-[99%] text-center overflow-hidden text-ellipsis whitespace-nowrap min-w-0 text-xs">contact@mail.com</p>
			<p id="statsInProfileSubmenu" class="text-gray-500 text-[13px] font-bold">12/15 matchs won</p>
		</div>
		<hr class="border-t-1 border-black w-20" />
		<button id="DashboardBtn" class="font-bold rounded px-2 py-1 text-sm hover:bg-black hover:text-[#fbd11b] w-fit">Dashboard</button>
		<hr class="border-t-1 border-black w-20" />
		<button id="friendsListBtn" class="font-bold rounded px-2 py-1 text-sm hover:bg-black hover:text-[#fbd11b] w-fit">Friends list</button>
		<hr class="border-t-1 border-black w-20" />
		<button id="gameHistoryBtn" class="font-bold rounded px-2 py-1 text-sm hover:bg-black hover:text-[#fbd11b] w-fit">Game History</button>
		<hr class="border-t-1 border-black w-20" />
		<button id="editProfileBtn" class="font-bold rounded px-2 py-1 text-sm hover:bg-black hover:text-[#fbd11b] w-fit">Edit Profile</button>
	</div>
	`}function sn(){return`
	<div id="playSubmenu" class="submenu h-screen absolute left-[64px] top-0 w-48 bg-[#fbd11b] border border-black flex items-center flex-col max-h-0 overflow-hidden transition-[max-height] duration-450 z-50 space-y-5">
		<p id="submenuName" class="font-bold text-center pt-5">Play</p>
		<hr class="w-full border-t-1.5 border-black" />
		<button id="oneVsOneBtn" class="font-bold rounded px-2 py-1 text-sm hover:bg-black hover:text-[#fbd11b] w-fit">1 vs 1</button>
		<hr class="border-t-1 border-black w-20" />
		<button id="oneVsAIBtn" class="font-bold rounded px-2 py-1 text-sm hover:bg-black hover:text-[#fbd11b] w-fit">1 vs AI</button>
		<hr class="border-t-1 border-black w-20" />
		<button id="tournamentBtn" class="font-bold rounded px-2 py-1 text-sm hover:bg-black hover:text-[#fbd11b] w-fit">Tournament</button>
	</div>
	`}function on(){return`
	<div id="dashboardSubmenu" class="submenu h-screen w-full top-0 bg-[#fbd11b] flex flex-col overflow-auto">
		${ce("backBtnDasboardSubmenu")}
		<div id="dashboard-container" class="flex-1"></div>
	</div>
	`}const we={currentUser:null,render(){return`
	<img src="/pong-logo.png" alt="PONG Logo" class="h-auto w-auto pl-2 pr-2 pt-2"/>

	<div class="flex flex-col mt-auto items-center space-y-2 pb-6">
		<button id="loginBtn" class="w-12 border border-black rounded-lg text-sm text-black font-semibold py-2 rounded hover:bg-black hover:text-yellow-400 transition">Login</button>
		<button id="registerBtn" class="w-full border border-black rounded-lg text-[0.825rem] text-black font-semibold py-2 rounded hover:bg-black hover:text-yellow-400 transition">Register</button>
	</div>
	 `},init(){document.getElementById("loginBtn").addEventListener("click",()=>{v.navigate("login")}),document.getElementById("registerBtn").addEventListener("click",()=>{v.navigate("register")})}},xe={currentUser:null,isLogin:!0,render(){return`
	<img src="/pong-logo.png" alt="PONG Logo" class="h-auto w-auto pl-2 pr-2 pt-2"/>

	<div id="sidebarMiddlePart" class="h-full flex flex-col items-center justify-center space-y-4">
		<button id="playSidebarBtn" data-target="playSubmenu" class="group mx-2 my-2 border border-black rounded-lg px-2 py-1 text-black text-sm hover:bg-black hover:text-[#fbd11b] transition">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" class="w-5 h-5 fill-black group-hover:fill-[#fbd11b] transition">
		<path d="M8 5v14l11-7z"/>
		</svg>
		</button>
		${sn()}

		<button id="profileSidebarBtn" data-target="profileSubmenu" class="group mx-2 my-2 border border-black rounded-lg px-2 py-1 text-black text-sm hover:bg-black hover:text-[#fbd11b] transition">
		<svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" class="w-5 h-5 fill-black group-hover:fill-[#fbd11b] transition">
		<path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z"/>
		</svg>
		</button>
		${nn()}

		<button id="settingsSidebarBtn" class="group mx-2 my-2 border border-black rounded-lg px-2 py-1 text-black text-sm hover:bg-black hover:text-[#fbd11b] transition">
		<svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" class="w-5 h-5 fill-black group-hover:fill-[#fbd11b] transition">
		<path d="M19.4 13c.04-.33.1-.66.1-1s-.06-.67-.1-1l2.1-1.65c.2-.16.25-.45.1-.67l-2-3.46a.504.504 0 0 0-.61-.22l-2.5 1c-.5-.38-1.05-.7-1.65-.94L14 2.5a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 0-.5.5L9.15 5c-.6.24-1.15.56-1.65.94l-2.5-1a.5.5 0 0 0-.61.22l-2 3.46a.5.5 0 0 0 .1.67L4.6 11c-.04.33-.1.66-.1 1s.06.67.1 1L2.5 14.65a.5.5 0 0 0-.1.67l2 3.46c.14.22.42.3.65.22l2.5-1c.5.38 1.05.7 1.65.94L10 21.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5l.35-2.35c.6-.24 1.15-.56 1.65-.94l2.5 1c.23.08.51 0 .65-.22l2-3.46a.5.5 0 0 0-.1-.67L19.4 13zM12 15.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z"/>
		</svg>
		</button>
		
	</div>
	${bt()}

	<div id="largeSubmenu" class="submenu h-screen absolute left-[64px] top-0 w-96 bg-[#fbd11b] border border-black flex flex-col overflow-hidden max-h-0 transition-[max-height] duration-450 z-50 space-y-5">
		${on()}
		${St()}
		${at()}
		${en()}
	</div>

	${tn()}
  `},init(){Xt();const t=document.getElementById("tournamentBtn");t==null||t.addEventListener("click",()=>{v.navigate("tournament")})}};async function R(){const t=await Jt(),e=document.getElementById("sidebar");t?(console.log("✅ Connected"),e.innerHTML=xe.render(),xe.init(),Qt(),Mt(),Tt()):(e.innerHTML=we.render(),we.init(),console.log("❌ Not connected"))}class Y{render(){return`

  <!-- Main container - remaining width -->
  <div class="flex-1 h-screen flex flex-col" style="background-color: #EDD24E;">
    <!-- Top yellow border - 2% -->
    <div class="h-[2vh]" style="background-color: #EDD24E;"></div>

    <!-- Middle section - 96% -->
    <div class="h-[96vh] flex relative">
      <!-- Game area with rounded corners -->
      <div id="game-area" class="flex-1 mr-[2vw] rounded-lg relative flex flex-col transition-all duration-300" style="background-color: #191A1A;">
        <!-- Game content wrapper -->
        <div id="game-content" class="absolute inset-0 rounded-lg">
          <!-- Center dotted line using simple HTML elements -->
          <div class="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 opacity-80 flex flex-col justify-around">
            <div class="h-2.5 bg-[#D9D9D9] rounded-sm"></div>
            <div class="h-2.5 bg-[#D9D9D9] rounded-sm"></div>
            <div class="h-2.5 bg-[#D9D9D9] rounded-sm"></div>
            <div class="h-2.5 bg-[#D9D9D9] rounded-sm"></div>
            <div class="h-2.5 bg-[#D9D9D9] rounded-sm"></div>
            <div class="h-2.5 bg-[#D9D9D9] rounded-sm"></div>
            <div class="h-2.5 bg-[#D9D9D9] rounded-sm"></div>
            <div class="h-2.5 bg-[#D9D9D9] rounded-sm"></div>
            <div class="h-2.5 bg-[#D9D9D9] rounded-sm"></div>
            <div class="h-2.5 bg-[#D9D9D9] rounded-sm"></div>
            <div class="h-2.5 bg-[#D9D9D9] rounded-sm"></div>
            <div class="h-2.5 bg-[#D9D9D9] rounded-sm"></div>
            <div class="h-2.5 bg-[#D9D9D9] rounded-sm"></div>
            <div class="h-2.5 bg-[#D9D9D9] rounded-sm"></div>
            <div class="h-2.5 bg-[#D9D9D9] rounded-sm"></div>
            <div class="h-2.5 bg-[#D9D9D9] rounded-sm"></div>
            <div class="h-2.5 bg-[#D9D9D9] rounded-sm"></div>
            <div class="h-2.5 bg-[#D9D9D9] rounded-sm"></div>
            <div class="h-2.5 bg-[#D9D9D9] rounded-sm"></div>
            <div class="h-2.5 bg-[#D9D9D9] rounded-sm"></div>
            <div class="h-2.5 bg-[#D9D9D9] rounded-sm"></div>
            <div class="h-2.5 bg-[#D9D9D9] rounded-sm"></div>
            <div class="h-2.5 bg-[#D9D9D9] rounded-sm"></div>
            <div class="h-2.5 bg-[#D9D9D9] rounded-sm"></div>
            <div class="h-2.5 bg-[#D9D9D9] rounded-sm"></div>
            <div class="h-2.5 bg-[#D9D9D9] rounded-sm"></div>
            <div class="h-2.5 bg-[#D9D9D9] rounded-sm"></div>
            <div class="h-2.5 bg-[#D9D9D9] rounded-sm"></div>
            <div class="h-2.5 bg-[#D9D9D9] rounded-sm"></div>
            <div class="h-2.5 bg-[#D9D9D9] rounded-sm"></div>
            <div class="h-2.5 bg-[#D9D9D9] rounded-sm"></div>
            <div class="h-2.5 bg-[#D9D9D9] rounded-sm"></div>
            <div class="h-2.5 bg-[#D9D9D9] rounded-sm"></div>
            <div class="h-2.5 bg-[#D9D9D9] rounded-sm"></div>
            <div class="h-2.5 bg-[#D9D9D9] rounded-sm"></div>
            <div class="h-2.5 bg-[#D9D9D9] rounded-sm"></div>
            <div class="h-2.5 bg-[#D9D9D9] rounded-sm"></div>
            <div class="h-2.5 bg-[#D9D9D9] rounded-sm"></div>
            <div class="h-2.5 bg-[#D9D9D9] rounded-sm"></div>
            <div class="h-2.5 bg-[#D9D9D9] rounded-sm"></div>
          </div>
          <!-- Score area at top -->
          <div class="flex justify-center items-center px-10 py-5 h-[20vh] z-10">
            <div class="flex flex-col items-center text-center w-1/2">
              <div class="text-lg font-bold mb-4 tracking-[2px]" style="color: #D9D9D9;" id="left-player">USER 1</div>
              <div class="text-6xl font-bold leading-none" style="color: #D9D9D9;" id="left-score">0</div>
            </div>
            <div class="flex flex-col items-center text-center w-1/2">
              <div class="text-lg font-bold mb-4 tracking-[2px]" style="color: #D9D9D9;" id="right-player">USER 2</div>
              <div class="text-6xl font-bold leading-none" style="color: #D9D9D9;" id="right-score">0</div>
            </div>
          </div>

          <!-- Game elements -->
          <div class="absolute top-1/2 left-1/2 w-4 h-4 rounded-full bg-[#D9D9D9]" id="ball"></div>
          <div class="absolute left-[30px] w-3 h-20 rounded-md -translate-y-1/2 bg-[#D9D9D9]" id="left-paddle"></div>
          <div class="absolute right-[30px] w-3 h-20 rounded-md -translate-y-1/2 bg-[#D9D9D9]" id="right-paddle"></div>
        </div>
      </div>
      
      <!-- Pause Overlay (positioned over the game area but outside to avoid blur) -->
      <div id="pause-overlay" class="absolute top-0 left-0 right-[2vw] bottom-0 flex items-center justify-center hidden z-30">
        <div class="flex space-x-8">
          <!-- Pause Button (Left) -->
          <button id="pause-btn" class="group w-20 h-20 bg-[#191A1A] border border-[#EDD24E] rounded-lg flex items-center justify-center hover:bg-[#191A1A] hover:bg-opacity-0 hover:border hover:border-[#EDD24E] transition-colors">
            <div class="flex space-x-1">
              <div class="w-2 h-8 bg-[#EDD24E] rounded-sm group-hover:bg-[#EDD24E] transition-colors"></div>
              <div class="w-2 h-8 bg-[#EDD24E] rounded-sm group-hover:bg-[#EDD24E] transition-colors"></div>
            </div>
          </button>
          
          <!-- Play Button (Right) -->
          <button id="play-btn" class="group w-20 h-20 bg-[#EDD24E] rounded-lg flex items-center justify-center hover:bg-[#191A1A] hover:bg-opacity-0 hover:border hover:border-[#EDD24E] transition-colors">
            <div class="w-0 h-0 border-l-[18px] border-[#191A1A] group-hover:border-l-[#EDD24E] border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent ml-1 transition-colors"></div>
          </button>
        </div>
      </div>
    </div>
    </div>
    <div class="h-[2vh]" style="background-color: #EDD24E;"></div>
  </div>
        `}winnerRender(){return`            
      <!-- Pantalla de Ganador del Torneo -->
      <div id="winner-screen" class="text-center hidden flex items-center flex-col">
          <svg width="122" height="122" viewBox="0 0 122 122" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0_176_1235" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="122" height="122">
            <rect width="122" height="122" fill="#D9D9D9"/>
            </mask>
            <g mask="url(#mask0_176_1235)">
            <path d="M27.8017 99.1249V93.3566H94.1977V99.1249H27.8017ZM27.5768 82.5355L20.4499 41.5079C20.0915 41.6443 19.7463 41.7256 19.4142 41.7519C19.0821 41.7781 18.7368 41.7913 18.3785 41.7913C16.7942 41.7913 15.453 41.244 14.355 40.1494C13.257 39.0556 12.708 37.7127 12.708 36.1208C12.708 34.5348 13.257 33.164 14.355 32.0084C15.453 30.8528 16.795 30.275 18.381 30.275C19.9662 30.275 21.3361 30.8528 22.4909 32.0084C23.6465 33.164 24.2243 34.5348 24.2243 36.1208C24.2243 36.6783 24.151 37.2201 24.0044 37.7462C23.857 38.2723 23.6207 38.7409 23.2953 39.1518L41.5165 46.9038L58.5063 23.6184C57.4837 23.1753 56.6691 22.4932 56.0625 21.5723C55.4567 20.6522 55.1538 19.6203 55.1538 18.4766C55.1538 16.8897 55.7312 15.5316 56.886 14.4023C58.0408 13.2729 59.4111 12.7083 60.9971 12.7083C62.5823 12.7083 63.9535 13.2721 65.1108 14.3997C66.2673 15.5274 66.8455 16.8829 66.8455 18.4664C66.8455 19.633 66.5426 20.6726 65.9369 21.585C65.3302 22.4975 64.5317 23.1753 63.5413 23.6184L80.4828 46.9038L98.704 39.1518C98.4177 38.7527 98.1915 38.2846 98.0254 37.7475C97.8585 37.2103 97.7751 36.6681 97.7751 36.1208C97.7751 34.5348 98.3291 33.164 99.4373 32.0084C100.545 30.8528 101.882 30.275 103.448 30.275C105.034 30.275 106.404 30.8528 107.559 32.0084C108.714 33.164 109.291 34.5348 109.291 36.1208C109.291 37.7077 108.713 39.0492 107.555 40.1455C106.398 41.2427 105.025 41.7913 103.435 41.7913C103.097 41.7913 102.78 41.757 102.483 41.6883C102.186 41.6197 101.869 41.5333 101.533 41.4291L94.4226 82.5355H27.5768ZM32.4936 76.7684H89.554L94.8432 47.2063L78.527 54.1374L60.9997 29.942L43.4723 54.1374L27.1561 47.2063L32.4936 76.7684Z" fill="#EDD24E"/>
            </g>
          </svg>
          <p id="winner-name" class="text-6xl font-bold text-yellow-400 mt-2"></p>
          <button id="showResumBtn" class="mt-8 px-6 py-2 border border-yellow-400 text-yellow-400 font-bold rounded hover:bg-yellow-400 hover:text-black transition-colors">
              continue
          </button>
      </div>
      `}renderGame(){return`
        <main id="gamesArea" class="hidden flex-1 bg-black d-flex items-center justify-center bg-[url('/pongBackgroundPlay.png')] bg-no-repeat bg-cover bg-center w-full h-full">
        
          <div id="winner-screen" class="text-center hidden flex items-center flex-col">
              <svg width="122" height="122" viewBox="0 0 122 122" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="mask0_176_1235" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="122" height="122">
                <rect width="122" height="122" fill="#D9D9D9"/>
                </mask>
                <g mask="url(#mask0_176_1235)">
                <path d="M27.8017 99.1249V93.3566H94.1977V99.1249H27.8017ZM27.5768 82.5355L20.4499 41.5079C20.0915 41.6443 19.7463 41.7256 19.4142 41.7519C19.0821 41.7781 18.7368 41.7913 18.3785 41.7913C16.7942 41.7913 15.453 41.244 14.355 40.1494C13.257 39.0556 12.708 37.7127 12.708 36.1208C12.708 34.5348 13.257 33.164 14.355 32.0084C15.453 30.8528 16.795 30.275 18.381 30.275C19.9662 30.275 21.3361 30.8528 22.4909 32.0084C23.6465 33.164 24.2243 34.5348 24.2243 36.1208C24.2243 36.6783 24.151 37.2201 24.0044 37.7462C23.857 38.2723 23.6207 38.7409 23.2953 39.1518L41.5165 46.9038L58.5063 23.6184C57.4837 23.1753 56.6691 22.4932 56.0625 21.5723C55.4567 20.6522 55.1538 19.6203 55.1538 18.4766C55.1538 16.8897 55.7312 15.5316 56.886 14.4023C58.0408 13.2729 59.4111 12.7083 60.9971 12.7083C62.5823 12.7083 63.9535 13.2721 65.1108 14.3997C66.2673 15.5274 66.8455 16.8829 66.8455 18.4664C66.8455 19.633 66.5426 20.6726 65.9369 21.585C65.3302 22.4975 64.5317 23.1753 63.5413 23.6184L80.4828 46.9038L98.704 39.1518C98.4177 38.7527 98.1915 38.2846 98.0254 37.7475C97.8585 37.2103 97.7751 36.6681 97.7751 36.1208C97.7751 34.5348 98.3291 33.164 99.4373 32.0084C100.545 30.8528 101.882 30.275 103.448 30.275C105.034 30.275 106.404 30.8528 107.559 32.0084C108.714 33.164 109.291 34.5348 109.291 36.1208C109.291 37.7077 108.713 39.0492 107.555 40.1455C106.398 41.2427 105.025 41.7913 103.435 41.7913C103.097 41.7913 102.78 41.757 102.483 41.6883C102.186 41.6197 101.869 41.5333 101.533 41.4291L94.4226 82.5355H27.5768ZM32.4936 76.7684H89.554L94.8432 47.2063L78.527 54.1374L60.9997 29.942L43.4723 54.1374L27.1561 47.2063L32.4936 76.7684Z" fill="#EDD24E"/>
                </g>
              </svg>
              <p id="winner-name" class="text-6xl font-bold text-yellow-400 mt-2"></p>
          </div>
        </main>
      `}}const b=class b{renderGameCanvas(){let e=document.getElementById("gamesArea"),n=document.getElementById("oneVsOneArea"),s=document.getElementById("oneVsAIArea");const i=new Y().render();e&&(e.innerHTML=i,s==null||s.classList.add("hidden"),n==null||n.classList.add("hidden"),e.classList.remove("hidden"))}async initGame(e){await b.cleanup();const n=document.getElementById("gameArea");n==null||n.classList.add("hidden"),b.noWinner=!0,await this.playGame(e)}showWinner(e,n){const s=document.getElementById("gamesArea");let i=e.winner?e.winner.alias:"";if(b.gameType==="p-vs-ai"&&n&&(i="ChatGPT"),console.log("type is=== ",n,`
winner is===`,i),s&&e.winner){s.innerHTML=`            
                <!-- Pantalla de Ganador del Torneo -->
                <div class="text-center flex items-center flex-col justify-center h-full">
                    <svg width="122" height="122" viewBox="0 0 122 122" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <mask id="mask0_176_1235" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="122" height="122">
                        <rect width="122" height="122" fill="#D9D9D9"/>
                        </mask>
                        <g mask="url(#mask0_176_1235)">
                        <path d="M27.8017 99.1249V93.3566H94.1977V99.1249H27.8017ZM27.5768 82.5355L20.4499 41.5079C20.0915 41.6443 19.7463 41.7256 19.4142 41.7519C19.0821 41.7781 18.7368 41.7913 18.3785 41.7913C16.7942 41.7913 15.453 41.244 14.355 40.1494C13.257 39.0556 12.708 37.7127 12.708 36.1208C12.708 34.5348 13.257 33.164 14.355 32.0084C15.453 30.8528 16.795 30.275 18.381 30.275C19.9662 30.275 21.3361 30.8528 22.4909 32.0084C23.6465 33.164 24.2243 34.5348 24.2243 36.1208C24.2243 36.6783 24.151 37.2201 24.0044 37.7462C23.857 38.2723 23.6207 38.7409 23.2953 39.1518L41.5165 46.9038L58.5063 23.6184C57.4837 23.1753 56.6691 22.4932 56.0625 21.5723C55.4567 20.6522 55.1538 19.6203 55.1538 18.4766C55.1538 16.8897 55.7312 15.5316 56.886 14.4023C58.0408 13.2729 59.4111 12.7083 60.9971 12.7083C62.5823 12.7083 63.9535 13.2721 65.1108 14.3997C66.2673 15.5274 66.8455 16.8829 66.8455 18.4664C66.8455 19.633 66.5426 20.6726 65.9369 21.585C65.3302 22.4975 64.5317 23.1753 63.5413 23.6184L80.4828 46.9038L98.704 39.1518C98.4177 38.7527 98.1915 38.2846 98.0254 37.7475C97.8585 37.2103 97.7751 36.6681 97.7751 36.1208C97.7751 34.5348 98.3291 33.164 99.4373 32.0084C100.545 30.8528 101.882 30.275 103.448 30.275C105.034 30.275 106.404 30.8528 107.559 32.0084C108.714 33.164 109.291 34.5348 109.291 36.1208C109.291 37.7077 108.713 39.0492 107.555 40.1455C106.398 41.2427 105.025 41.7913 103.435 41.7913C103.097 41.7913 102.78 41.757 102.483 41.6883C102.186 41.6197 101.869 41.5333 101.533 41.4291L94.4226 82.5355H27.5768ZM32.4936 76.7684H89.554L94.8432 47.2063L78.527 54.1374L60.9997 29.942L43.4723 54.1374L27.1561 47.2063L32.4936 76.7684Z" fill="#EDD24E"/>
                        </g>
                    </svg>
                    <p class="text-6xl font-bold text-yellow-400 mt-2">${i}</p>
                    <button id="reset-btn" class="mt-8 px-6 py-2 border border-yellow-400 text-yellow-400 font-bold rounded hover:bg-yellow-400 hover:text-black transition-colors">
                        continue
                    </button>
                </div>
                `,s.classList.remove("hidden"),s.style.display="block";const o=document.getElementById("reset-btn");o==null||o.addEventListener("click",()=>{v.navigate("home")})}}playGame(e){return new Promise(async()=>{if(!b.isCreatingGame){b.isCreatingGame=!0;try{b.currentGame&&(b.currentGame.stopGame(),b.currentGame=null,await new Promise(s=>setTimeout(s,50))),await R(),this.renderGameCanvas(),await new Promise(s=>setTimeout(s,100));const n=new De({leftPlayer:e.player1.alias,rightPlayer:e.player2.alias,maxScore:parseInt(B.scoreLimit),gameMode:b.gameType,aiDifficulty:Vt(),onFinish:(s,i,o)=>{if(console.log(i,o),e.player1.score=i,e.player2.score=o,e.winner=e.player1.alias===s?e.player1:e.player2,console.log("entra en onMatchEnd"),Ae(b.gameType,e),b.noWinner&&window.location.pathname==="/game")if(e.winner.alias&&e.winner.alias!==void 0){this.showWinner(e,o>i);let a=document.getElementById("winner-screen");a==null||a.classList.remove("hidden"),b.noWinner=!1}else window.location.pathname==="/game"&&v.navigate("home");else window.location.pathname==="/game"&&v.navigate("home");b.currentGame=null,n.resetGame()}});b.currentGame=n,n.resetGame(),n.setGameOn(),n.start()}finally{b.isCreatingGame=!1}}})}static async cleanup(){for(;b.isCreatingGame;)await new Promise(e=>setTimeout(e,10));b.currentGame&&(b.currentGame.stopGame(),b.currentGame=null),b.noWinner=!0,b.inGame=!1}};l(b,"gameType","p-vs-p"),l(b,"getAIDifficulty"),l(b,"getMaxScore"),l(b,"inGame",!1),l(b,"noWinner",!0),l(b,"gameController",!0),l(b,"otherPlayer","Erik"),l(b,"currentGame",null),l(b,"isCreatingGame",!1);let w=b;const Ee={currentUser:null,isLogin:!0,render(){return`
	<main id="gameArea" class="flex-1 bg-black flex items-center justify-center bg-[url('/pongBackgroundPlay.png')] bg-no-repeat bg-cover bg-center w-full h-full">
		<button id="playBtn" class="text-[#fbd11b] text-5xl border border-[#fbd11b] px-12 py-6 rounded-lg hover:bg-[#fbd11b] hover:text-black transition">
		PLAY
		</button>
	 </main>
	`},async init(){const t=document.getElementById("playBtn");t==null||t.addEventListener("click",()=>{w.gameType="p-vs-p",w.inGame=!0,v.navigate("game")})}};function Ge(){return`
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="24" height="24">
	<path class="fill-current" d="M41.4 214.6C28.9 202.1 28.9 181.8 41.4 169.3L105.4 105.3C117.9 92.8 138.2 92.8 150.7 105.3L214.7 169.3C227.2 181.8 227.2 202.1 214.7 214.6C202.2 227.1 181.9 227.1 169.4 214.6L160 205.2L160 415.9C160 451.2 188.7 479.9 224 479.9C259.3 479.9 288 451.2 288 415.9L288 223.9C288 153.2 345.3 95.9 416 95.9C486.7 95.9 544 153.3 544 224L544 434.7L553.4 425.3C565.9 412.8 586.2 412.8 598.7 425.3C611.2 437.8 611.2 458.1 598.7 470.6L534.7 534.6C528.7 540.6 520.6 544 512.1 544C503.6 544 495.5 540.6 489.5 534.6L425.5 470.6C413 458.1 413 437.8 425.5 425.3C438 412.8 458.3 412.8 470.8 425.3L480.2 434.7L480.2 224C480.2 188.7 451.5 160 416.2 160C380.9 160 352.2 188.7 352.2 224L352.2 416C352.2 486.7 294.9 544 224.2 544C153.5 544 96 486.7 96 416L96 205.3L86.6 214.7C74.1 227.2 53.8 227.2 41.3 214.7z"/>
	</svg>
	`}const an={currentUser:null,isLogin:!0,render(){return`
	<main id="oneVsOneArea" class="hidden flex-1 bg-black flex items-center justify-center bg-[url('/pongBackgroundPlay.png')] bg-no-repeat bg-cover bg-center w-full h-full" style="background-image: url('/pongBackgroundPlay.png');">
		<!-- <div id="oneVsOneAreaPopup" class="fixed top-4 right-4 bg-green-600 text-white px-4 py-3 rounded shadow-lg hidden z-50">
		</div> -->
		<div class="flex flex-col justify-center items-center h-screen">
			<h1 class="text-[#fbd11b]/50 font-bold text-4xl pb-20">1 VS 1</h1>
			<input id="player1" type="text" placeholder="Player 1" class="px-4 py-2 text-xl border border-[#fbd11b] font-bold text-center rounded-xl w-60 text-[#fbd11b] placeholder-opacity-50 placeholder-[#fbd11b]/50" />
			<!-- <button id="swapBtn" class="inline-block text-yellow-400 hover:text-black hover:bg-yellow-400 transition-colors duration-300 border border-[#fbd11b] rounded-lg my-4 p-2.75">
				${Ge()}
			</button> -->
			<div id="swapAIBtn" class="inline-block my-4 p-2.75">
			</div>
			<input id="player2" type="text" placeholder="Player 2" class="px-4 py-2 text-xl border border-[#fbd11b] font-bold text-center rounded-xl w-60 text-[#fbd11b] placeholder-opacity-50 placeholder-[#fbd11b]/50" />
			<button id="playOneVsOneBtn" class="inline-block text-yellow-400 hover:text-black hover:bg-yellow-400 transition-colors duration-300 border border-[#fbd11b] rounded-lg my-4 p-2.75 font-bold w-40 text-xl mt-10">Play</button>
		</div>
	 </main>
	`},init(){mt()}};function rn(){return`
	<svg class="w-8 h-8" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" stroke-width="3" stroke="currentColor" fill="none"><circle cx="34.52" cy="11.43" r="5.82"/><circle cx="53.63" cy="31.6" r="5.82"/><circle cx="34.52" cy="50.57" r="5.82"/><circle cx="15.16" cy="42.03" r="5.82"/><circle cx="15.16" cy="19.27" r="5.82"/><circle cx="34.51" cy="29.27" r="4.7"/><line x1="20.17" y1="16.3" x2="28.9" y2="12.93"/><line x1="38.6" y1="15.59" x2="49.48" y2="27.52"/><line x1="50.07" y1="36.2" x2="38.67" y2="46.49"/><line x1="18.36" y1="24.13" x2="30.91" y2="46.01"/><line x1="20.31" y1="44.74" x2="28.7" y2="48.63"/><line x1="17.34" y1="36.63" x2="31.37" y2="16.32"/><line x1="20.52" y1="21.55" x2="30.34" y2="27.1"/><line x1="39.22" y1="29.8" x2="47.81" y2="30.45"/><line x1="34.51" y1="33.98" x2="34.52" y2="44.74"/></svg>
	`}const ln={currentUser:null,isLogin:!0,render(){return`
	<main id="oneVsAIArea" class="hidden flex-1 bg-black flex items-center justify-center bg-[url('/pongBackgroundPlay.png')] bg-no-repeat bg-cover bg-center w-full h-full" style="background-image: url('/pongBackgroundPlay.png');">
		<!-- <div id="oneVsAIAreaPopup" class="fixed top-4 right-4 bg-green-600 text-white px-4 py-3 rounded shadow-lg hidden z-50">
		</div> -->
		<div class="flex flex-col justify-center items-center h-screen">
			<h1 class="text-[#fbd11b]/50 font-bold text-4xl pb-20">1 VS AI</h1>
			<input id="player1VSAI" type="text" placeholder="Player 1" class="space-y-2 px-4 py-2 text-xl border border-[#fbd11b] font-bold text-center rounded-xl w-60 text-[#fbd11b] placeholder-opacity-50 placeholder-[#fbd11b]/50" />
			<!--<button id="swapAIBtn" class="inline-block text-yellow-400 hover:text-black hover:bg-yellow-400 transition-colors duration-300 border border-[#fbd11b] rounded-lg my-4 p-2.75">
				${Ge()}
			</button> -->
			<div id="swapAIBtn" class="inline-block my-4 p-2.75">
			</div>
			<button id="AIPlayer" placeholder="AI" class="flex items-center justify-center text-yellow-400 hover:text-black hover:bg-yellow-400 transition-colors duration-300 border border-[#fbd11b] rounded-lg px-26 py-1.5 rounded-xl inline-block">
				${rn()}
			</button>
			<button id="playOneVsAIBtn" class="inline-block text-yellow-400 hover:text-black hover:bg-yellow-400 transition-colors duration-300 border border-[#fbd11b] rounded-lg my-4 p-2.75 font-bold w-40 text-xl mt-10">Play</button>
		</div>
	 </main>
	`},init(){pt()}},Le={currentUser:null,isLogin:!0,render(){return`
	<div class="w-screen h-screen flex bg-[#fbd11b] overflow-hidden">
		
		<div id="popup" class="fixed top-4 right-4 bg-green-600 text-white px-4 py-3 rounded shadow-lg hidden z-50">
		</div>

		<div id="sidebar" class="bg-[#fbd11b] h-screen flex flex-col overflow-hidden transition-all duration-500 ease-in-out w-[64px]">
		</div>
      ${Ee.render()}
      ${an.render()}
      ${ln.render()}
      ${ee.render()}
      ${new Y().renderGame()}
    </div>
  `},async init(){await R(),Ee.init()}};async function dn(){if(console.log("1 - Login service initialized"),(await fetch("/api/auth/me/status",{credentials:"include"}).then(n=>n.json())).authenticated){v.navigate("home"),m("You are already connected. You can't access the login page.","popup");return}const e=document.getElementById("connectionBtn");e.addEventListener("click",async()=>{const n=document.getElementById("login").value.trim(),s=document.getElementById("password").value;e.disabled=!0;try{const i=await fetch("/api/auth/users/check",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({login:n,password:s}),credentials:"include"}),o=await i.json();if(console.log("login info:",{loginData:o}),!i.ok||o.success===!1){m(o.error||"Login failed","popup");return}if(o.requires2FA){const a=document.getElementById("loginCredentials"),r=document.getElementById("twofa-container");if(a&&r&&(r.innerHTML="",a.classList.add("hidden"),r.classList.remove("hidden"),r.querySelector("*")===null)){console.log("Attempting TwoFAController creation");const h=new oe(o.mail,async()=>{console.log("2FA Success callback triggered"),a.classList.add("hidden"),r.classList.add("hidden"),se(o.login,o.userId)},r,(u,p)=>{console.log(`2FA Error: ${u}`,p),m(u,"popup"),p&&(document.cookie="auth_phase=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;",document.cookie="auth_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;",sessionStorage.setItem("loginError",u),document.getElementById("password").value="",a&&a.classList.remove("hidden"),r&&r.classList.add("hidden"))}).init();r.appendChild(h)}}else se(n,o.userId)}catch(i){m("Network error during login","popup"),console.error("Login error:",i)}finally{e.disabled=!1}})}async function se(t,e){try{const n=await fetch("/api/auth/users/sessions",{method:"POST",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify({userId:e})});if(!n.ok)throw new Error("Token generation failed");localStorage.setItem("login",t),console.log(`in loginService tokenRes = ${n}`),V("login_initiated",{login_id:"login-"+Date.now(),player_username:t}),v.navigate("home"),N("You are logged in",3500,"popup")}catch(n){console.error("Login completion error:",n),m("Login complete but couldn't load session","popup"),v.navigate("home")}}const Pe={render:()=>`
  	<div class="w-screen h-screen flex bg-[#fbd11b] overflow-hidden">
	
	<div id="popup" class="fixed top-4 right-4 bg-green-600 text-white px-4 py-3 rounded shadow-lg hidden z-50"></div>
	
		<div id="sidebar" class="bg-[#fbd11b] h-screen flex flex-col overflow-hidden transition-all duration-500 ease-in-out w-[64px]">
		</div>
		
			<main id="loginArea" class="flex-1 bg-black flex items-center justify-center bg-[url('/pongBackgroundPlay.png')] bg-no-repeat bg-cover bg-center w-full h-full" style="background-image: url('/pongBackgroundPlay.png');">

			<div id="loginCredentials" class="flex flex-col justify-center items-center w-full space-y-10">
				<input id="login" type="text" placeholder="Login" class="w-80 inline-block text-white font-bold text-lg border border-[#fbd11b] rounded-lg p-2.75" />
				<div class="relative">
					<input id="password" type="password" placeholder="Password" class="w-80 inline-block text-white font-bold text-lg border border-[#fbd11b] rounded-lg p-2.75" />
					<button id="togglePasswordLogin" type="button" class="absolute right-2 top-1/2 transform -translate-y-1/2">
					<svg id="eyeIconClosedLogin" fill="#fbd11b" viewBox="0 0 16 16" width="21" height="21" aria-hidden="true"><path fill="#fbd11b" d="M14.53 2.53a.75.75 0 0 0-1.06-1.06l-2.163 2.162A8.9 8.9 0 0 0 8 3C4.15 3 1.513 5.398.276 7.143a1.47 1.47 0 0 0 0 1.714 10.4 10.4 0 0 0 3.004 2.802l-1.81 1.81a.75.75 0 1 0 1.06 1.061zM4.386 10.553a8.8 8.8 0 0 1-2.838-2.552V8s0-.003.003-.007C2.632 6.467 4.857 4.5 8 4.5c.764 0 1.473.116 2.126.314L8.788 6.15A2.1 2.1 0 0 0 8 6c-1.14 0-2.063.895-2.063 2 0 .293.065.57.181.821zm2.928 1.194a.87.87 0 0 1 .625-.247H8c3.143 0 5.367-1.967 6.449-3.492q.004-.006.003-.007V8s0-.003-.003-.007a8.7 8.7 0 0 0-1.014-1.181c-.321-.314-.351-.834-.034-1.151a.717.717 0 0 1 1-.031 10.3 10.3 0 0 1 1.323 1.514 1.47 1.47 0 0 1 0 1.714C14.487 10.602 11.85 13 8 13q-.127 0-.25-.003c-.653-.018-.898-.789-.436-1.25"></path></svg>
					<svg id="eyeIconOpenedLogin" xmlns="http://www.w3.org/2000/svg" fill="#fbd11b" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" class="hidden">
					<path d="M12 5c-7.633 0-11 7-11 7s3.367 7 11 7 11-7 11-7-3.367-7-11-7zm0 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/></svg>
					</button>
				</div>
				<button id="connectionBtn" class="w-80 inline-block text-white font-bold text-lg border border-[#fbd11b] rounded-lg p-2.75">Log in</button>
				<button id="backToRegister" class="text-white px-2 text-xl underline">Click here to create an account</button>
				<button id="googleConnectionBtn"></button>
			</div>
			<div id="twofa-container" class="hidden flex-col justify-center items-center w-full space-y-10"><!-- Will be populated by TwoFAController --></div>
		</main>
    </div>
  `,async init(){await R(),K("password","togglePasswordLogin","eyeIconClosedLogin","eyeIconOpenedLogin"),dn(),cn(),document.getElementById("backToRegister").addEventListener("click",()=>v.navigate("register"))}};function cn(){google.accounts.id.initialize({client_id:"11816073281-ka847kttjiaqlci012l9p7kpip87kocr.apps.googleusercontent.com",callback:un}),google.accounts.id.renderButton(document.getElementById("googleConnectionBtn"),{theme:"outline",size:"large",text:"signin_with",shape:"rectangular",width:315})}async function un(t){console.log("ID Google Token:",t.credential);const n=await(await fetch("/api/auth/google",{method:"POST",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify({id_token:t.credential})})).json();console.log("Internal JWT:",n.success),console.log(`Gprovider = ${n.provider}`),n.success||m("Google SignIn failed","popup"),gn()}async function gn(){const t=await fetch("/api/auth/googleSession",{method:"POST",credentials:"include"});if(t.status===401){console.log("Not authenticated");return}const e=await t.json();console.log(`data = ${e}`),console.log(`data.provider = ${e.provider}`),t.status===201&&(console.log(`data.name = ${e.login}, data.userId = ${e.userId}`),se(e.login,e.userId)),console.log("Protected data:",e)}async function hn(){if(console.log("1 - Registration service initialized"),(await fetch("/api/auth/me/status",{credentials:"include"}).then(i=>i.json())).authenticated){v.navigate("home"),m("You are already connected. You can't access the register page.","popup");return}const e=document.getElementById("anonymizedCheckbox");let n=!1;e.addEventListener("change",()=>{n=e.checked,console.log("Anonymisation enabled:",n)});const s=document.getElementById("createAccountBtn");s.addEventListener("click",async()=>{const i=document.getElementById("newUsername").value.trim(),o=document.getElementById("newMail").value,a=document.getElementById("newPassword").value,r=document.getElementById("confirmPassword").value;if(!i){m("Username is required","popup");return}if(!o){m("Email is required","popup");return}if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(o)){m("Please enter a valid email address","popup");return}if(!a){m("Password is required","popup");return}if(!r){m("Please confirm your password","popup");return}if(a!==r){m("Passwords do not match","popup");return}if(i.length>40||a.length>40||o.length>40){m("Inputs should contain no more than 40 caracters","popup");return}s.disabled=!0,console.log(`in initRegistrationService => anonymisationEnabled = ${n}`);try{const h=await fetch("/api/auth/users/verify",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({login:i,mail:o,anonymisationEnabled:n}),credentials:"include"}),u=await h.json();if(!h.ok||u.success===!1){m(u.error||"Registration failed","popup");return}if(u.requires2FA){const p=document.getElementById("registerForm"),f=document.getElementById("twofa-container");if(console.log("Pre-Check:",{regFormExists:!!p,twofaContainerExists:!!f,regData:u}),!p||!f){m(u.error||"Registration form problem","popup");return}if(f.innerHTML="",p.classList.add("hidden"),f.classList.remove("hidden"),f.querySelector("*")===null){const x=new oe(o,async()=>{p.classList.add("hidden"),f.classList.add("hidden"),Ie(i,o,a,n)},f,(L,I)=>{m(L,"popup"),I&&(document.cookie="auth_phase=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;",document.cookie="auth_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;",sessionStorage.setItem("registerError",L),document.getElementById("newPassword").value="",p&&p.classList.remove("hidden"),f&&f.classList.add("hidden"))}).init();f.appendChild(x)}}else Ie(i,o,a,n)}catch(h){m("Network error during registration","popup"),console.error("Registration error:",h)}finally{s.disabled=!1}})}async function Ie(t,e,n,s){try{if(!(await fetch("/api/auth/users",{method:"POST",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:n,anonymisationEnabled:s})})).ok)throw new Error("Token generation failed");localStorage.setItem("login",t),V("new_account_created",{register_id:"new_account_created-"+Date.now(),player_username:t,mail_user:e,GDPR_user:s}),N("Account created successfully",3500,"popup"),v.navigate("login")}catch(i){console.error("Registration completion error:",i),m("Account created but session could not be loaded","popup"),v.navigate("home")}}const Be={render:()=>`
    <div class="w-screen h-screen flex bg-[#fbd11b] overflow-hidden">

	  <div id="popup" class="fixed top-4 right-4 bg-green-600 text-white px-4 py-3 rounded shadow-lg hidden z-50"></div>
      <div id="sidebar" class="bg-[#fbd11b] h-screen flex flex-col overflow-hidden transition-all duration-500 ease-in-out w-[64px]"></div>
  
      <main id="registerArea" class="flex-1 bg-black flex items-center justify-center bg-[url('/pongBackgroundPlay.png')] bg-no-repeat bg-cover bg-center w-full h-full">

        <div id="registerForm" class="flex flex-col justify-center items-center w-full space-y-7">

          <div class="relative">
            <input id="newUsername" placeholder="Username" class="w-80 inline-block text-white font-bold text-lg border border-[#fbd11b] rounded-lg p-2.75"/>
          </div>

          <input id="newMail" placeholder="Mail" type="email" class="w-80 inline-block text-white font-bold text-lg border border-[#fbd11b] rounded-lg p-2.75"/>

          <div class="relative">
		    <input id="newPassword" placeholder="Password" type="password" class="w-80 inline-block text-white font-bold text-lg border border-[#fbd11b] rounded-lg p-2.75"/>
		    <button id="togglePassword" type="button" class="absolute right-2 top-1/2 transform -translate-y-1/2">
		      <!-- Closed Eye -->
		      <svg id="eyeIconClosed" fill="#fbd11b" viewBox="0 0 16 16" width="21" height="21">
		        <path d="M14.53 2.53a.75.75 0 0 0-1.06-1.06l-2.163 2.162A8.9 8.9 0 0 0 8 3C4.15 3 1.513 5.398.276 7.143a1.47 1.47 0 0 0 0 1.714 10.4 10.4 0 0 0 3.004 2.802l-1.81 1.81a.75.75 0 1 0 1.06 1.061zM4.386 10.553a8.8 8.8 0 0 1-2.838-2.552V8s0-.003.003-.007C2.632 6.467 4.857 4.5 8 4.5c.764 0 1.473.116 2.126.314L8.788 6.15A2.1 2.1 0 0 0 8 6c-1.14 0-2.063.895-2.063 2 0 .293.065.57.181.821zm2.928 1.194a.87.87 0 0 1 .625-.247H8c3.143 0 5.367-1.967 6.449-3.492q.004-.006.003-.007V8s0-.003-.003-.007a8.7 8.7 0 0 0-1.014-1.181c-.321-.314-.351-.834-.034-1.151a.717.717 0 0 1 1-.031 10.3 10.3 0 0 1 1.323 1.514 1.47 1.47 0 0 1 0 1.714C14.487 10.602 11.85 13 8 13q-.127 0-.25-.003c-.653-.018-.898-.789-.436-1.25"></path>
		      </svg>
		      <!-- Open Eye -->
		      <svg id="eyeIconOpened" class="hidden" fill="#fbd11b" viewBox="0 0 24 24" width="24" height="24">
		        <path d="M12 5c-7.633 0-11 7-11 7s3.367 7 11 7 11-7 11-7-3.367-7-11-7zm0 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
		      </svg>
		    </button>
		  </div>
		  <div class="relative">
		    <input id="confirmPassword" placeholder="Confirm Password" type="password" class="w-80 inline-block text-white font-bold text-lg border border-[#fbd11b] rounded-lg p-2.75"/>
		    <button id="toggleConfirmPassword" type="button" class="absolute right-2 top-1/2 transform -translate-y-1/2">
		      <!-- Closed Eye -->
		      <svg id="confirmEyeIconClosed" fill="#fbd11b" viewBox="0 0 16 16" width="21" height="21">
		        <path d="M14.53 2.53a.75.75 0 0 0-1.06-1.06l-2.163 2.162A8.9 8.9 0 0 0 8 3C4.15 3 1.513 5.398.276 7.143a1.47 1.47 0 0 0 0 1.714 10.4 10.4 0 0 0 3.004 2.802l-1.81 1.81a.75.75 0 1 0 1.06 1.061zM4.386 10.553a8.8 8.8 0 0 1-2.838-2.552V8s0-.003.003-.007C2.632 6.467 4.857 4.5 8 4.5c.764 0 1.473.116 2.126.314L8.788 6.15A2.1 2.1 0 0 0 8 6c-1.14 0-2.063.895-2.063 2 0 .293.065.57.181.821zm2.928 1.194a.87.87 0 0 1 .625-.247H8c3.143 0 5.367-1.967 6.449-3.492q.004-.006.003-.007V8s0-.003-.003-.007a8.7 8.7 0 0 0-1.014-1.181c-.321-.314-.351-.834-.034-1.151a.717.717 0 0 1 1-.031 10.3 10.3 0 0 1 1.323 1.514 1.47 1.47 0 0 1 0 1.714C14.487 10.602 11.85 13 8 13q-.127 0-.25-.003c-.653-.018-.898-.789-.436-1.25"></path>
		      </svg>
		      <!-- Open Eye -->
		      <svg id="confirmEyeIconOpened" class="hidden" fill="#fbd11b" viewBox="0 0 24 24" width="24" height="24">
		        <path d="M12 5c-7.633 0-11 7-11 7s3.367 7 11 7 11-7 11-7-3.367-7-11-7zm0 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
		      </svg>
		    </button>
		  </div>
		  
		  <div class="text-white text-center text-sm">
			<label class="font-bold">
				<input id="anonymizedCheckbox" type="checkbox" />
				Would you like to not share your data ?
			</label><br>
			<button id="showPoliciesBtn" class="underline">See data policies</button>
		  </div>

          <button id="createAccountBtn" class="w-80 inline-block text-white font-bold text-lg border border-[#fbd11b] rounded-lg p-2.75">Create Account</button>
          <button id="backToLogin" class="text-white px-2 py-1 text-xl underline">Click here to go back to log in</button>


        </div>
          <!-- Hidden 2FA container -->
 	  <div id="twofa-container" class="hidden flex-col justify-center items-center w-full space-y-10"><!-- Will be populated by TwoFAController --></div>

      </main>
    </div>
  `,async init(){await R(),K("newPassword","togglePassword","eyeIconClosed","eyeIconOpened"),K("confirmPassword","toggleConfirmPassword","confirmEyeIconClosed","confirmEyeIconOpened"),hn(),document.body.insertAdjacentHTML("beforeend",mn()),pn(),document.getElementById("backToLogin").addEventListener("click",()=>{v.navigate("login")})}};function mn(){return`
	<div id="policiesPopup" class="hidden bg-[url('/pongBackgroundPlay.png')] bg-no-repeat bg-cover bg-center fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
		<div class="bg-white rounded-lg shadow-lg p-6 w-3/4 h-3/4 relative overflow-y-auto">
			<button id="closePoliciesBtn" class="absolute top-1 right-3 text-gray-500 hover:text-black text-2xl font-bold">&times;</button>
			<h2 class="text-xl font-bold mb-4 text-center">Our Data Sharing Policy</h2>
			<p class="text-gray-700 mb-4">
				We value your privacy. Here is how we collect, use, and store your data:
			</p>
			<ul class="list-disc pl-6 text-gray-700 space-y-2">
				<li>We do not sell your personal data.</li>
				<li>By sharing your data, you agree to be in the list of potential users to be friends with other. You will appear in 'Other Users' list. Once being friend with another user, your mail address will be shared with your friend reciprocatively.</li>
				<li>You may opt-out of data sharing at any time.</li>
			</ul>
		</div>
	</div>
	`}function pn(){const t=document.getElementById("policiesPopup"),e=document.getElementById("showPoliciesBtn"),n=document.getElementById("closePoliciesBtn");!t||!e||!n||(e.addEventListener("click",()=>t.classList.remove("hidden")),n.addEventListener("click",()=>t.classList.add("hidden")),t.addEventListener("click",s=>{s.target===t&&t.classList.add("hidden")}))}const Ce={render(){return`
	<div class="w-screen h-screen flex bg-[#fbd11b] overflow-hidden">
		
		<div id="popup" class="fixed top-4 right-4 bg-green-600 text-white px-4 py-3 rounded shadow-lg hidden z-50">
		</div>

		<div id="sidebar" class="bg-[#fbd11b] h-screen flex flex-col overflow-hidden transition-all duration-500 ease-in-out w-[64px]">
		</div>
      ${ee.render()}
      ${new Y().renderGame()}
    </div>
  `},async init(){const t=document.getElementById("tournamentArea");let e=document.getElementById("gameCanvasContainer");if(!e&&(t!=null&&t.parentNode)&&(e=document.createElement("div"),e.id="gameCanvasContainer",e.className="hidden content bg-[#fbd11b] h-full",t.appendChild(e)),e&&W&&W.partidoActivo){const n=document.getElementById("gameArea");n==null||n.classList.add("hidden");const s=new Y().render();e.innerHTML=s}await R(),ee.init()}},j=class j{static navigate(e,n=!0){if(!this.app){console.error("App container not found");return}switch(e){case"home":w.cleanup(),w.gameController=!1,this.app.innerHTML=Le.render(),Le.init();break;case"login":w.cleanup(),this.app.innerHTML=Pe.render(),Pe.init();break;case"register":w.cleanup(),this.app.innerHTML=Be.render(),Be.init();break;case"game":if(!w.inGame){j.navigate("home"),w.inGame=!1;return}const s=document.getElementById("player1"),i=document.getElementById("player2"),o=document.getElementById("player1VSAI");let a=i;w.gameType==="p-vs-ai"&&(a=o,w.otherPlayer=a.value),!a&&!s?new w().initGame({player1:{alias:"User 1"},player2:{alias:"User 2"},winner:null}):new w().initGame({player1:{alias:s.value},player2:{alias:a.value},winner:null});break;case"tournament":this.app.innerHTML=Ce.render(),Ce.init();break}n&&history.pushState({},"",e==="home"?"/":`/${e}`)}static resolveRoute(e){return e.includes("login")?"login":e.includes("register")?"register":e.includes("game")?"game":e.includes("tournament")?"tournament":"home"}static init(){window.addEventListener("load",()=>{const e=this.resolveRoute(window.location.pathname);this.navigate(e,!1)}),window.addEventListener("popstate",()=>{const e=this.resolveRoute(window.location.pathname);this.navigate(e,!1)}),window.addEventListener("popstate",e=>{console.log("History changed:",e.state)})}};l(j,"app",document.getElementById("app")),l(j,"currentUser");let v=j;v.init();window.addEventListener("load",()=>{const t=window.location.pathname;v.navigate(t.includes("login")?"login":t.includes("register")?"register":t.includes("game")?"game":t.includes("tournament")?"tournament":"home",!1)});window.addEventListener("popstate",()=>{const t=window.location.pathname;v.navigate(t.includes("login")?"login":t.includes("register")?"register":t.includes("game")?"game":t.includes("tournament")?"tournament":"home",!1)});
