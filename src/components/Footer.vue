<template>
   <footer>
      <div class="h-container h-grid">
        <div class="footer-cta">
          
          <h1 class="h-header h-title-2">{{ priceConfig.cost }}<small class="h-text"> USD</small></h1>
          <Button label="Get Bravo" fluid @click="getKit" />
          <p class="h-text tiny">Pay once. Build unlimited projects!</p>

        </div>
        <div class="footer-links h-flex">
         <div class="wrap">
          <h4 class="h-text">LINKS</h4>
          <div class="links h-grid">
            <RouterLink to="/legal/tos" class="h-text">Terms of services</RouterLink>
            <RouterLink to="/legal/policy" class="h-text">Privacy policy</RouterLink>
            <a href="https://github.com/anthonylan" target="_blank" class="h-text">Github</a>
          </div>
         </div>
        </div>
      </div>
    </footer>
</template>


<script setup lang="ts">
import { priceConfig } from '@/sample'

import Button from 'primevue/button';

const getKit = () => window.open(priceConfig.url)

</script>

<style lang="scss" scoped>

footer{
  .h-container{
    grid-template-columns: repeat(2, 1fr);
    .footer-links{
      justify-content: end;
    }
    .footer-cta{
      h1 small{
        font-size: .9rem;
      }
    }
  }

  @media (max-width: 600px) {
    .h-container{
      grid-template-columns: 100%;
    }
  }
}

</style>