//@ts-nocheck
import * as database from '$lib/server/server.js';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST(evt){
    const data = await evt.request.json();

    await database.delete_a_user_db(data.local_current_account_ID);

    return json({ok:true});
}v