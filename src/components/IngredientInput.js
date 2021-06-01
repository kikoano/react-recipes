import { FormControl, InputGroup } from "react-bootstrap";
import { useState, useContext, useEffect } from "react";
import useInput from "../hooks/useInput";
import { Context } from "./RecipeInput";

const IngredientInput = (props) => {
    const [value, setValue, bindValie] = useInput("");
    const [check, setCheck] = useState(false);
    const [ingredients, setIngredients] = useContext(Context);

    const handleCheck = (e) => {
        if (!e.target.checked) {
            setIngredients(ingredients.filter(i => i.name !== props.ingredient));
            setValue("");
        }
        setCheck(e.target.checked);
    }
    useEffect(() => {
        if (value) {
            const ingredient = {
                name: props.ingredient,
                value: value
            }
            const index = ingredients.findIndex((i => i.name === ingredient.name));
            if (index >= 0) {
                const t = ingredients;
                t[index] = ingredient;
                setIngredients(t);
            }

            else
                setIngredients([...ingredients, ingredient]);
            //    setIngredients(ingredients.map(i => i.name === ingredient.name ? [...i, ingredient] : ingredient));
        }
    }, [value])
    return (
        <InputGroup className="mb-3">
            <InputGroup.Text style={{ width: "23%" }}>{props.ingredient}</InputGroup.Text>
            <InputGroup.Checkbox value={check} onChange={handleCheck} />
            {check && <FormControl maxLength="20" placeholder="Enter value" {...bindValie} required />}
        </InputGroup>
    )
}
export default IngredientInput;