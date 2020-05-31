import styled, { css } from "styled-components";

export const IconButton = styled.div`
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.3s background-color, 0.2s opacity;
    border-radius: 2px;
    color: #000;

    background-color: #fff;
    box-shadow: rgba(0,0,0,0.22) 0px 5px 10px;

    &:hover {
        opacity: 0.75;
    }

    ${({ size }: { size: number }) => css`
        width: ${size}px;
        height: ${size}px;
    `};
`;

export const Button = styled.div`
    background: #fff;
    border-radius: 3px;
    padding: 5px 22px;
    text-align: center;
    color: #000;
    font-size: 15px;
    cursor: pointer;
    user-select: none;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 5px 10px;

    transition: 0.3s box-shadow;

    &:hover {
        box-shadow: rgba(0, 0, 0, 0.22) 0px 5px 10px;
    }
`;