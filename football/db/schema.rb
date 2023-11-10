# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2023_11_02_034757) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "games", force: :cascade do |t|
    t.bigint "season_id"
    t.bigint "away_team_id"
    t.bigint "home_team_id"
    t.integer "espn_id"
    t.integer "week"
    t.integer "kicked"
    t.date "date"
    t.datetime "start_time"
    t.string "game_clock"
    t.datetime "stats_enqueued_at"
    t.datetime "stats_calculated_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["away_team_id"], name: "index_games_on_away_team_id"
    t.index ["home_team_id"], name: "index_games_on_home_team_id"
    t.index ["season_id"], name: "index_games_on_season_id"
  end

  create_table "lines", force: :cascade do |t|
    t.bigint "game_id"
    t.integer "interval"
    t.integer "book"
    t.float "spread"
    t.float "total"
    t.index ["game_id"], name: "index_lines_on_game_id"
  end

  create_table "seasons", force: :cascade do |t|
    t.integer "year"
    t.integer "league"
  end

  create_table "stats", force: :cascade do |t|
    t.bigint "team_id"
    t.bigint "game_id"
    t.integer "interval"
    t.integer "score", default: 0
    t.integer "completions", default: 0
    t.integer "attempts", default: 0
    t.integer "passing_yards", default: 0
    t.integer "longest_pass", default: 0
    t.integer "carries", default: 0
    t.integer "rushing_yards", default: 0
    t.integer "longest_rush", default: 0
    t.index ["game_id"], name: "index_stats_on_game_id"
    t.index ["team_id"], name: "index_stats_on_team_id"
  end

  create_table "teams", force: :cascade do |t|
    t.bigint "season_id"
    t.string "name"
    t.string "abbr"
    t.index ["season_id"], name: "index_teams_on_season_id"
  end

end
