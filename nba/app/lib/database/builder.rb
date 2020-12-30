module Database
  module Builder
    MODEL_TYPES = %i[Team Game Player Stat Line].freeze

    module_function

    def run(year, model = :All)
      @season = ::Season.find_or_create_by(year: year)
      model == :All ? build_all : build_model(model)
    end

    def build_all
      MODEL_TYPES.each { |model| build_model(model) }
    end

    def build_model(model)
      raise 'Type must be valid resource type' unless MODEL_TYPES.include?(model)

      builder = Builder::Factory.create_builder(model, @season)
      builder.build
    end
  end
end
