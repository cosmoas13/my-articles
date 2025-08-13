import React from 'react';
import Header from '../../elements/Header';
import { PostCard, PostWidget, Categories } from '../../elements/Blog';

export default function Blog({ posts }) {
	return (
		<React.Fragment>
			<Header />
			<div className='container mx-auto px-10 mb-8 mt-3'>
				<div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
					<div className='lg:col-span-8 col-span-1'>
						{posts.map((post) => (
							<PostCard post={post.node} key={post.title} />
						))}
					</div>
					<div className='lg:col-span-4 col-span-1'>
						<div className='lg:sticky relativ top-28'>
							<PostWidget />
							<Categories />
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}
