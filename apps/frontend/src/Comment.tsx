import { cloneDeep } from "lodash";
import react, { useState } from "react";
import { PostReply } from "./PostReply";
import { Reply } from "./reply";

export function Comment(props: {comment: any}) {
    const [comment, setComment] = useState(cloneDeep(props.comment))
    const [replies, setReplies] = useState(props.comment.replies)

    return (
        <div className="comment-wrap">
            <div className="comment">
                {comment.comment}
                <div className="user">By {comment.user?.email}</div>
                <div>
                    <PostReply commentId={comment.id} onPostReply={(cmt: any) => setReplies((r: any) => [...r, cmt])} />
                </div>
            </div>
            { replies?.map(function(c: any, i: number){
                return <Reply comment={c} key={i+"e"} />
            })}
        </div>
    )
}