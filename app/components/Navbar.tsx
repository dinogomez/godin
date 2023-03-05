import Link from "next/link";
export default function Navbar(){
    return(
        <div className="flex justify-center items-center py-3 border-b border-neutral-400">
            <ul className="flex">

                <li className="mr-6">
                <Link href="/">
                <span className="text-neutral-500 hover:text-neutral-800">Home</span>
                </Link>
                </li>

                <li className="mr-6">
                <Link href="/login">
                <span className="text-neutral-500 hover:text-neutral-800" >Login</span>
                </Link>
                </li>

                <li className="mr-6">
                <Link href="/register">
                <span className="text-neutral-500 hover:text-neutral-800" >Register</span>
                </Link>
                </li>

                <li className="mr-6">
                <Link href="/menu">
                <span className="text-neutral-500 hover:text-neutral-800" >Menu</span>
                </Link>
                </li>

            </ul>
        </div>
    );
  }
  