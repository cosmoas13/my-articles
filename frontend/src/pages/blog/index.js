import Blog from '../../components/pages/Blog';
import { getArticles } from '../../services/articleService';

import React from 'react';

export default function pages({ articles, totalCount, currentPage, totalPages }) {
	return <Blog
		articles={articles}
		totalCount={totalCount}
		currentPage={currentPage}
		totalPages={totalPages}
	/>;
}

export async function getServerSideProps({ query }) {
	const page = parseInt(query.page) || 1;
	const limit = 10;
	const search = query.search || '';

	const { articles = [], totalCount = 0 } = await getArticles({ page, limit, search }) || {};
	const totalPages = Math.ceil(totalCount / limit);

	return {
		props: {
			articles: articles || [],
			totalCount: totalCount || 0,
			currentPage: page,
			totalPages: totalPages || 1
		},
	};
}
