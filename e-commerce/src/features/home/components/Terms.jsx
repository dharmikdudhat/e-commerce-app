// TermsOfService.js


const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      {/* Assuming you have a common Layout component */}
      {/* Include your header here if you have one */}

      <div className="container mx-auto p-8 bg-white shadow-lg mt-8">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
        <p className="mb-4">
          Welcome to our Terms of Service. Please read these terms carefully
          before using our website.
        </p>
        <p className="mb-4">
          By accessing or using the Service, you agree to be bound by these
          Terms. If you disagree with any part of the terms, then you may not
          access the Service.
        </p>
        {/* Add more content for your Terms of Service page */}

        {/* Example section */}
        <h2 className="text-2xl font-bold mt-6 mb-4">Section 1: Usage</h2>
        <p className="mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>

        {/* Example section */}
        <h2 className="text-2xl font-bold mt-6 mb-4">Section 2: Restrictions</h2>
        <p className="mb-4">
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat.
        </p>

        {/* Add more sections and content as needed */}
      </div>

      {/* Assuming you have a common Layout component */}
      {/* Include your footer here if you have one */}
    </div>
  );
};

export default Terms;
