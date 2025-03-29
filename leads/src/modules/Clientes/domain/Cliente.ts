
export default class Cliente {
    constructor(
        public name: string,
        public email: string,
        public phone: string,
        public id?: number | null | undefined,
        public age?: number | undefined,
        public gender?: string | undefined,
        public address?: string | undefined
    ) {}

}