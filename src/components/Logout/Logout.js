import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { logout } from '../../store/actions/auth'
import { withRouter } from '../../hoc'

const Logout = ({ logout, navigate }) => {
    useEffect(() => {
        logout()
        navigate('/auth')
    }, [logout, navigate]);

    return <div></div>;
}

function mapDispatchToProps(dispatch) {
    return {
        logout: () => dispatch(logout())
    }
}

export default connect(null, mapDispatchToProps)(withRouter(Logout))