//@ts-nocheck
import * as database from '$lib/server/server.js';
import { json } from '@sveltejs/kit';


export async function GET() {
	const all_likings = await database.get_all_likings_db();

	return json(all_likings);
}

/** @type {import('./$types').RequestHandler} */
export async function POST(evt){
    const data = await evt.request.json();

    let product_ID = data.item.product_ID;
    let user_ID = data.local_current_account_ID;


    if(await database.get_certain_liking_db(user_ID,product_ID)){
        // console.log("delete liking");
        await database.delete_liking_item_db(user_ID,product_ID);
        await database.update_product_liking_db(product_ID, -1);
    }else{
        // console.log("create liking");
        await database.create_liking_item_db(user_ID,product_ID);
        await database.update_product_liking_db(product_ID, 1);
    }
    

    return json({ok:true});
}