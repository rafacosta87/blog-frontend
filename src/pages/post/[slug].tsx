/* eslint-disable prettier/prettier */
import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/dist/client/router';
import { loadPosts, PostsAndSettings } from '../../api/load-posts';
import { PostTemplate } from '../../templates/PostTemplate';
import { PostsTemplate } from '../../templates/PostsTemplate';
import { PostModel } from '../../shared-types/post';
import { Loading } from '../../components/Loading';

type PostPageProps = PostsAndSettings & {
  allPosts: PostModel[];
};

export default function PostPage({ posts = [], setting, allPosts = [] }: PostPageProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <Loading />;
  }

  const post = posts[0];

  if (!post) {
    return (
      <PostsTemplate
        posts={[]}
        settings={setting}
        allPosts={allPosts}
      />
    );
  }

  return (
    <>
      <Head>
        <title>
          {post.title} - {setting?.blogName || 'Blog'}
        </title>
        <meta name="description" content={post.excerpt} />
      </Head>
      <PostTemplate post={post} settings={setting} allPosts={allPosts || posts} />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  let data: PostsAndSettings | null = null;
  let paths = [];

  try {
    data = await loadPosts();
    paths = data.posts.map((post) => ({ params: { slug: post.slug } }));
  } catch (e) {
    data = null;
  }

  if (!data || !data.posts || !data.posts.length) {
    paths = [];
  }

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (
  ctx,
) => {
  let data = null;
  let allPostsData = null;

  try {
    data = await loadPosts({ postSlug: ctx.params?.slug as string });
    allPostsData = await loadPosts({ limit: 1000 });
  } catch (e) {
    data = null;
  }

  if (!data || !data.setting) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      posts: data.posts || [],
      setting: data.setting,
      allPosts: allPostsData?.posts || [],
    },
    revalidate: 60,
  };
};

