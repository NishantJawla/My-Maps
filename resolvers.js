const { AuthenticationError } = require("apollo-server");

const user = {
	_id: "771257",
	name: "User",
	email: "user@gmail.com",
	picture:
		"https://i.pinimg.com/564x/ea/55/37/ea5537b36fffd087e4e884c5572504ad.jpg"
};

const authenticated = next => (root, args, ctx, info) => {
	if (!ctx.currentUser) {
		throw new AuthenticationError("You must be logged in!");
	}
	return next(root, args, ctx, info);
};

module.exports = {
	Query: {
		me: authenticated((root, args, ctx) => ctx.currentUser)
	}
};
