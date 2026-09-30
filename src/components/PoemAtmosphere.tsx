import type { CSSProperties } from "react";
import type { PoemAtmosphereConfig } from "../data/poetry";

const petals = [
  { x: "9%", delay: "-11s", duration: "28s", size: "12px", sway: "42px" },
  { x: "18%", delay: "-3s", duration: "24s", size: "9px", sway: "-34px" },
  { x: "78%", delay: "-16s", duration: "31s", size: "11px", sway: "30px" },
  { x: "88%", delay: "-7s", duration: "26s", size: "8px", sway: "-28px" },
  { x: "66%", delay: "-21s", duration: "34s", size: "7px", sway: "22px" },
];

function LeftBoneStudy({ botanical }: { botanical: boolean }) {
  return (
    <svg
      className="poem-atmosphere-art poem-atmosphere-art-left"
      viewBox="0 0 500 1000"
      preserveAspectRatio="xMinYMid meet"
      focusable="false"
    >
      <g className="poem-atmosphere-bones">
        <path d="M206 48C195 171 204 286 188 414C173 538 181 684 152 910" />
        <path d="M198 126C157 111 104 116 61 146C38 163 22 184 10 210" />
        <path d="M195 171C148 151 91 160 48 195C26 214 12 237 4 260" />
        <path d="M191 218C142 196 82 212 42 252C21 273 10 295 4 319" />
        <path d="M188 267C141 245 86 262 51 301C29 325 17 351 12 377" />
        <path d="M184 318C145 299 102 315 74 348C56 369 46 393 40 418" />
        <path d="M180 369C148 355 113 369 90 396C73 416 63 439 58 462" />
        <path d="M184 111C217 94 253 92 286 104" />
        <path d="M192 150C228 132 267 132 301 147" />
        <path d="M198 191C237 173 281 177 316 195" />
        <path d="M202 235C242 221 285 229 319 250" />
        <path d="M204 283C241 273 278 282 307 302" />
        <path d="M204 332C237 326 268 335 291 352" />
        <path d="M194 80C223 59 260 57 292 73" />
        <path d="M161 489C131 530 121 572 126 616C131 653 150 686 176 712" />
        <path d="M176 490C213 523 232 565 229 611C227 649 211 683 187 711" />
        <circle cx="196" cy="81" r="7" />
        <circle cx="184" cy="490" r="9" />
      </g>

      {botanical && (
        <g className="poem-atmosphere-botanical">
          <path d="M24 35C69 94 74 163 52 230C33 286 31 353 66 412C97 465 102 531 75 592C47 656 49 726 88 788C108 821 119 858 116 902" />
          <path d="M59 173C87 151 112 140 139 138" />
          <path d="M65 405C92 390 119 382 150 384" />
          <path d="M79 590C110 571 137 564 166 568" />
          <path d="M93 789C123 774 149 771 177 777" />
          <ellipse cx="88" cy="157" rx="18" ry="7" transform="rotate(-31 88 157)" />
          <ellipse cx="117" cy="140" rx="15" ry="6" transform="rotate(19 117 140)" />
          <ellipse cx="96" cy="390" rx="19" ry="7" transform="rotate(-18 96 390)" />
          <ellipse cx="131" cy="383" rx="15" ry="6" transform="rotate(24 131 383)" />
          <ellipse cx="112" cy="574" rx="18" ry="7" transform="rotate(-24 112 574)" />
          <ellipse cx="149" cy="568" rx="15" ry="6" transform="rotate(18 149 568)" />
          <ellipse cx="126" cy="776" rx="18" ry="7" transform="rotate(-20 126 776)" />
          <ellipse cx="159" cy="777" rx="14" ry="6" transform="rotate(26 159 777)" />
          <g className="poem-atmosphere-flower" transform="translate(75 282)">
            <ellipse cx="-11" cy="0" rx="13" ry="7" transform="rotate(12)" />
            <ellipse cx="0" cy="-11" rx="7" ry="13" transform="rotate(8)" />
            <ellipse cx="11" cy="0" rx="13" ry="7" transform="rotate(-12)" />
            <ellipse cx="0" cy="11" rx="7" ry="13" transform="rotate(-8)" />
            <circle cx="0" cy="0" r="4" />
          </g>
          <g className="poem-atmosphere-flower" transform="translate(102 688) scale(.82)">
            <ellipse cx="-11" cy="0" rx="13" ry="7" transform="rotate(12)" />
            <ellipse cx="0" cy="-11" rx="7" ry="13" transform="rotate(8)" />
            <ellipse cx="11" cy="0" rx="13" ry="7" transform="rotate(-12)" />
            <ellipse cx="0" cy="11" rx="7" ry="13" transform="rotate(-8)" />
            <circle cx="0" cy="0" r="4" />
          </g>
        </g>
      )}
    </svg>
  );
}

function RightHandStudy({ botanical }: { botanical: boolean }) {
  return (
    <svg
      className="poem-atmosphere-art poem-atmosphere-art-right"
      viewBox="0 0 500 1000"
      preserveAspectRatio="xMaxYMid meet"
      focusable="false"
    >
      <g className="poem-atmosphere-bones">
        <path d="M112 942L223 711" />
        <path d="M154 953L255 731" />
        <path d="M221 711L274 628L312 575" />
        <path d="M255 731L306 650L341 602" />
        <path d="M273 628L320 525L349 425L365 333" />
        <path d="M299 642L354 545L393 449L418 353" />
        <path d="M318 660L381 580L438 508L480 431" />
        <path d="M327 684L401 626L459 575L500 526" />
        <path d="M278 646L229 594L196 538L177 489" />
        <path d="M238 704C276 693 308 672 329 642C344 620 352 596 354 571" />
        <path d="M249 726C291 716 326 692 348 659C361 638 369 616 373 591" />
        <circle cx="275" cy="628" r="8" />
        <circle cx="299" cy="642" r="8" />
        <circle cx="318" cy="660" r="8" />
        <circle cx="327" cy="684" r="8" />
        <circle cx="229" cy="594" r="7" />
        <circle cx="320" cy="525" r="6" />
        <circle cx="354" cy="545" r="6" />
        <circle cx="381" cy="580" r="6" />
        <circle cx="401" cy="626" r="6" />
      </g>

      {botanical && (
        <g className="poem-atmosphere-botanical">
          <path d="M476 59C433 122 426 187 447 252C466 310 466 374 432 430C403 478 398 541 422 598C448 659 445 721 411 782C391 818 382 857 385 903" />
          <path d="M440 185C413 164 387 153 358 151" />
          <path d="M432 426C405 411 378 402 348 404" />
          <path d="M419 600C391 583 363 575 335 580" />
          <ellipse cx="410" cy="169" rx="18" ry="7" transform="rotate(29 410 169)" />
          <ellipse cx="378" cy="152" rx="15" ry="6" transform="rotate(-18 378 152)" />
          <ellipse cx="405" cy="411" rx="18" ry="7" transform="rotate(20 405 411)" />
          <ellipse cx="368" cy="403" rx="15" ry="6" transform="rotate(-24 368 403)" />
          <ellipse cx="389" cy="584" rx="18" ry="7" transform="rotate(22 389 584)" />
          <ellipse cx="350" cy="578" rx="15" ry="6" transform="rotate(-17 350 578)" />
          <g className="poem-atmosphere-flower" transform="translate(430 308) scale(.78)">
            <ellipse cx="-11" cy="0" rx="13" ry="7" transform="rotate(12)" />
            <ellipse cx="0" cy="-11" rx="7" ry="13" transform="rotate(8)" />
            <ellipse cx="11" cy="0" rx="13" ry="7" transform="rotate(-12)" />
            <ellipse cx="0" cy="11" rx="7" ry="13" transform="rotate(-8)" />
            <circle cx="0" cy="0" r="4" />
          </g>
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
  const visiblePetals = drifting && config.elements.includes("petals")
    ? petals.slice(0, config.petalCount ?? 4)
    : [];

  return (
    <div
      className={`poem-atmosphere poem-atmosphere-${config.artwork}${
        drifting ? " is-drifting" : ""
      }`}
      style={styles}
      aria-hidden="true"
    >
      {config.artwork === "bone-botanical" && (
        <>
          <LeftBoneStudy botanical={botanical} />
          <RightHandStudy botanical={botanical} />
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
                  "--petal-delay": petal.delay,
                  "--petal-duration": petal.duration,
                  "--petal-size": petal.size,
                  "--petal-sway": petal.sway,
                } as CSSProperties
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
