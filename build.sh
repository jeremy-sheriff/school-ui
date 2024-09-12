#!/bin/bash
version="1.0.5"
docker build --platform linux/amd64 -t muhohoweb/school-ui:$version .

docker push muhohoweb/school-ui:$version

git add . && git commit -m "Build 1.0.5" && git push origin main
