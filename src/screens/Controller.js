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
                        <Route path='/' exact component={Home} />
                        <Route path='/movies/:id' exact component={Details}/>
                        <Route path='/movie/shows/:id' exact component={BookShow}/>
                        <Route path='/confirm/:id' exact component={Confirmation}/>
                    </Switch>
                </Router>
            </div>

        )
    }
}

export default Controller;