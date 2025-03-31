import Image from "next/image";
import Card from "./Components/Card";
import Busqueda from "./Components/Busqueda";
import Products from "./Components/Products";

export default function Home() {
    return (
        <div className="mt-36 w-screen h-auto">
            <Products nombre={"CORTINAS"}/>
            <Products nombre={"PERFUMES"}/>
            <Products nombre={"PIJAMAS"}/>
        </div>
    );
}
