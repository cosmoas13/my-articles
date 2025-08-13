import axios from 'axios';

export default async function handler(req, res) {
  const { articleId } = req.query;

  if (req.method === 'GET') {
    try {
      // Get comments from our backend API
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002'}/api/comments/article/${articleId}`
      );

      return res.status(200).json(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error.response?.data || error.message);
      return res.status(error.response?.status || 500).json({
        message: error.response?.data?.message || 'Error fetching comments',
      });
    }
  }

  // Method not allowed
  return res.status(405).json({ message: 'Method not allowed' });
}