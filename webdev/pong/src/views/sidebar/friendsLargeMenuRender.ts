export function friendsLargeMenuRender():string 
{
	return `
	<!-- Settings submenu -->
		<div id="settingsSubmenu" class="submenu h-screen w-full absolute top-0 bg-[#fbd11b] flex flex-col overflow-hidden max-h-0 transition-[max-height] duration-450 z-50 space-y-5">
			<p id="submenuSettingsName" class="font-bold text-center pt-5">Game Settings</p>
			<hr class="w-full border-t-1.5 border-black" />
		</div>
	`
}