import L from "leaflet";
import PropTypes from "prop-types";
import { useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

export default function MapView({ myPosition, visiblePlaces, handleNavigate, site }) {

    const mapRef = useRef();

    //permet de definir un icon en fonction de chaques localisations (toilettes, scene etc..)
    const bootstrapIcon = (location) => {
        let color = 'noir'
        if (location.artiste) {
            color = 'rouge'
        }
        if (location.category === "me") {
            color = 'blue';
        }
        return `
    <div class="text-center">
        <i class=" ${location.iconClass} ${color}" style="font-size: 24px;"></i>
    </div>
`
    };

    return (
        <MapContainer
            className="styleMap "
            center={[site.latitude, site.longitude]}
            zoom={17}
            scrollWheelZoom={false}
            ref={mapRef}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {visiblePlaces?.length > 0 && visiblePlaces.map((location) => (

                <Marker
                    key={location.id}
                    position={[location.latitude, location.longitude]}
                    icon={L.divIcon({
                        className: "custom-icon",
                        html: bootstrapIcon(location),
                        iconSize: [30, 30],
                        iconAnchor: [15, 30],
                        popupAnchor: [0, -30],
                    })}
                >
                    <Popup className="leaflet-popup-content">
                        <p className="fw-bold">{location.name}</p>
                        {location.description && (
                            <p className="fw-light">
                                Description: {location.description}
                            </p>
                        )}
                        {location.opening && (
                            <>
                                <p>Ouverture: {new Date(location.opening).toISOString().substring(11, 16)}h</p>
                                <p>Fermeture: {new Date(location.closing).toISOString().substring(11, 16)}h</p>

                            </>
                        )}
                        {location.artiste && (
                            <>
                                <p
                                    className="clickable text-decoration-underline text-primary"
                                    onClick={() => {
                                        handleNavigate(
                                            location.artiste,
                                            {
                                                state: location.artiste,
                                            }
                                        );
                                    }}
                                >
                                    Artiste actuel : {location.artiste.name},{" "}
                                </p>
                            </>
                        )}
                    </Popup>
                </Marker>
            ))}
            {myPosition && <Marker
                key={myPosition.id}
                position={[myPosition.latitude, myPosition.longitude]}
                icon={L.divIcon({
                    className: "custom-icon",
                    html: bootstrapIcon(myPosition),
                    iconSize: [30, 30],
                    iconAnchor: [15, 30],
                    popupAnchor: [0, -30],
                })}
            >
                <Popup className="leaflet-popup-content">
                    <p className="fw-bold">{myPosition.name}</p>
                </Popup>
            </Marker>}
        </MapContainer>
    )
}

MapView.propTypes = {
    myPosition: PropTypes.object,
    visiblePlaces: PropTypes.arrayOf(PropTypes.object),
    handleNavigate: PropTypes.func.isRequired,
    site: PropTypes.object.isRequired
};