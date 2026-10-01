import type { CSSProperties } from "react";
import type { PoemAtmosphereConfig } from "../data/poetry";

const petals = [
  { x: "11%", top: "12%", delay: "-9s", duration: "34s", size: "16px", sway: "30px", turn: "188deg" },
  { x: "86%", top: "24%", delay: "-18s", duration: "39s", size: "14px", sway: "-28px", turn: "232deg" },
  { x: "19%", top: "43%", delay: "-5s", duration: "36s", size: "12px", sway: "24px", turn: "208deg" },
  { x: "80%", top: "60%", delay: "-23s", duration: "41s", size: "15px", sway: "-32px", turn: "246deg" },
  { x: "91%", top: "78%", delay: "-13s", duration: "37s", size: "11px", sway: "-20px", turn: "202deg" },
];

export default function PoemAtmosphere({ config }: { config?: PoemAtmosphereConfig }) {
  if (!config) return null;

  const styles = {
    "--poem-atmosphere-intensity": String(config.intensity),
  } as CSSProperties;

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
          <img
            className="poem-atmosphere-scene poem-atmosphere-art poem-atmosphere-art-left"
            src="/Images/poetry/bones-and-flowers-ribcage.png"
            alt=""
            decoding="async"
            draggable={false}
          />
          <img
            className="poem-atmosphere-scene poem-atmosphere-art poem-atmosphere-art-right"
            src="/Images/poetry/bones-and-flowers-hand.png"
            alt=""
            decoding="async"
            draggable={false}
          />
          <img
            className="poem-atmosphere-mobile-frame poem-atmosphere-mobile-frame-top"
            src="/Images/poetry/bones-and-flowers-mobile.webp"
            alt=""
            decoding="async"
            draggable={false}
          />
          <img
            className="poem-atmosphere-mobile-frame poem-atmosphere-mobile-frame-bottom"
            src="/Images/poetry/bones-and-flowers-mobile.webp"
            alt=""
            decoding="async"
            draggable={false}
          />
        </>
      )}

      {visiblePetals.length > 0 && (
        <div className="poem-petals">
          {visiblePetals.map((petal, index) => (
            <img
              key={index}
              className="poem-petal"
              src="/Images/poetry/bones-and-flowers-petal.webp"
              alt=""
              decoding="async"
              draggable={false}
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
