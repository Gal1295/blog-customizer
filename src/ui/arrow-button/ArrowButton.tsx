import arrow from 'src/images/arrow.svg';
import styles from './ArrowButton.module.scss';
import clsx from 'clsx';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

type ArrowButtonProps = {
	isOpen: boolean; // Признак того, открыта ли форма
	onClick: (data: boolean) => void; // Функция обратного вызова для обработки клика
};

export const ArrowButton = ({ isOpen, onClick }: ArrowButtonProps) => {
	const handleClick = () => {
		onClick(!isOpen); // Передаем новое состояние (открыто/закрыто)
	};

	return (
		<div
			role='button'
			aria-label={
				isOpen
					? 'Закрыть форму параметров статьи'
					: 'Открыть форму параметров статьи'
			}
			tabIndex={0} // Позволяет элементу быть фокусируемым
			className={clsx(styles.container, { [styles.container_open]: isOpen })} // Условное добавление класса
			onClick={handleClick} // Обработка клика
			onKeyDown={(e) => e.key === 'Enter' && handleClick()} // Обработка нажатия клавиши Enter
		>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx(styles.arrow, { [styles.arrow_open]: isOpen })} // Условное добавление класса для изображения
			/>
		</div>
	);
};
