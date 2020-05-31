import React from 'react';

import { StyledLanding, Container, Logo, Searchbox } from "./style";
import { Button } from '../Button';
import { News } from '../News';

import { useGlobalState } from '../../context'
import { navigate } from 'gatsby';

export const Landing = () => {
    let [logoClicksCount, setLogoClicksCount] = useGlobalState('logoClicks')

    const onLogoClick = () => {
        if(logoClicksCount == 0) {
            return setLogoClicksCount(-1)
        }

        setLogoClicksCount(++logoClicksCount)
    }

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

    return (
        <StyledLanding>
            <Container>
                <Logo onClick={onLogoClick} animate={logoClicksCount == 0} />
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