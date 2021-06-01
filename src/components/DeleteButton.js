import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
const DeleteButton = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleDelete = () => {
        const recipes = JSON.parse(localStorage.getItem("recipes")).filter(r => r.id !== props.recipe.id);
        if (props.setRecipes)
            props.setRecipes(recipes);
        localStorage.setItem("recipes", JSON.stringify(recipes));
        setShow(false);
        if (props.handleClickNext)
            props.handleClickNext();
    }
    return (
        <>
            <Button variant="danger" onClick={handleShow}>Delete</Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete {props.recipe.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>No</Button>
                    <Button variant="primary" onClick={handleDelete}>Yes</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default DeleteButton;