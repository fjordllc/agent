import { createSupabaseServerClient } from '@/lib/supabaseServer'
import CompaniesList from './CompaniesList'

export default async function Companies() {
  const supabase = await createSupabaseServerClient()

  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession()
  if (sessionError || !sessionData.session) {
    console.error(
      'ユーザー認証エラー:',
      sessionError?.message || 'Auth session missing!'
    )
    return <p>ログインしてください。</p>
  }

  const { data: companies, error } = await supabase
    .from('companies')
    .select('*')
  if (error) {
    console.error('企業データの取得に失敗:', error.message)
    return <p>データの取得に失敗しました。</p>
  }

  return <CompaniesList companies={companies} />
}
