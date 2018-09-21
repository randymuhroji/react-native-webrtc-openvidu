import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';

import LoginScreen from './login/LoginScreen';
import VideoScreen from './room/VideoScreen';


const onExitApp = () => {
    console.log('qnmllb');
}


export default class Main extends Component {

    componentDidMount(){

    }
    
    render() {
        return (
            <Router>
                <Scene key='root'>

                    <Scene
                        key='loginScreen'
                        component={LoginScreen}
                        animation='fade'
                        hideNavBar={true}
                        initial={true}
                    />

                    <Scene
                        key='videoScreen'
                        component={VideoScreen}
                        animation='fade'
                        hideNavBar={true} 
                    />
                          
                </Scene>
            </Router>
        );
    }

}
