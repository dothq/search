import React from 'react';

import { StyledHeader, HeaderContainer } from "./style";
import { Icon } from '../Icon';
import { Flexy } from '../Flexy';
import { IconButton, Button } from '../Button';

import { useGlobalState } from '../../context'

export const Header = ({ siteTitle }) => {
    const [sidebarVisible, setSidebarVisible] = useGlobalState('sidebarVisible')

    return (
        <StyledHeader>
            <HeaderContainer>
                <Flexy jc={"flex-start"}>
                    <IconButton size={32} onClick={() => setSidebarVisible(!sidebarVisible)}>
                        <Icon icon={"menu"} size={18} />
                    </IconButton>
                </Flexy>
                <Flexy jc={"flex-end"}>
                    <Button>Sign in</Button>
                </Flexy>
            </HeaderContainer>
        </StyledHeader>
    )
}