import * as database from '$lib/server/server.js';
import { json } from '@sveltejs/kit';

export async function GET() {
	const allProducts = await database.get_products_db();

	return json(allProducts);
}
//this is to update a new user
/** @type {import('./$types').RequestHandler} */
// export async function POST(evt) {
//     const data = await evt.request.json();
//     await database.update_a_user_db(

//         data.local_current_account,
//         data.password_input,
//         data.address_input,
//         data.email_input,
//         data.ISO_birthdate);

//     return json({ok:true});
// }