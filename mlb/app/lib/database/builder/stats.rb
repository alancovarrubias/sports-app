module Database
  module Builder
    class Stats < Base
      TIME_REGEX = /\d{1,2}:\d{2}/.freeze
      INITIAL_HIT_TYPE = {
        fb: 0,
        gb: 0,
        ld: 0
      }.freeze
      def needs_data?
        @game.hour.nil?
      end

      def build
        @season.games.each do |game|
          @game = game
          next unless needs_data?

          puts "Building Stats for Game #{game.id}"

          server_options = {
            season: @season.year,
            game_url: @game.url,
            home_team: @game.home_team.full_name,
            away_team: @game.away_team.full_name
          }
          stats_res = query_server(:stats, server_options)
          build_stats(stats_res)
          save_time(stats_res['time'])
        end
      end

      def save_time(time)
        clock_time = TIME_REGEX.match(time).to_s
        hour = clock_time[0...clock_time.index(':')].to_i
        hour += 12 if time.include?('p.m.')
        minute = clock_time[-2..]
        @game.update(hour: hour, minute: minute)
      end

      def build_stats(stats_res)
        @store = PlayStore.new(stats_res, @game)
        %i[away home].each do |side|
          team = @game.send("#{side}_team")
          %i[team player].each do |model|
            stats_res["#{side}_#{model}_stats"].each do |stat|
              build_stat(stat, team)
            end
          end
        end
      end

      def build_stat(stat, team)
        model_type = stat.delete('model_type')
        abbr = stat.delete('abbr')
        stat_type = stat.delete('stat_type')
        model = model_type == 'Player' ? ::Player.find_by(abbr: abbr, team: team) : team
        model_class = stat_type == 'Pitching' ? ::PitchingStat : ::BattingStat
        model_key = model_type == 'Player' ? model.name : model.abbr
        hit_types = @store.get_hit_types(stat_type, model_key)
        stat.merge!(hit_types) if hit_types
        stat_query = {
          season: @season,
          game: @game,
          model: model
        }
        stat_object = model_class.find_or_create_by(stat_query)
        stat_object.update(stat)
      end
    end
  end
end
