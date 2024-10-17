#!/bin/bash
version="3.0.2"
docker build --platform linux/amd64 -t muhohoweb/school-ui:$version .

docker push muhohoweb/school-ui:$version

git add . && git commit -m "Build ${version} Add issue book modal" && git push origin main
