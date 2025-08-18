import React from 'react';
import { useRouter } from 'next/router';
import Header from '../../elements/Header';
import { PostCard, PostWidget, Categories, SearchBar } from '../../elements/Blog';
import Link from 'next/link';

export default function Blog({ articles, totalCount, currentPage, totalPages }) {
	const router = useRouter();
	const { search } = router.query;
	
	const renderPagination = () => {
		const pages = [];
		const maxPagesToShow = 5;
		let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
		let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
		
		if (endPage - startPage + 1 < maxPagesToShow) {
			startPage = Math.max(1, endPage - maxPagesToShow + 1);
		}
		
		for (let i = startPage; i <= endPage; i++) {
			pages.push(
				<Link 
					href={{ 
						pathname: '/blog', 
						query: { ...router.query, page: i } 
					}} 
					key={i}
				>
					<a className={`mx-1 px-3 py-1 rounded ${currentPage === i ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}>
						{i}
					</a>
				</Link>
			);
		}
		
		return (
			<div className="flex justify-center my-8">
				{currentPage > 1 && (
					<Link 
						href={{ 
							pathname: '/blog', 
							query: { ...router.query, page: currentPage - 1 } 
						}}
					>
						<a className="mx-1 px-3 py-1 rounded bg-gray-200 hover:bg-gray-300">
							&laquo; Prev
						</a>
					</Link>
				)}
				
				{pages}
				
				{currentPage < totalPages && (
					<Link 
						href={{ 
							pathname: '/blog', 
							query: { ...router.query, page: currentPage + 1 } 
						}}
					>
						<a className="mx-1 px-3 py-1 rounded bg-gray-200 hover:bg-gray-300">
							Next &raquo;
						</a>
					</Link>
				)}
			</div>
		);
	};
	
	return (
		<React.Fragment>
			<Header />
			<div className='container mx-auto px-10 mb-8 mt-3'>
				<div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
					<div className='lg:col-span-8 col-span-1'>
						<SearchBar />
						
						{search && (
							<div className="mb-4 p-4 bg-blue-50 rounded-lg">
								<p>Hasil pencarian untuk: <span className="font-bold">{search}</span></p>
								<p>Ditemukan {totalCount} artikel</p>
							</div>
						)}
						
						{articles.length > 0 ? (
							articles.map((article) => (
								<PostCard post={article} key={article.id} />
							))
						) : (
							<div className="text-center p-10 bg-white rounded-lg shadow-lg">
								<p className="text-xl">Tidak ada artikel yang ditemukan</p>
							</div>
						)}
						
						{totalPages > 1 && renderPagination()}
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
