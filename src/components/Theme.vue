<template>
    <div>
        <Button @click="toggleDarkMode" :icon="`pi ${theme === 'dark' ? 'pi-moon' : 'pi-sun'}`" />
    </div>
</template>

<script setup lang="ts">
import { onMounted, nextTick } from 'vue';
import Button from 'primevue/button';
import { theme } from '@/utils'


const toggleDarkMode = () => {
    const element = document.querySelector('html') as HTMLElement;
    element.classList.toggle('dark-theme');    

    theme.value = element.classList.contains('dark-theme') ? 'dark' : 'light';
    localStorage.setItem('theme', theme.value);
};

onMounted(() => {
    const storedTheme = localStorage.getItem('theme');
    
    if (storedTheme) {
        theme.value = storedTheme;
        const element = document.querySelector('html') as HTMLElement;
        if (theme.value === 'dark') {
            element.classList.add('dark-theme');
        }
        return;
    }

    nextTick(() => {
        toggleDarkMode()
    })
});
</script>
