import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import db from '../../../middleware/db';
import Post from '../../../models/post';

const handler = nc<NextApiRequest, NextApiResponse>()
	.get(async (req, res) => {
		await db();
		const posts = await Post.find();
		res.json(posts);
	})
	.post(async (req, res) => {
		const { author, content } = req.body;

		if (typeof author !== 'string' || typeof content !== 'string') {
			return res.status(400).json({
				status: 400,
				message: 'Invalid request body.',
			});
		}

		const post = await Post.create({
			author,
			content,
		});

		res.json(post);
	});

export default handler;
