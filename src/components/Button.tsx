import styled, { css } from "styled-components";

export const IconButton = styled.div`
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.3s background-color;
    border-radius: 2px;

    &:hover {
        background-color: #eeeeee2b;
    }

    ${({ size }: { size: number }) => css`
        width: ${size}px;
        height: ${size}px;
    `};
`;

export const Button = styled.div`
    background: #000000;
    border-radius: 3px;
    padding: 5px 22px;
    text-align: center;
    color: white;
    font-size: 15px;
    cursor: pointer;
    user-select: none;

    transition: 0.3s box-shadow;

    &:hover {
        box-shadow: 0 0 15px 8px #00000026;
    }
`;