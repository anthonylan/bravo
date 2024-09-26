<script setup lang="ts">
import { ref } from 'vue'

import Navbar from '@/components/Navbar.vue';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Checkbox from 'primevue/checkbox';
import InputNumber from 'primevue/inputnumber';
import Toast from 'primevue/toast';
    
import { useToast } from 'primevue/usetoast';
import { Toaster, user } from '@/utils';
import { Database } from '@/controllers/supabase'


const form = ref({}) as any
const tasks = ref([]) as any
const toast = useToast()
const generateRandomInt8 = () => {
    return Math.floor(Math.random() * (Number.MAX_SAFE_INTEGER - 1)) + 1;
};



const start = async (): Promise<void> => {
  const { data, error } = await Database.fetch('tasks', { key: 'ref', value: user.value.id });
  if (!error) tasks.value = data || [];
  else {
    const errorMsg = Toaster.set({ long: error.message, short: 'Error', type: 1 });
    toast.add(errorMsg as any);
  }
};



const addTask = async (): Promise<void> =>  {
    if (tasks.value.length > 2) {
        const limitMsg = Toaster.set({
            long: 'You have exceeded the task limit.',
            short: 'Task Limit', type: 1,
        });
        return toast.add(limitMsg as any);
    }

  const newTask = createTaskEntry(form.value);
  const { data, error } = await Database.set('tasks', newTask);

  if (!error) {
    await start(); 
    form.value = {}; 
  } else {
    const errorMsg = Toaster.set({ long: error.message, short: error.code, type: 1 });
    toast.add(errorMsg as any);
  }
}


 const createTaskEntry = (taskDetails: any): any => ({
    title: taskDetails.title,
    date: new Date().toDateString(),
    id: generateRandomInt8(),
    hr: 1,
    ref: user.value.id, // Unique key for the query string parameters in the future fetch request
    checked: false,
});



 const deleteTask = async (id: string): Promise<void> => {
    await Database.delete('tasks', id);
    await start();
};

 const updateTask = async (id: string, payload: any): Promise<void> => {
    const { data, error } = await Database.set('tasks', { ...payload, id });
};


</script>


<template>
    <Navbar @loaded="start" />
    <Toast />

    <main>
        <div class="panel">
            <div class="h-center">
                <h1 class="h-header">CRUD demo</h1>
                <p class="h-text">Perform Create, Read, Update, and Delete (CRUD) operations on your database with just a single line of code, streamlining your workflow</p>
            </div>
           <div class="panel-body h-top md">
             <div class="body-container">
                <form class="h-grid task-form" @submit.prevent="addTask">
                    <InputText v-model="form.title" placeholder="Enter task description" fluid required />
                    <Button label="Add Task" type="submit" />
                </form>
                <ul class="task-list">
                    <li v-for="task in tasks" class="h-grid h-align-mid h-top">
                        <div class="h-flex h-align-mid">
                            <Checkbox v-model="task.checked" :binary="true" @change="updateTask(task.id, { checked: task.checked })" />
                           <p> {{ task.title }}</p>
                        </div>
                        <div class="h-mr">
                            <InputNumber v-model="task.hr" showButtons fluid suffix=" hr" @input="updateTask(task.id, { hr: task.hr })" />
                        </div>
                        <a href="#" @click.prevent="deleteTask(task.id)">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM8.96963 8.96965C9.26252 8.67676 9.73739 8.67676 10.0303 8.96965L12 10.9393L13.9696 8.96967C14.2625 8.67678 14.7374 8.67678 15.0303 8.96967C15.3232 9.26256 15.3232 9.73744 15.0303 10.0303L13.0606 12L15.0303 13.9696C15.3232 14.2625 15.3232 14.7374 15.0303 15.0303C14.7374 15.3232 14.2625 15.3232 13.9696 15.0303L12 13.0607L10.0303 15.0303C9.73742 15.3232 9.26254 15.3232 8.96965 15.0303C8.67676 14.7374 8.67676 14.2625 8.96965 13.9697L10.9393 12L8.96963 10.0303C8.67673 9.73742 8.67673 9.26254 8.96963 8.96965Z" fill="#ff2600"></path> </g></svg>
                        </a>
                    </li>
                </ul>
             </div>
           </div>
        </div>
    </main>
</template>

<style lang="scss" scoped>


.task-form{
    grid-template-columns: 70% calc(30% - 10px);
}

.task-list{
    list-style: none;
    padding: 0px;
    li{
        border: 1px solid var(--sl-border-color);
        background-color: var(--sl-offwhite);
        padding: 3px 15px;
        grid-template-columns: calc(100% - 170px) 120px 30px;

        svg{
            width: 24px;
        }
    }
}


.dark-theme{
    .task-list{
        li{
            background-color: var(--sl-dark-bg);
            border: none;
        }
    }
}

</style>