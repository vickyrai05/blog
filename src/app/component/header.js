import { Row, Col, Container } from "react-bootstrap";
import '../../../public/pages/sass/stylePages/header.scss';
import logo from '../../../public/images/yrlo.png'
import Image from "next/image";
import { IoSearch } from "react-icons/io5";
import { RiMenu4Fill } from "react-icons/ri";
const Header = () => {

    return (
        <>
            <header>
                <Container >
                    <Row>
                        <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}>
                            <div className="header_area">
                                <div className="leftSide">
                                    <div className="humburger_box">
                                        <RiMenu4Fill />
                                    </div>
                                    <div className="logoBox">
                                        <Image src={logo} alt="logo_img" fetchPriority="low"/>
                                    </div>
                                </div>
                                <div className="rightSide">
                                    <div className="searchbox">
                                        <input type="search" id="search" />
                                        <IoSearch id="search" />
                                        <label htmlFor="search">Search</label>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </header>


        </>
    );
}

export default Header;
