# Automatisierung mittels GitHub Actions

## Bauen der Anwendung

Das Bauen der Anwendung kann auch mittels github Actions automatisch auf Github erfolgen. Dazu muss eine **.yml** Datei ind das Verzeichnis **.github/workflows** aktiviert haben. Zahlreiche Actions sind bereits entwickelt, so auch die zum Packen eines Maven Projektes.

Nach einem Commit auf das Repository kann die Anwendung als **jar** File herunter geladen werden.

![Download_der_jar](pic2.png)

## Bauen des Docker Images

Ebenso kann der Docker Container der Anwendung automatisch via einer GitHub Action gebaut werden. Zum Speichern des Images wird dazu eine Registry verwendet. Default wird die Registry von **docker.io** benutzt.

Die Notwendigen Credentials für das Einloggen auf dem Docker Hub werden in Github hinterlegt.

![credentials](pic3.png)



