#!/bin/sh
set -e
/usr/sbin/sshd
exec java -jar springbootwebsocketdemo.jar