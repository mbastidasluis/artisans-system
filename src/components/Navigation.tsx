import { useAuth } from "@/contexts/AuthContext"
import { useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"

export default function Navigation() {
    const routes = [
        { tag: "Inicio", path: "/" }, // TODO if user is signed in, redirect to artisans
        { tag: "Artesanos", path: "/artisans" },
        { tag: "Crear", path: "/artisan" },
        { tag: "Salir", path: "/signout" },
    ]

    const { user } = useAuth()
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/") {
            if (user) {
                navigate('/artisans')
            }
        } else {
            if (!user) {
                navigate('/')
            }
        }
    }, [location, user])

    return (
        <>
            {user ?
                <nav className="p-10 flex justify-around h-[250px] w-full px-8">
                    <div className="text-cyan-900 text-3xl font-bold" >Sistema de Artesanos</div>
                    <ul className="flex space-x-4 text-lg font-bold">
                        {routes.map(route => (
                            <li key={route.path}>
                                <Link to={route.path} className="text-cyan-900 hover:text-cyan-800 hover:border-b-4 hover:border-cyan-200" >{route.tag}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                : null}
        </>
    )
}