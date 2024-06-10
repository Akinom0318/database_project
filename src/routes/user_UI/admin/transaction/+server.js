import * as database from '$lib/server/server.js';
import { json } from '@sveltejs/kit';

export async function GET() {
	const allTransactionInfo = await database.get_admin_transaction_db();

	return json(allTransactionInfo);
}