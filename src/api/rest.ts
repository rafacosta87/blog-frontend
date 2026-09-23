export const fetchJson = async (path: string, options: RequestInit = {}) => {
  const url = `${
    process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'
  }${path}`;
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Error fetching ${url}: ${response.statusText}`);
  }
  return response.json();
};

export const getApiUploadsUrl = (relativePath: string) => {
  const uploadsUrl =
    process.env.NEXT_PUBLIC_UPLOADS_URL || 'http://localhost:3000';
  if (relativePath.startsWith('http')) return relativePath;
  return `${uploadsUrl}${
    relativePath.startsWith('/') ? '' : '/'
  }${relativePath}`;
};
