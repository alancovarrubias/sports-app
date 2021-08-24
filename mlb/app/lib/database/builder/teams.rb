module Database
  module Builder
    class Teams < Base
      def needs_data?
        @season.teams.empty?
      end

      def build
        return unless needs_data?

        puts "Building Teams for Season #{@season.id}"

        teams_res = query_server(:teams, season: @season.year)
        teams_res['teams'].each do |team_data|
          build_team(team_data)
        end
      end

      def build_team(team_data)
        timezone = Const::Timezones::TEAMS[team_data['abbr'].to_sym]
        team_attributes = team_data.merge(season: @season, timezone: timezone)
        ::Team.create(team_attributes)
      end
    end
  end
end
