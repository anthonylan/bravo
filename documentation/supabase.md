# Supabase Services Documentation

This documentation covers the `UserService`, `Database`, and `Storage` classes from the `supabase.ts` file, which provide interfaces for interacting with Supabase functionalities.

## IMPORTANT: 

**Auth**: Before using authentication providers, ensure they are enabled in your Supabase Authentication settings. Configure your site URL and redirect URLs in the URL Configuration section.

**Storage**: If you plan to use public URLs, make sure your storage buckets are set to public. However, it's recommended to apply specific access policies for security.

**Database**: As always, ensure that your table columns align with the data structure you intend to store.

[Supabase Javascript](https://supabase.com/docs/reference/javascript/introduction)



## Table of Contents
1. [UserService](#userservice)
2. [Database](#database)
3. [Auth](#auth)
4. [Storage](#storage)

## import utils from file
```typescript
import { User, Database, Auth, Storage } from '@/controllers/supabase'
```

## UserService

The `UserService` class provides methods for managing user-related operations.

### Methods

#### User.updateUserMeta: Update user metadata in Supabase.
#### Usage:
```typescript
const result = await User.updateUserMeta({ birth_day: '1995/03/12', custom_name: 'John Doe' });
if (result.error) {
  console.error(result.error);
} else {
  console.log(result.data);
}
```

#### getUser: Get the current user session from Supabase.
#### Usage:
```typescript
const user = await User.getUser();
if (user) {
  console.log('Logged in user:', user);
} else {
  console.log('No user logged in');
}
```

## Database

The `Database` class provides methods for interacting with Supabase tables.

### Methods

#### set: Add or update a record in the specified table.
#### Usage:
```typescript
const result = await Database.set('users', { id: 1, name: 'John Doe' });
if (result.error) {
  console.error(result.error);
} else {
  console.log(result.data);
}
```

#### fetch: Fetch records from the specified table based on query parameters.
#### Usage:
```typescript
const result = await Database.fetch('users', { key: 'name', value: 'John Doe' });
if (result.error) {
  console.error(result.error);
} else {
  console.log(result.data);
}
```

#### delete: Delete a record in the specified table by ID.
##### Usage:
```typescript
const result = await Database.delete('users', 1);
if (result.error) {
  console.error(result.error);
} else {
  console.log('Record deleted successfully');
}
```


## Auth 

The `Auth` class provides methods for handling various authentication operations using Supabase.

## Methods

#### handleOAuth: Handles OAuth login for various providers.
#### Usage:
```typescript
const result = await Auth.handleOAuth('google');
if (result.error) {
  console.error(result.error);
} else {
  console.log('OAuth login successful');
}
```

#### handleEmailAuth: Handles email/password login or signup.
#### Usage:
```typescript
const loginResult = await Auth.handleEmailAuth({ email: 'user@example.com', password: 'password123' }, true);
if (loginResult.error) {
  console.error(loginResult.error);
} else {
  console.log('Login successful');
}

const signupResult = await Auth.handleEmailAuth({ email: 'newuser@example.com', password: 'password123' }, false, 'https://yourapp.com/welcome');
if (signupResult.error) {
  console.error(signupResult.error);
} else {
  console.log('Signup successful');
}
```

#### handleReset: Handles sending a password reset email.
#### Usage:
```typescript
const result = await Auth.handleReset('user@example.com', 'https://yourapp.com/reset-password');
if (result.error) {
  console.error(result.error);
} else {
  console.log('Password reset email sent successfully');
}
```

#### handlePassword: Handles updating the user's password.
#### Usage:
```typescript
const result = await Auth.handlePassword('newPassword123');
if (result.error) {
  console.error(result.error);
} else {
  console.log('Password updated successfully');
}
```




## Storage

The `Storage` class provides methods for managing file storage in Supabase.

### Constructor

```typescript
constructor(bucket: string)
```

##### Parameters:
- `bucket` (string): The name of the storage bucket.

### Methods

#### upload: Upload a file to a specific folder in the bucket.
#### Usage:
```typescript
const storage = new Storage('my-bucket');
const file = new File(['file content'], 'example.txt', { type: 'text/plain' });
const result = await storage.upload(file, { folder: 'documents', publicUrl: true });
if (result.error) {
  console.error(result.error);
} else {
  console.log(result.data);
}
```

#### fetch: Fetch and list files from a specific folder with a limit.
#### Usage:
```typescript
const storage = new Storage('my-bucket');
const result = await storage.fetch('documents', 10);
if (result.error) {
  console.error(result.error);
} else {
  console.log(result.files);
}
```

#### delete: Delete a file from the specified folder in the bucket.
#### Usage:
```typescript
const storage = new Storage('my-bucket');
const result = await storage.delete('example.txt', 'documents');
if (result.error) {
  console.error(result.error);
} else {
  console.log('File deleted successfully');
}
```

## Note on Supabase Client Initialization

The Supabase client is initialized using environment variables:

```typescript
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
```

Ensure that these environment variables are properly set in your project.