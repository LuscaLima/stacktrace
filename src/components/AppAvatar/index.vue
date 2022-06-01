<script lang="ts" setup>
defineProps<{ url?: string; initials?: string }>()
</script>

<template>
  <div class="w-10 h-10 rounded-full overflow-hidden">
    <img v-if="url" :src="url" alt="user avatar" />
    <span
      v-else
      class="flex justify-center items-center text-white bg-slate-300"
    >
      {{ initials }}
    </span>
  </div>
</template>
