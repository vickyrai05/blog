'use client'
import { getApi } from "@/helpers/ulilits";
import axios from "axios";
import { useEffect, useState } from "react"

const Pegimation = () => {
    const [userdata, setuserdata] = useState([]);
    const [currentpage, setcurrentpage] = useState(1);
    const [totalpage, settotalpage] = useState(0)

    const callme = async () => {
        axios.get('https://jsonplaceholder.typicode.com/users').then((item) => {
            setuserdata(item.data)
            settotalpage(Math.ceil(userdata.length / 1))
        })
    }

    const handleclick = (newpage) => {
        setcurrentpage(newpage)
    }
    const handleNext = () => {
        if (currentpage < totalpage) {
            setcurrentpage(currentpage + 1)
        }
    }
    const handlePrev = () => {
        if (currentpage > 1) {
            setcurrentpage(currentpage - 1)
        }
    }
    const preDisabled = currentpage === 1;
    const nextDisabled = currentpage === totalpage;


    const perpageItem = 5;

    const startindex = (currentpage - 1) * perpageItem;
    const endindex = startindex + perpageItem;
    const itemdisplay = userdata.slice(startindex, endindex)


    useEffect(() => {
        callme()
    }, [])
    return (
        <>
            <div>
                {
                    itemdisplay && itemdisplay.length > 0 ? itemdisplay.map((item, i) => {
                        return (
                            <div key={item.id}>
                                <h4>{item.id}</h4>
                                <h4>{item.name}</h4>
                            </div>
                        )
                    }) : ""
                }
                {
                    Array.from({ length: totalpage }, (_, i) => {
                        return (
                            <button onClick={() => handlePagechange(i + 1)} key={i}>
                                {i + 1}
                            </button>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Pegimation;

