import { Link } from "react-router-dom";

export default function Header(){
    return(
        <header className="w-full  bg-accent h-[100px] justify-center items-center flex relative">
            <div className="h-full flex items-center justify-center absolute left-5">
              <img src="/logo.png" alt="Logo" className="h-[70px]"/>
              <h1 className="text-2xl font-bold text-white ml-4">Isuri Computers</h1>
              </div>
              <div className="h-full flex justify-center items-center">
                <Link to="/" className="text-white mx-4 hover:border-b-2">Home</Link>
                <Link to="/about" className="text-white mx-4 hover:border-b-2">About</Link>
                <Link to="/contact" className="text-white mx-4 hover:border-b-2">Contact</Link>
                <Link to="/products" className="text-white mx-4 hover:border-b-2">Products</Link>

              </div>
        </header>
    )
}

