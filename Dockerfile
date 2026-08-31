FROM node:22.12-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY --from=builder /app/dist/assets/pdfs/grants /opt/cms-pdf-seed/grants
COPY docker/40-seed-mayacal-reports.sh /docker-entrypoint.d/40-seed-mayacal-reports.sh
RUN chmod 755 /docker-entrypoint.d/40-seed-mayacal-reports.sh
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
