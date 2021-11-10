import Button from "@restart/ui/esm/Button";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { header_img_base_url, icon_img_base_url } from "../../data/baseUrls";
import story_data from "../../data/storyInfo.json";
import "../../styles/story.css";

export default function TerriPage() {
  const data = story_data["Terri"];

  return (
    <Container className="story__container">
      <div className="d-flex justify-content-center header__img__container">
        {" "}
        <img
          src={header_img_base_url + data.header_img_url}
          alt={data.name + "header image"}
          width="85%"
        ></img>
      </div>
      <Link to="/matrix">
        {" "}
        <Button>Back to matrix </Button>
      </Link>
      <div className="content__container">
        <Row>
          <Col xs={3}>
            <h2> Biography </h2>
            <img
              src={icon_img_base_url + data.icon_img_url}
              alt={data.name + "icon image"}
            />
          </Col>
          <Col>
            <h1> {data.name} </h1>
            <p>{data.intro}</p>{" "}
          </Col>
        </Row>
        <section></section>
        <section>
          <h2> Behind the numbers </h2>
          {data.content.map((cont, i) => {
            return (
              <div className="indiv__content__wrapper" key={i}>
                <p className="data__text"> {cont.data_content}</p>
                <p className="narrative_text"> {cont.narrative_content}</p>
              </div>
            );
          })}
        </section>
      </div>
    </Container>
  );
}
