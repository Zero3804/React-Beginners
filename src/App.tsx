import { useEffect, useState } from "react";
import Alert from "./components/Alert";
import Buttons from "./components/Buttons/Buttons";
import Like from "./components/Like";
import Navbar from "./components/NavBar";
import Cart from "./components/Cart";
import ExpandableText from "./components/ExpandableText";
import Form from "./components/Form";
import ExpenseList from "./expense-tracker/components/ExpenseList";
import ExpenseFilter from "./expense-tracker/components/ExpenseFilter";
import ExpenseForm from "./expense-tracker/components/ExpenseForm";
import apiClients, {CanceledError} from "./services/api-clients";
import userService, { User } from "./services/userService";
import useUsers from "./Hooks/useUsers";

function App() {
  const {users, error, isLoading, setUsers, setError} = useUsers();
  const [category, setCategory] = useState("");
  const [cartItems, setCartItems] = useState(["Product1", "Product2"]);
  let items = ["New York", "San Francisco", "Tokyo", "London", "Paris"];
  const [alertVisibility, setAlertVisibility] = useState(false);

  const handleSelectItem = (item: string) => {}; // Unused, can remove if not needed
  const [selectedCategory, setSelectedCategory] = useState("");
  const [expenses, setExpenses] = useState([
    { id: 1, description: "Groceries", amount: 100, category: "Food" },
    { id: 2, description: "Gas", amount: 50, category: "Transportation" },
    { id: 3, description: "Movie", amount: 20, category: "Entertainment" },
  ]);
  const visibleExpenses = selectedCategory
    ? expenses.filter((e) => e.category === selectedCategory)
    : expenses;
  
  const deleteUser = (user : User) => {
    const originalUsers = [...users];
  
    setUsers(users.filter((u) => u.id !== user.id));

      userService.delete(user.id).catch(err => {
        setError((err.message));
        setUsers(originalUsers);
      });
  }
  const addUser = () => {
    const originalUsers = [...users]; 
    const newUser = { id: 0, name: "New User" };
    setUsers([newUser, ...users]);

    apiClients.post('users', newUser)
     userService.create(newUser) .then(({data:savedUser}) => setUsers( [savedUser, ...users]))
      .catch(err => {
        setError((err.message));
        setUsers(originalUsers);
      });
  };

  const updateUser = (user: User) => {
    const originalUsers = [...users];
    const updatedUser = { ...user, name: user.name + "!" };
    setUsers(users.map(u => u.id === user.id ? updatedUser : u));

    apiClients.patch('https://jsonplaceholder.typicode.com/users/' + user.id, updatedUser)
      .catch(err => {
        setError((err.message));
        setUsers(originalUsers);
      });
  };

  return (
    <>
      <div className="mb-3">
        <Navbar cartItemsCount={cartItems.length} />
        <Cart cartItem={cartItems} onClear={() => setCartItems([])} />
        {alertVisibility && (
          <Alert onClose={() => setAlertVisibility(false)}>Hello World!</Alert>
        )}
        <Buttons onClick={() => setAlertVisibility(true)} color="primary">
          Click me!
        </Buttons>
        <Like onClick={() => {}} />
        <ExpandableText>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti rem
          repellendus sint. Odit expedita totam dicta. Sit optio reiciendis ut
          ad suscipit illum quae quisquam, doloribus consequatur, adipisci nisi
          dignissimos!
        </ExpandableText>
        <div className="mb-3">
          <Form />
        </div>
        <div className="mb-5">
          <ExpenseForm
            onSubmit={(expense) =>
              setExpenses([
                ...expenses,
                { ...expense, id: expenses.length + 1 },
              ])
            }
          ></ExpenseForm>
        </div>
        <div className="mb-3">
          <ExpenseList
            expenses={visibleExpenses}
            onDelete={(id) => {
              setExpenses(expenses.filter((e) => e.id !== id));
            }}
          />
        </div>

        <div className="mb-3">
          <ExpenseFilter
            onSelectCategory={(category) => {
              setSelectedCategory(category);
            }}
          />
        </div>
        <div>
          <select
            className="form-select"
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value=""></option>
            <option value="Clothing">Clothing</option>
            <option value="Household">Household</option>
          </select>
        </div>
        {isLoading && <div className="spinner-border"></div>}
        <button className="btn btn-primary mb-3" onClick = {addUser}>Add User</button>
        <ul className="list-group">
          {users.map((user) => (
            <li key={user.id} className="list-group-item d-flex justify-content-between">
             
              {user.name} 
              <div>
               <button className="btn btn-outline-secondary mx-1" onClick = {() => updateUser(user)}>Update</button>
              <button className="btn btn-outline-danger" onClick={() => deleteUser(user)}>Delete</button> 
              </div>
            </li>
          ))}
        </ul>
        {error && <p className="text-danger">{error}</p>}
      </div>
    </>
  );
}
export default App;
