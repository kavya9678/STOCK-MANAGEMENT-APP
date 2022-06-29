import './App.css';
import Viewitem from './component/Item/Viewitem';
import Button from '@material-ui/core/Button';
import { Provider } from 'react-redux'
import store from './redux/store';
import Uinav from './Uinav'

import FormAdd from './component/Item/FormAdd';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import { createBrowserHistory } from 'history';
import EditForm from './component/Item/EditForm';
import ParticularItem from './component/Item/ParticularItem';

const history = createBrowserHistory();

function App() {
  return (
    <Provider store={store}>
      <div className="App" >
        <Uinav />
        <p>



        </p>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Viewitem} />
            <Route exact path='/Add' history={history} component={FormAdd} />
            <Route exact path='/Edit/:id' history={history} component={EditForm} />
            <Route exact path='/View/:id' history={history} component={ParticularItem} />


          </Switch>


        </Router>




      </div>






    </Provider>







  );
}

export default App;
