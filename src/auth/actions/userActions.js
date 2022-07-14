import axios from 'axios';
import {sessionService} from 'redux-react-session';

//the remote endpoint and local
const remoteUrl = "https://sweatcheck.herokuapp.com/";
const localUrl = "http://localhost:3000/";
const currentUrl = localUrl;

export const loginUser = (
    credentials, 
    history, 
    setFieldError, 
    setSubmitting
    ) => {
    //make checks and get some data

    return () => {

    axios.post("https://sweatcheck.herokuapp.com/api/user/signin", 
    credentials,
    {
        headers: {
            "Content-Type": "application/json"
        }
    } 
    ).then((response) => {
        const {data} = response;

        if (data.status === "FAILED") {
            const {message} = data;

            //check for specific error
            if (message.includes("credentials")) {
                setFieldError("login", message);
                setFieldError("password", message);
            } else if (message.includes("password")) {
                setFieldError("password", message);
            }

        } else if (data.status === "SUCCESS") {
            const userData = data.data[0];

            const token = userData._id;

            sessionService
                .saveSession(token)
                .then(() => {
                    sessionService
                        .saveUser(userData)
                        .then(() => {
                            history("/dashboard");
                })
                .catch(err => console.error(err));
            })
            .catch(err => console.error(err));
        }

        //complete submission
        setSubmitting(false);
    })
    .catch(err => console.error(err));
    }
};

export const signupUser = (credentials, history, setFieldError, setSubmitting) => {
    
        return (dispatch) => {
    axios
        .post(
            "https://sweatcheck.herokuapp.com/api/user/signup", 
            credentials,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            } 
    )
    .then((response) => {
        const {data} = response;

        if (data.status === "FAILED") {
            const {message} = data;

            //checking for specific error
            if (message.includes("firstName")) {
                setFieldError("firstName", message);
            } else if (message.includes("lastName")) {
                    setFieldError("lastName", message);   
            } else if (message.includes("email")) {
                    setFieldError("email", message);                                 
            } else if (message.includes("login")) {
                setFieldError("login", message);
            } else if (message.includes("password")) {
                setFieldError("password", message);
            }

            //complete submission
            setSubmitting(false);

        //pending until email verification
        } else if (data.status === "PENDING") {
            //Login user after successful signup
            const {login, password} = credentials;

            history("/dashboard");

        }
    })
    .catch(err => console.error(err));

}
};

export const logoutUser = (history) => {
    return () => {
        sessionService.deleteSession();
        sessionService.deleteUser();
        history.push('/');
    }  
};