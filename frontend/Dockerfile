FROM node:alpine as frontend
WORKDIR /var/www
COPY ./package.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx
WORKDIR /var/www
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=frontend /var/www/build /usr/share/nginx/html
EXPOSE 3000