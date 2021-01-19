import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import DateTime from '../components/date-time';
import { getRecentPosts, PostInfo } from '../lib/posts';
import styles from '../styles/Home.module.css';

interface Props {
	recentPosts: PostInfo[];
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
	const recentPosts = await getRecentPosts();

	return {
		props: {
			recentPosts,
		},
	};
};

const Home: React.FC<Props> = ({ recentPosts }) => {
	return (
		<div className={styles.container}>
			<Head>
				<title>Next.js Blog</title>
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>Next.js Blog</h1>

				<p className={styles.description}>
					A simple blog app made with the{' '}
					<Link href="https://nextjs.org">
						<a>Next.js</a>
					</Link>{' '}
					framework.
				</p>
				<br />

				<p className={styles.description}>
					<strong>
						Read all posts{' '}
						<Link href="/posts">
							<a>here!</a>
						</Link>
					</strong>
				</p>

				<div className={styles.postsContainer}>
					<h2>Latest posts</h2>

					<div className={styles.posts}>
						{recentPosts.length > 0 ? (
							recentPosts
								.map(post => (
									<div className={styles.postItem} key={post._id}>
										<Link href={`/posts/${post._id}`}>
											<a>
												<strong>{post.title}</strong>
											</a>
										</Link>
										<br />
										<DateTime timestamp={post.createdAt} />
									</div>
								))
								.reduce<JSX.Element[]>(
									(acc, post, i) =>
										i === 0
											? [post]
											: [...acc, <hr key={'_' + post.key} />, post],
									[]
								)
						) : (
							<p className={styles.noPosts}>
								Looks like there isn't any recent content!
							</p>
						)}
					</div>
				</div>
			</main>
		</div>
	);
};

export default Home;
