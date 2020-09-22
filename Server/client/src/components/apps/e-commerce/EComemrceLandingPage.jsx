import React from 'react';
import PropTypes from 'prop-types';

ECommerceLandingPage.propTypes = {

};

function ECommerceLandingPage(props) {

    // React.useEffect(()=>{
    //     fetch("https://amazon-product-reviews-keywords.p.rapidapi.com/product/search?country=US&keyword=mobile", {
    //         "method": "GET",
    //         "headers": {
    //             "x-rapidapi-host": "amazon-product-reviews-keywords.p.rapidapi.com",
    //             "x-rapidapi-key": "a2e362eba7mshf79992f1cbe7a73p1c653ejsn87bd2054f646"
    //         }
    //     }).then(res => res.json())
    //         .then(data=>console.log(data))
    //
    // },[])
    return (
        <div>
            <h1>
                Welcome to our Aj E-commerce site....!!!!
            </h1>
        </div>
    );
}

export default ECommerceLandingPage;