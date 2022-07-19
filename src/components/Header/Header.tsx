import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


export interface HeaderProps {
    isAuth: string;
}

const Header: React.SFC<HeaderProps> = ({ isAuth }) => {
    const ulStyle = { display: "flex", padding: "0", listStyle: "none" };
    const liStyle = { padding: "5px", border: "1px solid black", margin: "2px" }

    const display = () => {
        if (isAuth) {
            return (
                <>
                    Sloovee
                </>
            );
        } else {
            return (
                <>
                    
                </>
            );
        }
    };
    return (
        <div >
            {display()}
        </div>
    );
};

const mapStateToProps = (state: any) => {
    return {
        isAuth: state.auth.authentichated
    };
};

export default connect(mapStateToProps)(Header);