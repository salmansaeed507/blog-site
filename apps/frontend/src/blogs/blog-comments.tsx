import { gql, useLazyQuery } from "@apollo/client";
import { useState } from "react";
import { Button } from "react-bootstrap"
import { Comment } from "../Comment"
import { PostComment } from "../PostComment"

const LOAD_COMMENTS = gql`
    query GetComments($blogId: String!, $offset: Int ){
        blog(blogId: $blogId){
            comments(offset: $offset) {
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
        }   
    }
`;

export function BlogComments(props: {comments?: any[], blogId: string}) {

    const [comments, setComments] = useState(props.comments || [])
    const [offset, setOffset] = useState(5)
    const [isCommentsFinished, setIsCommentsFinished] = useState(false)

    const [loadComments, { loading, error, data, called }] = useLazyQuery(LOAD_COMMENTS, {
        onCompleted(data) {
            const c = data.blog.comments
            setComments(arr => [...arr, ...c])
            if (c.length < 5) {
                setIsCommentsFinished(true)
            }
            setOffset(offset + 5)
        },
    });

    return (
        <>
            <PostComment blogId={ props.blogId } onPostComment={(c:any) => setComments(arr => [...arr, c])}/>
            <div className="blog-comments col-md-6">
                {comments.map(function(cmt: any, i: number) {
                    return <Comment comment={cmt} key={i+"c"} />
                })}
                { !isCommentsFinished && <Button variant="link" onClick={() => {
                    loadComments({
                        variables:{
                            blogId: props.blogId,
                            offset
                        }
                    })
                }}>Load More</Button> }
            </div>
        </>
    )
}