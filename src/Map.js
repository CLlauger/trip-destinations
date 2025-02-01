import { MapContainer, TileLayer, Marker, Popup, LayersControl, LayerGroup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { destinations } from './data/destinations';
import { countries } from './data/countries';
import { altres, espanya, summer2022, summer2023, winter2022, winter2023, summer2024, summer2025 } from './data/seasons';
import L from 'leaflet';

function getFlagEmoji(countryCode) {
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map(char =>  127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}

function Seleccio(props) {
    var destins = props.destins;
    return (
        <LayersControl.Overlay checked={destins.checked} name={destins.name}>
            <LayerGroup>
            {
            destinations.map((d, idx) =>
                destins.destinations.includes(d.name) ?
                <Marker key={idx} position={[d.lat, d.lon]}
                    icon={
                        new L.Icon({
                            iconUrl: `/trip-destinations/markers/${(d.flag !== undefined ? d.flag.toLowerCase() : d.country.toLowerCase())}.svg`,
                            iconRetinaUrl: `/trip-destinations/markers/${(d.flag !== undefined ? d.flag.toLowerCase() : d.country.toLowerCase())}.svg`,
                            iconAnchor: new L.Point(12, 38),
                            popupAnchor: new L.Point(0, -36),
                            iconSize: new L.Point(25, 41)
                        })
                    }>
                    <Popup>
                        <center>
                            <b>{`${getFlagEmoji(d.country)} ${d.name} (${(d.region !== undefined ? d.region+", " : "")}${countries[d.country].name})`}</b><br/>
                            Llengua: {
                                (d.language !== undefined && d.language.length > 0) ?
                                d.language.map((l, idx) => {
                                    return (<span key={idx}><a target="_blank" rel="noreferrer" href={`https://ca.wikipedia.org/wiki/${l}`}>{l}</a>, </span>)
                                })
                                : ""
                            }
                            {
                                countries[d.country].language.map((l, idx) => {
                                    var separador = idx+1 < countries[d.country].language.length ? ", " : ""
                                    return (<span key={idx}><a target="_blank" rel="noreferrer" href={`https://ca.wikipedia.org/wiki/${l}`}>{l}</a>{separador}</span>)
                                })
                            }<br/>
                            Moneda: {countries[d.country].currency}<br/>
                            Espai Schengen: {countries[d.country].schengen}<br/>
                            Unió Europea: {countries[d.country].eu}<br/>
                            Requisits: {countries[d.country].requirements}
                        </center>
                    </Popup>
                </Marker>
                : undefined
            )
            }
            </LayerGroup>
        </LayersControl.Overlay>
    );
}

function Map() {

    const destins = [
        {
            name: "Primavera-Estiu 2022",
            destinations: summer2022
        },
        {
            name: "Tardor-Hivern 2022-2023",
            destinations: winter2022
        },
        {
            name: "Primavera-Estiu 2023",
            destinations: summer2023
        },
        {
            name: "Tardor-Hivern 2023-2024",
            destinations: winter2023
        },
        {
            name: "Primavera-Estiu 2024",
            destinations: summer2024
        },
        {
            name: "Primavera-Estiu 2025",
            destinations: summer2025,
            checked: true
        },
        {
            name: "Altres destins ofertats",
            destinations: altres
        },
        {
            name: "Espanya",
            destinations: espanya
        }
    ]

    return (
        <MapContainer center={[50, 10]} zoom={4} style={{ height: "100vh" }}>
            <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
            <LayersControl position="bottomleft">
                {destins.map((d, idx) => {
                    return <Seleccio key={idx} destins={d}/>
                })}
            </LayersControl>
        </MapContainer>
    );
}

export default Map;