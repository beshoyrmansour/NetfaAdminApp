import React from 'react';
import { Map, Draggable, Point, Marker, ZoomControl } from "pigeon-maps";
import { stamenToner } from 'pigeon-maps/providers'
import logo from '../logo.svg';

interface Props {
    updateLatitude: any;
    updateLongitude: any;
    latitude: number;
    longitude: number;
}


const MapLocator = (props: Props) => {
    // const center = {
    //     lat: 51.505,
    //     lng: -0.09,
    // }
    // function DraggableMarker() {
    //     const [draggable, setDraggable] = React.useState(false)
    //     const [position, setPosition] = React.useState(center)
    //     const markerRef = React.useRef<any>(null)
    //     const eventHandlers = React.useMemo(
    //         () => ({
    //             dragend() {
    //                 const marker = markerRef.current
    //                 if (marker != null) {
    //                     setPosition(marker.getLatLng())
    //                 }
    //             },
    //         }),
    //         [],
    //     )
    //     const toggleDraggable = React.useCallback(() => {
    //         setDraggable((d) => !d)
    //     }, [])

    //     React.useEffect(() => {
    //         props.updateLatitude(position.lat);
    //         props.updateLongitude(position.lng);
    //         return () => {

    //         }
    //     }, [position])
    //     return (
    //         <Marker
    //             draggable={draggable}
    //             eventHandlers={eventHandlers}
    //             position={position}
    //             ref={markerRef}>
    //             <Popup minWidth={90}>
    //                 <span onClick={toggleDraggable}>
    //                     {draggable
    //                         ? 'Marker is draggable'
    //                         : 'Click here to make marker draggable'}
    //                 </span>
    //             </Popup>
    //         </Marker>
    //     )
    // }
    const { latitude, longitude, updateLatitude, updateLongitude } = props;
    // const [anchor, setAnchor] = React.useState<Point>([21.6274891, 39.1396403]);
    const updateLocation = (v: Point) => {
        console.log({ v });

        updateLatitude(v[0])
        updateLongitude(v[1])
    }
    return (
        <Map
            provider={stamenToner as any}
            dprs={[1, 2]}
            width={700}
            animate={true}
            twoFingerDrag={true}
            defaultCenter={[21.6274891, 39.1396403]}
            center={[latitude, longitude]}

            defaultZoom={9}
        >
            <Draggable offset={[60, 87]} anchor={[latitude, longitude]} onDragEnd={updateLocation}>
                <img src={logo} width={100} alt="logo" />


                {/* <Marker
                    width={50}
                    anchor={[latitude, longitude]}
                    color={"rgb(0,0,0)"}
                /> */}
            </Draggable>
            <ZoomControl />
        </Map>

    )
}
export default MapLocator;
