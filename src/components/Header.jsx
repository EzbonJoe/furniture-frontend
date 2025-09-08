import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaUserShield } from "react-icons/fa";
import {useState} from "react"

export default function Header(){
  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = !!user;
  const isAdmin = user?.isAdmin === true;
   const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim() !== "") {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return(
    <header>
      <div>
        <span><Link to="/" style={{
          textDecoration: "none",
          color: "white",
          fontSize: "24px",
          fontWeight: "bold"
        }}>Go Furniture</Link></span>
      </div>

      <div>
        <span>Logo</span>
      </div>

      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search for products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress}
          className="search-bar"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      
      <nav>
        <ul>
          <li><Link to="/" className="link">Home</Link></li>
          <li><Link to="/products" className="link">Products</Link></li> 
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          {isLoggedIn && !isAdmin && (
            <>
              <li><Link to="/cart">Cart</Link></li>         
              <li>
                <Link to="/userDashboard">Dashboard</Link>
              </li>
              <li>
                <span style={{ color: "white", textDecoration: "none"}}>Hi, {user?.name?.split(" ")[0]}</span>
              </li>              
            </>
          )}
          {isLoggedIn && isAdmin && (
            <>
              <li>
                <Link to="/adminDashboard" className="link">Admin Panel</Link>
              </li>
              <li><span style={{ color: "white" }}><FaUserShield/> {user.name}</span></li>
              
            </>
          )}
          {!isLoggedIn && (
            <>
              <li><Link to="/login" className="link">Login</Link></li>
              <li><Link to="/signup" className="link">Signup</Link></li>
            </>
          )}
        </ul>

      </nav>
    
    </header>
  )
}