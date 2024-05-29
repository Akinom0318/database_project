import * as database from '$lib/server/server.js';
import { json } from '@sveltejs/kit';


/** @type {import('./$types').RequestHandler} */
export async function POST(evt) {
    const data = await evt.request.json();
    await database.add_to_card_db(

        data.local_current_account_ID,
        data.product_ID,
        data.slide_value,
        data.total_price,);

    return json({ok:true});
}