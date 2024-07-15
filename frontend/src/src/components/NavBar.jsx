export const NavBar= ({isAuthenticated, handleLogout})=>{
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl" href="/">SANGRAKSHAK</a>
      </div>
      <div className="flex-none">
        {!isAuthenticated ?
        (<><a href="signup"><button className="btn btn-outline mr-2">Sign Up</button></a>
        <a href="signin"><button className="btn btn-outline">Sign In</button></a></>)
        : (<button className="btn btn-outline mr-2" onClick={()=>handleLogout()}>Logout</button>)}
      </div>
    </div>
  );
};