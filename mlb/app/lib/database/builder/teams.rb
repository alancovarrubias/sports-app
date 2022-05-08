module Database
  module Builder
    class Teams < Base
      def needs_data?
        @season.teams.empty?
      end

      def build
        return unless needs_data?

        puts "Building Teams for Season #{@season.id}"

        res = query_server(:teams, season: @season.year)
        res['teams'].each { |data| build_team(data) }
      end

      def build_team(data)
        timezone = Const::Timezones::TEAMS[data['abbr'].to_sym]
        attributes = data.merge(season: @season, timezone: timezone)
        Team.create(attributes)
      end
    end
  end
end
