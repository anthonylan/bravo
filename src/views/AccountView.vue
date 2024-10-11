<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { avatarUrl, user, Toaster } from '@/utils';
import { User, Storage } from '@/controllers/supabase'
import {  StripeService } from '@/controllers/stripe'
import { useToast } from 'primevue/usetoast';

import InputText from 'primevue/inputtext';
import Avatar from 'primevue/avatar';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';
import FileUpload from 'primevue/fileupload';
import Toast from 'primevue/toast';
import Navbar from '@/components/Navbar.vue';


const toast = useToast()
const router = useRouter()
const states = reactive({ loading: false, ptLoading: false }) as any

const storage = new Storage('avatars')
const customerId = computed(() => user.value?.user_metadata?.customer_id)
const stripeItems = ref([]) as any

const start = async (): Promise<void> => {
  user.value = await User.getUser();  
  if (customerId.value) stripeItems.value = await StripeService.getSubscriptions(customerId.value)     
};

const onUpload = async (event: any): Promise<void> => {
  const files = event?.files;
  const { customer_avatar } = user.value?.user_metadata || {};
  states.loading = true;

  if (customer_avatar?.name) {
    await storage.delete(customer_avatar.name, 'private')
  }

  if (files?.length > 0) {
    const { data, error } = await storage.upload(files[0], { folder: 'private', publicUrl: true })

    if (error) {
      toast.add(Toaster.set({ short: 'Failed', long: error, type: 1 }) as any);
      states.loading = false;
      return;
    }

    await User.updateUserMeta({
      customer_avatar: { url: data?.publicUrl, name: files[0].name }
    });

    toast.add(Toaster.set({ short: 'Success', long: 'Avatar successfully saved', type: 2 }) as any);
    states.loading = false;
    await start();
  }
};



const saveUserInfo = async (): Promise<void> => {
  const { customer_name, customer_bio } = user.value.user_metadata || {};

  const { error } = await User.updateUserMeta({ customer_name, customer_bio });

  const toastConfig = error
    ? Toaster.set({ type: 1, long: error.message, short: error.code })
    : Toaster.set({ type: 2, long: 'Changes saved!', short: 'Saved' });

  toast.add(toastConfig as any);
};



const portalExtender = async (): Promise<void> => {
  states.ptLoading = true 

  const response = await StripeService.getPortalLink(customerId.value);
  states.ptLoading = false
  

  if (response.error) {
    const toastMsg = Toaster.set({ long: response.error, short: 'Failed', type: 1 });
    toast.add(toastMsg as any);
    return 
  }

  location.href = response.url;
};



</script>

<template>
<Navbar @loaded="start" />

<main>
    <div class="account-panel h-container">
        <h2 class="h-header">Account demo</h2>
        <div class="profile h-tab">
            <div class="profile-header"></div>
            <div class="profile-body">
                <Avatar :image="avatarUrl(user)" size="xlarge" shape="circle" />
                <h3 class="h-header">Your photo</h3>
                <p class="h-text">This will be displayed on your profile</p>
                <div class="custom-uploader h-flex">
                    <FileUpload mode="basic" name="demo[]" url="/api/upload" accept="image/*" :disabled="states.loading" :maxFileSize="80000" @upload="onUpload" :auto="true" chooseLabel="Browse" customUpload  @uploader="onUpload" :multiple="true" />
                    <p v-if="states.loading"><i class="pi pi-spin pi-spinner-dotted"></i> Uploading...</p>
                </div>
            </div>
        </div>
        <form @submit.prevent="saveUserInfo" class="editor h-form-wrapper h-top h-tab">
            <div class="h-form">
                <label for="">Name</label>
                <InputText v-model="user.user_metadata.customer_name" fluid />
            </div>
            <div class="h-form h-top">
                <label for="">Email</label>
                <InputText v-model="user.email" fluid readonly />
            </div>
            <div class="h-form h-top">
                <label for="">About me</label>
                <Textarea v-model="user.user_metadata.customer_bio" fluid rows="3" />
            </div>
            <div class="h-form h-top h-flex fend">
                <Button label="Save changes" type="submit" />
            </div>
        </form>

        <div class="billing h-top h-tab">
            <h3 class="h-header">Billing</h3>
            <p class="h-top h-text">Bravo integrates with Stripe for safe and secure payments and subscriptions.</p>
            <Button v-if="stripeItems.checkouts?.length > 0" outlined @click="portalExtender" label="Manage Subscription" :loading="states.ptLoading" />
            <Button v-else outlined label="View pricing" @click="router.push('/pricing')" />
        </div>
    </div>
</main>


<Toast />
</template>


<style lang="scss" scoped>

.editor, .profile, .billing{
    padding: 30px;
    background-color: var(--sl-offwhite);
}

.dark-theme{
    .h-tab{
        background-color: var(--sl-dark-primary);
    }
}

</style>