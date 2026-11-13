import { screen } from '@testing-library/react';
import { renderTheme } from '../../styles/render-theme';
import { SearchInput } from '.';

// Mock do useRouter do Next.js
// eslint-disable-next-line @typescript-eslint/no-var-requires
const useRouter = jest.spyOn(require('next/router'), 'useRouter');

useRouter.mockImplementation(() => ({
  query: { q: '' },
  push: jest.fn().mockResolvedValue(true),
}));

describe('<SearchInput />', () => {
  it('should render search input', () => {
    renderTheme(<SearchInput />);

    const input = screen.getByPlaceholderText('Encontre posts');
    const searchIcon = screen.getByLabelText('Pesquisar');

    expect(input).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();
  });
});
