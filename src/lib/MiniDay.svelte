<script>
	import CalendarHelper from './CalendarHelper';
	export let day = 0;
	export let schoolDays = [];
</script>

<div class="day">
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
		font-size: 1rem;
		color: var(--color-dark);
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		border-radius: 0.6rem;
		padding: 0.2rem 0.4rem;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.day:hover {
		background-color: var(--color-accent-5);
		color: var(--color-light);
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
		width: 3px;
		height: 3px;
		border-radius: 50% 50%;
	}
	@media only screen and (max-width: 600px) {
		.day span {
			display: none;
		}
	}
</style>
