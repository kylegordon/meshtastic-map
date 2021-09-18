const map = L.map("map", {
    center: [55.9, -4.3],
    zoom: 7
});

L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 20,
	ext: 'png'
}).addTo(map);

// L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//     maxZoom: 19,
//     attribution:
//         '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>',
// }).addTo(map);

const client = new Paho.MQTT.Client("localhost", 9001, "clientId");
client.onMessageArrived = onMessage;
client.onConnectionLost = onConnectionLost;

function onConnect() {
    client.subscribe('msh/1/json/LongSlow/+/POSITION_APP');
};

function onMessage(message) {
    console.log("Message received");

    // try {
        const ParsedMessage = JSON.parse(message.payloadString);
        console.log(ParsedMessage);
    // } catch (e) {
    //     return undefined;
    //     console.log("Failed to parse message");
    // }

    console.log("Parsing results");
    channelId = ParsedMessage["channelId"];
    gatewayId = ParsedMessage["gatewayId"];
    packet = ParsedMessage["packet"];

    // How to derive lat/lon documented at https://github.com/meshtastic/Meshtastic-protobufs/blob/master/mesh.proto#L40
    latitude = packet['decoded']['latitudeI']  / 10000000;
    longitude = packet['decoded']['longitudeI']  / 10000000;
    altitude = packet['decoded']['altitude'];
    console.log("Device at " + latitude + ", " + longitude + ". Altitude: " + altitude);

    if ( latitude !== 0 && longitude !== 0 ) {
        const marker = L.marker([latitude, longitude]).addTo(map);
        // marker.bindPopup(ParsedMessage["label"]);
    } else {
        console.log("Shipment for Null Island");
    }


};

function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:" + responseObject.errorMessage);
    }
}

client.connect({
    onSuccess: onConnect
});
