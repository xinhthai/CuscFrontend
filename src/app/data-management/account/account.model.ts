export class Account{
    constructor(
        public userId: string,
        public username: string,
        public fullName: string,
        public status: boolean,
        public authorities: string[],
    ){}
}
