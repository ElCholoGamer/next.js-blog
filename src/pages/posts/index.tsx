import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import DateTime from '../../components/date-time';
import Layout from '../../components/layout';
import { getAllPosts, PostInfo } from '../../lib/posts';
import styles from '../../styles/Posts.module.css';

interface Props {
	posts: PostInfo[];
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
	const posts = await getAllPosts();
	return {
		props: {
			posts,
		},
	};
};

const Posts: React.FC<Props> = ({ posts }) => (
	<Layout>
		<Head>
			<title>Posts | Next.js Blog</title>
		</Head>

		<main className={styles.main}>
			<h1 className={styles.title}>All Posts</h1>
			<hr />

			<div className={styles.posts}>
				{posts.map(post => (
					<Link key={post._id} href={`/posts/${post._id}`}>
						<div className={styles.post}>
							<h3>{post.title}</h3>

							<small>By {post.author}</small>
							<br />
							<DateTime timestamp={post.createdAt} />
						</div>
					</Link>
				))}
			</div>
		</main>
	</Layout>
);

export default Posts;
