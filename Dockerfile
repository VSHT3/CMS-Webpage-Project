FROM node:22.12-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY docker/40-seed-mayacal-reports.sh /docker-entrypoint.d/40-seed-mayacal-reports.sh
EXPOSE 80
