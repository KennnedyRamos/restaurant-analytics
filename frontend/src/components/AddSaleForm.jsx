import React, { useState } from "react";
import { createSale } from "../services/api";

const AddSaleForm = ({ onSaleCreated }) => {
  const [product, setProduct] = useState("");
  const [channel, setChannel] = useState("");
  const [day, setDay] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newSale = await createSale({
        product,
        channel,
        day,
        amount: parseFloat(amount),
      });
      onSaleCreated(newSale);
      setProduct(""); setChannel(""); setDay(""); setAmount("");
      alert("✅ Venda adicionada com sucesso!");
    } catch (err) {
      console.error(err);
      alert("❌ Erro ao adicionar venda");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-2xl shadow-sm mb-6 flex flex-wrap gap-2">
      <input placeholder="Produto" value={product} onChange={(e) => setProduct(e.target.value)} className="border p-2 rounded flex-1 min-w-[120px]" required />
      <input placeholder="Canal" value={channel} onChange={(e) => setChannel(e.target.value)} className="border p-2 rounded flex-1 min-w-[120px]" required />
      <input placeholder="Dia" value={day} onChange={(e) => setDay(e.target.value)} className="border p-2 rounded flex-1 min-w-[120px]" required />
      <input type="number" placeholder="Valor" value={amount} onChange={(e) => setAmount(e.target.value)} className="border p-2 rounded flex-1 min-w-[120px]" required />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Adicionar Venda</button>
    </form>
  );
};

export default AddSaleForm;
