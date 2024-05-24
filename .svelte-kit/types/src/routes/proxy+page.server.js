// @ts-nocheck
import { get_products_db } from '$lib/server/server';

/** */
export async function load() {
    const products = await get_products_db();
    return {
        products: products.map(p => ({ ...p, price: p.price?.toNumber() }))
    };
}
