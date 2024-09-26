<template>
    <main>
        <div class="h-container">
            <Button label="Back" outlined  @click="router.push('/')" />

            <div class="tos" v-if="route.params.id == 'tos'">
                <h2 class="h-header">Terms and Conditions</h2>

                <p>1.Introduction  <br>
                    By using Bravo, you confirm your acceptance of, and agree to be bound by, these terms and conditions.</p>

                <p>2. Agreement to Terms and Conditions  <br>
                    This Agreement takes effect on the date on which you first use the Bravo application.</p>

                <p>3. Unlimited Access Software License with Termination Rights  <br>
                The Bravo Software License facilitates the acquisition of Bravo software through a single purchase, granting users unrestricted and perpetual access to its comprehensive functionalities. Tailored for independent creators, entrepreneurs, and small businesses, Bravo empowers users to create compelling web pages and online portfolios.  
                This license entails a straightforward and flexible arrangement, exempting users from recurring fees or subscriptions. However, it is important to acknowledge that the licensor retains the right to terminate the license without conditions or prerequisites. This termination provision enables the licensor to exercise control over software distribution and utilization.  
                Opting for the Bravo Software License enables users to enjoy the benefits of the software while recognizing the licensor's unrestricted termination rights, which provide adaptability and address potential unforeseen circumstances.</p>

                <p>4. Refunds  <br> 
                    Due to the nature of digital products, the Bravo boilerplate cannot be refunded or exchanged once access is granted.</p>

                <p>5. Disclaimer  <br>
                    It is not warranted that Bravo will meet your requirements or that its operation will be uninterrupted or error-free. All express and implied warranties or conditions not stated in this Agreement (including without limitation, loss of profits, loss or corruption of data, business interruption, or loss of contracts), so far as such exclusion or disclaimer is permitted under applicable law, are excluded and expressly disclaimed. This Agreement does not affect your statutory rights.</p>

                <p>6. Warranties and Limitation of Liability  <br>
                    Bravo does not give any warranty, guarantee, or other term as to the quality, fitness for purpose, or otherwise of the software. Bravo shall not be liable to you by reason of any representation (unless fraudulent), or any implied warranty, condition, or other term, or any duty at common law, for any loss of profit or any indirect, special, or consequential loss, damage, costs, expenses, or other claims (whether caused by Bravo's negligence or the negligence of its servants or agents or otherwise) which arise out of or in connection with the provision of any goods or services by Bravo. Bravo shall not be liable or deemed to be in breach of contract by reason of any delay in performing, or failure to perform, any of its obligations if the delay or failure was due to any cause beyond its reasonable control. Notwithstanding contrary clauses in this Agreement, in the event that Bravo is deemed liable to you for breach of this Agreement, you agree that Bravo's liability is limited to the amount actually paid by you for your services or software, which amount is calculated in reliance upon this clause. You hereby release Bravo from any and all obligations, liabilities, and claims in excess of this limitation.</p>

                <p>7. Responsibilities <br>  
                    Bravo is not responsible for what the user does with the user-generated content.</p>

                <p>8. Price Adjustments  <br>
                    As we continue to improve Bravo and expand our offerings, the price may increase. The discount is provided to help customers secure the current price without being surprised by future increases.</p>

                <p>9. General Terms and Law  <br>
                    This Agreement is governed by the laws of Italy. You acknowledge that no joint venture, partnership, employment, or agency relationship exists between you and Bravo as a result of your use of these services. You agree not to hold yourself out as a representative, agent, or employee of Bravo. You agree that Bravo will not be liable by reason of any representation, act, or omission to act by you.</p>
            </div>




            <div class="policy" v-else>
                <h2 class="h-header">Privacy Policy </h2>

                <p> Your privacy is important to us. It is Bravo's policy to respect your privacy regarding any information we may collect from you across our website, and other sites we own and operate.</p>
               
                <p>  We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.</p>


                <p>  You can sign up with your Google account so your Bravo account username will be prefilled with your name and your public profile picture.</p>

               <p> We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we’ll protect within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use, or modification.</p>

               <p>  We don’t share any personally identifying information publicly or with third parties, except when required to by law. </p>

                <p>We act in the capacity of a data controller and a data processor with regard to the personal data processed through Bravo and the services in terms of the applicable data protection laws, including the EU General Data Protection Regulation (GDPR).</p>

              <p> Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and practices of these sites and cannot accept responsibility or liability for their respective privacy policies.</p>

              <p> You are free to refuse our request for your personal information, with the understanding that we may be unable to provide you with some of your desired services. </p>

             <p>Your continued use of our website will be regarded as acceptance of our practices around privacy and personal information. If you have any questions about how we handle user data and personal information, feel free to contact us.</p>
            </div>


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