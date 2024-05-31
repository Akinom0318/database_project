import * as database from '$lib/server/server.js';
import { json } from '@sveltejs/kit';

export async function GET() {
	const allProducts = await database.get_users_db();

	return json(allProducts);
}
//this is to update a new user
/** @type {import('./$types').RequestHandler} */