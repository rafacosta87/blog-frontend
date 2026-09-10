/* eslint-disable no-case-declarations */
import { fetchJson, getStrapiUploadsUrl } from './rest';
import { PostStrapi } from '../shared-types/post-strapi';
import { SettingsStrapi } from '../shared-types/settings-strapi';

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

export type StrapiPostAndSettings = {
  setting: SettingsStrapi;
  posts: PostStrapi[];
  variables?: LoadPostsVariables;
};

export const defaultLoadPostsVariables: LoadPostsVariables = {
  sort: 'createdAt:desc',
  start: 0,
  limit: 6,
};

// Helper to format image paths into StrapiImage array format expected by React components
const formatCoverImage = (coverPath?: string, id = '1') => {
  if (!coverPath) return [];
  const fullUrl = coverPath.startsWith('http')
    ? coverPath
    : getStrapiUploadsUrl(coverPath);
  return [
    {
      id: String(id),
      alternativeText: 'Cover Image',
      url: fullUrl,
    },
  ];
};

const formatBlock = (block: any): string => {
  if (!block) return '';
  if (typeof block === 'string') return block;

  // Handle Strapi v4 Rich Text / Blocks Editor (type & children)
  if (block.type) {
    const childrenText = Array.isArray(block.children)
      ? block.children.map((child: any) => child.text || '').join('')
      : '';

    switch (block.type) {
      case 'paragraph':
        return `<p>${childrenText}</p>`;
      case 'heading':
        const level = block.level || 2;
        return `<h${level}>${childrenText}</h${level}>`;
      case 'list':
        const tag = block.format === 'ordered' ? 'ol' : 'ul';
        const items = Array.isArray(block.children)
          ? block.children
              .map((item: any) => `<li>${formatBlock(item)}</li>`)
              .join('')
          : childrenText;
        return `<${tag}>${items}</${tag}>`;
      case 'quote':
        return `<blockquote><p>${childrenText}</p></blockquote>`;
      case 'image':
        const url = block.image?.url
          ? getStrapiUploadsUrl(block.image.url)
          : '';
        return url
          ? `<img src="${url}" alt="${block.image?.alternativeText || ''}" />`
          : '';
      default:
        return childrenText ? `<p>${childrenText}</p>` : '';
    }
  }

  // Handle Strapi Dynamic Zone components (__component)
  if (block.__component === 'shared.rich-text') {
    return block.body || '';
  }
  if (block.__component === 'shared.quote') {
    return `<blockquote><p>${block.body || ''}</p><cite>${
      block.title || ''
    }</cite></blockquote>`;
  }
  if (block.__component === 'shared.media' && block.file) {
    const imgUrl = getStrapiUploadsUrl(`/uploads/${block.file}`);
    return `<img src="${imgUrl}" alt="Media" />`;
  }

  // Fallback for objects with body/title/text
  if (block.body) return block.body;
  if (block.text) return block.text;

  return '';
};

const formatContent = (content: any): string => {
  if (!content) return '';

  let parsedContent = content;

  // If content is a JSON string, try to parse it
  if (typeof content === 'string') {
    if (content.trim().startsWith('<')) {
      // It's already HTML string
      return content;
    }
    try {
      parsedContent = JSON.parse(content);
    } catch (e) {
      return content; // Plain string / HTML
    }
  }

  // If content is an array of blocks/objects
  if (Array.isArray(parsedContent)) {
    return parsedContent.map(formatBlock).filter(Boolean).join('');
  }

  // If content is a single object
  if (typeof parsedContent === 'object') {
    return formatBlock(parsedContent);
  }

  return String(parsedContent);
};

// Helper to format raw post from Node REST into PostStrapi format expected by frontend
const formatPost = (rawPost: any): PostStrapi => {
  const formattedContent = formatContent(rawPost.content);

  const authorName =
    rawPost.author?.name || rawPost.author?.displayName || 'Author';
  // Gera um slug amigável a partir do nome do autor (ex: "Otávio Miranda" -> "otavio-miranda")
  const authorSlug =
    rawPost.author?.slug ||
    authorName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-*|-*$/g, '');

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
      slug:
        cat.slug || (cat.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    })),
    tags: (rawPost.tags || []).map((tag: any) => ({
      id: String(tag.id),
      displayName: tag.displayName || tag.name || '',
      slug:
        tag.slug ||
        (tag.displayName || tag.name || '')
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-'),
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
): Promise<StrapiPostAndSettings> => {
  const mergedVariables = {
    ...defaultLoadPostsVariables,
    ...variables,
  };

  const { categorySlug, postSlug, postSearch, authorSlug, tagSlug } =
    mergedVariables;

  // 1. Fetch Global Settings
  let setting: SettingsStrapi = {} as SettingsStrapi;
  try {
    const rawSetting = await fetchJson('/settings');
    setting = {
      id: String(rawSetting.id || '1'),
      blogName: rawSetting.blogName || '',
      blogDescription: rawSetting.blogDescription || '',
      text: rawSetting.text || '',
      logo: formatCoverImage(rawSetting.logo, 'logo'),
      menuLink: rawSetting.menuLinks || rawSetting.menuLink || [],
    } as SettingsStrapi;
  } catch (e) {
    console.error('Error fetching settings:', e);
  }

  // 2. Fetch Posts
  let posts: PostStrapi[] = [];

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
