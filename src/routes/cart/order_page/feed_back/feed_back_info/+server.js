//@ts-nocheck
import * as database from '$lib/server/server.js';
import { json } from '@sveltejs/kit';

export async function GET() {
	const all_cart_items = await database.get_all_cart_items_db();
    const allProducts = await database.get_products_db();
    
    for(const item of all_cart_items){
        for(const product of allProducts){
            if(item.product_ID === product.product_ID){
                item.product_name = product.product_name;
                item.stock = product.stock;
                item.score = 0;
            }
        }
    }

	return json(all_cart_items);
}

/** @type {import('./$types').RequestHandler} */
export async function POST(evt) {
    const data = await evt.request.json();
    let user_ID = data.have_cart_item[0].cart_ID;
    for(const item of data.have_cart_item){
        await database.update_product_review_db(item.product_ID,item.score);
    }

    await database.delete_user_cart_items_db(user_ID);


    return json({ok:true});
}
