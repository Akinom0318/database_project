//@ts-nocheck
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
    await database.update_a_user_db(

        data.local_current_account,
        data.password_input,
        data.address_input,
        data.email_input,
        data.ISO_birthdate);

    return json({ok:true});
}

/** @type {import('./$types').RequestHandler} */
export async function DELETE(evt){
    const data = await evt.request.json();

    await database.delete_a_user_db(data.local_current_account_ID);

    return json({ok:true});
}