export async function load({ params }) {
	const calendarsUrl =
		'https://raw.githubusercontent.com/yuans-dev/academic-calendar-json/refs/heads/main/calendars.json';
	const holidaysUrl =
		'https://raw.githubusercontent.com/yuans-dev/academic-calendar-json/refs/heads/main/holidays.json';

	try {
		const calendarsResponse = await fetch(calendarsUrl);
		const holidaysResponse = await fetch(holidaysUrl);
		if (!calendarsResponse.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		if (!holidaysResponse.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const calendars = await calendarsResponse.json();
		const holidays = await holidaysResponse.json();
		return {
			post: {
				title: `Calendars`,
				calendars,
				holidays
			}
		};
	} catch (error) {
		console.error('Error fetching the calendar data:', error); // Handle any errors
	}
}
