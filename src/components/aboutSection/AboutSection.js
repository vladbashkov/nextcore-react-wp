import useAppService from '../../services/AppService';
import { useState, useEffect } from 'react';

import './AboutSection.scss';

const AboutSection = () => {
    const [row, setRow] = useState([]);

    const { getResource, loading, error, clearError } = useAppService();

    useEffect(() => {
        onRequest();
    }, []);

    const onRequest = () => {
        clearError();

        getResource('about_section')
            .then(onLoaded)
    }

    const onLoaded = (data) => {
        // console.log(data);
        const { row } = data;
        setRow(row);
    }

    const render = () => {
        let content = row.map((item, i) => {

            if(i%2 == 0) {
                return (
                    <div 
                        className="about-row bg-left"
                        key={ i }
                    >
                        <div className="about-row_block">
                            <img 
                                className="about-row_picture"
                                src={ item.pictures_group.picture.url }
                                alt={ item.pictures_group.picture_description } 
                            />
                        </div>
                        <div className="about-row_block">
                            <h3 className="aboute-paragraph_title">
                                { item.paragraph_group.paragraph_title.toUpperCase() }
                            </h3>
                            <p className="about-paragraph_text">
                                { item.paragraph_group.paragraph_text }
                            </p>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div 
                        className="about-row bg-right"
                        key={ i }
                    >
                        <div className="about-row_block">
                            <h3 className="aboute-paragraph_title">
                                { item.paragraph_group.paragraph_title.toUpperCase() }
                            </h3>
                            <p className="about-paragraph_text">
                                { item.paragraph_group.paragraph_text }
                            </p>
                        </div>
                        <div className="about-row_block">
                            <img 
                                className="about-row_picture"
                                src={ item.pictures_group.picture.url }
                                alt={ item.pictures_group.picture_description } 
                            />
                        </div>
                    </div>
                )
            }
        })
        return (
            <section 
                className='about-section'
                id='About'
            >
                <div className="container">
                    { content }
                </div>
            </section>
        );
    }

    const content = !(loading || error || !row) ? render() : null;

    return (
        <>
            { content }
        </>
    )
}

export default AboutSection;