import 'regenerator-runtime/runtime';
import './App.scss';
import { h, FunctionalComponent } from 'preact';
import block from 'bem-cn';
import { Switch, Route } from 'react-router-dom';
import loadable from '@loadable/component';

const HomeLoadable = loadable(() => import('client/components/pages/Home/Home'));
const RoomLoadable = loadable(() => import('client/components/pages/Room/Room'));

const b = block('App');

const App: FunctionalComponent = () => {
  return (
    <div className={b()}>
      <Switch>
        <Route exact path="/">
          <HomeLoadable />
        </Route>

        <Route path="/room/:roomId">
          <RoomLoadable />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
