import React from 'react';

const Team = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 py-12">
      <section id="team" className="w-full md:w-3/4 lg:w-2/3 bg-white shadow-xl rounded-lg border border-gray-300 p-8 transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 ease-in-out">
        <h2 className="text-4xl lg:text-5xl font-bold text-center mb-12 text-base-100 transition-colors duration-300 ease-in-out hover:text-blue-600">About the Team</h2>
        <div className="team-members grid gap-8 lg:grid-cols-2">
          <div className="team-member p-6 bg-base-100 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg duration-300 ease-in-out">
            <h3 className="text-2xl font-semibold mb-4 text-white-800 transition-colors duration-300 ease-in-out hover:text-blue-600">Udit Kaushish</h3>
            <p className="text-lg text-wihte-700 transition-colors duration-300 ease-in-out hover:text-blue-600">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero, magni ipsum qui voluptatem eaque, pariatur doloribus, recusandae officiis suscipit quos fugit fuga. Blanditiis quae modi molestiae culpa alias est quas praesentium delectus officia sed assumenda, consectetur maiores ipsam voluptatum molestias dignissimos reiciendis ex sint aperiam aliquam! Magni nemo ratione ab.
            </p>
          </div>
          <div className="team-member p-6 bg-base-100 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg duration-300 ease-in-out">
            <h3 className="text-2xl font-semibold mb-4 text-white-800 transition-colors duration-300 ease-in-out hover:text-blue-600">Prakher Pandey</h3>
            <p className="text-lg text-white-700 transition-colors duration-300 ease-in-out hover:text-blue-600">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam possimus rem, suscipit nihil aliquid error nobis in iure exercitationem voluptatibus deleniti fugiat laudantium nulla dolorum quasi deserunt laborum tempore doloremque voluptates neque at a. Porro magni non optio iure quisquam beatae fugit ducimus numquam. Iusto dolor possimus autem officiis ipsam?
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;
