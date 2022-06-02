<script lang="ts" setup>
import { onBeforeUnmount, onMounted, reactive } from 'vue'
import useModal, { type ModalPayload as Modal } from '@/hooks/useModal'
import { PhWarning } from 'phosphor-vue'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'
import AppButton from '../AppButton/index.vue'

const modal = useModal()
const state = reactive<{
  payload: Modal
}>({
  payload: { isOpen: false, okHandler: () => {} }
})

function handleToogleModal(payload: Modal) {
  state.payload = { ...state.payload, ...payload }
}

onMounted(() => {
  modal.listen(handleToogleModal)
})

onBeforeUnmount(() => {
  modal.off()
})
</script>

<template>
  <Dialog
    as="div"
    :open="state.payload.isOpen"
    @close="() => modal.close()"
    class="relative z-10"
  >
    <div class="fixed inset-0 bg-black bg-opacity-25" />

    <div class="fixed inset-0 overflow-y-auto">
      <div class="flex min-h-full justify-center items-center p-4">
        <DialogPanel
          class="flex flex-wrap gap-4 w-full max-w-md p-6 transform rounded bg-white overflow-hidden align-middle shadow-xl transition-all"
        >
          <div
            v-if="state.payload.type !== 'default'"
            class="flex justify-center items-start text-3xl"
          >
            <PhWarning
              v-if="state.payload.type === 'warn'"
              class="text-brand-warn-500"
            />
          </div>
          <div class="flex-1 flex flex-col">
            <DialogTitle
              as="h3"
              class="text-xl font-semibold leading-none text-slate-700"
            >
              {{ state.payload.title }}
            </DialogTitle>
            <div class="mt-2">
              <p class="text-slate-700">
                {{ state.payload.content }}
              </p>
            </div>
          </div>
          <div class="flex justify-end w-full mt-4">
            <div class="flex gap-2">
              <AppButton type="clear" @click="() => modal.close()">
                cancel
              </AppButton>
              <AppButton @click="state.payload.okHandler">
                {{ state.payload.okText ?? 'ok' }}
              </AppButton>
            </div>
          </div>
        </DialogPanel>
      </div>
    </div>
  </Dialog>
</template>
