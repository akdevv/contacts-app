function SentMessagesList({ messages }) {
	if (messages.length === 0) {
		return <div>No messages have been sent yet.</div>;
	}

	return (
		<div>
			<h2 className="mb-4 text-xl font-bold">Sent Messages</h2>
			<ul className="space-y-4">
				{messages.map((message) => (
					<li
						key={message.id}
						className="p-4 border rounded shadow-sm"
					>
						<div className="flex items-center justify-between mb-2">
							<span className="font-semibold">
								{message.contactName}
							</span>
							<span className="text-sm text-gray-500">
								{new Date(message.timestamp).toLocaleString()}
							</span>
						</div>
						<p className="text-gray-700">{message.message}</p>
					</li>
				))}
			</ul>
		</div>
	);
}

export default SentMessagesList;
