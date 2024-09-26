<script setup lang="ts">
import { reactive, ref } from 'vue'
import { user, Toaster } from '@/utils'
import { Storage } from '@/controllers/supabase'
import { useToast } from "primevue/usetoast";


import Navbar from '@/components/Navbar.vue';
import DataView from 'primevue/dataview';
import FileUpload from 'primevue/fileupload';
import Button from 'primevue/button';
import Toast from 'primevue/toast';


const filesList = ref([]) as any
const toast = useToast();
const states = reactive({ loading: false, fileReader: {} }) as any
const fileupload = ref();
const storage = new Storage('files')



const upload = async (): Promise<void> => {
    const file = states.fileReader;
    const { id } = user.value

    if (!file?.name) {
        return toast.add(Toaster.set({type: 3, long: 'Select a file', short: 'No file' }) as any);
    }

    states.loading = true;
    const { error } = await storage.upload(file, { folder: id, publicUrl: false })

    error 
        ? toast.add(Toaster.set({ type: 1, long: error, short: 'Failed' }) as any)
        : await start();

    fileupload.value.upload();
};


const onSelect = (event: any): void => {
    if (filesList.value.length > 1) {
        toast.add({ summary: 'Stop',
            severity: 'warn',
            life: 3000,
            detail: 'Limit exceeded'
        });
        states.fileReader = {};
    } else if (event.files && event.files[0]) {
        states.fileReader = event.files[0];
    }
};



const start = async (): Promise<void> => {
    const { id } = user.value;
    const { files, error } = await storage.fetch(id, 100)

    if(error) return toast.add(Toaster.set({ type: 1, long: error, short: 'Failed' }) as any)
   
    filesList.value = files
    states.loading = false;
    states.fileReader = {};
};



</script>

<template>
    <Navbar @loaded="start" />
    <Toast />


    <main>
        <div class="panel">
            <div class="h-center">
                <h1 class="h-header">File upload demo</h1>
                <p class="h-text">Seamlessly upload files to a Supabase bucket, simplifying file storage and management.</p>
            </div>
            <div class="panel-body">
                <div class="body-container">
                    <div class="custom-uploader">
                        <FileUpload ref="fileupload" mode="basic" name="demo[]" url="/api/upload" accept="image/*" :maxFileSize="1000000"  @select="onSelect" />
                        <Button label="Upload" class="h-top" @click="upload" severity="secondary" :loading="states.loading" fluid />
                    </div>

                    <div class="file-list h-top md">
                        <h3 class="h-header">Uploaded files</h3>

                        <DataView :value="filesList" class="h-top">
                            <template #empty>No files uploaded</template>
                            <template #list="slotProps">
                                <div v-for="(item, index) in slotProps.items" :key="index" class="h-grid item h-align-mid">
                                    <p>{{ item.name }}</p>
                                    <a :href="item.publicUrl" target="_blank" class="h-link"><i class="pi pi-download"></i> Download</a>
                                </div>
                            </template>
                         </DataView>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>


<style lang="scss" scoped>

.file-list{
    .item{
        grid-template-columns: 80% 20%;
    }
}

.dark-theme{
    .file-list{
        .item{
            background-color: var(--sl-dark-primary);
        }
    }
}
</style>