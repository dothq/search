import React from 'react';

import { StyledLanding, Container, Logo, Searchbox } from "./style";
import { Button } from '../Button';
import { News } from '../News';

import { useGlobalState } from '../../context'
import { navigate } from 'gatsby';

export const Landing = () => {
    let [sidebarVisible, setSidebarVisible] = useGlobalState('sidebarVisible')

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
            if(e.keyCode == 9) {
                e.preventDefault()

                setSidebarVisible(false)
                document.getElementById('sb').focus()
            }
        })
    })

    return (
        <StyledLanding>
            <Container>
                <Logo />
                <Searchbox 
                    placeholder={""} 
                    title={"Search"}
                    id={"sb"} 
                    onKeyDown={() => onKeyDown(event)} 
                    autoCapitalize={"off"}
                    autoComplete={"off"}
                    autoCorrect={"off"}
                    autoFocus={false}
                />
                <div style={{ marginTop: '44px', display: 'flex' }}>
                    <Button style={{ marginRight: '18px' }} onClick={onSearch}>Search</Button>
                    <Button>Surprise me</Button>
                </div>
            </Container>
        </StyledLanding>
    )
}