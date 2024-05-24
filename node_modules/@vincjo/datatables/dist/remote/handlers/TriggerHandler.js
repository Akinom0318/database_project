export default class TriggerHandler {
    context;
    reload;
    constructor(context) {
        this.context = context;
    }
    set(callback) {
        this.reload = callback;
    }
    async invalidate() {
        if (!this.reload)
            return;
        const state = this.context.getState();
        const data = await this.reload(state);
        if (data) {
            this.context.rows.set(data);
        }
    }
}
