import { postAPI } from '@/api/postAPI';
import { PostItem } from '@/types/postType';
import { useQuery } from '@tanstack/react-query';

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
                        <article>
                            <h2>title : {postItem.title}</h2>
                            <p>content : {postItem.content}</p>
                        </article>
                    </li>
                ))}
            </ol>
        </div>
    );
}
