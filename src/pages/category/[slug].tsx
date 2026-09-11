import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/dist/client/router';
import {
  defaultLoadPostsVariables,
  loadPosts,
  StrapiPostAndSettings,
} from '../../api/load-posts';
import { PostsTemplate } from '../../templates/PostsTemplate';
import { PostStrapi } from '../../shared-types/post-strapi';

type CategoryPageProps = StrapiPostAndSettings & {
  allPosts: PostStrapi[];
};

export default function CategoryPage({
  posts = [],
  setting,
  variables,
  allPosts = [],
}: CategoryPageProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  const categoryName =
    posts[0]?.categories?.find((cat) => cat.slug === router.query.slug)
      ?.displayName || 'Categoria';

  return (
    <>
      <Head>
        <title>
          Category: {categoryName} - {setting?.blogName || 'Blog'}
        </title>
      </Head>
      <PostsTemplate
        posts={posts}
        settings={setting}
        variables={variables}
        allPosts={allPosts.length ? allPosts : posts}
      />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  let data = null;
  let allPostsData = null;
  const categorySlug = ctx.params?.slug as string;
  const variables = { categorySlug };

  try {
    data = await loadPosts(variables);
    allPostsData = await loadPosts();
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
      variables: {
        ...defaultLoadPostsVariables,
        ...variables,
      },
    },
    revalidate: 60,
  };
};
