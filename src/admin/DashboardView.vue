<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import AdminNav from './misc/AdminNav.vue';
import { currency, theme } from '@/utils'
import { setChartData, setChartOptions } from '../sample'

import Chart from 'primevue/chart';


const chartData = ref();
const chartOptions = ref();

const start = () => {
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
}



const statItems = [
    {
         total: 64333,
         title: 'Total page views',
         icon: 'pi-eye'
   },
   {
         total: 5333,
         title: 'Total Revenue',
         icon: 'pi-shopping-cart',
         currency: 'USD'
   },
   {
         total: 243,
         title: 'Total paying Users',
         icon: 'pi-shopping-bag'
   },
   {
         total: 1333,
         title: 'Total Signups',
         icon: 'pi-users'
   }
]




// watch for theme toggle and re-render the chart for color accuracy
  watch(() => theme.value, () => {
    start()
  })

  onMounted(() => {
    start()
});


</script>


<template>
    <AdminNav />


    <main class="admin-main">
        <div class="main-header h-grid h-alig-mid">
            <h2>Dashboard</h2>
            <div class="breadcrumb">
                <h4>Admin / <RouterLink to="/admin/dashboard">Dashboard</RouterLink></h4>
            </div>
        </div>
        <div class="top-stats h-grid h-card">
            <div class="stat" v-for="stat in statItems">
                <div class="stat-icon h-flex h-align-mid">
                    <i class="pi" :class="stat.icon" style="font-size: 1.4rem;"></i>
                </div>
                <div class="stat-info h-top">
                    <h2>{{ stat.currency ? `${currency({amount: stat.total, currency: stat.currency })}` : stat.total }}</h2>
                    <p>{{ stat.title }}</p>
                </div>
            </div>
        </div>

        <div class="stat-bars h-card h-top md">
            <Chart type="bar" :data="chartData" :options="chartOptions" style="height: 400px;" />

        </div>
    </main>
</template>



<style lang="scss" scoped>


.top-stats{
    grid-template-columns: repeat(4, 1fr);
    .stat{
        padding: 20px;
        h2, p{
            margin: 8px 0;
        }
        .stat-icon{
            height: 50px;
            width: 50px;
            background-color: var(--sl-border-color);
            border-radius: 50px;
            justify-content: center;
        }
    }
}

.stat-bars{
    padding: 20px;
}

.dark-theme{
    .top-stats{
        background-color: var(--sl-dark-primary);

        .stat{
            .stat-icon{
                background-color: var(--sl-dark-gray);
            }
        }
    }
    .stat-bars{
        background-color: var(--sl-dark-primary);
    }
}
</style>