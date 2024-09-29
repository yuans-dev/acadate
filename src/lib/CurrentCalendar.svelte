<script>
	import Calendar from './Calendar.svelte';
	import CalendarHelper from './CalendarHelper';
	import Day from './Day.svelte';
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
</script>

<div class="calendar">
	<div class="month-name">
		<button
			on:click={() => {
				month--;
			}}
			class="nav-button"><i class="fa-solid fa-chevron-left"></i></button
		>
		<span>
			{getMonthName(month)}, {year}
		</span>
		<button
			on:click={() => {
				month++;
			}}
			class="nav-button"
			><i class="fa-solid fa-chevron-right"></i>
		</button>
	</div>
	<div class="days">
		{#each { length: getDaysInMonth(month, year) } as _, i}
			<Day
				day={i + 1}
				schoolDays={CalendarHelper.getSchoolDays(
					new Date(year, month % 12, i + 1),
					calendars,
					holidays
				)}
				starts={CalendarHelper.getStarts(new Date(year, month % 12, i + 1), calendars)}
				holidays={CalendarHelper.getHolidaysForDay(new Date(year, month % 12, i + 1), holidays)}
			></Day>
		{/each}
	</div>
</div>

<style>
	.calendar {
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
	}

	.month-name {
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		font-size: 1.8rem;
		font-weight: bold;
		background-color: var(--color-accent-5);
		color: var(--color-light);
		padding: 2rem;
		width: 100%;
		text-align: center;
		transition: all 0.3s ease;
	}
	.month-name span {
		width: 60%;
	}
	.days {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
		grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
		padding: 4rem 6rem;
		grid-row-gap: max(3vh, 1rem);
		grid-column-gap: max(2vw, 1rem);
	}

	.nav-button {
		border: none;
		background-color: transparent;
		color: inherit;
		font-size: 2rem;
		cursor: pointer;
		padding: 1rem;
		transition: all 0.3s ease;
		border-radius: 1rem;
	}
	.nav-button:hover {
		background-color: var(--color-accent-2);
	}

	@media only screen and (max-width: 600px) {
		.days {
			grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
			grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
			padding: 2rem 3rem;
			grid-row-gap: max(2vh, 0.5rem);
			grid-column-gap: max(0.8vw, 0.1rem);
		}
		.month-name {
			font-size: 1.2rem;
		}
		.nav-button:hover {
			background-color: transparent;
		}
		.nav-button:active {
			background-color: var(--color-accent-2);
		}
	}
</style>
