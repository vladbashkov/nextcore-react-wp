import DottedMap from 'dotted-map/without-countries';
import { useState, useEffect } from 'react';
import useAppService from '../../services/AppService';

import mapJsonString from './Coordinates';
import './Map.scss';

const Map = () => {
    const [pins, setPins] = useState([]),
          [style, setStyle] = useState({});

    const map = new DottedMap({ map: JSON.parse(mapJsonString) });

    const { getResource, loading, error, clearError } = useAppService();

    useEffect(() => {
        onRequest();
    }, []);

    const onRequest = () => {
        clearError();

        getResource('map')
            // .then(console.log)
            .then(onLoaded)
    }

    const onLoaded = (data) => {
        // console.log(data);
        const { pins, style } = data;

        setPins(pins);
        setStyle(style);
    }

    const onAddPins = () => {

        pins.forEach(pin => {
            map.addPin({
                lat: +pin.lat,
                lng: +pin.lng,
                svgOptions: { color: `#${pin.color}`, radius: +pin.radius },
            })
        })

        const svgMap = map.getSVG({
            radius: style.radius,
            color: `#${style.color}`,
            shape: `${style.shape}`,
            backgroundColor: `${style.background}`,
        });

        return (
            <>
                <img src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`} alt="World Map" />
            </>
        )

    }

    const onMap = !(loading || error || !pins) ? onAddPins() : null;
    
    return (
        <>
          { onMap }
        </>
    );
}

export default Map;