export default class CalendarHelper {
	static isSchoolDay(date, calendar, holidays) {
		return calendar.terms.some((term) => {
			const startDate = new Date(term.start);
			const endDate = new Date(term.end);
			startDate.setHours(0);
			endDate.setHours(0);
			return (
				date >= startDate &&
				date <= endDate &&
				!this.isHoliday(date, holidays) &&
				!this.isBreakDate(date, calendar)
			);
		});
	}
	static getSchoolDays(date, calendars, holidays) {
		let schoolDays = [];
		calendars.forEach((calendar) => {
			let isSchoolDay = calendar.terms.some((term) => {
				const startDate = new Date(term.start);
				const endDate = new Date(term.end);
				startDate.setHours(0);
				endDate.setHours(0);
				return (
					date >= startDate &&
					date <= endDate &&
					!this.isHoliday(date, holidays) &&
					!this.isBreakDate(date, calendar)
				);
			});
			if (isSchoolDay) {
				schoolDays.push({ title: calendar.title, isSchoolDay });
			}
		});
		return schoolDays;
	}
	static getStarts(date, calendars) {
		let starts = [];
		calendars.forEach((calendar) => {
			let breakStart = calendar.breaks.find((calendarBreak) => {
				let startDate = new Date(calendarBreak.start);
				startDate.setHours(0);
				return date.getTime() === startDate.getTime();
			});
			let termStart = calendar.terms.find((term) => {
				let startDate = new Date(term.start);
				startDate.setHours(0);
				return date.getTime() === startDate.getTime();
			});
			if (breakStart) {
				starts.push({ title: calendar.title, type: 'break', name: breakStart.name });
			}
			if (termStart) {
				starts.push({ title: calendar.title, type: 'term', name: termStart.name });
			}
		});
		return starts;
	}
	static isStartOf(period, date, calendar) {
		switch (period) {
			case 'break':
				return calendar.breaks.find((calendarBreak) => {
					let startDate = new Date(calendarBreak.start);
					startDate.setHours(0);
					return date.getTime() === startDate.getTime();
				});

			case 'term':
				return calendar.terms.find((term) => {
					let startDate = new Date(term.start);
					startDate.setHours(0);
					return date.getTime() === startDate.getTime();
				});
			default:
				return;
		}
	}
	static isHoliday(date, holidays) {
		return holidays.find((holiday) => {
			const holidayDate = new Date(holiday.date);
			holidayDate.setHours(0);

			return date.getTime() === holidayDate.getTime();
		});
	}

	static isBreakDate(date, calendar) {
		return calendar.breaks.some((breakPeriod) => {
			const startDate = new Date(breakPeriod.start);
			const endDate = new Date(breakPeriod.end);
			startDate.setHours(0);
			endDate.setHours(0);
			return date >= startDate && date < endDate;
		});
	}
	static getCalendarColor(calendar) {
		switch (calendar.title) {
			case 'Far Eastern University':
				return '#217237';
			case 'Mapua University':
				return '#da291c';
		}
	}

	static getActiveTerm(date, calendar) {
		let termName = calendar.terms.find((term) => {
			const month = date.getYear() * 100 + (date.getMonth() % 12);
			const startDate = new Date(term.start);
			const endDate = new Date(term.end);

			return (
				month <= endDate.getYear() * 100 + endDate.getMonth() &&
				month >= startDate.getYear() * 100 + startDate.getMonth()
			);
		})?.term;

		if (termName) {
			return {
				calendarTitle: calendar.title,
				termName: termName
			};
		} else {
			return {
				calendarTitle: calendar.title,
				calendarLogo: calendar.logo,
				termName: 'No active term'
			};
		}
	}
	static getActiveBreaks(date, calendar) {
		let breaks = calendar.breaks.filter((termBreak) => {
			const month = date.getYear() * 100 + (date.getMonth() % 12);
			const startDate = new Date(termBreak.start);
			const endDate = new Date(termBreak.end);

			return (
				month <= endDate.getYear() * 100 + endDate.getMonth() &&
				month >= startDate.getYear() * 100 + startDate.getMonth()
			);
		});
		return { calendar: calendar.title, breaks };
	}
	static getHolidays(month, holidays) {
		return holidays.filter((holiday) => {
			const holidayDate = new Date(holiday.date);
			if (holiday.mode == 'yearly') {
				month = month % 12;
			}

			return holidayDate.getMonth() == month;
		});
	}
}
