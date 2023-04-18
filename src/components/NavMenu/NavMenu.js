import useAppService from '../../services/AppService';
import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';

import './NavMenu.scss';

import Burger from '../../resources/img/burger-btn.svg';
import MenuClose from '../../resources//img/burger-close.svg';

const NavMenu = () => {
    const [nav_list, setList] = useState([]),
          [logo, setLogo] = useState({}),
          [contact, setContact] = useState({}),
          [menu, setMenu] = useState(false),
          windowWidth = window.innerWidth;

    const { getResource, loading, error, clearError } = useAppService();

    useEffect(() => {
        onRequest();
    }, []);

    const onMenuLoaded = (data) => {
        // console.log(data);
        const { logo, nav_list, navmenu_contact } = data;

        setList(nav_list);
        setLogo(logo);
        setContact(navmenu_contact);
    };

    const onRequest = () => {
        clearError();
        
        getResource('nav_menu')
            .then(onMenuLoaded)
    }

    const onToggleMenu = () => {
        setMenu(!menu);

        if(!menu) {
            document.body.setAttribute("style", "overflow: hidden")
        } else {
            document.body.setAttribute("style", "overflow: visible")
        }
    }

    const renderList = (list_arr) => {
        const navShow = menu ? 'nav-show' : '';
        const tabletWidth = 768;

        

        const list = list_arr.map((item, i) => {

            if(windowWidth > tabletWidth) {
                return (
                    <li 
                        className="nav-li"
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
            } else {
                return (
                    <li 
                        className="nav-li"
                        key={i}
                    >
                        <Link 
                            to={ item.nav_item.replace(/ /g, '') }
                            smooth={ true }
                            offset={ -10 }
                            duration={ 500 }
                            onClick={ onToggleMenu }
                        >
                            { item.nav_item }
                        </Link>
                    </li>
                )
            }

            
        });

        return (
            <div className='container'>
                <div 
                    className="nav-menu_container"
                    id="navMenu"
                >
                    <Link
                        to="heroSection"
                        smooth={ true }
                        offset={ 0 }
                        duration={ 500 }
                    >
                        <img
                            src={ logo } 
                            alt="Company Logo" 
                            className="nav-logo"
                        />
                    </Link>
                    <nav className='nav-menu'>
                        <ul
                            className='nav-list'
                        >
                            { list }
                        </ul>
                        <Link 
                            className="contact-button_container"
                            to="Locationofoffices"
                            smooth={ true }
                            offset={ 0 }
                            duration={ 500 }
                        >
                            <div
                                
                                className="contact-button"
                            >
                                { contact.button_text }
                            </div>
                        </Link>
                        <div 
                            className="burger-container"
                            onClick={onToggleMenu}
                        >
                            <img 
                                src={ Burger }
                                alt="Menu button icon" 
                                className='burger-btn'
                            />
                            <div
                                className={`nav-list_burger ${navShow}`}
                            >
                                
                                <div className="menu-header">
                                    <img
                                        src={ logo } 
                                        alt="Company Logo" 
                                        className="nav-logo"
                                    />
                                    <img 
                                        src={ MenuClose } 
                                        alt="Close Icon" 
                                        className="menu-close"
                                    />
                                </div>
                                <ul className='nav-list_menu'>
                                    { list }
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        )
    }

    const content = !(loading || error || !nav_list) ? renderList(nav_list) : null;

    return (
        <>
            { content }
        </>
    )
}

export default NavMenu;