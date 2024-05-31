import { get_users_db } from '$lib/server/server';
import { format } from 'date-fns';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    const users = await get_users_db();
    return {
        users: users.map(u => ({ ...u,
            enrollment_date: u.enrollment_date? format(new Date(u.enrollment_date), 'yyyy-MM-dd') : null,
            birthdate: u.birthdate? format(new Date(u.birthdate), 'yyyy-MM-dd') : null,
            age: u.age }))
    };
}
