# Getting Started with Bravo

The core of this repository lies in the **controllers** and **server** folders. These directories contain the fully integrated full-stack features, providing you with powerful functionality at your fingertips. While you can simply copy these files into your existing project for immediate use, this guide will walk you through setting up the entire boilerplate if you prefer a complete solution.


## Setup

1. Clone the repository:
```bash
   git clone https://github.com/anthonylan/bravo.git
   cd your-repo-name
```

2. Install dependencies:
```bash
   npm install
```

3. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add the following variables:
 ```
     VITE_SUPABASE_URL=your_supabase_url
     VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
     STRIPE_SECRET_KEY=your_stripe_secret_key
     MODE=dev
```

4. Netlify CLI
```bash
   npm install netlify-cli -g
```

5. Start the development server:
   ```bash
   npm run dev
   netlify dev
   ```

## What's Inside

Bravo offers a range of features powered by Supabase and Stripe:

### User Management (Supabase)
- Authenticate users easily
- Update user metadata
- Retrieve current user information

### Database Operations (Supabase)
- Add or update records in any table
- Fetch records based on query parameters
- Delete records from tables

### File Storage (Supabase)
- Upload files to specific folders
- Fetch and list files from folders
- Delete files from storage

### Payment Processing (Stripe)
- Create and manage customer accounts
- Generate checkout links for products or subscriptions
- Fetch customer portal links
- Retrieve active subscriptions and completed checkouts

### Subscription Management (Stripe)
- Find valid subscriptions or one-time purchases
- Create new customers in Stripe

## Tech Stack

Our application is built using the following technologies:

- [PrimeVue](https://primevue.org/): Vue 3 UI Component Library
- [Supabase](https://supabase.io/): Open source Firebase alternative
- [Stripe](https://stripe.com/): Online payment processing
- [Netlify](https://www.netlify.com/): (Optional) Deployment and hosting platform
- [Express.js](https://expressjs.com/): Web application framework for Node.js

## Detailed Documentation

For more detailed information about the Supabase and Stripe services used in this application, please refer to the following documentation:

- [Supabase Services Documentation](./documentation/supabase.md)
- [Stripe Services Documentation](./documentation/stripe.md)

These documents provide in-depth explanations of each service's methods, parameters, and usage examples.

## Next Steps

1. Explore the `src` directory to understand the application structure
2. Review the Supabase and Stripe service files (`supabase.ts` and `stripe.ts`) to see how they're implemented
3. Check out the PrimeVue documentation to learn about available UI components
4. Start building your features using the provided services!

If you have any questions or run into issues, please refer to the documentation or reach out to me.




## ☕ Support My Work

If you find this project helpful or you enjoy using it, consider buying me a coffee to keep me fueled ☕! Your support means a lot and helps me continue maintaining and improving this project.

[![Buy Me a Coffee](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/d2OuR1c)

Thank you for your support!



