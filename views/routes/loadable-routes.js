import React from "react";
import {Redirect} from "react-router-dom";
import Loadable from 'react-loadable';
import Loader from "../components/loader";
import ActionTypes from "../store/action-types";
import {NotationsFormStrategyTypes} from '../constants';
import defaultRoute from "./default-route";

const {auth: {SignIn, SignUp}} = ActionTypes;

export const loadableChildRoutes = [
    {
        key: 'sign-in',
        component: Loadable({
            loader: () => import('../containers/authorization'),
            render: function(loaded) {
                const Authorization = loaded.default;
                return <Authorization title='Sign In' actionType={SignIn}/>
            },
            loading: Loader,
            delay: 300
        }),
        exact: true,
        path: '/sign-in'
    },
    {
        key: 'sign-up',
        component: Loadable({
            loader: () => import('../containers/authorization'),
            render: function(loaded) {
                const Authorization = loaded.default;
                return <Authorization title='Sign Up' actionType={SignUp}/>
            },
            loading: Loader,
            delay: 300
        }),
        exact: true,
        path: '/sign-up'
    },
    {
        key: 'notations',
        component: Loadable({
            loader: () => import('../containers/notations-list'),
            loading: Loader,
            delay: 300
        }),
        exact: true,
        path: '/notations'
    },
    {
        key: 'notation-new',
        component: Loadable({
            loader: () => import('../containers/notation-form'),
            render: function(loaded) {
                const NotationForm = loaded.default;
                return <NotationForm strategyType={NotationsFormStrategyTypes.create}/>
            },
            loading: Loader,
            delay: 300
        }),
        exact: true,
        path: '/notations/new'
    },
    {
        key: 'notation-details',
        component: Loadable({
            loader: () => import('../containers/notation-details'),
            loading: Loader,
            delay: 300
        }),
        exact: true,
        path: '/notations/:id'
    },
    {
        key: 'update-notation',
        component: Loadable({
            loader: () => import('../containers/notation-form'),
            render: function(loaded) {
                const NotationForm = loaded.default;
                return <NotationForm strategyType={NotationsFormStrategyTypes.update}/>
            },
            loading: Loader,
            delay: 300
        }),
        exact: true,
        path: '/notations/:id/update'
    },
    {
        key: 'clock',
        component: Loadable({
            loader: () => import('../containers/clock'),
            loading: Loader,
            delay: 300
        }),
        exact: true,
        path: '/clock'
    },
    {
        key: 'default',
        path: '/',
        exact: true,
        render: () => <Redirect to="/notations"/>
    },
    {
        key: 'not-found',
        component: Loadable({
            loader: () => import('../containers/not-found'),
            loading: Loader,
            delay: 300
        })
    }
];

export const loadableRoutes = [
    {
        ...defaultRoute,
        routes: [...defaultRoute.routes, ...loadableChildRoutes]
    }
];