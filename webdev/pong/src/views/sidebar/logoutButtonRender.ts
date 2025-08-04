export function logoutButtonRender():string 
{
	return `
	<div id="sidebarLowPart" class="flex flex-col mt-auto items-center space-y-2 pb-6">
		<button id="logoutSidebarBtn" class="group mx-2 my-2 border border-black rounded-lg px-2 py-1 hover:bg-black transition">
		<svg xmlns="http://www.w3.org/2000/svg" 
			viewBox="0 0 24 24" 
			class="w-5 h-5 fill-black group-hover:fill-[#fbd11b] transition">
			<path d="M16 13v-2H7V8l-5 4 5 4v-3h9zm4-10H8a2 2 0 0 0-2 2v4h2V5h12v14H8v-4H6v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z"/>
		</svg>
		</button>
	</div>
	`
}