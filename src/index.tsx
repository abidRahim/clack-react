import React, { MutableRefObject, useEffect, useRef } from "react";
import * as clack from "@reasonink/clack";

export function Keyboard(props: KeyboardProps) {
    // Note that the initial group created here is never used. By passing a
    // new group here we never have to check for null however.
    const groupRef = useRef(clack.group({}));
    const rootRef: MutableRefObject<HTMLDivElement|null> = useRef(null);

    useEffect(() => {
        initClackGroup();
        return () => {
            if (groupRef.current) {
                // Disable on unmount to remove event listeners and enable GC.
                groupRef.current.enabled = false;
            }
        };
    });

    return <div ref={rootRef} className="keyboard">
        {props.children}
    </div>;

    function initClackGroup() {
        // First disable the old group to remove event listeners and enable GC.
        groupRef.current.enabled = false;
        // Now create a new group from the KeyCombo children.
        const g = groupRef.current = clack.group({});
        props.children.filter(c => (c as any).type === KeyCombo).forEach(c => {
            const { c: combo, onPress, global, preventDefault } = (c as any).props as KeyComboProps;
            g.add(clack.shortcut(combo, e => {
                // Do nothing if we're not the target.
                if (!isTarget()) {
                    return;
                }
                // undefined is treated as truthy here, hence !== false.
                (preventDefault !== false) && e.preventDefault();
                onPress(e);

                function isTarget() {
                    if (global) return true;
                    return rootRef.current && rootRef.current.contains(e.target as any);
                }
            }));
        });
    }
}

export interface KeyboardProps {
    children: React.ReactNode[];
}

export function KeyCombo(props: KeyComboProps) {
    return null; // Intentional null render
}

export interface KeyComboProps {
    c: string;
    onPress(e: KeyboardEvent): void;
    /**
     * Whether the keyboard shortcut is global.
     *
     * If false (default) the onPress handler will only be invoked if a
     * child of <Keyboard> is focused.
     */
    global?: boolean; // default: false
    preventDefault?: boolean; // default: true
}
