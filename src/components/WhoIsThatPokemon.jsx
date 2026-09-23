import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { API_BASE_URL } from "../config.js";
import { capitalize, getOfficialArtworkUrl, getCryAudioUrl, sound } from "../utils.js";

export default function WhoIsThatPokemon({ isOpen, onClose }) {
  const [targetPokemon, setTargetPokemon] = useState(null);
  const [options, setOptions] = useState([]);
  const [gameState, setGameState] = useState("loading"); // loading, guessing, answered
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    try {
      return parseInt(localStorage.getItem("pokedex_minigame_highscore") || "0", 10);
    } catch {
      return 0;
    }
  });

  const loadNewRound = async () => {
    setGameState("loading");
    setSelectedAnswer(null);
    setIsCorrect(false);

    try {
      // Pick 4 random distinct IDs between 1 and 386 (classic popular pool for maximum recognition)
      const randomIds = new Set();
      while (randomIds.size < 4) {
        randomIds.add(Math.floor(Math.random() * 386) + 1);
      }
      const idsArray = Array.from(randomIds);
      const targetId = idsArray[0];

      // Fetch all 4 Pokémon names in parallel
      const responses = await Promise.all(
        idsArray.map((id) =>
          fetch(`${API_BASE_URL}/pokemon/${id}`).then((res) => res.json())
        )
      );

      const target = responses[0];
      const choices = responses.map((p) => ({
        id: p.id,
        name: p.name,
      }));

      // Shuffle choices
      choices.sort(() => Math.random() - 0.5);

      setTargetPokemon(target);
      setOptions(choices);
      setGameState("guessing");
    } catch (e) {
      console.error(e);
      setGameState("error");
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadNewRound();
    }
  }, [isOpen]);

  const handleGuess = (chosenName) => {
    if (gameState !== "guessing" || !targetPokemon) return;

    setSelectedAnswer(chosenName);
    const correct = chosenName.toLowerCase() === targetPokemon.name.toLowerCase();
    setIsCorrect(correct);
    setGameState("answered");

    if (correct) {
      sound.playVictory();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#22c55e", "#facc15", "#38bdf8", "#ec4899"],
      });
      const nextScore = score + 1;
      setScore(nextScore);
      if (nextScore > highScore) {
        setHighScore(nextScore);
        try {
          localStorage.setItem("pokedex_minigame_highscore", String(nextScore));
        } catch {
          // ignore
        }
      }
    } else {
      sound.playBlip();
      setScore(0);
    }
  };

  const playClueCry = () => {
    if (!targetPokemon) return;
    const cryUrl = targetPokemon.cries?.latest || getCryAudioUrl(targetPokemon.id);
    const audio = new Audio(cryUrl);
    audio.volume = 0.6;
    audio.play().catch(() => {});
  };

  if (!isOpen) return null;

  return (
    <div className="minigame-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="minigame-modal glass-panel" onClick={(e) => e.stopPropagation()}>
        <div className="minigame-header">
          <div className="minigame-title">
            <span className="pokeball-spin-mini" aria-hidden="true">🔴</span>
            <h3>Who's That Pokémon?</h3>
          </div>
          <button type="button" className="close-btn" onClick={onClose} aria-label="Close Mini-game">
            ✕
          </button>
        </div>

        <div className="minigame-scoreboard">
          <div className="score-pill">
            Streak: <span className="score-num">{score} 🔥</span>
          </div>
          <div className="score-pill">
            High Score: <span className="score-num">{highScore} 🏆</span>
          </div>
        </div>

        {gameState === "loading" && (
          <div className="minigame-stage loading">
            <p className="status">Summoning a mysterious Pokémon…</p>
          </div>
        )}

        {targetPokemon && gameState !== "loading" && (
          <>
            <div className="minigame-stage">
              <div className="silhouette-backdrop">
                <img
                  src={getOfficialArtworkUrl(targetPokemon.id)}
                  alt={gameState === "answered" ? targetPokemon.name : "Mystery Pokémon"}
                  className={`silhouette-img ${gameState === "guessing" ? "is-hidden" : "is-revealed"}`}
                />
              </div>

              {gameState === "guessing" && (
                <button type="button" className="clue-sound-btn" onClick={playClueCry}>
                  🔊 Play Audio Clue
                </button>
              )}

              {gameState === "answered" && (
                <div className={`result-banner ${isCorrect ? "correct" : "wrong"}`}>
                  {isCorrect
                    ? `🎉 It's ${capitalize(targetPokemon.name)}! (+1 Streak)`
                    : `❌ It's ${capitalize(targetPokemon.name)}!`}
                </div>
              )}
            </div>

            <div className="minigame-options-grid">
              {options.map((opt) => {
                let btnStateClass = "";
                if (gameState === "answered") {
                  if (opt.name.toLowerCase() === targetPokemon.name.toLowerCase()) {
                    btnStateClass = "btn-correct";
                  } else if (opt.name === selectedAnswer) {
                    btnStateClass = "btn-wrong";
                  }
                }

                return (
                  <button
                    key={opt.name}
                    type="button"
                    className={`minigame-opt-btn ${btnStateClass}`}
                    onClick={() => handleGuess(opt.name)}
                    disabled={gameState === "answered"}
                  >
                    {capitalize(opt.name)}
                  </button>
                );
              })}
            </div>

            {gameState === "answered" && (
              <div className="minigame-next-action">
                <button type="button" className="next-round-btn" onClick={loadNewRound}>
                  Next Pokémon →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
