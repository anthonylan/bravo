<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import Chip from 'primevue/chip';
import Message from 'primevue/message';
import Navbar from '@/components/Navbar.vue';

import { useToast } from 'primevue/usetoast';
import {  user, Toaster, currency } from '@/utils'
import { StripeService } from '@/controllers/stripe'
import { pricingItems } from '@/sample'

const toast = useToast()
const Router = useRouter() 
const route = useRoute()

const customerId = computed(() => user.value?.user_metadata?.customer_id)
const stripeItems = ref([]) as any
const loading = ref(false)

const start = async (): Promise<void> => {
    if (customerId.value) stripeItems.value = await StripeService.getSubscriptions(customerId.value)    
};


const portalExtender = async (): Promise<void> => {
    loading.value = true

    const { error, url } = await StripeService.getPortalLink(customerId.value);
    loading.value = false

    error 
        ? toast.add(Toaster.set({ long: error, short: 'Operation terminated', type: 1 }) as any)
        : location.href = url;
};


const checkoutExtender = async (priceId: string, isOneOff: boolean): Promise<void> => {
    const userId = user.value?.id;
    loading.value = true

    
    if (!userId){
        await Router.push('/login');
        return;
    }
    
    const { error, url } = await StripeService.getCheckoutLink({customerId: customerId.value, priceId, isOneOff });
    loading.value = false

    error 
        ? toast.add(Toaster.set({ long: error, short: 'Operation terminated', type: 1 }) as any)
        : location.href = url;
};


// check if the current user has a valid subscription or a one-time payment
// this is then compared against the priceID from the pricingItems
const isValid = (priceId: string) => {
    return StripeService.getItemsByPriceId(priceId, stripeItems.value)
}



</script>


<template>
    <Navbar @loaded="start" />
    <Toast />

    <main>
        <div class="pricing-panel">
            <div class="panel-header h-center">
                <h1 class="h-header">Pricing demo</h1>
                <p class="h-text">To test the integration, use this sample credit card: 4242 4242 4242 4242 4242</p>
                <Message severity="success" v-if="route.query?.q == 'success'">Payment successful!</Message>
            </div>
            <div class="pricing-wrap">
                <div class="price-items">
                    <div class="item" v-for="(item, index) in pricingItems">
                         <Chip icon="pi pi-bookmark-fill" v-if="isValid(item.priceId)?.id" :label="isValid(item.priceId)?.main_status" />

                        <h3 class="h-header">{{ item.title }}</h3>
                        <p class="h-color-gray h-text">{{ item.description }}</p>
                        <h1 class="h-header">{{ currency(item.cost) }}<small v-if="!item?.isOneOff">/month</small></h1>

                        <ul class="item-features">
                            <li v-for="feature in item.features" class="h-flex h-align-mid">
                                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" class="h-6 w-5 flex-none text-yellow-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 0 1-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"></path></svg>
                                <span class="h-color-gray h-text">{{ feature }}</span>
                            </li>
                        </ul>
                        <div class="item-cta" >
                            <Button v-if="stripeItems?.checkouts?.length > 0" label="Manage Subscription" :outlined="index != 1" fluid @click="portalExtender" :loading="loading" />
                            <Button v-else :label="`${user?.id ? `Buy Plan` : 'Log in to buy'}`" :outlined="index != 1" fluid @click="checkoutExtender(item.priceId, item?.isOneOff)" :loading="loading" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>

</template>


<style lang="scss" scoped>



.pricing-panel{
    .pricing-wrap{
        padding-top: 80px;
    }
}

.price-items{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    .p-chip{
        position: absolute;
        top: -25px; left: 15px;
    }
 
    .item{
        border: 1px solid var(--sl-border-color);
        padding: 30px;
        border-radius: var(--sl-radius-sm);
        position: relative;
        .item-features{
            min-height: 100px;
        }

        small{
            font-size: .9rem;
        }
        h3{
            margin-top: 0px;
        }
        ul{
            li{
                padding: 5px 0;
            }
            svg{
                width: 18px;
                fill: var(--sl-brand-color);
            }
        }
        .item-cta{
            padding-top: 20px;
          
        }
    }
}

.dark-theme{
    .price-items{
        .item{
            background-color: var(--sl-dark-primary);
            border-color: var(--sl-dark-primary);
        }
    }
}

</style>