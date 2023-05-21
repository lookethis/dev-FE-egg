// import React, { useEffect, useState } from 'react';
// import { useRecoilValue } from 'recoil';
// import { userTokenState } from '../../recoil/userState';
// import { Word, prettyDate, joinMeanings } from './CalendarType';
// import { calenderGetAll } from '../../apis/calendar';

// function CalendarList() {
// 	const [wordsList, setWordsList] = useState<Word[]>([]);
// 	const userToken = useRecoilValue(userTokenState);
// 	/**useEffect */
// 	useEffect(() => {
// 		const fetchData = async () => {
// 			try {
// 				const 데이터: Word[] = await calenderGetAll(userToken);
// 				setWordsList(() => {
// 					return 데이터;
// 				});
// 			} catch (error) {
// 				console.error(error);
// 			}
// 		};
// 		fetchData();
// 	}, []);
// 	return (
// 		<>
// 			<ul>
// 				{wordsList.map((word, index) => {
// 					return (
// 						<li key={index}>
// 							<h3>{word.word}</h3>
// 							<div>{joinMeanings(word.meanings)}</div>
// 							<div>{prettyDate(word.createdAt)}</div>
// 							<div>{word.status}</div>
// 						</li>
// 					);
// 				})}
// 			</ul>
// 		</>
// 	);
// }

import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userTokenState } from '../../recoil/userState';
import { format, parseISO } from 'date-fns';
import { Word } from './CalendarType';  // Word 인터페이스를 import합니다.

const DUMMY_DATA = {
  words: [
    {
        "_id": "6463b194c0973c003b018898",
        "word": "test",
        "meanings": [
            "시험",
            "실험",
            "검사",
            "테스트",
            "조사하다"
        ],
        "status": 0,
        "bookId": "L5jGxERXXqtvn5pF1ZF0B",
        "ownerEmail": "test@test.com",
        "short_id": "zbitMpxBnF_BGtBlIw8nG",
        "createdAt": "2023-05-16T16:38:44.273Z",
        "updatedAt": "2023-05-19T06:38:41.679Z",
        "__v": 0
    },
    // 다른 데이터들...
  ],
  quizzes: [
    {
        "_id": "6467b0d3bd1f832ee49fd542",
        "short_id": "12345678910",
        "category": "four-prong",
        "ownerEmail": "test@test.com",
        "correctWords": [
            "yNkZ4zKXpXCrrjl35WIMA",
            "mW7xPMTqYwEuD_w_kVNB3"
        ],
        "incorrectWords": [
            "xa3uhKVLHanq-31ovDU_u",
            "92y0tC_SK7WQViRmMFFmo"
        ],
        "createdAt": "2023-05-20T02:00:00.000Z"
    },
  ],
};
type SetDataList =

function CalendarList({ mode }: { mode: string }) {
  const [dataList, setDataList] = useState([]);
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
        const words = await wordsCalendarGet();
        // console.log(words)
        // console.log(typeof words)
        // setDataList(words);
      } else if (mode === 'quizzes') {
        const quizzes = await quizzesCalendarGet();
        // setDataList(quizzes);
      }
    };
    getData();
  }, [mode]);

  return (
    <ul>
      {dataList.map((item, index) => {
        const createdAt = format(parseISO(item.createdAt), 'yyyy-MM-dd');
        if (mode === 'words') {
          const wordItem = item as Word;
          console.log(item)
          return (
            <li key={index}>
              <h3>{wordItem.word}</h3>
              <div>{wordItem.meanings.join(', ')}</div>
              <div>{wordItem.createdAt}</div>
              <div>{wordItem.status}</div>
            </li>
          );
        } else {
          return (
            <li key={index}>
              <h3>Quiz</h3>
              <div>Correct words: {item.correctWords.join(', ')}</div>
              <div>Incorrect words: {item.incorrectWords.join(', ')}</div> 
              <div>{item.createdAt}</div>
            </li>
          );
        }
      })}
    </ul>
  );
}

export default CalendarList;
