import dotenv from 'dotenv'
import '@testing-library/jest-dom'
import { TextEncoder, TextDecoder } from 'util'

dotenv.config({ path: '.env.test' })

if (
  !process.env.NEXT_PUBLIC_SUPABASE_URL ||
  !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
) {
  console.warn(
    '⚠️ Supabase の環境変数が正しく設定されていません！ Jest 実行前に .env.test を確認してください。'
  )
}

global.TextEncoder = TextEncoder as unknown as typeof global.TextEncoder
global.TextDecoder = TextDecoder as unknown as typeof global.TextDecoder

jest.mock('next/headers', () => ({
  cookies: jest.fn(() => ({
    get: jest.fn(() => null),
    getAll: jest.fn(() => []),
    set: jest.fn(),
    delete: jest.fn(),
  })),
}))

const mockSupabaseClient = {
  auth: {
    getSession: jest.fn().mockResolvedValue({
      data: {
        session: { user: { id: 'test-user', email: 'test@example.com' } },
      },
      error: null,
    }),
  },
  from: jest.fn().mockReturnValue({
    select: jest.fn().mockResolvedValue({
      data: [
        {
          id: 1,
          name: '株式会社ロッカ',
          website: 'https://lokka.jp',
          memo: '良い会社',
        },
        {
          id: 2,
          name: '株式会社リンゴ',
          website: 'https://example.com/apple',
          memo: 'リンゴは良い会社',
        },
        {
          id: 3,
          name: '株式会社バナナ',
          website: 'https://example.com/banana',
          memo: 'バナナは良い会社',
        },
        {
          id: 4,
          name: '株式会社オレンジ',
          website: 'https://example.com/orange',
          memo: 'オレンジは良い会社',
        },
      ],
      error: null,
    }),
  }),
}

jest.mock('@/lib/supabaseServer', () => ({
  createSupabaseServerClient: jest.fn(() => mockSupabaseClient),
}))

console.log('✅ Jest 環境のセットアップ完了')
