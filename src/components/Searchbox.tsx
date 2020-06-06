import styled from 'styled-components';

export const Searchbox = styled.input`
    background: #ffffffd1;
    box-shadow: 0px 1px 30px rgba(0,0,0,0.25);
    border-radius: 4px;
    border: none;
    outline: none;
    height: 42px;
    width: 680px;
    margin-top: 88px;
    font-size: 14px;
    padding-left: 40px;
    background-image: url(/search.svg);
    background-size: 16px;
    background-repeat: no-repeat;
    background-position-x: 12px;
    background-position-y: 12px;
    backdrop-filter: blur(5px);

    transition: 0.3s transform;

    &:focus {
        transform: scale(1.025);
    }

    @media screen and (max-width: 800px) {
        & {
          width: 300px;
        }
    }
`;

export const HeaderSearchbox = styled.input`
  background: #ffffffd1;
  box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  border: none;
  outline: none;
  height: 32px;
  width: 680px;
  font-size: 14px;
  padding-left: 40px;
  margin-left: 53px;
  background-image: url(/search.svg);
  background-size: 16px;
  background-repeat: no-repeat;
  background-position-x: 12px;
  background-position-y: 9px;
  backdrop-filter: blur(5px);

  transition: 0.3s transform;

  &:focus {
    transform: scale(1.025);
  }
`;