import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const NavigateCustomer = () => {
    // Extract the parameter from the URL
    const { shortId } = useParams();
    useEffect(() => {
        fetchURL();
    }, [])

    async function fetchURL() {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/customer/getURL`, {
                shortId
            });

            if (response.data.url) {
                window.location.href = response.data.url;
            }
        } catch (error) {
            console.error('Error:', error);
        }  // End try-catch block
    }


    return (
        <div>
            <h1>Parameter: {shortId}</h1>
        </div>
    );
};

export default NavigateCustomer;
