import { Table } from "react-bootstrap"
import IExpenseItem from "../models/expense"
import {getAllPayeeNames} from "../services/expense-utils"

type ExpenseByPayeeModel = {
    expenseItems: IExpenseItem[]
}

const ExpenseByPayees = ( {expenseItems} : ExpenseByPayeeModel ) => {

    const getTotalExpenseByPayee = (payeeName : string) => {

        let totalExpense = 0;
        expenseItems.forEach((expenseItem) => {
            expenseItem.payeeName === payeeName && (totalExpense += expenseItem.price);
        })

        return totalExpense;
    }

    return (
        <>
            <Table striped bordered hover>
                <thead className="table-dark">
                    <tr>
                        <th>Payee</th>
                        <th>Total Expense</th>
                    </tr>
                </thead>

                <tbody>
                    { getAllPayeeNames(expenseItems).map((payeeName, id) => (
                            <tr key={id}>
                                <td>{payeeName}</td>
                                <td>Rs. {getTotalExpenseByPayee(payeeName)}</td>
                            </tr>
                            )
                        )
                    }
                </tbody>

            </Table>
        </>
    )
}

export {ExpenseByPayees}