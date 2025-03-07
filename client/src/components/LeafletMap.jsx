import React from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    Polyline,
    useMap,
    CircleMarker
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const MAPTILER_API_KEY = "Tw1eLIXf7BaTijTbOb4a";

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Center the map when the position changes
const CenterMap = ({ position }) => {
    const map = useMap();
    React.useEffect(() => {
        map.setView(position, 13);
    }, [map, position]);
    return null;
};

const LeafletMap = ({ center, locations, routePath, steps }) => {
    const [selectedNgo, setSelectedNgo] = React.useState(null);

    // Handle NGO marker click
    const handleNgoClick = (ngo) => {
        setSelectedNgo(ngo);
    };

    return (
        <MapContainer
            center={center}
            zoom={13}
            style={{ height: "600px", width: "100%" }}
        >
            <TileLayer
                url={`https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=${MAPTILER_API_KEY}`}
            />
            <CenterMap position={center} />

            {/* NGO Location Markers */}
            {locations?.map((market, index) => {
                const [longitude, latitude] = market.location.coordinates; // Destructure coordinates
                if (!latitude || !longitude) {
                    console.warn(`Invalid coordinates for Market at index ${index}:`, market);
                    return null;
                }

                return (
                    <Marker
                        key={index}
                        position={[latitude, longitude]} // Use [latitude, longitude]
                        eventHandlers={{
                            click: () => handleNgoClick(market),
                        }}
                    >
                        <Popup>
                            <div>
                                <strong>{market.name}</strong>
                                <img
                                    src={market.image}
                                    alt={market.name}
                                    className="w-32 h-20 rounded-md"
                                />
                                {selectedNgo?._id === market._id ? (
                                    <p className="text-green-600">Route displayed</p>
                                ) : (
                                    <button
                                        className="mt-2 px-2 py-1 bg-blue-500 text-white rounded"
                                        onClick={() => handleNgoClick(market)}
                                    >
                                        Show Route
                                    </button>
                                )}
                            </div>
                        </Popup>
                    </Marker>
                );
            })}


            {/* Route Path - Only show if routePath exists and is valid */}
            {routePath && routePath.length > 0 && (
                <Polyline
                    positions={routePath}
                    color="blue"
                    weight={3}
                    opacity={0.7}
                />
            )}

            {/* Route Steps - Only show if steps exist and are valid */}
            {steps && steps.length > 0 && steps[0]?.position && (
                <>
                    {/* Start Marker */}
                    <Marker position={steps[0].position}>
                        <Popup>
                            <strong>Start of Route</strong>
                            <p>{steps[0].instruction}</p>
                        </Popup>
                    </Marker>

                    {/* Intermediate Steps */}
                    {steps.map((step, index) => (
                        step.position && (
                            <CircleMarker
                                key={step - `${index}`}
                                center={step.position}
                                radius={4}
                                color="black"
                                weight={1.5}
                                fillColor="white"
                                fillOpacity={1}
                            >
                                <Popup>
                                    <div>
                                        <strong>Step {step.stepNumber}</strong>
                                        <p>{step.instruction}</p>
                                    </div>
                                </Popup>
                            </CircleMarker>
                        )
                    ))}

                    {/* End Marker */}
                    {steps[steps.length - 1]?.position && (
                        <Marker position={steps[steps.length - 1].position}>
                            <Popup>
                                <strong>End of Route</strong>
                                <p>{steps[steps.length - 1].instruction}</p>
                            </Popup>
                        </Marker>
                    )}
                </>
            )}
        </MapContainer>
    );
};

export default LeafletMap;