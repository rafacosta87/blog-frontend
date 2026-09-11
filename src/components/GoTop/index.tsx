import React, { useEffect, useState } from 'react';
import * as Styled from './styles';
import { KeyboardArrowUp } from '@styled-icons/material-outlined/KeyboardArrowUp';

export const GoTop = () => {
  // Estado para controlar se o botão deve ser exibido ou não
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Se o usuário rolar mais de 300 pixels para baixo, mostra o botão
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    // Adiciona o ouvinte de evento de scroll na janela do navegador
    window.addEventListener('scroll', toggleVisibility);

    // Limpa o evento da memória quando o componente sai da tela
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Se não for visível, o React não renderiza nada
  if (!visible) return null;

  return (
    <Styled.Container href="#" aria-label="Go to top" title="Go to top">
      <KeyboardArrowUp />
    </Styled.Container>
  );
};
