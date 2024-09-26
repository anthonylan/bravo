<script setup lang="ts">
import { ref } from 'vue'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import ToggleSwitch from 'primevue/toggleswitch';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';
import SplitButton from 'primevue/splitbutton';



import AdminNav from './misc/AdminNav.vue';

import { FilterMatchMode } from '@primevue/core/api';
import { generateCustomers, statuses } from '../sample'

const filters = ref({
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    country: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    representative: { value: null, matchMode: FilterMatchMode.IN },
    status: { value: null, matchMode: FilterMatchMode.EQUALS },
    banned: { value: null, matchMode: FilterMatchMode.EQUALS }
});

const customers = ref(generateCustomers(20))
const menu = ref([
    { label: 'Edit' }, { label: 'Delete user' }, { label: 'Log out user' }
])

</script>


<template>
    <AdminNav />

    <main class="admin-main">
        <div class="main-header h-grid h-alig-mid">
            <h2>Users</h2>
            <div class="breadcrumb">
                <h4>Admin / <RouterLink to="/admin/users">Users</RouterLink></h4>
            </div>
        </div>
        <div class="h-card">
            <DataTable v-model:filters="filters" :value="customers" paginator :rows="10" :rowsPerPageOptions="[10, 20, 50]" dataKey="id" filterDisplay="row" :globalFilterFields="['name', 'status', 'banned']"
            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            currentPageReportTemplate="{first} to {last} of {totalRecords}" size="large">
                <template #paginatorstart>
                    <Button type="button" icon="pi pi-refresh" text />
                </template>
                <template #paginatorend>
                    <Button type="button" icon="pi pi-download" text />
                </template>
                <Column field="name" header="Name" style="width: 20%" :showFilterMenu="false">
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" placeholder="Search by name" />
                    </template>
                </Column>
                <Column field="status" header="Subscription" :showFilterMenu="false">
                    <template #filter="{ filterModel, filterCallback }">
                        <Select v-model="filterModel.value" @change="filterCallback()" :options="statuses" placeholder="Select" style="min-width: 100px" :showClear="true">
                            <template #option="slotProps">
                                {{ slotProps.option }}
                            </template>
                        </Select>
                    </template>
                </Column>
                <Column field="last_active" header="Last seen" style="width: 200px;"></Column>
                <Column field="customer_id" header="Stripe ID"></Column>
                <Column field="banned" header="Banned" dataType="boolean">
                <template #body="{ data }">
                    <ToggleSwitch v-model="data.banned" />
                </template>
                <template #filter="{ filterModel, filterCallback }">
                        <ToggleSwitch v-model="filterModel.value" :indeterminate="filterModel.value === null" binary @change="filterCallback()" />
                    </template>
                </Column>
                <Column field="id" style="width: 100px;">
                    <template #body="{ data }">
                        <SplitButton label="Edit" text :model="menu" dropdownIcon="pi pi-ellipsis-h" size="small" />
                    </template>
                </Column>

            </DataTable>
        </div>
    </main>
</template>


<style lang="scss" scoped>






</style>