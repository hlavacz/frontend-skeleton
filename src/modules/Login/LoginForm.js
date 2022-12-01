import {Component} from "react";
import User from "../../libs/User/User";
import LocalizedStrings from 'react-localization'
import {Box, Button, Link, TextField} from "@mui/material";

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
            login_valid: false
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
        this.props.api.login(user).then(res => {
            console.log(res);
            if (res.status === 'ok') {
                this.setState({status: 'not-valid'})
            } else {
                this.setState({status: 'invalid'})
            }
        })
    }


    handleChangePassword(event) {
        const val = event.target.value;
        let change = {password: val}
        if (this.checkPassword(val)) {
            change.password_status = 'valid';
            if (this.state.username_status === 'valid') change.login_valid = true;
        } else {
            change.password_status = 'not_valid';
            change.login_valid = false;
        }
        this.setState(change);
    }


    handleChangeUsername(event) {
        const val = event.target.value;
        let change = {username: val}
        if (this.checkUsername(val)) {
            change.username_status = 'valid';
            if (this.state.password_status === 'valid') change.login_valid = true;
        } else {
            change.username_status = 'not_valid';
            change.login_valid = false;
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
        return <Box sx={{mt: 1}}>
            <h2>Přihlášení se nezdařilo!</h2>
            <p>Zkuste to prosím znovu.</p>
            <Button onClick={() => {
                this.setState({status: 'ready'})
            }} fullWidth
                    variant="contained"
                    sx={{mt: 3, mb: 2}}>Zkusit znovu</Button>
        </Box>
    }


    renderValid() {
        return (
            <Box component="form" onSubmit={this.handleSubmit} noValidate sx={{mt: 1}}>
                <TextField
                    error={this.state.username_status === 'not_valid'}
                    onChange={this.handleChangeUsername}
                    margin="normal"
                    required
                    fullWidth
                    id="torlin_username"
                    label={strings.username}
                    name="torlin_username"
                    autoComplete={strings.username}
                    autoFocus
                />
                <TextField
                    error={this.state.password_status === 'not_valid'}
                    margin="normal"
                    required
                    fullWidth
                    onChange={this.handleChangePassword}
                    name="torlin_password"
                    label={strings.password}
                    type="password"
                    id="torlin_password"
                    autoComplete={strings.password}
                />
                <Button
                    disabled={!this.state.login_valid}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{mt: 3, mb: 2}}
                >
                    {strings.login}
                </Button>
            </Box>
            /**<div className={"form-content"}>
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
             </div>**/
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
