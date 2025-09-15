const stats = [
  { value: "40%", label: "Average Cost Reduction" },
  { value: "95%", label: "Forecast Accuracy" },
  { value: "10K+", label: "Companies Trust Us" },
];

const StatsSection = () => {
  return (
    <section id="features" className="bg-primary text-white py-5">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 text-center gap-8">
        {stats.map((stat, index) => (
          <div key={index}>
            <h2 className="text-4xl font-bold">{stat.value}</h2>
            <p className="text-sm opacity-90 mt-2">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
