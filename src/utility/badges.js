export const generateStreakName = (days) => {
    if (days === 0) {
        return "Loser Clown";
    } else if (days >= 1 && days < 5) {
        return "Newbie Streaker";
    } else if (days >= 5 && days < 7) {
        return "Streak Novice";
    } else if (days >= 7 && days < 10) {
        return "Week Warrior";
    } else if (days >= 10 && days < 15) {
        return "Streak Explorer";
    } else if (days >= 15 && days < 20) {
        return "Zero to Hero";
    } else if (days >= 20 && days < 25) {
        return "Gamma Defender";
    } else if (days >= 25 && days < 30) {
        return "Month Master";
    } else if (days >= 30 && days < 45) {
        return "Streak Sensei";
    } else if (days >= 45 && days < 60) {
        return "Epic Epoch";
    } else if (days >= 60 && days < 75) {
        return "Legendary Lifer";
    } else if (days >= 75 && days < 100) {
        return "Sultan of Self-Control";
    } else if (days >= 100 && days < 150) {
        return "Infinity Initiate";
    } else if (days >= 150 && days < 200) {
        return "Purity Paladin";
    } else if (days >= 200 && days < 250) {
        return "Monk Mode Achiever";
    } else if (days >= 250 && days < 300) {
        return "Streak Ninja";
    } else if (days >= 300 && days < 350) {
        return "Victorious Virtuoso";
    } else if (days >= 350 && days < 400) {
        return "Master of Mindfulness";
    } else if (days >= 400 && days < 450) {
        return "Serenity Sentinel";
    } else if (days >= 450 && days < 500) {
        return "Diligent Dynamo";
    } else if (days >= 500 && days < 600) {
        return "Streak Sorcerer";
    } else if (days >= 600 && days < 700) {
        return "Guardian of Good Vibes";
    } else if (days >= 700 && days < 800) {
        return "Unbroken Unicorn";
    } else if (days >= 800 && days < 900) {
        return "Zen Zephyr";
    } else if (days >= 900 && days < 1000) {
        return "Diligent Dynamo Sigma";
    } else if (days >= 1000) {
        return "Radiant Resilience Giga Chad";
    }
};

export const badgeData = [
    { start: 0, end: 0, name: "Loser Clown" },
    { start: 1, end: 4, name: "Newbie Streaker" },
    { start: 5, end: 6, name: "Streak Novice" },
    { start: 7, end: 9, name: "Week Warrior" },
    { start: 10, end: 14, name: "Streak Explorer" },
    { start: 15, end: 19, name: "Zero to Hero" },
    { start: 20, end: 24, name: "Gamma Defender" },
    { start: 25, end: 29, name: "Month Master" },
    { start: 30, end: 44, name: "Streak Sensei" },
    { start: 45, end: 59, name: "Epic Epoch" },
    { start: 60, end: 74, name: "Legendary Lifer" },
    { start: 75, end: 99, name: "Sultan of Self-Control" },
    { start: 100, end: 149, name: "Infinity Initiate" },
    { start: 150, end: 199, name: "Purity Paladin" },
    { start: 200, end: 249, name: "Monk Mode Achiever" },
    { start: 250, end: 299, name: "Streak Ninja" },
    { start: 300, end: 349, name: "Victorious Virtuoso" },
    { start: 350, end: 399, name: "Master of Mindfulness" },
    { start: 400, end: 449, name: "Serenity Sentinel" },
    { start: 450, end: 499, name: "Diligent Dynamo" },
    { start: 500, end: 599, name: "Streak Sorcerer" },
    { start: 600, end: 699, name: "Guardian of Good Vibes" },
    { start: 700, end: 799, name: "Unbroken Unicorn" },
    { start: 800, end: 899, name: "Zen Zephyr" },
    { start: 900, end: 999, name: "Diligent Dynamo Sigma" },
    { start: 1000, end: Infinity, name: "Radiant Resilience Giga Chad" },
];