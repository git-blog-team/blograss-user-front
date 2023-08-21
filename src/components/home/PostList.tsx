import { postAPI } from '@/api/postAPI';
import { BLOGRASS_BASE_URL } from '@/constants/api';
import { PostItem } from '@/types/postType';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

export default function PostList() {
    const { data } = useQuery({
        queryKey: ['getPostList'],
        queryFn: postAPI.getPostList,
    });

    return (
        <div>
            <ol>
                {data?.data.result[0].content.map((postItem: PostItem) => (
                    <li key={postItem.postId}>
                        <Link
                            href={`${BLOGRASS_BASE_URL}/post/${postItem.postId}`}
                        >
                            <article>
                                <h2>title : {postItem.title}</h2>
                                <p>content : {postItem.content}</p>
                            </article>
                        </Link>
                    </li>
                ))}
            </ol>
        </div>
    );
}
