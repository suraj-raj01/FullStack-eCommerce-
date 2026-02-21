import Hero from "./Hero"
import Navbar from "./Navbar"
import ElectronicProducts from "./products/ElectronicProducts"

const Home = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <ElectronicProducts/>
    </div>
  )
}

export default Home;