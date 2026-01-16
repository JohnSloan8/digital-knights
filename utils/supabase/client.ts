import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qodcnkirqhtrweeuijnd.supabase.co'
const supabaseKey = 'sb_publishable_I7ejH706GeOhDeGKpET0hQ_TSAZf0ju'

export const supabase = createClient(supabaseUrl, supabaseKey)
