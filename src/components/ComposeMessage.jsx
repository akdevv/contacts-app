import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ComposeMessage({ contacts, onSend }) {
	const { id } = useParams();
	const navigate = useNavigate();
	const [otp, setOtp] = useState("");
	const contact = contacts.find((c) => c.id === parseInt(id));

	// generate random otp on mount
	useEffect(() => {
		setOtp(Math.floor(100000 + Math.random() * 900000).toString());
	}, []);

	if (!contact) {
		return <div>Contact not found</div>;
	}

	const handleSend = () => {
		const respone = onSend(otp, contact);
		if (respone) {
			navigate("/sent");
		} else {
			alert("Failed to send message. Please try again.");
		}
	};

	return (
		<div className="p-2">
			<h2 className="mb-2 text-xl font-bold">New Message</h2>
			<p className="mb-2">{`To: ${contact.firstName} ${contact.lastName}`}</p>
			<p className="mb-4">{`Message: Hi. Your OTP is: ${otp}`}</p>
			<button
				className="px-4 py-2 text-white bg-green-500 rounded-lg"
				onClick={handleSend}
			>
				Send
			</button>
		</div>
	);
}

export default ComposeMessage;
