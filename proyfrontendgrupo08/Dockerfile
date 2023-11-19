FROM node:14.17.3 as build

RUN mkdir -p /app

WORKDIR /app

COPY package*.json /app

RUN npm install

COPY . /app
RUN npm run build --prod

#Segunda capa
FROM nginx:1.17.1-alpine

COPY --from=build /app/dist/proyfrontendgrupo08 /usr/share/nginx/html

#Modificamos el archivo de configuración de nginx para que funcione el enrutado de Angular
RUN rm etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf