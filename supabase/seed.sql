INSERT INTO auth.users (id, email, encrypted_password, created_at, updated_at)
VALUES 
  (gen_random_uuid(), 'admin@example.com', crypt('testtest', gen_salt('bf')), NOW(), NOW()),
  (gen_random_uuid(), 'user1@example.com', crypt('testtest', gen_salt('bf')), NOW(), NOW());

INSERT INTO companies (name, website, memo) VALUES ('株式会社ロッカ', 'https://lokka.jp', '良い会社');
INSERT INTO companies (name, website, memo) VALUES ('株式会社リンゴ', 'https://example.com/apple', 'リンゴは良い会社');
INSERT INTO companies (name, website, memo) VALUES ('株式会社バナナ', 'https://example.com/banana', 'バナナは良い会社');
INSERT INTO companies (name, website, memo) VALUES ('株式会社オレンジ', 'https://example.com/orange', 'オレンジは良い会社');


