import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import Input from '../../components/uielements/input';
import Checkbox from '../../components/uielements/checkbox';
import Button from '../../components/uielements/button';
import authAction from '../../redux/auth/actions';
import IntlMessages from '../../components/utility/intlMessages';
import SignInStyleWrapper from './signin.style';

const {login} = authAction;

class SignIn extends Component {
    state = {
        redirectToReferrer: false,
        email: '',
        password: '',
    };

    componentWillReceiveProps(nextProps) {
        if (this.props.isLoggedIn !== nextProps.isLoggedIn && nextProps.isLoggedIn === true) {
            this.setState({redirectToReferrer: true});
        }
    }

    handleLogin = () => {
        this.props.login(this.state);
        this.props.history.push('/app');
    };

    updateField = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    render() {
        const from = {pathname: '/app'};
        const app = {pathname: '/app'};
        const {redirectToReferrer} = this.state;

        if (redirectToReferrer) {
            return <Redirect to={from}/>;
        }

        if(this.props.isLoggedIn){
            return <Redirect to={app}/>;
        }
        return (
            <SignInStyleWrapper className="isoSignInPage">
                <div className="isoLoginContentWrapper">
                    <div className="isoLoginContent">
                        <div className="isoLogoWrapper">
                            <Link to="/app">
                                <IntlMessages id="page.signInTitle"/>
                            </Link>
                        </div>

                        <div className="isoSignInForm">
                            <div className="isoInputWrapper">
                                <Input onChange={this.updateField} name={'email'} size="large" placeholder="Email"/>
                            </div>

                            <div className="isoInputWrapper">
                                <Input onChange={this.updateField} name={'password'} size="large" type="password" placeholder="Password"/>
                            </div>

                            <div className="isoInputWrapper isoLeftRightComponent">
                                <Checkbox>
                                    <IntlMessages id="page.signInRememberMe"/>
                                </Checkbox>
                                <Button type="primary" onClick={this.handleLogin}>
                                    <IntlMessages id="page.signInButton"/>
                                </Button>
                            </div>

                            <p className="isoHelperText">
                                <IntlMessages id="page.signInPreview"/>
                            </p>

                            <div className="isoInputWrapper isoOtherLogin">
                                <Button onClick={this.handleLogin} type="primary btnFacebook">
                                    <IntlMessages id="page.signInFacebook"/>
                                </Button>
                                <Button onClick={this.handleLogin} type="primary btnGooglePlus">
                                    <IntlMessages id="page.signInGooglePlus"/>
                                </Button>
                            </div>
                            <div className="isoCenterComponent isoHelperWrapper">
                                <Link to="" className="isoForgotPass">
                                    <IntlMessages id="page.signInForgotPass"/>
                                </Link>
                                <Link to="">
                                    <IntlMessages id="page.signInCreateAccount"/>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </SignInStyleWrapper>
        );
    }
}

export default connect(
    state => ({
        isLoggedIn: state.Auth.get('idToken') !== null ? true : false,
    }), {login}
)(SignIn);
