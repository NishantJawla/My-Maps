const User = require("../models/User");

const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.OAUTH_CLIENT_ID);

exports.findOrCreateUser = async token => {
	const googleUser = await verifyAuthToken(token);
	const user = await checkIfUserExist(googleUser.email);
	return user ? user : creatNewUser(googleUser);
};

const verifyAuthToken = async token => {
	try {
		const ticket = await client.verifyIdToken({
			idToken: token,
			audience: process.env.OAUTH_CLIENT_ID
		});
		return ticket.getPayload();
	} catch (err) {
		console.error("Error Verifying auth token ", err);
	}
};

const checkIfUserExist = async email => await User.findOne({ email }).exec();

const creatNewUser = googleUser => {
	const { email, name, picture } = googleUser;
	const user = { email, name, picture };
	return new User(user).save();
};
