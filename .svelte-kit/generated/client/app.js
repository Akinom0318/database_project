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
	() => import('./nodes/14')
	() => import('./nodes/14')
];

export const server_loads = [];

export const dictionary = {
		"/": [2],
		"/cart": [3],
		"/cart/order_page": [4],
		"/cart/order_page/feed_back": [5],
		"/liking_list": [6],
		"/login": [7],
		"/product_table": [~8],
		"/register": [9],
		"/transaction": [10],
		"/user_UI": [11],
		"/user_UI/admin/product": [~12],
		"/user_UI/admin/transaction": [13],
		"/user_UI/admin/userList": [~14]
		"/cart": [3],
		"/cart/order_page": [4],
		"/cart/order_page/feed_back": [5],
		"/currency_exchange": [6],
		"/liking_list": [7],
		"/login": [8],
		"/product_table": [~9],
		"/register": [10],
		"/transaction": [11],
		"/user_UI": [12],
		"/user_UI/admin/product": [~13],
		"/user_UI/admin/transaction": [14],
		"/user_UI/admin/userList": [~15]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),

	reroute: (() => {})
};

export { default as root } from '../root.svelte';