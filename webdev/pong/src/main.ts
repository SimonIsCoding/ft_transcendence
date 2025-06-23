import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="max-w-[1280px] mx-auto p-8 text-center font-sans text-white/87 dark:text-white bg-white dark:bg-[#242424] min-h-screen flex flex-col items-center justify-center">
    <div class="flex gap-4 justify-center items-center mb-6">
      <a href="https://vite.dev" target="_blank" class="font-medium text-[#646cff] hover:text-[#535bf2] no-underline">
        <img src="${viteLogo}" class="h-[6em] p-6 transition-[filter] duration-300 hover:drop-shadow-[0_0_2em_#646cffaa]" alt="Vite logo" />
      </a>
      <a href="https://www.typescriptlang.org/" target="_blank" class="font-medium text-[#646cff] hover:text-[#535bf2] no-underline">
        <img src="${typescriptLogo}" class="h-[6em] p-6 transition-[filter] duration-300 hover:drop-shadow-[0_0_2em_#3178c6aa]" alt="TypeScript logo" />
      </a>
    </div>
    <h1 class="text-[#213547] dark:text-white text-[3.2em] leading-[1.1] ">Vite + TailwindCSS + TypeScript</h1>
    <div class="p-8">
      <button
        id="counter"
        type="button"
	class="bg-[#f9f9f9] ![color:black] dark:![color:white] dark:bg-[#1a1a1a] border border-transparent px-[1.2em] py-[0.6em] text-[1em] font-medium rounded-[8px] cursor-pointer transition-colors duration-200 hover:border-[#646cff] focus:outline focus:outline-4 !dark:text-white"
		>
        count is 0
      </button>
    </div>
    <p class="text-[#888] mt-4">Click on the Vite and TypeScript logos to learn more</p>
  </div>
`;


setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
