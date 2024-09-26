<script setup lang="ts">
import { RouterLink } from 'vue-router'
import Theme from '@/components/Theme.vue';

</script>

<template>

    <div class="switch">
        <Theme />
    </div>


    <div class="admin-nav">
        <div class="nav-logo">

        </div>
        <div class="nav-links">
            <h4>Menu</h4>
            <RouterLink to="/admin/dashboard"><i class="pi pi-gauge"></i> Dashboard</RouterLink>
            <RouterLink to="/admin/users"><i class="pi pi-users"></i> Users</RouterLink>
            <RouterLink to="/admin/ui-components"><i class="pi pi-objects-column"></i> UI Components</RouterLink>


            <h4 class="h-top md">Return</h4>
            <RouterLink to="/todo"><i class="pi pi-angle-left"></i> CRUD</RouterLink>
            <RouterLink to="/upload"><i class="pi pi-angle-left"></i> File upload</RouterLink>
            <RouterLink to="/pricing"><i class="pi pi-angle-left"></i> Pricing</RouterLink>
            <RouterLink to="/login"><i class="pi pi-angle-left"></i> Auth</RouterLink>
        </div>
    </div>
</template>


<style lang="scss" scoped>

.admin-nav{
    position: fixed;
    top: 0; left: 0;
    z-index: 99;
    width: 200px;
    height: 100%;
    background-color: var(--sl-dark-primary);
    padding: 20px;

    a{
        display: block;
        color: var(--sl-dark-text-color);
        padding: 10px 0;
        &:hover{
            text-decoration: none;
            opacity: .7;
        }
    }
    h4{
        color: var(--sl-dark-gray);
    }
}


</style>