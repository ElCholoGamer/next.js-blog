import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import db from '../../../lib/db';
import Post from '../../../models/post';

const handler = nc<NextApiRequest, NextApiResponse>()
	.get(async (req, res) => {
		await db();
		const posts = await Post.find();
		res.json(posts);
	})
	.post(async (req, res) => {
		await db();
		const { title, author, content } = req.body;

		if (
			typeof title !== 'string' ||
			typeof author !== 'string' ||
			typeof content !== 'string'
		) {
			return res.status(400).json({
				status: 400,
				message: 'Invalid request body.',
			});
		}

		const post = new Post({
			title,
			author,
			content,
		});

		await post.save();
		res.json(post);
	});

export default handler;
