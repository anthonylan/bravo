import '@csstools/normalize.css';
import './assets/styles/main.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)


declare global {
  interface Window {
      hljs: any,
  }
}

// START PRIMEVUE ============

import PrimeVue from 'primevue/config';
import { definePreset } from '@primevue/themes';
import Theme from '@primevue/themes/nora'; // choose your prefered style
import Tooltip from 'primevue/tooltip';
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';



const MyPreset = definePreset(Theme, {
    semantic: {
      primary: {
        50: '{orange.50}',
        100: '{orange.100}',
        200: '{orange.200}',
        300: '{orange.300}',
        400: '{orange.400}',
        500: '{orange.500}',
        600: '{orange.600}',
        700: '{orange.700}',
        800: '{orange.800}',
        900: '{orange.900}',
        950: '{orange.950}'
      }
    }
  });

app.use(PrimeVue, {
    theme: {
        preset: MyPreset,
        options: {
            darkModeSelector: '.dark-theme',
        }
    }
})

app.directive('tooltip', Tooltip);
app.use(ToastService);
app.use(ConfirmationService);

// END PRIMEVUE ==============


app.use(router)
app.mount('#app')
