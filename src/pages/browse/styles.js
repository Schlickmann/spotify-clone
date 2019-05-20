import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Spinner } from '../../components/Loading/styles';

export const Container = styled.div`
    display: flex;
    flex: 1;
    margin-top: 110px;
    flex-direction: column;
`;


export const Title = styled.h1`
    font-size: 48px;

    ${Spinner} {
        height: 24px;
    }
`;


export const List = styled.div`
    display: flex;
    margin-top: 20px;
`;

export const Playlist = styled(Link)`
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    width: 250px;
    text-decoration: none;

    img {
        height: 250px;
    }

    strong {
        font-size: 13px;
        margin-top: 10px;
        color: #fff;
    }

    p {
        line-height: 22px;
        font-size: 13px;
        margin-top: 5px;
        color: #b3b3b3;
    }

    &:hover img {
        opacity: 0.4;
    }

    &:first-child {
        margin: 0;
    }
`;
