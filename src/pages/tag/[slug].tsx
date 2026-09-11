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

type TagPageProps = StrapiPostAndSettings & {
  allPosts: PostStrapi[];
};

export default function TagPage({
  posts = [],
  setting,
  variables,
  allPosts = [],
}: TagPageProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  const tagName =
    posts[0]?.tags?.find((tag) => tag.slug === router.query.slug)
      ?.displayName || 'Tag';

  return (
    <>
      <Head>
        <title>
          Tag: {tagName} - {setting?.blogName || 'Blog'}
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
  const tagSlug = ctx.params?.slug as string;
  const variables = { tagSlug };

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
