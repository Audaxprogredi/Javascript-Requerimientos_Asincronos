'use strict';

const getSalesCoffee = async () => {
    try {
        const response = await fetch('https://raw.githubusercontent.com/DATA-DAWM/Datos/refs/heads/main/Coffee/Coffe_sales.xml');

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const text = await response.text();
        const parser = new DOMParser();
        const data = parser.parseFromString(text, "application/xml");

        return {
            success: true,
            body: data
        };

    } catch (error) {
        return {
            success: false,
            body: error.message
        };
    }
};

export { getSalesCoffee };