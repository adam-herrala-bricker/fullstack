FROM node:16

WORKDIR /usr/src/app

COPY . .

#using install bc we're in dev mode here
RUN npm install

CMD ["npm", "start"]