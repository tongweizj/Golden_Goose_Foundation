<template>
  <nav id="header" class="fixed top-0 z-10 w-full">
    <div
      id="progress"
      class="top-0 z-20 h-1"
      style="
        background: linear-gradient(
          to right,
          #4dc0b5 var(--scroll),
          transparent 0
        );
      "
    ></div>

    <div
      class="mx-auto mt-0 flex w-full flex-wrap items-center justify-between py-3 md:max-w-4xl"
    >
      <div class="pl-4">
        <a
          class="text-base text-xl font-extrabold text-gray-900 no-underline hover:no-underline"
          href="#"
        >
          Minimal Blog
        </a>
      </div>

      <div class="block pr-4 lg:hidden">
        <button
          id="nav-toggle"
          class="flex appearance-none items-center rounded border border-gray-600 px-3 py-2 text-gray-500 hover:border-green-500 hover:text-gray-900 focus:outline-none"
        >
          <svg
            class="h-3 w-3 fill-current"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>

      <div
        class="z-20 mt-2 hidden w-full flex-grow bg-gray-100 md:bg-transparent lg:mt-0 lg:block lg:flex lg:w-auto lg:items-center"
        id="nav-content"
      >
        <ul class="list-reset flex-1 items-center justify-end lg:flex">
          <li class="mr-3">
            <a
              class="inline-block px-4 py-2 font-bold text-gray-900 no-underline"
              href="#"
              >Active</a
            >
          </li>
          <li class="mr-3">
            <a
              class="hover:text-underline inline-block px-4 py-2 text-gray-600 no-underline hover:text-gray-900"
              href="#"
              >link</a
            >
          </li>
          <li class="mr-3">
            <a
              class="hover:text-underline inline-block px-4 py-2 text-gray-600 no-underline hover:text-gray-900"
              href="#"
              >link</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import {} from 'vue'
</script>

<style scoped></style>
