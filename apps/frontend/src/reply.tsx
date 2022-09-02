import { cloneDeep } from "lodash";
import react, { useState } from "react";

export function Reply(props: {comment: any}) {
    const [comment] = useState(cloneDeep(props.comment))
    return (
        <div className="comment-wrap reply">
            <div className="comment">
                {comment.comment}
                <div className="user">By {comment.user?.email}</div>
            </div>
        </div>
    )
}