<script>
	import CalendarHelper from './CalendarHelper';
	export let day = 0;
	export let holidays = [];
	export let schoolDays = [];
	export let starts = [];
	export let ends = [];
</script>

<div class="day">
	{#if starts.length !== 0 || ends.length !== 0}
		<div class="start-indicators">
			{#each starts as start}
				{#if start.type == 'break'}
					<i
						style="color: {CalendarHelper.getCalendarColor({ title: start.title })};"
						class="fa-solid fa-mug-saucer start-indicator"
					></i>
				{:else if start.type == 'term'}
					<i
						style="color: {CalendarHelper.getCalendarColor({ title: start.title })};"
						class="fa-solid fa-school start-indicator"
					></i>
				{/if}
			{/each}
		</div>
	{/if}

	<span>{day}</span>
	<div class="indicators">
		{#each schoolDays as schoolDay}
			<div
				style="background-color: {CalendarHelper.getCalendarColor({ title: schoolDay.title })};"
				class="indicator"
			></div>
		{/each}
	</div>
</div>

<style>
	.day {
		font-size: 1.8rem;
		color: var(--color-dark);
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		border-radius: 1rem;
		padding: 0.8rem 1rem;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.day:hover {
		background-color: var(--color-accent-5);
		color: var(--color-light);
	}

	.day:hover .start-indicators {
		background-color: var(--color-accent-5);
		top: -1rem;
		padding: 0.4rem;
	}
	.day:hover .start-indicator {
		color: var(--color-light) !important;
	}
	.indicators {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 4px;
		position: absolute;
		bottom: 0.2rem;
		transition: all 0.3s ease;
		box-sizing: border-box;
	}
	.indicator {
		width: 6px;
		height: 6px;
		border-radius: 50% 50%;
	}
	.start-indicators {
		position: absolute;
		font-size: 1rem;
		top: -0.4rem;
		transition: all 0.3s ease;
		box-sizing: border-box;
		border-radius: 0.6rem;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.4rem;
	}
	.start-indicator {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	@media only screen and (max-width: 600px) {
		.day {
			font-size: 1.4rem;
			padding: 0.4rem 0.6rem;
		}
	}
</style>
