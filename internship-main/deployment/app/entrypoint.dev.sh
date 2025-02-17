#!/bin/sh

cp -r /app/cache/node_modules /app
cp /app/cache/yarn.lock /app
cd /app
yarn prisma generate
yarn prisma migrate deploy
yarn dev