import React, { Component } from 'react'
import { Container, Search, User } from './styles'


class Header extends Component {
    render() {
        return (
            <Container>
                <Search>
                    <input placeholder="Search" />
                </Search>

                <User>
                    <img src="https://avatars2.githubusercontent.com/u/11969565?v=4" alt="Avatar"/>
                    Juliani Schlickmann
                </User>
            </Container>
        )
    }
}

export default Header;
