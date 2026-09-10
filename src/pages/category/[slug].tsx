/* eslint-disable prettier/prettier */
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

type SearchPageProps = StrapiPostAndSettings & {
  allPosts: PostStrapi[];
};

export default function CategoryPage({
  posts,
  setting,
  variables,
  allPosts,
}: SearchPageProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  const categoryName = posts[0].categories.filter(
    (category) => category.slug === router.query.slug,
  )[0].displayName;

  return (
    <>
      <Head>
        <title>
          Category: {categoryName} - {setting.blogName}
        </title>
      </Head>
      <PostsTemplate posts={posts} settings={setting} variables={variables} allPosts={allPosts || posts} />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<StrapiPostAndSettings> = async (
  ctx,

) => {
  let data = null;
  let allPostsData = null;
  const variables = { categorySlug: ctx.params.slug as string };


  try {
    data = await loadPosts(variables);
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
      variables: {
        ...defaultLoadPostsVariables,
        ...variables,
      },

    },

    revalidate: 60,

  };

};
