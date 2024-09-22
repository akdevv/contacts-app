import axios from "axios";
import { useState, useEffect } from "react";
import { contacts } from "./constants/contacts.json";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import ContactList from "./components/ContactList";
import ContactInfo from "./components/ContactInfo";
import ComposeMessage from "./components/ComposeMessage";
import SentMessagesList from "./components/SentMessagesList";

function App() {
	const [sentMessages, setSentMessages] = useState([]);

	useEffect(() => {
		// Load sent messages from local storage when the app initializes
		const storedMessages =
			JSON.parse(localStorage.getItem("sentMessages")) || [];
		setSentMessages(storedMessages);
	}, []);

	const handleSend = async (otp, contact) => {
		try {
			const response = await axios.post("/api/send-sms", {
				to: contact.phoneNumber,
				message: `Hi. Your OTP is: ${otp}`,
			});

			if (response.data.success) {
				const newMessage = {
					id: Date.now(),
					contactName: `${contact.firstName} ${contact.lastName}`,
					message: `Hi. Your OTP is: ${otp}`,
					timestamp: new Date().toISOString(),
				};

				const updatedMessages = [newMessage, ...sentMessages];
				setSentMessages(updatedMessages);
				localStorage.setItem(
					"sentMessages",
					JSON.stringify(updatedMessages)
				);
				return true;
			} else {
				throw new Error("Failed to send SMS");
			}
		} catch (err) {
			console.error("Error sending message:", err);
			return false;
		}
	};

	return (
		<>
			<BrowserRouter>
				<div className="container p-4 mx-auto">
					{/* navbar */}
					<nav className="mb-4">
						<ul className="flex space-x-4">
							<li>
								<Link to="/" className="hover:text-blue-500">
									Contacts
								</Link>
							</li>
							<li>
								<Link
									to="/sent"
									className="hover:text-blue-500"
								>
									Sent Message
								</Link>
							</li>
						</ul>
					</nav>

					{/* routes */}
					<Routes>
						<Route
							path="/"
							element={<ContactList contacts={contacts} />}
						/>
						<Route
							path="/contacts/:id"
							element={<ContactInfo contacts={contacts} />}
						/>
						<Route
							path="/compose/:id"
							element={
								<ComposeMessage
									contacts={contacts}
									onSend={handleSend}
								/>
							}
						/>
						<Route
							path="/sent"
							element={
								<SentMessagesList messages={sentMessages} />
							}
						/>
					</Routes>
				</div>
			</BrowserRouter>
		</>
	);
}

export default App;
