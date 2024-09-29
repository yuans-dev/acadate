<script>
	import Calendar from '../lib/Calendar.svelte';
	import CurrentCalendar from '../lib/CurrentCalendar.svelte';
	import '@fortawesome/fontawesome-free/css/all.min.css';
	import InfoBar from '../lib/InfoBar.svelte';

	export let data;
	let calendars = data.post.calendars.filter((calendar) => calendar.title == 'Mapua University');
	let holidays = data.post.holidays;

	let previousMonth, nextMonth, currentMonth;
	currentMonth = new Date().getMonth();
	$: {
		previousMonth = currentMonth - 1;
		nextMonth = currentMonth + 1;
	}
	function giveFocus(event) {
		currentMonth = event.detail.month;
	}
</script>

<div class="app-proper">
	<div class="calendar">
		<div class="prev-next-calendars">
			<Calendar on:requestFocus={giveFocus} month={previousMonth} {calendars} {holidays}></Calendar>
			<Calendar on:requestFocus={giveFocus} month={nextMonth} {calendars} {holidays}></Calendar>
		</div>
		<div class="current-calendar">
			<CurrentCalendar bind:month={currentMonth} {calendars} {holidays}></CurrentCalendar>
		</div>
		<div class="info-bar">
			<InfoBar month={currentMonth} {calendars} {holidays}></InfoBar>
		</div>
	</div>
</div>

<style>
	@import '../styles.css';
	.app-proper {
		display: flex;
		align-items: flex-start;
		justify-content: flex-start;
		flex-direction: column;
		width: 100%;
		height: 100%;
	}
	.hero-banner {
		background-image: url('../lib/assets/hero_banner.jpg');
		width: 100%;
		height: max(40vh, 300px);
		background-size: cover;
		background-position: 50% 50%;
		background-color: var(--color-base-9);
		background-blend-mode: color-dodge;
		user-select: none;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.mask {
		background-image: url('../lib/assets/hero_banner.jpg');
		width: 100%;
		height: max(40vh, 300px);
		background-size: cover;
		background-position: 50% 50%;
		background-color: var(--color-accent-9);
		background-blend-mode: color-dodge;
		filter: brightness(1.2);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: clamp(7rem, 24vw, 28rem);
		text-wrap-mode: nowrap;
		letter-spacing: clamp(-4rem, -2vw, -1rem);
		font-weight: bold;
		margin: 0;
		padding: 0;
	}
	.calendar {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 5rem 2rem;
		gap: max(2rem, 3vw);
		height: 100vh;
		width: 100%;
		box-shadow: 0rem -0.2rem 5rem 2rem var(--color-base-9);
		z-index: 2;
		box-sizing: border-box;
	}
	.prev-next-calendars {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		height: 100%;
		width: 25%;
		gap: 1rem;
	}
	.current-calendar {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		width: 50%;
	}
	.info-bar {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		width: 25%;
	}
	@media only screen and (max-width: 1200px) {
		.calendar {
			flex-direction: column;
			height: auto;
		}
		.current-calendar,
		.prev-next-calendars,
		.info-bar {
			width: 100%;
		}
		.prev-next-calendars {
			flex-direction: row;
		}
	}
</style>
