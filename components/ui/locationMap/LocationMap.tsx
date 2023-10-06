import React, { FC, memo, useCallback, useState } from 'react';
import {
    GoogleMap,
    useJsApiLoader,
    Marker,
    InfoWindow,
} from '@react-google-maps/api';
import dotenv from 'dotenv';
import currentEnv from 'config';

dotenv.config();
const apikey: string = currentEnv.NEXT_PUBLIC_GOOGLE_API_KEY!;

const containerStyle = {
    width: '100%',
    height: '100%',
};

interface Coords {
    lat: number;
    lng: number;
}

interface LocationMapProps {
    coords: Coords;
    address: string;
}

const LocationMap: FC<LocationMapProps> = ({
    coords = { lat: -34.6037555, lng: -58.3816287 },
    address,
}: LocationMapProps) => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: apikey,
    });

    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [showInfoWindow, setShowInfoWindow] = useState(true);

    const onLoad = useCallback(function callback(map: google.maps.Map) {
        const bounds = new window.google.maps.LatLngBounds();
        bounds.extend(new google.maps.LatLng(coords));

        setMap(map);
    }, []);

    const onUnmount = useCallback(function callback() {
        setMap(null);
    }, []);

    console.log('Map created', map);

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={coords}
            zoom={17}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{ mapTypeControl: false }}
        >
            <Marker position={coords} onClick={() => setShowInfoWindow(true)}>
                {showInfoWindow && (
                    <InfoWindow
                        position={coords}
                        onCloseClick={() => setShowInfoWindow(false)}
                    >
                        <div>{address}</div>
                    </InfoWindow>
                )}
            </Marker>
        </GoogleMap>
    ) : (
        <></>
    );
};

export default memo(LocationMap);
