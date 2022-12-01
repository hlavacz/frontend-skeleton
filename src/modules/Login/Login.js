import {Component} from "react";
import LoginForm from "./LoginForm";
import LocalizedStrings from "react-localization";
import {Box, Container, CssBaseline, Typography} from "@mui/material";

const strings = new LocalizedStrings({
    en: {
        loginPage: 'Login Page'
    },
    cs: {
        loginPage: 'Přihlašovací stránka'
    }
})

export default class Login extends Component {
    render() {
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">{strings.loginPage}</Typography>
                    <LoginForm api={this.props.api}/>
                </Box>
            </Container>
        )
    }
}
