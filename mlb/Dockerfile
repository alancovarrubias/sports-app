FROM ruby:2-slim

RUN apt-get update -qq && apt-get install -y build-essential libpq-dev
RUN mkdir /project
WORKDIR /project

COPY Gemfile Gemfile.lock ./
RUN gem install bundler --no-document
RUN bundle install --no-binstubs --jobs $(nproc) --retry 3
COPY . .

CMD ["rails", "server", "-p", "3002", "-b", "0.0.0.0"]