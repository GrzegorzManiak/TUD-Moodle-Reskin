export namespace Themes {
    export interface ThemeIdentifier {
        name: string;
        identifier: string;
    }

    export interface Theme {
        details: ThemeIdentifier;
        root: {
            [key: string]: string;
        };
    }

    export type ThemeList = Array<ThemeIdentifier>;

    export enum SuccessCriteria {
        Removed = "Removed",
        Success = "Success",
        DoesNotExist = "DoesNotExist",
        RemovalError = "RemovalError"
    }

    export type ReturnType = 'details' | 'root';
}