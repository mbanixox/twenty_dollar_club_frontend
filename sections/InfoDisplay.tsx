import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/auth/session";
import Link from "next/link";

const InfoDisplay = async () => {
  const session = await getSession();
  return (
    <>
      <section className="py-12 px-4 md:px-8 shadow mb-8 font-sans">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-8 text-primary">
            Welcome to Our Family
          </h2>
          <p className="mb-3 text-xl text-muted-foreground">
            TwentyDollarClub is more than just a platform; it&apos;s a community
            of individuals who understand that life&apos;s greatest achievements
            happen when we come together. Whether you&apos;re planning for your
            future, supporting a family member in need, or investing in
            community projects, you&apos;re never alone on this journey.
          </p>
          <p className="mb-3 text-xl text-muted-foreground">
            We&apos;ve built a space where transparency meets trust, where every
            contribution counts, and where your voice matters. Our members come
            from all walks of life, united by a common belief: that when we pool
            our resources and support one another, we create opportunities that
            would be impossible alone.
          </p>
          <p className="text-xl text-muted-foreground">
            This is your invitation to be part of something bigger—a movement of
            people committed to lifting each other up, celebrating together, and
            standing side by side through life&apos;s challenges.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 md:px-8 shadow mb-8 font-sans">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-primary text-center">
            What We Stand For
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-popover rounded-lg p-6 shadow flex flex-col items-center text-center">
              <div className="text-4xl mb-2">🤝</div>
              <h3 className="font-semibold text-xl mb-2">Unity in Diversity</h3>
              <p className="text-lg text-muted-foreground">
                We celebrate our differences while embracing our shared goals.
                Every member brings unique experiences and perspectives that
                make our community richer and stronger. Together, we&apos;re
                building bridges across backgrounds and creating lasting bonds.
              </p>
            </div>
            <div className="bg-popover rounded-lg p-6 shadow flex flex-col items-center text-center">
              <div className="text-4xl mb-2">💎</div>
              <h3 className="font-semibold text-xl mb-2">
                Crystal Clear Transparency
              </h3>
              <p className="text-lg text-muted-foreground">
                Trust is earned through openness. Every dollar contributed is
                tracked, every decision is documented, and every member has
                access to complete financial records. No hidden fees, no
                surprises—just honest, straightforward accountability.
              </p>
            </div>
            <div className="bg-popover rounded-lg p-6 shadow flex flex-col items-center text-center">
              <div className="text-4xl mb-2">🛡️</div>
              <h3 className="font-semibold text-xl mb-2">Unwavering Support</h3>
              <p className="text-lg text-muted-foreground">
                When life throws challenges your way, you won&apos;t face them
                alone. Our bereavement fund and emergency support system ensures
                that in your darkest hours, you have a community ready to stand
                with you—financially and emotionally.
              </p>
            </div>
            <div className="bg-popover rounded-lg p-6 shadow flex flex-col items-center text-center">
              <div className="text-4xl mb-2">⚖️</div>
              <h3 className="font-semibold text-xl mb-2">Fairness for All</h3>
              <p className="text-lg text-muted-foreground">
                Everyone contributes equally, everyone benefits equally. Our
                governance system is built on democratic principles where every
                voice counts. Clear rules, fair enforcement, and equal
                opportunity for all members to participate and prosper.
              </p>
            </div>
            <div className="bg-popover rounded-lg p-6 shadow flex flex-col items-center text-center">
              <div className="text-4xl mb-2">🌱</div>
              <h3 className="font-semibold text-xl mb-2">Growing Together</h3>
              <p className="text-lg text-muted-foreground">
                Your success is our success. We&apos;re invested in helping each
                member reach their personal and financial goals while building
                collective wealth. Through shared projects and mutual support,
                we create opportunities for everyone to thrive.
              </p>
            </div>
            <div className="bg-popover rounded-lg p-6 shadow flex flex-col items-center text-center">
              <div className="text-4xl mb-2">🔐</div>
              <h3 className="font-semibold text-xl mb-2">
                Security You Can Trust
              </h3>
              <p className="text-lg text-muted-foreground">
                Your contributions are protected with bank-level security. We
                use encrypted transactions, secure payment gateways, and
                maintain comprehensive audit trails. Your financial information
                is safe, your contributions are tracked, and your investment is
                protected.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-12 px-4 md:px-8 shadow mb-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-primary text-center">
            Your Journey Starts Here
          </h2>
          <p className="mb-8 text-muted-foreground text-center">
            Joining our community is simple and straightforward. We&apos;ve
            designed a seamless onboarding process that gets you contributing
            and benefiting in no time. Here&apos;s exactly what to expect:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-popover rounded-lg p-6 shadow flex flex-col items-center text-center">
              <div className="text-2xl font-bold mb-2 text-primary">1</div>
              <h3 className="font-semibold text-lg mb-2">
                Express Your Interest
              </h3>
              <p className="text-muted-foreground">
                Fill out our simple online application form. It takes just a few
                minutes, and there&apos;s no obligation.
              </p>
            </div>
            <div className="bg-popover rounded-lg p-6 shadow flex flex-col items-center text-center">
              <div className="text-2xl font-bold mb-2 text-primary">2</div>
              <h3 className="font-semibold text-lg mb-2">Meet Our Team</h3>
              <p className="text-muted-foreground">
                Our administrators review every application personally to ensure
                we&apos;re building a community of committed, like-minded
                individuals. We may reach out for additional information to get
                to know you better.
              </p>
            </div>
            <div className="bg-popover rounded-lg p-6 shadow flex flex-col items-center text-center">
              <div className="text-2xl font-bold mb-2 text-primary">3</div>
              <h3 className="font-semibold text-lg mb-2">Welcome Aboard</h3>
              <p className="text-muted-foreground">
                Once approved, you&apos;ll complete your onboarding payment and
                digitally sign our community bylaws. This formalizes your
                membership and shows your commitment to our shared values.
              </p>
            </div>
            <div className="bg-popover rounded-lg p-6 shadow flex flex-col items-center text-center">
              <div className="text-2xl font-bold mb-2 text-primary">4</div>
              <h3 className="font-semibold text-lg mb-2">Start Contributing</h3>
              <p className="text-muted-foreground">
                Your account activates immediately! Begin contributing to
                projects, access member resources, and start building meaningful
                connections. You&apos;re now part of a family of 500+ members.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 md:px-8 shadow mb-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-primary text-center">
            Why Our Members Love Being Here
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-popover rounded-lg p-6 shadow">
              <h3 className="font-semibold text-xl mb-2">
                Complete Financial Visibility
              </h3>
              <p className="text-lg text-muted-foreground">
                View your entire contribution history, track project allocations
                in real-time, and access detailed reports anytime. You&apos;ll
                always know exactly where your money goes and how it&apos;s
                being used.
              </p>
            </div>
            <div className="bg-popover rounded-lg p-6 shadow">
              <h3 className="font-semibold text-xl mb-2">
                Flexible Payment Options
              </h3>
              <p className="text-lg text-muted-foreground">
                Contribute using PayPal, Zelle, Venmo, Cash App, or major credit
                cards. We&apos;ve integrated multiple payment channels so you
                can use whatever works best for you.
              </p>
            </div>
            <div className="bg-popover rounded-lg p-6 shadow">
              <h3 className="font-semibold text-xl mb-2">
                Immediate Crisis Support
              </h3>
              <p className="text-lg text-muted-foreground">
                Life is unpredictable. Our Matanga (bereavement) fund provides
                rapid financial assistance when you experience loss. Your
                community rallies around you when you need it most.
              </p>
            </div>
            <div className="bg-popover rounded-lg p-6 shadow">
              <h3 className="font-semibold text-xl mb-2">Stay Connected</h3>
              <p className="text-lg text-muted-foreground">
                Receive instant notifications via WhatsApp and email for payment
                confirmations, new projects, important updates, and community
                announcements. Never miss what matters.
              </p>
            </div>
            <div className="bg-popover rounded-lg p-6 shadow">
              <h3 className="font-semibold text-xl mb-2">
                Collective Projects
              </h3>
              <p className="text-lg text-muted-foreground">
                Participate in group investment opportunities and community
                initiatives that would be impossible alone. Pool resources for
                bigger impact and better returns.
              </p>
            </div>
            <div className="bg-popover rounded-lg p-6 shadow">
              <h3 className="font-semibold text-xl mb-2">Family Protection</h3>
              <p className="text-lg text-muted-foreground">
                Register your beneficiaries and dependents. Ensure your loved
                ones are covered and supported through our comprehensive family
                support system.
              </p>
            </div>
            <div className="bg-popover rounded-lg p-6 shadow">
              <h3 className="font-semibold text-xl mb-2">Fair Governance</h3>
              <p className="text-lg text-muted-foreground">
                Clear bylaws, automated rule enforcement, and democratic
                decision-making. Everyone plays by the same rules, and penalties
                are applied consistently and fairly.
              </p>
            </div>
            <div className="bg-popover rounded-lg p-6 shadow">
              <h3 className="font-semibold text-xl mb-2">Full Audit Trails</h3>
              <p className="text-lg text-muted-foreground">
                Every transaction is logged with timestamps. Complete historical
                records of payments, penalties, and decisions ensure
                accountability and build trust.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 md:px-8 shadow mb-8 font-sans">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-primary">
            The Power of Community in Numbers
          </h2>
          <p className="mb-3 text-xl text-muted-foreground">
            When individuals come together with a common purpose, extraordinary
            things happen. Our members aren&apos;t just contributing
            money—they&apos;re building a legacy of mutual support and shared
            prosperity.
          </p>
          <p className="mb-8 text-xl text-muted-foreground">
            These numbers tell the story of real people helping real families,
            funding real dreams, and creating real security for the future.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 md:px-8 bg-primary shadow text-center">
        <h2 className="text-3xl font-bold mb-4 text-primary-foreground">
          Your Community Is Waiting
        </h2>
        <p className="mb-6 text-lg text-primary-foreground">
          Don&apos;t navigate life&apos;s financial journey alone. Join members
          who have discovered the power of community-driven support, transparent
          contributions, and shared success. Your spot in our family is ready.
        </p>
        {!session && (
          <Link href={"/register"}>
            <Button
              className="inline-block bg-accent text-accent-foreground font-semibold 
            rounded-lg shadow hover:bg-accent/80 transition px-10 text-lg min-w-72 min-h-12"
            >
              Apply for Membership Today
            </Button>
          </Link>
        )}
      </section>
    </>
  );
};

export default InfoDisplay;
