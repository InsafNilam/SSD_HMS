import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { gapi } from "gapi-script";
import { useEffect } from "react";

// Sign Up and Sign In Components
import SignUp from "./components/pages/Signup";
import LoginForm from "./components/loginform/LoginForm";
//Main Component
import Home from "./components/pages/Home";
import ContactUs from "./components/pages/ContactUs";
import Products from "./components/pages/Products";
import Appointment from "./components/pages/Appointment";
//Sub Component
import MakeAppointment from "./components/pages/MakeApp";
import BookingHistory from "./components/pages/BookingHistory";
import TreatmentHistory from "./components/pages/TreatmentHistory";
import ManageBooking from "./components/pages/ManageBooking";
import AppFeedback from "./components/pages/Feedback";
import GenerateReport from "./components/pages/GenerateReport";
//Implement Protected Route For the Components
import ProtectedRoute from "./ProtectedRoute";

const clientId =
  "488218631408-fqao03pe8hpt9n25788arc554986p54a.apps.googleusercontent.com";

function App() {
  useEffect(() => {
    gapi.load("auth2", () => {
      gapi.auth2.init({
        client_id: clientId,
      });
    });
  }, []);

  const isAuth = sessionStorage.getItem("isAuth");
  const userRole = sessionStorage.getItem("userRole");

  if (userRole === "admin") {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={!isAuth ? LoginForm : Home} />
          <Route path="/sign-up" exact component={!isAuth ? SignUp : Home} />

          <ProtectedRoute path="/home" exact component={Home} auth={isAuth} />
          <ProtectedRoute
            path="/Appointment"
            exact
            component={Appointment}
            auth={isAuth}
          />
          <ProtectedRoute
            path="/products"
            exact
            component={Products}
            auth={isAuth}
          />
          <ProtectedRoute
            path="/contact-us"
            exact
            component={ContactUs}
            auth={isAuth}
          />

          {/* IT20260224 Personal Routes */}
          <ProtectedRoute
            path="/booking-history"
            exact
            component={BookingHistory}
            auth={isAuth}
          />
          <ProtectedRoute
            path="/generate-report"
            exact
            component={GenerateReport}
            auth={isAuth}
          />
          <ProtectedRoute
            path="/app-feedback"
            exact
            component={AppFeedback}
            auth={isAuth}
          />
        </Switch>
      </Router>
    );
  } else if (userRole === "doctor") {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={!isAuth ? LoginForm : Home} />
          <Route path="/sign-up" exact component={!isAuth ? SignUp : Home} />

          <ProtectedRoute path="/home" exact component={Home} auth={isAuth} />
          <ProtectedRoute
            path="/Appointment"
            exact
            component={Appointment}
            auth={isAuth}
          />
          <ProtectedRoute
            path="/products"
            exact
            component={Products}
            auth={isAuth}
          />
          <ProtectedRoute
            path="/contact-us"
            exact
            component={ContactUs}
            auth={isAuth}
          />

          {/* IT20260224 Personal Routes */}
          <ProtectedRoute
            path="/booking-history"
            exact
            component={BookingHistory}
            auth={isAuth}
          />
          <ProtectedRoute
            path="/treatment-history"
            exact
            component={TreatmentHistory}
            auth={isAuth}
          />
          <ProtectedRoute
            path="/manage-booking"
            exact
            component={ManageBooking}
            auth={isAuth}
          />
          <ProtectedRoute
            path="/app-feedback"
            exact
            component={AppFeedback}
            auth={isAuth}
          />
        </Switch>
      </Router>
    );
  } else {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={!isAuth ? LoginForm : Home} />
          <Route path="/sign-up" exact component={!isAuth ? SignUp : Home} />

          <ProtectedRoute path="/home" exact component={Home} auth={isAuth} />
          <ProtectedRoute
            path="/Appointment"
            exact
            component={Appointment}
            auth={isAuth}
          />
          <ProtectedRoute
            path="/products"
            exact
            component={Products}
            auth={isAuth}
          />
          <ProtectedRoute
            path="/contact-us"
            exact
            component={ContactUs}
            auth={isAuth}
          />

          {/* IT20260224 Personal Routes */}
          <ProtectedRoute
            path="/make-appointment"
            exact
            component={MakeAppointment}
            auth={isAuth}
          />
          <ProtectedRoute
            path="/booking-history"
            exact
            component={BookingHistory}
            auth={isAuth}
          />
          <ProtectedRoute
            path="/treatment-history"
            exact
            component={TreatmentHistory}
            auth={isAuth}
          />
          <ProtectedRoute
            path="/manage-booking"
            exact
            component={ManageBooking}
            auth={isAuth}
          />
          <ProtectedRoute
            path="/app-feedback"
            exact
            component={AppFeedback}
            auth={isAuth}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
