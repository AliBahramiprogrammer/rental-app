import { IconButton } from "@mui/material";
import { Search, Person, Menu, Login, HowToReg } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/Navbar.scss";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../redux/state";

const Navbar = () => {
    const [search, setSearch] = useState("");
    const [dropdownMenu, setDropdownMenu] = useState(false);

    const user = useSelector((state: any) => state.user);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    return (
        <div className="navbar">
            <Link to="/" className="logo">
                <img src="assets/logo.png" alt="logo" />
            </Link>

            <div
                className="navbar_search"
                onKeyUp={(e) => {
                    if (e.key === "Enter" && search !== "") {
                        navigate(`/properties/search/${search}`);
                    }
                }}
            >
                <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <IconButton disabled={search === ""}>
                    <Search
                        sx={{ color: "#F8395A" }}
                        onClick={() => {
                            navigate(`/properties/search/${search}`);
                        }}
                    />
                </IconButton>
            </div>

            <div className="navbar_right">
                {user ? (
                    <Link to="/create-listing" className="host">
                        Become A Host
                    </Link>
                ) : (
                    <Link to="/login" className="host">
                        Become A Host
                    </Link>
                )}

                <button
                    className="navbar_right_account"
                    id="dropdown"
                    onClick={() => setDropdownMenu(!dropdownMenu)}
                >
                    <Menu sx={{ color: "#969393" }} />
                    {!user ? (
                        <Person sx={{ color: "#969393" }} />
                    ) : (
                        <img
                            src={`${user.profileImagePath}`}
                            alt="profile photo"
                            style={{ objectFit: "cover", borderRadius: "50%" }}
                        />
                    )}
                </button>

                {dropdownMenu && !user && (
                    <div className="navbar_right_accountmenu" >
                        <Link to="/login">
                            Log In
                            <Login />
                        </Link>
                        <Link to="/register">
                            Sign Up
                            <HowToReg />
                        </Link>
                    </div>
                )}

                {dropdownMenu && user && (
                    <div className="navbar_right_accountmenu" >
                        <Link to={`${user._id}/trips`}>Trip List</Link>
                        <Link to={`${user._id}/wishList`}>Wish List</Link>
                        <Link to={`${user._id}/properties`}>Property List</Link>
                        <Link to={`${user._id}/reservations`}>
                            Reservation List
                        </Link>
                        <Link to="/create-listing">Become A Host</Link>

                        <Link
                            to="/login"
                            onClick={() => {
                                dispatch(userActions.logout());
                            }}
                        >
                            Log Out
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
