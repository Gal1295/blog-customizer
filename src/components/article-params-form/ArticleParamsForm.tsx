import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { useRef, useState } from 'react';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

// Определение типа пропсов, принимаемых компонентом
type ArticleParamsFormProps = {
	setCurrentArticleState: (param: ArticleStateType) => void;
	currentArticleState: ArticleStateType;
};

// Основной компонент
export const ArticleParamsForm = ({
	currentArticleState,
	setCurrentArticleState,
}: ArticleParamsFormProps) => {
	// Состояние для управления видимостью меню
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

	// Ссылка на корневой элемент формы
	const rootRef = useRef<HTMLDivElement>(null);

	// Состояние выбранных параметров статьи
	const [selectArticleState, setSelectArticleState] =
		useState<ArticleStateType>(currentArticleState);

	// Обработчик изменения параметра
	const handleChange = (key: keyof ArticleStateType) => (value: OptionType) => {
		setSelectArticleState((prev) => ({ ...prev, [key]: value }));
	};

	// Хук для обработки кликов вне формы
	useOutsideClickClose({
		isOpen: isMenuOpen,
		rootRef,
		onChange: setIsMenuOpen,
		event: 'mousedown',
	});

	// Разметка компонента
	return (
		<div ref={rootRef}>
			<ArrowButton isOpen={isMenuOpen} onClick={setIsMenuOpen} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={(e) => {
						e.preventDefault();
						setCurrentArticleState(selectArticleState);
					}}
					onReset={() => {
						setSelectArticleState(defaultArticleState);
						setCurrentArticleState(defaultArticleState);
					}}>
					<Text size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={selectArticleState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleChange('fontFamilyOption')}
						title='Шрифт'
					/>
					<RadioGroup
						selected={selectArticleState.fontSizeOption}
						options={fontSizeOptions}
						onChange={handleChange('fontSizeOption')}
						title='Размер шрифта'
						name='fontSizeOption'
					/>
					<Select
						selected={selectArticleState.fontColor}
						options={fontColors}
						onChange={handleChange('fontColor')}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={selectArticleState.backgroundColor}
						options={backgroundColors}
						onChange={handleChange('backgroundColor')}
						title='Цвет фона'
					/>
					<Select
						selected={selectArticleState.contentWidth}
						options={contentWidthArr}
						onChange={handleChange('contentWidth')}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
