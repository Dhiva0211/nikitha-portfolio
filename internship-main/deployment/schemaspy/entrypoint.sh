#!/bin/sh

/usr/local/bin/schemaspy -t pgsql -db $POSTGRES_DB -host database -u $POSTGRES_USER -p $POSTGRES_PASSWORD -imageformat svg
mv -v /output/* /usr/share/nginx/html
nginx -g "daemon off;"