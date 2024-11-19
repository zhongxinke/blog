/**
 * 单例类工厂
 */
export function SingletonFactory<E>() {
    /** 单例模式 */
    class Singleton {
        protected constructor() { }
        private static _instance: E | undefined;

        /** 获取单例实例 */
        public static get instance() {
            if (!this._instance) {
                this._instance = new this() as E;
            }
            return this._instance;
        }
    }

    return Singleton;
}
