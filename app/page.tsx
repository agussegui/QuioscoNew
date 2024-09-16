"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function LoadingScreenWithButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("Cargando Tu Tienda...")

  useEffect(() => {
    // Simulamos un tiempo de carga de 3 segundos para los datos
    setTimeout(() => {
      setLoading(false);
      setTitle("Tu Tienda está lista!")
    }, 3000); // 3 segundos
  }, []);

  const handleClick = () => {
    router.push("/order/cafe"); // Redirecciona a la página de la tienda
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white">
      <header className="text-center mb-8">
        <div className="">
          <Image 
            src="/logo.svg"
            width={300}
            height={300}
            alt="Tienda Logo"
            className="mb-4 flex items-center"
          />
        </div>
        <h1 className="text-4xl font-bold">{title}</h1>
      </header>

      {loading ? (
        <>
          <p className="text-lg text-gray-700">Preparando tus productos...</p>
          <div className="mt-8 flex justify-center items-center space-x-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce delay-100"></div>
            <div className="w-4 h-4 bg-red-500 rounded-full animate-bounce delay-200"></div>
          </div>
        </>
      ) : (
        <button
          onClick={handleClick}
          className="mt-8 bg-yellow-500 text-black py-3 px-6 rounded-lg hover:bg-yellow-600 transition duration-300"
        >
          Empezar Compras
        </button>
      )}
    </div>
  );
}