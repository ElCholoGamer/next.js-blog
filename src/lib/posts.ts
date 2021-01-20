import db from './db';
import Post, { IPost } from '../models/post';

export type PostInfo = ReturnType<IPost['toJSON']>;

const formatPosts = (posts: IPost[]) =>
	posts.map(post => post.toJSON()).sort((a, b) => b.createdAt - a.createdAt);

export async function getAllPosts(): Promise<PostInfo[]> {
	await db();

	const posts = await Post.find();
	return formatPosts(posts);
}

export async function getRecentPosts(days = 1): Promise<PostInfo[]> {
	await db();
	const offset = Date.now() - days * 24 * 60 * 60 * 1000;

	const posts = await Post.find({ createdAt: { $gte: offset } });
	return formatPosts(posts);
}
