export type NewsSource = "THE_GUARDIAN" | "BBC" | "CNN";

export type SourceOption = {
    label: string;
    value: NewsSource;
    enabled: boolean;
};

export const options: SourceOption[] = [
    {label: "THE GUARDIAN", value: "THE_GUARDIAN", enabled: true},
    {label: "BBC", value: "BBC", enabled: false},
    {label: "CNN", value: "CNN", enabled: false},
];
