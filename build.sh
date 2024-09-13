#!/bin/bash
version="2.0.3"
docker build --platform linux/amd64 -t muhohoweb/school-ui:$version .

docker push muhohoweb/school-ui:$version

git add . && git commit -m "Build ${version}" && git push origin main
