const { ApolloServer } = require("apollo-server");
const moongose = require("mongoose");
require("dotenv").config();
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
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
	resolvers
});

server.listen().then(({ url }) => {
	console.log(`Server is Listening On ${url}`);
});
