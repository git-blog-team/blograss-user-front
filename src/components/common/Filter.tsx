import styled from '@emotion/styled';
import _ from 'lodash';
import { ChangeEvent, useState } from 'react';
import qs from 'query-string';
import {
    RowCenterCenter,
    RowFlexStartCenter,
    RowSpaceBetweenCenter,
} from '@/styles/flexModules';
import { useRouter } from 'next/router';
import { useEnter, useIndex } from '@/hooks/commons';
import SearchOutlined from '@ant-design/icons/SearchOutlined';

export const useFilter = ({ filterOptions, hasSearch }) => {
    const [keyword, setKeyword] = useState('');
    const [filterIndex, handleFilterIndex] = useIndex(0) as [
        number,
        (newIndex: number) => void,
    ];

    const router = useRouter();
    const { pathname, query } = router;

    const getFilterString = (filterOption, withKeyword = hasSearch) => {
        const { filterName, id, ...filterItem } = filterOption;
        const search = withKeyword ? { keyword } : {};
        const filter = { ...filterItem, ...search };

        const result = qs.stringify(filter, {
            encode: false,
        });

        return result;
    };

    const defaultFilterString: string = `${
        hasSearch ? 'keyword=&' : ''
    }${getFilterString(filterOptions[0], false)}`;

    const handleFilter = (index: number) => () => {
        router.replace({
            pathname,
            query: {
                ...query,
                filterString: getFilterString(filterOptions[index]),
            },
        });
    };

    const handleEnterKey = useEnter(handleFilter(filterIndex));

    const filterRender = () => {
        return (
            <StyledCommonFilter>
                <ul>
                    {_.map(filterOptions, (item, index: number) => (
                        <StyledFilterItem
                            key={index}
                            isSelected={index === filterIndex}
                            onClick={() => {
                                handleFilter(index)();
                                handleFilterIndex(index);
                            }}
                        >
                            {item.filterName}
                        </StyledFilterItem>
                    ))}
                </ul>
                {hasSearch && (
                    <StyledSearch>
                        <StyledSearchIcon />{' '}
                        <input
                            placeholder="검색어를 입력하세요."
                            value={keyword}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setKeyword(e.target.value)
                            }
                            onKeyDown={handleEnterKey}
                        />
                    </StyledSearch>
                )}
            </StyledCommonFilter>
        );
    };

    return { defaultFilterString, filterRender };
};

export const StyledCommonFilter = styled.div`
    ${RowSpaceBetweenCenter};
    margin: 1rem 0;
    width: 100%;
    > ul {
        ${RowFlexStartCenter};

        column-gap: 1rem;
    }
`;

const StyledFilterItem = styled.li<{ isSelected: boolean }>`
    width: 10rem;
    font-size: 1.4rem;
    text-align: center;
    color: green;
    color: ${(props) => (props.isSelected ? 'darkgreen' : 'green')};
    height: 4rem;
    line-height: 4rem;
    border-radius: 0.8rem;
    background-color: mintcream;
    font-weight: ${(props) => (props.isSelected ? '700' : '400')};
    cursor: pointer;
`;
const StyledSearch = styled.div`
    ${RowFlexStartCenter};
    > input {
        width: 25rem;
        height: 4rem;
        border-radius: 0 0.8rem 0.8rem 0;
        border: 1px solid green;
        padding: 0 1rem;
    }
`;
const StyledSearchIcon = styled(SearchOutlined)`
    ${RowCenterCenter};
    font-size: 2rem;
    color: white;
    width: 4rem;
    height: 4rem;
    border-radius: 0.8rem 0 0 0.8rem;
    background-color: green;
`;
