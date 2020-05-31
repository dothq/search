import styled, { css } from 'styled-components'

export const LinkItem = styled.div`
  font-size: 14px;
  display: flex;
  margin-bottom: 2px;
  color: white;
  text-decoration: none !important;

  a:hover, a:visited, a:link, a:active {
    text-decoration: none;
  }
  text-decoration: none !important;
  border: none;
`;

export const a = css`
  a:hover, a:visited, a:link, a:active {
    text-decoration: none;
  }
  text-decoration: none !important;
`;