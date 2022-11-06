import { MapContainer, TileLayer, Marker, Popup, LayersControl, LayerGroup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { destinations } from './data/destinations';
import { countries } from './data/countries';
import { summer2022, winter2022 } from './data/seasons';
import L from 'leaflet';

function getFlagEmoji(countryCode) {
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map(char =>  127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}

function Map() {
    return (
        <MapContainer center={[50, 10]} zoom={4} style={{ height: "100vh" }}>
            <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
            <LayersControl position="bottomleft">
                <LayersControl.Overlay name="Primavera-Estiu 2022">
                    <LayerGroup>
                    {
                    destinations.map((d, idx) =>
                        summer2022.includes(d.name) ?
                        <Marker key={idx} position={[d.lat, d.lon]}
                            icon={
                                new L.Icon({
                                    iconUrl: '/trip-destinations/markers/' + (d.flag !== undefined ? d.flag.toLowerCase() : d.country.toLowerCase()) + '.svg',
                                    iconRetinaUrl: '/trip-destinations/markers/' + (d.flag !== undefined ? d.flag.toLowerCase() : d.country.toLowerCase()) + '.svg',
                                    iconAnchor: new L.Point(12, 38),
                                    popupAnchor: new L.Point(0, -36),
                                    iconSize: new L.Point(25, 41)
                                })
                            }>
                            <Popup>
                                {getFlagEmoji(d.country)+" "+d.name+" ("+(d.region !== undefined ? d.region+", " : "")+countries[d.country]+")"}
                            </Popup>
                        </Marker>
                        : undefined
                    )
                    }
                    </LayerGroup>
                </LayersControl.Overlay>
                <LayersControl.Overlay checked name="Tardor-Hivern 2022-2023">
                    <LayerGroup>
                    {
                    destinations.map((d, idx) =>
                        winter2022.includes(d.name) ?
                        <Marker key={idx} position={[d.lat, d.lon]}
                            icon={
                                new L.Icon({
                                    iconUrl: '/trip-destinations/markers/' + (d.flag !== undefined ? d.flag.toLowerCase() : d.country.toLowerCase()) + '.svg',
                                    iconRetinaUrl: '/trip-destinations/markers/' + (d.flag !== undefined ? d.flag.toLowerCase() : d.country.toLowerCase()) + '.svg',
                                    iconAnchor: new L.Point(12, 38),
                                    popupAnchor: new L.Point(0, -36),
                                    iconSize: new L.Point(25, 41)
                                })
                            }>
                            <Popup>
                                {getFlagEmoji(d.country)+" "+d.name+" ("+(d.region !== undefined ? d.region+", " : "")+countries[d.country]+")"}
                            </Popup>
                        </Marker>
                        : undefined
                    )
                    }
                    </LayerGroup>
                </LayersControl.Overlay>
            </LayersControl>
        </MapContainer>
    );
}

export default Map;