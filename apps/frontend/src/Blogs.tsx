import { gql, useQuery } from "@apollo/client";
import react from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Blog } from "./Blog";
import { Comment } from "./Comment";
import { PostComment } from "./PostComment";

export function Blogs() {
    const GET_DOGS = gql`
            query {
                blogs {
                    blogId: id
                    content
                    user {
                        email
                    }
                    comments {
                        commentId: id
                        blogId
                        comment
                        user {
                            email
                        }
                        replies {
                            commentId: id
                            comment
                            user {
                                email
                            }
                        }
                    }
                }   
            }
        `;
    const { loading, error, data } = useQuery(GET_DOGS);

    if (loading)  return <div>Loading</div>
    if (error) return <p style={{color: "red"}}>{error.message}</p>
    
    
    return (
    <Row className="blog-container">
        {data.blogs?.map(function(blog: any){
            return (
                <Col className="col-4">
                    <Blog blog={blog} />
                </Col>
            )
        })}
    </Row>)
    
        
}