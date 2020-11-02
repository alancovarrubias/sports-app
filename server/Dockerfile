# build stage
FROM node:12-stretch AS build
WORKDIR /build
COPY --chown=node:node package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .

# runtime stage
FROM alpine:3.10
RUN apk add --update nodejs npm
RUN addgroup -S node && adduser -S node -G node
RUN mkdir /home/node/code
WORKDIR /home/node/code
COPY --from=build --chown=node:node /build .
CMD ["npm", "run", "prod"]