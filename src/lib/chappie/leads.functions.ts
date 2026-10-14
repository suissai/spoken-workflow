import { createServerFn } from '@tanstack/react-start';
import { createClient } from '@supabase/supabase-js';
import { leadSchema } from './logic';
export const submitLead = createServerFn({ method: 'POST' })
  .inputValidator((input: unknown) => leadSchema.parse(input))
  .handler(async ({ data }) => {
    const url = process.env['SUPABASE_URL'];
    const key = process.env['SUPABASE_PUBLISHABLE_KEY'];
    if (!url || !key) return { success: false };
    const client = createClient(url, key, {
      auth: { persistSession: false },
      global: { fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        if (key.startsWith('sb_') && headers.get('Authorization') === `Bearer ${key}`) headers.delete('Authorization');
        headers.set('apikey', key);
        return fetch(input, { ...init, headers });
      } },
    });
    const { error } = await client.from('early_access_requests').insert(data);
    return { success: !error };
  });
