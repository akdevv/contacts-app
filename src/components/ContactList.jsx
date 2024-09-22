import { Link } from "react-router-dom";

function ContactList({ contacts }) {
	return (
		<ul className="p-1 list-none w-fit">
			{contacts.map((contact) => (
				<li key={contact.id} className="py-2 border-b">
					<Link
						to={`/contacts/${contact.id}`}
						className="text-lg font-semibold hover:text-blue-500"
					>{`${contact.firstName} ${contact.lastName}`}</Link>
				</li>
			))}
		</ul>
	);
}

export default ContactList;
