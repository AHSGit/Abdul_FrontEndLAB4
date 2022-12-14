import { useState, MouseEvent, useRef } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import IExpenseItem, { IExpenseCreateItem } from "../models/expense";
import { postExpenseItems } from "../services/expense";
import {getAllPayeeNames} from "../services/expense-utils"

type ExpenseCreatorModel = {
    expenseItems: IExpenseItem[];
    refreshParent: (newExpenseItem: IExpenseItem) => void
}

const ExpenseCreator = ({expenseItems, refreshParent} : ExpenseCreatorModel) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const payeeRef = useRef<HTMLSelectElement>(null)
    const expenseDescriptionRef = useRef<HTMLInputElement>(null)
    const priceRef = useRef<HTMLInputElement>(null)
    const dateRef = useRef<HTMLInputElement>(null)

    const handleSubmit = async (event : MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        const newExpenseItem : IExpenseCreateItem = {
            date: dateRef.current?.value as string,
            expenseDescription: expenseDescriptionRef.current?.value as string,
            price: parseFloat(priceRef.current?.value as string),
            payeeName: payeeRef.current?.value as string
        }

        const createdExpenseItem = await postExpenseItems(newExpenseItem);
        
        refreshParent(createdExpenseItem);

        handleClose();
    }

    return (

        <>
            <Button variant="primary" className="float-end" onClick={handleShow}>
                Add New Entry
            </Button>


            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Item</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3 form-group required" controlId="payeeName">
                            <Form.Label>Name</Form.Label>
                            <Form.Select ref={payeeRef}>
                                <option>-- Select Payee --</option>
                                {
                                    getAllPayeeNames(expenseItems).map((payeeName) => {
                                        return <option key={payeeName} value={payeeName}>{payeeName}</option>
                                    })
                                }
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3 form-group required" controlId="expenseDescription">
                            <Form.Label>Product Purchased</Form.Label>
                            <Form.Control 
                                    type="text" 
                                    placeholder="Enter product"
                                    ref={expenseDescriptionRef} />
                        </Form.Group>

                        <Form.Group className="mb-3 form-group required" controlId="price">
                            <Form.Label>Price</Form.Label>
                            <Form.Control 
                                    type="number" 
                                    placeholder="Enter amount"
                                    ref={priceRef} />
                        </Form.Group>

                        <Form.Group className="mb-3 form-group required" controlId="date">
                            <Form.Label>Date</Form.Label>
                            <Form.Control 
                                    type="date"
                                    ref={dateRef} />
                        </Form.Group>

                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Save Item
                    </Button>
                </Modal.Footer>
            </Modal>
        </>

    )

}

export { ExpenseCreator }