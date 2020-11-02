module Database
  class Builder
    MODEL_TYPES = %i[Team Game Player Stat].freeze
    def initialize(year)
      @season = ::Season.find_or_create_by(year: year)
    end

    def run(model = :All)
      model == :All ? build_all : build_model(model)
    end

    def build_all
      MODEL_TYPES.each { |model| build_model(model) }
    end

    def build_model(model)
      raise 'Type must be valid resource type' unless MODEL_TYPES.include?(model)

      builder = Builders::Factory.create_builder(model, @season)
      builder.build
    end
  end
end
