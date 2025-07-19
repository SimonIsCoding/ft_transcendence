var y=Object.defineProperty;var w=(t,e,i)=>e in t?y(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i;var p=(t,e,i)=>w(t,typeof e!="symbol"?e+"":e,i);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function i(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(o){if(o.ep)return;o.ep=!0;const s=i(o);fetch(o.href,s)}})();const x={renderMenu:()=>`
    <div id="fullCanva" class="flex w-full max-w-[1024px] h-[768px] border-4 border-white bg-black mx-auto">
      
      <!-- Gauche -->
      <div id="leftCanvaPart" class="w-1/2 flex flex-col justify-center items-center space-y-10 bg-gray-900">
        <button class="font-seven text-white uppercase px-6 py-3 border border-white rounded">LOGIN</button>
        <button class="font-seven text-white uppercase px-6 py-3 border border-white rounded">REGISTER</button>
      </div>

      <!-- Droite -->
      <div id="rightCanvaPart" class="w-1/2 flex items-center justify-center bg-black">
        <button id="playBtn" class="font-seven text-white uppercase px-6 py-3 border border-white rounded">PLAY</button>
      </div>
    </div>
  `},v={render:()=>`
    <div class="flex w-full max-w-[1024px] h-[768px] border-4 border-white bg-black mx-auto">
      <div id="leftCanvaPart" class="w-1/2 flex flex-col justify-center items-center space-y-10 bg-gray-900">
        <button class="font-seven text-white uppercase px-6 py-3 border border-white rounded">1 VS 1</button>
      </div>
      <div id="rightCanvaPart" class="w-1/2 flex items-center justify-center bg-black">
        <button class="font-seven text-white uppercase px-6 py-3 border border-white rounded">TOURNAMENT</button>
      </div>
    </div>
  `},E={init(){const t=document.getElementById("playBtn");t&&t.addEventListener("click",()=>{const e=document.getElementById("fullCanva");e&&(e.innerHTML=v.render())})}},m={currentUser:null,isLogin:!0,render(){return`
      <div class="flex flex-col min-h-screen bg-[#fbd11b] text-black">
        <header class="flex justify-center items-center h-24 bg-[#fbd11b]">
          <img src="/pong-logo.png" alt="PONG Logo" class="h-16">
          <a href="/login" id="login-icon" class="hidden absolute right-6 top-6">
            <img src="/login-icon.png" alt="Login" class="h-8 w-8" />
          </a>
          <a href="/logged" id="logged-icon" class="hidden absolute right-6 top-6">
            <img src="/logged-icon.png" alt="Logged" class="h-8 w-8" />
          </a>
        </header>

        <main id="main-content" class="flex-1 flex items-center justify-center bg-[#fbd11b] overflow-y-auto min-h-[450px]">
          ${x.renderMenu()}
        </main>

        <footer class="bg-[#fbd11b] p-4">
        </footer>
      </div>
    `},init(){E.init()}};function B(t){console.log("in isConnected(), user: ",t),fetch("/api/private/info",{method:"GET",credentials:"include"}).then(e=>{if(!e.ok)throw new Error("Unauthorized");return e.json()}).then(e=>{console.log("In isConnected(): userId:",e.userId),console.log("In isConnected(): login:",e.login),console.log("In isConnected(): alias:",e.alias),console.log("connecté in data");const i=document.getElementById("login-icon"),n=document.getElementById("logged-icon");console.log("User info:",e),i==null||i.classList.add("hidden"),n==null||n.classList.remove("hidden")}).catch(()=>{console.log("Pas connecté, in catch");const e=document.getElementById("login-icon"),i=document.getElementById("logged-icon");i==null||i.classList.add("hidden"),e==null||e.classList.remove("hidden")})}function I(){document.getElementById("loginBtn").addEventListener("click",()=>{const e=document.getElementById("login").value,i=document.getElementById("password").value;fetch("/api/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({login:e,password:i}),credentials:"include"}).then(n=>n.json()).then(n=>{localStorage.setItem("login",e);const o=localStorage.getItem("login");o&&n.success==!0?(document.getElementById("title").textContent=`Hi ${o}`,document.getElementById("welcome-div").style.display="block",document.getElementById("welcome-div").textContent=`Welcome ${o}, you are now connected :)`,document.getElementById("login").style.display="none",document.getElementById("password").style.display="none",document.getElementById("loginBtn").style.display="none",document.getElementById("registerBtn").style.display="none",document.getElementById("logoutBtn").style.display="block"):(document.getElementById("title").textContent="Hi",document.getElementById("welcome-div").style.display="block",document.getElementById("welcome-div").textContent="Sorry. Your credentials doesn't match.")}),console.log("login: ",e,"Password:",i),fetch("/api/auth/debug-token",{credentials:"include"}).then(n=>n.json()).then(n=>console.log("Token received via cookie:",n.token)),fetch("/api/auth/info",{method:"GET",credentials:"include"}).then(n=>{if(!n.ok)throw new Error("Unauthorized");return n.json()}).then(n=>{console.log("In isConnected(): userId:",n.userId),console.log("In isConnected(): login:",n.login),console.log("In isConnected(): alias:",n.alias)}),fetch("/api/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:"alice",password:"1234"})})})}async function L(t){const e=document.getElementById("registerBtn");e==null||e.addEventListener("click",()=>{var o,s;if(document.getElementById("connexionBlock").style.display="none",document.getElementById("register-container"))return;const n=document.createElement("div");n.id="register-container",n.innerHTML=`
		<div id="registrationBlock" class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
			<h1 id="title" class="text-3xl font-bold mb-6 text-blue-600">Hi</h1>
			<input id="new-username" placeholder="Username" class="mb-4 px-4 py-2 border rounded w-64"/><br/>
			<input id="new-password" placeholder="Password" type="password" class="mb-4 px-4 py-2 border rounded w-64"/><br/>
			<input id="new-alias" placeholder="Alias" class="mb-4 px-4 py-2 border rounded w-64"/><br/>
			<button id="create-account" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Create Account</button>
			<button id="backToLogin" class="cursor-pointer text-blue-500 underline">Click here to be back to log in</button>
		</div>
	`,document.body.appendChild(n),(o=document.getElementById("backToLogin"))==null||o.addEventListener("click",()=>{var l;(l=document.getElementById("register-container"))==null||l.remove(),document.getElementById("connexionBlock").style.display="flex"}),(s=document.getElementById("create-account"))==null||s.addEventListener("click",async()=>{const l=document.getElementById("new-username").value,h=document.getElementById("new-password").value,u=document.getElementById("new-alias").value,a=await(await fetch("/api/auth/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({login:l,password:h,alias:u}),credentials:"include"})).json(),g={login:a.data.user.login,password:a.data.password,alias:u,token:a.data.token},d=document.getElementById("registrationBlock");let r=document.getElementById("registration-created");r||(r=document.createElement("p"),r.id="registration-created",d==null||d.appendChild(r)),a.status===200?(r.textContent="Wonderful. You have created your account. You can connect to your account now.",t(g)):a.status===500?r.textContent="DB Error":r.textContent="An account with this login has already been created.",console.log(g)})})}function C(){fetch("/api/auth/info",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({}),credentials:"include"}).then(t=>t.json()).then(t=>{console.log("You are in info page & data:",t)})}async function k(){try{const t=await fetch("/api/auth/info",{method:"GET",credentials:"include"});if(!t.ok)throw new Error("Not authenticated");const e=await t.json();return console.log("User info received:",e),!0}catch(t){return console.warn("User not authenticated:",t),!1}}class f{static render(){return`
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
	</div>`}static init(){I(),L(e=>{B(e)})}}class b{static render(){return`
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
	</div>`}static init(){k();const e=localStorage.getItem("login")||"",i=localStorage.getItem("alias")||"";console.log("current login in localStorage:",e),console.log("current alias in localStorage:",i);const n=document.getElementById("current-login"),o=document.getElementById("current-alias"),s=document.getElementById("new-login"),l=document.getElementById("new-alias");n&&(n.innerText=`Current login: ${e} - Change it to:`),o&&(o.innerText=`Current alias: ${i} - Change it to:`),s&&(s.value=e),l&&(l.value=i),C()}}class c{static navigate(e){if(!this.app){console.error("App container not found");return}switch(this.app.innerHTML="",e){case"home":this.app.innerHTML=m.render(),m.init();break;case"login":this.app.innerHTML=f.render(),f.init();break;case"info":this.app.innerHTML=b.render(),b.init();break}history.pushState({},"",e==="home"?"/":`/${e}`)}static init(){window.addEventListener("load",()=>{const e=window.location.pathname;this.navigate(e.includes("login")?"login":e.includes("info")?"info":"home")}),window.addEventListener("popstate",()=>{const e=window.location.pathname;this.navigate(e.includes("login")?"login":e.includes("info")?"info":"home")})}}p(c,"app",document.getElementById("app"));c.init();window.addEventListener("load",()=>{const t=window.location.pathname;c.navigate(t.includes("login")?"login":t.includes("info")?"info":"home")});window.addEventListener("popstate",()=>{const t=window.location.pathname;c.navigate(t.includes("login")?"login":t.includes("info")?"info":"home")});
