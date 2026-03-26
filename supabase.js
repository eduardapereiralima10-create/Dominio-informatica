import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://subabcflhskfvurqxda.supabase.co'
const supabaseKey = 'sb_publishable_W_xGsojZApie66xGAlS-nA_w23uWwYO'

export const supabase = createClient(supabaseUrl, supabaseKey)
