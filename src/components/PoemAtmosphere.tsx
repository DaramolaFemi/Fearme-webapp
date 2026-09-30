import type { CSSProperties } from "react";
import type { PoemAtmosphereConfig } from "../data/poetry";

const petals = [
  { x: "12%", top: "14%", delay: "-9s", duration: "24s", size: "11px", sway: "34px", turn: "168deg" },
  { x: "82%", top: "27%", delay: "-15s", duration: "29s", size: "9px", sway: "-30px", turn: "216deg" },
  { x: "18%", top: "46%", delay: "-4s", duration: "27s", size: "8px", sway: "28px", turn: "192deg" },
  { x: "76%", top: "61%", delay: "-19s", duration: "31s", size: "12px", sway: "-36px", turn: "238deg" },
  { x: "88%", top: "78%", delay: "-12s", duration: "26s", size: "7px", sway: "-22px", turn: "184deg" },
];

function Flower({ x, y, scale = 1, rotate = 0 }: { x: number; y: number; scale?: number; rotate?: number }) {
  return (
    <g
      className="poem-atmosphere-flower"
      transform={"translate(" + x + " " + y + ") rotate(" + rotate + ") scale(" + scale + ")"}
    >
      <path d="M0-3C-11-24-7-41 3-45C15-40 17-22 4-2Z" />
      <path d="M3 0C22-14 39-10 43 1C37 13 20 14 2 5Z" />
      <path d="M0 4C13 24 8 40-3 44C-15 39-17 21-4 2Z" />
      <path d="M-4 0C-23 12-39 7-42-4C-35-15-18-15-2-5Z" />
      <path d="M-2-2C8-11 18-9 22-1C18 8 7 10-2 4C-11 8-21 4-22-5C-16-12-8-11-2-2Z" />
      <circle cx="0" cy="0" r="3.5" />
    </g>
  );
}

function RibBloomStudy({ botanical }: { botanical: boolean }) {
  const vertebrae = [94, 126, 160, 196, 234, 274, 316, 360, 406];
  return (
    <svg
      className="poem-atmosphere-scene poem-atmosphere-scene-opening"
      viewBox="0 0 520 720"
      preserveAspectRatio="xMinYMin meet"
      focusable="false"
    >
      <g className="poem-bone-mass">
        <path d="M171 73C154 154 156 247 151 330C147 414 141 504 111 608" />
        <path d="M168 121C125 102 75 107 34 138C9 157-5 181-16 209" />
        <path d="M166 160C115 136 57 146 16 184C-5 204-18 229-26 257" />
        <path d="M163 203C111 178 53 193 14 234C-7 256-17 281-21 307" />
        <path d="M159 250C111 226 59 242 26 281C7 303-2 328-3 354" />
        <path d="M156 298C118 279 78 291 50 321C32 340 22 362 18 385" />
        <path d="M153 347C125 334 95 342 74 363C60 378 50 397 45 417" />
      </g>
      <g className="poem-bone-detail">
        <path d="M173 96C198 79 227 76 255 88" />
        <path d="M171 133C203 113 240 113 272 130" />
        <path d="M168 173C205 152 246 155 280 176" />
        <path d="M165 217C204 199 247 205 280 229" />
        <path d="M162 264C199 251 238 260 267 282" />
        <path d="M158 312C190 305 223 314 247 332" />
        <path d="M151 363C178 359 203 366 224 381" />
        {vertebrae.map((y, index) => (
          <ellipse key={y} cx={161 - index * 2.4} cy={y} rx={13 - index * 0.35} ry="8" transform={"rotate(" + (index % 2 ? -7 : 6) + " " + (161 - index * 2.4) + " " + y + ")"} />
        ))}
        <path d="M130 471C95 508 82 552 88 597C92 628 105 658 125 681" />
        <path d="M151 472C186 505 202 548 198 592C195 626 180 657 157 680" />
      </g>

      {botanical && (
        <g className="poem-botanical-study">
          <path d="M25 659C47 601 54 542 43 487C31 425 43 370 77 327C105 292 116 250 112 200C108 155 121 112 151 74" />
          <path d="M49 512C76 495 101 490 128 493" />
          <path d="M69 386C95 365 121 355 147 357" />
          <path d="M91 278C117 258 143 250 169 254" />
          <path d="M112 179C138 161 164 156 189 162" />
          <path d="M77 495C60 473 55 452 61 431" />
          <path d="M118 357C101 337 97 316 104 296" />
          <path d="M148 253C135 234 133 216 140 198" />
          <ellipse cx="91" cy="482" rx="20" ry="7" transform="rotate(-28 91 482)" />
          <ellipse cx="125" cy="361" rx="18" ry="6" transform="rotate(18 125 361)" />
          <ellipse cx="150" cy="252" rx="19" ry="7" transform="rotate(-21 150 252)" />
          <ellipse cx="171" cy="161" rx="16" ry="6" transform="rotate(23 171 161)" />
          <Flower x={63} y={428} scale={0.9} rotate={-12} />
          <Flower x={140} y={292} scale={0.72} rotate={16} />
          <Flower x={159} y={121} scale={0.56} rotate={-8} />
        </g>
      )}
    </svg>
  );
}

function RootBloomStudy({ botanical }: { botanical: boolean }) {
  return (
    <svg
      className="poem-atmosphere-scene poem-atmosphere-scene-middle"
      viewBox="0 0 560 560"
      preserveAspectRatio="xMaxYMid meet"
      focusable="false"
    >
      <g className="poem-root-study">
        <path d="M560 77C490 95 447 126 421 168C390 218 367 257 323 279C276 303 254 342 247 397C241 448 211 487 157 520" />
        <path d="M505 117C477 161 470 199 485 232C499 263 495 294 472 326" />
        <path d="M423 169C389 148 357 146 326 161" />
        <path d="M349 267C314 245 278 243 244 259" />
        <path d="M257 395C223 374 188 372 154 389" />
        <path d="M470 327C439 345 422 368 418 397C414 431 396 455 363 472" />
        <path d="M327 161C309 188 304 213 313 236" />
        <path d="M244 259C228 283 224 306 233 329" />
        <path d="M154 389C136 415 131 438 139 462" />
        <ellipse cx="395" cy="151" rx="19" ry="7" transform="rotate(-33 395 151)" />
        <ellipse cx="291" cy="250" rx="17" ry="6" transform="rotate(22 291 250)" />
        <ellipse cx="208" cy="382" rx="18" ry="7" transform="rotate(-19 208 382)" />
      </g>
      {botanical && (
        <>
          <g className="poem-botanical-study">
            <Flower x={425} y={168} scale={1.02} rotate={8} />
            <Flower x={247} y={398} scale={0.78} rotate={-17} />
          </g>
          <g className="poem-decay-study">
            <path d="M420 171C402 184 390 199 384 216" />
            <path d="M247 401C226 415 211 431 202 449" />
          </g>
        </>
      )}
    </svg>
  );
}

function OssuaryHandStudy({ botanical }: { botanical: boolean }) {
  const joints = [
    [262, 306], [300, 292], [335, 302], [367, 323], [390, 352],
    [233, 363], [278, 350], [320, 357], [357, 379], [383, 409],
  ];
  return (
    <svg
      className="poem-atmosphere-scene poem-atmosphere-scene-ending"
      viewBox="0 0 560 700"
      preserveAspectRatio="xMaxYMax meet"
      focusable="false"
    >
      <g className="poem-grave-study">
        <path d="M116 611C191 582 270 578 349 595C421 611 487 610 554 585" />
        <path d="M87 639C186 613 288 615 388 635C447 647 503 645 560 627" />
        <path d="M147 669C249 649 350 653 454 675" />
      </g>
      <g className="poem-bone-mass poem-hand-mass">
        <path d="M169 649C204 558 220 476 231 382" />
        <path d="M208 657C238 566 251 486 259 390" />
        <path d="M244 384C262 350 278 324 299 293C316 267 330 238 341 205" />
        <path d="M267 393C294 358 316 331 340 304C363 279 382 251 398 220" />
        <path d="M284 410C317 381 347 358 379 336C408 316 434 292 456 264" />
        <path d="M294 433C333 411 367 394 404 380C439 367 471 349 500 325" />
        <path d="M246 395C219 363 201 332 190 301C181 276 169 253 152 232" />
      </g>
      <g className="poem-bone-detail">
        <path d="M222 455C252 444 279 427 299 403C316 383 326 360 329 336" />
        <path d="M237 477C271 465 299 446 320 420C336 400 345 378 349 354" />
        {joints.map(([x, y]) => <circle key={x + "-" + y} cx={x} cy={y} r="7" />)}
        <circle cx="245" cy="392" r="10" />
        <circle cx="268" cy="399" r="9" />
        <circle cx="286" cy="414" r="9" />
        <circle cx="296" cy="435" r="8" />
      </g>
      <g className="poem-root-study poem-root-entanglement">
        <path d="M118 614C171 589 214 549 240 494C259 454 284 428 315 411C353 390 380 360 399 320" />
        <path d="M187 640C205 592 235 558 278 540C320 522 349 490 364 444" />
        <path d="M244 493C215 480 190 456 170 422" />
        <path d="M312 412C335 421 355 439 372 466" />
        <ellipse cx="205" cy="562" rx="20" ry="7" transform="rotate(-28 205 562)" />
        <ellipse cx="340" cy="474" rx="17" ry="6" transform="rotate(24 340 474)" />
      </g>
      {botanical && (
        <g className="poem-botanical-study">
          <Flower x={399} y={319} scale={0.66} rotate={22} />
          <Flower x={171} y={423} scale={0.5} rotate={-18} />
        </g>
      )}
    </svg>
  );
}

export default function PoemAtmosphere({
  config,
}: {
  config?: PoemAtmosphereConfig;
}) {
  if (!config) return null;

  const styles = {
    "--poem-atmosphere-intensity": String(config.intensity),
  } as CSSProperties;

  const botanical = config.elements.includes("botanical");
  const drifting = config.motion === "drift";
  const visiblePetals =
    drifting && config.elements.includes("petals")
      ? petals.slice(0, config.petalCount ?? 4)
      : [];

  return (
    <div
      className={"poem-atmosphere poem-atmosphere-" + config.artwork + (drifting ? " is-drifting" : "")}
      style={styles}
      aria-hidden="true"
    >
      {config.artwork === "bone-botanical" && (
        <>
          <RibBloomStudy botanical={botanical} />
          <RootBloomStudy botanical={botanical} />
          <OssuaryHandStudy botanical={botanical} />
        </>
      )}

      {visiblePetals.length > 0 && (
        <div className="poem-petals">
          {visiblePetals.map((petal, index) => (
            <span
              key={index}
              className="poem-petal"
              style={
                {
                  "--petal-x": petal.x,
                  "--petal-top": petal.top,
                  "--petal-delay": petal.delay,
                  "--petal-duration": petal.duration,
                  "--petal-size": petal.size,
                  "--petal-sway": petal.sway,
                  "--petal-turn": petal.turn,
                } as CSSProperties
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
