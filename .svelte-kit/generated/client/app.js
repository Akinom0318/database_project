export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13'),
	() => import('./nodes/14'),
	() => import('./nodes/15'),
	() => import('./nodes/16'),
	() => import('./nodes/17')
];

export const server_loads = [];

export const dictionary = {
		"/": [2],
		"/cart_tmp_currency": [6],
		"/cart": [3],
		"/cart/order_page": [4],
		"/cart/order_page/feed_back": [5],
		"/currency_exchange": [7],
		"/currency_tmp_liking_lst": [8],
		"/liking_list": [9],
		"/login": [10],
		"/product_table": [~11],
		"/register": [12],
		"/transaction": [13],
		"/user_UI": [14],
		"/user_UI/admin/product": [~15],
		"/user_UI/admin/transaction": [16],
		"/user_UI/admin/userList": [~17]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),

	reroute: (() => {})
};

export { default as root } from '../root.svelte';