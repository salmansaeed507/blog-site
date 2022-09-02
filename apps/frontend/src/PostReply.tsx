import { gql, useMutation } from "@apollo/client"
import { useState } from "react"
import { Button } from "react-bootstrap"
import { Loading } from "./Loading"

const POST_REPLY = gql`
mutation PostReply($commentId: String!, $postReplyInput: PostReplyInput!){
    postReply(commentId: $commentId, postReplyInput: $postReplyInput) {
        id
        comment
        user {
            email
        }
    }
}
`;

export function PostReply(props: {commentId: string, onPostReply?: Function}) {

    const [isopen, setIsopen] = useState(false)
    const [comment, setComment] = useState("")
   
    const [postReply, { loading, error, called }] = useMutation(POST_REPLY, {
        onCompleted(data) {
            props.onPostReply && props.onPostReply(data.postReply)
            setIsopen(false)
            setComment("")
        },
    });

    if (called && loading) return <Loading />
    if (error) return <p style={{color:"red"}}>{error.message}</p>

    return (
        <div>
            {!isopen ?
            <Button variant="link" size="sm" onClick={(e) => setIsopen(!isopen)}>Reply</Button> :
            (
                <div>
                    <p><textarea autoFocus className="form-control" value={comment} onChange={(e) => setComment(e.target.value)}/></p>
                    <p>
                        <Button variant="primary" size="sm" onClick={() => postReply({
                            variables: {
                                commentId: props.commentId,
                                postReplyInput: {
                                    comment: comment,
                                }
                            }
                        })}>Post Reply</Button>
                        <Button variant="link" size="sm" onClick={(e) => setIsopen(!isopen)}>Cancel</Button>
                    </p>
                </div>
            )}
        </div>
    )
}