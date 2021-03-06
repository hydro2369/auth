import React from 'react';
import firebase from 'firebase';
import { StyleSheet, ScrollView, Text, View, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import CardSection from './CardSection';
import Spinner from './Spinner';


export default class LoginForm extends React.Component {
  state = {
    email:'',
    password:'',
    error:'',
    loading:false,
    
  }
  onButtonPress(){
    const {email, password} = this.state;
    this.setState({error:'', loading:true});

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSuccess.bind(this))
          .catch(this.onLoginFail.bind(this))
      })
  }



  onLoginFail(){
    this.setState({error:'Authentication Failed', loading:false});
  }
  onLoginSuccess(){
    this.setState({
      email:'',
      password:'',
      loading:false,
      error:''
    })
  }

  renderButton(){
    if(this.state.loading){
      return <Spinner size="small" />
    }
    return(
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress = {this.onButtonPress.bind(this)}
      >
        <Text style={styles.buttonText}>
          Login
        </Text>
      </TouchableOpacity>
    )
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle='light-content'
        />
        <TextInput
          placeholder="user@qmail.cuny.edu"
          placeholderTextColor="rgba(255,255,255,0.8)"
          returnKeyType='next'
          onSubmitEditing={() => this.passwordInput.focus()}
          keyboardType="email-address"
          autoCapitalize='none'
          autoCorrect={false}
          style={styles.input}
          onChangeText={email => this.setState({email})}
          value={this.state.email}
        />

        <TextInput
          placeholder="password"
          placeholderTextColor="rgba(255,255,255,0.8)"
          returnKeyType='go'
          secureTextEntry
          style={styles.input}
          ref={(inputs) => this.passwordInput = inputs}
          onChangeText={password => this.setState({password})}
          value={this.state.password}
        />

//error message
        <Text style={styles.errorTextStyle}>{this.state.error}</Text>
//render login button
        {this.renderButton()}
//join button
        <TouchableOpacity style={styles.joinContainer}>
          <Text style={styles.joinText}>Not a member? Join Today</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = {
  container:{
    padding:20
  },
  input:{
    height:40,
    backgroundColor:'rgba(255,255,255,0.2)',
    marginBottom:10,
    color:'#FFF',
    paddingHorizontal:10,
    fontSize:20
  },
  buttonContainer:{
    backgroundColor:'#2980b9',
    paddingVertical:12,
  },
  buttonText:{
    textAlign:'center',
    color:'#FFFFFF',
    fontWeight:'bold',
    fontSize:18
  },
  joinContainer:{
    paddingVertical:12,
    marginBottom:15
  },
  joinText:{
    textAlign:'center',
    color:'#FFFFFF',
    fontSize:18,
  },
  errorTextStyle:{
    fontSize:20,
    alignSelf:'center',
    color:'red'
  }
}
