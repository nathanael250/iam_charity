import { Heart, Target, Eye, Award } from "lucide-react";

export function About() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-red-600 to-red-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-xl text-red-100 max-w-2xl">
            Learn about our mission to provide hope and support to families in
            need
          </p>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                <Target className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Our Mission
              </h2>
              <p className="text-gray-600">
                To provide safe housing and essential support to homeless and
                poor families, helping them rebuild their lives with dignity and
                hope.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                <Eye className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Our Vision
              </h2>
              <p className="text-gray-600">
                A community where every family has access to safe housing, basic
                necessities, and the opportunity to thrive.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                <Award className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Our Values
              </h2>
              <p className="text-gray-600">
                Transparency, compassion, accountability, and dedication to
                serving those in need with respect and integrity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            How We Work
          </h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">
                    Identify & Verify
                  </h3>
                  <p className="text-gray-600">
                    Our team identifies families in need and thoroughly verifies
                    their situation to ensure support reaches those who truly
                    need it.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">
                    Create Projects
                  </h3>
                  <p className="text-gray-600">
                    We create detailed support projects with clear goals,
                    timelines, and funding needs, then publish them on our
                    platform.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">
                    Collect Support
                  </h3>
                  <p className="text-gray-600">
                    Donors and volunteers contribute through our platform.
                    Donations are securely collected and tracked for full
                    transparency.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">
                    Execute & Deliver
                  </h3>
                  <p className="text-gray-600">
                    Our team manages the entire project execution - from
                    construction to delivery of materials - ensuring quality and
                    accountability.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">
                  5
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">
                    Report Impact
                  </h3>
                  <p className="text-gray-600">
                    We provide regular updates and share the final impact
                    stories, showing how your support has transformed lives.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Trust Us */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Why Donors Trust Us
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            We serve as the trusted bridge between donors and beneficiaries,
            ensuring that support is used effectively and ethically.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="bg-gray-50 p-6 rounded-lg">
              <Heart className="w-8 h-8 text-red-600 mb-3" />
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                Full Transparency
              </h3>
              <p className="text-gray-600">
                Every project includes detailed updates, photos, and financial
                reports so you can see exactly where your support goes.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <Award className="w-8 h-8 text-red-600 mb-3" />
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                Verified Beneficiaries
              </h3>
              <p className="text-gray-600">
                All families are carefully verified by our team to ensure
                support reaches those in genuine need.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <Target className="w-8 h-8 text-red-600 mb-3" />
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                Direct Impact
              </h3>
              <p className="text-gray-600">
                Your donations directly fund housing, materials, and essentials
                - no middlemen, no wasted resources.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <Eye className="w-8 h-8 text-red-600 mb-3" />
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                Protected Privacy
              </h3>
              <p className="text-gray-600">
                We protect beneficiary privacy while maintaining donor trust
                through our verified, managed approach.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
