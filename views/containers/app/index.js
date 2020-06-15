import React from 'react';
import {useSelector} from 'react-redux';
import {Helmet} from 'react-helmet';
import {renderRoutes} from 'react-router-config';
import styles from './reset-css.scss';
import withStyles from "isomorphic-style-loader/withStyles";

const App = (props) => {
    const pathname = useSelector((state => state.router.location.pathname));
    const {route} = props;

    const canonical = pathname.toLowerCase();

    return (
        <div>
            <Helmet
                link={[{
                    href: canonical,
                    rel: 'canonical',
                }]}
                meta={[{
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1',
                }]}
            />
            {renderRoutes(route.routes)}
        </div>
    );
};

export default withStyles(styles)(App);