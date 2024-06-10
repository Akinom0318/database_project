//@ts-nocheck
import * as database from '$lib/server/server.js';
import { json } from '@sveltejs/kit';

export async function GET() {
	const certain_product = await database.get_products_db();

	return json(certain_product);
}


/** @type {import('./$types').RequestHandler} */
export async function POST(evt) {
    const data = await evt.request.json();
    await database.add_to_cart_db(

        data.local_current_account_ID,
        data.product_ID,
        data.slide_value,
        data.total_price,);

    return json({ok:true});
}