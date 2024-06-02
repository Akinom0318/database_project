import * as database from '$lib/server/server.js';
import { json } from '@sveltejs/kit';

export async function GET() {
	const allUsers = await database.get_users_db();

	return json(allUsers);
}

//this is to update a new user
/** @type {import('./$types').RequestHandler} */
export async function POST(evt) {
    const data = await evt.request.json();

    let user_ID_input = data.local_current_account_ID;
    let bank_account_input = data.bank_account_input;
    let bank_num_input = data.bank_number_input;
    let address_input = data.address_input;
    
    await database.create_new_order_db(user_ID_input);

    await database.create_new_paying_db(user_ID_input,bank_account_input,bank_num_input,address_input);


    return json({ok:true});
}

/** @type {import('./$types').RequestHandler} */
export async function DELETE(evt){
    const data = await evt.request.json();

    await database.modify_product_after_order_db(data.local_current_account_ID);

    return json({ok:true});
}