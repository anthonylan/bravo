<template>
        <section class="features" id="features">
        <div class="h-container">
          <div class="h-center">
            <h1 class="h-title-2 h-header">Cut App Development Time by <br> <span class="highlight">50%—or More</span> </h1>
            <p class="h-text">Here are 4 simple reasons that sum it up. </p>
          </div>
          <div class="feature-lists h-grid h-top lg">
            <div class="list h-flex h-top md" v-for="(list, id) in features">
              <div>
               
              </div>
              <div>
                <h3 class="h-header">{{ list.title }}</h3>
                <p class="h-text tiny">{{ list.desc }}</p>
                <a href="#" @click.prevent="highLightCode(id)" class="h-brand-color">Talk is cheap, Show me the code! <i class="pi pi-arrow-up-right"></i></a>
              </div>
            </div>
          </div>
        </div>
    </section>
</template>



<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { faqs, features, testimonies, codePreview, states } from '@/sample'





const highLightCode = (id: number) => {
  states.value = { modal: true, codeViewer: id }
  nextTick(() => {
    document.querySelectorAll('pre code').forEach((el) => {
      window.hljs.highlightElement(el);
    })
  })
}
</script>



<style lang="scss">

.features{
  .feature-lists{
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
    a{
      font-size: .9rem;
    }
  }
  @media (max-width:500px) {
    .feature-lists{
      grid-template-columns: 100%;
    }
}
}


</style>