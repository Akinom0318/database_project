import * as database from '$lib/server/server.js';
import { json } from '@sveltejs/kit';

//this is to update or insert a new user
/** @type {import('./$types').RequestHandler} */
export async function POST(evt) {
    const data = await evt.request.json();
    // console.log("Data is below: ");
    // console.log(data);
    await database.insertUpdateProductDB(data);

    return json({ok:true});
}