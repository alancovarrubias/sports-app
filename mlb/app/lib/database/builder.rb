module Database
  module Builder
    MODELS = %i[Teams Games Players Stats SeasonStats Lineups Forecasts].freeze

    module_function

    def run(year, options = {})
      @season = Season.find_or_create_by(year: year)
      @refetch = options[:refetch] ? 1 : 0
      model = options[:model]
      model ? build_table(model) : MODELS.each { |m| build_table(m) }
    end

    def build_table(model)
      raise 'Type must be valid resource type' unless MODELS.include?(model)

      Builder.const_get(model).new(@season, @refetch).build
    end
  end
end
