import React from 'react';

import { StyledHeader, HeaderContainer, Logo } from "./style";
import { Icon } from '../Icon';
import { Flexy } from '../Flexy';
import { IconButton, Button } from '../Button';

import { useGlobalState } from '../../context'
import { HeaderSearchbox } from '../Searchbox';

export const Header = ({ siteTitle, isLanding, isResults }) => {
    const [sidebarVisible, setSidebarVisible] = useGlobalState('sidebarVisible')
    const [sv, setSV] = React.useState(false);

    const onSearch = () => {
        const sb = (document.getElementById("sb") as HTMLInputElement)
        
        if(sb.value.length == 0) return;

        if(typeof(window) !== "undefined") window.location.href = `/search?q=${sb.value}`
    }

    const onKeyDown = (e) => {
        if(e.keyCode == 13) {
            onSearch()
        }
    }

    React.useState(() => {
        if(typeof(window) !== "undefined") window.addEventListener('keydown', (e) => {
            if(e.keyCode === 9) {
                const sb = document.getElementById('sb');

                e.preventDefault()

                setSidebarVisible(false)

                if(document.activeElement.id == sb.id) {
                    document.getElementById('sb').blur()
                } else {
                    document.getElementById('sb').focus()
                }
            }
            
            if((e.target as Element).id == "gatsby-focus-wrapper" || (e.target as Element) == document.body && e.keyCode === 37) {
                setSidebarVisible(true)
            }
        })
    })

    return (
        <StyledHeader>
            <HeaderContainer>
                <Flexy jc={"flex-start"}>
                    {isLanding && <IconButton size={32} onClick={() => setSidebarVisible(!sidebarVisible)}>
                        <Icon icon={"menu"} size={18} />
                    </IconButton>}
                    {isResults && <Logo />}
                    {isResults && <HeaderSearchbox 
                        placeholder={""} 
                        title={"Search"}
                        id={"sb"} 
                        onKeyDown={() => onKeyDown(event)} 
                        autoCapitalize={"off"}
                        autoComplete={"off"}
                        autoCorrect={"off"}
                        autoFocus={false} 
                    />}
                </Flexy>
                <Flexy jc={"flex-end"}>
                    <Button>Sign in</Button>
                </Flexy>
            </HeaderContainer>
        </StyledHeader>
    )
}