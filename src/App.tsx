import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import BookForm from './pages/BookForm';
import BookList from './pages/BookList';
import WordForm from './pages/WordForm';
import WordList from './pages/WordList';
import Calendar from './pages/Calendar';
import Login from './pages/Login';
import Register from './pages/Register';
import UserInfo from './pages/UserInfo';
import UserEdit from './pages/UserEdit';
import QuizList from './pages/QuizList';
import FourProngQuiz from './components/QuizList/FourProngQuiz';
import Header from './components/common/Header/Header';

function App() {
	return (
		<BrowserRouter>
			<React.Fragment>
				<Routes>
					<Route path='/' element={<Navigate to='/book/list' />} />
					<Route path='*' element={<Navigate to='/' />} />
					<Route path='/book/edit/:bookId' element={<BookForm />}></Route>
					<Route path='/book/add' element={<BookForm />}></Route>
					<Route path='/book/list' element={<BookList />}></Route>
					<Route path='/word/edit/:wordId' element={<WordForm />}></Route>
					<Route path='/word/add' element={<WordForm />}></Route>
					<Route path='/word/list' element={<WordList />}></Route>
					<Route path='/word/list/:bookId' element={<WordList />}></Route>
					<Route path='/calendar' element={<Calendar />}></Route>
					<Route path='/login' element={<Login />}></Route>
					<Route path='/register' element={<Register />}></Route>
					<Route path='/user/info' element={<UserInfo />}></Route>
					<Route path='/user/edit' element={<UserEdit />}></Route>
					<Route path='/quiz/list' element={<QuizList />}></Route>
					<Route path='/quiz/four-prong' element={<FourProngQuiz />}></Route>
				</Routes>
			</React.Fragment>
		</BrowserRouter>
	);
}

export default App;
