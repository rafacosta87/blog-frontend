/* eslint-disable no-case-declarations */
import { fetchJson, getApiUploadsUrl } from './rest';
import { PostModel } from '../shared-types/post';
import { Settings } from '../shared-types/settings';

export type LoadPostsVariables = {
  categorySlug?: string;
  postSlug?: string;
  postSearch?: string;
  authorSlug?: string;
  tagSlug?: string;
  sort?: string;
  start?: number;
  limit?: number;
};

export type PostsAndSettings = {
  setting: Settings;
  posts: PostModel[];
  variables?: LoadPostsVariables;
};

export const defaultLoadPostsVariables: LoadPostsVariables = {
  sort: 'createdAt:desc',
  start: 0,
  limit: 6,
};

// Função auxiliar para formatar caminhos de imagens em array de BlogImage esperado pelos componentes React
const formatCoverImage = (coverPath?: string, id = '1') => {
  if (!coverPath) return [];
  const fullUrl = coverPath.startsWith('http')
    ? coverPath
    : getApiUploadsUrl(coverPath);
  return [
    {
      id: String(id),
      alternativeText: 'Cover Image',
      url: fullUrl,
    },
  ];
};

const formatContent = (content: any): string => {
  if (!content) return '';
  return typeof content === 'string' ? content : String(content);
};

// Função auxiliar para formatar requisições brutas da API REST do Node.js para o modelo esperado no frontend
const formatPost = (rawPost: any): PostModel => {
  const formattedContent = formatContent(rawPost.content);

  const authorName =
    rawPost.author?.name || rawPost.author?.displayName || 'Author';
  const authorSlug = rawPost.author?.slug || 'author';
  return {
    id: String(rawPost.id),
    title: rawPost.title || '',
    slug: rawPost.slug || '',
    excerpt: rawPost.excerpt || '',
    content: formattedContent,
    allowComments: rawPost.allowComments ?? true,
    createdAt: rawPost.createdAt || new Date().toISOString(),
    cover: formatCoverImage(rawPost.cover, rawPost.id),
    categories: (rawPost.categories || []).map((cat: any) => ({
      id: String(cat.id),
      displayName: cat.name || cat.displayName || '',
      slug: cat.slug || '',
    })),
    tags: (rawPost.tags || []).map((tag: any) => ({
      id: String(tag.id),
      displayName: tag.displayName || tag.name || '',
      slug: tag.slug || '',
    })),
    author: {
      id: String(rawPost.author?.id || '1'),
      displayName: authorName,
      slug: authorSlug,
    },
  };
};

export const loadPosts = async (
  variables: LoadPostsVariables = {},
): Promise<PostsAndSettings> => {
  const mergedVariables = {
    ...defaultLoadPostsVariables,
    ...variables,
  };

  const { categorySlug, postSlug, postSearch, authorSlug, tagSlug } =
    mergedVariables;

  // 1. Buscar Configurações Globais da API REST Node.js
  let setting: Settings = {} as Settings;
  try {
    const rawSetting = await fetchJson('/settings');
    setting = {
      id: String(rawSetting.id || '1'),
      blogName: rawSetting.blogName || '',
      blogDescription: rawSetting.blogDescription || '',
      text: rawSetting.text || '',
      logo: formatCoverImage(rawSetting.logo, 'logo'),
      menuLink: rawSetting.menuLinks || rawSetting.menuLink || [],
    } as Settings;
  } catch (e) {
    console.error('Error fetching settings:', e);
  }

  // 2. Buscar Posts da API REST Node.js
  let posts: PostModel[] = [];

  if (postSlug) {
    try {
      const singlePost = await fetchJson(`/posts/${postSlug}`);
      if (singlePost && singlePost.id) {
        posts = [formatPost(singlePost)];
      }
    } catch (e) {
      console.error(`Error fetching post with slug ${postSlug}:`, e);
    }
  } else {
    const query = new URLSearchParams();
    if (categorySlug) query.append('category', categorySlug);
    if (authorSlug) query.append('author', authorSlug);
    if (tagSlug) query.append('tag', tagSlug);
    if (mergedVariables.start !== undefined)
      query.append('start', String(mergedVariables.start));
    if (mergedVariables.limit !== undefined)
      query.append('limit', String(mergedVariables.limit));

    try {
      const rawPosts = await fetchJson(`/posts?${query.toString()}`);
      if (Array.isArray(rawPosts)) {
        posts = rawPosts.map(formatPost);
      }
    } catch (e) {
      console.error('Error fetching posts list:', e);
    }

    if (postSearch && posts.length > 0) {
      const searchLower = postSearch.toLowerCase();
      posts = posts.filter(
        (post) =>
          post.title?.toLowerCase().includes(searchLower) ||
          post.excerpt?.toLowerCase().includes(searchLower),
      );
    }
  }

  return {
    setting,
    posts,
    variables: mergedVariables,
  };
};
