import { writable } from 'svelte/store';

export const pageStore = writable(0);
export const curUser = writable('');
export const isLoading = writable(true);