#!/bin/bash


echo "chaoxie start"
cd `/data/wwwroot/cx-h5/` &&
pm2 stop 0 &&
git pull &&
npm run build &&
npm start 0
echo "chaoxie start success"