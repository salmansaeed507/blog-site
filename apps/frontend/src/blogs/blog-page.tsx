import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BlogListing } from "./blog-listing";

export function BlogPage() {
    const navigate = useNavigate()
    return (
        <>
            <p></p>
            <p><Button onClick={() => navigate('/blogs/create')}>Create Blog</Button></p>
            <BlogListing />
        </>
    )
}