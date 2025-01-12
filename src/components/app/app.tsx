import { CSSProperties, useState } from 'react';
import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from '../../constants/articleProps';

import styles from 'src/styles/index.module.scss';

const App = () => {
	const [currentArticleState, setCurrentArticleState] =
		useState<ArticleStateType>(defaultArticleState);

	// Приведение типа к Record<string, string>
	const styleVariables: CSSProperties & Record<string, string> = {
		'--font-family': currentArticleState.fontFamilyOption.value,
		'--font-size': currentArticleState.fontSizeOption.value,
		'--font-color': currentArticleState.fontColor.value,
		'--container-width': currentArticleState.contentWidth.value,
		'--bg-color': currentArticleState.backgroundColor.value,
	};

	return (
		<main className={styles.main} style={styleVariables}>
			<ArticleParamsForm
				currentArticleState={currentArticleState}
				setCurrentArticleState={setCurrentArticleState}
			/>
			<Article />
		</main>
	);
};

export default App;
