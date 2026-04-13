import MobileBottomNav from "../components/MobileBottomNav";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";

const Contact = () => {
  return (
    <>
      <TopNav />

      <div className="md:hidden">
        <div className="bg-surface text-on-surface selection:bg-tertiary-container selection:text-on-tertiary-container">
          <main className="pt-24 pb-32">
            <div className="container">
              <div className="mb-20">
                <p className="text-tertiary font-bold tracking-widest uppercase mb-4 text-sm">Get in Touch</p>
                <h2 className="text-5xl md:text-7xl font-extrabold text-primary tracking-tighter mb-8 leading-none">
                  Let’s build a <br />brighter future.
                </h2>
                <p className="text-xl text-on-surface-variant max-w-2xl leading-relaxed">
                  Whether you want to volunteer your time, partner on a project, or simply learn more about our mission,
                  our doors are always open.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                <div className="lg:col-span-7 bg-surface-container-lowest p-8 md:p-12 rounded-xl shadow-[0_4px_24px_0_rgba(27,14,61,0.06)] border border-surface-container-high">
                  <form action="#" className="space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="relative group">
                        <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">
                          Your Name
                        </label>
                        <input
                          className="w-full bg-transparent border-b border-outline-variant/40 focus:border-tertiary-container focus:ring-0 px-0 py-3 text-lg transition-colors placeholder:text-surface-dim"
                          placeholder="John Doe"
                          type="text"
                        />
                      </div>
                      <div className="relative group">
                        <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">
                          Email Address
                        </label>
                        <input
                          className="w-full bg-transparent border-b border-outline-variant/40 focus:border-tertiary-container focus:ring-0 px-0 py-3 text-lg transition-colors placeholder:text-surface-dim"
                          placeholder="hello@example.com"
                          type="email"
                        />
                      </div>
                    </div>
                    <div className="relative group">
                      <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">
                        Your Message
                      </label>
                      <textarea
                        className="w-full bg-transparent border-b border-outline-variant/40 focus:border-tertiary-container focus:ring-0 px-0 py-3 text-lg transition-colors placeholder:text-surface-dim resize-none"
                        placeholder="How can we collaborate?"
                        rows="4"
                      ></textarea>
                    </div>
                    <button
                      className="bg-primary-container text-on-primary-container px-10 py-4 rounded-md font-bold text-lg hover:scale-[1.02] active:scale-95 transition-all shadow-xl flex items-center gap-3"
                      type="submit"
                    >
                      Send Message
                      <span className="material-symbols-outlined" data-icon="arrow_forward">
                        arrow_forward
                      </span>
                    </button>
                  </form>
                </div>

                <div className="lg:col-span-5 space-y-8">
                  <div className="bg-primary-container text-on-primary-container p-8 rounded-xl relative overflow-hidden group">
                    <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
                      <span className="material-symbols-outlined text-[12rem]" data-icon="cottage">
                        cottage
                      </span>
                    </div>
                    <h3 className="text-tertiary-container text-sm font-bold uppercase tracking-widest mb-6">
                      Our Headquarters
                    </h3>
                    <div className="space-y-6 relative z-10">
                      <div className="flex gap-4">
                        <span className="material-symbols-outlined text-tertiary-container" data-icon="location_on">
                          location_on
                        </span>
                        <p className="text-lg leading-snug">
                          124 Foundation Way, <br />Building District, NY 10012
                        </p>
                      </div>
                      <div className="flex gap-4">
                        <span className="material-symbols-outlined text-tertiary-container" data-icon="call">
                          call
                        </span>
                        <p className="text-lg">+1 (555) 000-1234</p>
                      </div>
                      <div className="flex gap-4">
                        <span className="material-symbols-outlined text-tertiary-container" data-icon="mail">
                          mail
                        </span>
                        <p className="text-lg">connect@iamcharity.org</p>
                      </div>
                    </div>
                  </div>

                  <div className="aspect-video w-full rounded-xl overflow-hidden shadow-inner grayscale contrast-125 relative">
                    <img
                      alt="Map Location"
                      className="w-full h-full object-cover"
                      data-alt="Stylized monochromatic map view of an urban neighborhood with clean architectural lines and soft minimal aesthetic"
                      data-location="New York"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqT4icvUk9RlwL_vP1Ba4mD8vb9FvTKNhgarc2U8_HecALSffukHUEeViNiMZtgCrC0JoCQvxxb9o5g94ZjElUIUzzsKXfLsxzgH1uYB9yX6LXgirQ_ukPfM5jl_s-UKsGkLNCu_qfd8lTpWIC0aeMfyOlssZOTkO2zMjicodC-X0nDXshgXgVzVb99X4EIc6uX5f3gHYBeEB-0E0T0ev2Jt4jcflHH5yhsMwiuWhlNlGrVgpT008r4cDUid3C14Lyi-DQYZb6_Tvn"
                    />
                    <div className="absolute inset-0 bg-primary-container/20 mix-blend-multiply"></div>
                  </div>

                  <div className="bg-surface-container-high p-8 rounded-xl flex flex-col gap-6">
                    <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Follow our journey</h4>
                    <div className="flex gap-4">
                      <a
                        className="w-12 h-12 rounded-full border border-outline-variant flex items-center justify-center hover:bg-tertiary-container hover:border-tertiary-container transition-all group"
                        href="#"
                      >
                        <span
                          className="material-symbols-outlined text-on-surface-variant group-hover:text-on-tertiary-container"
                          data-icon="share"
                        >
                          share
                        </span>
                      </a>
                      <a
                        className="w-12 h-12 rounded-full border border-outline-variant flex items-center justify-center hover:bg-tertiary-container hover:border-tertiary-container transition-all group"
                        href="#"
                      >
                        <span
                          className="material-symbols-outlined text-on-surface-variant group-hover:text-on-tertiary-container"
                          data-icon="public"
                        >
                          public
                        </span>
                      </a>
                      <a
                        className="w-12 h-12 rounded-full border border-outline-variant flex items-center justify-center hover:bg-tertiary-container hover:border-tertiary-container transition-all group"
                        href="#"
                      >
                        <span
                          className="material-symbols-outlined text-on-surface-variant group-hover:text-on-tertiary-container"
                          data-icon="chat"
                        >
                          chat
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <section className="mt-32 relative h-[500px] rounded-3xl overflow-hidden flex items-center">
                <img
                  alt="Volunteer with us"
                  className="absolute inset-0 w-full h-full object-cover"
                  data-alt="A group of diverse volunteers working together on a community building project, soft sun flare, cinematic emotional lighting"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXO5Zgv83bfZasj_wOeAtBsan-bXW6E9wXi-be3Ep-PYhoxeM8JxJP5rqYrBAUwhItOpNGn_QHvDXJlWu6ZhaxnBLlHO9KPxEfhifvEmRLFJSDAK96jNUvN_Yw3UwVNa-u9CwYeDNwAHI2YGZItK2SBZ74kTR-TfZBGw0BQiooq-H9SqoScmTz8IPMr1jTn6m0Q8hqB254ftisM54lNqJPa_7jv5uBGLJN7A4XCubt71rCW--ANmh_2OOFXhJBWPJ7Q1RuGMdOdsWf"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary-container via-primary-container/80 to-transparent"></div>
                <div className="relative z-10 px-6 max-w-2xl">
                  <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6">
                    Become the <br />
                    <span className="text-tertiary-container">Architect of Change.</span>
                  </h2>
                  <p className="text-white/80 text-lg mb-10 leading-relaxed">
                    We are constantly looking for passionate individuals to join our field teams. Your skills can build
                    more than just walls—they build lives.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button className="bg-tertiary-container text-on-tertiary-container px-8 py-4 rounded-md font-bold hover:scale-105 transition-all">
                      VOLUNTEER NOW
                    </button>
                    <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-md font-bold hover:bg-white/20 transition-all">
                      VIEW PROJECTS
                    </button>
                  </div>
                </div>
              </section>
            </div>
          </main>

          <Footer />
          <MobileBottomNav />
        </div>
      </div>

      <div className="hidden md:block">
        <div className="bg-background text-on-background selection:bg-tertiary-container selection:text-on-tertiary-container">
          <main className="pt-16 min-h-screen">
            <section className="hero-gradient relative overflow-hidden py-24">
              <div className="container grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="z-10">
                  <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight tracking-tighter mb-6">
                    Let&apos;s build a <span className="text-tertiary-container">brighter</span> future together.
                  </h1>
                  <p className="text-on-primary-container text-lg md:text-xl max-w-xl font-light leading-relaxed mb-8">
                    Whether you&apos;re looking to volunteer, donate, or partner with us, your voice is the first step toward
                    lasting impact.
                  </p>
                </div>
                <div className="relative hidden lg:block">
                  <div className="w-full h-[500px] rounded-xl overflow-hidden shadow-2xl rotate-3">
                    <img
                      alt="Headquarters"
                      className="w-full h-full object-cover"
                      data-alt="Modern architectural structure with clean lines and large glass windows reflecting a warm sunset sky"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLOhjpZeQblycUSY-uUs3mwMIHvToIV64OYEgIV5JMEefGaMletN6_mQnpKYiNfDMpVpZMqEHjAmr9xeeH3spT91i4KQQx7v3vLWShlLHD4xh2je4UjEKaROozt2NDazt-HOp84rjer8vp5NZj8L3XEMZnGYdjFsrjJI-EbaDA2JQpjbx8nzfpiwJX35HQqarW51vdjabxe96Wb91LEGg9NSgTCAP731dR0hswbGX16ZmNtCI3pxy6vLbgHgb6lCu8rqxm3EEWPliq"
                    />
                  </div>
                  <div className="absolute -bottom-6 -left-6 bg-tertiary-container p-8 rounded-xl shadow-xl max-w-xs -rotate-3">
                    <p className="text-on-tertiary-container font-bold text-xl italic leading-snug">
                      &quot;Every stone laid is a life transformed.&quot;
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="py-24 container">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                <div className="lg:col-span-7 space-y-12">
                  <div>
                    <span className="text-tertiary font-bold tracking-widest text-sm uppercase">Get In Touch</span>
                    <h2 className="text-4xl font-bold text-primary mt-2">Send us a message</h2>
                  </div>
                  <form className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-outline uppercase tracking-widest">Full Name</label>
                        <input
                          className="bg-transparent border-b border-outline-variant/40 py-3 focus:outline-none focus:border-tertiary transition-colors text-on-surface"
                          placeholder="John Doe"
                          type="text"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-outline uppercase tracking-widest">Email Address</label>
                        <input
                          className="bg-transparent border-b border-outline-variant/40 py-3 focus:outline-none focus:border-tertiary transition-colors text-on-surface"
                          placeholder="john@example.com"
                          type="email"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-outline uppercase tracking-widest">Subject</label>
                      <input
                        className="bg-transparent border-b border-outline-variant/40 py-3 focus:outline-none focus:border-tertiary transition-colors text-on-surface"
                        placeholder="How can we help?"
                        type="text"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-outline uppercase tracking-widest">Message</label>
                      <textarea
                        className="bg-transparent border-b border-outline-variant/40 py-3 focus:outline-none focus:border-tertiary transition-colors text-on-surface resize-none"
                        placeholder="Tell us about your inquiry..."
                        rows="4"
                      ></textarea>
                    </div>
                    <button className="bg-primary-container text-on-primary-container px-10 py-4 rounded-md font-bold tracking-tight hover:scale-105 transition-all shadow-lg flex items-center gap-3">
                      Send Message
                      <span className="material-symbols-outlined text-sm" data-icon="send">
                        send
                      </span>
                    </button>
                  </form>
                </div>
                <div className="lg:col-span-5 space-y-12">
                  <div className="bg-surface-container-low p-10 rounded-3xl space-y-8">
                    <div>
                      <h3 className="text-2xl font-bold text-primary mb-6">Headquarters</h3>
                      <div className="space-y-6">
                        <div className="flex gap-4">
                          <span className="material-symbols-outlined text-tertiary" data-icon="location_on">
                            location_on
                          </span>
                          <p className="text-on-surface-variant leading-relaxed">
                            122 High Street, Impact District
                            <br />
                            London, United Kingdom
                            <br />
                            WC2N 5DU
                          </p>
                        </div>
                        <div className="flex gap-4">
                          <span className="material-symbols-outlined text-tertiary" data-icon="call">
                            call
                          </span>
                          <p className="text-on-surface-variant">+44 (0) 20 7946 0123</p>
                        </div>
                        <div className="flex gap-4">
                          <span className="material-symbols-outlined text-tertiary" data-icon="mail">
                            mail
                          </span>
                          <p className="text-on-surface-variant">hello@iamcharity.org</p>
                        </div>
                      </div>
                    </div>
                    <div className="w-full h-64 rounded-xl overflow-hidden bg-surface-container-highest relative group">
                      <img
                        alt="Map"
                        className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
                        data-alt="Stylized minimalist map layout of London city center with clean line art and subtle brand colors"
                        data-location="London"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDo5cWZ6XvIkMKfk8hEpRNSDVVW9MHdmsWNkY43K6R24JIO6aZCrURDhIgQND6MvtVJHEqcxQqLrsTYMuNlZwPBJm00jl7nSbfckoz5S7uAovNk9WP8m25Dy2CjyfrdFLmWn_ALqX5s86RHc9w1fg_4ftIfB3HBrFYJlyrc4jMwzsbNWsITD6aJuASNNiovL18QnHDk4KkBDcvicnkYDGiuHJ0eeb68n2N7ekS5-6bzjuDX-_Mo9FMka__m-7RVxomQnCvBQ7mY85re"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/90 backdrop-blur p-4 rounded-full shadow-lg">
                          <span
                            className="material-symbols-outlined text-tertiary text-4xl"
                            data-icon="explore"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            explore
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-surface-container py-24">
              <div className="container">
                <div className="mb-16 text-center lg:text-left">
                  <span className="text-tertiary font-bold tracking-widest text-sm uppercase">Join the Movement</span>
                  <h2 className="text-4xl md:text-5xl font-extrabold text-primary mt-2">Become a Volunteer</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 bg-primary-container rounded-3xl p-10 flex flex-col justify-between min-h-[400px] relative overflow-hidden group">
                    <img
                      alt="Volunteers"
                      className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-1000"
                      data-alt="Group of diverse volunteers smiling and working together in a bright modern community space"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBddE8C18BNVP1TYo32wUsR5nCWqK20gEMO5wuGpwJUvABV2Z6FqZ8Ah7IKgGNAV4TjV1YuNXbRpbXz4R-OHsvTBRw8Vit5VnsXHODLWV4e4Z4PWrLoBkuW2j01HvQTiPtzaY95o7PHwJw-b7brL7A-PrEqZk08RkVHlRINQfkNemBFaYBq8l-8zM3qPKi-RTW3El8P58GesUX-FzwbCoqBwMFQJ9WJlCni3TNrRnYaP-wMIlQpVDyoYQ8jxOwuaSjezgPvd4a0ATjJ"
                    />
                    <div className="relative z-10">
                      <h3 className="text-3xl font-bold text-white mb-4">On-Site Impact</h3>
                      <p className="text-on-primary-container max-w-md leading-relaxed">
                        Join our construction and distribution teams on the ground in over 15 countries. Gain hands-on
                        experience in sustainable building.
                      </p>
                    </div>
                    <div className="relative z-10 flex flex-wrap gap-4 mt-8">
                      <button className="bg-tertiary-container text-on-tertiary-container px-6 py-3 rounded-md font-bold hover:scale-105 transition-all">
                        View Field Roles
                      </button>
                    </div>
                  </div>
                  <div className="bg-surface-container-lowest rounded-3xl p-10 flex flex-col justify-between border border-outline-variant/10 group">
                    <div className="bg-surface-container-high w-14 h-14 rounded-full flex items-center justify-center mb-6">
                      <span className="material-symbols-outlined text-primary text-2xl" data-icon="laptop_mac">
                        laptop_mac
                      </span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-primary mb-4">Remote Support</h3>
                      <p className="text-on-surface-variant leading-relaxed mb-6">
                        Help us with digital marketing, translations, or administrative tasks from anywhere in the world.
                      </p>
                      <a
                        className="text-tertiary font-bold flex items-center gap-2 group-hover:translate-x-2 transition-transform"
                        href="#"
                      >
                        Explore digital roles
                        <span className="material-symbols-outlined text-sm" data-icon="arrow_forward">
                          arrow_forward
                        </span>
                      </a>
                    </div>
                  </div>
                  <div className="bg-tertiary-container rounded-3xl p-10 flex flex-col justify-center items-center text-center group">
                    <div className="text-on-tertiary-container space-y-6">
                      <h3 className="text-4xl font-black leading-none">1,200+</h3>
                      <p className="text-on-tertiary-container/80 font-bold uppercase tracking-widest text-sm">
                        Active Volunteers
                      </p>
                      <div className="flex -space-x-3 justify-center py-4">
                        <div className="w-12 h-12 rounded-full border-2 border-tertiary-container overflow-hidden bg-slate-200">
                          <img
                            className="w-full h-full object-cover"
                            data-alt="Portrait of a smiling young man in a casual shirt with soft natural lighting"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoY-wWvvcAsEzK424b4xxj1fwbFVU-OQ9sv9ovbnX5YToNp-eiyMu3BzDG7P9dosQb9IB7UiVTckW26d87uSbsIyb1PT0O84JLXpr-hTm2BlRQo4aS1InzYsju4-hlz0uggMuLEtTK4wuOEM3BEGiVB6WcIgff4lIY4aGsjwClKZfZgXuIFAc9lDqXfLxFEjbyp19fxMBNxM8-Oww71RnfUWrFExosWtNmtUOJ0E-o1JiEPmoubXm9vctwsbubDq3L8IFqqggzVITZ"
                          />
                        </div>
                        <div className="w-12 h-12 rounded-full border-2 border-tertiary-container overflow-hidden bg-slate-300">
                          <img
                            className="w-full h-full object-cover"
                            data-alt="Portrait of a confident woman with a warm smile in an outdoor setting"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAE8bIE6R6LgzySP6N8TqXJh_zuABM_J1TpIEjhIHns9JZ7TkSDajhbg4WQKVg59tUO7zmra8euiERASBNRhliRtiaIW-ich72vyJFPKsFmNLFDPcN16Aud72QvXJVFNjkel31LOLk6sMWMz46kTJq2dq-Cpe3LpcRKGFKtVkJfpnop03tmT49SHPZBw3b2J_YuiYNspboys2xlx-EOVdmhPEaSkQ7HDtvSPKvWktAdoKSoc6MvGhFC_LMptuik-KqYpf6RTfAZwLt5"
                          />
                        </div>
                        <div className="w-12 h-12 rounded-full border-2 border-tertiary-container overflow-hidden bg-slate-400">
                          <img
                            className="w-full h-full object-cover"
                            data-alt="Portrait of a man with spectacles smiling softly against a neutral background"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXCAO-UJnLXb08mcrGdrZXe2X2dDUUAhDqll6ddm2t0yygItg9eq7blrFgOs3AkOOvH4RdGrZ2aZ6G9bgOhFm7UCRAgOaCQv-l2X9BwxitlcQhaDZZYEaGMrNF3166em9VJPYIkdHvFu_yAlh47gPJT40yXRbwtLfpWCTlmwVqNMoelXu3qB135jS5aCObstUFJffftNHUL7zHEXOK3HNPo4FzOT-fr8XDMX3dEEm-Ur4rG41gK9bTKpB1dGaLFZskxIySaZGIu3nu"
                          />
                        </div>
                        <div className="w-12 h-12 rounded-full border-2 border-tertiary-container bg-primary-container flex items-center justify-center text-white text-xs font-bold">
                          +50
                        </div>
                      </div>
                      <p className="text-on-tertiary-container font-semibold">Ready to join them?</p>
                    </div>
                  </div>
                  <div className="md:col-span-2 bg-surface-container-lowest rounded-3xl p-10 flex flex-col md:flex-row gap-10 items-center border border-outline-variant/10">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-primary mb-4">Corporate Partnerships</h3>
                      <p className="text-on-surface-variant leading-relaxed mb-6">
                        Align your business with a purpose. Our corporate volunteer days build both homes and team bonds.
                      </p>
                      <button className="border-2 border-primary text-primary px-8 py-3 rounded-md font-bold hover:bg-primary hover:text-white transition-all">
                        Partner With Us
                      </button>
                    </div>
                    <div className="w-full md:w-1/3 h-48 rounded-2xl overflow-hidden shadow-lg">
                      <img
                        alt="Partnership"
                        className="w-full h-full object-cover"
                        data-alt="Two professionals shaking hands in a bright, modern corporate office setting with glass walls"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9I8ksrZ8G8VbJbyXtSJXaqo5uEVOUuXhWN4wJ9F9hs-WIJtuv2gI-5xX7IoQBTXle-t-DjR1OkrqMsRNuAsWa862hFClRUcpqUljEiAEYWWzj-cAQl2UbxUn1ueSI3tT5mBGy-SwiS-3Qr_jfXblSRWZquJ6nadTrpbj1kteQQk6dk4VfpDl2QSjrd4T8yqzsAF3ivPjB7mglys0szwlkXB8O5ZXcRSpSB563I4f3zCRcxC6G4sT8TO3BEOit412ATAuY1ClSy-ru"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>

          <Footer />
        </div>
      </div>
    </>
  );
};

export default Contact;
