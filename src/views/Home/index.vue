<script lang="ts" setup></script>

<template>
  <div class="flex flex-col gap-4 justify-center items-center h-56">
    <h2
      class="font-primary text-4xl uppercase font-bold text-center text-slate-700"
    >
      every
      <span
        class="text-transparent bg-clip-text bg-gradient-to-r from-brand-danger-500 to-brand-info-500"
      >
        question
      </span>
      has an
      <span
        class="text-transparent bg-clip-text bg-gradient-to-r from-brand-info-500 to-brand-primary-500"
      >
        answer
      </span>
    </h2>
    <h3 class="text-xl text-center text-slate-500">
      learn and share knowledge with others
    </h3>
  </div>
  <main
    class="flex flex-col h-[28rem] p-6 text-slate-700 rounded-md bg-slate-100"
  >
    <router-view />
  </main>
</template>
