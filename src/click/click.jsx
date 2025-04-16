import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './click.css';

export function Click(props) {

  /* Duck Clicks */
  const userName = props.userName;
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

  // For click animations.
  useEffect(() => {
    if (clickAnimations.length === 0) return;

    const timer = setTimeout(() => {
      setClickAnimations(prev => prev.slice(1));
    }, 1000);

    return () => clearTimeout(timer);
  }, [clickAnimations]);

  /* Clicks per second functionality */
  const [cps, setCps] = useState(10);
  const [growthRate, setGrowthRate] = useState(1.15);

  const tickRate = 10;
  const ticksPerSecond = 1000 / tickRate;

  useEffect(() => {
    const interval = setInterval(() => {
      setDuckCount(prev => prev + cps / ticksPerSecond);
    }, tickRate);

    return () => clearInterval(interval);
  }, [cps]);

  /* Images, Quotes, Upgrades, and Duckielutions lists */

  const [currentDuckImage, setCurrentDuckImage] = useState('single-cell.jpg');
  const [currentQuote, setCurrentQuote] = useState("You have begun life as a single cell. No other ducks exist.")

  const upgrades = [
    // Single-celled Duck
    { name: 'Cell Division', cost: 50, clicks: 2 },
    // Multi-celled Duck
    { name: 'Cell Tissue Development', cost: 100, clicks: 3 },
    { name: 'Filter Feeding', cost: 200, clicks: 5 },
    { name: 'Muscle Development', cost: 400, clicks: 8 },
    { name: 'Swimming', cost: 800, clicks: 13 },
    { name: 'Organ Formation', cost: 1600, clicks: 21 },
    // Small Fish 
    { name: '', cost: 4000, clicks: 34 },
    { name: '', cost: 10000, clicks: 34 },
  ];

  const initialDuckielutions = [
    { name: 'Multi-Celled Duck', cost: 80, baseCost: 80, cps: 1, quantity: 0, image: "multi-celled duck.jpg", quote: "You have grown extra cells. What do you need those for?" },
    { name: 'Small Fish', cost: 200, baseCost: 200, cps: 2, quantity: 0, image: "small fish.jpg", quote: "Just keep swimming. Just keep swimming." },
    { name: 'Big Fish', cost: 750, baseCost: 750, cps: 3, quantity: 0, image: "", quote: "There's always a bigger fish." },
    { name: 'Flat Fish', cost: 4000, baseCost: 4000, cps: 5, quantity: 0, image: "", quote: "One fish, two fish, red fish, blue fish. Wanna play hide and seek?" },
    { name: 'Lungfish', cost: 35000, baseCost: 35000, cps: 8, quantity: 0, image: "", quote: "I can breathe!!" },
    { name: 'Lizard', cost: 475000, baseCost: 475000, cps: 13, quantity: 0, image: "", quote: "" },
    { name: 'Dinosaur', cost: 10000000, baseCost: 10000000, cps: 21, quantity: 0, image: "", quote: "" },
    { name: 'Archaeopteryx', cost: 225000000, baseCost: 225000000, cps: 34, quantity: 0, image: "", quote: "" },
  ];

  /* Handlers for buying upgrades and duckielutions */

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
    const baseCost = duck.baseCost;
    let quantityToBuy = 1;

    if (duck.quantity === 0 && currentCost <= duckCount) {
      setCurrentDuckImage(duck.image);
      setCurrentQuote(duck.quote);
    }

    if (buyAmount === "max") {
      quantityToBuy = calculateMaxAffordable(currentCost, growthRate, duck.quantity, duckCount);
    }
    else if (buyAmount === 10) {
      if (calculateMaxAffordable(currentCost, growthRate, duck.quantity, duckCount) >= 10) {
        quantityToBuy = 10;
      }
    }
    else if (buyAmount === 100) {
      if (calculateMaxAffordable(currentCost, growthRate, duck.quantity, duckCount) >= 100) {
        quantityToBuy = 100;
      }
    }
    else if (buyAmount === 1) { if (!(duckCount >= currentCost)) { return; } }
    else { return; }

    const totalCost = calculateTotalCost(baseCost, growthRate, duck.quantity, quantityToBuy);
    setDuckCount(prev => prev - totalCost);

    const newDuckielutions = [...duckielutions];
    newDuckielutions[index].quantity += quantityToBuy;

    let updatedCost = baseCost;
    for (let i = 0; i < duck.quantity + quantityToBuy; i++) {
      updatedCost = Math.floor(updatedCost * growthRate);
    }
    newDuckielutions[index].cost = updatedCost;


    setDuckielutions(newDuckielutions);
    setCps(prev => prev + (duck.cps * quantityToBuy));

  };

  /* Saving progress functionality */

  const [saved, setSaved] = useState(false);

  async function saveGame() {
    await fetch('/api/save', {
      method: 'POST',
      headers: { 'ontent-type': 'application/json' },
      body: JSON.stringify({
        userName,
        duckCount,
        clickValue,
        cps,
        growthRate,
        currentDuckImage,
        currentQuote,
        duckielutions,
        unlockedDuckielutions,
        unlockedUpgrades
      }),
    });
  }

  useEffect(() => {
    let isSaving = false;

    const interval = setInterval(async () => {
      if (isSaving) return;
      isSaving = true;
      try {
        await saveGame();
        setSaved(true);
      } finally {
        isSaving = false;
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetch('/api/load')
      .then(res => res.json())
      .then(data => {
        setDuckCount(data.duckCount ?? 0);
        setClicks(data.clickValue ?? 1);
        setCps(data.cps ?? 0);
        setGrowthRate(data.growthRate ?? 1.15);
        setCurrentDuckImage(data.currentDuckImage ?? 'single-cell.jpg');
        setCurrentQuote(data.currentQuote ?? "You have begun life as a single cell. No other ducks exist.");
        setDuckielutions(data.duckielutions ?? initialDuckielutions);
        setUnlockedDuckielutions(data.unlockedDuckielutions ?? []);
        setUnlockedUpgrades(data.unlockedUpgrades ?? []);
      });
  }, [userName]);


  const [quote, setQuote] = useState("To quack or not to quack? Why, that isn't a question.     Quack.");
  const [quoteAuthor, setQuoteAuthor] = useState("Duck Supreme");

  /* Extra quoteBar quote */
  useEffect(() => {
    fetch('https://quote.cs260.click')
      .then((response) => response.json())
      .then((data) => {
        setQuote(data.quote);
        setQuoteAuthor(data.author);
      })
      .catch((error) => {
        console.error('Failed to fetch quote:', error);
      });
  }, []);

  /* Sidebar functionality */
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);


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
          <button
            onClick={() => setBuyAmount(1)}
            className={buyAmount === 1 ? 'selected' : ''}
          >Buy 1</button>
          <button
            onClick={() => setBuyAmount(10)}
            className={buyAmount === 10 ? 'selected' : ''}
          >Buy 10</button>
          <button
            onClick={() => setBuyAmount(100)}
            className={buyAmount === 100 ? 'selected' : ''}
          >Buy 100</button>
          <button
            onClick={() => setBuyAmount("max")}
            className={buyAmount === "max" ? 'selected' : ''}
          >Buy Max</button>
        </div>

        {duckielutions.map((duck, index) => {
          const hasBeenBought = duck.quantity > 0;
          const prevHasBeenBought = index === 0 || duckielutions[index - 1].quantity > 0;
          const isVisible = hasBeenBought || (prevHasBeenBought && duckCount >= duck.cost);

          if (!isVisible) return null;

          const affordableCount = calculateMaxAffordable(
            duck.baseCost,
            growthRate,
            duck.quantity,
            duckCount
          );

          const fullAmountNeeded = buyAmount === "max" ? 1 : buyAmount;
          const faded = affordableCount < fullAmountNeeded;
          let duckPrice = duck.cost;
          let maxDucks = buyAmount;

          if (buyAmount === "max") {
            maxDucks = calculateMaxAffordable(duck.baseCost, growthRate, duck.quantity, duckCount)
            duckPrice = calculateTotalCost(duck.baseCost, growthRate, duck.quantity, maxDucks);
          }

          return (
            <div key={duck.name}>
              <button
                onClick={() => handleDuckielutionClick(index)}
                className={`duckielution-button ${faded ? 'faded' : ''}`}
              >
                {duck.name} (Owned: {duck.quantity})
                <p className="cost">Buy {maxDucks}: {duckPrice} ducks</p>
              </button>
            </div>
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
            {saved && (
              <p className='quote-text'> Game Saved. </p>
            )}
            <p className='quote-text'>{quote} - {quoteAuthor}</p>
          </div>
        </div>
      </div>
    </main>

  );
}