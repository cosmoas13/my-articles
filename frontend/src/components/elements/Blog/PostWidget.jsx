import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Link from 'next/link';
import { getRecentPosts, getSimilarPosts } from '../../../services';

const PostWidget = ({ categories, slug }) => {
	const [relatedPosts, setRelatedPosts] = useState([]);

	useEffect(() => {
		let isMounted = true;
		if (slug) {
			// Pastikan categories tidak undefined sebelum memanggil getSimilarPosts
			if (categories) {
				getSimilarPosts(categories, slug).then((result) => {
					if (isMounted) {
						setRelatedPosts(result || []);
					}
				});
			} else {
				if (isMounted) {
					setRelatedPosts([]);
				}
			}
		} else {
			getRecentPosts().then((result) => {
				if (isMounted) {
					setRelatedPosts(result || []);
				}
			});
		}
		
		return () => {
			isMounted = false;
		};
	}, [slug, categories]);
	return (
		<div className='bg-white shadow-lg rounded-lg p-8 mb-8'>
			<h3 className='text-xl mb-8 font-semibold border-b pb-4'>
				{slug ? 'Related Posts' : 'Recent Posts'}
			</h3>
			{Array.isArray(relatedPosts) && relatedPosts.length > 0 ? (
				relatedPosts.map((post) => (
					<div className='flex items-center w-full mb-4' key={post.title || `post-${Math.random()}`}>
						<div className='w-16 flex-none'>
							<img
								src={post.featuredImage?.url || '/placeholder.png'}
								alt={post.title || 'Post image'}
								height='60px'
								width='60px'
								className='align-middle rounded-full'
							/>
						</div>
						<div className='flex-grow ml-4'>
							<p className='text-gray-500 font-xs'>
								{moment(post.createdAt || new Date()).format('MMM DD, YYYY')}
							</p>
							<Link
								href={`/post/${post.slug || '#'}`}
								className='text-md'
							>
								{post.title || 'Untitled Post'}
							</Link>
						</div>
					</div>
				))
			) : (
				<p>No posts available</p>
			)}
		</div>
	);
};

export default PostWidget;
