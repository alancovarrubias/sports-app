module Database
  module Builder
    class PlayStore
      attr_reader :pitchers, :batters

      def initialize(stats_res, game)
        plays = stats_res['plays'].map { |play| Play.new(play, game) }
        @away_team = game.away_team.abbr
        @home_team = game.home_team.abbr
        @batters = initialize_map(plays, :batter)
        @pitchers = initialize_map(plays, :pitcher)
        plays.each do |play|
          add_play_type(play)
        end
      end

      def get_hit_types(stat_type, model)
        stat_type == 'Pitching' ? @pitchers[model] : @batters[model]
      end

      private

      def initialize_map(plays, model_type)
        players = plays.map(&model_type).uniq
        initial = {
          fb: 0,
          gb: 0,
          ld: 0
        }
        list = players + [@away_team, @home_team]
        list.reduce({}) { |acc, player| acc.merge(player => initial.clone) }
      end

      def add_play_type(play)
        play_type = play.type
        return unless play_type

        add_batter(play.batter, play_type)
        add_batter(play.at_bat, play_type)
        add_pitcher(play.pitcher, play_type)
        add_pitcher(play.on_mound, play_type)
      end

      def add_batter(batter, type)
        @batters[batter][type] += 1
      end

      def add_pitcher(pitcher, type)
        @pitchers[pitcher][type] += 1
      end
    end
  end
end
