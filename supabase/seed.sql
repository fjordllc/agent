-- auth.users
INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") VALUES ('00000000-0000-0000-0000-000000000000', 'dcfeb157-6c90-4d70-ad96-1d6361c1874e', 'authenticated', 'authenticated', 'admin@example.com', '$2a$10$pu4tk32.QPMKPC6fbKKq7up/myrj9chb/1v0hpwz6HHQoAQjEQVBO', '2024-12-13 11:09:31.202211+00', null, '', '2024-12-13 11:09:19.928426+00', '', null, '', '', null, '2024-12-13 11:21:21.870009+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "dcfeb157-6c90-4d70-ad96-1d6361c1874e", "email": "admin@example.com", "email_verified": false, "phone_verified": false}', null, '2024-12-13 11:09:19.921344+00', '2024-12-13 11:21:21.870874+00', null, null, '', '', null, '', '0', null, '', null, 'false', null, 'false');

-- public.companies
INSERT INTO companies (name, website, memo) VALUES ('株式会社ロッカ', 'https://lokka.jp', '良い会社');
INSERT INTO companies (name, website, memo) VALUES ('株式会社リンゴ', 'https://example.com/apple', 'リンゴは良い会社');
INSERT INTO companies (name, website, memo) VALUES ('株式会社バナナ', 'https://example.com/banana', 'バナナは良い会社');
INSERT INTO companies (name, website, memo) VALUES ('株式会社オレンジ', 'https://example.com/orange', 'オレンジは良い会社');

INSERT INTO docs (title, body, created_at, updated_at, user_name, last_updated_user_name) VALUES ('Doc1', 'これは Doc1 です。', NOW(), NOW(), 'fjord(フィヨルド)', 'fjord(フィヨルド)');
INSERT INTO docs (title, body, created_at, updated_at, user_name, last_updated_user_name) VALUES ('Doc2', 'これは Doc2 です。', NOW(), NOW(), 'fjord(フィヨルド)', 'fjord(フィヨルド)');
INSERT INTO docs (title, body, created_at, updated_at, user_name, last_updated_user_name) VALUES ('Doc3', 'これは Doc3 です。', NOW(), NOW(), 'fjord(フィヨルド)', 'fjord(フィヨルド)');
INSERT INTO docs (title, body, created_at, updated_at, user_name, last_updated_user_name) VALUES ('Doc4', 'これは Doc4 です。', NOW(), NOW(), 'fjord(フィヨルド)', 'fjord(フィヨルド)');
INSERT INTO docs (title, body, created_at, updated_at, user_name, last_updated_user_name) VALUES ('Doc5', 'これは Doc5 です。', NOW(), NOW(), 'fjord(フィヨルド)', 'fjord(フィヨルド)');
