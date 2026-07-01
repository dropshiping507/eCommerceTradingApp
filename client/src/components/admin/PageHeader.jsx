const PageHeader = ({ heading, subheading }) => {
  return (
    <div className="border border-slate-700 text-slate-300 p-2 mb-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold">{heading}</h1>

        <p className="text-gray-500 mt-2">{subheading} </p>
      </div>
    </div>
  );
};

export default PageHeader;
