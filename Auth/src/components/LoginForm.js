import React, {Component} from 'react';
import firebase from 'firebase';
import {View, Text} from 'react-native';
import {Button, Card, CardSection, Input, Spinner} from './common';

class LoginForm extends Component{
  state ={ email:'', password:'', error:'', loading:false}

  onButtonPress(){
    const {email, password} = this.state;
    this.setState({error:'', loading:true});

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch(()=> {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSuccess.bind(this))
          .catch(this.onLoginFail.bind(this))
      })
  }

  onLoginFail(){
    this.setState({error:'Authentication Failed!', loading:false});
  }

  onLoginSuccess(){
    this.setState({
      email:'',
      password:'',
      loading:false,
      error:'',
    })
  }


  renderButton(){
    if(this.state.loading){
      return <Spinner size="small" />
    }
    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Log In
      </Button>
    )
  }
  render(){
    return(
      <Card>
        <CardSection>
          <Input
            label = "Email"
            keyboardType="email-address"
            placeholder="user@qmail.cuny.edu"
            value={this.state.email}
            onChangeText={email => this.setState({email})}
          />
        </CardSection>

        //password
        <CardSection>
          <Input
            secureTextEntry
            keyboardType="default"
            label="Password"
            placeholder="password"
            value={this.state.password}
            onChangeText={password => this.setState({password})}
          />


        </CardSection>
        //error message:
        <Text style={styles.errorTextStyle}>{this.state.error}</Text>
        //button
        <CardSection>
          {this.renderButton()}
        </CardSection>

      </Card>
    )
  }
}
const styles ={
  errorTextStyle:{
    fontSize:20,
    alignSelf:'center',
    color:'red'
  }
}
export default LoginForm;
