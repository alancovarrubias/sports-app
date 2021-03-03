module Database
  module Builder
    class PlayStore
      INITIAL = {
        fb: 0,
        gb: 0,
        ld: 0
      }.freeze
      attr_reader :pitchers, :batters

      def initialize(game, stats_res)
        @game = game
        plays = stats_res['plays'].map { |play| Play.new(play) }
        batters = plays.map(&:batter).uniq
        pitchers = plays.map(&:pitcher).uniq
        @batters = initialize_player_map(batters)
        @pitchers = initialize_player_map(pitchers)
        add_hit_types(plays)
      end

      def initialize_player_map(players)
        players.reduce({}) { |acc, player| acc.merge(player => INITIAL.clone) }
      end

      def add_hit_types(plays)
        plays.each do |play|
          add_hit_type(play, type)
        end
      end

      def add_hit_type(play)
        play_type = play.hit_type
        return unless play_type

        add_batter(play.batter, play_type)
        add_batter(play.at_bat, play_type)
        add_pitcher(play.pitcher, play_type)
        add_pitcher(play.on_mound(@game), play_type)
      end

      def on_mound(play)
        @game.away_team.abbr == play.at_bat ? @game.away_team.abbr : @game.home_team.abbr
      end

      def add_batter(batter, type)
        @batters[batter][type] += 1
      end

      def add_pitcher(pitcher, type)
        @pitcher[pitcher][type] += 1
      end

      def get_batter_types(model)
        @batters[model]
      end

      def get_pitcher_types(model)
        @pitchers[model]
      end
    end
  end
end
