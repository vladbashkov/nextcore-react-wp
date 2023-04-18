import useAppService from '../../services/AppService';
import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';

import './Footer.scss';
import LogoWhite from '../../resources/img/nextcore-logo-white.svg';

const Footer = () => {
    const [nav_list, setList] = useState([]);

    const { getResource, loading, error, clearError } = useAppService();

    useEffect(() => {
        onRequest();
    }, []);

    const onMenuLoaded = (data) => {
        // console.log(data);
        const { nav_list } = data;

        setList(nav_list);
    };

    const onRequest = () => {
        clearError();
        
        getResource('nav_menu')
            .then(onMenuLoaded)
    }

    const renderList = () => {

        const list = nav_list.map((item, i) => {
            return (
                <li 
                    className="footer_nav-li"
                    key={i}
                >
                    <Link 
                        to={ item.nav_item.replace(/ /g, '') }
                        smooth={ true }
                        offset={ -10 }
                        duration={ 500 }
                    >
                        { item.nav_item }
                    </Link>
                </li>
            )
        })

        return (
            <div className="container">
                <div className='footer-top_container'>
                    <div className="nav-logo_container">
                        <Link
                            to="heroSection"
                            smooth={ true }
                            offset={ 0 }
                            duration={ 500 }
                        >
                            <img
                                src={ LogoWhite } 
                                alt="Company Logo" 
                                className="nav-logo"
                            />
                        </Link>
                    </div>
                    <nav className="footer-nav_menu">
                        <ul className="footer-nav_list">
                            { list }
                        </ul>
                    </nav>
                </div>
                <div className="footer-terms_container">
                    <p className="footer-terms">
                        © 2020 Landify UI Kit. All rights reserved
                    </p>
                </div>
            </div>
        )
    }

    const content = !(loading || error || !nav_list) ? renderList() : null;

    return (
        <>
            { content }
        </>
    )
}

export default Footer;