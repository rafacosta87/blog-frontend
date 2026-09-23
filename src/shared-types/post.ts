import { PostProps } from '../components/Post';
import { PostTag } from './tag';

export type PostModel = PostProps & {
  tags: PostTag[];
  slug: string;
  allowComments: boolean;
};
