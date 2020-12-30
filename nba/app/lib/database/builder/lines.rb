module Database
  module Builder
    class Lines < Base
      def build
        dates = @season.games.map(&:date).uniq.map(&:to_s)
        dates.each do |date|
          @date = date.tr('-', '')

          puts "Building Lines for Games in date #{date}"
          server_options = {
            date: @date
          }
          lines_res = query_server(:lines, server_options)
          build_lines(lines_res)
        end
      end

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
        game = @season.games.find_by(away_team: away_team, home_team: home_team, date: @date)
        line_query = {
          bookie: 'opener',
          game: game
        }
        line = ::Line.find_or_create_by(line_query)
        line.update(total: total, spread: spread)
      end

      private

      def find_team(team_data)
        if team_data.include? 'L.A.'
          @season.teams.find_by_name(team_data.split(' ').last)
        else
          @season.teams.find_by_city(team_data)
        end
      end

      def convert_data(str)
        str[-1].ord == 50 ? str[0...-1].to_i + 0.5 : str.to_i
      end
    end
  end
end
