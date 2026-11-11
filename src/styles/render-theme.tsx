//arquivo para renderizar o componente com o contexto do tema do blog, para que os testes possam ser feitos com o tema correto.
import { render, RenderResult } from '@testing-library/react';
import { BlogThemeProvider } from '../contexts/BlogThemeContext';

export const renderTheme = (children: React.ReactNode): RenderResult => {
  return render(<BlogThemeProvider>{children}</BlogThemeProvider>);
};
