<script setup>
import { computed, inject, ref } from 'vue';
import {
  BIconExclamationTriangleFill,
  BIconMicFill,
  BIconMicMuteFill } from 'bootstrap-icons-vue';

const error = ref(null);
const classes = computed(() => ({
  'btn-active btn-success !text-black': listening.value,
  'hidden': !recognition
}));
const recognition = inject('SpeechRecognition');

if (!recognition) {
  error.value =
    'Web Speech API is not supported, upgrade to Chrome version 25 or later';
}

recognition.addListener('start', 'record', () => {
  listening.value = true;
  error.value = null;
});

recognition.addListener('end', 'record', () => {
  listening.value = false;
});

recognition.onerror = (event) => {
  if (event.error === 'no-speech') {
    error.value = 'No speech detected, you may need to adjust your microphone';
  } else if (event.error === 'network') {
    error.value = 'Fast network connection required, try again later';
  } else if (event.error === 'audio-capture') {
    error.value = "No microphone detected, make sure it's configured correctly";
  } else if (event.error === 'not-allowed') {
    error.value =
      'Access to microphone was denied, please update site permission';
  } else {
    error.value =
      'Unexpected error occured, report to developer: ' + event.error;
  }

  listening.value = false;
};

const listening = ref(false);
const record = () => {
  if (listening.value) recognition.stop();
  else recognition.start();
}
</script>

<template>
  <div>
    <button
      @click="record"
      :class="classes"
      class="btn btn-outline btn-accent"
      type="button"
    >
      <i class="text-lg mr-2">
        <BIconMicFill v-if="listening" />
        <BIconMicMuteFill v-else />
      </i>
      {{ listening ? 'Listening' : 'Listen' }}
    </button>
    <div v-if="error" class="mt-3 text-error flex justify-center">
      <i class="text-lg mr-2 my-auto">
        <BIconExclamationTriangleFill />
      </i>
      <span>{{ error }}</span>
    </div>
  </div>
</template>
