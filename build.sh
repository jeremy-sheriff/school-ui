#!/bin/bash
version="1.0.0"
docker build --platform linux/amd64 -t muhohoweb/school-ui:$version . &&

docker push muhohoweb/school-ui:$version &&

git add . && git commit -m "Ignore .vscode" && git push origin main
