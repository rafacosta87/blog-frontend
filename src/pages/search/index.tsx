import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/dist/client/router';
import {
  defaultLoadPostsVariables,
  loadPosts,
  StrapiPostAndSettings,
} from '../../api/load-posts';
import { PostsTemplate } from '../../templates/PostsTemplate';
import { PostStrapi } from '../../shared-types/post-strapi';

type SearchPageProps = StrapiPostAndSettings & {
  allPosts: PostStrapi[];
};

export default function SearchPage({
  posts,
  setting,
  variables,

  allPosts,
}: SearchPageProps) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>
          Pesquisa: {router.query.q} - {setting.blogName}
        </title>
      </Head>

      <PostsTemplate
        posts={posts}
        settings={setting}
        variables={variables}
        allPosts={allPosts || posts}
      />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  let data = null;
  let allPostsData = null;
  const query = ctx.query.q || '';

  if (!query) {
    return {
      notFound: true,
    };
  }

  const variables = { postSearch: query as string };

  try {
    // 1. Fetch filtered posts for the search page
    data = await loadPosts(variables);
    // 2. Fetch all posts for the sidebar menu
    allPostsData = await loadPosts();
  } catch (e) {
    data = null;
  }

  if (!data || !data.posts) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      posts: data.posts,
      setting: data.setting,
      allPosts: allPostsData?.posts || data.posts,
      variables: {
        ...defaultLoadPostsVariables,
        ...variables,
      },
    },
  };
};
