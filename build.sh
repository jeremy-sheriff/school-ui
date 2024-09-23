#!/bin/bash
version="2.0.5"
docker build --platform linux/amd64 -t muhohoweb/school-ui:$version .

docker push muhohoweb/school-ui:$version

git add . && git commit -m "Build ${version} with library and students component integrated" && git push origin main
