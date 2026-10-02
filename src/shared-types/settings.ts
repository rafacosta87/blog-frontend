import { BlogImage } from './blog-image';

export type Settings = {
  id: string;
  blogName: string;
  blogDescription: string;
  logo: BlogImage[];
  text: string;
};
