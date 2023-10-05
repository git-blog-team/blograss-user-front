import ProfileManagement from '@/parts/user-setting/profile-management';
import UserGrass from '@/parts/user-setting/user-grass';
import { RowFlexStartCenter } from '@/styles/flexModules';
import styled from '@emotion/styled';
import _ from 'lodash';
import { useState } from 'react';

export default function UserSetting() {
    const [focusIndex, setFocusIndex] = useState(0);

    const tapItems = [
        { title: '프로필 관리', component: <ProfileManagement /> },
        { title: '내 잔디', component: <UserGrass /> },
        { title: '계정 관리', component: <ProfileManagement /> },
    ];

    const handleTab = (index: number) => () => {
        setFocusIndex(index);
    };
    return (
        <StyledUserSettingWrapper>
            <StyledTapWrapper>
                {_.map(tapItems, (tapItems, index) => (
                    <StyledTapItem
                        key={index}
                        isFocus={index === focusIndex}
                        onClick={handleTab(index)}
                    >
                        {tapItems.title}
                    </StyledTapItem>
                ))}
            </StyledTapWrapper>
            {tapItems[focusIndex].component}
        </StyledUserSettingWrapper>
    );
}
const StyledUserSettingWrapper = styled.div`
    position: relative;
    border-radius: 0.8rem;
    box-shadow: 0px 2px 4px 0px #bfc4d4;
    width: 100%;
    max-width: 1400px;
    height: 70vh;
    padding: 0 2rem;
    margin: 10rem 2rem 2rem 2rem;
    background-color: white;
`;
const StyledTapWrapper = styled.ul`
    ${RowFlexStartCenter};
    position: absolute;
    top: -6.3rem;
    left: 0;
    z-index: 0;
`;
const StyledTapItem = styled.li<{ isFocus: boolean }>`
    cursor: pointer;
    box-shadow: 0px 2px 4px 0px #bfc4d4;
    border-radius: 0.6rem 0.6rem 0 0;
    margin: 0 1rem 0 0;
    width: 26rem;
    line-height: 6rem;
    text-align: center;
    font-size: 1.6rem;
    font-weight: ${(props) => (props.isFocus ? 700 : 500)};
    color: ${(props) => (props.isFocus ? 'green' : 'black')};
    background-color: white;
`;
