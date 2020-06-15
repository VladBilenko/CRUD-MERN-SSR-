import React from 'react';

const Loader = ({error}) => {
    return (
        error ?
            <div>
                Loading error
            </div> :
            <div>
                Loading...
            </div>
    );
};

export default Loader;