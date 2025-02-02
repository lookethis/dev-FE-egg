import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userTokenState } from '../../recoil/userState';
import styles from './QuizList.module.scss';
import Modal from '../common/Modal/Modal';
import {
	BookOption,
	BookSelectOption,
	NumberOption,
	TypeOption,
	WordStatusOption,
} from './QuizOptions';
import { bookListAll } from '../../apis/book';
import { getFourProngsQuiz } from '../../apis/quiz';

export interface InterfaceQuiz {
	id: string;
	title: string;
	description: string;
	img: string;
}

interface ListProps {
	quizInfo: InterfaceQuiz;
}
type TypeBookList = { id: string; name: string };

function QuizList({ quizInfo }: ListProps) {
	const navigate = useNavigate();
	const userToken = useRecoilValue(userTokenState);

	const [showOptionModal, setShowOptionModal] = useState(false);
	const [showBookSelectModal, setShowBookSelectModal] = useState(false);

	const { id, title, description, img } = quizInfo;

	const [bookList, setBookList] = useState<TypeBookList[]>([]);
	const [bookOption, setBookOption] = useState<TypeBookList[] | any>([]);
	const [typeOption, setTypeOption] = useState<string>('word');
	const [numberOption, setNumberOption] = useState<number>(5);
	const [wordStatusOption, setWordStatusOption] = useState<number[]>([0, 1, 2]);
	const handleStartQuiz = () => {
		const quizData = {
			bookOption: bookOption.map((book: TypeBookList) => book.id),
			numberOption,
			wordStatusOption,
		};

		// 네비게이션으로 사지선다 리스트를 클릭하면 해당 api 호출 +
		if (id === 'four-prong')
			getFourProngsQuiz(userToken, quizData).then(res => {
				console.log(res.data);
				navigate('/quiz/four-prong', { state: res.data });
			});
	};

	const handleBookSelectButtonClick = () => {
		setShowBookSelectModal(true);
	};

	const handleBookInputChange = (value: TypeBookList[]) => {
		setBookOption(() => {
			return value;
		});
	};

	const handleTypeInputChange = (value: string) => {
		setTypeOption(() => {
			return value;
		});
	};

	const handleNumberInputChange = (value: number) => {
		setNumberOption(() => {
			return value;
		});
	};

	const handleWordStatusInputChange = (value: number[]) => {
		setWordStatusOption(() => {
			return value;
		});
	};

	useEffect(() => {
		bookListAll(userToken).then(res => {
			const newBookList = res.data.reduce(
				(acc: TypeBookList[], current: { name: string; short_id: string }) => {
					const { short_id, name } = current;
					return [...acc, { id: short_id, name }];
				},
				[],
			);
			setBookList(newBookList);
			setBookOption(newBookList);
		});
	}, [userToken]);

	return (
		<>
			<div className={styles.list} onClick={() => setShowOptionModal(true)}>
				<div className={styles['img-container']}>
					<img src={img}></img>
				</div>
				<div className={styles['des-container']}>
					<p>{title}</p>
					<p>{description}</p>
				</div>
			</div>
			<Modal
				showModal={showOptionModal}
				setShowModal={setShowOptionModal}
				title='퀴즈 옵션 설정'
			>
				<ul className={styles.optionContainer}>
					{/* 컴포넌트화 필요 */}
					<BookOption onClick={handleBookSelectButtonClick} />
					<TypeOption value={typeOption} onChange={handleTypeInputChange} />
					<NumberOption
						value={numberOption}
						onChange={handleNumberInputChange}
					/>

					<WordStatusOption
						value={wordStatusOption}
						onChange={handleWordStatusInputChange}
					/>
				</ul>
				<div className={styles.quizStartContainer}>
					{/* 클릭하면 옵션의 세팅과 퀴즈 id에 따라 알맞은 방법으로 api 호출 */}
					<button onClick={handleStartQuiz}>퀴즈 시작</button>
				</div>
			</Modal>
			<Modal
				showModal={showBookSelectModal}
				setShowModal={setShowBookSelectModal}
				title='단어장 선택'
			>
				<BookSelectOption
					bookList={bookList}
					value={bookOption}
					onChange={handleBookInputChange}
				/>
			</Modal>
		</>
	);
}

export default QuizList;
