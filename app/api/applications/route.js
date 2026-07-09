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




export async function POST(request) {
    const supabase = await createClient()

    const { data: {user} } = await supabase.auth.getUser()

    if(!user) {
        return NextResponse.json({ error:'Unauthorized' }, { status:401 })
    }

    const formData = await request.formData()

    const companyName = formData.get('company_name')
    const jobTitle = formData.get('job_title')
    const jobUrl = formData.get('job_url')
    const location = formData.get('location')
    const status = formData.get('status')
    const appliedDate = formData.get('applied_date')
    const notes = formData.get('notes')
    const resumeFile = formData.get('resume')
    const coverLetterFile = formData.get('cover_letter')

    // step 5: insert the row first — we need the generated id for the file paths
    const { data: application, error: insertError } = await supabase
    .from('applications')
    .insert({
        user_id: user.id,
        company_name: companyName,
        job_title: jobTitle,
        job_url: jobUrl,
        location: location,
        status: status,
        applied_date: appliedDate,
        notes: notes,
    })
    .select()
    .single()

    if (insertError) {
    return NextResponse.json({ error: 'Failed to create application' }, { status: 500 })
    }

    // now we have application.id — build the file paths
    const fileUpdates = {}

    // step 6: upload resume if one was provided
    if (resumeFile && resumeFile.size > 0) {
    const resumePath = `${user.id}/${application.id}/resume.pdf`

    const { error: resumeError } = await supabase.storage
        .from('application-files')
        .upload(resumePath, resumeFile, { contentType: 'application/pdf' })

    if (resumeError) {
        return NextResponse.json({ error: 'Failed to upload resume' }, { status: 500 })
    }

    fileUpdates.resume_path = resumePath
    fileUpdates.resume_filename = resumeFile.name
    }

    // step 7: upload cover letter if one was provided
    if (coverLetterFile && coverLetterFile.size > 0) {
    const coverLetterPath = `${user.id}/${application.id}/cover-letter.pdf`

    const { error: coverLetterError } = await supabase.storage
        .from('application-files')
        .upload(coverLetterPath, coverLetterFile, { contentType: 'application/pdf' })

    if (coverLetterError) {
        return NextResponse.json({ error: 'Failed to upload cover letter' }, { status: 500 })
    }

    fileUpdates.cover_letter_path = coverLetterPath
    fileUpdates.cover_letter_filename = coverLetterFile.name
    }

    // step 8: if any files were uploaded, update the row with their paths
    if (Object.keys(fileUpdates).length > 0) {
    const { data: updated, error: updateError } = await supabase
        .from('applications')
        .update(fileUpdates)
        .eq('id', application.id)
        .select()
        .single()

    if (updateError) {
        return NextResponse.json({ error: 'Failed to save file paths' }, { status: 500 })
    }

    return NextResponse.json({ application: updated }, { status: 201 })
    }

    // step 9: no files uploaded, return the application as-is
    return NextResponse.json({ application }, { status: 201 })
}