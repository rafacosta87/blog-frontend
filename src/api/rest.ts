export const fetchJson = async (path: string, options?: RequestInit) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
  const response = await fetch(`${apiUrl}${path}`, options);
  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }
  return response.json();
};

export const getStrapiUploadsUrl = (relativePath: string) => {
  const uploadsUrl =
    process.env.NEXT_PUBLIC_UPLOADS_URL || 'http://localhost:3000';
  if (!relativePath) return '';
  if (relativePath.startsWith('http')) return relativePath;
  const cleanPath = relativePath.startsWith('/')
    ? relativePath
    : `/${relativePath}`;
  return `${uploadsUrl}${cleanPath}`;
};
