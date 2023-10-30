import { useIndex } from '@/hooks/commons';
import ProfileManagement from '@/parts/user-setting/profile-management';
import UserGrass from '@/parts/user-setting/user-grass';
import {
    StyledCommonWhiteWrapper,
    StyledTapItem,
    StyledTapWrapper,
} from '@/styles/common';
import styled from '@emotion/styled';
import _ from 'lodash';

export default function UserSetting() {
    const [focusIndex, handleTab] = useIndex() as [
        number,
        (newIndex: number) => void,
    ];

    const tapItems = [
        { title: '프로필 관리', component: <ProfileManagement /> },
        { title: '내 잔디', component: <UserGrass /> },
        { title: '계정 관리', component: <ProfileManagement /> },
    ];

    return (
        <StyledUserSettingWrapper>
            <StyledTapWrapper>
                {_.map(tapItems, (tapItems, index) => (
                    <StyledTapItem
                        key={index}
                        isFocus={index === focusIndex}
                        onClick={() => handleTab(index)}
                    >
                        {tapItems.title}
                    </StyledTapItem>
                ))}
            </StyledTapWrapper>

            {tapItems[focusIndex].component}
        </StyledUserSettingWrapper>
    );
}
const StyledUserSettingWrapper = styled(StyledCommonWhiteWrapper)`
    margin: 3rem 2rem 2rem 2rem;
`;
