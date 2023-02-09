# Hosten bei Azure

Im nächsten Schritt soll der Container bei Azure gehostet werden. Dazu muss nach der Anmeldung bei Azure hier eine Azure App Service erstellt werden.

## Erstellen einer Web App

![Grundlagen](a1.png)

![Docker](a2.png)

![Netzwerk](a3.png)

![Ueberwachung](a4.png)

![Tage](a5.png)

![Erstellen](a6.png)

Anschließend erhält man eine Übersicht der Web App und auch schon eine URL unter der diese aufgerufen werden kann.

![Erstellen](a7.png)

## Konfigurieren der Web App

Über den Menüpunkt Konfiguration muss man nun noch den entsprechenden Port öffnen. Dieses geschieht dadurch, dass man Hier den Key **WEBSITES_PORT** und als Value den Port einträgt, hier **8080**.

![Konfiguration](a9.png)

## Einrichten des Web Hooks

Über den Menüpunkt Bereitstellungszenter muss nun der **Webhook** konfiguriert werden. Diesen Webhook muss nun in die Zwischenablage kopiert werden, um ihn Docker bekannt zu machen.

![Konfiguration](a8.png)

Hierzu muss sich auf dem Docker Hub angemeldet werden und im Reiter Webhooks die Adresse aus Azure eingefügt werden. Damit benachrichtigt der Docker Hub Azure, wenn eine neue Version des Images erzeugt wurde.

![Docker](a10.png)

## Automatisieren mit Powershell
