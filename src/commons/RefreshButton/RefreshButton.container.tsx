import * as React from 'react';
import RefreshButton from './RefreshButton';

const RefreshButtonContainer = (props: Props) => {
    const childProps = {
        ...props,
    };

    return <RefreshButton {...childProps} />;
};

RefreshButtonContainer.defaultProps = {};

interface Props {
    refresh: (value: boolean) => void;
    disabled?: boolean;
}

export default RefreshButtonContainer;
