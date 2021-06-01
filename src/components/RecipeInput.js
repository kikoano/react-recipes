import { Button, FloatingLabel, Form, InputGroup, FormControl, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { nanoid } from "nanoid";
import { useState, createContext, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import useInput from "../hooks/useInput";
import IngredientInput from "./IngredientInput";

export const Context = createContext();

const RecipeInput = () => {
    const history = useHistory();
    const [data, status] = useFetch("data/ingredients.json");
    const [name, setName, bindName] = useInput("");
    const [source, setSource, bindSource] = useInput("");
    const [time, setTime, bindTime] = useInput("");
    const [instructions, setInstructions, bindInstructions] = useInput("");

    const [ingredients, setIngredients] = useState([]);
    const [validated, setValidated] = useState(false);
    const [checkValid, setCheckValid] = useState(false);
    const [firstSubmit, setFirstSubmit] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setFirstSubmit(true);
        }
        else {
            if (ingredients.length > 0) {
                createRecepie();
                history.push("/recipes");
            }
        }
        setValidated(true);
    };
    useEffect(() => {
        if (ingredients.length <= 0 && firstSubmit)
            setCheckValid(true);
        else
            setCheckValid(false);

    }, [firstSubmit, ingredients]);
    const createRecepie = () => {
        const recipe = {
            id: nanoid(10),
            name: name,
            source: source,
            ingredients: ingredients,
            time: time,
            instructions: instructions
        }
        const recipes = JSON.parse(localStorage.getItem("recipes"))
        recipes.push(recipe);
        localStorage.setItem("recipes", JSON.stringify(recipes));
    }

    return (
        <Row>
            <Col>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formName">
                            <FloatingLabel label="Recipe Name">
                                <Form.Control required type="text" maxLength="30" {...bindName} placeholder="Name" />
                                <Form.Control.Feedback type="invalid">Please enter recipe name.</Form.Control.Feedback>
                            </FloatingLabel>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formSource">
                            <FloatingLabel label="Recipe Source">
                                <Form.Control type="text" maxLength="30" {...bindSource} placeholder="Source" />
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formTime">
                            <FloatingLabel label="Time in minutes">
                                <Form.Control required type="number" {...bindTime} placeholder="Time" min="1" max="1439" />
                                <Form.Control.Feedback type="invalid">Please enter time in minutes.</Form.Control.Feedback>
                            </FloatingLabel>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        {data.map(ingredient => (
                            <Col key={`key-${ingredient}`} sm={4}>
                                <Context.Provider value={[ingredients, setIngredients]}>
                                    <IngredientInput ingredient={ingredient} />
                                </Context.Provider>
                            </Col>
                        ))}
                        {checkValid && <p class="text-danger">Check and fill at least one ingredient.</p>}
                    </Row>
                    <Form.Group className="mb-3" as={Col} controlId="formInstructions">
                        <FloatingLabel label="Instructions">
                            <Form.Control required as="textarea" style={{ height: '220px' }} maxLength="3000" {...bindInstructions} placeholder="Name" />
                            <Form.Control.Feedback type="invalid">Please enter instructions.</Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>
                    <Button type="submit">Create Recepie</Button>
                </Form>
            </Col>
        </Row>
    )
}
export default RecipeInput;