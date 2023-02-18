#!/bin/sh
set -e
service ssh start
exec java -jar springbootwebsocketdemo.jar