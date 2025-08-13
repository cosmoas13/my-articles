import axios from 'axios';

export default async function comments(req, res) {
	if (req.method === 'POST') {
		try {
			// Map the request body to match our backend API
			const commentData = {
				content: req.body.content,
				articleId: req.body.articleId,
				name: req.body.name,
				email: req.body.email,
				isAnonymous: req.body.isAnonymous || false
			};

			// Forward the comment to our backend API
			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002'}/api/comments`,
				commentData
			);

			return res.status(200).json(response.data);
		} catch (error) {
			console.error('Error submitting comment:', error.response?.data || error.message);
			return res.status(error.response?.status || 500).json({
				message: error.response?.data?.message || 'Error submitting comment',
			});
		}
	} else if (req.method === 'GET') {
		// If we need to implement GET method in the future
		return res.status(405).json({ message: 'GET method not implemented' });
	}

	// Method not allowed
	return res.status(405).json({ message: 'Method not allowed' });
}
