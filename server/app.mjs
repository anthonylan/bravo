import express from 'express';
import serverless from 'serverless-http'; 
import bodyParser from 'body-parser';
import cors from 'cors'
import { createServerClient } from '@supabase/supabase-js'
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const url = process.env.MODE == 'dev' ? "http://localhost:5173" : 'https://bravo.anthonycharles.work' //set your production URL


const app = express();
app.use(bodyParser.json());
app.use(cors({
  origin: url // Only allow requests from this domain
}));



app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Netlify Function + Express!' });
});


// Oauth callback for auth providers
app.get('/api/auth', async (req, res) => {
    const code = req.query.code
    const next = req.query.next ?? "/"
  
    if (code) {
      const supabase = createServerClient(
        process.env.VITE_SUPABASE_URL,
        process.env.VITE_SUPABASE_ANON_KEY, {
       cookies: {
        getAll() {
          return parseCookieHeader(context.req.headers.cookie ?? '')
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            context.res.appendHeader('Set-Cookie', serializeCookieHeader(name, value, options))
          )
        },
      },
    })
      await supabase.auth.exchangeCodeForSession(code)
    }
  
    res.redirect(303, `/todo${next.slice(1)}`)
  });




  //Create's a new stripe customer
  app.post('/api/new-customer', async (req, res) => {
    const { email, name } = req.body        

    try {
       const customer = await stripe.customers.create({  email, name  })
        res.json({ customer_id: customer.id })
    } catch (error) {        
        res.json({ error: error.message })
    }
  })



  //Fetch all completed checkouts and subscriptions
  app.post('/api/list-checkouts', async (req, res) => {
    const { customerId } = req.body
      const checkouts = [], subscriptionItems = [];  

      try {
          // Fetch sessions and subscriptions concurrently
          const [sessions, subscriptions] = await Promise.all([
            stripe.checkout.sessions.list({ customer: customerId, status: 'complete' }),
            stripe.subscriptions.list({ customer: customerId }),
          ])

        
          // Process each session's line items and append status to checkouts
          await Promise.all(
            sessions.data.map(async (session) => {
              const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
              lineItems.data.forEach((item) =>
                checkouts.push({ ...item.price, main_status: session.status })
              );
            })
          );

          subscriptions.data.forEach((item) => {
            subscriptionItems.push({...item.items.data[0].price, main_status: item.status })
          })

          res.json({ checkouts, subscriptionItems })
      } catch (error) {
        res.json({ error: error.message })
      }
  })


  //Create's a checkout link
  app.post('/api/checkout-link', async (req, res) => {
    const { customerId, priceId, isOneOff } = req.body

    try {
      const session = await stripe.checkout.sessions.create({
        success_url: `${url}/pricing?q=success`,
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        customer: customerId,
        mode: isOneOff ? 'payment' : 'subscription',
      })

      res.json({ url: session.url })
    } catch (error) {
      res.json({ error: error.message })
    }
  })




  // Generate a portal link for a customer
  app.post('/api/portal-link', async (req, res) => {
    const { customerId } = req.body

      try {
        const portalConfig = await stripe.billingPortal.configurations.create({
          business_profile: {
            privacy_policy_url: `${url}/privacy`,
            terms_of_service_url: `${url}/tos`,
          },
          features: {
            customer_update: {
              allowed_updates: ['name', 'address'],
              enabled: true,
            },
            invoice_history: { enabled: true },
            payment_method_update: { enabled: true },
            subscription_cancel: { enabled: true },
            subscription_update: {
              enabled: true,
              default_allowed_updates: ['price', 'promotion_code'],
              products: [
                {
                  prices: ['price_1Oa2hWJEDKLFQJCTjCXtixJK'], //HOBBY: Ensure this is set as the default price in Stripe
                  product: 'prod_POqOy53hUyM42p',
                },
                {
                  prices: ['price_1Q0kouJEDKLFQJCTBHU5XL7n'],  //PRO: Ensure this is set as the default price in Stripe
                  product: 'prod_PqrJtAnZXoGVBm',
                },
              ],
            },
          },
        });
      
        const session = await stripe.billingPortal.sessions.create({
          customer: customerId,
          return_url: `${url}/pricing`,
          configuration: portalConfig.id,
        });
      
        res.json({ url: session.url  })
      } catch (error) {
        res.json({ error: error.message })
      }
  })

  

/*
  Uncomment the following lines to run this file as a standard Node.js app:

  const port = 3000;
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });

  // If running as a Node.js app, make sure to comment out the line below.
*/

// Comment this line if running as a normal Node.js app
export const handler = serverless(app);


