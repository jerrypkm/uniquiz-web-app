/**
 *
 * @author MoSkool
 * @version 1.0.0
 * @visibleName Example Feature Component 👶🏼
 *
 * This component is just an example for a container component in moskool
 * This is a good example of functional components using all available React hooks and props
 *
 * @param {Object} authUser - Passed from parent container and has everything about the logged in user
 * @param {Object} classes - Class names that has styling details for elements - used with Material-UI
 * @param {Object} children - Pass child components that are being wrapped by this component
 * @param {Class} history - Firebase class provides access to authUser and db
 * @withEmailVerification - HOC provides email verification stuff
 * @withStyle - HOC provides classes object to component for styling
 * @returns {<ExampleChild/>} - returns component which then the children fetch the correct data
 *
 * @see See [React hoc](https://reactjs.org/docs/higher-order-components.html)
 * */

// Most used React built-in hooks
import React, {
	lazy,
	Suspense,
	useCallback,
	useEffect,
	useState,
	useMemo,
} from "react";

import PropTypes from "prop-types";

// used to retry imports if they fail
// 🔴Retry is not in use
import { retry } from "helpers/retryLazyImport";

import useGlobal from "store";


const [{ authUser, userRole, firebase }] = useGlobal();


// lazy load imports and retry if they fail
// 🔴Retry is not in use
const ExampleChild = lazy(() => retry(() => import("./ExampleChild")));

const ExampleFeature = ({ authUser, firebase, history, match }) => {
	/*
	 * useState - React built-in hook
	 * initiate state and set state in functional components
	 * first param is the state variable and the second is a setter function
	 */

	// initiate state for isLoading
	const [isLoading, setIsLoading] = useState(false);

	// initiate state for users as an empty array
	const [users, setUsers] = useState([]);

	/*
	 * useCallback - React built-in hook
	 * Cache functions to prevent unnecessary re-renders
	 * Triggered only when props change to the dependency array firebase in this case
	 */
	const signOut = useCallback(
		(event) => {
			// do something with event
			return firebase.signOut();
		},
		[firebase]
	);

	/*
	 * useMemo - React built-in hook
	 * Cache Arrays and Objects to prevent unnecessary re-renders
	 * Triggered only when props change to the dependency array firebase in this case
	 */

	const getUsers = useMemo(() => {
		return firebase.users();
	}, [firebase]);

	/*
	 * useEffect - React built-in hook
	 * Provide life cycle in your components to handle side effects and make API calls
	 * Triggered only when props change to the dependency array firebase in this case
	 */
	useEffect(() => {
		// Use for async calls
		(async () => {
			// Trigger loading state for the component
			setIsLoading(true);
			/* Make a firebase query to get users and store them in component state
			 */
			const unsubscribe = props.firebase.users().onSnapshot((snapShot) => {
				let users = [];
				snapShot.forEach((doc) => users.push({ ...doc.data(), uid: doc.id }));
				// Set users in state
				setUsers(users);
			});
			// This return statement is triggered when the component is unmounted
			return () => {
				// set users back to an empty array
				setUsers([]);
				// call unsubscribe to well unsubscribe from firebase and prevent memory leaks
				unsubscribe();
			};
		})();
	}, [firebase]);

	// If loading don't bother rendering the child component
	if (isLoading) {
		return (
			<Suspense
				fallback={<MoSpinner isLoading={true} color="primary" />}
			></Suspense>
		);
	}

	// render the component needs to be displayed to the UI
	return <ExampleChild isLoading={isLoading} users={users} />;
};

ExampleFeature.propTypes = {
	authUser: PropTypes.object.isRequired,
	firebase: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired,
	match: PropTypes.object.isRequired,
};

const isUserRole = false

export default ExampleFeature;
