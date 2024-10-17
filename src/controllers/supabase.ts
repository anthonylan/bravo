import { createClient } from '@supabase/supabase-js'
import { baseUrl } from './config'

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)


interface ServiceResponse {
    data?: any;
    error?: any;
}


// USER CONTROLLER ===========================

interface UserMeta {
  [key: string]: any; 
}

class User {
  //@ Updates the user metadata in Supabase.
  static async updateUserMeta(meta: UserMeta): Promise<ServiceResponse> {
    const { data, error } = await supabase.auth.updateUser({ data: meta });
    return { data, error };
  }


  //@ Retrieves the current user session from Supabase.
  static async getUser(): Promise<any> {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      return null; 
    }

    return data.session?.user ?? null; 
  }
}




// DATABASE CONTROLLER ===========================

  interface RecordData {
    id?: number;  
    [key: string]: any; 
  }
  
  class Database {
      //@ Add or update a record in the specified table.
      static async set(table: string, payload: RecordData): Promise<any> {
          const { data, error } = await supabase
          .from(table)
          .upsert(payload, { onConflict: 'id' })
          .select()
          
          return { data, error }
      }

      //@ Fetch records from the specified table.
        static async fetch(table: string, qs: {key: string, value: string}): Promise<any> {
            const { data, error } = await supabase
            .from(table)
            .select('*')
            .eq(qs.key, qs.value); // Your query property & value

            return { data, error }
        }


        // Fetch records from the specified table by date range.
        static async fetchByRange(table: string, { key, value, range }: { key: string, value: string, range: [string, string] }): Promise<any> {
            const [startDate, endDate] = range.map(date => new Date(date).getTime());
        
            const { data, error } = await supabase
            .from(table)
            .select('*')
            .eq(key, value)
            .gte('date', startDate)
            .lte('date', endDate)
            .order('date', { ascending: false });
        
            return { data, error };
        }

       // Single update a record in the specified table
        static async update(table: string, { id, payload }: { id: number, payload: RecordData }): Promise<any> {
            const { data, error } = await supabase
            .from(table)
            .update(payload)
            .eq('id', id);
        
            return { data, error };
        }
  

      //@ Delete a record in the specified table by ID.
      static async delete(table: string, id: string): Promise<any> {
          const { data: deletedData, error } = await supabase
            .from(table)
            .delete()
            .match({ id }); // Replace 'id' with your primary key column name

          return { deletedData, error } 
      }

  }
  
  

  // AUTH CONTROLLER ==============

  class Auth {
    // Handle OAuth login
    static async handleOAuth(provider: any): Promise<{ error: string | null }> {
        const { error } = await supabase.auth.signInWithOAuth({
            provider,
            options: { redirectTo: `${baseUrl}/auth` },
        });

        if (error) {
            return { error: error.message };
        }

        return { error: null };
    }

    // Handle email/password login or signup
    static async handleEmailAuth(
        form: { email: string; password: string; name?: string },
        isLogin: boolean,
        emailRedirectTo?: string
    ): Promise<{ error: string | null }> {
        const signInOrSignUp = isLogin
            ? supabase.auth.signInWithPassword({
                email: form.email,
                password: form.password,
            })
            : supabase.auth.signUp({
                email: form.email,
                password: form.password,
                options: {
                    emailRedirectTo: emailRedirectTo,
                    data: { display_name: form.name, customer_name: form.name },
                },
            });

        const { error } = await signInOrSignUp;

        if (error) {
            return { error: error.message };
        }

        return { error: null };
    }

     // Handle sending password reset email
     static async handleReset(email: string, url: string): Promise<{ error: string | null }> {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: url,
        });

        if (error) {
            return { error: error.message };
        }

        return { error: null };
    }

      // Handle sending password reset email
      static async handlePassword(password: any): Promise<{ error: string | null }> {
        const { error } = await supabase.auth.updateUser({ password });

        if (error) {
            return { error: error.message };
        }

        return { error: null };
    }
}



// STORAGE CONTROLLER ===========

class Storage {
  private bucket: string;

  constructor(bucket: string) {
      this.bucket = bucket;
  }

  //@ Upload a file to the specified folder in the bucket
  async upload(file: File, config: { folder: string; publicUrl: boolean }): Promise<{ error?: string; data?: any }> {
      const filePath = `${config.folder}/${file.name}`;

      const { error } = await supabase.storage
          .from(this.bucket)
          .upload(filePath, file, {
              cacheControl: '3600',
              upsert: false,
          });

      if (error) {
          return { error: error.message };
      }

      if (config.publicUrl) {
          const { data: publicUrlData } = supabase.storage.from(this.bucket).getPublicUrl(filePath);
          return { data: publicUrlData };
      }

      return { data: `File ${filePath} uploaded successfully` };
  }

  //@ Read and list files from a specific folder with a limit
  async fetch(folder: string, limit: number): Promise<{ error?: string; files?: any[] }> {
      const { data, error } = await supabase.storage
          .from(this.bucket)
          .list(folder, { limit, offset: 0 });

      if (error) {
          return { error: error.message };
      }

      const files = data?.map((item: any) => {
          const { data: publicData } = supabase.storage.from(this.bucket).getPublicUrl(`${folder}/${item.name}`);
          return { ...item, publicUrl: publicData.publicUrl };
      });

      return { files };
  }

   //@ Delete a file from the specified folder in the bucket
  async delete(name: string, folder: string): Promise<ServiceResponse> {
    const { data, error } = await supabase.storage.from(this.bucket).remove([`${folder}/${name}`]);
    return { data, error: error?.message };
  }
}






export { supabase, User,  Database, Auth, Storage }