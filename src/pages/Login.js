import React from 'react';
//styled components
import {
    StyledTextInput, 
    StyledFormArea, 
    StyledFormButton, 
    StyledLabel, 
    Avatar, 
    StyledTitle, 
    colors,
    ButtonGroup,
    ExtraText,
    TextLink,
    CopyrightText
} from './../components/Styles';

import Logo from './../assets/logo.png';

//formik
import {Formik, Form} from 'formik';
import {TextInput} from './../components/FormLib';
import * as Yup from 'yup';

//icons
import {FiMail, FiLock} from 'react-icons/fi';

//Loader
import {ThreeDots} from 'react-loader-spinner'

//auth & redux
import {connect} from 'react-redux';
import {loginUser} from "./../auth/actions/userActions";
import {useNavigate} from "react-router-dom";


const Login = ({loginUser}) => {
        const history = useNavigate();
    return (
        <div>
            <StyledFormArea>
                <Avatar image={Logo} />
                <StyledTitle color={colors.theme} size={30}>Member Login</StyledTitle>
                <Formik
                    initialValues={{
                        login: "",
                        password: "",
                    }}
                    validationSchema={Yup.object({
                        login: Yup.string()
//                          .email("Invalid email address")
                            .required("Required"),
                        password: Yup.string()
                            .min(8, "Password is too short")
                            .max(30, "Password is too long")
                            .required("Required"),
                    })}
                    onSubmit={(values, {setSubmitting, setFieldError}) => {
                        console.log(values);
                        loginUser(values, history, setFieldError, setSubmitting);
                    }}
                >
                    {({isSubmitting}) => (
                        <Form>
                            <TextInput
                                name="login"
                                type="text"
                                label="Login"
                                placeholder="olga1@example.com"
                                icon={<FiMail />}
                            />
                            
                            <TextInput
                                name="password"
                                type="password"
                                label="Password"
                                placeholder="********"
                                icon={<FiLock />}
                            />
                            <ButtonGroup>
                                {!isSubmitting && (
                                    <StyledFormButton type="submit">Login</StyledFormButton>
                                )}

                                {isSubmitting && (
                                    <ThreeDots
                                        type="ThreeDots"
                                        color={colors.theme}
                                        height={49}
                                        width={100}
                                    />
                                )}
                            </ButtonGroup>
                        </Form>                    
                    )}
                </Formik>
                <ExtraText>
                    New Here? <TextLink to="/signup">Signup</TextLink>
                </ExtraText>
            </StyledFormArea>
            <CopyrightText>
                All rights reserved &copy;2020
            </CopyrightText>
        </div>
    )
}

export default connect(null, {loginUser})(Login);