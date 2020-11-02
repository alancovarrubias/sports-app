module Database
  module Builders
    module Factory
      def self.create_builder(model, season)
        case model
        when :Team
          Builders::Team.new(season)
        when :Game
          Builders::Game.new(season)
        when :Player
          Builders::Player.new(season)
        when :Stat
          Builders::Stat.new(season)
        end
      end
    end
  end
end
