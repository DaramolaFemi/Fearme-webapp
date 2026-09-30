import type { CSSProperties } from "react";
import type { PoemAtmosphereConfig } from "../data/poetry";

const petals = [
  { x: "8%", top: "18%", delay: "-7s", duration: "25s", size: "12px", sway: "34px", turn: "176deg" },
  { x: "88%", top: "26%", delay: "-13s", duration: "31s", size: "10px", sway: "-28px", turn: "228deg" },
  { x: "16%", top: "43%", delay: "-3s", duration: "28s", size: "8px", sway: "26px", turn: "198deg" },
  { x: "79%", top: "58%", delay: "-18s", duration: "33s", size: "11px", sway: "-34px", turn: "242deg" },
  { x: "91%", top: "76%", delay: "-10s", duration: "27s", size: "7px", sway: "-20px", turn: "188deg" },
];

function Bloom({ x, y, scale = 1, rotate = 0 }: { x: number; y: number; scale?: number; rotate?: number }) {
  return (
    <g className="poem-atmosphere-flower" transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}>
      <path d="M0-4C-18-34-11-58 5-64C23-57 25-31 7-2Z" />
      <path d="M4-1C34-22 57-15 63 2C54 20 29 21 2 7Z" />
      <path d="M1 5C18 35 9 58-7 64C-24 55-24 29-6 2Z" />
      <path d="M-5 0C-35 19-58 11-63-6C-52-23-27-22-2-7Z" />
      <path d="M-4-4C10-17 26-14 31-2C26 11 10 15-4 7C-18 13-31 6-31-7C-22-18-10-16-4-4Z" />
      <circle cx="0" cy="0" r="4" />
    </g>
  );
}

function LeftOssuaryBloom({ botanical }: { botanical: boolean }) {
  const vertebrae = [144, 178, 214, 252, 292, 334, 378, 424, 472, 522];
  return (
    <svg className="poem-atmosphere-scene poem-atmosphere-scene-left" viewBox="0 0 520 1120" preserveAspectRatio="xMinYMin meet" focusable="false">
      <g className="poem-bone-mass poem-ribcage">
        <path d="M214 93C198 194 200 291 196 387C192 488 182 602 147 744" />
        <path d="M210 151C166 130 109 135 61 170C29 194 8 225-4 260" />
        <path d="M207 194C158 168 95 174 45 216C14 242-5 273-14 307" />
        <path d="M203 242C151 214 88 225 39 269C8 297-8 330-14 365" />
        <path d="M199 294C149 267 90 280 47 324C19 353 6 385 2 418" />
        <path d="M195 349C151 326 102 337 67 375C44 400 32 429 28 459" />
        <path d="M191 405C154 386 114 394 84 425C64 446 53 472 49 499" />
        <path d="M187 462C157 448 126 454 103 477C88 493 78 512 74 533" />
      </g>

      <g className="poem-bone-detail">
        {vertebrae.map((y,index)=><ellipse key={y} cx={204-index*2.1} cy={y} rx={15-index*0.45} ry="9" transform={`rotate(${index%2?-7:7} ${204-index*2.1} ${y})`} />)}
        <path d="M219 124C251 100 291 97 326 116" />
        <path d="M216 166C254 141 300 143 338 168" />
        <path d="M212 211C255 188 306 193 345 223" />
        <path d="M207 260C252 240 304 250 342 282" />
        <path d="M202 313C244 299 291 310 326 340" />
        <path d="M198 368C234 360 273 371 302 396" />
        <path d="M192 425C222 421 255 431 279 450" />
        <path d="M160 643C116 692 99 749 106 806C111 847 129 887 158 919" />
        <path d="M184 644C229 689 249 746 244 801C240 845 222 884 194 918" />
      </g>

      {botanical && (
        <>
          <g className="poem-botanical-study poem-vine-left">
            <path d="M16 1021C53 935 67 849 49 766C31 681 42 607 87 548C126 497 140 437 130 366C122 306 134 247 171 193C194 159 215 124 226 88" />
            <path d="M55 820C94 794 128 786 164 792" />
            <path d="M72 678C111 649 147 640 184 647" />
            <path d="M96 530C134 505 171 498 205 506" />
            <path d="M119 392C157 367 191 361 224 370" />
            <path d="M145 276C179 256 209 251 239 259" />
            <ellipse cx="112" cy="793" rx="25" ry="8" transform="rotate(-25 112 793)" />
            <ellipse cx="141" cy="646" rx="22" ry="7" transform="rotate(22 141 646)" />
            <ellipse cx="168" cy="503" rx="23" ry="7" transform="rotate(-18 168 503)" />
            <ellipse cx="195" cy="369" rx="20" ry="7" transform="rotate(21 195 369)" />
            <ellipse cx="212" cy="258" rx="18" ry="6" transform="rotate(-22 212 258)" />
          </g>
          <Bloom x={83} y={744} scale={0.72} rotate={-18} />
          <Bloom x={145} y={581} scale={0.9} rotate={14} />
          <Bloom x={185} y={424} scale={0.58} rotate={-9} />
          <Bloom x={214} y={235} scale={0.5} rotate={11} />
        </>
      )}
    </svg>
  );
}

function RightHandBloom({ botanical }: { botanical: boolean }) {
  const joints = [
    [255,355],[293,335],[331,341],[366,359],[397,386],
    [236,411],[281,394],[324,402],[363,422],[395,452],
  ];
  return (
    <svg className="poem-atmosphere-scene poem-atmosphere-scene-right" viewBox="0 0 560 1040" preserveAspectRatio="xMaxYMid meet" focusable="false">
      <g className="poem-bone-mass poem-hand-mass">
        <path d="M161 940C196 824 215 698 228 563" />
        <path d="M203 948C239 831 256 706 264 574" />
        <path d="M246 565C263 513 281 469 303 421C322 379 337 334 348 284" />
        <path d="M270 573C299 520 322 477 348 437C375 397 397 355 415 309" />
        <path d="M287 590C324 546 357 510 392 477C426 445 456 409 481 368" />
        <path d="M299 616C343 582 383 555 424 532C465 509 502 481 534 447" />
        <path d="M248 575C222 524 205 478 194 438C185 404 172 374 154 348" />
      </g>
      <g className="poem-bone-detail">
        <path d="M223 652C262 635 294 611 316 579C334 553 345 523 349 490" />
        <path d="M240 681C283 662 318 635 341 600C359 572 369 543 373 514" />
        {joints.map(([x,y])=><circle key={x+"-"+y} cx={x} cy={y} r="8" />)}
        <circle cx="246" cy="566" r="11" />
        <circle cx="270" cy="575" r="10" />
        <circle cx="289" cy="592" r="9" />
        <circle cx="301" cy="617" r="9" />
      </g>

      {botanical && (
        <>
          <g className="poem-root-study poem-root-entanglement">
            <path d="M108 958C176 924 224 875 247 809C266 755 295 718 334 695C381 668 414 626 435 569" />
            <path d="M184 980C205 920 239 877 288 854C339 830 374 788 393 726" />
            <path d="M248 810C216 793 188 765 168 726" />
            <path d="M335 695C361 705 384 728 405 764" />
            <path d="M435 569C465 580 492 604 515 642" />
            <ellipse cx="206" cy="890" rx="24" ry="8" transform="rotate(-27 206 890)" />
            <ellipse cx="371" cy="777" rx="20" ry="7" transform="rotate(24 371 777)" />
            <ellipse cx="474" cy="602" rx="18" ry="6" transform="rotate(-18 474 602)" />
          </g>
          <Bloom x={439} y={567} scale={0.66} rotate={18} />
          <Bloom x={332} y={696} scale={0.52} rotate={-15} />
          <Bloom x={195} y={895} scale={0.46} rotate={9} />
        </>
      )}
    </svg>
  );
}

function EdgeVines() {
  return (
    <svg className="poem-atmosphere-vines" viewBox="0 0 1600 1800" preserveAspectRatio="none" focusable="false">
      <g className="poem-root-study">
        <path d="M0 72C121 91 177 141 214 222C246 290 309 327 393 336" />
        <path d="M1600 146C1496 158 1447 210 1417 291C1394 353 1347 398 1269 417" />
        <path d="M0 1540C112 1507 181 1449 217 1363C250 1287 306 1248 392 1245" />
        <path d="M1600 1580C1490 1549 1423 1497 1381 1413C1347 1344 1287 1303 1202 1292" />
        <ellipse cx="168" cy="164" rx="26" ry="8" transform="rotate(25 168 164)" />
        <ellipse cx="1452" cy="245" rx="24" ry="8" transform="rotate(-24 1452 245)" />
        <ellipse cx="183" cy="1420" rx="25" ry="8" transform="rotate(-26 183 1420)" />
        <ellipse cx="1417" cy="1474" rx="25" ry="8" transform="rotate(22 1417 1474)" />
      </g>
    </svg>
  );
}

export default function PoemAtmosphere({ config }: { config?: PoemAtmosphereConfig }) {
  if (!config) return null;

  const styles = {
    "--poem-atmosphere-intensity": String(config.intensity),
  } as CSSProperties;

  const botanical = config.elements.includes("botanical");
  const drifting = config.motion === "drift";
  const visiblePetals = drifting && config.elements.includes("petals")
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
          <EdgeVines />
          <LeftOssuaryBloom botanical={botanical} />
          <RightHandBloom botanical={botanical} />
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
