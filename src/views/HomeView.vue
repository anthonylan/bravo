<script setup lang="ts">
import { useRouter } from 'vue-router'
import Navbar from '@/components/Navbar.vue';
import Button from 'primevue/button';
import Avatar from 'primevue/avatar';
import Dialog from 'primevue/dialog';

import { codePreview, states, priceConfig } from '@/sample'

import Reviews from '@/components/Reviews.vue';
import Features from '@/components/Features.vue';
import Faq from '@/components/Faq.vue';
import Footer from '@/components/Footer.vue';


const router = useRouter()
const profileUrl = `https://storage.ko-fi.com/cdn/useruploads/72d6a366-856b-4985-97d1-8377a5b4b738_83564aea-3064-4740-a9e8-2a47abf01f76.jpeg`
const getKit = () => window.open(priceConfig.url)



</script>

<template>
  <Navbar />

  <main>
    <div class="hero">
      <div class="hero-text h-center h-container">
        <h1 class="h-header"><span class="highlight">Supercharged</span> SaaS template: Vue + Node.js</h1>
        <p class="h-text">A flexible, feature-rich, full-stack SaaS boilerplate that accelerates development and reduces costs.</p>
      </div>
      <div class="hero-cta h-flex h-top md">
        <Button :label="`Get Bravo - ${priceConfig.cost} one-time`" @click="getKit" />
        <Button label="Try the demo" severity="secondary" @click="router.push('/login')" />
      </div>
    </div>

    <div class="tech-stack">
       <div class="h-center">
        <p class="h-text tiny">Built and Ships with </p>
       </div>
       <div class="h-container h-flex h-top">
        <img src="../assets/images/vuejs.svg" alt="" width="110">
        <img src="../assets/images/supabase.svg" alt="" width="200">
        <img src="../assets/images/nodejs.svg" alt="" width="80">
        <img src="../assets/images/stripe.svg" alt="" width="80">
       </div>
    </div>

    <section class="intro">
      <div class="h-container">
        <div class="intro-header h-grid">
        <div class="profile-card h-flex h-align-mid">
           <Avatar :image="profileUrl" size="xlarge" shape="round" />
        </div>
        <div class="profile-bio">
          <h3>Hey, it's Anthony 👋</h3>
          <p class="tiny">In 2019, I committed to focusing solely on SaaS projects. Over time, I noticed a pattern: many tasks, like user authentication, payment integration, and database setup, were repetitive across different projects. To streamline the process, I created reusable components that could be quickly adapted to any project.</p>
          <p class="tiny">That's what <strong>Bravo</strong> is all about—a SaaS starter kit that helps developers and indie makers save time and focus on what matters most: building the product's core features.</p>
        </div>
      </div>

      </div>
    </section>

    <Features />

    <Reviews />

    <Faq />

    <Footer />

  </main>



<Dialog v-model:visible="states.modal" style="width: 90%;" header="Code Preview" contentClass="code-preview" modal>
<pre>
<code class="language-javascript" v-if="states.codeViewer == 0">
{{ codePreview.one }}
</code>
</pre>

<pre>
<code class="language-javascript" v-if="states.codeViewer == 1">
{{ codePreview.two }}
</code>
</pre>

<pre>
<code class="language-javascript" v-if="states.codeViewer == 2">
{{ codePreview.three }}
</code>
</pre>

<pre>
<code class="language-javascript" v-if="states.codeViewer == 3">
{{ codePreview.four }}
</code>
</pre>
</Dialog>

</template>


<style lang="scss" scoped>


main{
  padding: 30px 10px;
}


section{
  padding: 80px 0;
}

p{
  font-size: 1.3rem;
  &.tiny{
    font-size: 1rem;
    font-weight: 400;
  }
}

.hero{
  padding: 130px 0;
  .hero-text{

    h1{
      font-size: 3.6rem;
    }
    p{
      max-width: 700px;
      margin: 20px auto;
    }
  }
  .hero-cta{
    justify-content: center;
  }
}

.tech-stack{
  .h-container{
    justify-content: space-around;
    padding: 10px 0;
  }
}


.intro{
  .h-container{
    max-width: 700px;
    background-color: var(--sl-offwhite);
    padding: 20px;
    p{
      margin-bottom: 0px;
    }
    a{
      text-decoration: underline;
    }
  }
}

.intro-header{
  grid-template-columns: 200px calc(100% - 230px);
  gap: 20px;
  .profile-card{
    justify-content: center;
  }
  h3{
    margin-top: 0px;
  }
}

.p-avatar-xl{
  height: 100%;
  width: 100%;
}


pre{
  margin: 0px;
}

.dark-theme{
 .intro{
  .h-container{
    p, h3{
      color: var(--sl-dark-primary);
    }
  }
 }

}


@media (max-width:500px) {
  .intro-header{
    grid-template-columns: 100%;
  }

  .tech-stack .h-container{
    flex-direction: column;
    img{
      margin: 0 auto;
    }
  }

  .hero{
    .hero-cta{
      flex-direction: column;
    }
    .hero-text{
      h1{
        font-size: 2.6rem;
      }
    }
  }
}

</style>
