<template>
     <section class="testimonies">
      <div class="h-container">
        <h3 class="h-header">Bravo cuts costs, I earn retainers - win-win.</h3>

        <div class="reviews h-grid h-top md">
          <div class="review" v-for="review in testimonies">
            <div class="comment">
              <p class="h-text">{{ review.comment }}</p>
            </div>
            <div class="author h-flex h-align-mid h-top">
              <Avatar :image="review.author?.avatar" shape="circle" size="large" />
              <div>
                <p class="h-text">{{ review.author.name }}</p>
                <p class="h-text">{{ review.author.role }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
</template>


<script setup lang="ts">
import Avatar from 'primevue/avatar';
import { testimonies } from  '@/sample'

</script>

<style lang="scss">
.testimonies{
  background-color: var(--sl-dark-primary);
  h3{
    color: var(--sl-dark-header-color);
  }
 
  .reviews{
    grid-template-columns: repeat(3, 1fr);
    gap: 50px;
    .comment{
      min-height: 290px;
    }
    p{
      color: var(--sl-dark-text-color);
      margin: 2px 0;
      font-size: 1.1rem;
    }
  }

  @media (max-width:600px) {
    .reviews{
      grid-template-columns: 100%;
      .comment{
        min-height: 180px;
      }
    }
  }
}
</style>