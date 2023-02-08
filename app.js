import * as cheerio from 'cheerio';
import fetch from 'node-fetch';
import fs from 'fs';

async function getFormulaOneDrivers(){

    try {
        const response = await fetch('https://www.formula1.com/en/drivers.html');
        const body = await response.text();
        const $ = cheerio.load(body);
/*
        const wrapper = $('.listing-items--wrapper');
        console.log(wrapper.length);
*/

        const items = [];
        $('.listing-items--wrapper > .row > .col-12').map((i , ele) => {
            const firstName = $(ele).find('.listing-item--name span:first').text();
            const lastName = $(ele).find('.listing-item--name span:last').text();
            const team = $(ele).find('.listing-item--team').text();
            const photo = $(ele).find('.listing-item--photo img').attr('data-src');

            items.push({
                firstName,
                lastName,
                team,
                photo
            });
            fs.writeFile('formula1.json', JSON.stringify(items),function(err){
                if(err) return console.log(err);
                console.log('Formula 1 Conductores en JSON')
            });
        });


    } catch (error) {
        console.log(error)
    }
}


getFormulaOneDrivers();