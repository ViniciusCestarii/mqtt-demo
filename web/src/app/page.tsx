import TemperatureLineChart from "@/components/temperature-line-chart";

export default function Home() {
  return (
    <main className="sm:items-start bg-[#100C2A] min-h-screen text-white p-4 flex justify-center">
      <TemperatureLineChart />
    </main>
  );
}
