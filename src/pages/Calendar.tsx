import React, { useEffect, useState } from 'react';
/**컴포넌트 */
import Navigation from '../components/common/Navigation/Navigation';
import CalendarList from '../components/Calendar/CalendarList';
import CalendarPaper from '../components/Calendar/CalendarPaper';

function CalendarPage() {
	const [mode, setMode] = useState('words');

	return (
		<>
			<Navigation />
			<main>
				<h1>
				<button onClick={() => setMode('words')}>Words</button>
          <button onClick={() => setMode('quizzes')}>Quizzes</button>
				</h1>
				<CalendarPaper />
				<CalendarList mode={mode} />
			</main>
		</>
	);
}

export default CalendarPage;
