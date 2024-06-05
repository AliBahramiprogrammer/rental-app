// import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { useSelector } from "react-redux"
import Slide from "../components/Slide"
import Categories from "../components/Categories"


const HomePage = () => {
    const user = useSelector((state: any) => state.user)
    console.log(user)
    return (
        <>
            <Navbar />
            <Slide />
            <Categories />
        </>
    )
}

export default HomePage;