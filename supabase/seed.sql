INSERT INTO
  auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    invited_at,
    confirmation_token,
    confirmation_sent_at,
    recovery_token,
    recovery_sent_at,
    email_change_token_new,
    email_change,
    email_change_sent_at,
    last_sign_in_at,
    raw_app_meta_data,
    raw_user_meta_data,
    is_super_admin,
    created_at,
    updated_at,
    phone,
    phone_confirmed_at,
    phone_change,
    phone_change_token,
    phone_change_sent_at,
    email_change_token_current,
    email_change_confirm_status,
    banned_until,
    reauthentication_token,
    reauthentication_sent_at
  )
VALUES
  (
    '00000000-0000-0000-0000-000000000000',
    'b7d14654-f345-4c23-93f9-3ae835cf0e55',
    'authenticated',
    'authenticated',
    'komagata@gmail.com',
    '$2a$10$BoqMiM66ohlIydt8w61Kt.jz2m1YWNL1gDjyCwR0f0prqtiMQAgtC',
    '2022-11-21 15:29:08.292902+00',
    NULL,
    '',
    NULL,
    '',
    '2022-11-21 15:30:28.103872+00',
    '',
    '',
    NULL,
    '2022-11-21 15:31:03.297816+00',
    '{"provider": "email", "providers": ["email"]}',
    '{}',
    NULL,
    '2022-11-21 15:29:08.277887+00',
    '2022-11-21 15:31:03.299625+00',
    NULL,
    NULL,
    '',
    '',
    NULL,
    '',
    0,
    NULL,
    '',
    NULL
  );

INSERT INTO
  auth.identities (
    id,
    user_id,
    identity_data,
    provider,
    last_sign_in_at,
    created_at,
    updated_at
  )
VALUES
  (
    'b7d14654-f345-4c23-93f9-3ae835cf0e55',
    'b7d14654-f345-4c23-93f9-3ae835cf0e55',
    '{"sub": "b7d14654-f345-4c23-93f9-3ae835cf0e55"}',
    'email',
    '2022-11-21 15:29:08.289238+00',
    '2022-11-21 15:29:08.28926+00',
    '2022-11-21 15:29:08.289263+00'
  );

INSERT INTO
  public.companies (name, website, memo)
VALUES
  ('株式会社りんご', 'https://ringo.example.com', '特に無し'),
  ('みかん株式会社', 'https://mikan.example.com', ''),
  (
    '合同会社バナナ',
    'https://banana.example.com',
    'ジュニアの採用は無し。\n既に二人就職されています。'
  );
