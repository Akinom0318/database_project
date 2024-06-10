import { writable } from 'svelte/store';

export const current_account = writable("");
export const current_account_ID = writable(0);
export const current_product_page = writable(1);
export const current_keyword = writable("");