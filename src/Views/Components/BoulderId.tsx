import styled from 'styled-components'
import {gradeBackgroundColor, gradeBorderColor, gradeColor} from '../../Materials/Colors'

export const BoulderId = styled.div<{ $grade: string }>`
    width: 32px;
    height: 32px;
    border-radius: 100%;
    border: 2px solid transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 22px;
    line-height: 1;
    box-shadow: 0 0 4px rgba(99, 85, 25, .5);
    font-family: 'Advent Pro';
    transition: box-shadow .2s;
    flex: 0 0 32px;

    background-color: ${({ $grade }) => gradeBackgroundColor($grade)};
    border-color: ${({ $grade }) => gradeBorderColor($grade)};
    color: ${({ $grade }) => gradeColor($grade)};
    transition: transform .2s;

    @media (min-width: 480px) {
        width: 48px;
        height: 48px;
        flex: 0 0 48px;
        font-size: 36px;
    }
`

export const BoulderId24 = styled.div<{ $grade: string }>`
    width: 24px;
    height: 24px;
    border-radius: 100%;
    border: 2px solid transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    line-height: 1;
    box-shadow: 0 0 4px rgba(99, 85, 25, .5);
    font-family: 'Advent Pro';
    transition: box-shadow .2s;
    flex: 0 0 24px;

    background-color: ${({ $grade }) => gradeBackgroundColor($grade)};
    border-color: ${({ $grade }) => gradeBorderColor($grade)};
    color: ${({ $grade }) => gradeColor($grade)};
    transition: transform .2s;
`
