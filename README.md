# Spring Boot Websocket Chat

Basierend auf diesem [Artikel](https://springhow.com/spring-boot-websocket/). Über **mvn package** wird die jar Anwendung gebaut und kann dann wie folgt gestartet werden.

```
java -jar target\spring-boot-web-socket-0.0.1-SNAPSHOT.jar
```

Der Server läuft auf Port **8080**!

## Docker Container

Über eine ci/cd Pipeline wird auf docker hub ein docker Image gebaut. Dieses ist wie folgt zu starten:

```
docker run -p 8080:8080 tuttas/springbootwebsocketdemoapplication
```

Anschließend kann über [http://localhost:8080](http://localhost:8080) die Anwendung gestartet werden.

## Anleitung zur CI/CD mittels GitHub,Docker und Azure

Eine umfangreiche Anleitung, zur Automatisierung mittels Github Action mit Docker und Azure kann [hier](https://jtuttas.github.io/SpringSocketChat/site/lokal/) geladen werden.
