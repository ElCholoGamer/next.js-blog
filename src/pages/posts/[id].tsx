import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Layout from '../../components/layout';
import { getPostById, PostInfo } from '../../lib/posts';
import styles from '../../styles/Post.module.css';
import { Remarkable } from 'remarkable';
import { useRef } from 'react';
import DateTime from '../../components/date-time';

interface Props {
	post: PostInfo;
}

export const getServerSideProps: GetServerSideProps<Props> = async ctx => {
	const post = await getPostById(ctx.params?.id);
	if (!post) return { notFound: true };

	return {
		props: {
			post,
		},
	};
};

const Post: React.FC<Props> = ({ post }) => {
	const md = useRef(new Remarkable());

	const content = md.current.render(post.content);
	return (
		<Layout>
			<Head>
				<title>{post ? post.title : 'Post Not Found'} | Next.js Blog</title>
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>{post.title}</h1>
				<p className={styles.author}>By {post.author}</p>

				<div className={styles.container}>
					<small className={styles.date}>
						<DateTime timestamp={post.createdAt} />
					</small>
					<div
						className={styles.content}
						dangerouslySetInnerHTML={{ __html: content }}></div>
				</div>
			</main>
		</Layout>
	);
};

export default Post;
