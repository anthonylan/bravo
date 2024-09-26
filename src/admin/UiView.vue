<script setup lang="ts">
import AdminNav from './misc/AdminNav.vue';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import InputOtp from 'primevue/inputotp';
import Message from 'primevue/message';

</script>


<template>
    <AdminNav />


    <main class="admin-main">
        <div class="main-header h-grid h-alig-mid">
            <h2>UI Components</h2>
            <div class="breadcrumb">
                <h4>Admin / <RouterLink to="/admin/ui-components">Components</RouterLink></h4>
            </div>
        </div>

        <div class="main-body">
           <div class="button-list">
            <h4>Buttons</h4>
             <div class="h-flex">
                <Button label="Primary" />
                <Button label="Secondary" severity="secondary" />
                <Button label="Success" severity="success" />
                <Button label="Info" severity="info" />
                <Button label="Warn" severity="warn" />
                <Button label="Danger" severity="danger" />
             </div>
           </div>
           <div class="form-list">
            <h4>Inputs</h4>
             <div class="h-flex">
                <div class="h-form">
                    <label for="">Text input</label>
                    <InputText />
                </div>
               <div class="h-form">
                <label for="">Number input</label>
                <InputNumber show-buttons />
               </div>
               <div class="h-form">
                <label for="">OTP input</label>
                <InputOtp />
               </div>
             </div>
           </div>
           <div class="message-list">
            <h4>Message</h4>
              <Message>Visit the PrimveVue official docs for more UI components by clicking this <a href="https://primevue.org/" style="color: var(--sl-brand-color);" target="_blank">link</a> </Message>
           </div>
        </div>
      
    </main>
</template>



