<script setup>
import { computed, inject, ref } from 'vue';
import {
  BIconExclamationTriangleFill,
  BIconMicFill,
  BIconMicMuteFill } from 'bootstrap-icons-vue';

const autoretry = ref(false);
const error = ref(null);
const classes = computed(() => ({
  'btn-active btn-success !text-black': listening.value,
  'hidden': !recognition
}));
const recognition = inject('SpeechRecognition');
const transcript = inject('transcript');

if (!recognition) {
  error.value =
    'Web Speech API is not supported, upgrade to Chrome version 25 or later';
}

recognition.addListener('start', 'record', () => {
  if (transcript.text.endsWith('MAX_REACHED')) return;
  listening.value = true;
  error.value = null;
});

recognition.addListener('end', 'record', () => {
  listening.value = false;
  if (transcript.text.endsWith('MAX_REACHED')) {
    autoretry.value = false;
    error.value =
      'Max transcription length reached, please clear it before retrying';
    return;
  }
  if (autoretry.value) recognition.start();
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
  if (listening.value) {
    autoretry.value = false;
    recognition.stop();
    return;
  }

  recognition.start();
}
</script>

<template>
  <div>
    <div class="flex justify-center gap-2">
      <button
        @click="record"
        :class="classes"
        class="btn btn-outline btn-accent my-auto"
        type="button"
      >
        <i class="text-lg mr-2">
          <BIconMicFill v-if="listening" />
          <BIconMicMuteFill v-else />
        </i>
        {{ listening ? 'Listening' : 'Listen' }}
      </button>
      <div class="form-control my-auto">
        <label class="p-2 label cursor-pointer flex-col">
          <span class="mb-1 label-text">Auto-retry</span>
          <input
            @click="() => autoretry = !autoretry"
            :checked="autoretry"
            :class="{ 'bg-success': autoretry }"
            class="toggle sm-only:toggle-sm"
            type="checkbox"
          />
        </label>
      </div>
    </div>
    <div v-if="error" class="mt-3 text-error flex justify-center">
      <i class="text-lg mr-2 my-auto">
        <BIconExclamationTriangleFill />
      </i>
      <span>{{ error }}</span>
    </div>
  </div>
</template>
