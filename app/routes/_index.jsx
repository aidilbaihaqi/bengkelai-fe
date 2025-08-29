import Button from "../components/Button";

export default function Index() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Welcome to Remix with Tailwind CSS!
          </h1>
          <p className="text-gray-600 mb-8">
            Your Remix.js application is now set up with Tailwind CSS and organized folder structure.
          </p>
          <div className="space-y-4">
            <Button variant="primary">
              Primary Button
            </Button>
            <Button variant="secondary">
              Secondary Button
            </Button>
            <Button variant="danger">
              Danger Button
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}