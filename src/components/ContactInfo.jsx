import { useParams, useNavigate } from "react-router-dom";

function ContactInfo({ contacts }) {
	const { id } = useParams();
	const navigate = useNavigate();
	const contact = contacts.find((c) => c.id === parseInt(id));

	if (!contact) {
		return <div>Contact not found!</div>;
	}

	return (
		<div className="p-2">
			<h2 className="mb-2 text-xl font-bold">{`${contact.firstName} ${contact.lastName}`}</h2>
			<p className="mb-4">Phone: {contact.phoneNumber}</p>
			<button
				className="px-4 py-2 text-white bg-blue-500 rounded-lg"
				onClick={() => navigate(`/compose/${contact.id}`)}
			>
				Send OTP
			</button>
		</div>
	);
}

export default ContactInfo;
