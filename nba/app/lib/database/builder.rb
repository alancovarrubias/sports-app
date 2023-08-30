module Database
  module Builder
    MODEL_TYPES = %i[Team Game Player Stat].freeze

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

      Builder.const_get(model).new(@season).build
    end
  end
end
