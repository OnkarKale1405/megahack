// Map.jsx
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const MAPTILER_API_KEY = "Tw1eLIXf7BaTijTbOb4a";
const DEFAULT_ZOOM = 13;

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const CenterMap = ({ position }) => {
    const map = useMap();
    map.setView(position, DEFAULT_ZOOM);
    return null;
};

const ProfileMap = ({ ngoLatitude, ngoLongitude }) => {
    const [locations, setLocations] = useState([]);
    const [searchType, setSearchType] = useState("hospitals");
    const [mapCenter, setMapCenter] = useState([
        ngoLatitude || 19.076,
        ngoLongitude || 72.8777
    ]); // Use NGO coordinates or default to Navi Mumbai
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("ProfileMap Rendered");
        console.log(ngoLatitude, ngoLongitude);
        if (ngoLatitude && ngoLongitude) {
            setMapCenter([ngoLatitude, ngoLongitude]);
        }
    }, [ngoLatitude, ngoLongitude]);

    return (
        <div className="h-full w-full rounded-3xl overflow-hidden">
            <MapContainer
                center={mapCenter}
                zoom={DEFAULT_ZOOM}
                zoomControl={false}
                className="h-full w-full"
            >
                <TileLayer
                    url={`https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=${MAPTILER_API_KEY}`}
                />
                <CenterMap position={mapCenter} />

                {/* NGO Location Marker */}
                <Marker
                    position={mapCenter}
                    icon={new L.Icon({
                        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
                        iconSize: [25, 41],
                        iconAnchor: [12, 41],
                        popupAnchor: [1, -34],
                        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
                        shadowSize: [41, 41],
                    })}
                >
                    <Popup>
                        <strong>Market location</strong>
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default ProfileMap;