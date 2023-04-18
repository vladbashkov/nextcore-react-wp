import useAppService from '../../services/AppService';
import { useState, useEffect } from 'react';
import CarouselSlider from '../Carousel/Carousel';
import { Link } from 'react-scroll';

import './HeroSection.scss';

const HeroSection = () => {
    const [title, setTitle] = useState(''),
          [subtitle, setSubtitle] = useState(''),
          [contact, setContact] = useState({});

    const { getResource, loading, error, clearError } = useAppService();

    useEffect(() => {
        onRequest();
    }, []);

    const onRequest = () => {
        clearError();

        getResource('main_top_section')
            // .then(console.log)
            .then(onLoaded)
    }

    const onLoaded = (data) => {
        // console.log(data);
        const { main_title, main_subtitle, get_in_touch_button } = data;

        setTitle(main_title);
        setSubtitle(main_subtitle);
        setContact(get_in_touch_button);
    }

    const render = () => {

        return (
            <section 
                className="hero-section"
                id='heroSection'
            >
                <h1 className="hero-title">
                    { title }
                </h1>
                <p className="hero-subtitle">
                    { subtitle }
                </p>
                <Link 
                    className="hero-contact_btn"
                    to="Locationofoffices"
                    smooth={ true }
                    offset={ 0 }
                    duration={ 500 }
                >
                    { contact.button_text }
                </Link>
                <CarouselSlider />

            </section>
        )
    }

    const content = !(loading || error || !title) ? render() : null;

    return (
        <>
            { content }
        </>
    )
}

export default HeroSection;