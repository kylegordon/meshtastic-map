To test this, do something like:

```bash
while true; do mosquitto_pub -h 172.24.32.13 -t 'mgdm/geo' -m '{"lat": 55.9,"lon": -4.3,"label":"hello"}'; sleep 2; done
```

### MQTT ###

The 'local' eclipse-mosquitto instance bridges the TCP based MQTT protocol at mqtt.meshtastic.org to a WebSockets enabled server running locally

### Notes ###

Leaflet marker balloons - https://rikdeboer.medium.com/leaflet-maps-marker-fun-games-53d81fdd2f52
Leaflet intro https://maptimeboston.github.io/leaflet-intro/


### Example Message ###

From 'mesh' device with MQTT enabled
msh/1/json/LongSlow/!336aa961/POSITION_APP {"channelId":"LongSlow","gatewayId":"!336aa961","packet":{"from":862628193,"to":862621573,"channel":177,"decoded":{"latitudeI":557808280,"longitudeI":-44715801,"altitude":208,"batteryLevel":100,"time":1631537932},"id":153724265,"rxTime":1631537932,"rxSnr":0.0,"hopLimit":3,"wantAck":false,"priority":"RELIABLE","rxRssi":0}}

From 'mesh' device without MQTT enabled
msh/1/json/LongSlow/!336a8f85/POSITION_APP {"channelId":"LongSlow","gatewayId":"!a84c7038","packet":{"from":862621573,"to":-1,"channel":177,"decoded":{"latitudeI":557805567,"longitudeI":-44715839,"altitude":270,"batteryLevel":30,"time":1631537986},"id":1489549959,"rxTime":1631537953,"rxSnr":11.25,"hopLimit":1,"wantAck":false,"priority":"UNSET","rxRssi":0}}
