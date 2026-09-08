import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/dist/client/router';
import { loadPosts, StrapiPostAndSettings } from '../../api/load-posts';
import { PostTemplate } from '../../templates/PostTemplate';
import { PostStrapi } from '../../shared-types/post-strapi';

type PostPageProps = StrapiPostAndSettings & {
  allPosts: PostStrapi[];
};

export default function PostPage({ posts, setting, allPosts }: PostPageProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  const post = posts[0];

  return (
    <>
      <Head>
        <title>
          {post.title} - {setting.blogName}
        </title>
        <meta name="description" content={post.excerpt} />
      </Head>
      <PostTemplate
        post={post}
        settings={setting}
        allPosts={allPosts || posts}
      />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  let data: StrapiPostAndSettings | null = null;
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

export const getStaticProps: GetStaticProps = async (ctx) => {
  let data = null;
  let allPostsData = null;

  try {
    // 1. Fetch current post details and settings
    data = await loadPosts({ postSlug: ctx.params.slug as string });
    // 2. Fetch all posts listing for the sidebar menu
    allPostsData = await loadPosts();
  } catch (e) {
    data = null;
  }

  if (!data || !data.posts || !data.posts.length) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      posts: data.posts,
      setting: data.setting,
      allPosts: allPostsData?.posts || data.posts,
    },
    revalidate: 60,
  };
};
