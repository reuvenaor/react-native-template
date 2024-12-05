import {AnyAction} from 'redux';

interface Expense {
  id: string;
  title: string;
  amount: number;
  createdAt: number;
}

interface ExpensesState {
  expenses: Expense[];
}

const initialState: ExpensesState = {
  expenses: [],
};

const expensesReducer = (
  state = initialState,
  action: AnyAction,
): ExpensesState => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return {
        ...state,
        expenses: [...state.expenses, action.expense],
      };
    case 'REMOVE_EXPENSE':
      return {
        ...state,
        expenses: state.expenses.filter(({id}) => id !== action.id),
      };
    case 'EDIT_EXPENSE':
      return {
        ...state,
        expenses: state.expenses.map(expense =>
          expense.id === action.id ? {...expense, ...action.updates} : expense,
        ),
      };
    default:
      return state;
  }
};

export default expensesReducer;
