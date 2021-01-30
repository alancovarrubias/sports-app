module Database
  module Builder
    class Line < Base
      def build
        dates = @season.games.map(&:date).uniq
        dates.each do |date|
          @games = @season.games.where(date: date)
          next unless needs_data?

          puts "Building Lines for Games in date #{date}"
          server_options = {
            date: date.to_s.tr('-', '')
          }
          lines_res = query_server(:Line, server_options)
          build_lines(lines_res)
        end
      end

      private

      def build_lines(lines_res)
        teams = lines_res['teams']
        totals = lines_res['totals']
        spreads = lines_res['spreads']
        until teams.empty?
          home_team = teams.pop
          away_team = teams.pop
          total = totals.pop
          spread = spreads.pop
          build_line(away_team: away_team, home_team: home_team, total: total, spread: spread)
        end
      end

      def build_line(attributes)
        away_team = find_team(attributes[:away_team])
        home_team = find_team(attributes[:home_team])
        total = convert_data(attributes[:total])
        spread = convert_data(attributes[:spread])
        game = @games.find_by(away_team: away_team, home_team: home_team)
        line_query = {
          bookie: 'opener',
          season: @season,
          game: game
        }
        line = ::Line.find_or_create_by(line_query)
        line.update(total: total, spread: spread)
      end

      def find_team(team_data)
        if team_data.include? 'L.A.'
          @season.teams.find_by_name(team_data.split(' ').last)
        else
          @season.teams.find_by_city(team_data)
        end
      end

      def convert_data(str)
        str[-1].ord == 189 ? str[0...-1].to_i + 0.5 : str.to_i
      end

      def needs_data?
        ::Line.where(game: @games).empty?
      end
    end
  end
end
