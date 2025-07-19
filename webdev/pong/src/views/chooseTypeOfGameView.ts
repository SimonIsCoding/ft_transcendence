export const chooseTypeOfGameView = {
  render: (): string => `
    <div class="flex w-full max-w-[1024px] h-[768px] border-4 border-white bg-black mx-auto">
      <div id="leftCanvaPart" class="w-1/2 flex flex-col justify-center items-center space-y-10 bg-gray-900">
        <button class="font-seven text-white uppercase px-6 py-3 border border-white rounded">1 VS 1</button>
      </div>
      <div id="rightCanvaPart" class="w-1/2 flex items-center justify-center bg-black">
        <button class="font-seven text-white uppercase px-6 py-3 border border-white rounded">TOURNAMENT</button>
      </div>
    </div>
  `
};