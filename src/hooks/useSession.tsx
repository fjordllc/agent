import { useState, useEffect } from 'react'
import supabase from '../lib/supabase'
import { Session } from '@supabase/supabase-js'

export default function useSession() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    ;(async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (session) setSession(session)
    })()
  }, [session])

  return [session, setSession]
}
