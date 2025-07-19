export const MenuView = {
  renderMenu: (): string => `
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
  `
};


// export const chooseTypeOfGameView = {
//   renderChooseTypeOfGame: () => `
//     <div class="flex w-full max-w-[1024px] h-[768px] border-4 border-white bg-black mx-auto">
      
//       <!-- Gauche -->
//       <div id="leftCanvaPart" class="w-1/2 flex flex-col justify-center items-center space-y-10 bg-gray-900">
//         <button class="font-seven text-white uppercase px-6 py-3 border border-white rounded">1 VS 1</button>
//       </div>

//       <!-- Droite -->
//       <div id="rightCanvaPart" class="w-1/2 flex items-center justify-center bg-black">
// 		<button id="playBtn" class="font-seven text-white uppercase px-6 py-3 border border-white rounded">TOURNAMENT</button>
//       </div>
//     </div>
//   `,
// }

// export function chooseTypeOfGameView()
// {
// 	const playtBtn = document.getElementById("playtBtn") as HTMLButtonElement;

// 	playtBtn.addEventListener("click", () => {
// 		document.getElementById('playBtn')!.textContent = `holaaaaaaaaa`;
// 		console.log("truc de fou");
// 	});
// }