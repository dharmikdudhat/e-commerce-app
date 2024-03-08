import NumberCounter from "../components/NumberCounter";

export const Landing = () => {
  const numberCounters = [
    { label: "Happy Customers", value: 200 },
    { label: "Varieties of Filters", value: 20 },
    { label: "Sales", value: 150 },
    { label: "Pending Orders", value: 300 },
  ];
  return (
    <>
      <div className="flex bg-cyan-100 justify-center rounded-md text-center m-6 font-bold text-2xl p-4 content-center sm:grid-cols-2 sm:gap-12 lg:grid-cols-4">
        {numberCounters.map((counter, index) => (
          <NumberCounter counter={counter} key={index} />
        ))}
      </div>
    </>
  );
};
