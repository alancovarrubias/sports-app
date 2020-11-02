module Database
  module Builders
    class Team < Base
      def needs_data?
        @season.teams.empty?
      end

      def build
        return unless needs_data?

        teams_res = query_server(:teams, season: @season.year)
        teams_res['teams'].each do |team_data|
          build_team(team_data)
        end
      end

      def build_team(team_data)
        team_attributes = team_data.merge(season: @season)
        ::Team.create(team_attributes)
      end
    end
  end
end
