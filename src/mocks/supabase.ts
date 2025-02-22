import { createClient } from '@/utils/supabase/server'
import {
  AuthError,
  Session,
  AuthChangeEvent,
  User,
} from '@supabase/supabase-js'
import { jest } from '@jest/globals'

export type AuthCredential = {
  email: string
  password: string
}

const mockUser: User = {
  id: 'test-user',
  email: 'test@example.com',
  app_metadata: {},
  user_metadata: {},
  aud: 'authenticated',
  created_at: new Date().toISOString(),
}

const mockSession: Session = {
  access_token: 'mock_access_token',
  refresh_token: 'mock_refresh_token',
  expires_in: 3600,
  token_type: 'bearer',
  user: mockUser,
}

jest.mock('@/lib/supabase', () => ({
  supabase: {
    auth: {
      getSession: jest
        .fn<() => Promise<{ data: Session | null; error: null }>>()
        .mockResolvedValue({
          data: mockSession,
          error: null,
        }),
      signInWithPassword: jest.fn(),
      signOut: jest.fn(),
      onAuthStateChange: jest.fn(
        (
          callback?: (event: AuthChangeEvent, session: Session | null) => void
        ) => {
          if (callback && typeof callback === 'function') {
            const mockEvent: AuthChangeEvent = 'SIGNED_IN'
            callback(mockEvent, mockSession)
          }
          return { unsubscribe: jest.fn<() => void>() }
        }
      ),
      getUser: jest
        .fn<() => Promise<{ data: { user: User } | null; error: null }>>()
        .mockResolvedValue({
          data: { user: mockUser },
          error: null,
        }),
    },
    from: jest.fn((table: string) => {
      if (table === 'companies') {
        return {
          select: jest
            .fn<
              () => Promise<{
                data: {
                  id: number
                  name: string
                  website: string
                  memo: string
                }[]
                error: null
              }>
            >()
            .mockResolvedValue({
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
        }
      }
      return {
        select: jest
          .fn<() => Promise<{ data: null; error: null }>>()
          .mockResolvedValue({
            data: null,
            error: null,
          }),
      }
    }),
  },
}))

export const mockUserLoggedIn = async (user?: AuthCredential) => {
  const client = await createClient()
  ;(
    client.auth.getUser as jest.Mock<
      () => Promise<{ data: { user: User } | null; error: null }>
    >
  ).mockResolvedValueOnce({
    data: user ? { user: { ...mockUser, email: user.email } } : null, // ✅ `null` を直接渡す
    error: null,
  })
}

export const mockAuthError = async (error: AuthError) => {
  const client = await createClient()
  ;(
    client.auth.getUser as unknown as jest.Mock<
      () => Promise<{ data: null; error: AuthError }>
    >
  ).mockRejectedValueOnce(error)
}
