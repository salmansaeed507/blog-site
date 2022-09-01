import { useParams } from "react-router-dom";
import { SingleBlog } from "./single-blog";

export function SingleBlogPage() {
    const {id} = useParams()

    return (
        <>
            <SingleBlog id={id}/>
        </>
    )
}