import * as database from '$lib/server/server.js';
import { json } from '@sveltejs/kit';

export async function GET() {
	const allUsers = await database.get_all_users();

	return json(allUsers);
}



/** @type {import('./$types').RequestHandler} */
export async function POST(evt) {
    const data = await evt.request.json();
    await database.create_new_user(
        data.account_input,
        data.password_input,
        data.address_input,
        data.email_input,
        data.ISO_birthdate
    );
    return json({ok:true});
}