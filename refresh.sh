#!/bin/bash


echo "chaoxie start"
cd `/www/wwwroot/chaoxie/h5/demo/` &&
pm2 stop 2 &&
git pull &&
npm run build &&
npm start 2
echo "chaoxie start success"