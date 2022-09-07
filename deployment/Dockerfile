FROM node:16-alpine
COPY ./ /app
WORKDIR /app
RUN npm install
RUN npm run build

FROM nginx
RUN mkdir /app
COPY --from=0 /app/dist /app
COPY deployment/nginx.conf /etc/nginx/nginx.conf