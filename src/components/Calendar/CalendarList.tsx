import React, { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
	userTokenState,
	modeState,
	selectedDateState,
} from '../../recoil/userState';
import { Word, Quiz, joinMeanings, prettyDate } from './CalendarType';
import { format, parseISO } from 'date-fns';

const DUMMY_DATA = {
	words: [
		{
			_id: '6463b194c0973c003b018898',
			word: 'test',
			meanings: ['시험', '실험', '검사', '테스트', '조사하다'],
			status: 0,
			bookId: 'L5jGxERXXqtvn5pF1ZF0B',
			ownerEmail: 'signin@test.com',
			short_id: 'zbitMpxBnF_BGtBlIw8nG',
			createdAt: '2023-05-16T16:38:44.273Z',
			updatedAt: '2023-05-19T06:38:41.679Z',
			__v: 0,
		},
		// 다른 데이터들...
	],
	quizzes: [
		{
			_id: '6467b0d3bd1f832ee49fd542',
			short_id: '12345678910',
			category: 'four-prong',
			ownerEmail: 'signin@test.com',
			correctWords: ['yNkZ4zKXpXCrrjl35WIMA', 'mW7xPMTqYwEuD_w_kVNB3'],
			incorrectWords: ['xa3uhKVLHanq-31ovDU_u', '92y0tC_SK7WQViRmMFFmo'],
			createdAt: '2023-05-20T02:00:00.000Z',
		},
		// 다른 데이터들...
	],
};

function CalendarList() {
	const [dataList, setDataList] = useState([]);
	const [mode, setMode] = useRecoilState(modeState);
	const selectedDate = useRecoilValue(selectedDateState);
	const userToken = useRecoilValue(userTokenState);

	const wordsCalendarGet = async () => {
		return DUMMY_DATA.words;
	};
	const quizzesCalendarGet = async () => {
		return DUMMY_DATA.quizzes;
	};

	useEffect(() => {
		const getData = async () => {
			if (mode === 'words') {
				const words = await wordsCalendarGet(userToken);
				setDataList(words);
			} else if (mode === 'quizzes') {
				const quizzes = await quizzesCalendarGet(userToken);
				setDataList(quizzes);
			}
		};

		getData();
	}, [mode, selectedDate]);

	return (
		<ul>
			{dataList.map((item, index) => {
				const createdAt = prettyDate(item.createdAt);
				if (mode === 'words') {
					const wordItem = item as Word;
					return (
						<li key={index}>
							<h3>{wordItem.word}</h3>
							<div>{joinMeanings(wordItem.meanings)}</div>
							<div>{createdAt}</div>
							<div>{wordItem.status}</div>
						</li>
					);
				} else {
					const quizItem = item as Quiz;
					return (
						<li key={index}>
							<h3>Quiz</h3>
							<div>Correct words: {quizItem.correctWords.join(', ')}</div>
							<div>Incorrect words: {quizItem.incorrectWords.join(', ')}</div>
							<div>{createdAt}</div>
						</li>
					);
				}
			})}
		</ul>
	);
}

export default CalendarList;
