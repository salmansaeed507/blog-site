import { gql, useLazyQuery } from "@apollo/client";
import { useState } from "react";
import { Button } from "react-bootstrap"
import { Comment } from "../Comment"
import { PostComment } from "../PostComment"

const LOAD_COMMENTS = gql`
    query GetComments($blogId: String!, $cursor: String ){
        blog(blogId: $blogId){
            comments(cursor: $cursor) {
                data {
                    id
                    comment
                    user {
                        email
                    }
                    replies {
                        id
                        comment
                        user {
                            email
                        }
                    }
                }
                nextCursor
            }
        }   
    }
`;

export function BlogComments(props: {comments?: {data: any[], nextCursor: string}, blogId: string}) {

    const [comments, setComments] = useState(props?.comments?.data || [])
    const [cursor, setCursor] = useState(props?.comments?.nextCursor || [])

    const [loadComments, { loading, error, data, called }] = useLazyQuery(LOAD_COMMENTS, {
        onCompleted(data) {
            const c = data.blog.comments.data
            setComments(arr => [...arr, ...c])
            setCursor(data.blog.comments.nextCursor)
        },
    });

    return (
        <>
            <PostComment blogId={ props.blogId } onPostComment={(c:any) => setComments(arr => [...arr, c])}/>
            <div className="blog-comments col-md-6">
                {comments.map(function(cmt: any, i: number) {
                    return <Comment comment={cmt} key={i+"c"} />
                })}
                { cursor && <Button variant="link" onClick={() => {
                    loadComments({
                        variables:{
                            blogId: props.blogId,
                            cursor
                        }
                    })
                }}>Load More</Button> }
            </div>
        </>
    )
}