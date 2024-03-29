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

ActiveRecord::Schema.define(version: 2020_08_18_041556) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "games", force: :cascade do |t|
    t.bigint "season_id"
    t.bigint "away_team_id"
    t.bigint "home_team_id"
    t.datetime "start_time"
    t.date "date"
    t.index ["away_team_id"], name: "index_games_on_away_team_id"
    t.index ["home_team_id"], name: "index_games_on_home_team_id"
    t.index ["season_id"], name: "index_games_on_season_id"
  end

  create_table "players", force: :cascade do |t|
    t.bigint "season_id"
    t.bigint "team_id"
    t.string "name"
    t.string "abbr"
    t.string "position"
    t.index ["season_id"], name: "index_players_on_season_id"
    t.index ["team_id"], name: "index_players_on_team_id"
  end

  create_table "seasons", force: :cascade do |t|
    t.integer "year"
  end

  create_table "stats", force: :cascade do |t|
    t.string "interval_type"
    t.bigint "interval_id"
    t.string "model_type"
    t.bigint "model_id"
    t.integer "sp"
    t.integer "fg"
    t.integer "fga"
    t.integer "fg3"
    t.integer "fg3a"
    t.integer "ft"
    t.integer "fta"
    t.integer "orb"
    t.integer "drb"
    t.integer "ast"
    t.integer "stl"
    t.integer "blk"
    t.integer "tov"
    t.integer "pf"
    t.integer "pts"
    t.integer "ortg"
    t.integer "drtg"
    t.index ["interval_type", "interval_id"], name: "index_stats_on_interval_type_and_interval_id"
    t.index ["model_type", "model_id"], name: "index_stats_on_model_type_and_model_id"
  end

  create_table "teams", force: :cascade do |t|
    t.bigint "season_id"
    t.string "name"
    t.string "city"
    t.string "abbr"
    t.index ["season_id"], name: "index_teams_on_season_id"
  end

end
