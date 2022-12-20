FROM node:16-alpine


RUN mkdir -p /usr/app
WORKDIR /ur/app

COPY ./ ./

RUN npm install
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]