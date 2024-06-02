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
	() => import('./nodes/11')
];

export const server_loads = [];

export const dictionary = {
		"/": [~2],
		"/admin": [3],
<<<<<<< HEAD
		"/cart": [4],
		"/cart/order_page": [5],
		"/login": [6],
		"/register": [7],
		"/user_UI": [8],
		"/user_UI/admin/product": [~9],
		"/user_UI/admin/transaction": [10],
		"/user_UI/admin/userList": [11]
=======
		"/login": [4],
		"/register": [5],
		"/user_UI": [6],
		"/user_UI/admin/product": [~7],
		"/user_UI/admin/transaction": [8],
		"/user_UI/admin/userList": [~9]
>>>>>>> 7688a9a1f5e6a30bee6114b32a2f9c488102e971
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),

	reroute: (() => {})
};

export { default as root } from '../root.svelte';