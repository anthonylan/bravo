import { ref } from 'vue'

const user = ref({ user_metadata: {} })  as any
const theme = ref('dark');








// Function to generate a DiceBear avatar URL
const dicebear = (name: string, style: string): string => {
  const seed = style === 'initials' ? name.charAt(0) : name;
  return `https://api.dicebear.com/9.x/${style}/svg?seed=${seed}`;
};

// Function to get the avatar URL for a user, with fallback to DiceBear
const avatarUrl = (user: Record<string, any>): string => {
  const meta = user?.user_metadata || {};
  
  return (
    meta.customer_avatar?.url || 
    meta.avatar_url || 
    dicebear(meta.customer_name || 'default', 'dylan')
  );
};


// Function to format currencies
const currency = (cost: any) => {
  return cost.amount.toLocaleString('en-US', { style: 'currency', currency: cost.currency })
}

interface ToastParams {
  type: number;  // 1 = error, 2 = success, 3 = warn, default = info
  short: string;
  long: string;
}

class Toaster {
  static set({ type, short, long }: ToastParams) {
    const severity = { 1: 'error', 2: 'success', 3: 'warn' }[type] || 'info';
    return { summary: short, detail: long, severity, life: 3000 };
  }
}

export { currency, user, avatarUrl, Toaster, theme, dicebear }
