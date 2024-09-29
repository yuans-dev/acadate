<script>
	import CalendarHelper from './CalendarHelper';
	import { activeCalendars } from './store';

	export let month = 0;
	export let calendars = [];
	export let holidays = [];
	let year = 2024;
	$: year = getYear(month);

	let activeTerms = [];
	let activeHolidays = [];
	let activeBreaks = [];
	let showSettings = false;
	function getYear() {
		const date = new Date();
		date.setMonth(month);

		return date.toLocaleDateString('default', { year: 'numeric' });
	}

	$: {
		activeTerms = [];
		activeHolidays = [];
		activeBreaks = [];
		calendars
			.filter((calendar) => calendar.shown)
			.forEach((calendar) => {
				activeTerms = [
					...activeTerms,
					CalendarHelper.getActiveTerm(new Date(year, month % 12, 1), calendar)
				];
			});
		calendars
			.filter((calendar) => calendar.shown)
			.forEach((calendar) => {
				activeBreaks = [
					...activeBreaks,
					CalendarHelper.getActiveBreaks(new Date(year, month % 12, 1), calendar)
				];
			});
		activeHolidays = CalendarHelper.getHolidays(month, holidays);
	}
	$: activeCalendars.set(calendars.filter((calendar) => calendar.shown));
</script>

<div class="info-bar">
	<div class="active-terms info-bar-section">
		<span class="title"><i class="fa-solid fa-school"></i>Active Terms</span>
		{#each activeTerms as term}
			<span class="section-item"
				><div
					class="calendar-indicator"
					style="background-color: {CalendarHelper.getCalendarColor({
						title: term.calendarTitle
					})};"
				></div>
				{term ? term.termName : ''}
			</span>
		{/each}
	</div>
	<div class="active-breaks info-bar-section">
		<span class="title"><i class="fa-solid fa-mug-saucer"></i>Breaks</span>
		{#each activeBreaks as calendarBreaks}
			{#each calendarBreaks.breaks as calendarBreak}
				<span class="section-item"
					><div
						class="calendar-indicator"
						style="background-color: {CalendarHelper.getCalendarColor({
							title: calendarBreaks.calendar
						})};"
					></div>
					{calendarBreak ? calendarBreak.name : ''}
				</span>
			{/each}
		{/each}
	</div>
	<div class="holidays info-bar-section">
		<span class="title"><i class="fa-solid fa-gift"></i>Holidays</span>
		{#each activeHolidays as holiday}
			<span class="section-item"
				><span class="holiday-date"
					>{holiday
						? new Date(holiday.date).toLocaleDateString('default', {
								month: 'short',
								day: 'numeric'
							})
						: ''}
				</span>{holiday ? holiday.name : ''}
			</span>
		{/each}
	</div>
	<div class="calendars {showSettings ? 'shown' : ''} info-bar-section">
		<span class="title"><i class="fa-solid fa-calendar"></i>Calendars</span>
		{#each calendars as calendar}
			<span class="section-item">
				<input
					type="checkbox"
					bind:checked={calendar.shown}
					style="accent-color: {CalendarHelper.getCalendarColor(calendar)}"
				/>
				{calendar.title}
			</span>
		{/each}
	</div>
	<button class="settings" on:click={() => (showSettings = !showSettings)}
		><i class="fa-solid fa-gear"></i></button
	>
</div>

<style>
	.info-bar {
		position: relative;
		display: flex;
		align-items: flex-start;
		justify-content: flex-start;
		border: 1px var(--color-accent-7) solid;
		border-radius: 1rem;
		width: 100%;
		height: 100%;
		padding: 2rem;
		box-sizing: border-box;
		flex-direction: column;
		gap: 1rem;
		transition: all 0.3s ease;
	}
	.info-bar-section {
		display: flex;
		align-items: flex-start;
		justify-content: center;
		flex-direction: column;
		color: var(--color-light);
		gap: 1rem;
	}
	.info-bar-section .title {
		font-weight: bold;
		font-size: 1.4rem;
	}
	.section-item {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		user-select: text;
	}
	.calendar-indicator {
		width: 10px;
		height: 10px;
		border-radius: 50%;
	}
	.holiday-date {
		font-weight: bold;
	}
	.title {
		display: flex;
		align-items: baseline;
		justify-content: center;
		gap: 0.5rem;
	}
	.settings {
		position: absolute;
		bottom: 1rem;
		right: 1rem;
		transition: all cubic-bezier(0.86, 0, 0.07, 1) 0.3s;
		border: none;
		color: var(--color-light);
		background-color: transparent;
		font-size: 2rem;
		width: 3rem;
		height: 3rem;
		cursor: pointer;
	}
	.settings i {
		transition: inherit;
	}
	.settings:hover i,
	.settings:active i {
		transform-origin: 49.8% 50%;
		transform: rotate(270deg);
		color: var(--color-accent-3);
	}
	.calendars {
		max-height: 0px;
		overflow: hidden;
		transition: all 0.3s ease;
		opacity: 0;
		position: absolute;
		bottom: 1rem;
		right: 5rem;
		background-color: var(--color-base-7-alpha20);
		width: 24rem;
		box-sizing: border-box;
		padding: 1rem;
		border-radius: 0.4rem;
		backdrop-filter: blur(10px);
		border: 1px var(--color-accent-7) solid;
	}
	.shown {
		max-height: 100vh;
		opacity: 1;
		color: white;
	}
	@media only screen and (max-width: 600px) {
		.calendars {
			width: 70%;
		}
	}
</style>
