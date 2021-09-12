const map = L.map("map", {
    center: [55.9, -4.3],
    zoom: 13
});

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
        '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>',
}).addTo(map);

const client = new Paho.MQTT.Client("172.24.32.13", 9001, "clientId");
client.onMessageArrived = onMessage;
client.onConnectionLost = onConnectionLost;

function onConnect() {
    client.subscribe('mgdm/geo');
};

function onMessage(message) {
    console.log("Message received");
    const m = JSON.parse(message.payloadString);
    console.log(m);

    const marker = L.marker([m["lat"], m["lon"]]).addTo(map);
    marker.bindPopup(m["label"]);
};

function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:" + responseObject.errorMessage);
    }
}

client.connect({
    onSuccess: onConnect
});
