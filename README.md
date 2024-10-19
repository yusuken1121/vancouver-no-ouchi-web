# 環境構築
編集中。

# コーディング規約
基本的に、キャメルケース (camelCase) を適用します。

例)
```
  const displayName = `${user_name} さん`
  const formattedDate = new Date(created_at).toLocaleDateString()

  return (
    <div>
      <h1>{displayName}</h1>
      <p>登録日: {formattedDate}</p>
    </div>
  
```

## バックエンド
### バックエンド構成とルーティング概要

本プロジェクトのバックエンドは、MVC (Model-View-Controller) アーキテクチャを採用しています。
以下はプロジェクトのフォルダ構成です。
```
/src
├── config/       # 環境設定や外部サービスとの接続設定
├── controllers/  # ビジネスロジックを呼び出すコントローラー
├── cron/         # 定期実行タスク（Cronジョブ）
├── errors/       # エラーハンドリング用のクラスや処理
├── middlewares/  # 認証やリクエスト検証のミドルウェア
├── routes/       # ルーティングの定義
├── services/     # データベースや外部APIとの通信ロジック
├── types/        # TypeScriptの型定義
└── utils/        # 共通ユーティリティ関数
```

## フロントエンド
### フロントエンド構成とルーティング概要
本プロジェクトでは、Atomic Designの原則に基づいて、UIコンポーネントを階層的に整理しています。
```
/components
├── atoms/      # 基本的なUI要素（ボタン、入力フィールドなど）
├── molecules/  # 複数のAtomを組み合わせたコンポーネント（検索フォームなど）
├── organisms/  # 複数のMoleculeを組み合わせた複雑なコンポーネント（ヘッダーなど）
├── template/   # ページ全体のレイアウトを定義
└── ui/         # shadcnのコンポーネント
```


# Githubルール
## ブランチ命名規則
### feature/短い説明
    
    ```tsx
    例）
    feature/user-authentication
    /product-page-redesign
    ```
    
  - feature/: 新機能追加 → feature/add-pagination
  - fix/: バグ修正 → fix/login-issue
  - hotfix/: 緊急修正 → hotfix/critical-error
  - release/: リリース準備 → release/v1.0.0
  - chore/: 設定やドキュメントの更新 → chore/update-dependencies
  - refactor/: リファクタリング → refactor/user-service
  - test/: テスト関連 → test/add-unit-tests
  - docs/: ドキュメント修正 → docs/update-readme
  - ci/: CI/CD関連 → ci/update-pipeline
  - style/: コードのスタイル修正 → style/fix-eslint-errors



