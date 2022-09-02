import { gql, useQuery } from "@apollo/client";
import { Card } from "react-bootstrap";
import { Loading } from "../Loading";
import { BlogComments } from "./blog-comments";

const GET_BLOG = gql`
    query GetBlog($blogId: String!){
        blog(blogId: $blogId){
            id
            title
            description
            shortDescription
            content
            imageUrl
            user {
                email
            }
            comments {
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

export function SingleBlog(props: {id: string | undefined}) {
    
    const { loading, error, data } = useQuery(GET_BLOG, {
        variables: {
            blogId: props.id
        }
    });

    if (loading) return <Loading />
    if (error) return <div>Error!</div>
    
    const blog = data.blog
    
    return (
        <div className="well">
            <Card>
                <Card.Img variant="top" src={blog.imageUrl} style={{height: "400px", width: "auto"}}  />
                <Card.Body>
                    <Card.Title>{blog.title}</Card.Title>
                    <Card.Text>
                        {blog.content}
                    </Card.Text>
                    <p className="user">By {blog.user?.email}</p>
                    
                    <BlogComments comments={blog.comments} blogId={blog.id} />
                    
                </Card.Body>
            </Card>
        </div>
    )
}