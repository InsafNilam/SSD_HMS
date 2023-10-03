import { GoogleLogout } from "react-google-login";

const clientId = process.env.REACT_APP_CLIENT_ID;

function Logout() {
  const onSuccess = () => {
    alert("Logout made successfully");
    // this.props.history.push('/');
    // window.location.reload();
  };

  return (
    <div id="signOutButton">
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      />
    </div>
  );
}

export default Logout;
