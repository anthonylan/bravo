# StripeService Documentation

The `StripeService` class provides a set of static methods to interact with Stripe's API for managing customers, subscriptions, and checkouts. This documentation outlines how developers can use these methods in their applications.

## Table of Contents
1. [getItemsByPriceId](#getitemsbypriceid)
2. [getPortalLink](#getportallink)
3. [getCheckoutLink](#getcheckoutlink)
4. [newCustomer](#newcustomer)
5. [getSubscriptions](#getsubscriptions)

## Methods

### getItemsByPriceId

Find a valid subscription or one-time purchase based on a price ID.

```typescript
static getItemsByPriceId(priceId: string, list: any): any
```

#### Parameters:
- `priceId` (string): The ID of the price to check.
- `list` (any): An object containing `checkouts` and `subscriptionItems`.

#### Returns:
- A subscription item, one-time checkout, or `null` if not found.

#### Usage:
```typescript
const item = StripeService.getItemsByPriceId('price_123', {
  checkouts: [...],
  subscriptionItems: [...]
});
```

### getPortalLink

Fetch the Stripe customer portal link for a logged-in user.

```typescript
static async getPortalLink(customerId: string): Promise<any>
```

#### Parameters:
- `customerId` (string): The ID of the customer.

#### Returns:
- A Promise that resolves to the portal link or an error message.

#### Usage:
```typescript
const result = await StripeService.getPortalLink('cus_123');
if (result.error) {
  console.error(result.error);
} else {
  // Use the portal link
  window.location.href = result.url;
}
```

### getCheckoutLink

Create a checkout link for a product or subscription.

```typescript
static async getCheckoutLink(config: {
  customerId: string,
  priceId: string,
  isOneOff: boolean
}): Promise<any>
```

#### Parameters:
- `config` (object):
  - `customerId` (string): The ID of the customer.
  - `priceId` (string): The ID of the price to generate a checkout link.
  - `isOneOff` (boolean): Whether the checkout is for a one-time purchase.

#### Returns:
- A Promise that resolves to the checkout link or an error message.

#### Usage:
```typescript
const result = await StripeService.getCheckoutLink({
  customerId: 'cus_123',
  priceId: 'price_456',
  isOneOff: false
});
if (result.error) {
  console.error(result.error);
} else {
  // Redirect to the checkout page
  window.location.href = result.url;
}
```

### newCustomer

Create a new Stripe customer for a user.

```typescript
static async newCustomer(email: string, name: string): Promise<any>
```

#### Parameters:
- `email` (string): The user's email.
- `name` (string): The user's name.

#### Returns:
- A Promise that resolves to the Stripe customer ID or an error message.

#### Usage:
```typescript
const result = await StripeService.newCustomer('user@example.com', 'John Doe');
if (result.error) {
  console.error(result.error);
} else {
  console.log('New customer ID:', result.customer_id);
}
```

### getSubscriptions

Fetch the active subscriptions or completed checkouts for a logged-in user.

```typescript
static async getSubscriptions(customerId: string): Promise<any>
```

#### Parameters:
- `customerId` (string): The ID of the customer.

#### Returns:
- A Promise that resolves to the subscriptions or checkouts, or an error message.

#### Usage:
```typescript
const result = await StripeService.getSubscriptions('cus_123');
if (result.error) {
  console.error(result.error);
} else {
  console.log('Subscriptions:', result.subscriptionItems);
  console.log('Checkouts:', result.checkouts);
}
```

## Error Handling

All methods that interact with the server (via `netMethods`) return an object with an `error` property if an error occurs. Always check for the presence of this property before using the returned data.

```typescript
const result = await StripeService.someMethod(params);
if (result.error) {
  console.error('An error occurred:', result.error);
} else {
  // Process the successful result
}
```

## Note on API Calls

The `StripeService` uses a `netMethods` function to make API calls to a Node.js server. The base URL for these calls is determined dynamically:

- For localhost: `http://localhost:8888/api`
- For production: `https://yourproductionserver.com/api`

Ensure that your server is set up to handle these API routes correctly.