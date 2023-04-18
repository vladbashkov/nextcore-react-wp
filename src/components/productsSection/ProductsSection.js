import useAppService from '../../services/AppService';
import { useState, useEffect } from 'react';

import './ProductsSection.scss';
import line_1 from '../../resources/img/line_1.svg';
import line_2 from '../../resources/img/line_2.svg';
import line_3 from '../../resources/img/line_3.svg';
import line_4 from '../../resources/img/line_4.svg';
import line_5 from '../../resources/img/line_5.svg';
import barrel from '../../resources/img/big-barrel.svg';

const ProductsSection = () => {
    const [data, setData] = useState({});

    const { getResource, loading, error, clearError } = useAppService();

    useEffect(() => {
        onRequest();
    }, []);

    const onLoaded = (data) => {
        setData(data);
    };

    const onRequest = () => {
        clearError();
        
        getResource('products_section')
            .then(onLoaded)
    }

    const onList = (arr) => {
        const lisArr = arr.map((li, i) => {
            
            return (
                <li 
                    className="products-li"
                    key={i}
                >
                    { li.item }
                </li>
            )
        });

        if(arr.length < 4) {
            return (
                <ul className="products-list products-list_no-grid">
                    { lisArr }
                </ul>
            );
        };

        return (
            <ul className="products-list">
                { lisArr }
            </ul>
        )
    }

    const render = () => {
        if(data.section_list) {

            let { title, section_list } = data,
                listArr = [],
                linesArr = [line_1, line_2, line_3, line_4, line_5];

            section_list.forEach((item, i) => {

                listArr.push(
                    <div 
                        className="products-block"
                        key={ i }
                    >
                        <div className="products-block_top-container">
                            <h5 className="products-block_title">
                                { item.list_title.toUpperCase() }
                            </h5>
                            <img 
                                src={ linesArr[i] } 
                                alt="Line" 
                                className="products-line" 
                            />
                        </div>
                        { onList(item.items_list) }
                    </div>
                );

            });

            // console.log(listArr);

            return (
                <section 
                    className="product-section"
                    id="Products"
                >
                    <h3 className="product-title">
                        { title.toUpperCase() }
                    </h3>
                    <div className="container">
                        <div className="product-section-col">
                            { listArr[0] }
                            { listArr[1] }
                        </div>
                        <div className="product-section-col">
                            <img 
                                src={ barrel } 
                                alt="Barrel"
                                className="product-section_barrel"
                            />
                        </div>
                        <div className="product-section-col product-section-col_right">
                            { listArr[2] }
                            { listArr[3] }
                            { listArr[4] }
                        </div>
                    </div>
                </section>
            );
        }
    }

    const content = !(loading || error || !data) ? render() : null;

    return (
        <>
            { content }
        </>
    )
}

export default ProductsSection;