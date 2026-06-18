'use strict';

import { getSalesCoffee } from './requirements.js';

const processSalesCoffee = async () => {
    try {
        let result = await getSalesCoffee();

        if (result.success) {
            let container = document.querySelector('#example tbody');
            let salesXML = result.body;
            let sales = salesXML.getElementsByTagName('row');

            let allRowsHTML = ''; 

            for (let sale of sales) {
                let rowHTML = `
                    <tr>
                        <td class="border px-4 py-2">[DATE]</td>
                        <td class="border px-4 py-2">[COFFEE_NAME]</td>
                        <td class="border px-4 py-2">[MONEY]</td>
                        <td class="border px-4 py-2">[CASH_TYPE]</td>
                    </tr>
                `;

                let date = sale.getElementsByTagName('Date')[0]?.textContent || '';
                let coffeeName = sale.getElementsByTagName('coffee_name')[0]?.textContent || '';
                let money = sale.getElementsByTagName('money')[0]?.textContent || '';
                let cashType = sale.getElementsByTagName('cash_type')[0]?.textContent || '';

                rowHTML = rowHTML.replace('[DATE]', date);
                rowHTML = rowHTML.replace('[COFFEE_NAME]', coffeeName);
                rowHTML = rowHTML.replace('[MONEY]', `$${money}`);
                rowHTML = rowHTML.replace('[CASH_TYPE]', cashType);

                allRowsHTML += rowHTML;
            }

            container.innerHTML = allRowsHTML;

            $('#example').DataTable({
                destroy: true,
                deferRender: true,
                pageLength: 10
            });

        } else {
            console.error(`Error al cargar los datos: ${result.body}`);
        }
    } catch (error) {
        console.error(`Excepción capturada: ${error.message}`);
    }
};

window.addEventListener('DOMContentLoaded', processSalesCoffee);