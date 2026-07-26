/**
 * ADAPTIVE FIELD — the colour system.
 *
 * `unit` on every entry is the dominant colour measured from the real product
 * photograph (average of opaque pixels), not a colour chosen by eye. The field
 * is then derived to contrast that unit: a white unit gets a dark ground, and
 * the near-black Noir Pro flips its ground light. The Android app measured
 * #214FB7, which is why the app section is navy.
 *
 * Keep these in sync with the assets. If a product photo is ever replaced,
 * re-measure rather than guessing.
 */

export interface Field {
    /** measured from the asset */
    unit: string;
    /** page ground for this product */
    ground: string;
    /** text colour that sits on that ground */
    ink: string;
    /** the one lifted colour: readouts, primary action, active marks */
    accent: string;
    /** the soft bloom behind the unit */
    haze: string;
}

/** WCAG relative luminance, used to decide what can sit on a colour. */
export function luminance(hex: string): number {
    const c = hex.replace('#', '');
    const chan = (i: number) => {
        const v = parseInt(c.slice(i, i + 2), 16) / 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    };
    return 0.2126 * chan(0) + 0.7152 * chan(2) + 0.0722 * chan(4);
}

export const isLight = (hex: string) => luminance(hex) > 0.35;

/** WCAG contrast ratio between two colours. */
export function contrast(a: string, b: string): number {
    const la = luminance(a);
    const lb = luminance(b);
    return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

const LABEL_DARK = '#06101F';
const LABEL_LIGHT = '#FFFFFF';

/**
 * Label colour for a solid-accent button.
 *
 * Picks whichever label actually contrasts better rather than switching on a
 * fixed luminance threshold: several accents here (the lavender #9E97C4 and
 * the azure #4FA3E3) sit just under any sensible cut-off and were handed white
 * text at 2.7:1. Measuring both candidates is correct for any future colour.
 */
export const onAccent = (hex: string) =>
    contrast(LABEL_DARK, hex) >= contrast(LABEL_LIGHT, hex) ? LABEL_DARK : LABEL_LIGHT;

/** Write a field onto an element as CSS custom properties. */
export function fieldVars(f: Field): React.CSSProperties {
    return {
        '--ground': f.ground,
        '--ink': f.ink,
        '--accent': f.accent,
        '--haze': f.haze,
        '--on-accent': onAccent(f.accent),
    } as React.CSSProperties;
}

/* ---------------- the six products ---------------- */

export const FIELDS: Record<string, Field> = {
    white: { unit: '#E7E9E7', ground: '#0C0D0F', ink: '#F4F4F2', accent: '#9FB6C4', haze: '#1D2733' },
    noir: { unit: '#262625', ground: '#EDEDEA', ink: '#111213', accent: '#3F5C8C', haze: '#C9CCC6' },
    silver: { unit: '#7D8E91', ground: '#08161A', ink: '#EAF2F3', accent: '#63BACB', haze: '#0E3742' },
    grey: { unit: '#7C7A89', ground: '#0F0D14', ink: '#F0EEF4', accent: '#9E97C4', haze: '#221E33' },
    blossom: { unit: '#C9CAE2', ground: '#150F1B', ink: '#F6F0F5', accent: '#C79AC8', haze: '#33203A' },
    geyser: { unit: '#B6B8B9', ground: '#04121F', ink: '#E8F1F8', accent: '#4FA3E3', haze: '#0A3050' },
};

/** The Android app measured #214FB7 / #1877D2 — this section matches it. */
export const APP_FIELD = {
    ground: '#061229',
    accent: '#4E86E8',
    pale: '#9CBAF2',
};
