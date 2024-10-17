<template>
    <main>
        <div class="h-container">
            <Button label="Back" outlined  @click="router.push('/')" />

            <h1>Coming soon</h1>

            <p> Last updated: {{  new Date().toDateString() }}</p>
        </div>
    </main>
</template>


<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'


const route = useRoute()
const router = useRouter()


import Button from 'primevue/button';


</script>


<style lang="scss" scoped>


p{
    margin: 30px 0;
    font-size: .9rem;
    line-height: 1.5;
}


br{
    display: block;
   
}

.dark-theme p{
    color: var(--sl-dark-text-color);
}

</style>