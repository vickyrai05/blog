import { Row, Col, Container } from "react-bootstrap";
import '../../../public/pages/sass/stylePages/hero.scss';


const Hero = () => {

    return (
        <>
            <div className="heroSection">
                <Container >
                    <Row>
                        <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}>
                            <div className="hero_area">
                                <div className="heading">
                                    <h2>
                                        Your Daily Dose of
                                        Inspiration and Knowledge
                                    </h2>
                                </div>

                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>


        </>
    );
}

export default Hero;
