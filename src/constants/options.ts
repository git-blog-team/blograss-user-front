export const postListFilterOptions = [
    {
        id: 1,
        filterName: '최신순',
        sortField: 'createdAt',
        sortOrder: 'DESC',
        limit: 20,
        page: 1,
    },
    // TODO :오래된순 대신 인기순 필터적용필요
    {
        id: 2,
        filterName: '오래된순',
        sortField: 'createdAt',
        sortOrder: 'ASC',
        limit: 20,
        page: 1,
    },
];

export const userPostListFilterOptions = (userId: string) => [
    {
        id: 1,
        filterName: '최신순',
        userId: userId,
        sortField: 'createdAt',
        sortOrder: 'DESC',
        limit: 20,
        page: 1,
    },
    // TODO :오래된순 대신 인기순 필터적용필요
    {
        id: 2,
        filterName: '오래된순',
        userId: userId,
        sortField: 'createdAt',
        sortOrder: 'ASC',
        limit: 20,
        page: 1,
    },
];
