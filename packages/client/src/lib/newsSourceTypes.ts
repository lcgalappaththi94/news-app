import {NEWS_SOURCE} from "news-app-server/src/types/newsSources.ts";

export type SourceOption = {
    label: string;
    value: NEWS_SOURCE;
    enabled: boolean;
};

export const options: SourceOption[] = [
    {label: "THE GUARDIAN", value: NEWS_SOURCE.GUARDIAN, enabled: true},
    {label: "NEWS_ORG", value: NEWS_SOURCE.NEWS_ORG, enabled: true},
    {label: "BBC", value: NEWS_SOURCE.BBC, enabled: false},
    {label: "CNN", value: NEWS_SOURCE.BBC, enabled: false},
];
