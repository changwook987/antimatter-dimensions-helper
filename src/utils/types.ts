// source code from https://github.com/earthernsence/ADAnswers-Bot

export type AchievementInfo = {
    id: number;
    fullName: string;
    achievement: string;
    strategy?: string;
    reward?: string;
    rewardFormula?: string;
};

export type EC = {
    challenge: number;
    completion: number;
    tt: number;
    ip: string;
    note: null | string;
    tree: string;
    completionReqs?: string;
    unlock: {
        currency: string;
        amount: number | string;
        tt: number;
    };
};

export type GlyphEffect = {
    name: string;
    primary?: boolean;
    effect: string;
    effectFormula: string;
    stacking?: string;
};

export type GlyphInfo = {
    name: string;
    // The ID of the emote on the AD Discord server.
    emote: string;
    // An alternate character, used if the bot is in DMs or on another server.
    altText: string;
    // Effects start in the lower left corner and progress clockwise.
    effects: {
        [key: string]: GlyphEffect;
    };
};

export type PerkInfo = {
    id: string;
    name: string;
    effect: string;
    prerequisites: string[];
};

export type Milestone = {
    amount: number;
    resource: string;
    effect: string;
    effectFormula: string;
};

export type StringIndexedStringObjectType = {
    [key: string]: string;
};

export type StudyInfo = {
    id: number;
    effect: string;
    formula?: string;
    cost: number;
    prerequisites: number[];
    reqType: string;
    type: string;
    additionalPrerequisites?: string[];
    exclusiveWith?: string;
    isBestWaifu?: string;
    hasGraph?: boolean;
    graph?: string;
};

export type TagInfo = {
    top5commands: string;
    top5hours: string;
    top5users: string;
    requests: string;
    successes: string;
};

export type TimeNoDays = {
    hours: number;
    minutes: number;
    seconds: number;
};

export type TimeWithClock = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    clock: string;
};

export type Trees = {
    requirement: number;
    ts: number[];
    desc?: string;
};

export type UpgradeInfo = {
    id: string;
    name: string;
    effect: string;
    requirement?: string;
    cost?: number | string;
    formula?: string;
    initialCost?: number;
    rebuyable?: boolean;
    formatNicely?: boolean;
    increment?: number;
    hasGraph?: boolean;
    graph?: string;
};
