import { contacts } from "./constants/contacts.json";
import ContactList from "./components/ContactList";
import ContactInfo from "./components/ContactInfo";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
	{ path: "/", element: <ContactList contacts={contacts} /> },
	{ path: "/contacts/:id", element: <ContactInfo contacts={contacts} /> },
]);

function App() {
	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}

export default App;
