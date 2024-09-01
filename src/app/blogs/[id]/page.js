'use client'
import { Col, Container, Row } from "react-bootstrap";
import Image from "next/image";
import image1 from '../../../../public/images/image5.png';
import '../../../../public/pages/sass/stylePages/post.scss';
import { IoMdAddCircle } from "react-icons/io";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getApi, getPost } from "@/helpers/ulilits";




const UpdatePost = (props) => {
    let router = useRouter()
    let id = props.params.id

    const postform = {
        title: '',
        description: ''
    }

    const [Editpost, setEditPost] = useState(postform)
    console.log(Editpost)
    const handlechange = (e) => {
        setEditPost({ ...Editpost, [e.target.name]: e.target.value })
    }

    const response = async () => {
        let resData = await getApi(`http://192.168.1.36:4000/blog/view/${id}`)
        setEditPost({
            title: resData && resData.data && resData.data.title ? resData.data.title : '',
            description: resData && resData.data && resData.data.description ? resData.data.description : ''
        })
    }

    useEffect(() => {
        response()
    }, [])



    const handlesubmit = async (e) => {
        e.preventDefault()
        await getPost(`http://192.168.1.36:4000/blog/edit/${id}`, Editpost)
        router.push('/blogs')
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
                                            Back
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
                                            <input type="text" placeholder='Title' value={Editpost.title} name="title" onChange={handlechange} required />
                                        </div>
                                        <div className="formgroup">
                                            <input type="text" placeholder='Description' value={Editpost.description} name="description" onChange={handlechange} required />
                                        </div>
                                        <div className="formgroup">
                                            <input type="submit" value='Update Post' />
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

export default UpdatePost;

