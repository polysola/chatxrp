"use client";

import Typewriter from "typewriter-effect";

import { Button } from "../ui/button";
import Link from "next/link";
import SubscriptionButton from "../subscription-button";

const Hero = () => {
  return (
    <div className="text-center">
      <div>
        <div className="relative isolate px-6 pt-14 lg:px-8">
          <div
            className="absolute inset-x-0 -top-40  transform-gpu overflow-hidden blur-3xl sm:-top-80 -z-50"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <div className="hidden sm:mb-8 sm:flex sm:justify-center">
              <div className="rounded-full px-3 py-1 text-sm leading-6 text-gray-400 border">
                Get started with XRP Gemini AI
              </div>
            </div>
            <div className="text-center">
              <h1 className="text-4xl leading-8 font-bold tracking-tight text-[#8e5bf4] sm:text-6xl">
                Designed by leaders in AI so you can build with confidence
                <span>
                  <Typewriter
                    options={{
                      strings: ["Images ", "Text", "Videos"],
                      autoStart: true,
                      loop: true,
                    }}
                  />
                </span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-700">
                XRP Gemini AI has been integrated into the XRP Ledger.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-8">
                <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-6">
                  <Link href="/tools">
                    <Button
                      className="text-white gradient-btn w-full lg:w-auto"
                      size="lg"
                    >
                      XRPL Tools
                    </Button>
                  </Link>
                  <SubscriptionButton isPro={false} />
                </div>

                <div className="flex items-center justify-center gap-4">
                  <a
                    href="hhttps://x.com/XRPGemini_AI"
                    className="text-sm font-semibold leading-6 text-gray-400"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48"
                      height="48"
                      viewBox="0 0 48 48"
                    >
                      <path
                        fill="#03a9f4"
                        d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.066,4,24,4z"
                      ></path>
                      <path
                        fill="#fff"
                        d="M36,17.12c-0.882,0.391-1.999,0.758-3,0.88c1.018-0.604,2.633-1.862,3-3	c-0.951,0.559-2.671,1.156-3.793,1.372C29.789,13.808,24,14.755,24,20v2c-4,0-7.9-3.047-10.327-6c-2.254,3.807,1.858,6.689,2.327,7	c-0.807-0.025-2.335-0.641-3-1c0,0.016,0,0.036,0,0.057c0,2.367,1.661,3.974,3.912,4.422C16.501,26.592,16,27,14.072,27	c0.626,1.935,3.773,2.958,5.928,3c-2.617,2.029-7.126,2.079-8,1.977c8.989,5.289,22.669,0.513,21.982-12.477	C34.95,18.818,35.342,18.104,36,17.12"
                      ></path>
                    </svg>
                  </a>
                  <a
                    href="https://t.me/XRPGeminiAI_Portal"
                    className="text-sm font-semibold leading-6 text-gray-400"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48"
                      height="48"
                      viewBox="0 0 48 48"
                    >
                      <path
                        fill="#29b6f6"
                        d="M24 4A20 20 0 1 0 24 44A20 20 0 1 0 24 4Z"
                      ></path>
                      <path
                        fill="#fff"
                        d="M33.95,15l-3.746,19.126c0,0-0.161,0.874-1.245,0.874c-0.576,0-0.873-0.274-0.873-0.274l-8.114-6.733 l-3.97-2.001l-5.095-1.355c0,0-0.907-0.262-0.907-1.012c0-0.625,0.933-0.923,0.933-0.923l21.316-8.468 c-0.001-0.001,0.651-0.235,1.126-0.234C33.667,14,34,14.125,34,14.5C34,14.75,33.95,15,33.95,15z"
                      ></path>
                      <path
                        fill="#b0bec5"
                        d="M23,30.505l-3.426,3.374c0,0-0.149,0.115-0.348,0.12c-0.069,0.002-0.143-0.009-0.219-0.043 l0.964-5.965L23,30.505z"
                      ></path>
                      <path
                        fill="#cfd8dc"
                        d="M29.897,18.196c-0.169-0.22-0.481-0.26-0.701-0.093L16,26c0,0,2.106,5.892,2.427,6.912 c0.322,1.021,0.58,1.045,0.58,1.045l0.964-5.965l9.832-9.096C30.023,18.729,30.064,18.416,29.897,18.196z"
                      ></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
