import type { CSSProperties } from "react";
import type { PoemAtmosphereConfig } from "../data/poetry";

const petals = [
  { x: "12%", top: "14%", delay: "-9s", duration: "29s", size: "11px", sway: "26px", turn: "190deg" },
  { x: "83%", top: "23%", delay: "-17s", duration: "34s", size: "9px", sway: "-24px", turn: "236deg" },
  { x: "20%", top: "42%", delay: "-4s", duration: "31s", size: "8px", sway: "22px", turn: "212deg" },
  { x: "78%", top: "61%", delay: "-21s", duration: "36s", size: "10px", sway: "-30px", turn: "248deg" },
  { x: "90%", top: "79%", delay: "-12s", duration: "32s", size: "7px", sway: "-18px", turn: "204deg" },
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
