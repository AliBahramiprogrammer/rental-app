import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CreateListing from "./pages/CreateListing";
import ListingDetails from "./pages/ListingDetails";
import CategoryPage from "./pages/CategoryPage";
import SearchPage from "./pages/SearchPage";
import TripList from "./pages/TripList";
import WishList from "./pages/WishList";
import PropertyList from "./pages/PropertyList";
import ReservationList from "./pages/ReservationList";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}   />
        <Route path="/register" element={<RegisterPage/>}   />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/create-listing" element={<CreateListing/>}/>
        <Route path="/properties/:listingId" element={<ListingDetails/>}/>
        <Route path="/properties/category/:category" element={<CategoryPage />} />
        <Route path="/properties/search/:search" element={<SearchPage />} />
        <Route path="/:userId/trips" element={<TripList />} />
        <Route path="/:userId/wishList" element={<WishList />} />
        <Route path="/:userId/properties" element={<PropertyList />} />
        <Route path="/:userId/reservations" element={<ReservationList />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
