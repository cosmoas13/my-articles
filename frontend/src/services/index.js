import { request, gql } from 'graphql-request';

const graphqlAPI =
	'https://api-ap-southeast-2.hygraph.com/v2/cldy1amq00t9q01rrh4ck3xph/master';

export const getPosts = async () => {
	const query = gql`
		query Assets {
			postsConnection {
				edges {
					cursor
					node {
						author {
							bio
							name
							id
							photo {
								url
							}
						}
						createdAt
						slug
						title
						excerpt
						featuredImage {
							url
						}
						categories {
							name
							slug
						}
					}
				}
			}
		}
	`;

	const result = await request(graphqlAPI, query);

	return result.postsConnection.edges;
};

export const getCategories = async () => {
	const query = gql`
    query GetGategories {
        categories {
          name
          slug
        }
    }
  `;

	const result = await request(graphqlAPI, query);

	return result.categories;
};

export const getCategoryPost = async (slug) => {
	const query = gql`
    query GetCategoryPost($slug: String!) {
      postsConnection(where: {categories_some: {slug: $slug}}) {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

	const result = await request(graphqlAPI, query, { slug });

	return result.postsConnection.edges;
};

export const getRecentPosts = async () => {
	const query = gql`
		query GetPostDetails {
			posts(orderBy: createdAt_ASC, last: 3) {
				title
				featuredImage {
					url
				}
				createdAt
				slug
			}
		}
	`;

	const result = await request(graphqlAPI, query);

	return result.posts;
};

export const getSimilarPosts = async (categories, slug) => {
	const query = gql`
		query GetPostDetails($slug: String!, $categories: [String!]) {
			posts(
				where: {
					slug_not: $slug
					AND: { categories_some: { slug_in: $categories } }
				}
				last: 3
			) {
				title
				featuredImage {
					url
				}
				createdAt
				slug
			}
		}
	`;

	const result = await request(graphqlAPI, query, { categories, slug });

	return result.posts;
};

export const getPostDetails = async (slug) => {
	const query = gql`
		query GetPostDetails($slug: String!) {
			post(where: { slug: $slug }) {
				author {
					bio
					name
					id
					photo {
						url
					}
				}
				createdAt
				slug
				title
				excerpt
				featuredImage {
					url
				}
				categories {
					name
					slug
				}
				content {
					raw
				}
			}
		}
	`;

	const result = await request(graphqlAPI, query, { slug });

	return result.post;
};

export const submitComment = async (obj) => {
	const result = await fetch('/api/comments', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(obj),
	});

	return result.json();
};

export const getComments = async (articleId) => {
	try {
		const response = await fetch(`/api/comments/article/${articleId}`);
		
		if (!response.ok) {
			throw new Error('Failed to fetch comments');
		}
		
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error fetching comments:', error);
		return [];
	}
};
