import React from 'react'
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import toast from 'react-hot-toast';
import SearchInput from './Form/searchInput';
import useCategory from '../../hooks/useCategory';
import { useCart } from '../../context/cart';
import { Badge } from 'antd';
const Header = () => {
  const [cart] = useCart();
  const [auth, setAuth] = useAuth();
  const categories = useCategory();
  const handleLogout = () => {
    //on logging out, local storage ko clear krna h and jo bhi user token show kr rh h usse bhi empt krna h
    setAuth({
      //spreading auth
      ...auth,
      //emptying the user
      user: null,
      token: ''
    })
    localStorage.removeItem('auth');
    toast.success("Logout Successfully");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary " >
        <div className="container-fluid">
          <button className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to='/' className="navbar-brand" >
              Shopify
            </Link>

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <SearchInput />
              <li className="nav-item">
                <NavLink to='/' className="nav-link "  >
                  Home
                </NavLink>
              </li>

              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to='/categories'
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Categories
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={"/categories"}>
                      All Categories
                    </Link>
                  </li>
                  {categories?.map((c) => (
                    <Link to={`/category/${c.slug}`} className="dropdown-item">{c.name}</Link>
                  ))}
                </ul>
              </li>



              {
                //if user doesnt exist toh login register dikhao
                //if user exists then logout ka option do
                //first condition for true next one for false
                !auth.user ? (<>
                  <li className="nav-item">
                    <NavLink to='/Register' className="nav-link" >
                      Register
                    </NavLink>
                  </li>


                  <li className="nav-item">
                    <NavLink to='/Login' className="nav-link" >
                      Login
                    </NavLink>
                  </li>
                </>) : (<>
                  <li className="nav-item dropdown">
                    <NavLink className="nav-link dropdown-toggle"
                      role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      {auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`} className="dropdown-item"> Dashboard </NavLink>

                        <NavLink onClick={handleLogout} to='/Login' className="dropdown-item"> Logout </NavLink>
                      </li>
                    </ul>
                  </li>

                </>)
              }

              <li className="nav-item">
                <NavLink to='/Cart' className="nav-link">
                  <Badge count={cart?.length} showZero>
                    Cart
                  </Badge>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

    </>
  )
}

export default Header