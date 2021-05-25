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

ActiveRecord::Schema.define(version: 2021_02_07_234207) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "batting_stats", force: :cascade do |t|
    t.bigint "season_id"
    t.bigint "game_id"
    t.string "model_type"
    t.bigint "model_id"
    t.boolean "starter"
    t.integer "ab"
    t.integer "r"
    t.integer "h"
    t.integer "rbi"
    t.integer "bb"
    t.integer "so"
    t.integer "pa"
    t.float "ba"
    t.float "obp"
    t.float "slg"
    t.float "ops"
    t.integer "fb"
    t.integer "ld"
    t.integer "gb"
    t.integer "fb_p"
    t.integer "ld_p"
    t.integer "gb_p"
    t.index ["game_id"], name: "index_batting_stats_on_game_id"
    t.index ["model_type", "model_id"], name: "index_batting_stats_on_model_type_and_model_id"
    t.index ["season_id"], name: "index_batting_stats_on_season_id"
  end

  create_table "games", force: :cascade do |t|
    t.bigint "season_id"
    t.bigint "away_team_id"
    t.bigint "home_team_id"
    t.date "date"
    t.integer "num"
    t.time "time"
    t.index ["away_team_id"], name: "index_games_on_away_team_id"
    t.index ["home_team_id"], name: "index_games_on_home_team_id"
    t.index ["season_id"], name: "index_games_on_season_id"
  end

  create_table "lines", force: :cascade do |t|
    t.bigint "season_id"
    t.bigint "game_id"
    t.string "bookie"
    t.float "total"
    t.index ["game_id"], name: "index_lines_on_game_id"
    t.index ["season_id"], name: "index_lines_on_season_id"
  end

  create_table "pitching_stats", force: :cascade do |t|
    t.bigint "season_id"
    t.bigint "game_id"
    t.string "model_type"
    t.bigint "model_id"
    t.boolean "starter"
    t.float "ip"
    t.integer "h"
    t.integer "r"
    t.integer "er"
    t.integer "bb"
    t.integer "so"
    t.integer "hr"
    t.float "era"
    t.integer "fb"
    t.integer "ld"
    t.integer "gb"
    t.integer "fb_p"
    t.integer "ld_p"
    t.integer "gb_p"
    t.index ["game_id"], name: "index_pitching_stats_on_game_id"
    t.index ["model_type", "model_id"], name: "index_pitching_stats_on_model_type_and_model_id"
    t.index ["season_id"], name: "index_pitching_stats_on_season_id"
  end

  create_table "players", force: :cascade do |t|
    t.bigint "season_id"
    t.bigint "team_id"
    t.string "name"
    t.string "abbr"
    t.string "position"
    t.integer "age"
    t.index ["season_id"], name: "index_players_on_season_id"
    t.index ["team_id"], name: "index_players_on_team_id"
  end

  create_table "preds", force: :cascade do |t|
    t.bigint "season_id"
    t.bigint "game_id"
    t.string "desc"
    t.float "away_score"
    t.float "home_score"
    t.index ["game_id"], name: "index_preds_on_game_id"
    t.index ["season_id"], name: "index_preds_on_season_id"
  end

  create_table "seasons", force: :cascade do |t|
    t.integer "year"
  end

  create_table "teams", force: :cascade do |t|
    t.bigint "season_id"
    t.string "name"
    t.string "city"
    t.string "abbr"
    t.string "link"
    t.index ["season_id"], name: "index_teams_on_season_id"
  end

end
