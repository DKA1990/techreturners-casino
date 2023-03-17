import React, { useState } from "react";

interface Props {
  onEligible: () => void;
}

const AgeCheck: React.FC<Props> = ({ onEligible }) => {
  const [age, setAge] = useState<number | null>(null);

  const handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAge = parseInt(event.target.value);
    setAge(newAge);
  };

  const handlePlayClick = () => {
    if (age && age >= 18) {
      onEligible();
    } else {
      alert("You must be at least 18 years old to play blackjack.");
    }
  };

  return (
    <div>
      <label htmlFor="age-input">Please enter your age:</label>
      <input
        id="age-input"
        type="number"
        min="1"
        max="120"
        value={age ?? ""}
        onChange={handleAgeChange}
      />
      <button onClick={handlePlayClick}>Play Blackjack</button>
    </div>
  );
};

export default AgeCheck;
