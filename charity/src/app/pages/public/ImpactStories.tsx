import { Calendar, Heart, TrendingUp } from "lucide-react";
import { mockImpactStories } from "../../data/mockData";

export function ImpactStories() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-red-600 to-red-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Impact Stories
          </h1>
          <p className="text-xl text-red-100 max-w-2xl">
            See how your support has transformed the lives of families in our
            community
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-red-600 mb-2">
                {mockImpactStories.length}+
              </div>
              <div className="text-gray-600">Success Stories</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-red-600 mb-2">45+</div>
              <div className="text-gray-600">Homes Built</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-red-600 mb-2">150+</div>
              <div className="text-gray-600">Families Helped</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {mockImpactStories.map((story) => (
              <article
                key={story.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Before/After Images */}
                  <div className="grid grid-cols-2 gap-4 p-6">
                    <div>
                      <div className="text-sm font-semibold text-gray-600 mb-2">
                        Before
                      </div>
                      <div className="aspect-square bg-gradient-to-br from-gray-300 to-gray-400 rounded-lg flex items-center justify-center">
                        <span className="text-gray-500 text-sm">
                          Before Photo
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-600 mb-2">
                        After
                      </div>
                      <div className="aspect-square bg-gradient-to-br from-green-200 to-green-300 rounded-lg flex items-center justify-center">
                        <span className="text-green-700 text-sm">
                          After Photo
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 lg:p-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                      {story.title}
                    </h2>

                    <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(story.completedDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-2">
                        <Heart className="w-4 h-4" />
                        {story.familyName}
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />$
                        {story.totalSupport.toLocaleString()} raised
                      </div>
                    </div>

                    <p className="text-gray-600 leading-relaxed mb-6">
                      {story.story}
                    </p>

                    <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded">
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold">Impact:</span> This
                        project was completed with the support of our generous
                        donors and dedicated volunteers. Together, we built more
                        than just a house—we built hope.
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Additional Stories Placeholder */}
          <div className="mt-12 bg-white rounded-xl shadow-sm p-8 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              More Success Stories Coming Soon
            </h3>
            <p className="text-gray-600 mb-6">
              We're currently working on several ongoing projects that will soon
              become amazing success stories. Your support makes these
              transformations possible.
            </p>
            <a
              href="/projects"
              className="inline-block px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              View Active Projects
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            What Families Are Saying
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 italic mb-4">
                "I never thought my children would have their own rooms. This
                charity gave us more than a house—they gave us dignity and hope
                for the future. We are forever grateful."
              </p>
              <div className="font-semibold text-gray-900">
                - Rahman Family
              </div>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 italic mb-4">
                "After years of homelessness, we finally have a place to call
                home. My daughter can now study in peace and I have the
                stability to build our future. Thank you from the bottom of our
                hearts."
              </p>
              <div className="font-semibold text-gray-900">- Maria</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
