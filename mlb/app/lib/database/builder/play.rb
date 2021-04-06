module Database
  module Builder
    class Play
      attr_reader :text, :pitcher, :batter, :at_bat, :on_mound

      def initialize(play, game)
        @game = game
        @text = play['text'].gsub(/\([^)]*\)/, '').gsub(/;.*$/, '')
        @pitcher = play['pitcher']
        @batter = play['batter']
        @at_bat = play['at_bat']
        @on_mound = game.away_team.abbr == @at_bat ? game.away_team.abbr : game.home_team.abbr
      end

      def type
        return :fb if @text =~ /fly/i
        return :ld if @text =~ /line/i
        return :gb if @text =~ /ground/i
      end
    end
  end
end
