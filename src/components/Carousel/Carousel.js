import Slider from "react-slick";
import { useState, useEffect } from 'react';
import useAppService from '../../services/AppService';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.scss";

const CarouselSlider = () => {
    const [images, setImages] = useState([]);
    const windowWidth = window.innerWidth;

    const { getResource, loading, error, clearError } = useAppService();

    const settings = {
        className: "carousel",
        centerMode: true,
        centerPadding: "0",
        infinite: true,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 3000,
        slidesToShow: 5,
        slidesToScroll: 1,
        pauseOnHover: false,
        beforeChange: () => onClasses(),
        afterChange: () => onSlides(),
        responsive: [
            {
                breakpoint: 641,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    centerMode: true,
                    speed: 1000,
                    autoplaySpeed: 3000,
                }
            }
        ]
    };

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
        const { top_carousel } = data;

        setImages(top_carousel);
        // console.log(top_carousel);
    }

    const onClasses = () => {

        if(windowWidth > 640) {

            try {
                let farleft = document.querySelector('.slick-farleft');
                let left = document.querySelector('.slick-left');
                let right = document.querySelector('.slick-right');
                let farright = document.querySelector('.slick-farright');
    
                farleft.classList.remove('slick-farleft');
                left.classList.remove('slick-left');
                right.classList.remove('slick-right');
                farright.classList.remove('slick-farright');
            } catch (e) {
                console.log(e);
            }

        } else if(windowWidth < 640) {

            try {
                let left = document.querySelector('.slick-left');
                let right = document.querySelector('.slick-right');
    
                left.classList.remove('slick-left');
                right.classList.remove('slick-right');
            } catch (e) {
                console.log(e);
            }

        }
    }

    const onSlides = () => {
        onClasses();
        
        const slickCurrent = document.querySelector('.slick-current');

        if(slickCurrent && windowWidth > 640) {
            const activeSlidesArr = document.querySelectorAll('.slick-active');

            activeSlidesArr.forEach((slide, index) => {
                // console.dir(slide);

                switch (index) {
                    case 0:
                        slide.classList.add('slick-farleft');
                        break;
                    case 1:
                        slide.classList.add('slick-left');
                        break;
                    case 3:
                        slide.classList.add('slick-right');
                        break;
                    case 4:
                        slide.classList.add('slick-farright');
                        break;
                    default:
                        break;
                }
            });
        } else if(slickCurrent && windowWidth < 640) {
            const slickSlidesArr = document.querySelectorAll('.slick-slide'),
                  slickCentred = document.querySelectorAll('.slick-center');

                //   console.log(slickCentred);

                slickCentred.forEach(slick => {
                let dataIndex = slick.attributes[0].value

                slickSlidesArr.forEach(slide => {

                    if(slide.attributes[0].value == +dataIndex - 1) {
                        // console.log('left');
                        slide.classList.add('slick-left');
                    };
    
                    if (slide.attributes[0].value == +dataIndex + 1) {
                        // console.log('right');
                        slide.classList.add('slick-right');
                    };
                });

            });
        }
    }

    const render = (imgArr) => {
        let slidesArr = imgArr.map((slide, i) => {
            return (
                <div 
                    className="carousel_slide"
                    key={i}
                >
                    <img 
                        src={ slide.carousel_image } 
                        alt="Slide" 
                        className="slide" 
                        key={i}
                    />
                </div>
            )
        });

        onSlides();

        return (
            <Slider {...settings}>
                { slidesArr }
            </Slider>
        )
    }

    const slider = !(loading || error || !images) ? render(images) : null;

    return slider;
}

export default CarouselSlider;