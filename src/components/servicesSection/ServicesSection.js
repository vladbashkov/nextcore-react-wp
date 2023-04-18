import useAppService from '../../services/AppService';
import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';

import './ServicesSection.scss';

const ServicesSection = () => {
    const [col, setCol] = useState([]),
          [contact, setContact] = useState({});

    const { getResource, loading, error, clearError } = useAppService();

    useEffect(() => {
        onRequest();
    }, []);

    const onRequest = () => {
        clearError();

        getResource('services_section')
            // .then(console.log)
            .then(onLoaded)
    }

    const onLoaded = (data) => {
        // console.log(data);
        const { columns, get_in_touch_button } = data;

        setCol(columns);
        setContact(get_in_touch_button);
    }

    const render = () => {
        let columns = col.map((item, i) => {
            // console.log(item);
            return (
                <div 
                    className="service-col"
                    key={ i }
                >
                    <div className='icon-container'>
                        <img 
                            src={ item.icon } 
                            alt="Service Icon" 
                            className="service-col_icon" 
                        />
                    </div>
                    <h5 className="service-col_title">
                        { item.title.toUpperCase() }
                    </h5>
                    <p className="service-col_text">
                        { item.text }
                    </p>
                </div>
            )
        });

        return (
            <section 
                className='service-section'
                id='Services'
            >
                <div className='container'>
                    <h3 className='service-title'>
                        SERVICES
                    </h3>
                    <div className='service-columns'>
                        <div className='columns-container'>
                            { columns }
                        </div>
                        <Link 
                            className='hero-contact_btn'
                            to="Locationofoffices"
                            smooth={ true }
                            offset={ 0 }
                            duration={ 500 }
                        >
                            { contact.button_text }
                        </Link>
                    </div>
                   
                </div>
            </section>
        )
    }

    const content = !(loading || error || !col) ? render() : null;

    return (
        <>
            { content }
        </>
    )
}

export default ServicesSection;