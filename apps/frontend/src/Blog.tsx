import { Card } from "react-bootstrap";
import { Comment } from "./Comment";
import { PostComment } from "./PostComment";
import * as _ from "lodash"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Blog(props: {blog: any}) {

    const [rerender, setRerender] = useState(false);
    const [blog, setBlog] = useState(_.cloneDeep(props.blog))
    const navigate = useNavigate()
    
    return (
        <div className="well">
        <Card>
            <Card.Img variant="top" src={blog.imageUrl}  onClick={() => navigate("/blogs/"+blog.id)} />
            <Card.Body>
                <Card.Title>{blog.title}</Card.Title>
                <Card.Text onClick={() => navigate("/blogs/"+blog.id)}>
                    {blog.shortDescription}
                </Card.Text>
                <p className="user">By {blog.user?.email}</p>
                
                {/* <PostComment blogId={props.blog.blogId} onPostComment={(comment: any) => {
                    blog.comments.push(comment)
                    setBlog(blog)
                    setRerender(!rerender)
                }}/> */}

                {/* <div className="blog-comments">
                    {blog.comments.map(function(cmt: any, i: number) {
                        return <Comment comment={cmt} key={i+"c"} />
                    })}
                </div> */}
            </Card.Body>
        </Card>
        </div>
    )
}