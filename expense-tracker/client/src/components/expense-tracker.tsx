import { useEffect, useState } from "react";
import { getAllExpenseItems } from "../services/expense";
import { Container, Alert, Spinner } from "react-bootstrap";
import IExpenseItem from "../models/expense";
import { ExpenseItems } from "./expense-items";
import { ExpenseByPayees } from "./expense-by-payees";
import { ExpenseCreator } from "./expense-creator";

const ExpenseTracker = () => {

    const [expenseItems, setExpenseItems] = useState<IExpenseItem[]>([]);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {

        const getAllExpenseItemsInvoker = async () => {

            try {
                const responseData = await getAllExpenseItems();
                setExpenseItems(responseData);

            } catch (error) {
                setError(error as Error);

            } finally {
                setLoading(false);

            }
        }

        getAllExpenseItemsInvoker();

    }, []);

    const refreshParent = (newExpenseItem: IExpenseItem) => {
        setExpenseItems([...expenseItems, newExpenseItem])
    }

    return (
        <Container className="my-4">

            {
                loading
                    ? (
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">
                                Loading App...
                            </span>
                        </Spinner>
                    )

                    : error
                        ? <Alert variant="danger">{error?.message}</Alert>

                        : <> 
                            <h1>Expense Management App <ExpenseCreator expenseItems={expenseItems} refreshParent={refreshParent}></ExpenseCreator></h1>
                            <hr />
                            <br />
                            <ExpenseItems expenseItems={expenseItems}></ExpenseItems>
                            <ExpenseByPayees expenseItems={expenseItems}></ExpenseByPayees>
                          </>

            }

        </Container>
    )
}
export { ExpenseTracker };