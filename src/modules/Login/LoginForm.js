import {Component} from "react";
import User from "../../libs/User/User";
import LocalizedStrings from 'react-localization'

let strings = new LocalizedStrings({
    en: {
        username: "Username",
        password: "Password",
        login: "Login"
    },
    cs: {
        username: "Uživatelské jméno",
        password: "Heslo",
        login: "Přihlásit"
    }
})

export default class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            username_status: 'empty',
            password_status: 'empty',
            status: 'ready',
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
    }


    handleSubmit(event) {
        event.preventDefault()
        let user = new User()
        user.username = this.state.username;
        user.password = this.state.password;
        this.props.api.login(user).then(res=>{
            if (res === false) {
                this.setState({status: 'not-valid'})
            }
        })
    }


    handleChangePassword(event) {
        const val = event.target.value;
        let change = {password: val}
        if (this.checkPassword(val)) {
            change.password_status = 'valid';
        } else {
            change.password_status = 'not_valid';
        }
        this.setState(change);
    }


    handleChangeUsername(event) {
        const val = event.target.value;
        let change = {username: val}
        if (this.checkUsername(val)) {
            change.username_status = 'valid';
        } else {
            change.username_status = 'not_valid';
        }
        this.setState(change);
    }


    checkUsername(val) {
        return (val.length) > 0;
    }

    checkPassword(val) {
        return this.checkUsername(val);
    }


    renderFail() {
        return <div className={"form-content-error"}>
            <h2>Přihlášení se nezdařilo!</h2>
            <p>Zkuste to prosím znovu.</p>
            <button onClick={()=>{this.setState({status: 'ready'})}} className="btn-blue">Zkusit znovu</button>
        </div>
    }


    renderValid() {
        return (
            <div className={"form-content"}>
                <form onSubmit={this.handleSubmit}>
                    <div className={"form-item" + ((this.state.username_status === 'not_valid') ? " not_valid" : "")}>
                        <label>{strings.username}</label>
                        <input id={"torlin_username"} name={"torlin_username"} type={"text"}
                               value={this.state.username} onChange={this.handleChangeUsername} required={"required"}/>
                    </div>
                    <div className={"form-item" + ((this.state.password_status === 'not_valid') ? " not_valid" : "")}>
                        <label>{strings.password}</label>
                        <input id={"torlin_password"} name={"torlin_password"} type={"password"}
                               value={this.state.password} onChange={this.handleChangePassword} required={"required"}/>
                    </div>
                    <button type="submit" className="btn-blue">{strings.login}</button>
                </form>
            </div>
        )
    }


    render() {
        let content = '';
        if (this.state.status === 'ready') {
            content = this.renderValid();
        } else {
            content = this.renderFail();
        }
        return <div className={"form-content"}>{content}</div>
    }

}
