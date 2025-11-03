import React from "react";

const KPICards = ({ data }) => {
  const metrics = [
    { title: "Faturamento Total", value: `R$ ${data.faturamento_total?.toFixed(2) || "0.00"}` },
    { title: "Ticket Médio", value: `R$ ${data.ticket_medio?.toFixed(2) || "0.00"}` },
    { title: "Pedidos", value: data.pedidos || 0 },
    { title: "Clientes", value: data.clientes || 0 },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((item) => (
        <div key={item.title} className="bg-white p-5 rounded-2xl shadow-sm text-center">
          <h3 className="text-sm text-gray-500">{item.title}</h3>
          <p className="text-2xl font-semibold text-gray-800 mt-1">{item.value}</p>
        </div>
      ))}
    </div>
  );
};

export default KPICards;
