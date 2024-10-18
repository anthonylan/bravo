<template>
   <footer>
      <div class="h-container h-grid">
        <div class="footer-cta">
          
          <h1 class="h-header h-title-2">Get Bravo</h1>
          <Button :label="priceConfig.cost" fluid @click="getKit" />
          <p class="h-text tiny">Fully open-source with regular updates</p>

        </div>
        <div class="footer-links h-flex">
         <div class="wrap">
          <h4 class="h-text">LINKS</h4>
          <div class="links h-grid">
            <a href="https://buymeacoffee.com/d2our1c" target="_blank" class="h-text">Support me</a>
            <a href="https://github.com/anthonylan" target="_blank" class="h-text">Github</a>
            <a href="https://x.com/antdgreatio" class="h-text">Twitter</a>
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