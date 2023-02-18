FROM openjdk:8-jdk-alpine
VOLUME /tmp
ARG JAVA_OPTS
ENV JAVA_OPTS=$JAVA_OPTS
COPY ./springbootwebsocketdemo.jar .

COPY sshd_config /etc/ssh/
COPY start.sh ./
# Start and enable SSH
RUN apk add openssh && echo "root:Docker!" | chpasswd && chmod +x ./start.sh && cd /etc/ssh/ && ssh-keygen -A
EXPOSE 8080 2222
ENTRYPOINT [ "./start.sh" ]

# For Spring-Boot project, use the entrypoint below to reduce Tomcat startup time.
#ENTRYPOINT exec java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -jar springbootwebsocketdemo.jar
