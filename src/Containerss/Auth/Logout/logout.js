import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../../Store/Actions/Auth';
import Modal from '../../../Components/Ui/Modal/Modal';
import Button from '../../../Components/Ui/Button/Button';
// import { Redirect } from 'react-router-dom'

class Logout extends Component {
	// componentDidMount() {
	//     this.props.onLogout();
	// }
	logoutclicked = (props) => {
		this.props.onLogout();
		this.props.history.push('/');
	};

	render() {
		return (
			<Modal show='true' style={{}}>
				<p style={{ textAlign: 'center' }}> Are you sure you want to logout??</p>
				<Button style={{ marginLeft: '180px' }} clicked={this.logoutclicked} btnType='Success'>
					logout??
				</Button>
				{/* </div> */}
			</Modal>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onLogout: () => dispatch(logout()),
	};
};

export default connect(null, mapDispatchToProps)(Logout);

// style = {{
//     marginTop: '15%', marginLeft: "30%", width: "500px",
//         height: "100px", backgroundColor: "white", padding: "100px",
//             font: "inherit", color: "black"
// }}
