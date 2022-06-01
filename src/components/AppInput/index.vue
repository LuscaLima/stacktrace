<script lang="ts" setup>
withDefaults(
  defineProps<{
    label?: string
    modelValue: string
  }>(),
  { label: '' }
)
defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>

<template>
  <div class="flex flex-col gap-2 w-full">
    <div v-if="label" class="text-slate-500">
      <label
        class="inline-block after:content-[':']"
        @click="$refs.input.focus"
        >{{ label }}</label
      >
    </div>
    <input
      ref="input"
      type="text"
      class="inline-flex w-full px-3 py-2 border-[1px] text-slate-700 border-slate-300 rounded bg-white outline-0 placeholder:text-slate-300 focus:border-brand-primary-500 transition-all duration-200"
      v-bind="$attrs"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>
