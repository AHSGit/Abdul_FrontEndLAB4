import IExpenseItem from "../models/expense"
import { Table } from "react-bootstrap";

type ExpenseItemsModel = {
    expenseItems: IExpenseItem[]
}

const ExpenseItems = ({ expenseItems }: ExpenseItemsModel) => {
    return (
        <>
            <Table striped bordered hover>
                <thead className="table-dark">
                    <tr>
                        <th>Date</th>
                        <th>Product Purchased</th>
                        <th>Price</th>
                        <th>Payee</th>
                    </tr>
                </thead>

                <tbody>
                    { expenseItems.map((expenseItem) => (
                            <tr key={expenseItem.id}>
                                <td>{expenseItem.date}</td>
                                <td>{expenseItem.expenseDescription}</td>
                                <td>Rs. {expenseItem.price}</td>
                                <td>{expenseItem.payeeName}</td>
                            </tr>
                            )
                        )
                    }
                </tbody>

            </Table>
        </>
    )
}

export { ExpenseItems }