# Etapa 1, basado en NodeJS, para compilar Angular.
FROM node:14.17.3 as build
RUN mkdir -p /app
WORKDIR /app
COPY package*.json /app
RUN npm install
COPY . /app
RUN npm run build --prod
#Etapa 2, basado en Nginx (colocar proyecto en carpeta de lectura)
FROM nginx:1.17.1-alpine
COPY --from=build /app/dist/proyfrontendgrupo08 /usr/share/nginx/html
RUN rm etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf