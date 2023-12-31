export interface Token {
    accessToken: string;
    refreshToken: string;
}

export interface IPropsButton {
    children?: React.ReactNode;
    disabled?: boolean;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    type?: 'button' | 'submit' | 'reset';
    href?: string | undefined;
    style?: {
        width?: string;
        height?: string;
        fontSize?: string;
        color?: string;
    };
}

export interface IPropsStyledButton {
    buttonStyle: {
        normal: string;
        hover: string;
        style?: {
            width?: string;
            height?: string;
            fontSize?: string;
            color?: string;
        };
    };
    disabled?: boolean;
}

interface OptionTypeBase {
    [key: string]: any;
}

type OptionsType<OptionType extends OptionTypeBase> = ReadonlyArray<OptionType>;
export type ValueType<
    OptionType extends OptionTypeBase,
    IsMulti extends boolean,
> = IsMulti extends true ? OptionsType<OptionType> : OptionType | null;
