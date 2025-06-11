'use client';
import { useState } from "react";

export default function Home() {
  const [apuesta1, setApuesta1] = useState<number | null>(null);
  const [multiplicador1, setMultiplicador1] = useState<number | null>(null);
  const [apuesta2, setApuesta2] = useState<number | null>(null);
  const [mostrarApuesta2, setMostrarApuesta2] = useState(false);

  function generarApuesta() {
    const multiplicador = elegirMultiplicador();
    const apuesta = calcularApuesta(multiplicador);

    setMultiplicador1(multiplicador);
    setApuesta1(apuesta);

    if (multiplicador > 4 || apuesta > 10) {
      setApuesta2(apuesta * 2);
      setMostrarApuesta2(true);
    } else {
      setMostrarApuesta2(false);
      setApuesta2(null);
    }
  }

  function elegirMultiplicador() {
    const multiplicadores = Array.from({ length: 30 }, (_, i) => i + 1);
    const pesos = multiplicadores.map((m) => 1 / m);
    const total = pesos.reduce((a, b) => a + b, 0);
    const normalizados = pesos.map((p) => p / total);

    let r = Math.random();
    let suma = 0;
    for (let i = 0; i < normalizados.length; i++) {
      suma += normalizados[i];
      if (r <= suma) return multiplicadores[i];
    }
    return 30;
  }

  function calcularApuesta(multiplicador: number) {
    const apuestaMax = 20;
    const apuestaMin = 1;
    const apuesta = apuestaMax - ((multiplicador - 1) / 29) * (apuestaMax - apuestaMin);
    return Math.round(apuesta);
  }

  return (
    <div className="p-4 max-w-md mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">Simulador de Apuestas para Aviator</h1>
      <button onClick={generarApuesta} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-6">Generar Apuestas</button>

      {apuesta1 !== null && (
        <div className="mb-4 border rounded p-4 bg-white shadow">
          <p className="text-lg font-medium">Apuesta 1: ${apuesta1} | Retiro en x{multiplicador1}</p>
        </div>
      )}

      {mostrarApuesta2 && (
        <div className="border rounded p-4 bg-white shadow">
          <p className="text-lg font-medium">Apuesta 2: ${apuesta2} | Retiro en x15</p>
        </div>
      )}
    </div>
  );
}
