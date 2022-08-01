<script setup>
import { inject, ref } from 'vue';
import {
  BIconExclamationTriangleFill,
  BIconMicFill,
  BIconMicMuteFill } from 'bootstrap-icons-vue';

const recognition = inject('SpeechRecognition');

recognition.addListener('start', 'button', () => {
  recording.value = true;
});

recognition.addListener('end', 'button', () => {
  recording.value = false;
});

const recording = ref(false);
const record = () => {
  if (recording.value) recognition.stop();
  else recognition.start();
}
</script>

<template>
  <div>
    <button
      @click="record"
      :class="{ 'btn-active, btn-success': recording }"
      class="btn btn-outline btn-accent"
      type="button"
    >
      <i class="text-lg mr-2">
        <BIconMicFill v-if="recording" />
        <BIconMicMuteFill v-else />
      </i>
      Record
    </button>
    <!--
    <div
      v-if="permission === false"
      class="mt-2 text-error flex justify-center"
    >
      <i class="text-lg mr-2"><BIconExclamationTriangleFill /></i>
      <span>Allow microphone access to continue</span>
    </div>
    -->
  </div>
</template>

<style scoped>
.btn-active {
  color: black;
}
</style>
