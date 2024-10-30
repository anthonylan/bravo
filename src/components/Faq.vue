<template>
 <section class="faqs" id="faqs">
      <div class="h-container h-grid">
        <div class="faq-header">
          <h2 class="h-header">Frequently asked questions </h2>
          <p class="h-text tiny">
            Have another question? Contact me on <a href="https://instagram.com/codetonero" target="_blank" class="h-text underline">Instagram</a> or <a href="mailto:hello@anthonycharles.work" target="_blank" class="h-text underline">by email</a>.
          </p>
        </div>
        <div class="faq-wrapper">
          <div class="faq-list" v-for="faq in faqs">
           <h3 class="h-header">{{ faq.question }}</h3>
           <p class="tiny h-text">{{ faq.answer }}</p>
         </div>
        </div>
      </div>
    </section>
</template>


<script setup lang="ts">
import { faqs } from '@/sample'

</script>


<style lang="scss">
.faqs{
  .h-container{
    grid-template-columns: repeat(2, 1fr);
    gap: 50px;

  }
  .faq-list{
    border-bottom: 1px solid var(--sl-dark-primary);
    padding: 10px 0;
    &:last-child{
      border: none;
    }
  }

  @media (max-width:600px) {
    .h-container{
        grid-template-columns: 100%;
    }
  }
}
</style>