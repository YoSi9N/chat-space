# DB設計

## users テーブル

| Column    | Type    | Options                        |
| --------- | ------- | ------------------------------ |
| user_name | string  | null: false                    |
| email     | string  | null: false, unique: true      |
| email     | index   | null: false, unique: true      |
| password  | string  | null: false,                   |
| group_id  | integer | null: false, foreign_key: true |
|           |         |                                |

### Association
+ has_many :groups, through: :groups_users
+ has_many :messages

## groups テーブル

| Column     | Type    | Options                       |
| ---------- | ------- | ----------------------------- |
| group_name | string  | null: false                   |
| user_id    | integer | null: false foreign_key: true |
| group_id   | integer | null: false foreign_key: true |
|            |         |                               |

### Association
+ has_many :users, through: :groups_users
+ has_many :messages

## groups_users テーブル

| Column   | Type    | Options                        |
| -------- | ------- | ------------------------------ |
| user_id  | integer | null: false, foreign_key: true |
| group_id | integer | null: false, foreign_key: true |
|          |         |                                |

### Association
+ has_many :users
+ has_many :groups


## messages テーブル
| Column   | Type    | Options                       |
| -------- | ------- | ----------------------------- |
| text     | text    | null: false                   |
| image    | text    |                               |
| user_id  | integer | null: false foreign_key: true |
| group_id | integer | null: false foreign_key: true |
|          |         |                               |

### Association
+ belongs_to :user
+ belongs_to :group

