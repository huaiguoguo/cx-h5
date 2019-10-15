#!/bin/bash


echo "chaoxie start"
cd `/www/wwwroot/chaoxie/h5/demo/` &&
pm2 stop 0 &&
git pull &&
npm run build &&
npm start 0
echo "chaoxie start success"