import { useEffect, useState } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";
import { Card, ListGroup, Row, Col } from "react-bootstrap";
import DeleteButton from "./DeleteButton";

const Recepie = (props) => {
    const params = useParams();
    const location = useLocation();
    const history = useHistory();

    const handleClickNext = () => {
        history.push("/recipes");
    }
    return (
        <Row>
            <Col sm={3}>
                <Card style={{ width: '18rem' }}>
                    <Card.Header><Card.Title>{location.state.name}</Card.Title></Card.Header>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <Card.Title>Source</Card.Title>
                            {location.state.source}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Card.Title>Ingredients</Card.Title>
                            <ul>
                                {location.state.ingredients.map((i) => (
                                    <li key={i.name}>
                                        {`${i.name}: ${i.value}`}
                                    </li>
                                ))}
                            </ul>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Card.Title>Preparation time</Card.Title>
                            {location.state.time} minutes
                        </ListGroup.Item>
                    </ListGroup>
                    <DeleteButton recipe={location.state} handleClickNext={handleClickNext}/>
                </Card>
            </Col>
            <Col sm={9}>
                <Card >
                    <Card.Body>
                        <Card.Title>Instructions</Card.Title>
                        {location.state.instructions}
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}
export default Recepie;