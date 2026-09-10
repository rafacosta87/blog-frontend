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

type AuthorPageProps = StrapiPostAndSettings & {
  allPosts: PostStrapi[];
};

export default function AuthorPage({
  posts = [],
  setting,
  variables,
  allPosts = [],
}: AuthorPageProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  const authorName = posts[0]?.author?.displayName || 'Autor';

  return (
    <>
      <Head>
        <title>
          Author: {authorName} - {setting?.blogName || 'Blog'}
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
  const authorSlug = ctx.params?.slug as string;
  const variables = { authorSlug };

  try {
    data = await loadPosts(variables);
    allPostsData = await loadPosts();
  } catch (e) {
    data = null;
  }

  // Se não encontrar configurações, aí sim podemos retornar 404
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
