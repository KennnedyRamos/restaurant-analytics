import React, { useState, useEffect } from "react";
import KPICards from "./KPICards";
import Chart from "./Chart";
import Filters from "./Filters";
import { getOverview, getTopProductsFiltered } from "../services/api";

const Dashboard = () => {
  const [filters, setFilters] = useState({ startDate: null, endDate: null });
  const [overview, setOverview] = useState({});
  const [storeData, setStoreData] = useState([]);
  const [channelData, setChannelData] = useState([]);
  const [dailySalesData, setDailySalesData] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      // Carregar métricas gerais
      const overviewRes = await getOverview(filters);
      setOverview(overviewRes);

      // Transformar sales_by_channel em array para gráfico de pizza
      const channelChartData = Object.entries(overviewRes.sales_by_channel || {}).map(
        ([channel, value]) => ({ canal: channel, faturamento: value })
      );
      setChannelData(channelChartData);

      // Transformar top_products em array para gráfico de barras por loja
      const storeChartData = (overviewRes.top_products || []).map((item) => ({
        loja: item.produto || "Produto Desconhecido",
        faturamento: item.total_vendido || 0,
      }));
      setStoreData(storeChartData);

      // Carregar vendas diárias filtradas
      const dailySalesRes = await getTopProductsFiltered(filters, 30); // 30 dias
      const dailyChartData = dailySalesRes.map((item) => ({
        date: item.day,
        sales: item.amount,
      }));
      setDailySalesData(dailyChartData);

    } catch (err) {
      console.error("Erro ao carregar dados:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [filters]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">📊 Painel de Vendas</h1>

      <Filters filters={filters} setFilters={setFilters} />

      {loading ? (
        <div className="space-y-4">
          <div className="h-24 bg-gray-300 rounded animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="h-80 bg-gray-300 rounded animate-pulse"></div>
            <div className="h-80 bg-gray-300 rounded animate-pulse"></div>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <KPICards data={overview} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Chart
              title="Faturamento por Loja"
              type="bar"
              data={storeData}
              dataKey="loja"
              valueKey="faturamento"
            />
            <Chart
              title="Faturamento por Canal"
              type="pie"
              data={channelData}
              dataKey="canal"
              valueKey="faturamento"
            />
          </div>

          <Chart
            title="Vendas por Dia"
            type="line"
            data={dailySalesData}
            dataKey="date"
            valueKey="sales"
          />

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Top 10 Produtos</h2>
            <table className="w-full bg-white rounded-2xl shadow-sm border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-left">Produto</th>
                  <th className="p-3 text-right">Total Vendido</th>
                </tr>
              </thead>
              <tbody>
                {(overview.top_products || []).map((item, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-3">{item.produto}</td>
                    <td className="p-3 text-right">{item.total_vendido}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
