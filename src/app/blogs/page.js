'use client';
import { Row, Col, Container } from "react-bootstrap";
import '../../../public/pages/sass/stylePages/card.scss';
import { deleteItem, getApi } from "@/helpers/ulilits";
import { useEffect, useState } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { BiEditAlt } from "react-icons/bi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2/dist/sweetalert2.js';
const Card = () => {
    const router = useRouter()


    const [cardData, setCardData] = useState([])
    const [count, setCount] = useState(0)
    const [page, setPage] = useState(1)
    const ItemPerpage = 4;

    let pagination;
    let pageNum = Math.ceil(count / ItemPerpage);

    const res = async () => {
        let resData = await getApi(`http://192.168.1.36:4000/blog?limit=4&page=${page}`);
        setCardData(resData.rows)
        setCount(resData.count)
    }

    const handlechange = () => {
        if (page < pageNum) {
            setPage(page + 1)
        }
    }

    const handlePrev = () => {
        if (page > 1) {
            setPage(page - 1)
        }
    }

    const handledelete = async (id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async(result) => {
            if (result.isConfirmed) {
                await deleteItem(`http://192.168.1.36:4000/blog/delete/${id}?=`)
                res()
                Swal.fire({
                    title: "Deleted!",
                    text: "Your blog has been deleted.",
                    icon: "success"
                });
            }
        });

    }




    useEffect(() => {
        res()
    }, [page])

    useEffect(() => {
        if (pageNum < page) {
            if (page > 1) {
                setPage(page - 1)
            }
        }
    }, [count])

    pagination = Array(pageNum).fill(0).map((item, i) => {
        return <div key={i} className={page === i + 1 ? 'activeBtn' : 'pagebox'} onClick={() => setPage(i + 1)}>{i + 1}</div>;
    })

    return (
        <>
            <div className="cardSection">
                <Container >
                    <Row>
                        <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}>
                            <div className="cardArea">
                                <div className="newpage">
                                    <Link href='/createPost'>
                                        <div className="newbtn">
                                            New Post
                                        </div>
                                    </Link>
                                </div>
                                <div className="cardbox">
                                    {cardData.map((item) => {
                                        return (
                                            <div key={item.id} className="card">
                                                <div>{item.title}</div>

                                                <div className="action">
                                                    <div onClick={() => router.push(`/blogs/${item.id}`)}>
                                                        <BiEditAlt />
                                                    </div>
                                                    <div onClick={() => handledelete(item.id)}>
                                                        <MdDeleteForever />
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className="nextpage">
                                    <div className="btn_box" onClick={handlePrev}> <MdOutlineKeyboardArrowLeft /> Prev Page</div>
                                    <div className="btn_boxx">
                                        {pagination}
                                    </div>
                                    <div className="btn_box" onClick={handlechange}>Next Page <MdOutlineKeyboardArrowRight /></div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

        </>
    );
}

export default Card;
