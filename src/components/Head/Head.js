import useAppService from "../../services/AppService";
import { Helmet } from "react-helmet";
import { useState, useEffect } from 'react';

const Head = () => {
    const [title, setTitle] = useState(''),
          [favicon, setFavicon] = useState(''),
          [description, setDescription] = useState('');

    const { getResource } = useAppService();

    useEffect(() => {
        onRequest();
    }, []);

    const onRequest = () => {
        getResource('head')
            .then(onLoaded)
    };

    const onLoaded = (value) => {
        const { page_title, favicon, description } = value;

        setTitle(page_title);
        setFavicon(favicon);
        setDescription(description);
    }

    return (
        <Helmet>
            <title>{ title }</title>
            <link rel="icon" href={ favicon } sizes="32x32"></link>
            <meta name="description" content={ description }></meta>
        </Helmet>
    )
}

export default Head;