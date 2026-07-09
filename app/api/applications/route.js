import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request) {
  // create supabase server client to talk to the database
  const supabase = await createClient()

  // get the currently logged in user from the session cookie
  const { data: { user } } = await supabase.auth.getUser()

  // if no user is logged in, return 401 unauthorized
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // query the database for all applications belonging to this user
  // sorted by applied date, newest first
  const { data, error } = await supabase
    .from('applications')
    .select('*')
    .eq('user_id', user.id)
    .order('applied_date', { ascending: false })

  // if the database query failed, return 500 server error
  if (error) {
    return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 })
  }

  // return the applications as JSON
  return NextResponse.json({ applications: data })
}