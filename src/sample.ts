import { ref } from 'vue'


// Sample data
const statuses = ['active', 'pending', 'cancelled', 'suspended'];
const states = ref({ modal: false, codeViewer: 0 })

const generateRandomDate = () => {
  const start = new Date(2019, 0, 1);
  const end = new Date();
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const generateCustomerId = () => {
  const randomStr = Math.random().toString(36).substring(2, 8);
  return `cus_${randomStr}`;
};

const getRandomStatus = () => {
  return statuses[Math.floor(Math.random() * statuses.length)];
};

const generateCustomers = (count: number) => {
  const customerNames = [
    'James Butt', 'Josephine Darakjy', 'Art Venere', 'Lenna Paprocki', 'Donette Foller',
    'Simona Morasca', 'Mitsue Tollner', 'Leota Dilliard', 'Sage Wieser', 'Kris Marrier',
    'Minna Amigon', 'Abel Maclead', 'Kiley Caldarera', 'Graciela Ruta', 'Cammy Alderman',
    'Mattie Poquette', 'Meaghan Garufi', 'Gladys Reamer', 'Yuki Whobrey', 'Fletcher Flosi'
  ];

  const customers = [];
  for (let i = 0; i < count; i++) {
    const name = customerNames[i];
    const last_active = [generateRandomDate()].map((d) => `${d.toDateString()} ${d.toLocaleTimeString()}`).join();
    const status = getRandomStatus();
    const customer_id = generateCustomerId();
    const banned = Math.random() < 0.1; // 10% chance of being banned

    customers.push({
      id: 1000 + i,
      name,
      last_active,
      status,
      customer_id,
      banned,
    });
  }
  return customers;
};





const setChartData = () => {
  const documentStyle = getComputedStyle(document.documentElement);

  return {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
          {
              type: 'line',
              label: 'Sales',
              borderColor: documentStyle.getPropertyValue('--p-orange-500'),
              borderWidth: 2,
              fill: false,
              tension: 0.4,
              data: [50, 25, 12, 48, 56, 76, 42]
          },
          {
              type: 'bar',
              label: 'Sign Ups',
              backgroundColor: documentStyle.getPropertyValue('--p-gray-500'),
              data: [21, 84, 24, 75, 37, 65, 34],
              borderColor: 'white',
              borderWidth: 2
          },
          {
              type: 'bar',
              label: 'Page views',
              backgroundColor: documentStyle.getPropertyValue('--p-cyan-500'),
              data: [41, 52, 24, 74, 23, 21, 32]
          }
      ]
  };
};
const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue('--p-text-color');
  const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
  const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

  return {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
          legend: {
              labels: {
                  color: textColor
              }
          }
      },
      scales: {
          x: {
              ticks: {
                  color: textColorSecondary
              },
              grid: {
                  color: surfaceBorder
              }
          },
          y: {
              ticks: {
                  color: textColorSecondary
              },
              grid: {
                  color: surfaceBorder
              }
          }
      }
  };
}




const features = [
  {
    title: 'Framework-Agnostic Simplicity',
    desc: `Integrate effortlessly with any JavaScript framework or UI library. With a single line of code, it’s easy to authenticate users, create Stripe customers, and more—regardless of the tools you're using.`
  },
  {
    title: 'Seamless User Authentication',
    desc: `Fully set up authentication using Supabase and Node.js. Whether you want to use your own UI or a pre-built one, you can support multiple providers like Google, Discord, or simple email-password methods with ease.`
  },
  {
    title: 'Effortless Database & Storage',
    desc: `Built-in CRUD and storage functionalities take the headache out of managing your database. Powered by Supabase, all the complexity is removed, so you can focus on features.`
  },
  {
    title: 'Ready-to-Go Stripe Integration',
    desc: `Set up payments without the usual hassle. Just plug in your product IDs and Stripe keys, and you’re ready to start accepting payments—no need to worry about configuring both the server and client sides`
  },
]


const testimonies = [
  { 
    comment: `I have had experiences with other SaaS devs and coders from fiver, and no one came close to doing what Anthony did. It’s like he read my mind. If you are looking to have an app or SaaS product developed, stop looking, and pay the man!`,
    author: {
      name: 'Levi Van', 
      role: 'Founder @ DZL labs',
      avatar: 'https://images.pexels.com/photos/27439551/pexels-photo-27439551/free-photo-of-a-man-sitting-on-the-ground-with-his-hand-on-his-face.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    }
   },
   { 
    comment: `Great work! Development was as specified alongside with developer coming up with his own ideas on areas of enhacements. Impressive skillset and abilities. Also a very patient person in terms of demands from me.`,
    author: {
      name: 'Warren Kai', 
      role: 'Indie maker',
      avatar: 'https://images.pexels.com/photos/2383750/pexels-photo-2383750.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    }
   },
   { 
    comment: `A true developer. Kept me up to date and informed the entire time. Did amazing work! I requested a truly complicated website, and he delivered. Couldn’t even happier with everything, I am truly grateful!!!`,
    author: {
      name: 'Felix Jarred', 
      role: 'Enterpreneur',
      avatar: 'https://images.pexels.com/photos/819530/pexels-photo-819530.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    }
   },
]



const faqs = [
  { 
    question: 'What do I get exactly?',
    answer: `You gain access to Bravo's GitHub repository, which contains well-documented and regularly updated boilerplate source code to jumpstart your SaaS project.`
  },
  { 
    question: `What's tech stack?`,
    answer: `The project uses TypeScript for the client-side and Express.js on the server. As demonstrated, it currently employs PrimeVue as the UI library`
  },
  { 
    question: 'Are there any cost associated?',
    answer: `Many hosting platforms, such as Netlify, offer free hosting for projects (both front-end and back-end), while Supabase provides a free tier. This allows you to launch your first app for $0/month..`
  },
  { 
    question: 'Can I get a refund?',
    answer: `After you've got access to the repo, Bravo is yours forever, so it can't be refunded.`
  },
]



const pricingItems = [
  {
    title: 'Hobby',
    description: 'Hobby plan includes',
    cost: { amount: 9.99, currency: 'USD' },
    priceId: 'price_1Oa2hWJEDKLFQJCTjCXtixJK',
    isOneOff: false,
    features: ['Limited monthly usage', 'Basic support'],
  },
  {
    title: 'Pro',
    description: 'Everything on Hobby plus',
    cost: { amount: 12.99, currency: 'USD' },
    priceId: 'price_1Q0kouJEDKLFQJCTBHU5XL7n',
    isOneOff: false,
    features: ['Advanced permissions', 'Audit logs', 'Priority support'],
  },
  {
    title: 'One-time Payment',
    description: 'Unlock permanent access',
    cost: { amount: 232.99, currency: 'USD' },
    priceId: 'price_1Q0ksbJEDKLFQJCTLp2lWIdd',
    isOneOff: true,
    features: ['Data catalog', 'Unlimited blocks', 'Dedicated support'],
  },
];



const codePreview = {
  one: `import { Auth, Database } from '@/supabase'
import { StripeService } from '@/stripe'


//Easy email-password sign up
const { error } = await Auth.handleEmailAuth({email: 'john@gmail.com', password: '*****'}, false, '/welcome-onboard');

//Create a new Stripe customer
const stripeResponse = await StripeService.newCustomer('john@gmail.com', 'John Doe')
//@result: { customer_id: cus_Qu6isymffvdoGd }

//Save user to Database
const { data, error } = await Database.set('users', { id: 1, name: 'John Doe', customer_id: stripeResponse.customer_id });`,

two: `import { Auth } from '@/supabase'


//Oauth providers login / sign up
const { error } = await Auth.handleOAuth('apple') // apple, google, discord, and more
      
//Register a new user using email / password 
const { error } = await Auth.handleEmailAuth({email: 'john@gmail.com', password: '*****'}, false, '/welcome-onboard');

//Login a user using email / password
const { error } = await Auth.handleEmailAuth({email: 'john@gmail.com', password: '*****'}, true);


//Send password recovery link
const { error } = await Auth.handleReset('john@gmail.com', 'https://myapp.com/update-password')`,
three: `import { Database, Storage } from '@/supabase'

// Add or update a record in the specified table. (eg. tasks)
const { data, error } = await Database.set('tasks', { id: 1, ref: '29EACF8B', title: 'Meeting with Lissa', checked: false });

// Fetch records from the specified table. (eg. tasks)
const { data, error } = await Database.fetch('tasks', { key: 'ref', value: '29EACF8B' });

      
// STORAGE CONTROLLER
const storage = new Storage('my-bucket')
const file = new File(['file content'], 'example.txt', { type: 'text/plain' });

//@ Upload a file to the specified folder in the bucket
const { data, error } = await storage.upload(file, { folder: 'myfolder', publicUrl: true })

//@ Read and list files from a specific folder with a limit
const { files, error } = await storage.fetch('myfolder', 100)

//@ Delete a file from the specified folder in the bucket
await storage.delete('IMG.jpeg', 'myfolder')`,
four: `import { StripeService } from '@/stripe'

//Create a new Stripe customer
const response = await StripeService.newCustomer('john@gmail.com', 'John Doe')
//@result: { customer_id: cus_Qu6isymffvdoGd }


// Create a checkout link for a subscription.
const { error, url } = await StripeService.getCheckoutLink({customerId: 'cus_Qu6isymffvdoGd', priceId: 'price_L7n', isOneOff: false });
//@result: { url: 'https://checkout.stripe.com/c/pay/dkdWxOYHwnPyd1blpxYHZxWjA0SDdPUW' }
      

// Create a checkout link for a one-time payment.
const { error, url } = await StripeService.getCheckoutLink({customerId: 'cus_Qu6isymffvdoGd', priceId: 'price_1Q0', isOneOff: true });
//@result: { url: 'https://checkout.stripe.com/c/pay/dkdWxOYHwnPyd1blpxYHZxWjYH' }


// Fetch the Stripe customer active subscriptions / completed checkouts for the logged-in user.
const items = await StripeService.getSubscriptions('cus_Qu6isymffvdoGd')  
//@result: { checkouts:[{...}], subscriptionItems:[{...}] }`
}


const priceConfig = {
  url: import.meta.env.VITE_PAY,
  cost: '$499'
}


export { generateCustomers, statuses, setChartData, setChartOptions, features, faqs, testimonies, pricingItems, codePreview, states, priceConfig }
