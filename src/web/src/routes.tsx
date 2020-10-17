import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import OrphanagesMaps from './pages/OrphanagesMaps';
import Orphanage from './pages/Orphanage';
import CreateOrphanage from './pages/CreateOrphanage';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing}></Route>
                <Route path="/app" component={OrphanagesMaps}></Route>
                <Route path="/orphanages/create" component={CreateOrphanage}></Route>
                <Route path="/orphanages/:id" component={Orphanage}></Route>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;