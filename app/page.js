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
          <div className="mb-6 text-sm text-gray-700 dark:text-gray-300 text-center">
            <p className="mb-4">
              다음 상황이 현재 당신에게 얼마나 자주 발생하는지를 선택해 주세요:<br />
              <strong>(1) 전혀 아님 | (2) 드묾 | (3) 가끔 | (4) 자주 | (5) 항상</strong>
            </p>
          </div>

          <p className="mb-4">{perguntas[indiceAtual]}</p>

          <div className="flex justify-between items-end mb-4">
            {[1, 2, 3, 4, 5].map((num) => {
              const corGradiente = {
                1: "from-gray-300 to-gray-400",
                2: "from-blue-200 to-blue-300",
                3: "from-blue-300 to-blue-400",
                4: "from-blue-500 to-blue-600",
                5: "from-blue-700 to-blue-800",
              };

              return (
                <button
                  key={num}
                  onClick={() => registrarResposta(num)}
                  className={`flex items-center justify-center rounded-full text-white font-bold hover:scale-110 transition transform bg-gradient-to-br ${corGradiente[num]}`}
                  style={{
                    width: `${30 + num * 5}px`,
                    height: `${30 + num * 5}px`,
                    fontSize: `${12 + num}px`
                  }}
                >
                  {num}
                </button>
              );
            })}
          </div>

          <p className="mt-4 text-sm">질문 {indiceAtual + 1} / {perguntas.length}</p>
        </>
      ) : (
        <>
          
          <h2 className="text-xl font-semibold mb-4 text-center">결과: {resultado}</h2>
          <img
            src={
              resultado === "녹색"
                ? "/images/semaforo-verde.png"
                : resultado === "황색"
                ? "/images/semaforo-amarelo.png"
                : "/images/semaforo-vermelho.png"
            }
            alt={`신호등 표시: ${resultado}`}
            className="w-40 h-auto mx-auto mb-4"
          />
          {resultado === "녹색" && (
            <p className="text-center">이 주제에 매우 잘 대처하고 있으며 정서적으로 안정된 상태입니다. 다른 사람들을 도울 수 있는 능력이 있습니다.</p>
          )}
          {resultado === "황색" && (
            <p className="text-center">해결이 필요한 정서적 어려움의 분명한 신호가 있습니다. 의지와 도움을 통해 극복할 수 있습니다.</p>
          )}
          {resultado === "적색" && (
            <p className="text-center">이 주제와 관련된 정서적 문제가 전문적인 도움이 필요합니다. 가능한 빨리 의사나 심리 전문가를 찾으십시오.</p>
          )}
          <button
            className="mt-6 px-4 py-2 bg-green-500 dark:bg-green-600 text-white rounded hover:bg-green-600 dark:hover:bg-green-700 block mx-auto"
            onClick={reiniciarTeste}
          >
            테스트 다시 하기
          </button>
    
        </>
      )}
    </div>
  );
}
