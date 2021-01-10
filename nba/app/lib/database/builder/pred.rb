module Database
  module Builder
    class Pred < Base
      def build
        return unless needs_data?

        puts "Building Preds for Games in season #{@season.year}"
        server_options = {
          season_id: @season.id
        }
        preds_res = query_server(:Pred, server_options)
        build_preds(preds_res)
      end

      private

      def build_preds(preds_res)
        @season.games.each do |game|
          scores = preds_res[game.id.to_s]
          build_pred(game, scores) if scores
        end
      end

      def build_pred(game, scores)
        away_score, home_score = scores
        pred_query = {
          desc: 'teams',
          game: game,
          season: @season
        }
        pred = ::Pred.find_or_create_by(pred_query)
        pred.update(away_score: away_score, home_score: home_score)
      end

      def needs_data?
        @season.preds.empty?
      end
    end
  end
end
