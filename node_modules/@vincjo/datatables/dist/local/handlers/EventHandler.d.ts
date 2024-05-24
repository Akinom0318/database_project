/// <reference types="svelte" />
export default class EventHandler {
    private events;
    triggerChange: import("svelte/store").Writable<number>;
    add(event: keyof EventHandler['events'], callback: () => void): void;
    trigger(event: keyof EventHandler['events']): void;
}
