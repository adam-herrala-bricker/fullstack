# two stages so that all the junk for building isn't retained in the final container
FROM node:16 AS build-stage

WORKDIR /usr/src/app

COPY . .

# ENV REACT_APP_BACKEND_URL=http://localhost:3000
ENV REACT_APP_BACKEND_URL=http://localhost:8080/api
ENV PORT=3001

RUN npm ci
# build will fail if tests fails
RUN CI=true npm test

RUN npm run build

# 2nd stage to serve static build
FROM nginx:1.20-alpine

COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html