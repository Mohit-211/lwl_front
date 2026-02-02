import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-white/10 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid gap-8 md:grid-cols-3 mb-10">
          {/* Brand */}
          <div>
            <h3 className="text-amber-400 font-semibold mb-3">
              Life Worth Living
            </h3>

            <p className="text-white/60 text-sm leading-relaxed mb-3">
              A documentary examining Canada&apos;s euthanasia and MAiD crisis.
            </p>

            <p className="text-white/50 text-xs leading-relaxed mb-2">
              Life Worth Living is a film project sponsored by the{" "}
              <a
                href="https://www.epcc.ca"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:underline"
              >
                Euthanasia Prevention Coalition
              </a>
              .
            </p>

            <p className="text-white/50 text-xs leading-relaxed">
              The Euthanasia Prevention Coalition is the leading worldwide
              organization opposing euthanasia and assisted suicide since 1998.
            </p>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-3">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/legal#terms"
                  className="text-white/60 hover:text-amber-400 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/legal#privacy"
                  className="text-white/60 hover:text-amber-400 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/legal#refund"
                  className="text-white/60 hover:text-amber-400 transition-colors"
                >
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-3">Contact</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>Email: info@epcc.ca</li>
              <li>For group licenses or custom quotes</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 text-center">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Xs in the Sky Films & Euthanasia
            Prevention Coalition. All rights reserved.
          </p>
          <p className="text-white/30 text-xs mt-2">
            All prices in Canadian Dollars (CAD)
          </p>
        </div>
      </div>
    </footer>
  );
}
