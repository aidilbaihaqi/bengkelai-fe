export default function ProblemSection() {
  const problems = [
    {
      icon: "?",
      title: "Bingung Gejala Motor",
      description: "Sulit tahu masalah sebenarnya ketika motor bermasalah"
    },
    {
      icon: "$",
      title: "Takut Ditipu Bengkel",
      description: "Harga & diagnosa sering tidak transparan"
    },
    {
      icon: "T",
      title: "Buang Waktu",
      description: "Antri lama untuk cek masalah ringan"
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Kenapa BengkelAI?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Masalah yang sering dihadapi pemilik motor setiap hari
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center group hover:scale-105 transform transition-transform"
            >
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {problem.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {problem.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}