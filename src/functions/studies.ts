// source code from https://github.com/earthernsence/ADAnswers-Bot

import { studies } from "../utils/databases/studies";

export function getAffordableStudiesFromStudyList(
    list: number[],
    theorems: number
) {
    let remainingTheorems = theorems;
    const affordableStudies: number[] = [];
    for (const studyId of list) {
        const study = studies[`${studyId}`];
        if (study.cost <= remainingTheorems) {
            // If ANY of the study's prerequisites are in affordable studies, we can purchase it. Otherwise, we can't.
            // Some studies have multiple possible prerequisites, but we only need one of them in order for us to purchase the next study
            // Some studies have no prerequisites so we can always purchase them
            // TS11 has no prerequisites, so we have an extra OR to see if it's the study we're thinking about buying
            if (
                study.prerequisites.some((r) =>
                    affordableStudies.includes(r)
                ) ||
                study.id === 11
            ) {
                affordableStudies.push(studyId);
                remainingTheorems -= study.cost;
            }
        }
    }
    return affordableStudies;
}
