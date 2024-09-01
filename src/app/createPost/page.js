'use client'
import { Col, Container, Row } from "react-bootstrap";
import Image from "next/image";
import image1 from '../../../public/images/image.png';
import '../../../public/pages/sass/stylePages/post.scss';
import { IoMdAddCircle } from "react-icons/io";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getPost } from "@/helpers/ulilits";
import Swal from "sweetalert2";



const CreatePost = () => {
    const router = useRouter()


    const postform = {
        title: '',
        description: ''
    }
    const [post, setPost] = useState(postform)

    const handlechange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value })
    }

    const handlesubmit = async (e) => {
        e.preventDefault()
        await getPost('http://192.168.1.36:4000/blog/add', post)
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
        Toast.fire({
            icon: "success",
            title: "Your blog created successfully"
        });

        router.push("/blogs")
        setPost(postform)
    }



    return (
        <>
            <div className="postSection">
                <Container>
                    <Row>
                        <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}>
                            <div className="postArea">
                                <div className="newpage">
                                    <Link href='/blogs'>
                                        <div className="newbtn">
                                            View All Post
                                        </div>
                                    </Link>
                                </div>
                                <div className="formArea">
                                    <form onSubmit={handlesubmit}>
                                        <div className="postImage">
                                            <Image src={image1} alt="spider-man" fetchPriority="low" title="" />
                                        </div>
                                        <div className="formgroup">
                                            <label htmlFor="fileinput"><IoMdAddCircle /> Add Photo</label>
                                            <input type="file" id="fileinput" name="file" />
                                        </div>
                                        <div className="formgroup">
                                            <input type="text" placeholder='Title' value={post.title} name="title" onChange={handlechange} required />
                                        </div>
                                        <div className="formgroup">
                                            <input type="text" placeholder='Description' value={post.description} name="description" onChange={handlechange} required />
                                        </div>
                                        <div className="formgroup">
                                            <input type="submit" value='Post' />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default CreatePost;