import * as Styled from './styles';
import { Post } from '../../components/Post';
import { PostTags } from '../../components/PostTags';
import { PostStrapi } from '../../shared-types/post-strapi';
import { SettingsStrapi } from '../../shared-types/settings-strapi';
import { BaseTemplate } from '../Base';
import { Comments } from '../../components/Comments';

export type PostTemplateProps = {
  settings: SettingsStrapi;
  post: PostStrapi;
  allPosts?: PostStrapi[];
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
