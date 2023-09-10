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

ActiveRecord::Schema.define(version: 2022_04_29_071628) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "games", force: :cascade do |t|
    t.bigint "season_id"
    t.bigint "away_team_id"
    t.bigint "home_team_id"
    t.integer "espn_id"
    t.date "date"
    t.datetime "start_time"
    t.string "game_clock"
    t.index ["away_team_id"], name: "index_games_on_away_team_id"
    t.index ["home_team_id"], name: "index_games_on_home_team_id"
    t.index ["season_id"], name: "index_games_on_season_id"
  end

  create_table "lines", force: :cascade do |t|
    t.bigint "game_id"
    t.integer "type"
    t.integer "period"
    t.integer "spread"
    t.integer "total"
    t.index ["game_id"], name: "index_lines_on_game_id"
  end

  create_table "seasons", force: :cascade do |t|
    t.integer "year"
  end

  create_table "teams", force: :cascade do |t|
    t.bigint "season_id"
    t.string "name"
    t.string "abbr"
    t.integer "league"
    t.index ["season_id"], name: "index_teams_on_season_id"
  end

end
