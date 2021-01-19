import next, { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import db from '../../../middleware/db';
import Post, { IPost } from '../../../models/post';

type PostRequest = NextApiRequest & { post: IPost };

const handler = nc<PostRequest, NextApiResponse>()
	.use<PostRequest, NextApiRequest>(async (req, res, next) => {
		await db();
		const post = await Post.findById(req.query.id).catch(() => null);

		if (!post) {
			return res.status(404).json({
				status: 404,
				message: 'Post not found.',
			});
		}

		req.post = post;
		next();
	})
	.get((req, res) => res.json(req.post))
	.delete(async (req, res) => {
		await req.post.deleteOne();
		res.json({
			status: 200,
			message: 'Post deleted.',
		});
	});

export default handler;
