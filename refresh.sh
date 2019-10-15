#!/bin/bash

chkconfig: 2345 70 30

echo "chaoxie start"
cd /www/wwwroot/chaoxie/h5/demo/ && pm2 stop 0 && git pull && npm run build && pm start 0
echo "chaoxie start success"