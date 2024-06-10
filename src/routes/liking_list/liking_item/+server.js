//@ts-nocheck
import * as database from '$lib/server/server.js';
import { json } from '@sveltejs/kit';

export async function GET() {
	const all_likings = await database.get_all_likings_db();
    
    for(const like of all_likings){
        let product = await database.get_certain_product_db(like.product_ID)
        like.name = product.product_name;
        like.price = product.selling_price;
        like.tags = product.tags;
        like.likes = product.likes;
    }

	return json(all_likings);
}