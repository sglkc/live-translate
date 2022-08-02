import { createApp } from 'vue'
import '@/assets/style.css'
import App from '@/App.vue'
import SpeechRecognition from '@/plugins/SpeechRecognition';

createApp(App).use(SpeechRecognition).mount('#app');
