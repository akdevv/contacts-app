import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

export default async function (req, res) {
	if (req.method === "POST") {
		const { to, message } = req.body;

		const accountSid = process.env.TWILIO_ACCOUNT_SID;
		const authToken = process.env.TWILIO_AUTH_TOKEN;
		const client = twilio(accountSid, authToken);

		try {
			console.log("trying to send message...");
			console.log(to, message);
			await client.messages.create({
				body: message,
				from: process.env.TWILIO_PHONE_NUMBER,
				to: to,
			});
			console.log("message send!");
			res.status(200).json({ success: true });
		} catch (err) {
			console.error("Twilio Error: ", err);
			res.status(500).json({ success: false, error: err.message });
		}
	} else {
		res.setHeader("Allow", "POST");
		res.status(405).end("Method Not Allowed");
	}
}
