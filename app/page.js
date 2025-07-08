"use client";

import { useState } from 'react';

const perguntas = [
  "작거나 사소한 일상 상황에서도 분노를 조절하기 어렵습니다.",
  "쉽게 인내심을 잃고 가까운 사람이든 낯선 사람이든 자주 화를 폭발시킵니다.",
  "극심한 분노를 표출한 후 내가 한 말이나 행동에 대해 후회할 때가 많습니다.",
  "누군가가 나를 화나게 하거나 실망시켰을 때 쉽게 용서하지 못하고 오래도록 마음에 담아둡니다.",
  "분노를 느낄 때 심장 박동이 빨라지거나 근육이 긴장되고 호흡이 가빠지는 등 신체적으로 강하게 나타납니다.",
  "최근 심한 분노로 인해 나 자신이나 다른 사람을 신체적으로 해치고 싶은 생각을 한 적이 있습니다.", // FLAG
  "빈번한 짜증과 화 때문에 가족 관계, 직장 생활, 사회생활이 부정적으로 영향을 받습니다.",
  "시간이 지날수록 내 분노가 나아지기보다는 점점 심해지는 느낌입니다.",
  "상황을 평화롭게 해결하고 싶어도 공격적이거나 적대적으로 반응하는 경우가 많습니다.",
  "분노로 인해 행동했던 나 자신에 대해 자주 부끄럽고 후회스러운 감정을 느낍니다."
];

export default function TesteRaiva() {
  const [respostas, setRespostas] = useState(Array(10).fill(0));
  const [resultado, setResultado] = useState(null);
  const [indiceAtual, setIndiceAtual] = useState(0);

  const registrarResposta = (valor) => {
    const novasRespostas = [...respostas];
    novasRespostas[indiceAtual] = valor;
    setRespostas(novasRespostas);

    if (indiceAtual < perguntas.length - 1) {
      setIndiceAtual(indiceAtual + 1);
    } else {
      calcularResultado(novasRespostas);
    }
  };

  const calcularResultado = (respostas) => {
    if (respostas[5] >= 3) { // FLAG
      setResultado("적색");
    } else {
      const soma = respostas.reduce((a, b) => a + b, 0);
      if (soma <= 20) setResultado("녹색");
      else if (soma <= 35) setResultado("황색");
      else setResultado("적색");
    }
  };

  const reiniciarTeste = () => {
    setRespostas(Array(10).fill(0));
    setResultado(null);
    setIndiceAtual(0);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md">
      {!resultado ? (
        <>
          <h2 className="text-xl font-semibold mb-4">분노 테스트</h2>
          <p className="mb-4">{perguntas[indiceAtual]}</p>
          <div className="flex justify-between">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-700"
                onClick={() => registrarResposta(num)}
              >
                {num}
              </button>
            ))}
          </div>
          <p className="mt-4 text-sm">질문 {indiceAtual + 1} / {perguntas.length}</p>
        </>
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-4">결과: {resultado}</h2>
          {resultado === "녹색" && <p>분노를 매우 잘 관리하고 있으며 정서적으로 안정된 상태입니다. 다른 사람을 도울 수 있는 능력이 있습니다.</p>}
          {resultado === "황색" && <p>해결이 필요한 정서적 어려움의 신호가 나타납니다. 의지와 도움을 통해 충분히 극복할 수 있습니다.</p>}
          {resultado === "적색" && <p>이 주제와 관련된 분노 문제가 심각하여 전문적인 도움이 필요합니다. 가능한 빨리 의사나 심리 전문가를 찾으십시오.</p>}
          <button
            className="mt-4 px-4 py-2 bg-green-500 dark:bg-green-600 text-white rounded hover:bg-green-600 dark:hover:bg-green-700"
            onClick={reiniciarTeste}
          >
            테스트 다시 하기
          </button>
        </>
      )}
    </div>
  );
}
