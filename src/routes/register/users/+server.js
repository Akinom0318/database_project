import * as database from '$lib/server/server.js';
import { json } from '@sveltejs/kit';

export async function GET() {
	const allUsers = await database.get_users_db();

	return json(allUsers);
}



/** @type {import('./$types').RequestHandler} */
export async function POST(evt) {
    const data = await evt.request.json();
    await database.create_new_user_db(

        data.account_input,
        data.password_input,
        data.address_input,
        data.email_input,
        data.ISO_birthdate,
        data.phone_number_input);

    return json({ok:true});
}