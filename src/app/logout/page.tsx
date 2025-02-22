import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export default async function LogoutPage() {
  const supabase = await createClient()
  const { error } = await supabase.auth.signOut()

  if (error) {
    redirect('/error')
  }

  redirect('/')
}
