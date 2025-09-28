# データベース設計

## テーブル定義書

## ユーザープロフィールテーブル `profiles`

| 項目名     | データ型 | 必須 | 説明                        |
| ---------- | -------- | ---- | --------------------------- |
| id         | UUID     | YES  | Supabase Auth のユーザー ID |
| name       | TEXT     | YES  | ユーザー名                  |
| created_at | DATETIME | YES  | 登録日時                    |
| updated_at | DATETIME | YES  | 更新日時                    |

---

## 保護猫情報テーブル `cat_adoption_info`

| 項目名           | データ型 | 必須 | 説明                             |
| ---------------- | -------- | ---- | -------------------------------- |
| id               | UUID     | YES  | 主キー                           |
| user_id          | UUID     | YES  | 投稿者ユーザー ID（profiles.id） |
| prefecture       | TEXT     | YES  | 都道府県                         |
| color            | TEXT     | YES  | 毛色 (選択肢)                    |
| age              | TEXT     | YES  | 年齢 (幼少期・若年期・高齢期)    |
| gender           | TEXT     | YES  | 性別 (オス・メス・不明)          |
| vaccinated       | BOOLEAN  | YES  | ワクチン接種状況                 |
| neutered         | BOOLEAN  | YES  | 去勢手術の有無                   |
| single_ok        | BOOLEAN  | YES  | 単身者応募可否                   |
| elderly_ok       | BOOLEAN  | YES  | 高齢者応募可否                   |
| description      | TEXT     | NO   | 保護の経緯                       |
| personality      | TEXT     | NO   | 性格・特徴                       |
| health_condition | TEXT     | NO   | 健康状態                         |
| created_at       | DATETIME | YES  | 登録日時                         |
| updated_at       | DATETIME | YES  | 更新日時                         |
| adopted          | BOOLEAN  | YES  | 譲渡が決定したかどうか           |

※ 後で追加するかもしれない
| fiv_status | BOOLEAN | YES | 猫エイズ（FIV） |
| felv_status | BOOLEAN | YES | 猫白血病（FeLV） |
| delivery_method | TEXT | NO | 引き渡し方法 |

---

## 猫画像テーブル `cat_images`

| 項目名     | データ型 | 必須 | 説明                              |
| ---------- | -------- | ---- | --------------------------------- |
| id         | UUID PK  | YES  | 識別用 ID                         |
| cat_id     | UUID     | YES  | 猫投稿 ID（cat_adoption_info.id） |
| image_url  | TEXT     | YES  | 画像 URL                          |
| order      | INTEGER  | NO   | スライダー表示順                  |
| created_at | DATETIME | YES  | 登録日時（自動記録）              |
| updated_at | DATETIME | YES  | 更新日時（自動記録）              |

---

## 経過報告テーブル `cat_updates`

| 項目名      | データ型 | 必須 | 説明                                  |
| ----------- | -------- | ---- | ------------------------------------- |
| id          | UUID PK  | YES  | 識別用 ID（主キー、自動採番 or UUID） |
| cat_id      | UUID     | YES  | 猫投稿 ID（cat_adoption_info.id）     |
| user_id     | UUID     | YES  | 投稿者ユーザー ID（profiles.id）      |
| update_text | TEXT     | YES  | 報告内容（自由記述）                  |
| image_url   | TEXT     | NO   | 画像　 URL                            |
| created_at  | DATETIME | YES  | 登録日時（自動記録）                  |
| updated_at  | DATETIME | YES  | 更新日時（自動記録）                  |

---

## お気に入りテーブル `favorites`

| 項目名     | データ型 | 必須 | 説明                                  |
| ---------- | -------- | ---- | ------------------------------------- |
| id         | UUID PK  | YES  | 識別用 ID（主キー、自動採番 or UUID） |
| user_id    | UUID     | YES  | ユーザー ID（profiles.id）            |
| cat_id     | UUID     | YES  | 猫投稿 ID（cat_adoption_info.id）     |
| created_at | DATETIME | YES  | 登録日時                              |
| updated_at | DATETIME | YES  | 更新日時                              |

---

## 譲渡元・譲渡先テーブル `adoptions`

| 項目名 　     | データ型 　 | 必須 　 | 説明                                  |
| ------------- | ----------- | ------- | ------------------------------------- |
| id 　         | UUID PK     | YES     | 識別用 ID（主キー、自動採番 or UUID） |
| cat_id 　     | UUID        | YES     | 猫投稿 ID（cat_adoption_info.id）     |
| from_user_id  | UUID        | YES     | 譲渡元ユーザー ID（profiles.id）      |
| to_user_id 　 | UUID        | YES     | 譲渡先ユーザー ID（profiles.id）      |
| created_at 　 | DATETIME    | YES     | 登録日時                              |
| updated_at 　 | DATETIME    | YES     | 更新日時                              |
