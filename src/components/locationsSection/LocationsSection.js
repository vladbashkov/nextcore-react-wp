import useAppService from '../../services/AppService';
import { useState, useEffect } from 'react';
import Map from '../Map/Map';

import './LocationsSection.scss';

import MapPinIcon from '../../resources/img/map-pin.svg';
import MapPinIconWhite from '../../resources/img/map-pin-white.svg'
import PhoneIcon from '../../resources/img/phone.svg';
import PhoneIconWhite from '../../resources/img/phone-white.svg';
import EmailIcon from '../../resources/img/mail.svg';
import EmailIconWhite from '../../resources/img/mail-white.svg'

const LocationsSection = () => {
    const [state, setState] = useState({});

    const { getResource, loading, error, clearError } = useAppService();

    useEffect(() => {
        onRequest();
    }, []);

    const onRequest = () => {
        clearError();

        getResource('location_section')
            // .then(console.log)
            .then(onLoaded)
    }

    const onLoaded = (data) => {
        // console.log(data);

        setState(data);
    }

    const render = () => {
        const { address, email, phone, text, text_title, title } = state;

        return (
            <section 
                className="location-section"
                id='Locationofoffices'
            >
                <div className="container">
                    <h3 className="location-title"> 
                        { title ? title.toUpperCase() : null }
                    </h3>
                    <div className="addresses-container">
                        <div className="address-top">
                            <div className="address-col">
                                <h5 className="address-col_title">
                                    { text_title ? text_title.toUpperCase() : null }
                                </h5>
                                <p className="address-col_text">
                                    { text }
                                </p>
                            </div>
                            <div className="address-col">
                                <div className="address-block">
                                    <img 
                                        src={ MapPinIcon } 
                                        alt="Icon" 
                                        className="adress-icon" 
                                    />
                                    <img 
                                        src={ MapPinIconWhite } 
                                        alt="Icon" 
                                        className="adress-icon adress-icon_white" 
                                    />
                                    <p className="address-text">
                                        { address }
                                    </p>
                                </div>
                                <div className="address-block">
                                    <img 
                                        src={ PhoneIcon }
                                        alt="Icon" 
                                        className="adress-icon" 
                                    />
                                    <img 
                                        src={ PhoneIconWhite }
                                        alt="Icon" 
                                        className="adress-icon adress-icon_white" 
                                    />
                                    <a 
                                        className="address-text"
                                        href={`tel:${phone}`}
                                    >
                                        { phone }
                                    </a>
                                </div>
                                <div className="address-block">
                                    <img 
                                        src={ EmailIcon }
                                        alt="Icon" 
                                        className="adress-icon" 
                                    />
                                    <img 
                                        src={ EmailIconWhite }
                                        alt="Icon" 
                                        className="adress-icon adress-icon_white" 
                                    />
                                    <a 
                                        className="address-text"
                                        href={`mailto:${email}`}
                                    >
                                        { email }
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="address-map">
                            <Map />
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    const content = !(loading || error || !state) ? render() : null;

    return (
        <>
            { content }
        </>
    )
}

export default LocationsSection;