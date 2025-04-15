import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './click.css';

export function Click() {
  const [duckCount, setDuckCount] = useState(0);

  const [clickValue, setClicks] = useState(1);

  const [clickAnimations, setClickAnimations] = useState([]);

  const handleDuckClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newClick = {
      id: Date.now(),
      x,
      y,
      amount: clickValue,
    };

    setClickAnimations(prev => [...prev, newClick]);
    setDuckCount(duckCount + clickValue);
  };

  useEffect(() => {
    if (clickAnimations.length === 0) return;

    const timer = setTimeout(() => {
      setClickAnimations(prev => prev.slice(1));
    }, 1000);

    return () => clearTimeout(timer);
  }, [clickAnimations]);


  const [cps, setCps] = useState(0);

  const tickRate = 10;
  const ticksPerSecond = 1000 / tickRate;

  const [growthRate, setGrowthRate] = useState(1.15);

  useEffect(() => {
    const interval = setInterval(() => {
      setDuckCount(prev => prev + cps / ticksPerSecond);
    }, tickRate);

    return () => clearInterval(interval);
  }, [cps]);


  const [currentDuckImage, setCurrentDuckImage] = useState('single-cell.jpg');

  const [currentQuote, setCurrentQuote] = useState("You have begun life as a single cell. No other ducks exist.")

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const upgrades = [
    /* First Evolution */
    { name: 'Cell Division', cost: 50, clicks: 2 },
    /* Multi-celled Duck */
    { name: 'Cell Tissue Development', cost: 100, clicks: 3 },
    { name: 'Filter Feeding', cost: 200, clicks: 5 },
    { name: 'Muscle Development', cost: 400, clicks: 8 },
    { name: 'Swimming', cost: 800, clicks: 13 },
    { name: 'Organ Formation', cost: 1600, clicks: 21 },
    /* Small Fish */
    { name: '', cost: 4000, clicks: 34 },
    { name: '', cost: 10000, clicks: 34 },

  ];

  const initialDuckielutions = [
    { name: 'Multi-Celled Duck', cost: 80, cps: 1, quantity: 0, image: "multi-celled duck.jpg", quote: "You have grown extra cells. What do you need those for?" },
    { name: 'Small Fish', cost: 200, cps: 2, quantity: 0, image: "", quote: "Just keep swimming. Just keep swimming." },
    { name: 'Big Fish', cost: 750, cps: 3, quantity: 0, image: "", quote: "One fish, two fish, red fish, blue fish." },
    { name: 'Flat Fish', cost: 4000, cps: 5, quantity: 0, image: "", quote: "Wanna play hide and seek?" },
    { name: 'Lungfish', cost: 35000, cps: 8, quantity: 0, image: "", quote: "I can breathe!!" },
    { name: 'Lizard', cost: 475000, cps: 13, quantity: 0, image: "", quote: "" },
    { name: 'Dinosaur', cost: 10000000, cps: 21, quantity: 0, image: "", quote: "" },
    { name: 'Archaeopteryx', cost: 225000000, cps: 34, quantity: 0, image: "", quote: "" },
  ];

  const [duckielutions, setDuckielutions] = useState(initialDuckielutions);


  const [unlockedUpgrades, setUnlockedUpgrades] = useState([]);
  const [unlockedDuckielutions, setUnlockedDuckielutions] = useState([]);

  const handleUpgradeClick = (index) => {
    const name = upgrades[index].name;
    if (!unlockedUpgrades.includes(name)) {
      const upgrade = upgrades[index];
      setUnlockedUpgrades([...unlockedUpgrades, name]);
      setDuckCount(duckCount - upgrade.cost);
      setClicks(upgrade.clicks);
    }
  };

  const [buyAmount, setBuyAmount] = useState(1);

  const calculateTotalCost = (baseCost, growthRate, currentQty, amount) => {
    let total = 0;
    for (let i = 0; i < amount; i++) {
      total += Math.floor(baseCost * Math.pow(growthRate, currentQty + i));
    }
    return total;
  };


  const calculateMaxAffordable = (baseCost, growthRate, currentQty, duckCount) => {
    let total = 0;
    let count = 0;

    while (true) {
      const cost = Math.floor(baseCost * Math.pow(growthRate, currentQty + count));
      if (total + cost > duckCount) break;
      total += cost;
      count++;
    }
    return count;
  };


  const handleDuckielutionClick = (index) => {
    const duck = duckielutions[index];
    const currentCost = duck.cost;

    let quantityToBuy = 1;

    if (buyAmount === "max") {
      quantityToBuy = calculateMaxAffordable(duck.cost, growthRate, duck.quantity, duckCount);
    }
    else if (buyAmount === 10) {
      if (calculateMaxAffordable(duck.cost, growthRate, duck.quantity, duckCount) >= 10) {
        quantityToBuy = 10;
      }
    }
    else if (buyAmount === 1) { if (!(duckCount >= duck.cost)) { return; } }
    else { return; }

    const totalCost = calculateTotalCost(duck.cost, growthRate, duck.quantity, quantityToBuy);

    setDuckCount(prev => prev - totalCost);

    const newDuckielutions = [...duckielutions];
    newDuckielutions[index].quantity += quantityToBuy;
    newDuckielutions[index].cost = Math.floor(currentCost * Math.pow(growthRate, duck.quantity + quantityToBuy));
    setDuckielutions(newDuckielutions);

    setCps(prev => prev + (duck.cps * quantityToBuy));
    setCurrentDuckImage(duck.image);
    setCurrentQuote(duck.quote);


  };


  return (
    <main>
      <div>
        <label htmlFor="count">Ducks:</label>
        <span> {Math.floor(duckCount).toLocaleString()}</span>
      </div>
      <br />
      <div>
        <div className="click-me">
          Click Me!
        </div>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <button className="duck button" onClick={handleDuckClick}>
            <div className="click-animation-wrapper">
              {clickAnimations.map(anim => (
                <span
                  key={anim.id}
                  className="click-animation"
                  style={{
                    left: anim.x,
                    top: anim.y,
                  }}>
                  {`+${anim.amount}`}
                </span>
              ))}
            </div>
            <img className="duck-img" src={currentDuckImage} alt="Duck Picture" />
          </button>
        </div>
      </div>

      {/* Sidebar Toggle Button */}
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {sidebarOpen ? 'Close' : 'Upgrades & Duckielutions'}
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <br />
        <h2>Upgrades</h2>
        {upgrades.map((upgrade, index) => {
          const wasUnlocked = unlockedUpgrades.includes(upgrade.name);
          const isVisible = (index === 0 || unlockedUpgrades.includes(upgrades[index - 1].name)) && duckCount >= upgrade.cost;


          return (
            isVisible && !wasUnlocked && (
              <div key={upgrade.name}>
                <button onClick={() => handleUpgradeClick(index)}>
                  {upgrade.name}
                  <p className="cost">{upgrade.cost} ducks</p>
                </button>
              </div>
            )
          );
        })}
        {unlockedUpgrades.length === upgrades.length && (
          <p className="completion-message">All upgrades unlocked!</p>
        )}

        <h2>Duckielutions</h2>
        <div className="buy-mode">
          <button onClick={() => setBuyAmount(1)}>Buy 1</button>
          <button onClick={() => setBuyAmount(10)}>Buy 10</button>
          <button onClick={() => setBuyAmount("max")}>Buy Max</button>
        </div>

        {duckielutions.map((duck, index) => {
          const hasBeenBought = duck.quantity > 0;
          const prevHasBeenBought = index === 0 || duckielutions[index - 1].quantity > 0;
          const canAfford = duckCount >= duck.cost;

          const isVisible = hasBeenBought || (prevHasBeenBought && canAfford);

          return (
            isVisible && (
              <div key={duck.name}>
                <button
                  onClick={() => handleDuckielutionClick(index)}
                  disabled={duckCount < duck.cost}
                  className={duckCount < duck.cost ? 'disabled-button' : ''}
                >
                  {duck.name} (Owned: {duck.quantity})
                  <p className="cost">{duck.cost} ducks</p>
                </button>
              </div>
            )
          );
        })}



        {unlockedDuckielutions.length === duckielutions.length && (
          <p className="completion-message">All duckielutions achieved!</p>
        )}

        {unlockedUpgrades.length === upgrades.length &&
          unlockedDuckielutions.length === duckielutions.length && (
            <><br /><p className="completion-message">You have reached the peak of duckvolution!</p></>
          )}



      </div>
      <div>
        <br />
        <div className="scrolling-bar">
          <div className="quote">
            <p className="quote-text">
              "Everything is either a duck or not a duck." - Duck Supreme &emsp;</p>

            <p className="quote-text">{currentQuote}</p>
          </div>
        </div>
      </div>
    </main>

  );
}