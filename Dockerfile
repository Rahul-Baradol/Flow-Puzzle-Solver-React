FROM node:18.17-alpine as build

WORKDIR /usr/src/app

COPY package* .

RUN npm install 

COPY . .

RUN npm run build

FROM node:18.17-alpine

COPY --from=build /usr/src/app/build /usr/src/app/

RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "/usr/src/app"]