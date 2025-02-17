FROM nginx:alpine as nginx-local
FROM schemaspy/schemaspy:latest
ARG POSTGRES_DB
ARG POSTGRES_USER
ARG POSTGRES_PASSWORD

ENV POSTGRES_DB=$POSTGRES_DB
ENV POSTGRES_USER=$POSTGRES_USER
ENV POSTGRES_PASSWORD=$POSTGRES_PASSWORD

USER root

RUN apk add nginx

RUN rm -r /etc/nginx

COPY --from=nginx-local /etc/nginx /etc/nginx
COPY --from=nginx-local /usr/share/nginx/html /usr/share/nginx/html
COPY ./deployment/schemaspy/entrypoint.sh /app/entrypoint.sh

ENTRYPOINT ["sh", "/app/entrypoint.sh"]
