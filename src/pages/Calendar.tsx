import React, { useEffect, useState } from 'react';
/**컴포넌트 */
import Header from '../components/common/Header/Header';
import CalendarPaper from '../components/Calendar/CalendarPaper';
import CalendarList from '../components/Calendar/CalendarList';

function CalendarPage() {
	return (
		<>
			<Header />
			<main>
				<h1>버튼들어갈자리</h1>
				<CalendarPaper />
				<CalendarList />
			</main>
		</>
	);
}

export default CalendarPage;
