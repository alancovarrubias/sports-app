module Database
  module Builder
    module Factory
      def self.create_builder(model, season)
        case model
        when :Team
          Builder::Teams.new(season)
        when :Game
          Builder::Games.new(season)
        when :Player
          Builder::Players.new(season)
        when :Stat
          Builder::Stats.new(season)
        when :Line
          Builder::Lines.new(season)
        end
      end
    end
  end
end
