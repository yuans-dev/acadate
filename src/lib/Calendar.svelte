<script>
	import CalendarHelper from './CalendarHelper';
	import MiniDay from './MiniDay.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let month = 0;
	export let calendars = [];
	export let holidays = [];

	$: calendars = calendars.filter((calendar) => calendar.shown);
	let year = 2024;
	$: year = getYear(month);
	function getMonthName(index) {
		const date = new Date();

		date.setMonth(index % 12);

		return date.toLocaleString('default', { month: 'long' });
	}
	function getYear() {
		const date = new Date();
		date.setMonth(month);
		return date.toLocaleDateString('default', { year: 'numeric' });
	}
	function getDaysInMonth(month, year) {
		return new Date(year, month + 1, 0).getDate();
	}
	function requestFocus() {
		dispatch('requestFocus', { month });
		console.log('requesting focus');
	}
</script>

<button on:click={requestFocus} class="calendar">
	<div class="month-name">{getMonthName(month)}, {year}</div>
	<div class="days">
		{#each { length: getDaysInMonth(month, year) } as _, i}
			<MiniDay
				day={i + 1}
				schoolDays={CalendarHelper.getSchoolDays(
					new Date(year, month % 12, i + 1),
					calendars,
					holidays
				)}
			></MiniDay>{/each}
	</div>
</button>

<style>
	.calendar {
		font-family: inherit;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		background-color: var(--color-light);
		padding: 0 1rem;
		overflow: hidden;
		border: 1px var(--color-accent-5) solid;
		border-radius: 1rem;
		transition: all 0.3s ease;
		background-clip: padding-box;
		box-shadow: 0.2rem 0.2rem 1rem var(--color-dark);
		cursor: pointer;
	}
	.calendar:hover .month-name {
		background-color: var(--color-accent-2);
		color: var(--color-dark);
	}
	.calendar:hover {
		border: 1px var(--color-accent-2) solid;
		box-shadow: 0.2rem 0.2rem 0.1rem var(--color-dark);
	}
	.month-name {
		font-size: 1.2rem;
		font-weight: bold;
		background-color: var(--color-accent-5);
		padding: 1rem;
		color: var(--color-light);
		width: 100%;
		text-align: center;
		transition: all 0.3s ease;
	}
	.days {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
		grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
		padding: 0.5rem 2rem;
		grid-row-gap: max(1vh, 4px);
		grid-column-gap: max(0.5vw, 4px);
	}
	.days .day {
		font-size: 1.2rem;
		color: var(--color-dark);
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
	}
	.indicators {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 2.5px;
		position: absolute;
		bottom: 0;
	}
	.indicator {
		width: 4px;
		height: 4px;
		border-radius: 50% 50%;
	}
	@media only screen and (max-width: 600px) {
		.month-name {
			font-size: 0.9rem;
		}
	}
</style>
