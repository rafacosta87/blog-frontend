import { PostGrid } from '../../components/PostGrid';
import { LoadMoreButton } from '../../components/LoadMoreButton';
import { PostModel } from '../../shared-types/post';
import { Settings } from '../../shared-types/settings';
import { BaseTemplate } from '../Base';
import { useEffect, useState } from 'react';
import { loadPosts, LoadPostsVariables } from '../../api/load-posts';

export type PostsTemplateProps = {
  settings: Settings;
  posts?: PostModel[];
  allPosts?: PostModel[];
  variables?: LoadPostsVariables;
};

export const PostsTemplate = ({
  settings,
  posts = [],
  allPosts = [],
  variables,
}: PostsTemplateProps) => {
  const [statePosts, setStatePosts] = useState(posts);
  const [stateVariables, setStateVariables] = useState(variables);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [noMorePosts, setNoMorePosts] = useState(false);

  useEffect(() => {
    setStatePosts(posts);
    setNoMorePosts(false);
    setButtonDisabled(false);
    setStateVariables(variables);
  }, [posts, variables]);

  const handleLoadMorePosts = async () => {
    setButtonDisabled(true);

    const newVariables = {
      ...stateVariables,
      start: stateVariables.start + stateVariables.limit,
      limit: 3,
    };

    const morePosts = await loadPosts(newVariables);

    if (!morePosts || !morePosts.posts || !morePosts.posts.length) {
      setNoMorePosts(true);
      return;
    }

    setButtonDisabled(false);
    setStateVariables(newVariables);
    setStatePosts((p) => [...p, ...morePosts.posts]);
  };

  return (
    <BaseTemplate
      settings={settings}
      posts={allPosts.length ? allPosts : statePosts}
    >
      <PostGrid posts={statePosts} />

      {statePosts?.length > 0 && (
        <LoadMoreButton
          onClick={handleLoadMorePosts}
          disabled={buttonDisabled}
          noMorePosts={noMorePosts}
        />
      )}
    </BaseTemplate>
  );
};
