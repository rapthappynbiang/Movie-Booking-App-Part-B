import  { React, Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './home/Home.js';
import Details from './details/Details';
import BookShow from './bookshow/BookShow';
import Confirmation from './confirmation/Confirmation.js';
import { Switch } from 'react-router-dom';

class Controller extends Component {
    render(){
        return(
            <div>
                <Router>
                    <Switch>
                        <Route path='/' exact component={Home}/>
                        <Route path='/details/:id' exact exact component={Details}/>
                        <Route path='/details/bookshow' exact component={BookShow}/>
                        <Route path='/details/bookshow/confirmation' exact component={Confirmation}/>
                    </Switch>
                </Router>
            </div>

        )
    }
}

export default Controller;