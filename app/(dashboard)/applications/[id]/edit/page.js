import ApplicationForm from '@/components/applications/ApplicationForm'
import { use } from 'react'

export default function EditApplicationPage({ params }) {
    // get id from params
    const { id } = use(params)

   // return with mode edit
   return <ApplicationForm mode = 'edit' id = { id } />
}