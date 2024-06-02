import * as database from '$lib/server/server.js';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	const all_cart_items = await database.get_all_cart_items_db();
    const allProducts = await database.get_products_db();
    
    for(const item of all_cart_items){
        for(const product of allProducts){
            if(item.product_ID === product.product_ID){
                //@ts-ignore
                item.product_name = product.product_name;
                //@ts-ignore
                item.stock = product.stock;
            }
        }
    }

	return json(all_cart_items);
}


/** @type {import('./$types').RequestHandler} */
export async function POST(evt) {
    const data = await evt.request.json();

    if(data.slide_value === 0){
        await database.delete_a_cart_item_db(
            data.local_current_account_ID,
            data.product_ID,
        );
    }else{
        await database.update_user_cart_db(

            data.local_current_account_ID,
            data.product_ID,
            data.slide_value,
            data.total_price);
    }



    return json({ok:true});
}