import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import App from './App';
import ImageUpload from './ImageUpload';
import Callback from './Callback/Callback';
import Auth from './Auth/Auth';
import history from './history';
//import { SSL_OP_PKCS1_CHECK_1 } from 'constants';
import Profile from './Profile/Profile';

const auth = new Auth();

const handleAuthentication = ({location}) => {
	if (/access_token|id_token|error/.test(location.hash)) {
		auth.handleAuthentication();
	}
}

export const makeMainRoutes = () => {
	return (
		<Router history={history}>
			<Switch>
				<Route exact path="/callback" render={(props) => {
					handleAuthentication(props);
					return <Callback {...props} />
				}} />
				<Route path="/profile" render={(props) => (
					!auth.isAuthenticated() ? (
						<Redirect to="/" />
					) : (
							<Profile auth={auth} {...props} />
						)
				)} />
				<Route exact path="/ImageUpload" render={(props) => <ImageUpload auth={auth} {...props} />} />
				<Route path="/" render={(props) => <App auth={auth} {...props} />} />
			</Switch>
		</Router>
	);
}

