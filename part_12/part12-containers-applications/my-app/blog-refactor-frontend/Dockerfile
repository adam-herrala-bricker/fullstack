FROM node:16

WORKDIR /usr/src/blog-refactor-frontend

COPY . .

RUN npm ci

CMD ["npm", "run", "build"]