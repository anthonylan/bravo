<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { supabase, User } from '@/controllers/supabase'
import { Toaster } from '@/utils'
import { StripeService } from '@/controllers/stripe'
import { useToast } from 'primevue/usetoast';


import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Textarea from 'primevue/textarea';
import Toast from 'primevue/toast';
import Theme from '@/components/Theme.vue';    
    

const toast = useToast();
const router = useRouter();
const route = useRoute();

const userRef = ref({ user_metadata: {} }) as any;
const waiting = ref(false);


 const createCustomerInStripe = async (): Promise<void> => {
  const { user_metadata, email } = userRef.value;

  if (!email) {
    return toast.add(Toaster.set({short: 'Failed', long: 'No email found!', type: 1}) as any);
  }

  if (user_metadata?.customer_id) {
        router.push('/account');
        return;
  }

  const response = await StripeService.newCustomer(email, user_metadata?.customer_name)

  if (response.error) {
    return toast.add(Toaster.set({short: 'Server error', long: response.error, type: 1}) as any);
  }

  const { error } = await User.updateUserMeta({
    customer_id: response.customer_id,
    customer_name: user_metadata?.customer_name,
    customer_bio: user_metadata?.customer_bio,
  })
  
  if (error) {
    return toast.add(Toaster.set({short: 'Failed', long: error, type: 1}) as any);
  }

  router.push('/todo');
};


onMounted(async () => {
  const { data, error } = await supabase.auth.getSession();
  const session = data?.session;  
  if (!session?.user) return router.push('/login');

  const { user_metadata: meta } = session?.user
  userRef.value = {...session.user, user_metadata: { ...meta, customer_name: meta?.customer_name || meta?.name || meta?.full_name  }};
});


</script>


<template>
    <Toast />

    <main>
       <div class="h-container">
        <h1>Welcome onboard</h1>
        <div v-if="waiting">
            <p>We've sent a confirmation email. Please verify your account by checking your inbox. You can close this page if you'd like</p>
        </div>

        <div v-else>
            <p>This is where you store additional user data, create their Stripe account, and save the account details in their metadata for future reference.</p>

            <form @submit.prevent="createCustomerInStripe" class="h-form-wrapper">
                <div class="h-form">
                    <label for="">Name</label>
                    <InputText v-model="userRef.user_metadata.customer_name" fluid required />
                </div>
                <div class="h-form h-top">
                    <label for="">Your bio</label>
                    <Textarea v-model="userRef.user_metadata.customer_bio" fluid />
                </div>
                <div class="h-form-cta h-top">
                    <Button type="submit" label="Setup account" />
                </div>
            </form>
        </div>
       </div>
    </main>


<div class="switch">
    <Theme />
</div>
</template>