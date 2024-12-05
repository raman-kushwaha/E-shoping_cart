import { Link, useNavigate } from "react-router-dom";

const Header = ({ selectedTab, setSelectedTab }) => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();

  const handleOnClick = (event) => {
    localStorage.clear();
    navigate("/signup");
  };

  return (
    <div className="container">
      <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
        <Link
          to="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
        >
          <svg className="bi me-2" width="40" height="32">
            <use xlinkHref="#bootstrap"></use>
          </svg>
          <span className="fs-4">Dashboard</span>
        </Link>

        {auth ? (
          <ul className="nav nav-pills">
            <li className="nav-item">
              <Link
                to="/"
                className={`nav-link  ${
                  selectedTab === "Products" && "active"
                }`}
                aria-current="page"
                onClick={() => {
                  setSelectedTab("Products");
                }}
              >
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/addProduct"
                className={`nav-link  ${
                  selectedTab === "addProduct" && "active"
                }`}
                onClick={() => {
                  setSelectedTab("addProduct");
                }}
              >
                Add Product
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/updateProduct"
                className={`nav-link  ${
                  selectedTab === "updateProduct" && "active"
                }`}
                onClick={() => {
                  setSelectedTab("updateProduct");
                }}
              >
                Update Product
              </Link>
            </li>
            {auth ? (
              <li className="nav-item">
                <Link
                  to="/profile"
                  className={`nav-link  ${
                    selectedTab === "profile" && "active"
                  }`}
                  onClick={() => {
                    setSelectedTab("profile");
                  }}
                >
                  {JSON.parse(auth).fullname}
                </Link>
              </li>
            ) : (
              <li className="nav-item">
                <Link
                  to="/profile"
                  className={`nav-link  ${
                    selectedTab === "profile" && "active"
                  }`}
                  onClick={() => {
                    setSelectedTab("profile");
                  }}
                >
                  Profile
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link
                to="/signup"
                className={`nav-link  ${selectedTab === "logout" && "active"}`}
                onClick={(event) => {
                  handleOnClick(event);
                  setSelectedTab("logout");
                }}
              >
                Logout
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="nav nav-pills">
            <li className="nav-item">
              <Link
                to="/signup"
                className={`nav-link  ${selectedTab === "signup" && "active"}`}
                onClick={() => {
                  setSelectedTab("signup");
                }}
              >
                SignUp
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/login"
                className={`nav-link  ${selectedTab === "login" && "active"}`}
                onClick={() => {
                  setSelectedTab("login");
                }}
              >
                Login
              </Link>
            </li>
          </ul>
        )}
      </header>
    </div>
  );
};

export default Header;

/** */
