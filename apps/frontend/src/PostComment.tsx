import { gql, useMutation } from "@apollo/client"
import { useState } from "react"
import { Button } from "react-bootstrap"
import { Loading } from "./Loading"

const POST_COMMENT = gql`
    mutation PostComment($blogId: String!, $postCommentInput: PostCommentInput!) {
        postComment(blogId: $blogId, postCommentInput: $postCommentInput) {
            id
            blogId
            comment
            user {
                email
            }
            replies {
                id
                comment
            }
        }
    }
`;

export function PostComment(props: {blogId: string, parentId?: string, text?: string, onPostComment?: Function}) {

    const [isopen, setIsopen] = useState(false)
    const [comment, setComment] = useState("")
    
    const [postComment, { loading, error, called }] = useMutation(POST_COMMENT, {
        onCompleted(data) {
            props.onPostComment && props.onPostComment(data.postComment)
            setIsopen(false)
            setComment("")
        }
    });

    if (called && loading) return <Loading />
    if (error) return <p style={{color:"red"}}>{error.message}</p>

    return (
        <div>
            {
            !isopen 
            ? <Button variant="link" size="sm" onClick={(e) => setIsopen(!isopen)}>Comment</Button>
            : (
                <div>
                    <p><textarea autoFocus className="form-control" value={comment} onChange={(e) => setComment(e.target.value)}/></p>
                    <p>
                        <Button variant="primary" size="sm" onClick={() => postComment({
                            variables: {
                                blogId: props.blogId,
                                postCommentInput: {
                                    comment
                                }
                            }
                        })}>Post Comment</Button>
                        <Button variant="link" size="sm" onClick={(e) => setIsopen(!isopen)}>Cancel</Button>
                    </p>
                </div>
            )
            }
        </div>
    )
}