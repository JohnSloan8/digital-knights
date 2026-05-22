import { NextResponse } from 'next/server'
import { supabase } from '@/utils/supabase/client'

// Prevent Next.js from caching this route statically
export const dynamic = 'force-dynamic'

export async function GET() {
  // Query 1 row from the 'faq' table to register activity and keep Supabase alive
  const { error } = await supabase.from('faq').select('*').limit(1)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ active: true, time: new Date().toISOString() })
}
