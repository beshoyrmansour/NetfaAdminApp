import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
interface Props {
    updateLatitude: any;
    updateLongitude: any;
}


const MapLocator = (props: Props) => {
    const center = {
        lat: 51.505,
        lng: -0.09,
    }
    function DraggableMarker() {
        const [draggable, setDraggable] = React.useState(false)
        const [position, setPosition] = React.useState(center)
        const markerRef = React.useRef<any>(null)
        const eventHandlers = React.useMemo(
            () => ({
                dragend() {
                    const marker = markerRef.current
                    if (marker != null) {
                        setPosition(marker.getLatLng())
                    }
                },
            }),
            [],
        )
        const toggleDraggable = React.useCallback(() => {
            setDraggable((d) => !d)
        }, [])

        React.useEffect(() => {
            props.updateLatitude(position.lat);
            props.updateLongitude(position.lng);
            return () => {

            }
        }, [position])
        return (
            <Marker
                draggable={draggable}
                eventHandlers={eventHandlers}
                position={position}
                ref={markerRef}>
                <Popup minWidth={90}>
                    <span onClick={toggleDraggable}>
                        {draggable
                            ? 'Marker is draggable'
                            : 'Click here to make marker draggable'}
                    </span>
                </Popup>
            </Marker>
        )
    }

    return (

        <MapContainer center={center} zoom={13} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <DraggableMarker />
        </MapContainer>

    )
}
export default MapLocator;
