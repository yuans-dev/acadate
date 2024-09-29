<script>
	import CalendarHelper from './CalendarHelper';

	export let month = 0;
	export let calendars = [];
	export let holidays = [];
	let year = 2024;
	$: year = getYear(month);

	let activeTerms = [];
	let activeHolidays = [];
	let activeBreaks = [];

	function getYear() {
		const date = new Date();
		date.setMonth(month);

		return date.toLocaleDateString('default', { year: 'numeric' });
	}

	$: {
		activeTerms = [];
		activeHolidays = [];
		activeBreaks = [];
		calendars.forEach((calendar) => {
			activeTerms = [
				...activeTerms,
				CalendarHelper.getActiveTerm(new Date(year, month % 12, 1), calendar)
			];
		});
		calendars.forEach((calendar) => {
			activeBreaks = [
				...activeBreaks,
				CalendarHelper.getActiveBreaks(new Date(year, month % 12, 1), calendar)
			];
		});
		activeHolidays = CalendarHelper.getHolidays(month, holidays);
	}
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
</div>

<style>
	.info-bar {
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
</style>
