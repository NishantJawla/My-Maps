const user = {
	_id: "771257",
	name: "User",
	email: "user@gmail.com",
	picture:
		"https://i.pinimg.com/564x/ea/55/37/ea5537b36fffd087e4e884c5572504ad.jpg"
};
module.exports = {
	Query: {
		me: () => user
	}
};
