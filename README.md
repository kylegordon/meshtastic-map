To test this, do something like:

```bash
while true; do mosquitto_pub -h 172.24.32.13 -t 'mgdm/geo' -m '{"lat": 55.9,"lon": -4.3,"label":"hello"}'; sleep 2; done
```

Notes

Leaflet market balloons - https://rikdeboer.medium.com/leaflet-maps-marker-fun-games-53d81fdd2f52