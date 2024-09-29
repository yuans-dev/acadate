import { persisted } from 'svelte-persisted-store';

export const activeCalendars = persisted('active-calendars', []);
