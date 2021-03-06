import React, { useContext } from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { GoogleLogin } from "react-google-login";
import { GraphQLClient } from "graphql-request";
import Context from "../../context";
import { ME_QUERY } from "../../graphql/queries";
const Login = ({ classes }) => {
	const { dispatch } = useContext(Context);
	const onSuccess = async googleUser => {
		try {
			const idToken = googleUser.getAuthResponse().id_token;
			const client = new GraphQLClient("http://localhost:4000/graphql", {
				headers: {
					authorization: idToken
				}
			});
			const { me } = await client.request(ME_QUERY);
			dispatch({ type: "LOGIN_USER", payload: me });
		} catch (err) {
			onFailure(err);
		}
	};

	const onFailure = err => {
		console.error("Error Logging IN!!!!", err);
	};

	return (
		<div className={classes.root}>
			<Typography
				component="h1"
				variant="h3"
				gutterBottom
				noWrap
				style={{ color: rgb(66, 133, 244) }}
			>
				WELCOME
			</Typography>
			<GoogleLogin
				clientId="746933482383-ac3p828g0200smabv61efb8de6b4kanp.apps.googleusercontent.com"
				onSuccess={onSuccess}
				onFailure={onFailure}
				isSignedIn={true}
				theme="dark"
			/>
		</div>
	);
};

const styles = {
	root: {
		height: "100vh",
		display: "flex",
		justifyContent: "center",
		flexDirection: "column",
		alignItems: "center"
	}
};

export default withStyles(styles)(Login);
