import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
  // extract the application id from the URL params
  // e.g. /api/applications/abc-123 → id = 'abc-123'
  const { id } = await params

  // create supabase server client to talk to the database
  const supabase = await createClient()

  // get the currently logged in user from the session cookie
  const { data: { user } } = await supabase.auth.getUser()

  // if no user is logged in, return 401 unauthorized
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // query database for the single application matching this id
  // two filters: id matches the URL param AND user_id matches logged in user
  // this prevents users from accessing other users' applications
  const { data: application, error } = await supabase
    .from('applications')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  // if not found or belongs to another user, return 404
  if (error) {
    return NextResponse.json({ error: 'Application not found' }, { status: 404 })
  }

  // return the application as JSON with default 200 status
  return NextResponse.json({ application })
}