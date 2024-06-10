import * as database from '$lib/server/server.js';
import { json } from '@sveltejs/kit';

export async function GET() {
	const all_paying_info = await database.get_transaction_db();

	return json(all_paying_info);
}