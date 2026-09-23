import { BlogImage } from './blog-image';

export type MenuPropsLinks = {
  id: string;
  link: string;
  newTab?: boolean;
  text: string;
};

export type Settings = {
  id: string;
  blogName: string;
  blogDescription: string;
  logo: BlogImage[];
  menuLink: MenuPropsLinks[];
  text: string;
};
