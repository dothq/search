import React from 'react';

import { StyledLanding, Container, Logo, Searchbox } from "./style";
import { Button } from '../Button';

export const Landing = () => (
    <StyledLanding>
        <Container>
            <Logo />
            <Searchbox />
            <div style={{ marginTop: '44px', display: 'flex' }}>
                <Button style={{ marginRight: '18px' }}>Search</Button>
                <Button>Something random</Button>
            </div>
        </Container>
    </StyledLanding>
)