import React from 'react';

import { StyledHeader, HeaderContainer } from "./style";
import { Icon } from '../Icon';
import { Flexy } from '../Flexy';
import { IconButton, Button } from '../Button';

export const Header = () => (
    <StyledHeader>
        <HeaderContainer>
            <Flexy jc={"flex-start"}>
                <IconButton size={32}>
                    <Icon icon={"menu"} size={18} />
                </IconButton>
            </Flexy>
            <Flexy jc={"flex-end"}>
                <Button>Sign in</Button>
            </Flexy>
        </HeaderContainer>
    </StyledHeader>
)