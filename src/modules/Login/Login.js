import {Component} from "react";
import LoginForm from "./LoginForm";
import LocalizedStrings from "react-localization";

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
            <div className={"page page-login"}>
                <div className={"login-content"}>
                    <h1>{strings.loginPage}</h1>
                    <LoginForm api={this.props.api} />
                </div>
            </div>
        )
    }
}
