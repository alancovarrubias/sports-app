module Database
  module Builder
    class Preds < Base
      def build
        return unless needs_data?

        puts "Building preds for Games in season #{@season.year}"
        server_options = {
          season: @season.year
        }
        preds_res = query_server(:preds, server_options)
        build_preds(preds_res)
      end

      private

      def build_preds(preds_res)
        @season.games.each do |game|
          build_pred(game, preds_res)
        end
      end

      def build_pred(game, _preds_res)
        pred_query = {
          bookie: 'opener',
          game: game,
          season: @season
        }
        ::Pred.find_or_create_by(pred_query)
        # pred.update()
      end

      def needs_data?
        @season.preds.empty?
      end
    end
  end
end
