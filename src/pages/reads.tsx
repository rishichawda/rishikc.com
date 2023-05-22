import "../stylesheets/reads.scss";

import { m, LazyMotion, domMax } from "framer-motion";
import React from "react";

import reads from "../../static/reads.json";
import Layout from "../components/layout";
import SEO from "../components/seo";
import shuffle from "../utils/shuffle";

type Props = {};

type ReadInfo = {
  quote: string;
  info?: string;
};

const ReadsPage = (props: Props) => {
  const [shuffledData, setShuffledData] = React.useState(reads);

  const shuffleArray = () => {
    let data = shuffle(shuffledData);
    setShuffledData(data);
  };

  return (
    <Layout>
      <div className="root-container">
        <main className="flex flex-col items-start reads-page-container">
          <h1 className="antialiased dark:text-gray-200">
            Some lines I loved reading&nbsp;.&nbsp;.
          </h1>
          <LazyMotion features={domMax}>
            <m.ul className="grid grid-cols-2 gap-7 reads-list">
              {shuffledData.map((r: ReadInfo, index: number) => (
                <m.li
                  layout={index == 0 ? false : "preserve-aspect"}
                  key={r.quote}
                  className="flex flex-col items-center justify-around reads-list-item"
                >
                  <figure
                    key={index}
                    className="flex flex-col items-stretch justify-around text-center"
                  >
                    <blockquote className="max-w-2xl mx-auto self-start reads-list-item-quote">
                      <p>{r.quote}</p>
                    </blockquote>
                    <figcaption className="flex items-center justify-center text-gray-600 dark:text-gray-300 reads-list-item-info">
                      {r.info}
                    </figcaption>
                  </figure>
                  {index == 0 ? (
                    <div
                      aria-labelledby="shuffle-button-text"
                      className="flex flex-row items-center cursor-pointer shuffle-button"
                      onClick={shuffleArray}
                    >
                      <span>
                        <svg
                          version="1.0"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512.000000 512.000000"
                          preserveAspectRatio="xMidYMid meet"
                        >
                          <g
                            transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                            stroke="none"
                          >
                            <path d="M2760 4542 c-21 -17 -23 -29 -28 -139 l-5 -121 27 -17 c22 -14 32 -16 51 -7 29 13 33 28 38 156 4 94 3 101 -19 123 -28 28 -35 28 -64 5z" />
                            <path d="M3083 4303 c-97 -104 -126 -146 -118 -172 8 -27 40 -44 65 -36 28 9 200 203 200 226 0 24 -34 59 -57 59 -9 0 -50 -35 -90 -77z" />
                            <path d="M1377 4360 c-51 -13 -98 -38 -230 -122 -61 -40 -281 -175 -487 -301 -206 -126 -390 -240 -408 -254 -31 -23 -33 -29 -29 -67 2 -22 35 -106 72 -186 37 -80 159 -350 272 -600 112 -250 214 -465 226 -477 20 -20 44 -24 257 -43 129 -11 323 -29 430 -40 326 -33 327 -33 428 64 28 28 52 47 52 43 0 -4 -27 -74 -60 -155 -38 -95 -60 -163 -60 -188 0 -42 49 -170 98 -257 16 -29 144 -225 285 -437 229 -346 274 -408 327 -447 9 -7 331 -75 715 -152 775 -155 920 -182 944 -174 39 12 64 29 76 53 15 29 89 235 365 1015 109 308 210 590 224 628 37 97 35 145 -10 199 -20 24 -157 225 -305 448 -212 319 -275 408 -302 421 -39 21 -140 42 -319 69 -159 23 -361 61 -885 166 -356 71 -395 77 -435 67 -23 -6 -44 -10 -46 -8 -2 2 -69 149 -148 326 -79 177 -151 333 -160 346 -8 14 -34 33 -57 43 -37 17 -83 19 -417 24 -226 3 -390 2 -413 -4z m510 -108 c11 -7 -4 -17 -512 -325 -154 -93 -291 -180 -305 -192 -24 -22 -32 -23 -303 -28 -153 -3 -277 -4 -275 -2 2 1 127 78 278 171 151 92 343 210 425 262 83 52 166 100 185 108 38 14 485 20 507 6z m285 -19 c9 -10 66 -130 126 -268 61 -137 131 -297 157 -356 l47 -105 -54 -124 -53 -124 -6 44 c-4 33 -15 51 -42 76 -42 39 -73 49 -122 40 -104 -20 -149 -152 -79 -235 46 -55 132 -64 188 -20 14 11 26 19 26 16 0 -10 -172 -424 -183 -439 -23 -33 -419 -318 -442 -318 -12 0 -29 8 -37 18 -9 9 -120 231 -248 492 -128 261 -255 521 -282 577 -34 69 -48 108 -43 122 4 13 65 56 163 115 86 52 308 187 492 300 184 113 344 206 355 206 12 0 29 -8 37 -17z m-1150 -668 c5 -16 129 -275 277 -575 147 -300 267 -546 266 -548 -2 -2 -669 68 -671 71 -9 15 -494 1066 -494 1070 0 8 174 13 419 12 l195 0 8 -30z m2128 -130 c261 -52 558 -109 660 -125 343 -56 370 -61 370 -75 0 -8 -22 -78 -50 -157 -27 -79 -149 -438 -271 -798 -122 -360 -224 -658 -228 -662 -3 -4 -229 49 -501 118 -483 121 -878 215 -1050 249 -47 9 -86 19 -88 20 -2 2 30 79 71 172 87 196 132 301 312 743 148 360 241 578 257 598 6 6 18 12 27 12 9 0 230 -43 491 -95z m1346 -615 c120 -176 227 -333 237 -349 18 -30 18 -30 -36 -188 -30 -87 -155 -452 -278 -810 -123 -359 -226 -653 -229 -653 -3 0 -32 44 -64 98 -33 53 -135 219 -228 369 l-169 271 44 124 c25 68 95 278 157 468 138 425 333 990 341 990 3 0 104 -144 225 -320z m-2106 -1015 c58 -14 363 -89 677 -167 l573 -142 158 -256 c224 -360 296 -480 291 -483 -2 -2 -103 15 -224 39 -121 24 -453 88 -738 142 -285 55 -519 101 -521 103 -5 8 -533 814 -539 825 -6 11 100 -9 323 -61z" />
                            <path d="M1449 4177 c-70 -29 -128 -73 -135 -103 -10 -38 4 -47 57 -41 76 9 192 76 209 121 19 50 -40 60 -131 23z" />
                            <path d="M982 3924 c-62 -31 -144 -118 -140 -148 11 -80 248 57 248 144 0 26 -3 30 -28 30 -15 0 -51 -12 -80 -26z" />
                            <path d="M2000 3923 c-127 -66 -94 -252 47 -269 77 -10 153 60 153 140 0 105 -110 176 -200 129z" />
                            <path d="M1483 3580 c-18 -10 -40 -34 -49 -52 -34 -66 -12 -150 49 -189 48 -30 127 -22 167 16 65 62 62 155 -5 214 -29 25 -44 31 -83 31 -29 0 -59 -8 -79 -20z" />
                            <path d="M1753 3089 c-104 -51 -104 -203 0 -252 90 -43 184 8 203 110 10 51 -29 121 -80 144 -53 24 -72 24 -123 -2z" />
                            <path d="M900 3123 c-8 -3 -25 -14 -37 -25 -58 -53 -55 -144 6 -208 33 -35 43 -40 83 -40 80 0 128 64 113 151 -14 80 -102 145 -165 122z" />
                            <path d="M2785 3276 c-42 -18 -92 -73 -106 -114 -6 -19 -9 -58 -7 -88 18 -217 325 -236 378 -23 38 150 -124 287 -265 225z" />
                            <path d="M3026 2775 c-57 -20 -87 -46 -113 -95 -57 -107 1 -248 115 -280 57 -15 83 -12 140 16 115 57 144 204 60 300 -55 62 -132 85 -202 59z" />
                            <path d="M3285 2292 c-78 -38 -115 -96 -115 -183 0 -110 79 -189 190 -189 193 0 267 246 107 357 -51 35 -126 41 -182 15z" />
                            <path d="M4218 2164 c-89 -48 -105 -280 -26 -370 81 -92 174 7 172 181 -1 92 -18 140 -64 179 -36 30 -45 31 -82 10z" />
                            <path d="M3170 1395 c-27 -33 23 -88 124 -136 163 -77 279 -48 176 44 -87 80 -265 134 -300 92z" />
                            <path d="M2624 1206 c-29 -76 229 -209 330 -170 47 18 -22 95 -127 145 -84 39 -193 52 -203 25z" />
                            <path d="M3326 3950 c-99 -14 -133 -22 -143 -36 -30 -41 -3 -84 52 -84 66 0 271 32 293 46 45 29 15 95 -44 93 -16 -1 -87 -9 -158 -19z" />
                          </g>
                        </svg>
                      </span>
                      <p id="shuffle-button-text">Shuffle</p>
                    </div>
                  ) : null}
                </m.li>
              ))}
            </m.ul>
          </LazyMotion>
        </main>
      </div>
    </Layout>
  );
};

export const Head = () => (
  <SEO
    title="Reads - rishikc.com"
    description="Some of my favorite lines from books, articles, talks, etc."
  />
);

export default ReadsPage;
