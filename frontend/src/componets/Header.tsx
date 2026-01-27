import api from "../utiles/api";


const Header = () => {
    const handleLogout=async()=>{
        const res=await api.post('/logout');
        console.log(res)
    }
  return (
    <div>
      <h2>Header</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Header;