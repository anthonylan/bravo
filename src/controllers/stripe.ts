// API access to the Node.js server
const netMethods = async (payload: Record<string, any>, route: string) => {
  const baseUrl = window.location.origin.includes('localhost')
    ? 'http://localhost:8888/api'
    : 'https://bravo.anthonycharles.work/api'; //change this to your server URL

  const url = `${baseUrl}/${route}`;  

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    return { error: error || 'Unknown error occurred' };
  }
};

class StripeService {
  // Find a valid subscription or one-time purchase based on priceId.
  static getItemsByPriceId(priceId: string, list: any): any {
    const { checkouts, subscriptionItems } = list;
    const subscriptionItem = subscriptionItems?.find((item: any) => item.id === priceId);
    const oneTimeCheckout = checkouts?.find((item: any) => item.id === priceId && item.type === 'one_time');
    
    return subscriptionItem || oneTimeCheckout || null;
  }
  

  // Fetch the Stripe customer portal link for the logged-in user.
  static async getPortalLink(customerId: string): Promise<any> {
    if (!customerId) return { error: 'Customer ID not found' };

    return await netMethods({ customerId }, 'portal-link');
  }


  // Create a checkout link for a product or subscription.
  static async getCheckoutLink(config: { customerId: string, priceId: string, isOneOff: boolean }): Promise<any> {
    const { customerId, priceId, isOneOff } = config;
    if (!customerId) return { error: 'Customer ID not found' };

    return await netMethods({ customerId, priceId, isOneOff }, 'checkout-link');
  }


  // Create a new Stripe customer for a user.
  static async newCustomer(email: string, name: string): Promise<any> {
    if (!email) return { error: 'User email not found' };

    return await netMethods({ email, name }, 'new-customer');
  }


  // Fetch the active subscriptions or completed checkouts for the logged-in user.
  static async getSubscriptions(customerId: string): Promise<any> {
    if (!customerId) return { error: 'Customer ID not found' };

    return await netMethods({ customerId }, 'list-checkouts');
  }
}

export { StripeService };

