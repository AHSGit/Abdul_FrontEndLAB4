import axios from "axios";
import IExpenseItem, { IExpenseCreateItem } from "../models/expense";

const getAllExpenseItems = async () => {

    const getItemsURL = "http://localhost:4000/items";

    const responseData = await axios.get<IExpenseItem[]>(getItemsURL);
    return responseData.data;
}

const postExpenseItems = async (newExpenseItem: IExpenseCreateItem) => {

    const postItemsURL = "http://localhost:4000/items";

    const responseData = await axios.post<IExpenseItem>(
        postItemsURL,
        newExpenseItem,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

    return responseData.data;
}

export { getAllExpenseItems, postExpenseItems };