<template>

    <nav>
       <div class="nav-wrapper h-grid h-align-mid">
         <div class="nav-logo">
            <RouterLink to="/" class="h-flex">
              <Logo />
            </RouterLink>
         </div>
         <div class="nav-links h-flex" v-if="route.name != 'home'">
            <RouterLink v-for="link in navLinks" :to="link.path">
                {{ link.name }}
            </RouterLink>
         </div>
         <div v-else class="nav-links h-flex">
            <a href="#features">Features</a>
            <a href="https://github.com/anthonylan/bravo/blob/main/README.md">Documentation</a>
            <a href="#faqs">FAQs</a>
         </div>
         <div class="nav-profile h-flex">
          <div class="h-flex h-align-mid" @click="pop.toggle($event)" v-if="user?.id">
                <span class="h-header">{{ user.user_metadata?.customer_name }}</span>
                <Avatar :image="avatarUrl(user)" shape="circle" /> 
            </div>
            <RouterLink v-else to="/login">Try the demo App</RouterLink>

            <Popover ref="pop">
                <div class="dropdown-links">
                   <p class="h-text"><RouterLink to="/account"><i class="pi pi-cog"></i> Settings</RouterLink></p>
                   <p class="h-text"><RouterLink to="/admin/dashboard"><i class="pi pi-gauge"></i> Admin Dashboard</RouterLink></p>
                   <p class="h-text"><a href="#" @click.prevent="signOut"><i class="pi pi-sign-out"></i> Log Out</a></p>
                </div>
            </Popover>
          </div>
       </div>
    </nav>
  
  


    <div class="switch">
        <Theme />
    </div>
  
  </template>
  
  <script setup lang="ts">
  import { ref,  onMounted } from 'vue';
  import { RouterLink, useRouter, useRoute } from 'vue-router';
  import {  avatarUrl, user } from '@/utils'
  import { supabase, User } from '@/controllers/supabase'

  import Theme from './Theme.vue';
  import Logo from './Logo.vue';
  
  import Avatar from 'primevue/avatar';
  import Popover from 'primevue/popover';
  
  
  const emit = defineEmits(['loaded', 'submit'])
  const Router = useRouter()
  const route = useRoute()
  const pop = ref()

  
  const navLinks  = [
      { name: 'CRUD', path: '/todo' },
      { name: 'Uploader', path: '/upload' },
      { name: 'Pricing', path: '/pricing' },
      { name: 'Auth', path: '/login' },
  ]
  
  
  

  const start = async () => {
  try {
    user.value = await User.getUser() as any;
    const requiresAuthPaths = ['/todo', '/upload', '/account'];

    if (requiresAuthPaths.includes(route.path) && !user.value) {
      location.href = '/login';
      return;
    }

    const { user_metadata: meta } = user.value || {};

    if (meta) {
      if (!meta.customer_id) {
        Router.push('/welcome');
        return;
      }

      emit('loaded');
    }
  } catch (error) {
    console.error('Error during initialization:', error);
  }
};

    


  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if(!error) Router.push('/login')
  }
  
  
  
  onMounted(() => {
      document.body.scrollTop = document.documentElement.scrollTop = 0;  
      start()
   
  })
  
  
  </script>
  
  <style lang="scss" scoped>
  
  nav{
    position: fixed;
    top: 0;
    box-shadow: var(--sl-header-shadow);
    width: 100%;
    z-index: 99;
    background-color: #fff;
    .nav-wrapper{
        grid-template-columns: 23% 50% 23%;
        padding: 25px 20px;
    }
    .nav-links{
        justify-content: center;
        a{
            font-weight: 500;
            margin: 0 30px;
        }
    }
   
  }

  
  .nav-profile{
    justify-content: end;
    .h-flex{
        justify-content: flex-end;
        cursor: pointer;
    }
  }
 
  
  


  .dark-theme nav{
    background-color: var(--sl-dark-bg);
    a{
        color: var(--sl-dark-gray)
    }
  }
  


  @media (max-width: 700px) {
   nav{
    .nav-wrapper{
      grid-template-columns: repeat(2, 1fr);
      .nav-links{
        display: none;
      }
    }
   }
  }
  </style>