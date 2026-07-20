import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  // create supabase server client to talk to the database
  const supabase = await createClient()

  // get the currently logged in user from the session cookie
  const { data: { user } } = await supabase.auth.getUser()

  // if no user is logged in, return 401 unauthorized
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // query 1: get the total count of applications belonging to this user
  // head: true means "don't return the actual rows, just the count"
  // this is more efficient than fetching all rows and counting in JavaScript
  const { count, error: countError } = await supabase
    .from('applications')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)

  // query 2: get just the status column for every application belonging to this user
  // used to build a breakdown of how many applications are in each status
  const { data: allApplications, error: statusError } = await supabase
    .from('applications')
    .select('status')
    .eq('user_id', user.id)

  // build a count object for each possible status value
  const byStatus = {
    applied: 0,
    interview: 0,
    offer: 0,
    rejected: 0,
    ghosted: 0
  }

  // loop through every application and increment the matching status counter
  allApplications.forEach((app) => {
    byStatus[app.status]++
  })

  // query 3: get the 5 most recently applied-to applications for this user
  // sorted newest first, limited to 5 results
  const { data: recent, error: recentError } = await supabase
    .from('applications')
    .select('*')
    .eq('user_id', user.id)
    .order('applied_date', { ascending: false })
    .limit(5)

  // if any of the three queries failed, return a single 500 error
  if (countError || statusError || recentError) {
    return NextResponse.json({ error: 'Failed to load dashboard stats' }, { status: 500 })
  }

  // return all three pieces of data together in one response
  return NextResponse.json({
    total: count,
    by_status: byStatus,
    recent
  })
}