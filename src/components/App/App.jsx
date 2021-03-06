// React, Router, Redux
import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { useDispatch } from "react-redux";

// Custom components
import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import LandingPage from "../LandingPage/LandingPage";
import EnterPerson from "../EnterPerson/EnterPerson";
import SelectOccasion from "../SelectOccasion/SelectOccasion";
import SelectCategory from "../SelectCategory/SelectCategory";
import Dashboard from "../Dashboard/Dashboard";
import ViewPersons from "../ViewPersons/ViewPersons";
import ViewPersonsEvents from "../ViewPersonsEvents/ViewPersonsEvents";
import EditEvent from "../EditEvent/EditEvent";
import PickACard from "../PickACard/PickACard";
import ShippingConfirm from "../ShippingConfirm/ShippingConfirm";
import AdminCards from "../AdminCards/AdminCards";
import AdminOccasions from "../AdminOccasions/AdminOccasions";
import CardBrowser from "../CardBrowser/CardBrowser";
import "./App.css";

export default function App() {
  // Hooks
  const dispatch = useDispatch();

  // Get user
  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
  }, [dispatch]);

  return (
    <Router>
      <div className="background">
        <Nav />
        <Switch>
          <Redirect exact from="/" to="/home" />

          <Route exact path="/home">
            <LandingPage />
          </Route>

          <Route exact path="/person">
            <EnterPerson />
          </Route>

          <Route exact path="/occasion">
            <SelectOccasion />
          </Route>

          <Route exact path="/category">
            <SelectCategory />
          </Route>

          <Route exact path="/cards">
            <CardBrowser />
          </Route>

          <ProtectedRoute exact path="/dashboard">
            <Dashboard />
          </ProtectedRoute>

          <ProtectedRoute exact path="/persons">
            <ViewPersons />
          </ProtectedRoute>

          <ProtectedRoute exact path="/events/:id">
            <ViewPersonsEvents />
          </ProtectedRoute>

          <ProtectedRoute exact path="/edit/:id">
            <EditEvent />
          </ProtectedRoute>

          <ProtectedRoute exact path="/card/:id">
            <PickACard />
          </ProtectedRoute>

          <ProtectedRoute exact path="/shipping/:id">
            <ShippingConfirm />
          </ProtectedRoute>

          <ProtectedRoute exact path="/admin">
            {" "}
            {/*reAdd notAdminRedirect*/}
            <AdminOccasions />
          </ProtectedRoute>

          <ProtectedRoute exact path="/adminCards">
            {" "}
            {/*reAdd notAdminRedirect*/}
            <AdminCards />
          </ProtectedRoute>

          <Route>
            <img
              src="https://http.cat/404"
              alt="404 Cat Not Found"
              style={{ width: "100%" }}
            />{" "}
            {/* Cat stuff */}
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}
