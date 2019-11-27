# DB設計

## users テーブル

| Column   | Type    | Options                        |
| -------- | ------- | ------------------------------ |
| user     | string  | null: false, index: true       |
| email    | string  | null: false, unique: true      |
| password | string  | null: false,                   |


### Association
+ has_many :groups, through: :groups_users
+ has_many :messages

## groups テーブル

| Column   | Type    | Options                       |
| -------- | ------- | ----------------------------- |
| name     | string  | null: false                   |


### Association
+ has_many :users, through: :groups_users
+ has_many :messages

## groups_users テーブル

| Column   | Type       | Options                        |
| -------- | ---------- | ------------------------------ |
| user_id  | references | null: false, foreign_key: true |
| group_id | references | null: false, foreign_key: true |


### Association
+ belongs_to :user
+ belongs_to :group


## messages テーブル
| Column   | Type    | Options                       |
| -------- | ------- | ----------------------------- |
| text     | text    | null: false                   |
| image    | text    |                               |
| user_id  | references | null: false foreign_key: true |
| group_id | references | null: false foreign_key: true |


### Association
+ belongs_to :user
+ belongs_to :group


