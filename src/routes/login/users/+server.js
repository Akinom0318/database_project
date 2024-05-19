import * as database from '$lib/server/server.js';
import { json } from '@sveltejs/kit';

export async function GET() {
	const allUsers = await database.get_all_users();

	return json(allUsers);
}