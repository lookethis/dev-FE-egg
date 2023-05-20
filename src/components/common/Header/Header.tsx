import React from 'react';
import styles from './Header.module.scss';

function Header({ title }: { title: string }) {
	return (
<<<<<<< HEAD
		<header className={styles.container}>
			<nav className={styles.menu}>
				<ul className={styles.menuList}>
					<li className={styles.menuItem}>
						<NavLink
							to='/word/add'
							style={({ isActive }) => ({
								color: isActive ? 'red' : 'black',
							})}
						>
							<div className={styles.iconWrapper}>
								<BsPencil size={24} />
							</div>
						</NavLink>
					</li>
					<li className={styles.menuItem}>
						<NavLink
							to='/book/list'
							style={({ isActive }) => ({
								color: isActive ? 'red' : 'black',
							})}
						>
							<div className={styles.iconWrapper}>
								<BsJournalBookmark size={24} />
							</div>
						</NavLink>
					</li>
					<li className={styles.menuItem}>
						<NavLink
							to='/quiz/list'
							style={({ isActive }) => ({
								color: isActive ? 'red' : 'black',
							})}
						>
							<div className={styles.iconWrapper}>
								<BsPatchQuestion size={24} />
							</div>
						</NavLink>
					</li>
					<li className={styles.menuItem}>
						<NavLink
							to='/calendar'
							style={({ isActive }) => ({
								color: isActive ? 'red' : 'black',
							})}
						>
							<div className={styles.iconWrapper}>
								<BsCalendar4Week size={24} />
							</div>
						</NavLink>
					</li>
					<li className={styles.menuItem}>
						<NavLink
							to='/login'
							style={({ isActive }) => ({
								color: isActive ? 'red' : 'black',
							})}
						>
							<div className={styles.iconWrapper}>
								<TbLogin size={24} />
							</div>
						</NavLink>
					</li>
				</ul>
			</nav>
		</header>
=======
		<div className={styles.headerContainer}>
			<header className={styles.commonHeader}>{title}</header>
		</div>
>>>>>>> ef225a73e688ed43f0f67c4c75979364a960c276
	);
}

export default Header;
