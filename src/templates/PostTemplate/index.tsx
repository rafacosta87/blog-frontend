import * as Styled from './styles';
import { Post } from '../../components/Post';
import { PostTags } from '../../components/PostTags';
import { PostModel } from '../../shared-types/post';
import { Settings } from '../../shared-types/settings';
import { BaseTemplate } from '../Base';
import { Comments } from '../../components/Comments';

export type PostTemplateProps = {
  settings: Settings;
  post: PostModel;
  allPosts?: PostModel[];
};

export const PostTemplate = ({
  settings,
  post,
  allPosts = [],
}: PostTemplateProps) => {
  return (
    <BaseTemplate
      settings={settings}
      posts={allPosts.length ? allPosts : [post]}
    >
      <Post {...post} />

      <Styled.TagsContainer>
        <PostTags tags={post.tags} />
      </Styled.TagsContainer>

      <Comments
        title={post.title}
        slug={post.slug}
        id={post.id}
        allowComments={post.allowComments}
      />
    </BaseTemplate>
  );
};
