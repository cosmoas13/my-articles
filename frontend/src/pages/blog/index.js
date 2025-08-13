import Blog from '../../components/pages/Blog';
import { getPosts } from '../../services';

import React from 'react';

export default function pages({ posts }) {
	return <Blog posts={posts} />;
}

export async function getStaticProps() {
	const posts = (await getPosts()) || [];
	return {
		props: { posts }, // will be passed to the page component as props
	};
}
