<?php

return [
  // フロント設定
  'front' => [
    'url' => env("FRONT_APP_URL", "http://localhost"),
  ],

  // サービス関連
  'services' => [
    'app_name' => env("APP_NAME", "Laravel 11 Web Apps"),

    // 管理者関連
    'admin' => [
      'email' => env("MAIL_FROM_ADDRESS", "admin@exmple.com")
    ],
  ],

  // ユーザ関連
  'user' => [
    // 登録関連
    'register' => [
      // 有効期限（10日）
      'expired' => (60 * 60 * 24 * 10)
    ],
  ],
];
