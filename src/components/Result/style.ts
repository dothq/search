import styled, { css } from 'styled-components';

export const StyledResult = styled.div`
  margin-bottom: 28px;
`;

export const StyledResultURL = styled.div`
  display: flex;
  font-size: 14px; 
  height: 28px;
  align-content: center;
  text-align: center;
`;

export const ResultFavicon = styled.div`
  ${({ favicon }: { favicon: any}) => css`
    background-image: url(${favicon});
  `}
  width: 16px;
  height: 16px;
  margin-right: 5px;
  margin-top: 5px;
`;

export const ResultURL = styled.span`
  overflow: hidden;
  whitespace: nowrap; 
  text-overflow: ellipsis;
`;

export const ResultLink = styled.a`
  ${({ color }: { color: any}) => css`
    color: ${color || '#1a0dab'};
  `}

  &:hover {
    text-decoration: underline;
  }
`;

export const ResultTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 4px;
  font-weight: 400;
  width: 625px;
  overflow: hidden;
  whitespace: nowrap;
  text-overflow: ellipsis;
`;

export const ResultContent = styled.div`
  font-size: 14px;
`;