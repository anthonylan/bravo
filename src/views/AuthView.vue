<template>

      <div class="auth-header">
            <RouterLink to="/">
                <div class="nav-logo h-flex">
                    <Logo />
                </div>
            </RouterLink>
      </div>

      <!-- UPDATE PASSWORD -->
      <div class="auth-body">
        <div class="reset-form form-wrapper" v-if="states.validReset">
            <div class="form-head h-center">
                <h1 class="h-title-3 h-header">Set new password</h1>
                <p class="h-top xs h-font-l h-text">Must be atleast 6 characters </p>
            </div>

            <form @submit.prevent="setNewPassword" class="h-form-wrapper h-top md">
                <div class="h-form h-top">
                    <label for="password">Password</label>
                    <Password v-model="form.newPassword" toggleMask fluid required />
                </div>
                <div class="h-form h-top">
                    <label for="password">Confirm Password</label>
                    <Password v-model="form.confirmPassword" toggleMask fluid required />
                </div>
                <div class="h-top">
                    <Button size="large" type="submit" :loading="states.loading" fluid>Reset password</Button>
                </div>
            </form>
         </div>

         <!-- LOGIN / SIGN UP -->
         <div class="form-wrapper" v-else>
                <div class="form-head h-top h-center">
                    <h1 class="h-title-3 h-header"> {{ login ? 'Login demo 👋' : `Sign up demo` }}</h1>
                    <p class="h-top xs h-text">
                        <span class="h-font-l">  {{ login ? `Don't have an account? ` : `Already have an account? ` }} </span>
                        <RouterLink class="h-font-l h-link" v-if="login" to="/signup">Sign up</RouterLink>
                        <RouterLink class="h-font-l h-link" v-else to="/login">Sign in</RouterLink>
                    </p>
                </div>
              
                <div class="seperator h-top md">
                    <div class="h-grid">
                        <Button severity="secondary" outlined :loading="states.loading" size="large" @click="submit('google')" fluid> <i class="pi pi-google"></i> </Button>
                        <Button severity="secondary" outlined :loading="states.loading" size="large" @click="submit('discord')" fluid><i class="pi pi-discord"></i></Button>
                        <Button severity="secondary" outlined :loading="states.loading" size="large" @click="submit('github')" fluid> <i class="pi pi-github"></i> </Button>
                    </div>
                    <Divider>
                        <span class="h-font-l">or continue with</span>
                    </Divider>
                </div>
    
                <form @submit.prevent="submit('email')" class="h-form-wrapper h-top">
                    <div class="h-form h-top" v-if="!login">
                        <label for="name">Name</label>
                        <InputText v-model="form.name" fluid required />
                    </div>
                    <div class="h-form h-top">
                        <label for="email">Email</label>
                        <InputText v-model="form.email" type="email" fluid required />
                    </div>
                    <div class="h-form h-top">
                        <label for="password">Password</label>
                        <Password v-model="form.password" toggleMask fluid required />
                    </div>
                    <div class="h-top">
                        <Button size="large" type="submit" :loading="states.loading" fluid>{{ login ? 'Log in' : 'Sign up' }}</Button>
                    </div>
                </form>
                <div class="h-top h-center">
                    <p class="h-font-l" v-if="login">Forgot your password? <a href="#" class="h-link" @click.prevent="states.modal = true">Reset it</a></p>
                    <p class="h-font-l" v-else>By signing up, you agree to the <a href="#" class="h-link">Terms & Conditions</a> and <a href="#" class="h-link">Privacy Policy</a>. </p>
                </div>
            </div>
    </div>
    

    <!-- RESET PASSWORD DIALOG -->
    <Dialog v-model:visible="states.modal" modal style="width: 370px;" header="Request reset link">
        <form @submit.prevent="resetPassword" class="h-form-wrapper">
            <div class="h-form">
                <label for="email">Email address</label>
                <InputText v-model="form.email" type="email" required fluid />
            </div>
            <Button type="submit" class="h-top" :loading="states.loading" fluid>Send password reset email</Button>
        </form>
    </Dialog>
    
    
    <Toast />

    
    </template>
    
    <script setup lang="ts">
    import { ref, reactive, computed, onMounted } from 'vue'
    import { useRoute, RouterLink } from 'vue-router'
    
    import Button from 'primevue/button';
    import InputText from 'primevue/inputtext';
    import Password from 'primevue/password';
    import Divider from 'primevue/divider';
    import Dialog from 'primevue/dialog';
    import Toast from 'primevue/toast';

    import Logo from '@/components/Logo.vue';
    
    
    import { useToast } from 'primevue/usetoast';
    import { Toaster } from '@/utils'
    import { supabase, Auth } from '@/controllers/supabase'
    import router from '@/router';
    
    
    const toast = useToast()
    const route = useRoute()

    const form = reactive({}) as any
    const states = reactive({ loading: false, modal: false, validReset: false })
    const login = computed(() => route.name === "Login")


    
    const fsErrorExtend = (long: any, short: any) => {
        toast.add(Toaster.set({type: 1,long, short }) as any)
        states.loading = false
    }

    
 const submit = async (provider: any): Promise<void> => {
    states.loading = true;
    const welcomeUrl = 'welcome?q=waiting_verification';

    // Handle OAuth sign-in
    if (provider !== 'email') {
        const { error } = await Auth.handleOAuth(provider);
        if (error) return fsErrorExtend(error, 'Failed');
        return;
    }

    const { error } = await Auth.handleEmailAuth(form, login.value, `${location.origin}/${welcomeUrl}`);
    if (error) return fsErrorExtend(error, 'Failed');

    const success_url = login.value ? '/todo' : `/${welcomeUrl}`
    router.push(success_url);
};


    
    
const resetPassword = async (): Promise<void> => {
    const { error } = await Auth.handleReset(form.email, `${location.origin}/update-password`)

    const message = error 
        ? { type: 1, long: error, short: 'Failed' }
        : { type: 2, long: 'Recovery link sent!', short: 'Success' };
    
    toast.add(Toaster.set(message) as any);
    if (!error) states.modal = false;
};

const setNewPassword = async (): Promise<void> => {
    if (form.newPassword !== form.confirmPassword) {
        return toast.add(Toaster.set({
            type: 3, long: `Passwords don't match`, short: 'Mismatch'
        }) as any);
    }

    const { error } = await  Auth.handlePassword(form.newPassword )

    const message = error 
        ? { type: 1, long: error, short: 'Failed' }
        : { type: 2, long: 'Password updated', short: 'Success' };

    toast.add(Toaster.set(message) as any);
    if (!error) {
        states.validReset = false;
        router.push('/login');
    }
};

onMounted(() => {
    supabase.auth.onAuthStateChange(async (event) => {
        if (event === "PASSWORD_RECOVERY") states.validReset = true;
    });
});

    
   
    </script>
    
<style scoped lang="scss">

.auth-body{
    height: 100vh;
    width: 100%;
    background-color: var(--sl-offwhite);
    display: flex;
    align-items: center
}

.form-wrapper{
    background-color: #fff;
    border: 1px solid var(--sl-border-color);
    padding: 20px;
    width: 370px;
    margin: 0 auto;
    .h-font-l{
        font-size: .9rem;
    }
}

h1, h2, p{
    margin: 0px;
}
.seperator{
    .h-grid{
        grid-template-columns: repeat(3, 1fr);
    }
}


.auth-header{
    position: absolute;
    left: 20px; top: 25px;
    min-width: 200px;
}
    
    

.dark-theme{
    .auth-body{
        background-color: var(--sl-dark-bg);
    }
    .form-wrapper{
        background-color: var(--sl-dark-primary);
        border: 1px solid var(--sl-dark-primary);
    }
}

@media (max-width:700px) {
    .auth-header{
        position: relative;
    }
}
</style>