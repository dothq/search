import styled, { css } from "styled-components";

export const Flexy = styled.div`
    align-self: center;
    display: flex;
    flex: 1;

    ${({ jc }: { jc: any }) => css`
        justify-content: ${jc};
    `};
`;