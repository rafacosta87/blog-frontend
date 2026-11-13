import { screen, fireEvent } from '@testing-library/react';
import { renderTheme } from '../../styles/render-theme';
import { LoadMoreButton } from '.';

describe('<LoadMoreButton />', () => {
  it('should render button with "Carregar mais" text', () => {
    const fn = jest.fn();
    renderTheme(<LoadMoreButton onClick={fn} />);

    const button = screen.getByRole('button', { name: /carregar mais/i });
    expect(button).toBeInTheDocument();
    expect(button).toBeEnabled();
  });

  it('should call onClick function when button is clicked', () => {
    const fn = jest.fn();
    renderTheme(<LoadMoreButton onClick={fn} />);

    const button = screen.getByRole('button', { name: /carregar mais/i });
    fireEvent.click(button);

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should render loading state when disabled is true', () => {
    const fn = jest.fn();
    renderTheme(<LoadMoreButton onClick={fn} disabled={true} />);

    const button = screen.getByRole('button', { name: /carregando posts/i });
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it('should render "Sem mais posts" text when noMorePosts is true', () => {
    const fn = jest.fn();
    renderTheme(<LoadMoreButton onClick={fn} noMorePosts={true} />);

    const button = screen.getByRole('button', { name: /sem mais posts/i });
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });
});
