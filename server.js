const { ApolloServer } = require("apollo-server");
const moongose = require("mongoose");
require("dotenv").config();
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const { findOrCreateUser } = require("./controllers/usercontroller");
moongose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true
	})
	.then(() => {
		console.log("Database Connected!!");
	})
	.catch(() => {
		console.log("Error In Mongodb Connection");
	});
const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: async ({ req }) => {
		let authToken = null;
		let currentUser = null;
		try {
			authToken = req.headers.authorization;
			if (authToken) {
				currentUser = await findOrCreateUser(authToken);
			}
		} catch (err) {
			console.error(`Unable to authenticate user with token`);
		}
		return { currentUser };
	}
});

server.listen().then(({ url }) => {
	console.log(`Server is Listening On ${url}`);
});
