import React from 'react';
import SpinnerKit from 'react-spinkit';
import styled from "@emotion/styled";

const SpinnerContainer = styled.div(() => ({
    display: 'flex',
    alignItems: 'center',
    zIndex: 1,
    position: 'absolute' ,
    justifyContent: 'center',
    height: 'calc(100vh - 100px)',
    // eslint-disable-next-line no-nested-ternary
    top: 60,
    // eslint-disable-next-line no-nested-ternary
    left: 0,
    right: 0,
}));

class Spinner extends React.Component { // eslint-disable-line react/prefer-stateless-function
    render() {
        // if (loading) return null;
        return (
            // <ListWrapper>
            <SpinnerContainer>
                <SpinnerKit name={'ball-spin-fade-loader'} fadeIn="none" color="#095b9a" />
            </SpinnerContainer>
            // </ListWrapper>
        );
    }
}

// Spinner.propTypes = {
//     loading: PropTypes.bool
// };


export default (Spinner);
