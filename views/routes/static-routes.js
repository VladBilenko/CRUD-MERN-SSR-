import {Redirect} from "react-router-dom";
import React from "react";
import Authorization from "../containers/authorization";
import NotationsList from "../containers/notations-list";
import NotationForm from "../containers/notation-form";
import NotationDetails from "../containers/notation-details";
import NotFound from "../containers/not-found";
import Clock from "../containers/clock";
import {NotationsFormStrategyTypes} from "../constants";
import defaultRoute from "./default-route";
import ActionTypes from "../store/action-types";

const {auth: {SignIn, SignUp}} = ActionTypes;

export const staticChildRoutes = [
    {
        key: 'sign-in',
        render: () => <Authorization title='Sign In' actionType={SignIn}/>,
        exact: true,
        path: '/sign-in'
    },
    {
        key: 'sign-up',
        render: () => <Authorization title='Sign Up' actionType={SignUp}/>,
        exact: true,
        path: '/sign-up'
    },
    {
        key: 'notations',
        component: NotationsList,
        exact: true,
        path: '/notations'
    },
    {
        key: 'notation-new',
        render: () => <NotationForm strategyType={NotationsFormStrategyTypes.create}/>,
        exact: true,
        path: '/notations/new'
    },
    {
        key: 'notation-details',
        component: NotationDetails,
        exact: true,
        path: '/notations/:id'
    },
    {
        key: 'update-notation',
        render: () => <NotationForm strategyType={NotationsFormStrategyTypes.update}/>,
        exact: true,
        path: '/notations/:id/update'
    },
    {
        key: 'clock',
        component: Clock,
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
        component: NotFound
    }
];

export const staticRoutes = [
    {
        ...defaultRoute,
        routes: [...defaultRoute.routes, ...staticChildRoutes]
    }
];