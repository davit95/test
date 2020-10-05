import React  from 'react';

const PublicRoute = ({ component: Component, exact, ...rest }) => {
    return <Component exact {...rest} />
}

export default PublicRoute;