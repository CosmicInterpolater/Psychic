import React from 'react';

const SacredSpace = ({ onReady }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            🕯️ Sacred Space Preparation
          </h1>
          <p className="text-purple-200 text-lg">
            Before we connect with crystal energy, let's prepare your sacred space
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur rounded-xl p-8 border border-white/20 space-y-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-purple-900/50 rounded-lg p-6">
                <h3 className="text-xl text-purple-200 mb-3 flex items-center">
                  🧘‍♀️ Prepare Your Mind
                </h3>
                <ul className="text-white space-y-2 text-sm">
                  <li>• Take three deep, cleansing breaths</li>
                  <li>• Release any tension in your body</li>
                  <li>• Set an intention to be open to guidance</li>
                  <li>• Clear your mind of distractions</li>
                </ul>
              </div>

              <div className="bg-blue-900/50 rounded-lg p-6">
                <h3 className="text-xl text-blue-200 mb-3 flex items-center">
                  🕯️ Create Sacred Space
                </h3>
                <ul className="text-white space-y-2 text-sm">
                  <li>• Light a candle or incense if available</li>
                  <li>• Ensure you won't be interrupted</li>
                  <li>• Sit comfortably in a quiet space</li>
                  <li>• Hold a clear intention for your reading</li>
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-green-900/50 rounded-lg p-6">
                <h3 className="text-xl text-green-200 mb-3 flex items-center">
                  🌿 Energy Cleansing
                </h3>
                <ul className="text-white space-y-2 text-sm">
                  <li>• Visualize white light surrounding you</li>
                  <li>• Ask for protection and clarity</li>
                  <li>• Release any negative energy</li>
                  <li>• Connect with your highest self</li>
                </ul>
              </div>

              <div className="bg-yellow-900/50 rounded-lg p-6">
                <h3 className="text-xl text-yellow-200 mb-3 flex items-center">
                  💫 Set Your Intent
                </h3>
                <ul className="text-white space-y-2 text-sm">
                  <li>• Focus on your question or concern</li>
                  <li>• Trust your intuition will guide you</li>
                  <li>• Be open to unexpected messages</li>
                  <li>• Approach with gratitude and respect</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center pt-6">
            <p className="text-purple-200 mb-6 italic">
              "When we approach crystals with reverence and an open heart, 
              we create a sacred bridge between the physical and spiritual realms."
            </p>
            <button
              onClick={onReady}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 px-8 rounded-lg transition-all transform hover:scale-105"
            >
              I'm Ready to Begin My Reading ✨
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SacredSpace;