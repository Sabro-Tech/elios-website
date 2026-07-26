import { createContext, useContext, useState, useMemo, type ReactNode } from 'react';
import type { Field } from '../theme/fields';

interface FieldState {
    /** the field the hero is currently showing, or null off the home page */
    field: Field | null;
    setField: (f: Field | null) => void;
}

const FieldContext = createContext<FieldState | undefined>(undefined);

/**
 * The hero publishes whichever product field it is showing so the navigation
 * can ride the same ground instead of floating on a colour that no longer
 * exists underneath it.
 */
export function FieldProvider({ children }: { children: ReactNode }) {
    const [field, setField] = useState<Field | null>(null);
    const value = useMemo(() => ({ field, setField }), [field]);
    return <FieldContext.Provider value={value}>{children}</FieldContext.Provider>;
}

export function useField() {
    const ctx = useContext(FieldContext);
    if (!ctx) throw new Error('useField must be used within a FieldProvider');
    return ctx;
}
