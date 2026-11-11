import { defaultLoadPostsVariables, loadPosts } from './load-posts';
import * as restModule from './rest';

jest.mock('./rest');

describe('load-posts', () => {
  const mockSetting = {
    id: '1',
    blogName: 'Test Blog',
    blogDescription: 'Description',
    text: 'Footer text',
    logo: '/uploads/logo.jpg',
    menuLinks: [],
  };

  const mockPosts = [
    {
      id: 1,
      title: 'Post 1',
      slug: 'post-1',
      excerpt: 'Excerpt 1',
      content: 'Content 1',
      allowComments: true,
      createdAt: '2023-01-01',
      cover: '/uploads/cover.jpg',
      author: { id: 1, name: 'Author', slug: 'author' },
      categories: [{ id: 1, name: 'Category', slug: 'category' }],
      tags: [{ id: 1, displayName: 'Tag', slug: 'tag' }],
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call fetchJson for settings and posts with default variables', async () => {
    (restModule.fetchJson as jest.Mock).mockImplementation((path) => {
      if (path === '/settings') return Promise.resolve(mockSetting);
      if (path.startsWith('/posts?')) return Promise.resolve(mockPosts);
      return Promise.resolve({});
    });

    const result = await loadPosts();

    expect(restModule.fetchJson).toHaveBeenCalledWith('/settings');
    expect(restModule.fetchJson).toHaveBeenCalledWith(
      '/posts?start=0&limit=6',
    );
    expect(result.posts).toHaveLength(1);
    expect(result.posts[0].title).toBe('Post 1');
  });

  it('should fetch single post when postSlug is provided', async () => {
    (restModule.fetchJson as jest.Mock).mockImplementation((path) => {
      if (path === '/settings') return Promise.resolve(mockSetting);
      if (path === '/posts/post-1') return Promise.resolve(mockPosts[0]);
      return Promise.resolve({});
    });

    const result = await loadPosts({ postSlug: 'post-1' });

    expect(restModule.fetchJson).toHaveBeenCalledWith('/posts/post-1');
    expect(result.posts).toHaveLength(1);
    expect(result.posts[0].slug).toBe('post-1');
  });
});
