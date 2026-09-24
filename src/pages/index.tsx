import Head from 'next/head';
import { GetStaticProps } from 'next';
import {
  defaultLoadPostsVariables,
  loadPosts,
  PostsAndSettings,
} from '../api/load-posts';
import { PostsTemplate } from '../templates/PostsTemplate';
import { PostModel } from '../shared-types/post';

type IndexPageProps = PostsAndSettings & {
  allPosts: PostModel[];
};

export default function Index({
  posts,
  setting,
  variables,
  allPosts,
}: IndexPageProps) {
  return (
    <>
      <Head>
        <title>
          {setting.blogName} - {setting.blogDescription}
        </title>
        <meta name="description" content={setting.blogDescription} />
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

export const getStaticProps: GetStaticProps = async () => {
  let data = null;
  let allPostsData = null;

  try {
    // 1. Busca os 6 primeiros posts para a grade principal
    data = await loadPosts();
    // 2. Busca todos os posts (até 1000) para o menu lateral esquerdo
    allPostsData = await loadPosts({ limit: 1000 });
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
      },
    },
    revalidate: 60,
  };
};
