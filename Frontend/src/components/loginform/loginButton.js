import { GoogleLogin } from "react-google-login";

const clientId = process.env.REACT_APP_CLIENT_ID;

function LoginButton() {
  const onSuccess = (res) => {
    sessionStorage.setItem("isAuth", "true");
    sessionStorage.setItem("userId", res.profileObj.googleId);
    sessionStorage.setItem("userName", res.profileObj.name);
    // sessionStorage.setItem("userToken", userToken);
    setInterval(() => (window.location.pathname = "/home"), 1000);
    console.log("[Login Success] currentUser:", res.profileObj);
  };

  const onFailure = (res) => {
    console.log("[Login Failed] res:", res);
  };

  return (
    <GoogleLogin
      clientId={clientId}
      buttonText="Sign in with google"
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={"single_host_origin"}
      isSignedIn={true}
    />
  );
}

export default LoginButton;
