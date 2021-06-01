import { useEffect, useState } from "react";
import { Table, Row, Col, Button } from "react-bootstrap";
import moment from 'moment';
import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";
import DeleteButton from "./DeleteButton";
const TableRecipes = () => {
    const [recipesAPI, recipesAPIStatus] = useFetch("data/recipes.json");
    const [recipes, setRecipes] = useState([]);
    useEffect(() => {
        const hasRecipes = localStorage.getItem("hasRecipes");
        if (!hasRecipes && recipesAPIStatus === "fetched") {
            localStorage.setItem("hasRecipes", true);
            localStorage.setItem("recipes", JSON.stringify(recipesAPI));
        }
        setRecipes(JSON.parse(localStorage.getItem("recipes")));
    }, [recipesAPI, recipesAPIStatus]);

    return (
        <Row>
            <Col>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr style={{backgroundColor:"rgb(169 205 230)"}} className="text-center">
                            <th>id</th>
                            <th>Recipe name</th>
                            <th>Recipe source</th>
                            <th>No.Ing</th>
                            <th>Ingredients list</th>
                            <th>Preparation</th>
                            <th>Preparation time</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recipes && recipes.map(r => {
                            const ingredientsArr = r.ingredients.map(i => i.name);
                            let ingredients;
                            if (r.ingredients.length > 3)
                                ingredients = ingredientsArr.slice(0, 3).join(", ") + "...";
                            else
                                ingredients = ingredientsArr.join(", ");

                            let instructions;
                            if (r.instructions.length > 50) {
                                let first = r.instructions.slice(0, 50);
                                let i = 50;
                                while (r.instructions[i] && (/[a-zA-Z]/).test(r.instructions[i])) {
                                    first += r.instructions[i];
                                    i++;
                                }
                                instructions = first + "...";
                            }
                            else
                                instructions = r.instructions;

                            let time = moment().days(0).hours(0).minutes(r.time).seconds(0).milliseconds(0);
                            if (r.time < 60)
                                time = time.format("mm [minutes]");
                            else
                                time = time.format("HH [hours] mm [minutes]");
                            return (
                                <tr key={r.id}>
                                    <td>{r.id}</td>
                                    <td>{r.name}</td>
                                    <td>{r.source}</td>
                                    <td className="text-center">{r.ingredients.length}</td>
                                    <td>{ingredients}</td>
                                    <td>{instructions}</td>
                                    <td>{time}</td>
                                    <td>
                                        <div className="btn-group">
                                            <Link to={{ pathname: `/recipe/${r.id}`, state: recipes.find(rr => rr.id === r.id) }}>
                                                <Button variant="primary">Details</Button>
                                            </Link>
                                            <DeleteButton recipes={recipes} setRecipes={setRecipes} recipe={r} />
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </Col>
        </Row>
    )
}
export default TableRecipes;