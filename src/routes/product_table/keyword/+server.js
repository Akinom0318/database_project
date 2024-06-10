//@ts-nocheck
import * as database from '$lib/server/server.js';
import { json } from '@sveltejs/kit';

export async function GET() {
	const all_keyword = await database.get_all_users_keyword();

	return json(all_keyword);
}

export async function POST(evt) {
    const data = await evt.request.json();
    if((await database.get_certain_user_keyword(data.local_current_account_ID, data.local_keyword)) === null ){
        await database.create_new_keyword(
            data.local_current_account_ID,
            data.local_keyword);
    }

    return json({ok:true});
}