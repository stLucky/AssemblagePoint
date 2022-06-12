<template>
  <main class="grow py-4">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 h-full">
      <div
        class="min-w-full border rounded lg:grid lg:grid-cols-3 h-full bg-white"
      >
        <div class="border-r border-gray-300 lg:col-span-1">
          <ul class="overflow-auto">
            <h2 class="my-3 mb-2 ml-2 text-lg text-gray-600">Chats</h2>
            <li>
              <a
                class="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none"
              >
                <div class="w-full pb-2">
                  <div class="flex justify-between">
                    <span class="block ml-2 font-semibold text-gray-600"
                      >Jhon Don</span
                    >
                    <span class="block ml-2 text-sm text-gray-600"
                      >25 minutes</span
                    >
                  </div>
                  <span class="block ml-2 text-sm text-gray-600">bye</span>
                </div>
              </a>
              <a
                class="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out bg-gray-100 border-b border-gray-300 cursor-pointer focus:outline-none"
              >
                <div class="w-full pb-2">
                  <div class="flex justify-between">
                    <span class="block ml-2 font-semibold text-gray-600"
                      >Same</span
                    >
                    <span class="block ml-2 text-sm text-gray-600"
                      >50 minutes</span
                    >
                  </div>
                  <span class="block ml-2 text-sm text-gray-600"
                    >Good night</span
                  >
                </div>
              </a>
              <a
                class="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none"
              >
                <div class="w-full pb-2">
                  <div class="flex justify-between">
                    <span class="block ml-2 font-semibold text-gray-600"
                      >Emma</span
                    >
                    <span class="block ml-2 text-sm text-gray-600">6 hour</span>
                  </div>
                  <span class="block ml-2 text-sm text-gray-600"
                    >Good Morning</span
                  >
                </div>
              </a>
            </li>
          </ul>
        </div>
        <div class="hidden lg:col-span-2 lg:block">
          <div class="w-full h-full flex flex-col">
            <div
              class="relative flex items-center p-3 border-b border-gray-300"
            >
              <span class="block ml-2 font-bold text-gray-600">Emma</span>
            </div>
            <div class="relative w-full p-6 overflow-y-auto grow">
              <ul class="space-y-2">
                <li class="flex justify-start">
                  <div
                    class="relative max-w-xl px-4 py-2 text-gray-600 rounded shadow"
                  >
                    <span class="block">Hi</span>
                  </div>
                </li>
                <li class="flex justify-end">
                  <div
                    class="relative max-w-xl px-4 py-2 text-gray-600 bg-gray-100 rounded shadow"
                  >
                    <span class="block">Hiiii</span>
                  </div>
                </li>
                <li class="flex justify-end">
                  <div
                    class="relative max-w-xl px-4 py-2 text-gray-600 bg-gray-100 rounded shadow"
                  >
                    <span class="block">how are you?</span>
                  </div>
                </li>
                <li class="flex justify-start">
                  <div
                    class="relative max-w-xl px-4 py-2 text-gray-600 rounded shadow"
                  >
                    <span class="block"
                      >Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    </span>
                  </div>
                </li>
              </ul>
            </div>

            <div
              class="flex items-center justify-between w-full p-3 border-t border-gray-300"
            >
              <input
                type="text"
                placeholder="Message"
                class="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-600"
                name="message"
                required
              />
              <button type="submit">
                <svg
                  class="w-5 h-5 text-gray-500 origin-center transform rotate-90"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup></script>
